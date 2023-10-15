import { NoteType } from "@/types/type";
import { MdDeleteForever } from "react-icons/md";

export default function Note({ id, text, date }: NoteType) {
  return (
    <div className="note">
      <span>{text}</span>
      <div className="noteFooter">
        <small>{date}</small>
        <MdDeleteForever className="deleteIcon" size="1.3em" />
      </div>
    </div>
  );
}
