export const fetchNoteList = async () => {
  const fetchData = await fetch(process.env.NEXT_PUBLIC_POST_URL + "list", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  return fetchData;
};

export const fetchBookmarkNoteList = async () => {
  const fetchData = await fetch(process.env.NEXT_PUBLIC_POST_URL + "bookmark", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  return fetchData;
};
