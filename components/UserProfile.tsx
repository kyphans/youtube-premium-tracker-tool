import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

const UserProfile = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <Image
        src={user.imageUrl}
        alt={user.fullName || 'User Avatar'}
        className="w-8 h-8 rounded-full"
        width={32}
        height={32}
      />
      <div>
        <div className="font-semibold">{user.fullName}</div>
        <div className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</div>
      </div>
    </div>
  );
};

export default UserProfile; 