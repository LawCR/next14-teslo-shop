export const generatePagination = (currentPage: number, totalPages: number, maxPages: number = 7) => {
  // Si el numero total de paginas es 7 o menos, se muestran todas las paginas
  if (totalPages <= maxPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7]
  }

  // Si la pagina actual está entra las primeras 3 paginas mostrar las primeras 3, puntos suspensivos y las ultimas 2
  if (currentPage < 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]; // [1, 2, 3, "...", 9, 10]
  }

  // Si la pagina actual está entre las ultimas 3 paginas mostrar las primeras 2, puntos suspensivos y las ultimas 3
  if (currentPage >= totalPages - 2) {
    return [1,  "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]; // [1, 2, "...", 8, 9, 10]
  }

  // Si la pagina actual esta en otro lugar medio, mostrar la primera pagina, puntos suspensivos, la pagina actual, y vecinos
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages
  ]
}