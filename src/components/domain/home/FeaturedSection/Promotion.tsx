import Image from "@/components/common/Image";
import CountdownTimer from "@/components/domain/Product/CountdownTimer";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function Promotion({
  view_all_link,
  show_view_all_button,
}: {
  view_all_link: string;
  show_view_all_button: boolean;
}) {
  return (
    <div className="flex md:flex-col justify-between h-full items-center mb-2.5">
      <div className="flex md:flex-col-reverse items-center flex-1 justify-between pr-4 md:px-0 md:justify-evenly w-full">
        <Image
          src={"/Amazing.svg"}
          width={90}
          height={200}
          alt=""
          className="w-8 h-8 md:w-20 md:h-20 object-cover md:object-fill hidden md:flex"
        />

        <Image
          className="block md:hidden"
          src={"/Amazing-M.svg"}
          width={90}
          height={200}
          alt=""
        />

        <div className="md:mt-2.5">
          <CountdownTimer
            showIcon={false}
            color="white"
            targetDate={new Date(Date.now() + 3600000)}
          />
        </div>

        <Image
          src={"/Amazings.svg"}
          className="hidden md:block"
          width={90}
          height={200}
          alt=""
        />
      </div>

      {show_view_all_button && (
        <Button
          endIcon={<ChevronLeft className="size-4" />}
          variant={"text-nohover"}
          size={"sm"}
          className="text-white"
          href={view_all_link}
        >
          <span className="hidden text-[13px] md:inline-block">مشاهده</span> همه
        </Button>
      )}
    </div>
  );
}
