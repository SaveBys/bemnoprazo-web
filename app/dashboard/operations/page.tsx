"use client";

import { TableDashboardOperations } from "@/components/layout/table-dashboard-operations";

import { Paginator } from "@/components/layout/paginator";
import { useEffect, useState } from "react";
import { Page } from "@/types/page";
import { findAllAnnouncementOperations } from "@/services/operation.service";
import { OperationFilterRequest } from "@/types/request/operation-filter-request.request";
import { OperationResponse } from "@/types/response/operation.response";
import { DashboardSellerOperationsFilterForm } from "@/components/layout/dashboard-seller-operations-filter-form";

export default function OperationsPage() {
  const [filters, setFilters] = useState<OperationFilterRequest>();
  const [operation, setOperation] = useState<OperationResponse[]>();
  const [page, setPage] = useState<number>(0);
  const [pageData, setPageData] = useState<Page>();

  useEffect(() => {
    findAllAnnouncementOperations({ ...filters, page }).then((res) => {
      setOperation(res.content);
      setPageData(res.page);
    });
  }, [filters, page]);

  return (
    <div className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-title text-base-2">Minhas operações</h1>
        </div>

        <DashboardSellerOperationsFilterForm onSubmitFilters={(filters) => setFilters(filters)} />
      </div>

      <div className="flex flex-col gap-8">
        {operation && pageData && (
          <>
            <TableDashboardOperations data={operation} />
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
