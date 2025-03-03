"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const isSuccess = title?.includes("Success");
        const isError = title?.includes("Error");
        return (
          <Toast
            key={id}
            {...props}
            className={`border-l-4 ${
              isSuccess ? "border-green-500" : isError ? "border-red-500" : ""
            }`}
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle
                  className={`${isSuccess ? "text-green-600" : isError ? "text-red-600" : ""} font-bold`}
                >
                  {title}
                </ToastTitle>
              )}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport className="fixed top-4 right-4 z-[9999] flex flex-col gap-4 !bottom-auto !top-4" />
    </ToastProvider>
  )
}
