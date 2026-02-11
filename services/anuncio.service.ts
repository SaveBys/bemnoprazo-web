
import { api } from "@/lib/utils/axios";
import { Pageable } from "@/types/pageable";
import { ProdutoResumo } from "@/types/products-resume";

export async function listarAnuncio(): Promise<Pageable<ProdutoResumo>> {
  const { data } = await api.get("/announcements");
  return data;
}