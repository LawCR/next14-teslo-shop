import { Gender } from "@/features/product/interfaces";
import { ProductGrid, getPaginatedProductsWithImages } from "@/features/products";
import { Pagination, Title } from "@/features/ui";
import { notFound } from "next/navigation";


interface Props {
  params: {
    gender: Gender;
  },
  searchParams: {
    page?: string
  }
}

const allowedGenders: Gender[] = ['men', 'women', 'kids', 'unisex'];

export default async function CategoryPage({ params, searchParams }: Props) {

  const { gender } = params
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  
  if (!allowedGenders.includes(gender))  notFound()
  
  const { products, totalPages } = await getPaginatedProductsWithImages({ currentPage: page, take: 12, gender })

  const categoryOptions: Record<Gender, string> = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kids': 'Niños',
    'unisex': 'Todos'
  }
  const categoryTitle = categoryOptions[gender] || 'Todos'

  if (products.length === 0) {
    return (
      <Title title={categoryTitle} subtitle={`No hay productos disponibles`}   />
    )
  }
  
  return (
    <>
      <Title title={categoryTitle} subtitle={`Los mejores artículos para ${categoryTitle}`} className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
