"use client";

import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Lightbulb, Info } from 'lucide-react';

interface NotificationRowProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  hasInfoIcon?: boolean;
}

function NotificationRow({ label, value, onChange, hasInfoIcon }: NotificationRowProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <span className="text-base">{label}</span>
        {hasInfoIcon && (
          <Info className="w-4 h-4 text-gray-400" />
        )}
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="digest">Send in the digest</SelectItem>
          <SelectItem value="immediate">Send right away</SelectItem>
          <SelectItem value="none">Don&apos;t send</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default function NotificationsTab() {
  const [emailEnabled, setEmailEnabled] = React.useState(true);

  return (
    <div className="w-full space-y-6">
      {/* Email Notifications Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-2">Email notifications</h2>
        <p className="text-gray-600 mb-6">
          Receive email notifications from what&apos;s happening at Aditya.
        </p>
        
        <div className="flex items-center gap-3 mb-4">
          <Switch
            id="email-notifications"
            checked={emailEnabled}
            onCheckedChange={setEmailEnabled}
          />
          <Label htmlFor="email-notifications" className="text-base font-medium cursor-pointer">
            Enabled
          </Label>
        </div>

        <div className="flex items-start gap-2 text-sm text-gray-600">
          <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>A digest will be sent at the end of each month.</span>
        </div>
      </div>

      {/* Platform Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6">Platform</h2>
        
        <div className="divide-y">
          <NotificationRow
            label="Number of covered employees"
            value="digest"
          />
          <NotificationRow
            label="Integration issue"
            value="immediate"
            hasInfoIcon
          />
        </div>
      </div>

      {/* Awareness Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6">Awareness</h2>
        
        <div className="divide-y">
          <NotificationRow
            label="Number of courses followed"
            value="digest"
            hasInfoIcon
          />
          <NotificationRow
            label="An employee dropped a course"
            value="digest"
          />
          <NotificationRow
            label="An employee graduated"
            value="digest"
            hasInfoIcon
          />
        </div>
      </div>

      {/* Simulation Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6">Simulation</h2>
        
        <div className="divide-y">
          <NotificationRow
            label="Percentage of attacked employees"
            value="digest"
          />
          <NotificationRow
            label="An employee has been tricked"
            value="immediate"
          />
          <NotificationRow
            label="A new campaign has been launched"
            value="immediate"
          />
          <NotificationRow
            label="A campaign/batch has ended"
            value="none"
          />
        </div>
      </div>

      {/* Breaches Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6">Breaches</h2>
        
        <div className="divide-y">
          <NotificationRow
            label="A new breach has been detected"
            value="immediate"
            hasInfoIcon
          />
          <NotificationRow
            label="An employee has been detected in a breach or infostealer"
            value="immediate"
          />
        </div>
      </div>

      {/* Courses Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6">Courses</h2>
        
        <div className="divide-y">
          <NotificationRow
            label="A new course has been launched"
            value="immediate"
          />
        </div>
      </div>
    </div>
  );
}