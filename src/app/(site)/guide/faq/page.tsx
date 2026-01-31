"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, HelpCircle } from "lucide-react";

// ──────────────────────────────────────────────
// داده‌های سوالات متداول یک فروشگاه اینترنتی
// ──────────────────────────────────────────────
const faqData = [
  {
    category: "ثبت سفارش و خرید",
    questions: [
      {
        question: "چگونه می‌توانم سفارش ثبت کنم؟",
        answer:
          "پس از انتخاب کالا، روی دکمه «افزودن به سبد خرید» کلیک کنید. سپس به سبد خرید بروید و گزینه «تکمیل سفارش» را انتخاب نمایید. مراحل پرداخت و ثبت آدرس را تکمیل کنید.",
      },
      {
        question: "آیا می‌توانم سفارش را تلفنی ثبت کنم؟",
        answer:
          "در حال حاضر امکان ثبت سفارش تلفنی وجود ندارد. لطفاً از طریق وب‌سایت یا اپلیکیشن اقدام به خرید نمایید.",
      },
      {
        question: "حداقل مبلغ سفارش چقدر است؟",
        answer:
          "حداقل مبلغ سفارش برای ارسال رایگان ۵۰۰,۰۰۰ تومان است (بسته به شهر و روش ارسال ممکن است متفاوت باشد).",
      },
    ],
  },
  {
    category: "پرداخت",
    questions: [
      {
        question: "روش‌های پرداخت موجود چیست؟",
        answer:
          "پرداخت آنلاین با تمام کارت‌های شتاب، پرداخت در محل (برای برخی شهرها)، پرداخت با کد تخفیف و اعتبار هدیه.",
      },
      {
        question: "آیا پرداخت در محل دارید؟",
        answer:
          "بله، برای بسیاری از شهرها و برخی کالاها امکان پرداخت در محل وجود دارد. در صفحه محصول و سبد خرید مشخص شده است.",
      },
      {
        question: "فاکتور رسمی می‌دهید؟",
        answer:
          "بله، برای تمام سفارش‌ها فاکتور رسمی با کد اقتصادی و اطلاعات کامل شرکت صادر می‌شود.",
      },
    ],
  },
  {
    category: "ارسال و تحویل",
    questions: [
      {
        question: "هزینه ارسال چقدر است؟",
        answer:
          "ارسال رایگان برای سفارش‌های بالای ۵۰۰,۰۰۰ تومان (در تهران و شهرستان‌ها متفاوت است). هزینه پست پیشتاز، تیپاکس و پیک طبق تعرفه محاسبه می‌شود.",
      },
      {
        question: "سفارش من چه زمانی تحویل می‌شود؟",
        answer:
          "تهران: معمولاً ۱–۳ روز کاری | شهرستان‌ها: ۲–۷ روز کاری (بسته به روش ارسال و موجودی انبار).",
      },
      {
        question: "آیا امکان تغییر آدرس پس از ثبت سفارش وجود دارد؟",
        answer:
          "اگر سفارش هنوز ارسال نشده باشد، می‌توانید از طریق پنل کاربری یا تماس با پشتیبانی تغییر دهید.",
      },
    ],
  },
  {
    category: "مرجوعی و بازگشت کالا",
    questions: [
      {
        question: "شرایط مرجوع کردن کالا چیست؟",
        answer:
          "۷ روز ضمانت بازگشت وجه برای کالاهای فیزیکی (در صورتی که کالا استفاده نشده و پلمپ باشد). برخی کالاها (مانند لوازم آرایشی باز شده، کالاهای بهداشتی) قابل مرجوع نیستند.",
      },
      {
        question: "چگونه درخواست مرجوعی ثبت کنم؟",
        answer:
          "به بخش «سفارش‌های من» بروید → سفارش مورد نظر → گزینه «درخواست مرجوعی» را انتخاب کنید و دلیل را مشخص نمایید.",
      },
      {
        question: "هزینه بازگشت کالا با چه کسی است؟",
        answer:
          "در صورت اشتباه فروشگاه (ارسال کالای اشتباه یا معیوب) هزینه بازگشت رایگان است. در غیر این صورت هزینه با خریدار خواهد بود.",
      },
    ],
  },
  {
    category: "گارانتی و خدمات پس از فروش",
    questions: [
      {
        question: "آیا کالاها گارانتی دارند؟",
        answer:
          "تمام کالاهای دارای گارانتی رسمی ( golden، مادیران، آواژنگ و ...) با گارانتی اصلی عرضه می‌شوند. مدت گارانتی در صفحه محصول مشخص است.",
      },
      {
        question: "برای استفاده از گارانتی چه کنم؟",
        answer:
          "به پنل کاربری → سفارش‌ها → درخواست گارانتی/تعویض. یا مستقیماً با شرکت گارانتی‌کننده تماس بگیرید.",
      },
    ],
  },
  {
    category: "حساب کاربری و عضویت",
    questions: [
      {
        question: "چگونه حساب کاربری بسازم؟",
        answer:
          "با شماره موبایل یا ایمیل ثبت‌نام کنید. کد تأیید برای شما ارسال می‌شود.",
      },
      {
        question: "آیا می‌توانم بدون ثبت‌نام خرید کنم؟",
        answer: "بله، امکان خرید به صورت مهمان (بدون عضویت) وجود دارد.",
      },
    ],
  },
  {
    category: "کد تخفیف و اعتبار",
    questions: [
      {
        question: "کد تخفیف چگونه اعمال می‌شود؟",
        answer:
          "در مرحله پرداخت، در قسمت «کد تخفیف» کد را وارد و «اعمال» را بزنید.",
      },
      {
        question: "اعتبار هدیه تا چه زمانی معتبر است؟",
        answer:
          "اعتبار هدیه معمولاً ۶۰ روز از زمان دریافت معتبر است (در پروفایل قابل مشاهده است).",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return faqData;

    const lowerSearch = searchTerm.toLowerCase().trim();

    return faqData
      .map((cat) => ({
        ...cat,
        questions: cat.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(lowerSearch) ||
            q.answer.toLowerCase().includes(lowerSearch)
        ),
      }))
      .filter((cat) => cat.questions.length > 0);
  }, [searchTerm]);

  const highlight = (text: string) => {
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-100 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const totalQuestions = faqData.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  );
  const foundQuestions = filteredData.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  );

  return (
    <div className="container max-w-5xl py-12 md:py-20 mx-auto">
      <div className="max-w-4xl mx-auto">
        {/* هدر */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm mb-4">
            <HelpCircle className="h-4 w-4" />
            <span>سوالات متداول</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            سوالات متداول فروشگاه
          </h1>
          <p className="text-lg text-muted-foreground">
            پاسخ به رایج‌ترین پرسش‌های مشتریان عزیز
          </p>
        </div>

        {/* باکس جستجو */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="جستجو در سوالات... (مثال: مرجوعی، ارسال، پرداخت)"
              className="h-12 pl-12 text-base md:text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <p className="text-center mt-3 text-sm text-muted-foreground">
              {foundQuestions} مورد از {totalQuestions} سوال یافت شد
            </p>
          )}
        </div>

        {/* تب‌ها */}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 h-auto p-1.5 bg-muted/50 rounded-xl">
            <TabsTrigger value="all" className="py-2.5 text-sm md:text-base">
              همه
            </TabsTrigger>
            {faqData.map((cat) => (
              <TabsTrigger
                key={cat.category}
                value={cat.category}
                className="py-2.5 text-sm md:text-base whitespace-nowrap"
              >
                {cat.category}
                <Badge variant="neutral" className="ml-1.5 text-xs">
                  {cat.questions.length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* تب همه + جستجو */}
          <TabsContent value="all">
            {filteredData.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                هیچ سوالی با عبارت جستجو شده یافت نشد.
              </div>
            ) : (
              <Accordion type="multiple" className="space-y-4">
                {filteredData.flatMap((category) =>
                  category.questions.map((item, idx) => (
                    <AccordionItem
                      key={`${category.category}-${idx}`}
                      value={`${category.category}-${idx}`}
                      className="border rounded-lg px-4 bg-card shadow-sm"
                    >
                      <AccordionTrigger className="text-right hover:no-underline font-medium py-4">
                        <div className="flex flex-col items-start gap-1 text-right">
                          <span>{highlight(item.question)}</span>
                          <span className="text-xs text-muted-foreground">
                            {category.category}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 pt-2 text-muted-foreground leading-relaxed">
                        {highlight(item.answer)}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                )}
              </Accordion>
            )}
          </TabsContent>

          {/* تب‌های دسته‌بندی */}
          {faqData.map((category) => (
            <TabsContent key={category.category} value={category.category}>
              <Accordion type="multiple" className="space-y-4">
                {category.questions.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={idx.toString()}
                    className="border rounded-lg px-4 bg-card shadow-sm"
                  >
                    <AccordionTrigger className="text-right hover:no-underline font-medium py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pt-2 text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>

        {/* بخش پایانی */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>سوال دیگری دارید که در اینجا نیامده است؟</p>
          <a
            href="/contact"
            className="text-primary hover:underline font-medium"
          >
            با پشتیبانی تماس بگیرید →
          </a>
        </div>
      </div>
    </div>
  );
}
