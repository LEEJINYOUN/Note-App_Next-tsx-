"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Search from "@/components/Search";
import NotesList from "@/components/NotesList";

export default function Home() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="container">
      <Header />
      <Search setSearchText={setSearchText} />
      <NotesList />
    </div>
  );
}
