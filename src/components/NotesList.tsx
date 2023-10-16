"use client";
import Note from "./Note";
import AddNote from "./AddNote";
import { useQuery } from "@tanstack/react-query";
import { NoteType } from "@/types/type";
import { getNoteList } from "@/services/service";

export default function NotesList() {
  const { data, isLoading, isError } = useQuery(["noteList"], getNoteList);

  return (
    <div className="notesList">
      {data &&
        data.map((item: NoteType, key: number) => (
          <Note key={key} id={item.id} text={item.text} date={item.date} />
        ))}
      <AddNote />
    </div>
  );
}
