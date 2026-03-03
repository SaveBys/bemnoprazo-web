import { AccordionBase, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface AccordionProps {
  title: string;
  id: string;
  data: { key: string; value?: string }[];
}

export default function Accordion({ ...props }: AccordionProps) {
  return (
    <div className="border-base-3 flex h-fit w-full flex-col rounded-md border px-4">
      <AccordionBase type="single" collapsible defaultValue="item-1" className="max-w-lg">
        <AccordionItem key={props.id} value={props.title}>
          <AccordionTrigger>
            <h2 className="text-subtitle text-base-2 mx-4">{props.title}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {props.data.map((item) => (
                <div className="flex w-full justify-between" key={item.key}>
                  <p className="text-legend text-base-2 w-full truncate">{item.key}</p>
                  {item.value && (
                    <p className="text-legend text-base-2 w-full truncate">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </AccordionBase>
    </div>
  );
}
