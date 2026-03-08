"use client";

import { TabelaPedidos } from "@/components/layout/tabela-pedidos";
import { Paginator } from "@/components/layout/paginator";
import { useEffect, useState } from "react";
import { findAllAnnouncementsBackoffice } from "@/services/announcements.service";
import { Page } from "@/types/page";
import { AnnouncementsFilterParams } from "@/types/request/announcements-filter-params.request";
import { AnnouncementTableResponse } from "@/types/response/announcement-table.response";
import { BackofficeAnnouncementsFilterForm } from "@/components/layout/backoffice-orders-filter-form";

export default function OperationsPage() {
  const [filters, setFilters] = useState<AnnouncementsFilterParams>({});
  const [operations, setOperations] = useState<AnnouncementTableResponse[]>();
  const [page, setPage] = useState<number>(0);
  const [pageData, setPageData] = useState<Page>();

  useEffect(() => {
    const payload = {
      ...filters,
      categories: filters.category ? [filters.category] : undefined,
    };
    findAllAnnouncementsBackoffice({ ...payload, page }).then((res) => {
      setOperations(res.content);
      setPageData(res.page);
    });
  }, [filters, page]);

  return (
    <div className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4">
      <div className="flex flex-col gap-8">
        <h1 className="text-title text-base-2">Gestão de pedidos</h1>

        <BackofficeAnnouncementsFilterForm onSubmitFilters={(filters) => setFilters(filters)} />
      </div>

      <div className="flex flex-col gap-8">
        {operations && pageData && (
          <>
            <TabelaPedidos data={{} as any} />
            <Paginator
              pageData={pageData}
              currentPage={page}
              onPageChange={(newPage) => {
                setPage(newPage);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
