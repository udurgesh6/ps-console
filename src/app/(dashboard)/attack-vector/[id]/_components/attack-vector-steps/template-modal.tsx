import { useState, useEffect, FC } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { dummyAttackVectors } from '@/constants/temporary/attack-vectors';
import { landingPages } from '@/constants/temporary/landing-pages';

interface Suggestion {
  id: string;
  icon: string;
  text: string;
  fullText?: string;
  templateId?: string; // Add template ID to link to actual templates
}

interface GenerateResult {
  subject: string;
  from: string;
  html: string;
}

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (result: GenerateResult) => void;
  type?: 'email' | 'landing' ;
}

interface FormData {
  prompt: string;
}

export const TemplateModal: FC<TemplateModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  type = 'email',
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      prompt: '',
    },
  });

  const promptValue = watch('prompt');

  // Fetch suggestions on modal open
  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
    }
  }, [isOpen]);

  const fetchSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      // Simulating API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock suggestions data based on type
      const mockSuggestions: Suggestion[] = type === 'landing' ? [
        {
          id: '1',
          icon: '🚀',
          text: 'Create a modern product launch landing page with gradient design...',
          fullText:
            'Create a modern product launch landing page with gradient design, featuring revolutionary product messaging and clear call-to-action buttons.',
          templateId: '1', // Product Launch
        },
        {
          id: '2',
          icon: '💼',
          text: 'Design a clean SaaS startup landing page for business platform...',
          fullText:
            'Design a clean SaaS startup landing page for business platform with professional navbar, hero section and free trial signup.',
          templateId: '2', // SaaS Startup
        },
        {
          id: '3',
          icon: '🎯',
          text: 'Build an event registration page for tech conference 2024...',
          fullText:
            'Build an event registration page for tech conference 2024 with speaker highlights, venue details and registration form.',
          templateId: '3', // Event Registration
        },
        {
          id: '4',
          icon: '🎨',
          text: 'Create a creative portfolio showcase with dark theme design...',
          fullText:
            'Create a creative portfolio showcase with dark theme design, gradient text effects and portfolio grid layout.',
          templateId: '4', // Portfolio Showcase
        },
      ] : [
        {
          id: '1',
          icon: '🏠',
          text: 'Create an AirBnb discount scam email offering 50% off bookings...',
          fullText:
            'Create an AirBnb discount scam email offering 50% off bookings to harvest payment credentials with authentic Airbnb branding.',
          templateId: 'av-1', // AirBnb Discount Scam
        },
        {
          id: '2',
          icon: '🔐',
          text: 'Design a Zoho 2FA bypass email with security alert messaging...',
          fullText:
            'Design a Zoho 2FA bypass email with security alert messaging attempting to bypass two-factor authentication.',
          templateId: 'av-2', // Zoho 2FA Bypass
        },
        {
          id: '3',
          icon: '🎥',
          text: 'Build a YouTube Premium fake subscription offer email...',
          fullText:
            'Build a YouTube Premium fake subscription offer email to collect payment information with trial messaging.',
          templateId: 'av-3', // YouTube Premium Fake
        },
        {
          id: '4',
          icon: '🚗',
          text: 'Create an Uber welcome email for account takeover attempt...',
          fullText:
            'Create an Uber welcome email for account takeover attempt targeting new users with fake welcome messaging.',
          templateId: 'av-4', // Uber Welcome
        },
        {
          id: '5',
          icon: '💬',
          text: 'Design a Microsoft Teams urgent message for business compromise...',
          fullText:
            'Design a Microsoft Teams urgent message for business compromise using fake notifications to trick employees.',
          templateId: 'av-5', // Microsoft Teams
        },
        {
          id: '6',
          icon: '☁️',
          text: 'Build an OneDrive storage full alert phishing email...',
          fullText:
            'Build an OneDrive storage full alert phishing email targeting users with fake storage limit warnings.',
          templateId: 'av-6', // OneDrive Storage
        },
      ];

      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setValue('prompt', suggestion.fullText || suggestion.text, {
      shouldValidate: true,
    });
    
    // If suggestion has a templateId, immediately generate that template
    if (suggestion.templateId) {
      generateTemplateById(suggestion.templateId);
    }
  };

  const generateTemplateById = (templateId: string) => {
    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      let result: GenerateResult;
      
      if (type === 'landing') {
        const selectedPage = landingPages.find(page => page.id === templateId);
        if (selectedPage) {
          result = {
            subject: selectedPage.name,
            from: selectedPage.name,
            html: selectedPage.htmlTemplate,
          };
        } else {
          // Fallback to first landing page
          result = {
            subject: landingPages[0].name,
            from: landingPages[0].name,
            html: landingPages[0].htmlTemplate,
          };
        }
      } else {
        const selectedVector = dummyAttackVectors.find(vector => vector.id === templateId);
        if (selectedVector) {
          result = {
            subject: selectedVector.emailSubject,
            from: selectedVector.from,
            html: selectedVector.emailHtmlTemplate,
          };
        } else {
          // Fallback to first attack vector
          result = {
            subject: dummyAttackVectors[0].emailSubject,
            from: dummyAttackVectors[0].from,
            html: dummyAttackVectors[0].emailHtmlTemplate,
          };
        }
      }
      
      onGenerate(result);
      onClose();
      setIsGenerating(false);
    }, 2000);
  };

  const onSubmit = async (data: FormData) => {
    if (!data.prompt.trim()) {
      return;
    }

    setIsGenerating(true);
    try {
      // Simulating API call for generation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Helper function to find best matching template based on prompt
      const findBestMatchingTemplate = (prompt: string) => {
        const normalizedPrompt = prompt.toLowerCase();
        
        if (type === 'landing') {
          // Define keywords for each landing page category
          const landingPageKeywords = {
            'product': ['product', 'launch', 'new', 'revolutionary', 'innovation', 'feature'],
            'saas': ['saas', 'software', 'platform', 'business', 'startup', 'scale', 'trial'],
            'event': ['event', 'conference', 'registration', 'register', 'attend', 'speaker', 'tech'],
            'portfolio': ['portfolio', 'creative', 'design', 'showcase', 'work', 'studio', 'art']
          };
          
          let bestMatch = landingPages[0]; // Default fallback
          let maxScore = 0;
          
          landingPages.forEach(page => {
            let score = 0;
            const pageKeywords = landingPageKeywords[page.category as keyof typeof landingPageKeywords] || [];
            
            // Check for keyword matches
            pageKeywords.forEach(keyword => {
              if (normalizedPrompt.includes(keyword)) {
                score += 2;
              }
            });
            
            // Check if prompt contains page name or description words
            if (normalizedPrompt.includes(page.name.toLowerCase())) {
              score += 3;
            }
            if (normalizedPrompt.includes(page.description.toLowerCase())) {
              score += 1;
            }
            
            if (score > maxScore) {
              maxScore = score;
              bestMatch = page;
            }
          });
          
          return {
            subject: bestMatch.name,
            from: bestMatch.name,
            html: bestMatch.htmlTemplate,
          };
        } else {
          // Define keywords for each attack vector type
          const attackVectorKeywords = {
            'airbnb': ['airbnb', 'booking', 'travel', 'discount', 'stay', 'accommodation'],
            'zoho': ['zoho', '2fa', 'security', 'verification', 'account', 'alert'],
            'youtube': ['youtube', 'premium', 'video', 'trial', 'subscription', 'free'],
            'uber': ['uber', 'ride', 'driver', 'transport', 'confirm', 'account'],
            'microsoft': ['microsoft', 'teams', 'office', 'onedrive', 'outlook', 'storage'],
            'instagram': ['instagram', 'social', 'photo', 'password', 'reset'],
            'google': ['google', 'gmail', 'drive', 'security', 'gemini', 'ai'],
            'phishing': ['phishing', 'scam', 'fake', 'credential', 'login'],
            'social': ['social', 'engineering', 'pretexting', 'manipulation']
          };
          
          let bestMatch = dummyAttackVectors[0]; // Default fallback
          let maxScore = 0;
          
          dummyAttackVectors.forEach(vector => {
            let score = 0;
            
            // Check for brand/service matches
            Object.entries(attackVectorKeywords).forEach(([key, keywords]) => {
              keywords.forEach(keyword => {
                if (normalizedPrompt.includes(keyword)) {
                  if (vector.name.toLowerCase().includes(key) || 
                      vector.description.toLowerCase().includes(keyword)) {
                    score += 3;
                  } else {
                    score += 1;
                  }
                }
              });
            });
            
            // Check category and subcategory matches
            if (normalizedPrompt.includes(vector.category)) {
              score += 2;
            }
            if (normalizedPrompt.includes(vector.subCategory)) {
              score += 2;
            }
            
            // Check if prompt contains vector name or description words
            const vectorWords = vector.name.toLowerCase().split(' ');
            vectorWords.forEach(word => {
              if (word.length > 3 && normalizedPrompt.includes(word)) {
                score += 2;
              }
            });
            
            if (score > maxScore) {
              maxScore = score;
              bestMatch = vector;
            }
          });
          
          return {
            subject: bestMatch.emailSubject,
            from: bestMatch.from,
            html: bestMatch.emailHtmlTemplate,
          };
        }
      };

      // Mock generated result based on type using intelligent matching
      const result: GenerateResult = findBestMatchingTemplate(data.prompt);

      onGenerate(result);
      onClose();
    } catch (error) {
      console.error('Error generating template:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    if (!isGenerating) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {type === 'landing' ? 'What landing page do you want to create?' : 'What template do you want to create?'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-1">
            {/* Prompt Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Prompt</label>
              <Textarea
                {...register('prompt', {
                  required: 'Prompt is required',
                  minLength: {
                    value: 10,
                    message: 'Prompt must be at least 10 characters',
                  },
                })}
                placeholder={type === 'landing' ? 'A landing page for a SaaS product with modern design...' : 'An email from Linkedin informing users about a ...'}
                className="min-h-[120px] resize-none"
                disabled={isGenerating}
              />
              {errors.prompt && (
                <p className="text-sm text-red-500 mt-1">{errors.prompt.message}</p>
              )}
            </div>

            {/* Suggestions Section */}
            <div>
              <h3 className="text-sm font-medium mb-3">Suggestions</h3>
              <div className="space-y-2">
                {isLoadingSuggestions ? (
                  // Loading Skeletons
                  <>
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border"
                      >
                        <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    ))}
                  </>
                ) : (
                  // Actual Suggestions
                  suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={isGenerating}
                      className="w-full cursor-pointer flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {suggestion.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate group-hover:text-gray-900">
                          {suggestion.text}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isGenerating || !promptValue.trim()}>
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating
                </>
              ) : (
                'Generate'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
