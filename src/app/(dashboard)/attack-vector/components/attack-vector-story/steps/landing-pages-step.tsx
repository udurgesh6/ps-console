import React, { useState } from "react";
import { Globe, Plus, Library as LibraryIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttackVector } from "@/types/attack-vector";
import { Library } from "@/components/shared/library/library";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LandingPage } from "@/types/landing-page";

interface LandingPagesStepProps {
  formData: Partial<AttackVector>;
  onDataChange?: (data: Partial<AttackVector>) => void;
}

export const LandingPagesStep: React.FC<LandingPagesStepProps> = ({
  onDataChange,
}) => {
  const [showLandingLibrary, setShowLandingLibrary] = useState(false);
  const [showCreateLanding, setShowCreateLanding] = useState(false);

  // Mock data for library components
  const mockLandingPages = [
    { id: "1", name: "Banking Login", title: "Banking Login", description: "Fake banking login page", category: "financial", tags: ["bank", "login"] },
    { id: "2", name: "Social Media", title: "Social Media", description: "Social media login template", category: "social", tags: ["social", "media"] },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="text-center py-8">
          <Globe className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Landing Page Configuration</h3>
          <p className="text-gray-600">Design landing pages to host your phishing simulation.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => setShowCreateLanding(true)}
          >
            <Plus className="w-6 h-6" />
            <span>Create New Landing Page</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => setShowLandingLibrary(true)}
          >
            <LibraryIcon className="w-6 h-6" />
            <span>Browse Landing Library</span>
          </Button>
        </div>
      </div>

      {/* Landing Page Library Modal */}
      <Library
        showInModal={true}
        isOpen={showLandingLibrary}
        onClose={() => setShowLandingLibrary(false)}
        items={mockLandingPages}
        actionButtonText="Select Landing Page"
        onActionButtonClick={(selected) => {
          console.log("Selected landing pages:", selected);
          onDataChange?.({ landingPages: selected as LandingPage[] });
          setShowLandingLibrary(false);
        }}
        renderItem={(item) => (
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        )}
      />

      {/* Create Landing Page Sidebar */}
      <SidebarSheet
        open={showCreateLanding}
        onOpenChange={(open) => !open && setShowCreateLanding(false)}
        title="Create New Landing Page"
        description="Create a new landing page template for your attack vector."
      >
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <Label>Landing Page Name</Label>
            <Input placeholder="Enter landing page name" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Describe the landing page purpose" />
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setShowCreateLanding(false)}>Create Landing Page</Button>
            <Button variant="outline" onClick={() => setShowCreateLanding(false)}>Cancel</Button>
          </div>
        </div>
      </SidebarSheet>
    </>
  );
};
