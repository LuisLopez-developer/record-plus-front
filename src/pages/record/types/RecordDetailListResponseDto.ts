export interface RecordDetailListResponseDto {
  id: string;
  reason: string;
  visit_date: string;
  hospital_name: string;
  doctor_name: string;
  files: FileDetailDto[];
}

export interface FileDetailDto {
  name: string;
  type_name: string;
  url: string;
  mime_type: string;
  size: string;
  object_key: string;
}
