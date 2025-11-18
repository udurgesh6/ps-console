"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Languages, Loader2, Maximize2, Minimize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { scopeHtmlTemplate } from "@/lib/scope-html-template";
import { availableDomains } from "@/constants/temporary/available-domains";

interface EmailPreviewModalProps {
  open: boolean;
  onClose: () => void;
  htmlTemplate?: string;
  title?: string;
  subject?: string;
  from?: string;
  templateType?: "email" | "form" | "landing" | null;
  onUseTemplate?: (data: {
    from: string;
    subject: string;
    html: string;
  }) => void;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  open,
  onClose,
  htmlTemplate = "",
  title = "Email Preview",
  subject: initialSubject = "Email Subject",
  from: initialFrom = "",
  templateType = null,
  onUseTemplate,
}) => {

  const [isExpanded, setIsExpanded] = useState(false);
  
  // Editable fields
  const [emailPrefix, setEmailPrefix] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [subject, setSubject] = useState(initialSubject);
  const [htmlContent, setHtmlContent] = useState(htmlTemplate);
  const [usingTemplate, setIsUsingTemplate] = useState(false);

  // Parse initial from email
  useEffect(() => {
    if (initialFrom) {
      const [prefix, domain] = initialFrom.split("@");
      setEmailPrefix(prefix || "");
      setEmailDomain(domain ? `@${domain}` : "");
    }
  }, [initialFrom]);

  // Update HTML content when htmlTemplate prop changes
  useEffect(() => {
    setHtmlContent(htmlTemplate);
  }, [htmlTemplate]);

  // Update subject when initialSubject prop changes
  useEffect(() => {
    setSubject(initialSubject);
  }, [initialSubject]);

  const handleUseTemplate = async () => {
    setIsUsingTemplate(true);
    try {
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    if (onUseTemplate) {
      const fromEmail = emailDomain.startsWith("@") 
        ? `${emailPrefix}${emailDomain}`
        : `${emailPrefix}@${emailDomain}`;
      
      onUseTemplate({
        from: fromEmail,
        subject: subject,
        html: htmlContent,
      });
    }
    onClose();
    } catch (error) {
      console.error('Error using template:', error);
    } finally {
      setIsUsingTemplate(false);
    }
  };

  const handleSendPreview = () => {
    // Handle send preview logic here
    console.log('Sending preview...');
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
        {/* Header */}
        <div className="flex flex-row items-center justify-between px-6 py-3 border-b bg-white flex-shrink-0">
          <DialogTitle className="!text-base !font-semibold !text-muted-foreground !m-0 !p-0">
            {title}
          </DialogTitle>
          
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
        {templateType === "email" && (
          <div className="px-6 border-b bg-gray-50/50">
            {/* From Field */}
            <div className="flex flex-row items-center gap-4 pb-3 pt-3">
              <Label htmlFor="from-field" className="text-sm font-medium text-muted-foreground min-w-[60px]">
                From
              </Label>
              <div className="flex flex-1 items-center">
                <Input
                  id="from-field"
                  value={emailPrefix}
                  onChange={(e) => setEmailPrefix(e.target.value)}
                  placeholder="e.g., info"
                  className="w-28 border-0 border-b-2 shadow-none rounded-none border-dashed px-0"
                />
                <Select
                  value={emailDomain}
                  onValueChange={setEmailDomain}
                >
                  <SelectTrigger className="flex-1 border-0 border-b-2 cursor-pointer shadow-none rounded-none border-dashed pl-0">
                    <SelectValue placeholder="@Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDomains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Separator */}
            <div className="-mx-6">
              <Separator />
            </div>

            {/* Subject Field */}
            <div className="flex items-center gap-4 py-3">
              <Label htmlFor="subject-field" className="text-sm font-medium text-muted-foreground min-w-[60px]">
                Subject
              </Label>
              <Input
                id="subject-field"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject..."
                className="flex-1 pl-0 border-0 border-b-2 shadow-none rounded-none border-dashed"
              />
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="p-6">
              {htmlContent ? (
                  <div 
                    className="email-template-preview min-h-[400px] rounded-lg"
                    style={{ 
                      contain: 'style layout',
                      isolation: 'isolate'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: scopeHtmlTemplate(htmlContent),
                    }}
                  />
                ) : (
                  <div className="min-h-[400px] p-4 border border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-500">
                    <p>No template available</p>
                  </div>
                )
              }
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        {templateType === "email" && (
          <div className="px-6 py-4 border-t bg-white flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handleSendPreview}
              className="text-sm text-gray-500"
            >
              Send me a preview
            </Button>
            <Button
              onClick={handleUseTemplate}
              className="text-sm"
            >
              {usingTemplate ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Use Template
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
