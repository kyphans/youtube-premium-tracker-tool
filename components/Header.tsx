import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { SignOutButton } from '@clerk/nextjs';
import UserProfile from './UserProfile';

interface HeaderProps {
  onAddUser: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddUser }) => (
  <div className='mb-6'>
    <div className='flex items-center justify-between'>
      <div>
        <div className='flex items-center gap-4'>
          <Image
            src='/youtube_premium.png'
            alt='YouTube Premium Logo'
            width={150}
            height={31}
          />
          <h1 className='text-3xl font-bold text-gray-900 flex items-center'>
            Tracking Dashboard
          </h1>
        </div>
        <p className='text-gray-600 mt-2'>
          Manage user subscriptions and track service periods
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={onAddUser} className='bg-blue-600 hover:bg-blue-700'>
          <span className='flex items-center'>
            <svg
              className='h-4 w-4 mr-2'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4v16m8-8H4'></path>
            </svg>
            Add New User
          </span>
        </Button>
        <UserProfile />
        <SignOutButton>
          <Button variant="outline" className="ml-2">Sign Out</Button>
        </SignOutButton>
      </div>
    </div>
  </div>
);

export default Header; 