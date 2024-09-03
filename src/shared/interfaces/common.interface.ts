import { Timestamp } from 'firebase/firestore';

export type ModalType = 'update' | 'save';

export type IconSize = 'large' | 'medium' | 'small';

export type PageNationFirebase = {
  action: 'NEXT' | 'PREV';
  count: number;
  firstTimestamp?: Timestamp | null;
  lastTimestamp?: Timestamp | null;
};
