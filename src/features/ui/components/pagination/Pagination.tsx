"use client"
import { generatePagination } from "@/helpers";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

const PaginationItem = ({ page, href, currentPage = 2,  }: { page: string | number; currentPage?: number, href: string }) => {
  return (
    <li className="page-item">
      <Link
        className={clsx("page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300", 
          {
            "bg-transparent text-text dark:text-dtext hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-500 focus:shadow-none": page !== currentPage,
            "bg-blue-600 text-white hover:text-white focus:shadow-md": page === currentPage
          }
        )}
        href={href}
      >
        {page}
      </Link>
    </li>
  )
}

export const Pagination = ({ totalPages }: Props) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (currentPage < 1) redirect(`${pathname}`)

  const allPages = generatePagination(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`
    }

    if (Number(pageNumber) <= 0) {
      return `${pathname}`
    }

    if (Number(pageNumber) > totalPages) {
      return `${pathname}?${params.toString()}`
    }

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  // useEffect(() => {
  //   // Check if URL contains a hash (#) and scroll to the target element
  //   if (window.location.hash) {
  //     const element = document.querySelector(window.location.hash);
  //     console.log(element)
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  // }, []);

  return (
    <div className="flex text-center justify-center mt-2 mb-24">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none items-center" id='pagination'>
          <li className="page-item disabled">
            <Link
              className={clsx(
                "page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300   focus:shadow-none",
                {
                  "text-gray-400 pointer-events-none cursor-not-allowed": currentPage === 1,
                  "hover:text-gray-800 hover:bg-gray-200": currentPage > 1,
                }
              )}
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={24} />
              {/* Anterior */}
            </Link>
          </li>
          {
            allPages.map((page, index) => (
              <PaginationItem 
                page={page} 
                href={createPageUrl(page)} 
                currentPage={currentPage} 
                key={`page-${page}-${index}`} 
              />
            ))
          }
          {/* <PaginationItem page={5} /> */}
          <li className="page-item disabled">
            <Link
              className={clsx(
                "page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300   focus:shadow-none",
                {
                  "text-gray-500 pointer-events-none": currentPage >= totalPages,
                  "hover:text-gray-800 hover:bg-gray-200 dark:hover:text-dtext dark:hover:bg-gray-500": currentPage < totalPages,
                  // "focus:shadow-none": true
                }
              )}
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={24} />
              {/* Siguiente */}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
