import React from 'react';
import { User } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Edit, Trash2, Minus, ClipboardCopy } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { useToast } from './ui/use-toast';

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  selectedUserIds: string[];
  onSelectUsers: (userIds: string[]) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEditUser,
  onDeleteUser,
  selectedUserIds,
  onSelectUsers
}) => {
  const { toast } = useToast();

  const userList = Array.isArray(users) ? users : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'bg-blue-500 text-white';
      case 'NONE':
        return 'bg-red-500 text-white';
      case 'PENDING':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectUsers(users.map(user => user.id));
    } else {
      onSelectUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      onSelectUsers([...selectedUserIds, userId]);
    } else {
      onSelectUsers(selectedUserIds.filter(id => id !== userId));
    }
  };

  const isAllSelected = userList.length > 0 && selectedUserIds.length === userList.length;
  const isIndeterminate = selectedUserIds.length > 0 && selectedUserIds.length < userList.length;

  const handleCopyMessage = (user: User) => {
    if (user.available >= 0) {
      return toast({
        title: 'Đã thanh toán',
        description: 'Không có tin nhắn nhắc nhở',
      });
    }

    const message = 
    `Ngày hết hạn gói Youtube là ${user.endDate},
    đã trễ ${Math.abs(user.available)} ngày,
    với giá 1 tháng là ${user.feeConstant}K,
    vậy số tiền cần thanh toán ít nhất là ${Math.abs((user.feeConstant || 40) / 30 * user.available)}K`;
    navigator.clipboard.writeText(message);
    toast({
      title: 'Đã copy tin nhắn nhắc nhở',
      description: message,
    });
  };

  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
      <div className='bg-gray-100 p-4'>
        <h2 className='text-lg font-semibold text-gray-800'>User Management</h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-3 text-left'>
                <div className='flex items-center justify-center'>
                  {isIndeterminate ? (
                    <div className='relative'>
                      <Checkbox
                        checked={false}
                        onCheckedChange={() => handleSelectAll(false)}
                      />
                      <Minus className='h-3 w-3 absolute top-0.5 left-0.5 text-primary' />
                    </div>
                  ) : (
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                    />
                  )}
                </div>
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                ID
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Description
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Duration
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Available
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Fees
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                End Date
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {userList.map((user, index) => (
              <tr
                key={user.id ? `user-${user.id}` : `index-${index}`}
                className={`hover:bg-gray-50 transition-colors ${
                  selectedUserIds.includes(user.id)
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : ''
                }`}>
                <td className='px-4 py-4 whitespace-nowrap'>
                  <div className='flex items-center justify-center'>
                    <Checkbox
                      checked={selectedUserIds.includes(user.id)}
                      onCheckedChange={(checked) =>
                        handleSelectUser(user.id, checked as boolean)
                      }
                    />
                  </div>
                </td>
                <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {user.id}
                </td>
                <td className='px-4 py-4 whitespace-nowrap'>
                  <div
                    className='text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditUser(user);
                    }}
                    title='Edit user'
                  >
                    {user.description}
                  </div>
                </td>
                <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {user.duration}
                </td>
                <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {user.available}
                  {user.available >= 30 &&
                    ` (${(user.available / 30).toFixed(1)} mo)`}
                </td>
                <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {user.available >= 0
                    ? 0
                    : Math.round((user.available / 30) * user.feeConstant)}
                </td>
                <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {user.endDate}
                </td>
                <td className='px-4 py-4 whitespace-nowrap'>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </td>
                <td className='px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditUser(user);
                    }}
                    className='hover:bg-blue-50'>
                    <Edit className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyMessage(user);
                    }}
                    className='hover:bg-green-50 text-green-600'
                    title='Copy reminder message'>
                    <ClipboardCopy className='h-4 w-4' />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={(e) => e.stopPropagation()}
                        className='hover:bg-red-50 text-red-600'>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete user &quot;
                          {user.description}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDeleteUser(user.id)}
                          className='bg-red-600 hover:bg-red-700'>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
