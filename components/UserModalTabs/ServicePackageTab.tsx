import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { ExternalLink } from 'lucide-react';

interface ServicePackageTabProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleGoogleFamilyClick: () => void;
}

const ServicePackageTab: React.FC<ServicePackageTabProps> = ({ formData, setFormData, handleGoogleFamilyClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="userEmail">User Email</Label>
        <Input
          id="userEmail"
          type="email"
          value={formData.userEmail || ''}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, userEmail: e.target.value }))}
          placeholder="Enter user email"
        />
      </div>
      <div>
        <Label htmlFor="ownerFamilyEmail">Owner Family Email</Label>
        <Input
          id="ownerFamilyEmail"
          type="email"
          value={formData.ownerFamilyEmail || ''}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, ownerFamilyEmail: e.target.value }))}
          placeholder="Enter owner family email"
        />
      </div>
      <div className="pt-4 col-span-2">
        <Button 
          onClick={handleGoogleFamilyClick}
          className="flex items-center gap-2"
          variant="outline"
        >
          <ExternalLink className="h-4 w-4" />
          Manage Google Family
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Click to open Google Family management page
        </p>
      </div>
    </div>
  );
};

export default ServicePackageTab; 