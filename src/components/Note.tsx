import { MdDeleteForever } from "react-icons/md";

export default function Note() {
  return (
    <div className="note">
      <span>내용</span>
      <div className="noteFooter">
        <small>날짜</small>
        <MdDeleteForever className="deleteIcon" size="1.3em" />
      </div>
    </div>
  );
}
