import { Dispatch, SetStateAction } from "react";
export interface SearchType {
  setSearchText: Dispatch<SetStateAction<string>>;
}

export interface AddNoteMutationType {
  text: string;
  date: string;
}

export interface NoteType extends AddNoteMutationType {
  id: number;
}
