/**
 * Utility to detect low-end devices based on hardware concurrency and memory.
 * This helps in applying graceful degradation for heavily animated features.
 */
export const isLowEndDevice = typeof window !== 'undefined' 
  ? (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || 
    ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 2)
  : false;
