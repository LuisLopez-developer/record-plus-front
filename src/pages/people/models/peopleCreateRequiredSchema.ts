import { z } from "zod";

export const peopleCreateRequiredSchema = z.object({
  name: z
    .string()
    .min(1, "Nombre es requerido")
    .min(3, "Nombre debe tener al menos 3 caracteres")
    .max(50, "Nombre debe tener máximo 50 caracteres"),
  paternalSurname: z
    .string()
    .min(1, "Apellido paterno es requerido")
    .min(3, "Apellido paterno debe tener al menos 3 caracteres"),
  maternalSurname: z
    .string()
    .min(1, "Apellido materno es requerido")
    .min(3, "Apellido materno debe tener al menos 3 caracteres"),
  birthdate: z
    .date({
      required_error: "Fecha de nacimiento es requerida",
      invalid_type_error: "Fecha de nacimiento debe ser una fecha válida",
    })
    .refine((date) => date.getTime() < new Date().getTime(), {
      message: "La fecha de nacimiento no puede ser mayor a la fecha actual",
    })
    .refine((date) => date.getTime() > new Date("1900-01-01").getTime(), {
      message: "La fecha de nacimiento no puede ser menor a 1900",
    }),
  documentNumber: z.string().min(1, "Número de documento es requerido"),
  sexTypeId: z.number().min(1, "Tipo de sexo es requerido"),
  typeDocumentId: z.number().min(1, "Tipo de documento es requerido"),
  phone: z
    .string()
    .regex(/^9/, "Teléfono debe empezar con 9")
    .regex(/^[0-9]{9}$/, "Teléfono debe tener 9 dígitos numéricos")
    .optional(),
});

export const peopleCreateFullSchema = peopleCreateRequiredSchema.extend({
  bloodType: z.string().optional(),
  address: z.string().optional(),
  nationality: z.string().optional(),
});

// Este tipo es para inferir el tipo de los valores
export type PeopleCreateRequiredValues = z.infer<typeof peopleCreateRequiredSchema>;
export type PeopleCreateFullValues = z.infer<typeof peopleCreateFullSchema>;