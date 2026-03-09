import Image from "@/components/common/Image";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <Header />
      <main className="px-2 md:px-0 min-h-screen">
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background text-center">
          {/* Custom SVG – no person, no external asset */}

          <Image width={400} height={400} alt="" src={"/not-found.svg"} />
          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            چیزی پیدا نشد
          </h1>

          {/* Description */}
          <p className="text-sm text-muted-foreground max-w-md mb-8">
            صفحه یا محتوایی که به دنبال آن بودید وجود ندارد یا حذف شده است.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
            >
              صفحه اصلی
            </Link>

            <button
              //   onClick={() => history.back()}
              className="px-5 py-2.5 rounded-lg border text-sm font-medium"
            >
              بازگشت
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
