"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import React, { PropsWithChildren } from "react";
import PageLoader from "./PageLoader";
import { redirect, usePathname } from "next/navigation";

export default function AuthWarpper({ children }: PropsWithChildren) {
  const { isPending, user } = useCurrentUser();
  const pathName = usePathname();
  return isPending ? (
    <PageLoader />
  ) : user ? (
    children
  ) : (
    redirect(`/users/login?redirect?${pathName}`)
  );
}
