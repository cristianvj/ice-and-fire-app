type swornMembers = {
  id: number;
  name: string;
  died: string;
}

export interface House {
  id: number;
  name: string;
  swornMembers: swornMembers[];
}