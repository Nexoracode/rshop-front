"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function InvoicePage() {
  const order = {
    id: 7845,
    date: "۲۶ مهر ۱۴۰۴",
    total: 1240000,
    payment: "زرین‌پال",
    status: "پرداخت‌شده",
  };

  const shipping = {
    recipient: "محمدحسین خادم‌المهدی",
    phone: "09121234567",
    address: "تهران، خیابان ولی‌عصر، کوچه ۱۲، پلاک ۴",
    postal_code: "1234567890",
  };

  const items = [
    {
      id: 1,
      name: "کتاب نهج‌البلاغه ترجمه دشتی",
      quantity: 1,
      price: 320000,
      image: "/images/products/book.jpg",
    },
    {
      id: 2,
      name: "مجموعه فرهنگی سیره علوی",
      quantity: 1,
      price: 920000,
      image: "/images/products/series.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-semibold">فاکتور فروش</h1>
          <p className="text-sm text-gray-500 mt-1">شماره سفارش: {order.id}</p>
          <p className="text-sm text-gray-500">تاریخ: {order.date}</p>
        </div>

        <Image
          src="/images/logo.png"
          alt="لوگو"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      <Separator className="mb-6" />

      {/* اطلاعات گیرنده */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">اطلاعات ارسال</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>گیرنده: {shipping.recipient}</p>
          <p>شماره تماس: {shipping.phone}</p>
          <p>آدرس: {shipping.address}</p>
          <p>کد پستی: {shipping.postal_code}</p>
        </div>
      </div>

      {/* اطلاعات پرداخت */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">اطلاعات پرداخت</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>روش پرداخت: {order.payment}</p>
          <p>وضعیت: {order.status}</p>
          <p className="col-span-2 font-medium text-primary">
            مبلغ کل: {order.total.toLocaleString("fa-IR")} تومان
          </p>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* اقلام سفارش */}
      <div>
        <h2 className="text-lg font-medium mb-3">اقلام سفارش</h2>
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 border-y">
            <tr>
              <th className="py-2 text-right pr-2">کالا</th>
              <th className="py-2">تعداد</th>
              <th className="py-2">قیمت واحد</th>
              <th className="py-2">قیمت کل</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="py-3 pr-2 flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md border"
                  />
                  <span>{item.name}</span>
                </td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center">
                  {item.price.toLocaleString("fa-IR")}
                </td>
                <td className="text-center font-medium">
                  {(item.price * item.quantity).toLocaleString("fa-IR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-sm text-gray-500">
        <p>فروشگاه آرشاپ</p>
        <p>www.arshop.ir</p>
      </div>
    </div>
  );
}
