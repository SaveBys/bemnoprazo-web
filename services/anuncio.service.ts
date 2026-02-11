import { Pageable, ProdutoResumo } from "@/components/layout/card-products";
import { api } from "@/lib/utils/axios";



export async function listarAnuncio(): Promise<Pageable<ProdutoResumo>> {
  const { data } = await api.get("/announcements");
  return data;
}