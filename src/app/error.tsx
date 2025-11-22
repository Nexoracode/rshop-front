"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      dir="rtl"
      className={`
        relative min-h-screen flex items-center justify-center
        bg-gradient-to-br from-rose-100 via-purple-100 to-indigo-100
        p-6 overflow-hidden
      `}
    >
      {/* گرافیک پس‌زمینه */}
      <div className="absolute w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] -top-40 -left-40 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-[120px] -bottom-40 -right-40 animate-pulse delay-700" />

      {/* کارت خطا */}
      <Card
        className="
          relative z-10 max-w-md w-full p-2
          backdrop-blur-xl bg-white/70
          shadow-xl border border-white/40
          rounded-2xl animate-fadeIn
        "
      >
        <CardHeader className="flex flex-col items-center text-center">
          {/* آیکون */}
          <div className="relative">
            <div className="absolute inset-0 bg-red-400/30 blur-2xl rounded-full animate-pulse" />
            <AlertTriangle className="w-16 h-16 text-red-600 relative z-10 drop-shadow-lg" />
          </div>

          <CardTitle className="mt-4 text-2xl font-bold text-red-700">
            اوه! مشکلی رخ داده 😕
          </CardTitle>

          <CardDescription className="text-gray-600 mt-2">
            در هنگام بارگذاری این بخش خطایی رخ داد.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm shadow-inner leading-relaxed">
            {error.message || "خطای نامشخص"}
          </div>

          {error.digest && (
            <p className="text-xs text-gray-400 text-left ltr">
              Digest: {error.digest}
            </p>
          )}

          <Button
            onClick={() => reset()}
            className="
              w-full py-6 text-base font-medium rounded-xl
              transition-all duration-300
              hover:scale-[1.03]
            "
          >
            تلاش مجدد
          </Button>
        </CardContent>
      </Card>

      {/* انیمیشن */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
