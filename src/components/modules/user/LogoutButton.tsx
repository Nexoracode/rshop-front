"use client";
import React, { useEffect, useState } from "react";
import { LogOutIcon } from "lucide-react";

import { useMutation } from "@tanstack/react-query";
import { userLogout } from "@/queries/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending, isSuccess } = useMutation(userLogout);
  const handleLogout = async () => {
    try {
      mutate();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isSuccess) setOpen(false);
  }, [isSuccess, setOpen]);
  return (
    <React.Fragment>
      <button
        onClick={() => setOpen(true)}
        className="flex px-3 w-full items-center hover:bg-neutral-100 transition-colors"
      >
        <span className="w-6 h-6 ml-3 text-danger-400">{<LogOutIcon />}</span>

        <span className="inline-block text-right font-medium flex-1 text-danger-400 py-3 ps-2">
          {"خروج از حساب کاربری"}
        </span>
      </button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent>
          <DialogTitle>از حساب کاربری خارج می شوید؟</DialogTitle>
          <div>
            با خروج از حساب کاربری به سبد خرید فعلی تان دسترسی نخواهید داشت
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>انصراف</Button>
            </DialogClose>

            <Button
              onClick={handleLogout}
              isLoading={isPending}
              color="primary"
              variant={"fill"}
            >
              خروج از حساب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
