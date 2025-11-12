import React, { ComponentProps } from "react";
import { Button } from "../ui/button";
import LoaderDots from "./LoaderDots";

type Props = {
  loading: boolean;
} & ComponentProps<typeof Button>;

export default function ButtonLoading({ children, loading, ...props }: Props) {
  return (
    <Button disabled={loading} {...props}>
      {!loading ? children : <LoaderDots size={24} />}
    </Button>
  );
}
