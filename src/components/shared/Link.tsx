import NextLink from "next/link";
import React, { ComponentProps } from "react";

export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
