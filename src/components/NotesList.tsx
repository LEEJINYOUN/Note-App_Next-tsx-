"use client";
import Note from "./Note";
import AddNote from "./AddNote";
import { useQuery } from "@tanstack/react-query";
import { NoteType } from "@/types/type";
import { fetchNoteList } from "@/services/fetchData";

export default function NotesList() {
  const { data } = useQuery(["noteList"], fetchNoteList);

  return (
    <div className="notesList">
      {data &&
        data.map((item: NoteType, key: number) => (
          <Note
            key={key}
            id={item.id}
            text={item.text}
            date={item.date}
            bookmark={item.bookmark}
          />
        ))}
      <AddNote />
    </div>
  );
}
