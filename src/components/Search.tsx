import React from "react";
import { SearchType } from "@/types/type";
import { MdSearch } from "react-icons/md";

export default function Search({ setSearchText }: SearchType) {
  return (
    <div className="search">
      <MdSearch className="search-icons" size="1.3em" />
      <input
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="검색어.."
      />
    </div>
  );
}
