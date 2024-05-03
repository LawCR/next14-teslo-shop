import Image from 'next/image';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  width?: number;
  height?: number;
}

export const getPathImageOrPlaceholder = (src?: string) => {
  if (src) {
    return src.startsWith('http') ? src : `/products/${src}`;
  }

  return '/imgs/placeholder.jpg';
}

export const ProductCustomImage = ({ alt, className, src, height, width }: Props) => {

  // Obtener el path de forma optimizada
  const localSrc = getPathImageOrPlaceholder(src);

  return (
    <Image
      src={localSrc}
      alt={alt}
      title={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};
