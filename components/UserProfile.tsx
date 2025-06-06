import { useUser } from '@clerk/nextjs';

const UserProfile = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.imageUrl}
        alt={user.fullName || 'User Avatar'}
        className="w-8 h-8 rounded-full"
      />
      <div>
        <div className="font-semibold">{user.fullName}</div>
        <div className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</div>
      </div>
    </div>
  );
};

export default UserProfile; 