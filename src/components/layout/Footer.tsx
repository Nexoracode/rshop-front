"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronUp, Phone, PhoneCall, Mail, Send } from "lucide-react";
import { brand, contact, linkColumns } from "@/data/footer";

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={"border-t bg-neutral-600 text-background mt-24 pb-16 md:pb-0"}
    >
      <div className={"container mx-auto px-4 py-8"}>
        {/* ========== ردیف اول: لوگو راست / بازگشت به بالا چپ ========== */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {brand.logoSrc ? (
              <Link
                href={brand.href ?? "/"}
                className="relative block h-12 w-20 shrink-0"
              >
                <Image
                  src={brand.logoSrc}
                  alt={brand.name}
                  fill
                  className="rounded-md object-contain"
                  sizes="180px"
                />
              </Link>
            ) : null}
            <Link
              href={brand.href ?? "/"}
              className="text-base font-semibold hover:underline"
            >
              {brand.name}
            </Link>
          </div>

          <Button
            type="button"
            size="sm"
            color="primary"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2"
            aria-label="بازگشت به بالا"
          >
            <ChevronUp className="h-4 w-4" />
            بالا
          </Button>
        </div>

        <Separator className="mt-5 mb-8" />

        {/* ========== ردیف وسط: چهار ستون (2/1/1/1) ========== */}
        <div className="grid grid-cols-1 gap-8 md:[grid-template-columns:2fr_1fr_1fr_1fr]">
          {/* ستون 1: ارتباط با ما + شبکه‌های اجتماعی پایین */}
          <div className="min-w-0 space-y-4">
            <p className="text-sm font-semibold">ارتباط با ما</p>

            <div className="space-y-5 text-sm">
              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 text-neutral-100 hover:text-white break-words"
                >
                  <Phone className="h-4 w-4" />
                  <span>تلفن ثابت: {contact.phone}</span>
                </a>
              )}
              {contact.mobile && (
                <a
                  href={`tel:${contact.mobile.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 text-neutral-100 hover:text-white break-words"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>همراه: {contact.mobile}</span>
                </a>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-neutral-100 hover:text-white break-all"
                >
                  <Mail className="h-4 w-4" />
                  <span>ایمیل: {contact.email}</span>
                </a>
              )}
              {contact.eitaa && (
                <a
                  href={`https://eitaa.com/s/Arshop`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-100 hover:text-white break-all"
                >
                  <Send className="h-4 w-4" />
                  <span>پشتیبانی ایتا: {contact.eitaa}</span>
                </a>
              )}
            </div>

            {/* شبکه‌های اجتماعی */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 pt-2">
              {contact.socials.map(({ Icon, ...s }) => (
                <Link
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="inline-flex  items-center justify-center rounded-md border w-10 h-10  text-white hover:text-neutral-100 transition "
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          {linkColumns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
          {/* ستون 2: راهنمای خرید */}
        </div>

        <Separator className="my-3" />

        {/* ========== ردیف پایین: کپی‌رایت راست / ای‌نماد + سامان‌دهی چپ ========== */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-background">
            {`© ${year} آکادمی روحبخش. تمامی حقوق محفوظ است.`}
          </p>

          <div className="flex items-center gap-3">
            <Image src={"/enamad.png"} width={120} height={120} alt="" />

            <Image src={"/saman.webp"} width={120} height={120} alt="" />
            {/* جای سامان‌دهی */}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- اجزای کمکی ---------- */

function FooterColumn({ title, links }: FooterColumn) {
  return (
    <nav aria-label={title} className="space-y-5">
      <p className="text-sm font-semibold">{title}</p>
      <ul className="space-y-4 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="transition block text-white hover:text-neutral-50 hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
