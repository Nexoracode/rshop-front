import React from "react";
import NextImage from "next/image";
import { ImageProps } from "next/image";

type Props = ImageProps;

export default function Image({ ...props }: Props) {
  return (
    <NextImage
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={75}
      placeholder="blur"
      blurDataURL="data:..."
      loading="lazy" // برای تصاویر پایین صفحه
      {...props}
    />
  );
}
