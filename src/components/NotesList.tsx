import Note from "./Note";
import AddNote from "./AddNote";

export default function NotesList() {
  return (
    <div className="notesList">
      <Note />
      <AddNote />
    </div>
  );
}
