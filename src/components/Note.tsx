import { NoteType } from "@/types/type";
import { MdDeleteForever } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/api/api";

export default function Note({ id, text, date }: NoteType) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation(
    (id: number) => {
      return makeRequest.post("deleteNote", {
        id,
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

  const deleteNote = async (id: number) => {
    deleteNoteMutation.mutate(id);
  };
  return (
    <div className="note">
      <span>{text}</span>
      <div className="noteFooter">
        <small>{date}</small>
        <div>
          <MdDeleteForever
            id={id}
            className="deleteIcon"
            size="1.3em"
            onClick={() => deleteNote(id)}
          />
        </div>
      </div>
    </div>
  );
}
