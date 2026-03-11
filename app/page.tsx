import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Separator = () => (
  <svg
    viewBox="0 4 24 12"
    className="text-secondary-2 h-16"
    fill="none"
    stroke="currentColor"
    strokeWidth={0.5}
  >
    <path d="M12 4v12" />
    <path d="M10 14l2 2 2-2" />
  </svg>
);

type TimelineProps = {
  separator?: boolean;
  outlined?: boolean;
  label: string;
};

const Timeline = ({ separator, outlined, label }: TimelineProps) => (
  <div className="flex w-125 flex-col items-center">
    <div
      className={`flex h-28 w-full items-center justify-center rounded-lg p-8 ${outlined ? "border-secondary-2 border-3" : "bg-secondary-2"} `}
    >
      <span
        className={`text-base-5 text-center ${outlined ? "text-secondary-2 text-subtitle" : "text-title"}`}
      >
        {label}
      </span>
    </div>

    {separator && <Separator />}
  </div>
);

export default function Home() {
  return (
    <>
      <main className="flex w-full flex-col items-center">
        <section className="width-barrier flex w-full flex-col items-center gap-16 py-8">
          <figure className="items center flex w-full justify-center">
            <nav>
              <Link href="/" className="m-auto w-fit">
                <Image
                  src="/img/LogoBemnoprazo.png"
                  width={400}
                  height={180}
                  alt="Logo da marca SaveBys"
                  className="h-auto"
                />
              </Link>
            </nav>
          </figure>

          <h1 className="text-secondary-2 py-8 text-center text-5xl font-bold">
            Transformando prazos em saúde para todos.
          </h1>

          <div className="flex gap-16">
            <Button href="/user/register" isLink={true}>
              Cadastre-se
            </Button>
            <Button href="/user/login" variant="secondary" isLink={true}>
              Já possui login?
            </Button>
          </div>
        </section>

        <section className="w-full">
          <div className="bg-secondary-2 flex w-full flex-col-reverse sm:flex-row">
            <figure className="h-auto w-95 sm:w-148.75">
              <Image
                src="/img/banner.png"
                width={380}
                height={200}
                alt="Logo da marca SaveBys"
                className="relative w-95 sm:w-148.75"
              />
            </figure>
            <div className="flex flex-1 items-center px-4 sm:px-0">
              <p className="text-base-5 w-147.75 text-center text-3xl font-medium">
                Conectamos indústrias, distribuidoras e farmácias a empresas — hospitais e clínicas
                ou entre instituições de saúde, oferecendo produtos próximos ao vencimento, com
                preços reduzidos de até 70% desconto com garantia de qualidade e segurança.
              </p>
            </div>
          </div>
        </section>

        <section className="width-barrier flex w-full flex-col items-center justify-center gap-16 py-8">
          <h2 className="text-secondary-2 text-title">Como funciona</h2>
          <div className="flex w-full justify-center gap-16">
            <div className="flex flex-col items-center">
              <Timeline separator={true} outlined={false} label="Vendedor" />
              <Timeline separator={true} outlined={true} label="Entre na plataforma" />
              <Timeline
                separator={true}
                outlined={true}
                label="Cadastre os produtos, com pouco tempo de validade, que deseja ofertar em nossa plataforma"
              />
              <Timeline
                separator={true}
                outlined={true}
                label="Aguarde nosso contato com o pedido de compra"
              />
              <Timeline
                separator={true}
                outlined={true}
                label="Recolhemos seu(s) produto(s) vendido para fazer a validação e logística de entrega"
              />
              <Timeline
                separator={false}
                outlined={true}
                label="Repassamos os valores mediante pagamentos do comprador"
              />
            </div>

            <div className="flex flex-col items-center">
              <Timeline separator={true} outlined={false} label="Vendedor" />
              <Timeline separator={true} outlined={true} label="Entre na plataforma" />
              <Timeline
                separator={true}
                outlined={true}
                label="Reserve os produtos de seu interesse"
              />
              <Timeline
                separator={true}
                outlined={true}
                label="Aguarde nossa confirmação que os produtos estão disponíveis e em boas condições"
              />
              <Timeline
                separator={false}
                outlined={true}
                label="Com o aceite do pedido, entregamos os produtos em seu estabelecimento"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
