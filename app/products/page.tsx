"use client"

import { CardProducts, Page, ProdutoResumo } from "@/components/layout/card-products";
import { FilterProducts } from "@/components/layout/filter-products";
import { Paginator } from "@/components/layout/paginator";
import { listarAnuncio } from "@/services/anuncio.service";
import { useEffect, useState } from "react";

export default function Produtos() {
  const [announcements, setAnnouncements] = useState<ProdutoResumo[]>([]);
  const [pageData, setPageData] = useState<Page>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    listarAnuncio().then(res => {
      setAnnouncements(res.content);
      setPageData(res.page);
      setPage(res.page.number);
    });
  }, [])

  return (
    <main className="width-barrier flex gap-8 px-8 py-16 m-auto">
      <FilterProducts />

      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-row gap-8">
          {
            announcements.map(announcement => {
              return (
                <CardProducts key={announcement.ean} data={announcement} />
              )
            })
          }
        </div>

        <Paginator
          pageData={pageData}
          currentPage={page}
          onPageChange={(newPage) => {
            console.log("Mudou para página:", newPage)
            setPage(newPage)
          }}
        />
      </div>
    </main>
  )
}