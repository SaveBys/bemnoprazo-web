import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Checkbox } from "../ui/input/checkbox";
import InputSearch from "../ui/input/input-search";
import { InputText } from "../ui/input/input-text";

export function FilterProducts() {
  return (
    <div className="w-[300px] flex flex-col">
      <h1 className="text-title text-base-2 pb-14">Filtros</h1>
      <InputSearch label="Buscar" placeholder="Digite nome ou código" />
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

      <h2 className="text-subtitle text-base-2 py-6">Validade</h2>

      <form className="flex flex-col gap-4">
        <Field className="text-legend text-base-2" orientation="horizontal">
          <Checkbox className="border-primary-3 border-2 h-5 w-5" id="terms-checkbox-basic" name="terms-checkbox-basic" />
          <FieldLabel htmlFor="terms-checkbox-basic">Vence em breve</FieldLabel>
        </Field>

        <InputText 
          label="Validade inicial" 
          placeholder="00/00/00" 
          mask="99/99/9999"
          name="min-expiration-date" />

        <InputText 
          label="Validade final" 
          placeholder="00/00/00" 
          mask="99/99/9900"
          name="max-expiration-date" />
      </form>

      <div className="flex flex-col gap-6 pt-16">
        <Button>Buscar</Button>
        <Button variant="secondary">Limpar Filtros</Button>
      </div>
    </div>
  )
}