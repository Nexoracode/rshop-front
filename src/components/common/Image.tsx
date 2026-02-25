import React from "react";
import NextImage from "next/image";
import { ImageProps } from "next/image";

type Props = ImageProps;

export default function Image({ ...props }: Props) {
  return (
    <NextImage
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZmlsdGVyIGlkPSJiIj4KICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEyIiAvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMmU4ZjAiIGZpbHRlcj0idXJsKCNiKSIgLz4KPC9zdmc+"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
}
