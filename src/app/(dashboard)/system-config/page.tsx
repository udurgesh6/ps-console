"use client";

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function GeneralTab() {
  const [certifications, setCertifications] = useState<string[]>(['ISO 27001', 'NIS2']);
  const [certificationInput, setCertificationInput] = useState('');

  const removeCertification = (cert: string) => {
    setCertifications(certifications.filter(c => c !== cert));
  };

  const addCertification = (cert: string) => {
    if (cert && !certifications.includes(cert)) {
      setCertifications([...certifications, cert]);
      setCertificationInput('');
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold mb-4">Workspace</h2>
        
        <div className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="workspace-name" className="text-base font-normal">
              Name
            </Label>
            <Input
              id="workspace-name"
              defaultValue="Aditya"
              className="max-w-xl"
            />
          </div>

          {/* Industry Field */}
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-base font-normal">
              Industry
            </Label>
            <Select defaultValue="technology">
              <SelectTrigger className="max-w-xl" id="industry">
                <SelectValue placeholder="Select an industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">
                  <div className="flex items-center gap-2">
                    <span>💻</span>
                    <span>Technology</span>
                  </div>
                </SelectItem>
                <SelectItem value="finance">
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span>Finance</span>
                  </div>
                </SelectItem>
                <SelectItem value="healthcare">
                  <div className="flex items-center gap-2">
                    <span>🏥</span>
                    <span>Healthcare</span>
                  </div>
                </SelectItem>
                <SelectItem value="education">
                  <div className="flex items-center gap-2">
                    <span>📚</span>
                    <span>Education</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logo Field */}
          <div className="space-y-2">
            <Label className="text-base font-normal">Logo</Label>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya" 
                  alt="Workspace logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button variant="outline" className="font-normal">
                Upload image
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Recommended: 500x500px, .png or .jpg
            </p>
          </div>

          {/* Company Size Field */}
          <div className="space-y-2">
            <Label htmlFor="company-size" className="text-base font-normal">
              Company size
            </Label>
            <Select defaultValue="less-than-50">
              <SelectTrigger className="max-w-xl" id="company-size">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-50">Less than 50 employees</SelectItem>
                <SelectItem value="50-200">50-200 employees</SelectItem>
                <SelectItem value="200-1000">200-1,000 employees</SelectItem>
                <SelectItem value="1000-5000">1,000-5,000 employees</SelectItem>
                <SelectItem value="5000-plus">5,000+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Certifications Field */}
          {/* <div className="space-y-3">
            <Label htmlFor="certifications" className="text-base font-normal">
              Certifications
            </Label>
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="certifications"
                placeholder="Which certifications apply to you?"
                className="pl-10"
                value={certificationInput}
                onChange={(e) => setCertificationInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCertification(certificationInput);
                  }
                }}
              />
            </div>
            
            {certifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <Badge
                    key={cert}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm font-normal bg-white border border-gray-200 hover:bg-gray-50"
                  >
                    {cert}
                    <button
                      onClick={() => removeCertification(cert)}
                      className="ml-2 hover:text-gray-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}