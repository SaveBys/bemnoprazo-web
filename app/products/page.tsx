"use client"

import { CardProducts } from "@/components/layout/card-products";
import { FilterProducts } from "@/components/layout/filter-products";
import { Paginator } from "@/components/layout/paginator";
import { getAllAnnouncements } from "@/services/announcements.service";
import { Page } from "@/types/page";
import { ProdutoResumo } from "@/types/products-resume";
import { useEffect, useState } from "react";

export default function Produtos() {
  const [announcements, setAnnouncements] = useState<ProdutoResumo[]>([]);
  const [pageData, setPageData] = useState<Page>();
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    getAllAnnouncements({ page, size: 9 }).then(res => {
      setAnnouncements(res.content);
      setPageData(res.page);
    });
  }, [page]);

  return (
    <main className="width-barrier flex gap-8 px-8 py-16 m-auto">
      <FilterProducts />

      <div className="w-full flex flex-col gap-8">
        <div className="w-full grid grid-cols-3 grid-rows-3 gap-4">
          {
            announcements.map(announcement => {
              return (
                <CardProducts key={announcement.id} data={announcement} />
              )
            })
          }
        </div>

        <Paginator
          pageData={pageData}
          currentPage={page}
          onPageChange={(newPage) => {
            setPage(newPage)
          }}
        />
      </div>
    </main>
  )
}