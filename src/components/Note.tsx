"use client";
import { useState } from "react";
import { NoteType } from "@/types/type";
import { MdDeleteForever } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarkNoteAPI, deleteNoteAPI } from "@/services/service";
import UpdateNote from "./UpdateNote";

export default function Note({ id, text, date, bookmark }: NoteType) {
  const [modify, setModify] = useState(false);

  const queryClient = useQueryClient();

  const bookmarkNoteMutation = useMutation(bookmarkNoteAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(["noteList"]);
    },
    onError: (error) => {
      alert("오류 발생 : " + error);
    },
  });

  const deleteNoteMutation = useMutation(deleteNoteAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(["noteList"]);
    },
    onError: (error) => {
      alert("오류 발생 : " + error);
    },
  });

  const bookmarkNote = async (id: number) => {
    bookmarkNoteMutation.mutate(id);
  };

  const modifyNote = () => {
    setModify(true);
  };

  const deleteNote = async (id: number) => {
    deleteNoteMutation.mutate(id);
  };

  return (
    <>
      {modify === false ? (
        <div className="note">
          <div className="noteHeader">
            <div>
              <AiFillHeart
                id={id}
                className={
                  bookmark === 0
                    ? "bookmarkIcon"
                    : "bookmarkIcon bookmarkedIcon"
                }
                size="1.3em"
                onClick={() => bookmarkNote(id)}
              />
            </div>
            <div>
              <MdDeleteForever
                id={id}
                className="deleteIcon"
                size="1.3em"
                onClick={() => deleteNote(id)}
              />
            </div>
          </div>
          <span>{text}</span>
          <div className="noteFooter">
            <small>{date}</small>
            <div>
              <BsFillPencilFill
                id={id}
                className="modifyIcon"
                size="1.3em"
                onClick={modifyNote}
              />
            </div>
          </div>
        </div>
      ) : (
        <UpdateNote setModify={setModify} id={id} text={text} />
      )}
    </>
  );
}
