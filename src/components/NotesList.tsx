"use client";
import Note from "./Note";
import AddNote from "./AddNote";
import { useQuery } from "@tanstack/react-query";
import { NoteType } from "@/types/type";

export default function NotesList() {
  const { data, isLoading, isError } = useQuery(["noteList"], async () => {
    const getData = await fetch(process.env.NEXT_PUBLIC_POST_URL + "list", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    return getData;
  });

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
