import { Page } from "@/types/page";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "../ui/pagination";

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
            }}
          />
        </PaginationItem>

        {visiblePages.map((pageUi) => {
          const isActive = currentPage === pageUi - 1

          return (
            <PaginationItem key={pageUi} isActive={isActive}>
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
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
