import React from "react";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

type LoadMoreTriggerProps = {
  isFetching: boolean;
  message?: string; // متن اختیاری هنگام لودینگ
  className?: string;
};

const LoadMoreTrigger = forwardRef<HTMLDivElement, LoadMoreTriggerProps>(
  (
    {
      isFetching,
      message = "در حال بارگذاری محصولات بیشتر...",
      className = "",
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`
          flex 
          min-h-[80px] 
          items-center 
          justify-center 
          py-6 
          text-muted-foreground 
          transition-opacity 
          duration-300 
          ${className}
        `}
      >
        {isFetching ? (
          <div className="flex flex-col items-center gap-3 animate-fade-in">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-sm">{message}</span>
          </div>
        ) : (
          // وقتی هنوز لود نشده، یک فضای خالی نگه می‌داره تا observer فعال بمونه
          <div className="h-10 w-full" aria-hidden="true" />
        )}
      </div>
    );
  },
);

LoadMoreTrigger.displayName = "LoadMoreTrigger";

export default LoadMoreTrigger;
