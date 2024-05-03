export const revalidate = 300; // 5 minutes

import { ProductGrid, getPaginatedProductsWithImages } from "@/features/products";
import { Pagination, Title } from "@/features/ui";

// const products = initialData.products;

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function HomePage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({ currentPage: page, take: 12 })

  // if (products.length === 0) redirect("/")
  if (products.length === 0) {
    return (
      <Title title="Tienda" subtitle={`No hay productos disponibles`}   />
    )
  }

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
