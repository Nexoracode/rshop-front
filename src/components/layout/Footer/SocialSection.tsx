"use client"

import React from "react";
import SocialLinks from "./SocialLinks";
import { getFooterSettings } from "@/queries/home/home";
import { useQuery } from "@tanstack/react-query";

export default function SocialSection() {
  const { data } =  useQuery(getFooterSettings);
  if (!data) {
    return <div>در حال لود فوتر</div>
  }
  return <SocialLinks data={data?.social} />;
}
