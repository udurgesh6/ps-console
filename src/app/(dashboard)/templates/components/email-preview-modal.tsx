"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Languages, Maximize2, Minimize2, X, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { scopeHtmlTemplate } from "@/lib/scope-html-template";

interface EmailPreviewModalProps {
  open: boolean;
  onClose: () => void;
  htmlTemplate?: string;
  title?: string;
  subject?: string;
  templateType?: "email" | "form" | "landing" | null;
}

// Dummy email options for the dropdown
const dummyEmails = [
  "john.doe@company.com",
  "jane.smith@company.com",
  "admin@company.com",
  "support@company.com",
  "marketing@company.com",
  "sales@company.com"
];

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  open,
  onClose,
  htmlTemplate,
  title = "Email Preview",
  subject = "Email Subject",
  templateType = null
  }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEmailToggle = (email: string) => {
    setSelectedEmails(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const removeEmail = (email: string) => {
    setSelectedEmails(prev => prev.filter(e => e !== email));
  };

  const handleSendPreview = () => {
    // Handle send preview logic here
    console.log('Sending preview to:', selectedEmails);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        showCloseButton={false}
        className="p-0 gap-0 overflow-hidden flex flex-col"
        style={{
          maxWidth: isExpanded ? "80vw" : "48rem",
          height: isExpanded ? "80vh" : "90vh",
          transition: "all 300ms ease-in-out"
        }}
      >
        <div className="flex flex-row items-center justify-between px-6 py-3 border-b bg-white flex-shrink-0">
          <DialogTitle className="!text-base !font-semibold !text-muted-foreground !m-0 !p-0">{title}</DialogTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              title="AI Assistant"
              type="button"
            >
              <Bot className="w-4 h-4 text-gray-600" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              title="Translation"
              type="button"
            >
              <Languages className="w-4 h-4 text-gray-600" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Collapse" : "Expand"}
              type="button"
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4 text-gray-600" />
              ) : (
                <Maximize2 className="w-4 h-4 text-gray-600" />
              )}
            </Button>
            
            <div className="w-px h-4 bg-gray-300 mx-2" />
            
            <Button
              variant="ghost"
              size="icon"
              title="Close"
              type="button"
              onClick={onClose}
            >
              <X className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Email Form Fields */}
        {templateType === "email" && <div className="px-6 border-b bg-gray-50/50">
          {/* From Field */}
          <div className="flex flex-row items-center gap-4 pb-3">
            <Label htmlFor="from-field" className="text-sm font-medium text-muted-foreground mt-2 min-w-[60px]">
              From
            </Label>
            <div className="flex-1">
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild className="!px-0">
                  <Button
                    variant="ghost"
                    className="justify-between h-auto min-h-[40px] pb-1 px-0 border-0 border-b-2 border-dashed border-gray-300 rounded-none bg-transparent hover:bg-transparent focus:bg-transparent"
                    id="from-field"
                  >
                    <div className="flex flex-wrap gap-1 flex-1">
                      {selectedEmails.length === 0 ? (
                        <span className="text-muted-foreground">Select email addresses...</span>
                      ) : selectedEmails.length === 1 ? (
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {selectedEmails[0]}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeEmail(selectedEmails[0]);
                            }}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ) : (
                        <>
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-1"
                          >
                            {selectedEmails[0]}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeEmail(selectedEmails[0]);
                              }}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                          <span className="text-sm text-muted-foreground px-2 py-1">
                            and {selectedEmails.length - 1} other{selectedEmails.length > 2 ? "s" : ""}
                          </span>
                        </>
                      )}
                    </div>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[400px]" align="start">
                  {dummyEmails.map((email) => (
                    <DropdownMenuItem
                      key={email}
                      onClick={() => handleEmailToggle(email)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span>{email}</span>
                      {selectedEmails.includes(email) && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Separator */}
          <div className="-mx-6">
            <Separator className="" />
          </div>

          {/* Subject Field */}
          <div className="flex items-center gap-4 py-2">
            <Label className="text-sm font-medium text-muted-foreground min-w-[60px]">
              Subject
            </Label>
            <div className="flex-1 px-0 py-2 bg-transparent font-medium text-sm text-gray-900">
              {subject}
            </div>
          </div>
        </div>}

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            {htmlTemplate ? (
              <div className="p-6">
                <div 
                  className="email-template-preview" 
                  style={{ 
                    contain: 'style layout',
                    isolation: 'isolate'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: scopeHtmlTemplate(htmlTemplate),
                  }}
                />
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>No template available</p>
              </div>
            )}
          </ScrollArea>
        </div>

        {templateType === "email" && <div className="px-6 py-4 border-t bg-white flex justify-end">
          <Button
            variant="ghost"
            onClick={handleSendPreview}
            className="text-sm text-gray-500"
          >
            Send me a preview
          </Button>
        </div>}
      </DialogContent>
    </Dialog>
  );
};
