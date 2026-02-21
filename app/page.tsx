import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { FishIcon, InstagramLogoIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="w-full flex flex-col items-center" >
        <section className="width-barrier w-full flex flex-col items-center gap-16 py-8">
          <figure className="w-full flex justify-center items center">
            <Image
              src="/img/LogoBemnoprazo.png"
              width={400}
              height={180}
              alt="Logo da marca SaveBys"
              className="h-auto"
            />
          </figure>

          <h1 className="text-secondary-2 text-5xl font-bold text-center py-8">
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
          <div className="bg-secondary-2 w-full flex flex-col-reverse sm:flex-row">
            <figure className="w-[380px] sm:w-[595px] h-auto">
              <Image
                src="/img/banner.png"
                width={380}
                height={200}
                alt="Logo da marca SaveBys"
                className="w-[380px] sm:w-[595px] relative"
              />
            </figure>
            <div className="flex-1 flex items-center px-4 sm:px-0">
              <p className="w-[591px] text-3xl font-medium text-base-5 text-center">
                Conectamos farmácias e distribuidoras a consumidores — pessoas físicas,
                hospitais e clínicas — oferecendo produtos próximos ao vencimento, com
                preços reduzidos e garantia de qualidade e segurança.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
