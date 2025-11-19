"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Member {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  lastActive: string;
  role: string;
  avatarUrl?: string;
}

interface MemberItemProps {
  member: Member;
}

function MemberItem({ member }: MemberItemProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex items-center justify-between py-4 px-6 hover:bg-gray-50">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={member.avatarUrl} alt={member.name} />
          <AvatarFallback className="bg-gray-200 text-gray-600">
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-base">{member.name}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span>
              {member.status === 'active' 
                ? `Active (${member.lastActive})`
                : `Inactive`
              }
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <span className="text-gray-600 min-w-[100px]">{member.role}</span>
        <Button variant="outline" className="font-normal">
          View details
        </Button>
      </div>
    </div>
  );
}

export default function MembersTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const members: Member[] = [
    {
      id: '1',
      name: 'Aditya',
      status: 'active',
      lastActive: 'last active 4 minutes ago',
      role: 'Admin',
    },
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Members</h2>
          
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {/* Invite Button */}
            <Button className="bg-black text-white hover:bg-gray-800 ml-auto">
              Invite member
            </Button>
          </div>
        </div>

        {/* Members List */}
        <div className="divide-y divide-gray-200">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <MemberItem key={member.id} member={member} />
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              No members found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}