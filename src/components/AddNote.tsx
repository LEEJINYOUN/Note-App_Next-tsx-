"use client";
import { useState } from "react";

export default function AddNote() {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (characterLimit - value.length >= 0) {
      setNoteText(value);
    }
  };

  const onSave = () => {
    if (noteText.trim().length > 0) {
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
