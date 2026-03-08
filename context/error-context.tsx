"use client";

import { createContext, useContext, useState } from "react";
import { Dialog, Message } from "@/components/layout/dialog";

type ErrorContextType = {
  showError: (message: Message) => void;
};

const ErrorContext = createContext<ErrorContextType | null>(null);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message>();

  function showError(msg: Message) {
    setMessage(msg);
    setOpen(true);
  }

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}

      <Dialog
        open={open}
        setOpen={setOpen}
        title={message?.title}
        description={message?.description}
        onActionClick={message?.callback}
      />
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useError must be used inside ErrorProvider");
  }

  return context;
}
