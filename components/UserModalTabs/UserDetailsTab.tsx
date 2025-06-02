import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface UserDetailsTabProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const UserDetailsTab: React.FC<UserDetailsTabProps> = ({ formData, setFormData }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="description">Description *</Label>
        <Input
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
          placeholder="Enter user description"
        />
      </div>
      <div>
        <Label htmlFor="duration">Duration (days) *</Label>
        <div className="flex space-x-2">
          <Input
            id="duration"
            type="text"
            value={formData.durationExpression || String(formData.duration) || ''}
            onChange={(e) => {
              const expression = e.target.value;
              setFormData((prev: any) => ({
                ...prev,
                durationExpression: expression,
                // Also clear duration if expression is empty
                duration: expression === '' ? '' : prev.duration, // Keep previous duration or set to '' if cleared
              }));

              // Only attempt to evaluate if the expression is not empty
              if (expression !== '') {
                try {
                  // Use Function constructor for safer evaluation than eval()
                  // Evaluate the expression to get the numeric value
                  const calculatedDuration = Function('"use strict"; return (' + expression + ')')();
                  if (!isNaN(calculatedDuration)) {
                    setFormData((prev: any) => ({
                      ...prev,
                      duration: parseInt(calculatedDuration) || 0,
                    }));
                  } else {
                     // If calculation results in NaN (e.g., invalid expression after typing), clear duration
                     setFormData((prev: any) => ({ ...prev, duration: '' }));
                  }
                } catch (error) {
                  // Handle potential errors during calculation (e.g., invalid expression)
                  console.error("Error evaluating duration expression:", error);
                   // If there's an error, clear the numeric duration but keep the expression
                   setFormData((prev: any) => ({ ...prev, duration: '' }));
                }
              }
            }}
          />
           <button
            type="button"
            className="px-3 py-1 border rounded"
            onClick={() => {
              const currentValue = parseFloat(formData.duration || 0);
              const newValue = currentValue + 30;
              setFormData((prev: any) => ({
                ...prev,
                duration: newValue,
                durationExpression: String(newValue),
              }));
            }}
          >
            +30
          </button>
          <button
            type="button"
            className="px-3 py-1 border rounded"
            onClick={() => {
              const currentValue = parseFloat(formData.duration || 0);
              const newValue = currentValue + 60;
              setFormData((prev: any) => ({
                ...prev,
                duration: newValue,
                durationExpression: String(newValue),
              }));
            }}
          >
            +60
          </button>
          <button
            type="button"
            className="px-3 py-1 border rounded"
            onClick={() => {
              const currentValue = parseFloat(formData.duration || 0);
              const newValue = currentValue + 90;
              setFormData((prev: any) => ({
                ...prev,
                duration: newValue,
                durationExpression: String(newValue),
              }));
            }}
          >
            +90
          </button>
        </div>
      </div>
      <div>
        <Label htmlFor="available">Available (auto-calculated)</Label>
        <Input
          id="available"
          type="number"
          value={formData.available || 0}
          readOnly
          className="bg-gray-100"
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <div className="flex items-center space-x-2">
          <div
            className={`w-4 h-4 rounded-full ${
              formData.status === 'DONE' ? 'bg-blue-500' :
              formData.status === 'NONE' ? 'bg-red-500' :
              formData.status === 'PENDING' ? 'bg-green-500' :
              'bg-gray-300' // Default color if status is something else
            }`}
          ></div>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData((prev: any) => ({ ...prev, status: value as 'DONE' | 'NONE' | 'PENDING' }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DONE">DONE</SelectItem>
              <SelectItem value="NONE">NONE</SelectItem>
              <SelectItem value="PENDING">PENDING</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="startDate">Start Date *</Label>
        <Input
          id="startDate"
          type="date"
          value={formData.startDate ? formData.startDate.split('/').reverse().join('-') : ''}
          onChange={(e) => {
            const date = e.target.value;
            const formattedDate = date ? date.split('-').reverse().join('/') : '';
            setFormData((prev: any) => ({ ...prev, startDate: formattedDate }));
          }}
        />
      </div>
      <div>
        <Label htmlFor="endDate">End Date (auto-calculated)</Label>
        <Input
          id="endDate"
          type="text"
          value={formData.endDate || ''}
          readOnly
          className="bg-gray-100"
        />
      </div>
    </div>
  );
};

export default UserDetailsTab; 