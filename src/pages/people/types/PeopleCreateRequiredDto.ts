export interface PeopleCreateRequiredDto {
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  birthdate: Date;
  documentNumber: string;
  sexTypeId: number;
  typeDocumentId: number;
  phone: string;
}
