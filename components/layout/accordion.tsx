import { AccordionBase, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

interface AccordionProps {
  title: string;
  id: string;
  data: { key: string, value?: string }[]
}

export default function Accordion({ ...props }: AccordionProps) {
  return (
    <div className="w-full h-fit flex flex-col border-1 border-base-3 rounded-md px-4">
      <AccordionBase
        type="single"
        collapsible
        defaultValue="item-1"
        className="max-w-lg"
      >
        <AccordionItem key={props.id} value={props.title}>
          <AccordionTrigger>
            <h2 className="text-subtitle text-base-2 mx-4">
              {props.title}
            </h2>
          </AccordionTrigger>
          {props.data.map((item) => {
            return (
              <AccordionContent key={item.key}>
                <div className="w-full flex justify-between">
                  <p className="w-full text-legend text-base-2">{item.key}</p>
                  {
                    item.value
                    && <p className="w-full text-legend text-base-2">{item.value}</p>
                  }
                </div>
              </AccordionContent>
            )
          })}
        </AccordionItem>
      </AccordionBase>
    </div>
  )
}