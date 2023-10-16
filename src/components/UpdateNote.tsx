"use client";
import { useState } from "react";
import { characterLimit } from "@/constants/constant";
import { updateNoteAPI } from "@/services/service";
import { UpdateNoteType } from "@/types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UpdateNote({ setModify, id, text }: UpdateNoteType) {
  const [modifyText, setModifyText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (characterLimit - value.length >= 0) {
      setModifyText(value);
    }
  };

  const queryClient = useQueryClient();

  const updateNoteMutation = useMutation(updateNoteAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(["noteList"]);
    },
    onError: (error) => {
      alert("오류 발생 : " + error);
    },
  });

  const onSave = async (id: number) => {
    if (modifyText.trim().length > 0) {
      updateNoteMutation.mutate({ id, modifyText });
      setModify(false);
    }
  };

  return (
    <div className="note new">
      <textarea
        rows={8}
        cols={10}
        placeholder="내용 적기"
        defaultValue={text}
        onChange={onChange}
      ></textarea>
      <div className="noteFooter">
        <small>남은 글자 수 : {characterLimit - modifyText.length}</small>
        <button className="save" onClick={() => onSave(id)}>
          저장
        </button>
      </div>
    </div>
  );
}
