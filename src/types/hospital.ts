import { PageRequest } from "./Pagination";
import { State } from "./state";

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  ruc: string;
  state: State;
}

// Vista simplificada de la lista de hospitales
export type HospitalList = Pick<
  Hospital,
  "id" | "name" | "phone" | "email" | "ruc"
> & {
  nameState: string;
};

export interface SearchParams extends PageRequest {
  name?: string;
  ruc?: string;
  id?: number;
}
