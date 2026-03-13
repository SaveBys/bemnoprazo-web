"use client";

import { Button } from "@/components/ui/button";
import {
  AccordionBase,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { findByIdAnnouncementOperations } from "@/services/announcement-operations.service";
import { useEffect, useState } from "react";
import React from "react";
import { AnnouncementOperationDetailsTable } from "@/types/response/announcement-operation-details-table.response";
import { formatCurrency } from "@/lib/utils";
import { OperationStatusEnum, OperationStatusEnumValue } from "@/types/enums/operation-status.enum";
import { getAnnouncementById } from "@/services/announcements.service";
import { Dialog, Message } from "@/components/layout/dialog";
import { approveOperation, cancelOperation } from "@/services/operation.service";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AnalysisPage({ params }: PageProps) {
  const [operations, setOperations] = useState<AnnouncementOperationDetailsTable[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>();
  const [open, setOpen] = useState(false);
  const [announcementName, setAnnouncementName] = useState<string>();
  const [page, setPage] = useState<number>();
  const { id } = React.use(params);

  const updateOperations = () => {
    getAnnouncementById(id).then((res) => setAnnouncementName(res.name));
    findByIdAnnouncementOperations(id, { page: 0 }).then((res) => {
      setOperations(res.content);
      setPage(res.page.number);
    });
  };

  useEffect(() => {
    updateOperations();
  }, [id, page]);

  async function handleCancel(operationId: string) {
    try {
      setLoading(true);
      await cancelOperation(operationId);
      setMessage({
        title: "Sucesso!",
        description: "Operação cancelada.",
      });
      setOpen(true);
      updateOperations();
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(operationId: string) {
    try {
      setLoading(true);
      await approveOperation(operationId);
      setMessage({
        title: "Sucesso!",
        description: "Operação aprovada.",
      });
      setOpen(true);
      updateOperations();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4">
      <div className="flex flex-col gap-8">
        <h1 className="text-title text-base-2">Analisar proposta</h1>

        <div className="row flex items-center gap-2">
          <h2 className="text-subtitle text-primary-2">{announcementName}</h2>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-subtitle text-base-2">Propostas</h1>
          {operations?.map((operation) => (
            <AccordionBase
              key={operation.operationId}
              type="single"
              collapsible
              className="flex w-full flex-col gap-4"
              defaultValue="billing"
            >
              <AccordionItem
                value={operation.operationId}
                className="border-base-2 rounded-md border px-4"
              >
                <div className="flex flex-col gap-3">
                  <AccordionTrigger>
                    <div className="flex flex-col gap-4">
                      <p className="flex items-center gap-2">
                        <span className="text-subtitle text-base-2">Código:</span>
                        <span className="text-subtitle text-base-2">{operation.code}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-content text-base-2">Comprador:</span>
                        <span className="text-legend text-base-2">{operation.buyerName}</span>
                      </p>

                      {operation.operationStatus && (
                        <p className="flex items-center gap-2">
                          <span className="text-content text-base-2">Status:</span>
                          <span className="text-legend text-base-2">
                            {OperationStatusEnumValue(operation.operationStatus).label}
                          </span>
                        </p>
                      )}
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="flex flex-col gap-4">
                      <p className="flex items-center gap-2">
                        <span className="text-content text-base-2">Quantidade:</span>
                        <span className="text-legend text-base-2">{operation.quantity}</span>
                      </p>

                      <p className="flex items-center gap-2">
                        <span className="text-content text-base-2">Preço:</span>
                        <span className="text-legend text-base-2">
                          {formatCurrency(operation.price)}
                        </span>
                      </p>
                    </div>

                    <hr className="border-base-3 mt-4 mb-3 border" />

                    <div className="flex-items-center flex justify-between pt-2 pb-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleCancel(operation.operationId)}
                        loading={loading}
                        disabled={!(operation.operationStatus == OperationStatusEnum.CREATED)}
                      >
                        Recusar
                      </Button>

                      <Button
                        onClick={() => handleApprove(operation.operationId)}
                        loading={loading}
                        disabled={!(operation.operationStatus == OperationStatusEnum.CREATED)}
                      >
                        Aprovar
                      </Button>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            </AccordionBase>
          ))}
        </div>
      </div>

      <Dialog
        open={open}
        setOpen={setOpen}
        title={message?.title}
        description={message?.description}
        onActionClick={message?.callback}
      />
    </div>
  );
}
