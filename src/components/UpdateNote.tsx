"use client";
import { useState } from "react";
import { UpdateNoteType } from "@/types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNoteAPI } from "@/services/action";
import { CHARACTER_LIMIT } from "@/constants/NoteConstant";

export default function UpdateNote({ setModify, id, text }: UpdateNoteType) {
  const [modifyText, setModifyText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (CHARACTER_LIMIT - value.length >= 0) {
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
        placeholder="변경할 내용..."
        defaultValue={text}
        onChange={onChange}
      ></textarea>
      <div className="noteFooter">
        <small>남은 글자 수 : {CHARACTER_LIMIT - modifyText.length}</small>
        <button className="save" onClick={() => onSave(id)}>
          저장
        </button>
      </div>
    </div>
  );
}
