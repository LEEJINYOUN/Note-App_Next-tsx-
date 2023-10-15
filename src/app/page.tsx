import NotesList from "@/components/NotesList";

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1>노트 앱</h1>
      </div>
      <NotesList />
    </div>
  );
}
