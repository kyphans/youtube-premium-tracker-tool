import React from 'react';
import Image from 'next/image';
import { SignOutButton } from '@clerk/nextjs';
import UserProfile from './UserProfile';

const Header: React.FC = () => (
  <div className='mb-6'>
    <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0'>
      <div className="w-full md:w-auto">
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4'>
          <Image
            src='/youtube_premium.png'
            alt='YouTube Premium Logo'
            width={110}
            height={23}
            className="sm:w-[150px] sm:h-[31px] w-[110px] h-[23px]"
          />
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 flex items-center'>
            Tracking Dashboard
          </h1>
        </div>
        <p className='text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base'>
          Manage user subscriptions and track service periods
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full md:w-auto mt-4 md:mt-0">
        <UserProfile />
        <SignOutButton>
          <button className="ml-0 sm:ml-2 w-full sm:w-auto mt-2 sm:mt-0 border px-4 py-2 rounded">Sign Out</button>
        </SignOutButton>
      </div>
    </div>
  </div>
);

export default Header; 