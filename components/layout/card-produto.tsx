import Image from "next/image"
import { EyeIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "../ui/button"

export interface Pageable<T>{
  content: T[]
  page: unknown
}

export interface ProdutoResumo {
  name: string
  ean: string
  basePrice: number
  price: number
  expirationDate: string
}

interface CardProdutosProps {
  data?: ProdutoResumo
}

export function CardProdutos(props: CardProdutosProps) {
  return (
    <div className="w-[300px] h-[548px] flex flex-col shadow-sm rounded-md gap-6 p-5">
      <div className="flex flex-col items-center">
        <Image className='' src="/img/Produtos.png" alt="produtos" width={252} height={220} />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex flex-col">
          <h2 className="text-subtitle text-base-2">{props.data?.name}</h2>
          <p className="text-legend text-base-2">{props.data?.ean}</p>
        </div>
        <del className="text-subtitle text-base-2 py-2">R${props.data?.basePrice}</del>
        <h1 className="text-title text-primary-2 pb-2">R${props.data?.price}</h1>
        <h2 className="text-subtitle text-base-2">Valido até:<span className="text-content text-base-3">{props.data?.expirationDate}</span></h2>
      </div>
      <div className="flex flex-col items-center">
        <Button><EyeIcon size={32} color="#fcfcfc" />Ver detalhes</Button>
      </div>
    </div>
  )
}
