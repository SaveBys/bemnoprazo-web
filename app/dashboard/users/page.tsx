"use client";

import { TabelaProdutos } from "@/components/layout/tabela-produtos";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { Paginator } from "@/components/layout/paginator";
import { useEffect, useState } from "react";
import { DashboardUsersManagementFilterForm } from "@/components/layout/dashboard-user-management-filter-form";
import { findAllMyAnnouncements } from "@/services/announcements.service";
import { AnnouncementsFilterParams } from "@/types/announcements-filter-params.request";
import { AnnouncementTableResponse } from "@/types/announcement-table.response";
import { Page } from "@/types/page";

export default function UsersPage() {
  const [filters, setFilters] = useState<AnnouncementsFilterParams>({});
  const [announcements, setAnnouncements] = useState<AnnouncementTableResponse[]>();
  const [page, setPage] = useState<number>(0);
  const [pageData, setPageData] = useState<Page>();

  useEffect(() => {
    findAllMyAnnouncements({ ...filters, page }).then((res) => {
      setAnnouncements(res.content);
      setPageData(res.page);
    });
  }, [filters, page]);

  return (
    <div className="w-full flex flex-col gap-8 pr-4 py-8 overflow-x-scroll">
      <div className="flex flex-col gap-8">
        <h1 className="text-title text-base-2">Gestão de usuários</h1>

        <DashboardUsersManagementFilterForm onSubmitFilters={(filters) => setFilters(filters)} />
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