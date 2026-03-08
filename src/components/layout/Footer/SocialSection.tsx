import React from "react";
import SocialLinks from "./SocialLinks";
import { getQueryClient } from "@/lib/utils/query-client";
import { getFooterSettings } from "@/queries/home/home";

export default async function SocialSection() {
  const queryClient = getQueryClient();
  const { social } = await queryClient.fetchQuery(getFooterSettings);
  return <SocialLinks data={social} />;
}
