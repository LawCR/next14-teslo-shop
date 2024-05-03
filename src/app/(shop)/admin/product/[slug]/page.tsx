import { ProductForm, getCategories } from '@/features/admin';
import { getProductsBySlug } from '@/features/product';
import { Title } from '@/features/ui';
import { notFound, redirect } from 'next/navigation';

interface Props {
  params: {
    slug: string
  }
}

export default async function AdminProductSlugPage({ params }: Props) {

  const { slug } = params
  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto'

  const [ product, categoriesResponse ] = await Promise.all([
    getProductsBySlug(slug),
    getCategories({ take: 1000 })
  ])

  if (!product && slug !== 'new') notFound()
  
  const { categories } = categoriesResponse

  return (
    <>
      <Title title={title} />

      <ProductForm product={product || {}} categories={categories} />
    </>
  );
}