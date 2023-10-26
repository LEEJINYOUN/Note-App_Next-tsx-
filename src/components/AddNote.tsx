"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { characterLimit, getFormatDate } from "@/constants/constant";
import { addNoteAPI } from "@/services/action";

export default function AddNote() {
  const [noteText, setNoteText] = useState("");

  let today = getFormatDate(new Date());

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (characterLimit - value.length >= 0) {
      setNoteText(value);
    }
  };

  const queryClient = useQueryClient();

  const addNoteMutation = useMutation(addNoteAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(["noteList"]);
    },
    onError: (error) => {
      alert("오류 발생 : " + error);
    },
  });

  const onSave = async () => {
    if (noteText.trim().length > 0) {
      addNoteMutation.mutate({
        text: noteText,
        date: today,
        bookmark: 0,
      });
      setNoteText("");
    }
  };

  return (
    <div className="note new">
      <textarea
        rows={8}
        cols={10}
        placeholder="메모할 내용..."
        value={noteText}
        onChange={onChange}
      ></textarea>
      <div className="noteFooter">
        <small>남은 글자 수 : {characterLimit - noteText.length}</small>
        <button className="save" onClick={onSave}>
          저장
        </button>
      </div>
    </div>
  );
}
