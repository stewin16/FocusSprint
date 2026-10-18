import { CampusNotification, SprintSession } from "@/types";

export interface SprintConsoleProps {
  session: SprintSession;
  onStart: (durationMins: number, label: string) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReset: () => void;
}

export interface NotificationVaultProps {
  notifications: CampusNotification[];
  timeRemainingSeconds: number;
  isSprintRunning: boolean;
  onReleaseEarly?: () => void;
  onClearVault?: () => void;
}

export interface SimulatorProps {
  onInjectNotification: (notif: CampusNotification) => void;
  isSprintRunning: boolean;
}

export interface FocusDigestModalProps {
  isOpen: boolean;
  session: SprintSession;
  batchedNotifications: CampusNotification[];
  onClose: () => void;
}
