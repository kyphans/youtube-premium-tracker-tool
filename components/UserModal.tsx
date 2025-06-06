import React, { useState, useEffect } from 'react';
import { User, ActivityLog } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from '../hooks/use-toast';
import UserDetailsTab from './UserModalTabs/UserDetailsTab';
import PaymentInfoTab from './UserModalTabs/PaymentInfoTab';
import ServicePackageTab from './UserModalTabs/ServicePackageTab';
import ActivityLogsTab from './UserModalTabs/ActivityLogsTab';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  onSave: (user: User, changes?: { field: string; oldValue: any; newValue: any; }[]) => void;
  activityLogs: ActivityLog[];
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
  activityLogs
}) => {
  const [formData, setFormData] = useState<Partial<User>>({
    description: '',
    duration: 0,
    available: 0,
    startDate: '',
    endDate: '',
    status: 'NONE',
    feeConstant: 40,
    userEmail: '',
    ownerFamilyEmail: '',
    paymentNotes: ''
  });
  const [originalData, setOriginalData] = useState<Partial<User>>({});
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const calculateFields = (startDate: string, duration: number, feeConstant: number = 40, todayArg?: Date | null) => {
    if (!startDate || !duration) return { endDate: '', available: 0, fees: 0 };
    const start = new Date(startDate.split('/').reverse().join('-'));
    const end = new Date(start);
    end.setDate(end.getDate() + duration);
    const endDate = end.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    if (!todayArg) return { endDate, available: 0, fees: 0 };
    const timeDiff = end.getTime() - todayArg.getTime();
    const available = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const fees = Math.round((available / 30) * feeConstant);
    return { endDate, available, fees };
  };

  useEffect(() => {
    if (user) {
      console.log('user', user);
      setFormData(user);
      setOriginalData(user);
    } else {
      const defaultData = {
        description: '',
        duration: 0,
        available: 0,
        fees: 0,
        startDate: '',
        endDate: '',
        status: 'NONE' as const,
        feeConstant: 40,
        userEmail: '',
        ownerFamilyEmail: '',
        paymentNotes: ''
      };
      setFormData(defaultData);
      setOriginalData({});
    }
  }, [user]);

  useEffect(() => {
    if (formData.startDate && formData.duration && today) {
      const calculated = calculateFields(formData.startDate, formData.duration, formData.feeConstant || 40, today);
      setFormData(prev => ({
        ...prev,
        endDate: calculated.endDate,
        available: calculated.available,
        fees: calculated.fees
      }));
    }
  }, [formData.startDate, formData.duration, formData.feeConstant, today]);

  const getChanges = () => {
    if (!user) return [];
    const fieldsToCheck = [
      'description',
      'duration',
      'startDate',
      'status',
      'feeConstant',
      'userEmail',
      'ownerFamilyEmail',
      'paymentNotes'
    ];
    const changes: { field: string; oldValue: any; newValue: any; }[] = [];
    fieldsToCheck.forEach(key => {
      const field = key as keyof User;
      const oldValue = originalData[field];
      const newValue = formData[field];
      if (oldValue !== newValue) {
        changes.push({
          field: key,
          oldValue,
          newValue
        });
      }
    });
    return changes;
  };

  const handleSave = () => {
    if (!formData.description || !formData.startDate || !formData.duration) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    const userData: User = {
      id: user?.id || '',
      description: formData.description!,
      duration: formData.duration!,
      available: formData.available!,
      startDate: formData.startDate!,
      endDate: formData.endDate!,
      status: formData.status as 'DONE' | 'NONE' | 'PENDING',
      feeConstant: formData.feeConstant || 40,
      userEmail: formData.userEmail || '',
      ownerFamilyEmail: formData.ownerFamilyEmail || '',
      paymentNotes: formData.paymentNotes || ''
    };
    const changes = getChanges();
    onSave(userData, changes);
    toast({
      title: user ? 'User Updated' : 'User Created',
      description: user
        ? `"${user?.description}" has been updated.`
        : `"${formData.description}" has been added.`,
      variant: user ? 'info' : 'success',
    });
    onClose();
  };

  const userLogs = activityLogs.filter(log => log.userId === user?.id);

  const formatLogValue = (value: any) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  };

  const handleGoogleFamilyClick = () => {
    window.open('https://myaccount.google.com/family/details?utm_source=googleaccount&utm_medium=default', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {user ? `Edit User: ${user.description}` : 'Add New User'}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">User Details</TabsTrigger>
            <TabsTrigger value="payment">Payment Info</TabsTrigger>
            <TabsTrigger value="service">Service Package</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <UserDetailsTab formData={formData} setFormData={setFormData} />
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <PaymentInfoTab formData={formData} setFormData={setFormData} />
          </TabsContent>

          <TabsContent value="service" className="space-y-4">
            <ServicePackageTab formData={formData} setFormData={setFormData} handleGoogleFamilyClick={handleGoogleFamilyClick} />
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <ActivityLogsTab userLogs={userLogs} formatLogValue={formatLogValue} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {user ? 'Update User' : 'Create User'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
