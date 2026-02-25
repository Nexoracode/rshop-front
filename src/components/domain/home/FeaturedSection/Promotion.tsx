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
    <div className="flex  md:flex-col justify-between h-full items-center">
      <div className="flex md:flex-col-reverse items-center flex-1 justify-evenly  w-full">
        <Image
          src={"/Amazing.svg"}
          width={90}
          height={200}
          alt=""
          className="w-8 h-8 md:w-20 md:h-20 object-cover md:object-fill"
        />

        <Image
          className="block md:hidden"
          src={"/Amazing-M.svg"}
          width={90}
          height={200}
          alt=""
        />

        <CountdownTimer
          showIcon={false}
          color="white"
          targetDate={new Date(Date.now() + 3600000)}
        />
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
          endIcon={<ChevronLeft className="size-5" />}
          variant={"text-nohover"}
          size={"sm"}
          className="text-white"
          href={view_all_link}
        >
          <span className="hidden md:inline-block ml-0.5">مشاهده</span> همه
        </Button>
      )}
    </div>
  );
}
