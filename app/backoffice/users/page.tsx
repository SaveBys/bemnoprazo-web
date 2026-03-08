"use client";

import { Paginator } from "@/components/layout/paginator";
import { useEffect, useState } from "react";
import { Page } from "@/types/page";
import { getAllUsers } from "@/services/user.service";
import { UserFilterRequest } from "@/types/request/user-filter-params.request";
import { UserDataResponse } from "@/types/response/user-data.response";
import { TableDashboardUsers } from "@/components/layout/table-dashboard-users";
import { BackofficeClientFilterForm } from "@/components/layout/backoffice-client-management-filter-form";

export default function UsersPage() {
  const [filters, setFilters] = useState<UserFilterRequest>();
  const [users, setUsers] = useState<UserDataResponse[]>();
  const [page, setPage] = useState<number>(0);
  const [pageData, setPageData] = useState<Page>();

  useEffect(() => {
    getAllUsers({ ...filters, page }).then((res) => {
      setUsers(res.content);
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
        {users && pageData && (
          <>
            <TableDashboardUsers data={users} />
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
