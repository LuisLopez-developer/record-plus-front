import { HospitalListDTO } from "@/types/DTO/HospitalListDTO";
import { api } from "./api";
import { PageResponse } from "@/types/Pagination";
import { SearchParams } from "@/types/hospital";

export const getHospitals = async (
  params: SearchParams
): Promise<PageResponse<HospitalListDTO>> => {
  const { pageNumber, pageSize, sort, name, ruc, id } = params;
  const response = await api.get<PageResponse<HospitalListDTO>>("/hospitals", {
    params: {
      page: pageNumber,
      size: pageSize,
      ...(sort && { sort: `${sort.field},${sort.direction}` }),
      ...(name && { name }),
      ...(ruc && { ruc }),
      ...(id && { id }),
    },
  });
  return response.data;
};