"use client"

import { Paginator } from "@/components/layout/paginator"
import { useEffect, useState } from "react"
import { DashboardUsersManagementFilterForm } from "@/components/layout/dashboard-user-management-filter-form"
import { AnnouncementsFilterParams } from "@/types/request/announcements-filter-params.request"
import { Page } from "@/types/page"
import { TableDashboardUsers } from "@/components/layout/table-dashboard-users"
import { getAllCompanyUsers } from "@/services/user.service"
import { UserDataResponse } from "@/types/response/user-data.response"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function UsersPage() {
  const [filters, setFilters] = useState<AnnouncementsFilterParams>({})
  const [announcements, setAnnouncements] = useState<UserDataResponse[]>()
  const [page, setPage] = useState<number>(0)
  const [pageData, setPageData] = useState<Page>()

  useEffect(() => {
    getAllCompanyUsers({ page, size: 10, ...filters }).then((res) => {
      setAnnouncements(res.content)
      setPageData(res.page)
    })
  }, [filters, page])

  return (
    <div className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-title text-base-2">Gestão de usuários</h1>

          <Button variant="secondary" href="/dashboard/users/new-user" isLink>
            <PlusIcon className="size-5" />
            <span>Novo usuário</span>
          </Button>
        </div>

        <DashboardUsersManagementFilterForm onSubmitFilters={(filters) => setFilters(filters)} />
      </div>

      <div className="flex flex-col gap-8">
        {announcements && pageData && (
          <>
            <TableDashboardUsers data={announcements} />
            <Paginator
              pageData={pageData}
              currentPage={page}
              onPageChange={(newPage) => {
                setPage(newPage)
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
