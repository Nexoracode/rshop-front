import { ArrowLeftCircleIcon } from "lucide-react";
import React from "react";

type Props = {
  setShowAll: () => void;
};

export default function DisplayAllReviews({ setShowAll }: Props) {
  return (
    <React.Fragment>
      <div
        onClick={setShowAll}
        className="flex h-60 w-[9rem] shrink-0  items-center justify-center"
      >
        <button className="flex gap-3 flex-col items-center">
          <ArrowLeftCircleIcon size={42} strokeWidth={1} />
          <span className="text-xs">مشاهده همه</span>
        </button>
      </div>
    </React.Fragment>
  );
}
