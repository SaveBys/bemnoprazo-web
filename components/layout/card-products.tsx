import Image from "next/image"
import { EyeIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "../ui/button"

export interface Page {
  size: number,
  number: number,
  totalElements: number,
  totalPages: number
}

export interface Pageable<T> {
  content: T[]
  page: Page
}

export interface ProdutoResumo {
  name: string
  ean: string
  basePrice: number
  price: number
  expirationDate: string
}

interface CardProductsProps {
  data?: ProdutoResumo
}

export function CardProducts(props: CardProductsProps) {
  const formatCurrency = (amount: number | undefined, locale = 'pt-BR', currency = 'BRL') => {
    if (!amount) return;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return;

    return date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")
  }

  return (
    <div className="w-[300px] h-[548px] flex flex-col custom-shadow-sm rounded-md gap-6 p-5">
      <div className="flex flex-col items-center">
        <Image
          src="/img/Produtos.png"
          alt="produtos"
          width={252}
          height={220} />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex flex-col">
          <h2 className="text-subtitle text-base-2 capitalize">
            {props.data?.name}
          </h2>
          {
            props.data?.ean
            && <p className="text-legend text-base-2">
              Código EAN: {props.data?.ean}
            </p>
          }
        </div>

        <del className="text-subtitle text-base-2 py-2">
          {formatCurrency(props.data?.basePrice)}
        </del>

        <h1 className="text-title text-primary-2 pb-2">
          {formatCurrency(props.data?.price)}
        </h1>

        <h2 className="flex items-end gap-1 text-subtitle text-base-2">
          <span>Valido até:</span>
          <span className="text-content text-base-3">
            {formatDate(props.data?.expirationDate)}
          </span>
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <Button>
          <EyeIcon size={32} color="#fcfcfc" />
          Ver detalhes
        </Button>
      </div>
    </div>
  )
}
