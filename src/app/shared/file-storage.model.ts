export interface IFileStorage {
  ID: string;
  name: string;
  codedName: string;
  fileName: string;
  fileNameWhtExtension: string;
  fileExtension:  string;
  fileRefInFolder: string;
  fileTypeRef: string;
  recordDate: Date;
  lastUpdate: Date;
  operationType: string;
  virtualDeleted: string;
  userRef: string;
  _key?: string;
  save(): void;
  delete(): void;
  fetch(): void;
}

export interface  IPostAnswer {
  id: string;
  filename: string;
  filenameID: string;
  fileTypeRef: string;
  found: boolean;
}
