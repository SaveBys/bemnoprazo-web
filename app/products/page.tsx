"use client";

import { CardProducts } from "@/components/layout/card-products";
import { FilterProducts } from "@/components/layout/filter-products";
import { Paginator } from "@/components/layout/paginator";
import { Page } from "@/types/page";
import { AnnouncementResumeResponse } from "@/types/annoucement-resume.response";
import { useEffect, useState } from "react";
import { AnnouncementsFilterParams } from "@/types/announcements-filter-params.request";
import { findAllAnnouncements } from "@/services/announcements.service";

export default function Produtos() {
  const [announcements, setAnnouncements] = useState<
    AnnouncementResumeResponse[]
  >([]);
  const [pageData, setPageData] = useState<Page>();
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    findAllAnnouncements({ page, size: 9 }).then((res) => {
      setAnnouncements(res.content);
      setPageData(res.page);
    });
  }, [page]);

  const handleFilter = (data: AnnouncementsFilterParams) => {
    findAllAnnouncements({ ...data, page, size: 9 }).then((res) => {
      setAnnouncements(res.content);
      setPageData(res.page);
    });
  };

  return (
    <main className="width-barrier flex gap-8 px-11 py-16 m-auto">
      <FilterProducts onSubmitFilters={(data) => handleFilter(data)} />

      <div className="w-full flex flex-col gap-8">
        <div className="w-full grid grid-cols-3 grid-rows-3 gap-4">
          {announcements.map((announcement) => {
            return <CardProducts key={announcement.id} data={announcement} />;
          })}
        </div>

        <Paginator
          pageData={pageData}
          currentPage={page}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      </div>
    </main>
  );
}
