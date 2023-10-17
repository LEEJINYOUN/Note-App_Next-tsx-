import { Dispatch, SetStateAction } from "react";

export interface AddNoteMutationType {
  text: string;
  date: string;
  bookmark: number;
}

export interface NoteType extends AddNoteMutationType {
  id: number;
}

export interface UpdateNoteMutationType {
  id: number;
  modifyText: string;
}

export interface UpdateNoteType {
  setModify: Dispatch<SetStateAction<boolean>>;
  id: number;
  text: string;
}
