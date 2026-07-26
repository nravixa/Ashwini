import React, { useState } from 'react';

// Expected output format from vite-imagetools when using ?as=picture
export interface ImagetoolsPicture {
  img: {
    src: string;
    w: number;
    h: number;
  };
  sources: Record<string, string>;
}

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | ImagetoolsPicture;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

const OptimizedImage = React.memo(({
  src,
  alt,
  fill,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className = "",
  style,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const isOptimized = typeof src === 'object' && src !== null && 'sources' in src;

  const imgProps = {
    ...props,
    alt,
    loading: (priority ? 'eager' : 'lazy') as any,
    // @ts-ignore
    fetchPriority: priority ? 'high' : 'low',
    decoding: (priority ? 'sync' : 'async') as any,
    onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoaded(true);
      if (props.onLoad) props.onLoad(e);
    }
  };

  // If fill is true, the container is absolute inset-0 or controls its sizing
  // If fill is false, the container just wraps the image relatively.
  const containerClass = `relative overflow-hidden ${fill ? 'w-full h-full' : ''}`;
  
  // We need to properly absolute position the image itself if fill is true
  const fillStyles: React.CSSProperties = fill ? {
    position: 'absolute',
    height: '100%',
    width: '100%',
    inset: 0,
    color: 'transparent',
    objectFit: 'cover'
  } : {};

  const imgClass = `transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`;

  if (isOptimized) {
    const pic = src as ImagetoolsPicture;
    return (
      <div className={containerClass} style={style}>
        {/* Blur Placeholder */}
        {!isLoaded && <div className="absolute inset-0 bg-white/10 animate-pulse backdrop-blur-md z-10 pointer-events-none" />}
        <picture>
          {Object.entries(pic.sources).map(([format, srcset]) => (
            <source key={format} type={format} srcSet={srcset} sizes={sizes} />
          ))}
          <img
            src={pic.img.src}
            width={fill ? undefined : pic.img.w}
            height={fill ? undefined : pic.img.h}
            className={imgClass}
            style={{ ...fillStyles, ...(!fill && style ? style : {}) }}
            {...imgProps}
          />
        </picture>
      </div>
    );
  }

  // Fallback for standard string src (e.g. external URLs, unoptimized imports)
  return (
    <div className={containerClass} style={style}>
       {!isLoaded && <div className="absolute inset-0 bg-white/10 animate-pulse backdrop-blur-md z-10 pointer-events-none" />}
       <img
         src={src as string}
         className={imgClass}
         style={{ ...fillStyles, ...(!fill && style ? style : {}) }}
         {...imgProps}
       />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';
export default OptimizedImage;
