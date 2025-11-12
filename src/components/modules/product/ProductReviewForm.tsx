import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { addProductReview, updateReview } from "@/queries/reviews";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import RatingField from "./RatingField";
import TextField from "@/components/common/Form/TextField";
import Image from "next/image";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { Review } from "@/types/user";

type Props = {
  product_id: number;
  product_image: string;
  product_name: string;
  review?: Review | null;
};
export default function ProductReviewForm({
  product_id,
  product_image,
  product_name,
  review,
}: Props) {
  const { mutate, isPending, isSuccess } = useMutation(addProductReview);
  const {
    mutate: update,
    isPending: updatePending,
    isSuccess: updateSuccess,
  } = useMutation(updateReview);
  const form = useForm({ values: review || { commnet: "", rating: 5 } });
  const handleSubmit = ({ comment, rating }: FieldValues) => {
    if (review)
      return update({ id: review.id, comment, productId: product_id, rating });
    mutate({ comment, productId: product_id, rating });
  };
  return isSuccess || updateSuccess ? (
    <SubmitSuccess />
  ) : (
    <>
      <p>به این محصول چه امتیازی می دهید</p>
      <div className="flex items-center justify-start">
        <Image
          src={product_image ?? PRODUCT_PLACEHOLDER}
          width={80}
          height={80}
          className="border rounded-md p-1"
          alt=""
        />

        <p className="ps-3 text-muted-foreground">{product_name}</p>
      </div>

      <div className="space-y-6 flex flex-col items-center">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-4"
          >
            <RatingField name="rating" />

            <div className="w-full">
              <TextField type="textarea" required multiple name="comment" />
            </div>
            <Button
              type="submit"
              isLoading={isPending || updatePending}
              className="w-full"
            >
              ثبت دیدگاه
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}

function SubmitSuccess() {
  return (
    <>
      {/* Animated Icon */}
      <div className="flex justify-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 animate-pop-in" />
      </div>

      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          دیدگاه شما با موفقیت ثبت شد ✅
        </DialogTitle>
      </DialogHeader>

      <p className="text-sm text-muted-foreground leading-relaxed">
        دیدگاه شما پس از بررسی و تأیید تیم پشتیبانی نمایش داده خواهد شد. از
        همراهی شما سپاسگزاریم 🌱
      </p>

      <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center pt-2">
        <DialogClose asChild>
          <Button fullWidth>فهمیدم</Button>
        </DialogClose>

        <Button href="/profile/reviews" variant="outline" fullWidth>
          دیدگاه های من
        </Button>
      </DialogFooter>
    </>
  );
}
