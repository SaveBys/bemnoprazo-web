import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "../ui/pagination";
import { Page } from "./card-products";

interface PaginatorProps {
  pageData: Page | undefined
  currentPage: number
  onPageChange: (page: number) => void
}

export function Paginator({
  pageData,
  currentPage,
  onPageChange,
}: PaginatorProps) {
  const totalPages = pageData?.totalPages || 0
  const maxVisiblePages = 5

  const visiblePages = Array.from(
    { length: Math.min(totalPages, maxVisiblePages) },
    (_, index) => index + 1
  )

  const handlePageClick = (pageUi: number) => {
    const pageZeroBased = pageUi - 1
    onPageChange(pageZeroBased)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 0) {
                onPageChange(currentPage - 1)
              }
            }}
          />
        </PaginationItem>

        {visiblePages.map((pageUi) => {
          const isActive = currentPage === pageUi - 1

          return (
            <PaginationItem key={pageUi}>
              <PaginationLink
                href="#"
                isActive={isActive}
                onClick={(e) => {
                  e.preventDefault()
                  handlePageClick(pageUi)
                }}
              >
                {pageUi}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {totalPages > maxVisiblePages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages - 1) {
                onPageChange(currentPage + 1)
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
