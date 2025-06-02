import React from 'react';
import { Users } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onAddUser: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddUser }) => (
  <div className='mb-6'>
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
          <Users className='h-8 w-8 text-red-600' />
          Youtube Tracking Dashboard
        </h1>
        <p className='text-gray-600 mt-2'>
          Manage user subscriptions and track service periods
        </p>
      </div>
      <Button
        onClick={onAddUser}
        className='bg-blue-600 hover:bg-blue-700'>
        <span className='flex items-center'>
          <svg className='h-4 w-4 mr-2' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4'></path></svg>
          Add New User
        </span>
      </Button>
    </div>
  </div>
);

export default Header; 