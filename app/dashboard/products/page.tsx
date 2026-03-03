"use client";

import { TabelaProdutos } from "@/components/layout/tabela-produtos";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { Paginator } from "@/components/layout/paginator";
import { useEffect, useState } from "react";
import { DashboardAnnouncementsFilterForm } from "@/components/layout/dashboard-produtcs-filter-form";
import { findAllMyAnnouncements } from "@/services/announcements.service";
import { AnnouncementsFilterParams } from "@/types/request/announcements-filter-params.request";
import { AnnouncementTableResponse } from "@/types/response/announcement-table.response";
import { Page } from "@/types/page";

export default function DashboardPage() {
  const [filters, setFilters] = useState<AnnouncementsFilterParams>({});
  const [announcements, setAnnouncements] = useState<AnnouncementTableResponse[]>();
  const [page, setPage] = useState<number>(0);
  const [pageData, setPageData] = useState<Page>();

  useEffect(() => {
    const { category, ...rest } = filters;
    const payload = {
      ...rest,
      categories: category ? [category] : undefined,
    };
    findAllMyAnnouncements({ ...payload, page, size: 9 }).then((res) => {
      setAnnouncements(res.content);
      setPageData(res.page);
    });
  }, [filters, page]);

  return (
    <div className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-title text-base-2">Meus produtos</h1>
          <Button variant="secondary" href="/dashboard/products/new-product" isLink>
            <PlusIcon className="size-5" />
            <span>Novo produto</span>
          </Button>
        </div>

        <DashboardAnnouncementsFilterForm
          onSubmitFilters={(filters) => {
            setPage(0);
            setFilters(filters);
          }}
        />
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
