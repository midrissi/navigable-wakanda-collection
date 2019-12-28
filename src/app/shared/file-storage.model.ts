import { Entity } from 'wakanda-client';

export interface IFileStorage extends Entity {
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
}

export interface  IPostAnswer extends Entity {
  id: string;
  filename: string;
  filenameID: string;
  fileTypeRef: string;
  found: boolean;
}
