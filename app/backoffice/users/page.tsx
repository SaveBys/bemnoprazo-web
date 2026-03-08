"use client";

import { TabelaUsers } from "@/components/layout/tabela-users";
import { Paginator } from "@/components/layout/paginator";
import { useEffect, useState } from "react";
import { findAllMyAnnouncements } from "@/services/announcements.service";
import { Page } from "@/types/page";
import { AnnouncementsFilterParams } from "@/types/request/announcements-filter-params.request";
import { AnnouncementTableResponse } from "@/types/response/announcement-table.response";
import { BackofficeClientFilterForm } from "@/components/layout/backoffice-client-management-filter-form";

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
    <div className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4">
      <div className="flex flex-col gap-8">
        <h1 className="text-title text-base-2">Gestão de clientes</h1>

        <BackofficeClientFilterForm onSubmitFilters={(filters) => setFilters(filters)} />
      </div>

      <div className="flex flex-col gap-8">
        {announcements && pageData && (
          <>
            <TabelaUsers data={{} as any} />
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
