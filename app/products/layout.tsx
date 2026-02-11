"use client"

import Image from "next/image";
import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, EyeIcon, MagnifyingGlassIcon, ShoppingCartIcon, SquaresFourIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Header from "@/components/layout/header";
import { CardProdutos } from "@/components/layout/card-produto";
import { useEffect } from "react";
import { listarAnuncio } from "@/services/anuncio.service";
import InputSearch from "@/components/ui/input/input-search";



export default function Footer() {
  useEffect(() => {
    listarAnuncio();
  }, [])
  return (
    <>
      <Header isAuthenticated={true} />
      <main className="width-barrier grid grid-cols-4 gap-8 py-16 m-auto">
        <div className="flex flex-col">
          <h1 className="text-title text-base-2 pb-14">Filtros</h1>
          <InputSearch label="Buscar" />
          <h2 className="text-subtitle text-base-2 py-6">Categoria</h2>
          <form className="flex flex-col gap-6">
            <Field className="text-legend text-base-2" orientation="horizontal">
              <Checkbox className="border-primary-3 border-2 h-5 w-5" id="terms-checkbox-basic" name="terms-checkbox-basic" /><FieldLabel htmlFor="terms-checkbox-basic">Medicamentos especiais</FieldLabel>
            </Field>
            <Field className="text-legend text-base-2" orientation="horizontal">
              <Checkbox className="border-primary-3 border-2 h-5 w-5" id="terms-checkbox-basic" name="terms-checkbox-basic" /><FieldLabel htmlFor="terms-checkbox-basic">Medicamentos</FieldLabel>
            </Field>
            <Field className="text-legend text-base-2" orientation="horizontal">
              <Checkbox className="border-primary-3 border-2 h-5 w-5" id="terms-checkbox-basic" name="terms-checkbox-basic" /><FieldLabel htmlFor="terms-checkbox-basic">Contraceptivos</FieldLabel>
            </Field>
            <Field className="text-legend text-base-2 pb-6" orientation="horizontal">
              <Checkbox className="border-primary-3 border-2 h-5 w-5" id="terms-checkbox-basic" name="terms-checkbox-basic" /><FieldLabel htmlFor="terms-checkbox-basic">Suplementos</FieldLabel>
            </Field>
          </form>
          <hr className='w-full border-base-3 border-1' />
          <h2 className="text-subtitle text-base-2 py-6">Valor</h2>
          <form className="flex flex-col gap-6">
            <Field className="text-legend text-base-2" orientation="horizontal">
              <Checkbox className="border-primary-3 border-2 h-5 w-5" id="terms-checkbox-basic" name="terms-checkbox-basic" /><FieldLabel htmlFor="terms-checkbox-basic">Até R$ 250,00</FieldLabel>
            </Field>
            <Field className="text-legend text-base-2" orientation="horizontal">
              <Checkbox className="border-primary-3 border-2 h-5 w-5" id="terms-checkbox-basic" name="terms-checkbox-basic" /><FieldLabel htmlFor="terms-checkbox-basic">De R$ 250,00 até R$ 599,00</FieldLabel>
            </Field>
            <Field className="text-legend text-base-2" orientation="horizontal">
              <Checkbox className="border-primary-3 border-2 h-5 w-5" id="terms-checkbox-basic" name="terms-checkbox-basic" /><FieldLabel htmlFor="terms-checkbox-basic">De R$ 599,00 até 999,00</FieldLabel>
            </Field>
            <Field className="text-legend text-base-2 pb-6" orientation="horizontal">
              <Checkbox className="border-primary-3 border-2 h-5 w-5" id="terms-checkbox-basic" name="terms-checkbox-basic" /><FieldLabel htmlFor="terms-checkbox-basic">A partir de R$ 1.000,00</FieldLabel>
            </Field>
          </form>
          <hr className='w-full border-base-3 border-1' />
          <h2 className="text-subtitle text-base-2 py-6">Valor</h2>
          <form className="flex flex-col gap-4">
            <Field className="text-legend text-base-2" orientation="horizontal">
              <Checkbox className="border-primary-3 border-2 h-5 w-5" id="terms-checkbox-basic" name="terms-checkbox-basic" /><FieldLabel htmlFor="terms-checkbox-basic">Vence em breve</FieldLabel>
            </Field>
          </form>
          <div className="flex flex-col pt-6 gap-2">
            <FieldLabel className="text-legend text-base-2">Validade inicial</FieldLabel>
            <Input className="border-primary-3 border-2 h-12" id="input-field-username" type="text" placeholder="" />
          </div>
          <div className="flex flex-col pt-10 gap-2">
            <FieldLabel className="text-legend text-base-2">Validade final</FieldLabel>
            <Input className="border-primary-3 border-2 h-12" id="input-field-username" type="text" placeholder="" />
          </div>
          <div className="flex flex-col gap-6 pt-16">
            <Button>Buscar</Button>
            <Button variant="secondary">Limpar Filtros</Button>
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-8">
          <div className="flex flex-row gap-8">
            <CardProdutos data={{
              name: "Anastrolibbs",
              ean: "Código EAN: 651 642",
              basePrice: 1469.00,
              price: 469.00,
              expirationDate: "12/02/2026"
            }}>
            </CardProdutos>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem >
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem >
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem >
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      <footer className="w-full px-11 py-8">
        <div className='width-barrier flex flex-col items-center gap-6 m-auto'>
          <hr className='w-full border-primary-2 border-2' />

          <div className='flex flex-col gap-16 items-center'>
            <div className='flex justify-center gap-16' >
              <Image src="/img/LogoBemnoprazo.png" alt="logo" width={200} height={90} />

              <div className='flex flex-col gap-4'>
                <h3 className='text-subtitle flex flex-col items-center text-base-2'>Redes Sociais</h3>

                <div className='flex gap-4'>
                  <a href="">
                    <FacebookLogoIcon className='bg-base-3 text-base-5 size-8 rounded-lg p-1' />
                  </a>
                  <a href="">
                    <InstagramLogoIcon className='bg-base-3 text-base-5 size-8 rounded-lg p-1' />
                  </a>
                  <a href="">
                    <LinkedinLogoIcon className='bg-base-3 text-base-5 size-8 rounded-lg p-1' />
                  </a>
                </div>
              </div>
              <div className='flex flex-col items-center gap-4'>
                <h3 className='text-subtitle text-base-2'>Suporte</h3>
                <p className='text-content text-base-2 '>suporte@bemnoprazo.com.br</p>
              </div>
            </div>

            <p className='text-content text-base-2 '>Copyright ©2026 BemNoPrazo - Medicamento sem desperdício</p>

            <div className='flex flex-col items-center'>
              <Image src="/img/LogoSavebys.png" alt="logo" width={100} height={50} />
              <p className='text-legend text-base-2'>Powered by savebys.com</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}