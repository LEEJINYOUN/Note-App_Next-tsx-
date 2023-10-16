"use client";
import { useState } from "react";
import { NoteType } from "@/types/type";
import { MdDeleteForever } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNoteAPI } from "@/services/service";
import UpdateNote from "./UpdateNote";

export default function Note({ id, text, date }: NoteType) {
  const [modify, setModify] = useState(false);
  const [modifyText, setModifyText] = useState("");

  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation(deleteNoteAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(["noteList"]);
    },
    onError: (error) => {
      alert("오류 발생 : " + error);
    },
  });

  const deleteNote = async (id: number) => {
    deleteNoteMutation.mutate(id);
  };

  const modifyNote = async () => {
    setModify(true);
    setModifyText(text);
  };

  return (
    <>
      {modify === false ? (
        <div className="note">
          <span>{text}</span>
          <div className="noteFooter">
            <small>{date}</small>
            <div className="noteIcons">
              <div>
                <BsFillPencilFill
                  id={id}
                  className="modifyIcon"
                  size="1.3em"
                  onClick={() => modifyNote()}
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
          </div>
        </div>
      ) : (
        <UpdateNote setModify={setModify} id={id} text={text} />
      )}
    </>
  );
}
