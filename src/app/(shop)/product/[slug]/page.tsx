export const revalidate = 604800; // 1 week

import { ResolvingMetadata } from "next";
import type { Metadata } from "next";
import { titleFont } from "@/config/fonts";
import { ClientProductSection, Slideshow, SlideshowMobile, getProductsBySlug } from "@/features/product";
import { formatCurrency } from "@/helpers/formats";
import { notFound } from "next/navigation";
import { getPathImageOrPlaceholder } from '@/features/product/components/product-custom-image/ProductCustomImage';

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductsBySlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? 'Producto no encontrado',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? 'Producto no encontrado',
      // images: [`/products/${product?.images[1]}`]
      images: [getPathImageOrPlaceholder(product?.images[1])]
    },
  }
}

export default async function ProductPage({ params }: Props) {

  const { slug } = params
  const product = await getProductsBySlug(slug)

  if (!product) notFound()

  return (
    <div className="mt-1 md:mt-5 pb-10 md:pb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile */}
        <SlideshowMobile 
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        {/* Desktop */}
        <Slideshow 
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>
      {/* Detalles */}
      <div className="col-span-1 tracking-widest px-4 md:px-0">
        <h1 className={`${titleFont.className} antialiased font-semi text-2xl uppercase`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">
          {formatCurrency(product.price)}
        </p>
        
        <ClientProductSection product={product} />

        {/* Descripción */}
        <h3 className="font-semibold text-md text-textSecondary dark:text-dtextSecondary mb-3">DESCRIPCIÓN</h3>
        <p className="text-sm uppercase text-textSecondary2 dark:text-dtextSecondary2 leading-6">
          {product.description}
        </p>
      </div>
    </div>
  );
}
