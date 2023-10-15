"use client";
import { NoteType, UpdateNoteMutationType } from "@/types/type";
import { MdDeleteForever } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/api/api";
import { useState } from "react";

export default function Note({ id, text, date }: NoteType) {
  const [modify, setModify] = useState(false);
  const [modifyText, setModifyText] = useState("");
  const characterLimit = 200;

  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation(
    (id: number) => {
      return makeRequest.post("deleteNote", {
        id,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["noteList"]);
      },
      onError: (error) => {
        alert("오류 발생 : " + error);
      },
    }
  );

  const deleteNote = async (id: number) => {
    deleteNoteMutation.mutate(id);
  };

  const modifyNote = async () => {
    setModify(true);
    setModifyText(text);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (characterLimit - value.length >= 0) {
      setModifyText(value);
    }
  };

  const updateNoteMutation = useMutation(
    ({ id, modifyText }: UpdateNoteMutationType) => {
      return makeRequest.post("updateNote", {
        id,
        text: modifyText,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["noteList"]);
      },
      onError: (error) => {
        alert("오류 발생 : " + error);
      },
    }
  );

  const onSave = async (id: number) => {
    if (modifyText.trim().length > 0) {
      updateNoteMutation.mutate({ id, modifyText });
      setModify(false);
    }
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
        <div className="note new">
          <textarea
            rows={8}
            cols={10}
            placeholder="내용 적기"
            defaultValue={modifyText}
            onChange={onChange}
          ></textarea>
          <div className="noteFooter">
            <small>남은 글자 수 : {characterLimit - modifyText.length}</small>
            <button className="save" onClick={() => onSave(id)}>
              저장
            </button>
          </div>
        </div>
      )}
    </>
  );
}
