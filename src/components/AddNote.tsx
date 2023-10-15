"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddNoteMutationType } from "@/types/type";
import { makeRequest } from "@/api/api";

export default function AddNote() {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;

  const getFormatDate = (date: any) => {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    let hours = date.getHours();
    hours = hours > 10 ? hours : "0" + hours;
    let minutes = date.getMinutes();
    minutes = minutes > 10 ? minutes : "0" + minutes;
    return `${year}/${month}/${day} ${hours}:${minutes} `;
  };

  let today = getFormatDate(new Date());

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (characterLimit - value.length >= 0) {
      setNoteText(value);
    }
  };

  const queryClient = useQueryClient();

  const addNoteMutation = useMutation(
    ({ text, date }: AddNoteMutationType) => {
      return makeRequest.post("addNote", {
        text,
        date,
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

  const onSave = async () => {
    if (noteText.trim().length > 0) {
      addNoteMutation.mutate({
        text: noteText,
        date: today,
      });
      setNoteText("");
    }
  };

  return (
    <div className="note new">
      <textarea
        rows={8}
        cols={10}
        placeholder="내용 적기"
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
