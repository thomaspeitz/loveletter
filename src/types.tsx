import { Timestamp } from "firebase/firestore";

export type Position = {
  lat: number;
  lng: number;
};

export type Lovepoint = {
  id: string;
  position: Position;
  title: string;
  text: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
};

export type InviteToken = {
  id: string;
  multiple: boolean;
  validTill?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lovepointId: string;
};

export type Grant = {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
};
