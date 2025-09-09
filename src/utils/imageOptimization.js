// Utility functions for image optimization

/**
 * Creates a WebP version of an image URL if supported
 * @param {string} src - Original image source
 * @returns {string} - Optimized image source
 */
export const getOptimizedImageSrc = (src) => {
  // Check if browser supports WebP
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();

  if (supportsWebP && src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png')) {
    // Replace extension with .webp for supported browsers
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }

  return src;
};

/**
 * Preloads critical images for better performance
 * @param {string[]} imageSrcs - Array of image sources to preload
 */
export const preloadCriticalImages = (imageSrcs) => {
  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getOptimizedImageSrc(src);
    document.head.appendChild(link);
  });
};

/**
 * Lazy loads images with intersection observer
 * @param {HTMLImageElement} img - Image element to lazy load
 */
export const lazyLoadImage = (img) => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        const src = image.dataset.src;
        
        if (src) {
          image.src = getOptimizedImageSrc(src);
          image.classList.remove('lazy');
          observer.unobserve(image);
        }
      }
    });
  });

  imageObserver.observe(img);
};

/**
 * Generates responsive image srcset
 * @param {string} baseSrc - Base image source
 * @param {number[]} widths - Array of widths for responsive images
 * @returns {string} - srcset string
 */
export const generateResponsiveSrcSet = (baseSrc, widths = [320, 640, 768, 1024, 1280]) => {
  const extension = baseSrc.split('.').pop();
  const baseName = baseSrc.replace(`.${extension}`, '');
  
  return widths
    .map(width => `${baseName}_${width}w.webp ${width}w`)
    .join(', ');
};

