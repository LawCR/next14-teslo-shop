export const revalidate = 0;

import { ProductsTable } from '@/features/admin';
import { getPaginatedProductsWithImages } from '@/features/products';
import { Pagination, Title } from '@/features/ui';
import Link from 'next/link';

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, totalPages } = await getPaginatedProductsWithImages({ currentPage: page, take: 12 })

  // const productsWithImages = products.filter(product => product.images.length > 0)

  return (
    <div>
      <Title title='Gestión de productos' />

      <div className='px-4 md:px-0'>
        <div className='flex justify-end mb-5'>
          <Link href='/admin/product/new' className='btn-primary'>
            Nuevo producto
          </Link>
        </div>

        <ProductsTable products={products} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}