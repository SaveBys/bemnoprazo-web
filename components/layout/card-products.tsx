import Image from "next/image";
import { EyeIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import { AnnouncementResumeResponse } from "@/types/response/announcement-resume.response";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { expirationDateRangeEnumValue } from "@/types/enums/expiration-date-range.enum";
import { formatCurrency, formatDate } from "@/lib/utils";

interface CardProductsProps {
  data?: AnnouncementResumeResponse;
}

export function CardProducts(props: CardProductsProps) {
  const router = useRouter();

  const navigateToDatails = (pid: string) => {
    router.push(`/products/details/${pid}`);
  };

  const hasLabel = () => {
    return (
      props.data?.expirationDateRange &&
      expirationDateRangeEnumValue(props.data?.expirationDateRange).label
    );
  };

  return (
    <div className="custom-shadow-sm flex h-129 w-75 flex-col justify-between gap-6 rounded-md p-6">
      {hasLabel() && (
        <Badge variant="secondary" className="absolute">
          {expirationDateRangeEnumValue(props.data!.expirationDateRange).label}
        </Badge>
      )}
      <figure className="flex h-55 w-63 flex-col items-center overflow-hidden">
        <Image
          className="h-full w-full"
          src="/img/Produtos.png"
          alt="produtos"
          width={252}
          height={220}
        />
      </figure>

      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col">
          <h2 className="text-subtitle text-base-2 truncate overflow-hidden whitespace-nowrap capitalize">
            {props.data?.name}
          </h2>
          {props.data?.ean && (
            <p className="text-legend text-base-2">Código EAN: {props.data?.ean}</p>
          )}
        </div>

        <del className="text-subtitle text-base-2 py-2">
          {formatCurrency(props.data?.basePrice)}
        </del>

        <h1 className="text-title text-primary-2 pb-2">{formatCurrency(props.data?.price)}</h1>

        <h2 className="text-subtitle text-base-2 flex items-end gap-1">
          <span>Valido até:</span>
          <span className="text-content text-base-3">{formatDate(props.data?.expirationDate)}</span>
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <Button onClick={() => navigateToDatails(props.data!.id)}>
          <EyeIcon size={32} color="#fcfcfc" />
          Ver detalhes
        </Button>
      </div>
    </div>
  );
}
