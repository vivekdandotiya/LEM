import React from 'react';

interface ResponsiveCardImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
}

export function ResponsiveCardImage({
  src,
  alt,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  className = '',
  fill = true,
}: ResponsiveCardImageProps) {
  // Strip extension to get base path for -3840w, -2560w, etc.
  const basePath = src.replace(/\.(webp|png|jpg|jpeg|avif)$/i, '');

  const avifSrcSet = [
    `${basePath}-768w.avif 768w`,
    `${basePath}-1280w.avif 1280w`,
    `${basePath}-1920w.avif 1920w`,
    `${basePath}-2560w.avif 2560w`,
    `${basePath}-3840w.avif 3840w`,
  ].join(', ');

  const webpSrcSet = [
    `${basePath}-768w.webp 768w`,
    `${basePath}-1280w.webp 1280w`,
    `${basePath}-1920w.webp 1920w`,
    `${basePath}-2560w.webp 2560w`,
    `${basePath}-3840w.webp 3840w`,
  ].join(', ');

  return (
    <picture className={fill ? 'absolute inset-0 block w-full h-full' : 'block w-full h-full'}>
      {/* 1. Next-Gen AVIF variants */}
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />

      {/* 2. Modern WebP variants */}
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />

      {/* 3. Fallback img with 1920w default */}
      <img
        src={`${basePath}-1920w.webp`}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={fill ? `w-full h-full object-cover ${className}` : className}
      />
    </picture>
  );
}
