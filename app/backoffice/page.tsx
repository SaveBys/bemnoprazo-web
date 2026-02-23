"use client";

import { TabelaProdutos } from "@/components/layout/tabela-produtos";

import { Button } from "@/components/ui/button";
import { Paginator } from "@/components/layout/paginator";
import { useEffect, useState } from "react";
import { DashboardAnnouncementsFilterForm } from "@/components/layout/dashboard-produtcs-filter-form";
import { findAllAnnouncementsBackoffice, findAllMyAnnouncements } from "@/services/announcements.service";
import { AnnouncementTableResponse } from "@/types/announcement-table.response";
import { AnnouncementsFilterParams } from "@/types/announcements-filter-params.request";
import { Page } from "@/types/page";
import { PlusIcon } from "lucide-react";

export default function BackofficePage() {
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
    <div className="w-full flex flex-col gap-8 pr-4 py-8 overflow-x-scroll">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-title text-base-2">Meus produtos</h1>
          <Button variant="secondary">
            <PlusIcon className="size-5" />
            <span>Novo produto</span>
          </Button>
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
