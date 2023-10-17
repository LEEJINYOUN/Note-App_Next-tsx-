import axios from "axios";
import { AddNoteMutationType, UpdateNoteMutationType } from "@/types/type";

export const makeRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POST_URL,
  withCredentials: true,
});

export const getNoteList = async () => {
  const getData = await fetch(process.env.NEXT_PUBLIC_POST_URL + "list", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  return getData;
};

export const getBookmarkNoteList = async () => {
  const getData = await fetch(process.env.NEXT_PUBLIC_POST_URL + "bookmark", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  return getData;
};

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
