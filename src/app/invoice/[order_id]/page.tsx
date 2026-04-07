"use client";
import PageLoader from "@/components/common/PageLoader";
import { statusLabel } from "@/data/order";
import { toPersianDate } from "@/lib/utils/date-time";
import { formatToman } from "@/lib/utils/price";
import { getOrderDetails } from "@/queries/profile/order";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

export default function Invoice() {
  const handlePrint = () => window.print();

  const { order_id } = useParams();

  const { data, isPending } = useQuery(getOrderDetails(Number(order_id)));

  return isPending ? (
    <PageLoader />
  ) : !data ? (
    <div>NOT FOUND</div>
  ) : (
    <div className="space-y-4">
      <div className="print:hidden mt-10 w-[29.7cm] mx-auto p-4 flex justify-between items-center border-b-3 text-center">
        <div className="font-medium text-lg">صورت حساب فروش الکترونیکی</div>
        <div className="flex justify-between">
          <button
            onClick={handlePrint}
            className="bg-black text-white px-5 py-2 rounded hover:bg-neutral-800 transition"
          >
            چاپ
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center bg-neutral-100 print:bg-white">
        <div className="w-[29.7cm] min-h-[21cm] bg-white p-10 print:p-6 text-[11pt] leading-[1.7] shadow print:shadow-none border border-neutral-300 rounded">
          {/* Header */}
          <div className="mb-8 pb-4 border-b border-neutral-300">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-[18pt] font-bold">فاکتور فروش</h1>
                <div className="text-neutral-500 text-[10pt]">
                  صورت حساب الکترونیکی
                </div>
              </div>
              <div className="text-right text-[10pt] space-y-1">
                <div>
                  <span className="font-bold">شماره فاکتور:</span> 123456
                </div>
                <div>
                  <span className="font-bold">تاریخ:</span> 1403/08/25
                </div>
                <div>
                  <span className="font-bold">پیگیری:</span> 987654321
                </div>
              </div>
            </div>
          </div>

          {/* Seller / Buyer */}
          <div className="mb-8 p-4 rounded border border-neutral-200 bg-neutral-50">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="font-bold text-[11pt] mb-1 text-neutral-700">
                  فروشنده
                </div>
                <div className="text-[10pt] text-neutral-700">
                  فروشگاه آرشاپ
                  <br />
                  شناسه ملی: 1234567890
                  <br />
                  آدرس: تهران...
                  <br />
                  تلفن: 021-12345678
                </div>
              </div>

              <div>
                <div className="font-bold text-[11pt] mb-1 text-neutral-700">
                  خریدار
                </div>
                <div className="text-[10pt] text-neutral-700">
                  {`${data.user.first_name} ${data.user.last_name}`}
                  <br />
                  کد ملی: {data.user.phone}
                  <br />
                  آدرس:{" "}
                  {`${data.address.province}، ${data.address.city}، ${data.address.address_line}، پلاک ${data.address.plaque}، واحد ${data.address.unit}`}
                  <br />
                  تلفن: {data.user.phone}
                </div>
              </div>
            </div>
          </div>

          {/* Order info */}
          <div className="mb-8 p-4 rounded border border-neutral-200 bg-neutral-50">
            <div className="font-bold text-[11pt] mb-2 text-neutral-700">
              مشخصات سفارش
            </div>
            <div className="grid grid-cols-2 text-[10pt] text-neutral-700 gap-y-1">
              <div>روش پرداخت: {""}</div>
              <div>وضعیت پرداخت: {statusLabel[data.status]}</div>
              <div>شماره پیگیری: {data.payment_gateway_ref}</div>
              <div>تاریخ پرداخت: {toPersianDate(data.updated_at)}</div>
            </div>
          </div>

          {/* Table */}
          <div className="mb-8">
            <div className="font-bold text-[11pt] mb-2 text-neutral-700">
              لیست اقلام
            </div>
            <table className="w-full border-collapse text-[10pt]">
              <thead>
                <tr className="border-b border-neutral-300 bg-neutral-100">
                  <th className="text-right p-2 font-medium">شرح</th>
                  <th className="p-2 font-medium">تعداد</th>
                  <th className="p-2 font-medium">قیمت واحد</th>
                  <th className="p-2 font-medium">تخفیف</th>
                  <th className="p-2 font-medium">جمع کل</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-200">
                    <td className="p-2 text-right">
                      {item.product.name}
                      {item.variant ? "(" + item.variant.name + ")" : ""}
                    </td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-center">
                      {formatToman(+item.unit_price, false)}
                    </td>
                    <td className="p-2 text-center">
                      {formatToman(+item.discount, false)}
                    </td>
                    <td className="p-2 text-center font-medium">
                      {formatToman(+item.line_total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mb-8 p-4 rounded border border-neutral-200 bg-neutral-50 w-64 ml-auto space-y-1 text-[10pt]">
            <div className="flex justify-between">
              <span>جمع کالاها</span>
              <span>{formatToman(+data.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>تخفیف</span>
              <span>{formatToman(+data.discount_total)}</span>
            </div>
            <div className="flex justify-between font-bold text-[11pt] border-t pt-2">
              <span>قابل پرداخت</span>
              <span>{formatToman(+data.total)}</span>
            </div>
          </div>

          {/* Signature */}
          <div className="flex justify-between text-[10pt]">
            <div className="w-48 h-20 border border-neutral-300 rounded flex items-center justify-center">
              مهر و امضای فروشنده
            </div>
            <div className="w-48 h-20 border border-neutral-300 rounded flex items-center justify-center">
              مهر و امضای خریدار
            </div>
          </div>

          {/* Print */}
        </div>
      </div>
    </div>
  );
}
