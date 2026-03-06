"use client";

import { TabelaProdutos } from "@/components/layout/tabela-produtos";

import { Paginator } from "@/components/layout/paginator";
import { useEffect, useState } from "react";
import { DashboardAnnouncementsFilterForm } from "@/components/layout/dashboard-produtcs-filter-form";
import { findAllAnnouncementsBackoffice } from "@/services/announcements.service";
import { AnnouncementTableResponse } from "@/types/response/announcement-table.response";
import { AnnouncementsFilterParams } from "@/types/request/announcements-filter-params.request";
import { Page } from "@/types/page";

export default function ProductsPage() {
  const [filters, setFilters] = useState<AnnouncementsFilterParams>({});
  const [announcements, setAnnouncements] = useState<AnnouncementTableResponse[]>();
  const [page, setPage] = useState<number>(0);
  const [pageData, setPageData] = useState<Page>();

  useEffect(() => {
    const payload = {
      ...filters,
      categories: filters.category ? [filters.category] : undefined,
    };
    findAllAnnouncementsBackoffice({ ...payload, page }).then((res) => {
      setAnnouncements(res.content);
      setPageData(res.page);
    });
  }, [filters, page]);

  return (
    <div className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-title text-base-2">Gestão de produtos</h1>
        </div>

        <DashboardAnnouncementsFilterForm onSubmitFilters={(filters) => setFilters(filters)} />
      </div>

      <div className="flex flex-col gap-8">
        {announcements && pageData && (
          <>
            <TabelaProdutos data={announcements} />
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
