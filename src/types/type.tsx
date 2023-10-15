export interface AddNoteMutationType {
  text: string;
  date: string;
}

export interface NoteType extends AddNoteMutationType {
  id: number;
}
