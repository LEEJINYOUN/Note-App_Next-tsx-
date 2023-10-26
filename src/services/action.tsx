import { makeRequest } from "./serviceInit";
import { AddNoteMutationType, UpdateNoteMutationType } from "@/types/type";

export const addNoteAPI = ({ text, date, bookmark }: AddNoteMutationType) => {
  return makeRequest.post("addNote", {
    text,
    date,
    bookmark,
  });
};

export const updateNoteAPI = ({ id, modifyText }: UpdateNoteMutationType) => {
  return makeRequest.post("updateNote", {
    id,
    text: modifyText,
  });
};

export const bookmarkNoteAPI = (id: number) => {
  return makeRequest.post("bookmarkNote", {
    id,
  });
};

export const deleteNoteAPI = (id: number) => {
  return makeRequest.post("deleteNote", {
    id,
  });
};
