import React, { useRef, useEffect, useState, useLayoutEffect, forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface SmokyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  as?: any;
}

// ============================================================================
// SINGLETON WEBGL SHADER MANAGER
// ============================================================================

const V_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const F_SHADER = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uHover;
  varying vec2 vUv;

  float hash(vec2 p) {
      p = fract(p * vec2(233.14, 113.25));
      p += dot(p, p + 19.19);
      return fract(p.x * p.y);
  }

  float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
      float f = 0.0;
      float w = 0.5;
      for (int i = 0; i < 5; i++) {
          f += w * noise(p);
          p *= 2.0;
          w *= 0.5;
      }
      return f;
  }

  void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      
      // Rotate 5 degrees on hover
      float angle = uHover * 5.0 * 3.14159 / 180.0;
      float s = sin(angle);
      float c = cos(angle);
      mat2 rot = mat2(c, -s, s, c);
      uv = rot * (uv - 0.5) + 0.5;

      // Speed increases slightly on hover
      float t = uTime * (0.3 + uHover * 0.2);
      
      vec2 q = vec2(fbm(uv + vec2(t)), fbm(uv + vec2(1.0)));
      vec2 r = vec2(fbm(uv + 1.0 * q + vec2(t * 1.2) + vec2(1.7,9.2)),
                    fbm(uv + 1.0 * q + vec2(t * 0.8) + vec2(8.3,2.8)));
      float f = fbm(uv + r);

      vec3 bg = vec3(29.0, 26.0, 49.0) / 255.0;      // #1D1A31
      vec3 col1 = vec3(240.0, 140.0, 174.0) / 255.0; // #F08CAE
      vec3 col2 = vec3(193.0, 165.0, 169.0) / 255.0; // #C1A5A9
      vec3 col3 = vec3(154.0, 76.0, 149.0) / 255.0;  // #9A4C95

      vec3 color = mix(bg, col1, clamp(f*f*3.0, 0.0, 1.0));
      color = mix(color, col2, clamp(length(q), 0.0, 1.0));
      color = mix(color, col3, clamp(length(r.x), 0.0, 1.0));
      
      // +10% brightness on hover
      color *= 1.0 + uHover * 0.1;

      gl_FragColor = vec4(color, 1.0);
  }
`;

class SmokyShaderManager {
  private canvas: HTMLCanvasElement | null = null;
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  
  private positionLocation = -1;
  private timeLocation: WebGLUniformLocation | null = null;
  private resLocation: WebGLUniformLocation | null = null;
  private hoverLocation: WebGLUniformLocation | null = null;
  private positionBuffer: WebGLBuffer | null = null;

  private buttons = new Set<ButtonInstance>();
  private rafId = 0;
  private isInitialized = false;
  private isReducedMotion = false;
  private startTime = Date.now();

  private intersectionObserver: IntersectionObserver | null = null;

  init() {
    if (this.isInitialized || typeof window === "undefined") return;

    this.isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this.isReducedMotion) return;

    this.canvas = document.createElement("canvas");
    this.gl = this.canvas.getContext("webgl", { alpha: false, antialias: false });
    
    if (!this.gl) return;

    const gl = this.gl;
    const vShader = this.createShader(gl.VERTEX_SHADER, V_SHADER);
    const fShader = this.createShader(gl.FRAGMENT_SHADER, F_SHADER);
    
    if (!vShader || !fShader) return;

    this.program = gl.createProgram()!;
    gl.attachShader(this.program, vShader);
    gl.attachShader(this.program, fShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) return;

    this.positionLocation = gl.getAttribLocation(this.program, "position");
    this.timeLocation = gl.getUniformLocation(this.program, "uTime");
    this.resLocation = gl.getUniformLocation(this.program, "uResolution");
    this.hoverLocation = gl.getUniformLocation(this.program, "uHover");

    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const instance = (entry.target as any).__smokyInstance as ButtonInstance;
        if (instance) {
          instance.isVisible = entry.isIntersecting;
        }
      });
    });

    document.addEventListener("visibilitychange", this.handleVisibilityChange);

    this.isInitialized = true;
    this.loop();
  }

  private createShader(type: number, source: string) {
    if (!this.gl) return null;
    const shader = this.gl.createShader(type)!;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private handleVisibilityChange = () => {
    if (document.hidden) {
      cancelAnimationFrame(this.rafId);
    } else {
      this.startTime = Date.now() - (this.startTime - Date.now()); // Maintain time continuity
      this.loop();
    }
  };

  register(instance: ButtonInstance) {
    this.buttons.add(instance);
    if (instance.width > 0 && instance.height > 0 && !this.isInitialized) {
      this.init();
    }
    if (this.intersectionObserver && instance.canvas) {
      (instance.canvas as any).__smokyInstance = instance;
      this.intersectionObserver.observe(instance.canvas);
    }
    if (this.buttons.size === 1 && this.isInitialized && this.rafId === 0) {
      this.startTime = Date.now();
      cancelAnimationFrame(this.rafId);
      this.loop();
    }
  }

  unregister(instance: ButtonInstance) {
    if (this.intersectionObserver && instance.canvas) {
      this.intersectionObserver.unobserve(instance.canvas);
      delete (instance.canvas as any).__smokyInstance;
    }
    this.buttons.delete(instance);
    if (this.buttons.size === 0) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }

  updateSize(instance: ButtonInstance, w: number, h: number) {
    instance.width = w;
    instance.height = h;
    instance.isVisible = w > 0 && h > 0;
    
    if (instance.isVisible && !this.isInitialized) {
      this.init();
    }
    
    if (this.isInitialized && this.buttons.size > 0 && this.rafId === 0) {
      this.startTime = Date.now();
      this.loop();
    }
  }

  private loop = () => {
    if (!this.gl || !this.program || this.buttons.size === 0 || document.hidden) {
      this.rafId = 0;
      return;
    }
    
    let hasVisibleButtons = false;
    const time = (Date.now() - this.startTime) * 0.001;

    for (const btn of this.buttons) {
      if (!btn.isVisible || !btn.canvas || !btn.ctx || !btn.width || !btn.height) continue;
      hasVisibleButtons = true;

      const w = btn.width;
      const h = btn.height;

      if (this.canvas!.width !== w || this.canvas!.height !== h) {
        this.canvas!.width = w;
        this.canvas!.height = h;
      }

      this.gl.viewport(0, 0, w, h);
      this.gl.useProgram(this.program);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
      this.gl.enableVertexAttribArray(this.positionLocation);
      this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);

      this.gl.uniform1f(this.timeLocation, time);
      this.gl.uniform2f(this.resLocation, w, h);
      
      // Smooth hover interpolation
      btn.hoverState += ((btn.isHovered ? 1 : 0) - btn.hoverState) * 0.1;
      this.gl.uniform1f(this.hoverLocation, btn.hoverState);

      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

      // Blit to button canvas
      if (btn.canvas.width !== w || btn.canvas.height !== h) {
        btn.canvas.width = w;
        btn.canvas.height = h;
      }
      btn.ctx.drawImage(this.canvas!, 0, 0, w, h);
    }

    if (hasVisibleButtons) {
      this.rafId = requestAnimationFrame(this.loop);
    } else {
      // Slow down polling if nothing is visible
      setTimeout(() => {
        if (this.buttons.size > 0 && !document.hidden) {
          this.rafId = requestAnimationFrame(this.loop);
        } else {
          this.rafId = 0;
        }
      }, 200);
    }
  };

  dispose() {
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
      this.gl.deleteBuffer(this.positionBuffer);
    }
    this.isInitialized = false;
  }
}

interface ButtonInstance {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  isHovered: boolean;
  hoverState: number;
  isVisible: boolean;
  width: number;
  height: number;
}

const manager = new SmokyShaderManager();

// ============================================================================
// REACT COMPONENT
// ============================================================================

const SmokyButton = forwardRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement, SmokyButtonProps>(({
  children,
  className = "",
  variant = "primary",
  loading = false,
  fullWidth = false,
  disabled = false,
  icon,
  onClick,
  type = "button",
  as,
  ...props
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const Component = as || "button";
  const isPrimary = variant === "primary";

  useLayoutEffect(() => {
    if (!isClient || !isPrimary || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const instance: ButtonInstance = {
      canvas,
      ctx,
      isHovered: false,
      hoverState: 0,
      isVisible: false,
      width: 0,
      height: 0
    };

    manager.register(instance);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.round(rect.width * dpr);
        const h = Math.round(rect.height * dpr);

        manager.updateSize(instance, w, h);
      }
    });

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      manager.unregister(instance);
    };
  }, [isClient, isPrimary]);

  // Sync hover state to instance securely
  useEffect(() => {
    if (canvasRef.current && (canvasRef.current as any).__smokyInstance) {
      ((canvasRef.current as any).__smokyInstance as ButtonInstance).isHovered = isHovered;
    }
  }, [isHovered]);

  const baseStyles = "relative inline-flex items-center justify-center gap-2.5 font-sans text-xs uppercase tracking-widest font-bold rounded-xl transition-all duration-300 focus:outline-none overflow-hidden select-none py-4 px-8 sm:px-10 group";
  
  let variantStyles = "";
  if (isPrimary) {
    // Primary has the canvas background and active scaling
    variantStyles = "text-white border-none shadow-[0_10px_30px_-5px_rgba(240,140,174,0.4),_inset_0_2px_4px_rgba(255,255,255,0.4),_inset_0_-2px_4px_rgba(0,0,0,0.2)] bg-gradient-to-br from-rose-gold via-[#d96791] to-[#b34971]";
  } else if (variant === "secondary") {
    variantStyles = "premium-glass text-white border border-white/20 hover:bg-white/10";
  } else if (variant === "outline") {
    variantStyles = "border border-tertiary text-tertiary hover:bg-tertiary hover:text-white";
  } else if (variant === "ghost") {
    variantStyles = "text-white/80 hover:text-white hover:bg-white/5";
  }

  const widthStyle = fullWidth ? "w-full" : "w-auto";
  const hoverActiveStyles = isPrimary && !disabled && !loading 
    ? "hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_15px_40px_-5px_rgba(240,140,174,0.6)]" 
    : "hover:scale-105 active:scale-95";
    
  const disabledStyles = disabled || loading ? "opacity-60 cursor-not-allowed transform-none hover:scale-100 active:scale-100" : "cursor-pointer";

  return (
    <Component
      ref={ref as any}
      type={as ? undefined : type}
      className={`${baseStyles} ${variantStyles} ${widthStyle} ${hoverActiveStyles} ${disabledStyles} ${className}`}
      onClick={disabled || loading ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || loading}
      {...props}
    >
      {isPrimary && isClient && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ 
            opacity: disabled ? 0.7 : 1,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
      
      {/* Overlay gradient for smooth blending on primary buttons */}
      {isPrimary && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10" />
      )}

      <span className="relative z-20 flex items-center justify-center gap-2 w-full">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        ) : (
          icon && <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
      </span>
    </Component>
  );
});

SmokyButton.displayName = 'SmokyButton';
export default SmokyButton;
