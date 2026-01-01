"use client";

import { useEffect, useState } from "react";

export function useCollectionExpiry(endDate: string) {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const check = () => {
      setExpired(Date.now() >= new Date(endDate).getTime());
    };

    check();
    const timer = setInterval(check, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  return expired;
}
