import { User, ActivityLog } from '../types';

export const sampleUsers: User[] = [
  {
    id: '1',
    description: 'Phát',
    duration: 810,
    available: -10,
    fees: 13,
    startDate: '01/03/2023',
    endDate: '19/05/2025',
    status: 'NONE',
    userEmail: 'phat@gmail.com',
    ownerFamilyEmail: 'owner1@gmail.com'
  },
  {
    id: '2',
    description: 'Anh Đầu',
    duration: 840,
    available: -8,
    fees: 11,
    startDate: '01/02/2023',
    endDate: '21/05/2025',
    status: 'DONE',
    userEmail: 'anhdau@gmail.com',
    ownerFamilyEmail: 'owner2@gmail.com'
  },
  {
    id: '3',
    description: 'Kiệt',
    duration: 780,
    available: -105,
    fees: 140,
    startDate: '26/12/2022',
    endDate: '13/02/2025',
    status: 'NONE',
    userEmail: 'kiet@gmail.com',
    ownerFamilyEmail: 'owner3@gmail.com'
  },
  {
    id: '4',
    description: 'Minh Béu',
    duration: 915,
    available: 17,
    fees: 0,
    startDate: '13/12/2022',
    endDate: '15/06/2025',
    status: 'DONE',
    userEmail: 'minhbeu@gmail.com',
    ownerFamilyEmail: 'owner4@gmail.com'
  },
  {
    id: '5',
    description: 'Triệu Cẩm Tung',
    duration: 900,
    available: -35,
    fees: 47,
    startDate: '06/11/2022',
    endDate: '24/04/2025',
    status: 'NONE',
    userEmail: 'tung@gmail.com',
    ownerFamilyEmail: 'owner5@gmail.com'
  },
  {
    id: '6',
    description: 'Hải Nam',
    duration: 735,
    available: 21,
    fees: 0,
    startDate: '15/06/2023',
    endDate: '19/06/2025',
    status: 'DONE',
    userEmail: 'hainam@gmail.com',
    ownerFamilyEmail: 'owner6@gmail.com'
  },
  {
    id: '7',
    description: 'Bố anh Đầu',
    duration: 870,
    available: 0,
    fees: 0,
    startDate: '10/01/2023',
    endDate: '29/05/2025',
    status: 'DONE',
    userEmail: 'boanhdau@gmail.com',
    ownerFamilyEmail: 'owner7@gmail.com'
  },
  {
    id: '8',
    description: 'Huy Bùi',
    duration: 720,
    available: 92,
    fees: 0,
    startDate: '09/09/2023',
    endDate: '29/08/2025',
    status: 'DONE',
    userEmail: 'huybui@gmail.com',
    ownerFamilyEmail: 'owner8@gmail.com'
  }
];

export const sampleActivityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    action: 'Status Updated',
    timestamp: '2025-05-29 10:30:00',
    details: 'Status changed from PENDING to NONE'
  },
  {
    id: '2',
    userId: '1',
    action: 'Fees Updated',
    timestamp: '2025-05-28 14:15:00',
    details: 'Fees updated from 10 to 13'
  },
  {
    id: '3',
    userId: '2',
    action: 'User Created',
    timestamp: '2023-02-01 09:00:00',
    details: 'New user account created'
  },
  {
    id: '4',
    userId: '2',
    action: 'Status Updated',
    timestamp: '2025-05-20 16:45:00',
    details: 'Status changed from NONE to DONE'
  }
];
