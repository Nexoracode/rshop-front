import { UserAddress } from "@/types/user";
import React from "react";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  address: UserAddress;
};

export default function AddressSection({ address }: Props) {
  const {
    is_self,
    recipient_name,
    recipient_phone,
    plaque,
    postal_code,
    province,
    city,
    unit,
    address_line,
  } = address;
  return (
    <Card>
      <div className="flex">
        <MapPin className="text-primary" />
        <h3 className="font-semibold ps-2 text-gray-800 b-2">آدرس ارسال</h3>
      </div>

      <div className="space-y-3 text-sm">
        <div className="space-x-2">
          <span className="text-muted-light">گیرنده:</span>
          {is_self ? (
            <Badge variant={"primary"}>خودم</Badge>
          ) : (
            <p>
              {recipient_name} - {recipient_phone}
            </p>
          )}
        </div>

        <div className="space-x-2">
          <span className="text-muted-light inline-block">
            استان: <span className="text-black">{province}</span>
          </span>
          <span>-</span>
          <span className="text-muted-light inline-block">
            شهر: <span className="text-black">{city}</span>
          </span>
        </div>

        <div className="space-x-2">
          <span className="text-muted-light inline-block">آدرس کامل:</span>
          <span className="space-x-2">
            {address_line} - {`پلاک ${plaque}`} {unit ? `واحد ${unit}` : ""}
          </span>
        </div>

        <div className="space-x-2">
          <span className="text-muted-light inline-block">کد پستی:</span>
          <span className="inline-block">{postal_code}</span>
        </div>
      </div>
    </Card>
  );
}
