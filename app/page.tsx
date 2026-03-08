import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
      </main>
      <Footer />
    </>
  );
}
