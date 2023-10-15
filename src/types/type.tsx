import { Dispatch, SetStateAction } from "react";
export interface SearchType {
  setSearchText: Dispatch<SetStateAction<string>>;
}
