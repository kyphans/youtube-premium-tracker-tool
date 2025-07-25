export interface User {
  id: string;
  description: string;
  duration: number;
  available: number;
  startDate: string;
  endDate: string;
  status: 'DONE' | 'NONE' | 'PENDING';
  feeConstant: number;
  userEmail?: string;
  ownerFamilyEmail?: string;
  paymentNotes?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
}
