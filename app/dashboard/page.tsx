"use client";

import { TabelaProdutos } from "@/components/layout/tabela-produtos";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { Paginator } from "@/components/layout/paginator";
import { useEffect, useState } from "react";
import { DashboardAnnouncementsFilterForm } from "@/components/layout/dashboard-produtcs-filter-form";
import { findAllMyAnnouncements } from "@/services/announcements.service";
import { AnnouncementsFilterParams } from "@/types/announcements-filter-params.request";
import { AnnouncementTableResponse } from "@/types/announcement-table.response";

export default function DashboardPage() {
  const [filters, setFilters] = useState<AnnouncementsFilterParams>({});
  const [announcements, setAnnouncements] = useState<AnnouncementTableResponse[]>();
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    findAllMyAnnouncements(filters).then((res) => setAnnouncements(res.content));
  }, [filters]);

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
        {announcements && (
          <>
            <TabelaProdutos data={announcements} />
            <Paginator
              pageData={{ number: 1, totalElements: 1, totalPages: 1, size: 1 }}
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
