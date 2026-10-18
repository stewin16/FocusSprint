import { PeerRoom, PeerStudent } from "@/types";

export interface PeerLeaderboardProps {
  rooms: PeerRoom[];
  students: PeerStudent[];
  activeRoomId: string;
  onSelectRoom: (roomId: string) => void;
  onHighFive: (studentId: string) => void;
}

export interface PeerCardProps {
  student: PeerStudent;
  onHighFive: (studentId: string) => void;
}
