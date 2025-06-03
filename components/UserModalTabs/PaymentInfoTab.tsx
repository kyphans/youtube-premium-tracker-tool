import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface PaymentInfoTabProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const PaymentInfoTab: React.FC<PaymentInfoTabProps> = ({ formData, setFormData }) => {
  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='feeConstant'>Fee Constant</Label>
        <Input
          id='feeConstant'
          type='number'
          value={formData.feeConstant || 40}
          onChange={(e) =>
            setFormData((prev: any) => ({
              ...prev,
              feeConstant: parseInt(e.target.value) || 40
            }))
          }
          placeholder='Default: 40'
        />
      </div>
      <div>
        <Label htmlFor='fees'>Fees (auto-calculated)</Label>
        <Input
          id='fees'
          type='number'
          value={
            formData.available >= 0
              ? 0
              : Math.round((formData.available / 30) * formData.feeConstant)
          }
          readOnly
          className='bg-gray-100'
          placeholder='Calculated automatically'
        />
      </div>
      <div>
        <Label htmlFor='notes'>Payment Notes</Label>
        <Textarea
          id='notes'
          value={formData.paymentNotes || ''}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, paymentNotes: e.target.value }))}
          placeholder='Add payment notes or comments...'
          rows={4}
        />
      </div>
    </div>
  );
};

export default PaymentInfoTab; 