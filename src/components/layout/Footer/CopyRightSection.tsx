import Image from "@/components/common/Image";

export default function CopyRightSection() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col gap-3 pt-12 pb-2">
      <hr className="border-slate-200 mb-2" />
      <div className="flex flex-row-reverse items-center justify-between">
        <div className="flex items-center justify-end gap-3">
          <div className="border border-slate-200 p-2.5 flex items-center justify-center w-[89px] h-[89px] rounded-lg hover:scale-105 transition-all cursor-pointer">
            <Image src={"/enamad.png"} width={80} height={80} alt="enamad" />
          </div>

          <div className="border border-slate-200 p-2.5 flex items-center justify-center w-[89px] h-[89px] rounded-lg hover:scale-105 transition-all cursor-pointer">
            <Image src={"/saman.webp"} width={80} height={80} alt="saman" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            style={{ fontSize: ".9rem" }}
            className="text-slate-600"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
          >
            <g fill="none">
              <path
                d="M7.9987 14.6668C4.3187 14.6668 1.33203 11.6802 1.33203 8.00016C1.33203 4.32016 4.3187 1.3335 7.9987 1.3335C11.6787 1.3335 14.6654 4.32016 14.6654 8.00016C14.6654 11.6802 11.6787 14.6668 7.9987 14.6668Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M9.91886 10.0002C9.44553 10.4135 8.83219 10.6668 8.15885 10.6668C6.68552 10.6668 5.49219 9.4735 5.49219 8.00016C5.49219 6.52683 6.68552 5.3335 8.15885 5.3335C8.83219 5.3335 9.44553 5.58683 9.91886 6.00016"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
          <p className="text-[13px] text-gray-600">
            کلیه حقوق مادی و معنوی سایت برای آرشاپ محفوظ است. {year}
          </p>
        </div>
      </div>
    </div>
  );
}
