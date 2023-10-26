"use client";
import Note from "@/components/Note";
import { fetchBookmarkNoteList } from "@/services/fetchData";
import { NoteType } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function BookmarkPage() {
  const { data } = useQuery(["noteList"], fetchBookmarkNoteList);

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
    </div>
  );
}
