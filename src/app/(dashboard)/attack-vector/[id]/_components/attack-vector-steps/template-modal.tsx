import { useState, useEffect, FC } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { dummyAttackVectors } from '@/constants/temporary/attack-vectors';

interface Suggestion {
  id: string;
  icon: string;
  text: string;
  fullText?: string;
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
          icon: 'S',
          text: 'Create a SaaS product landing page for a new productivity tool...',
          fullText:
            'Create a SaaS product landing page for a new productivity tool with modern design and clear call-to-action buttons.',
        },
        {
          id: '2',
          icon: 'E',
          text: 'Design an event registration page for a cybersecurity conference...',
          fullText:
            'Design an event registration page for a cybersecurity conference with speaker highlights and agenda.',
        },
        {
          id: '3',
          icon: 'P',
          text: 'Build a product showcase page for a mobile app with features...',
          fullText:
            'Build a product showcase page for a mobile app with features overview and download links.',
        },
        {
          id: '4',
          icon: 'B',
          text: 'Create a business landing page for a consulting firm with...',
          fullText:
            'Create a business landing page for a consulting firm with testimonials and service offerings.',
        },
        {
          id: '5',
          icon: '🎯',
          text: 'Design a marketing campaign page for a limited-time offer...',
          fullText:
            'Design a marketing campaign page for a limited-time offer with countdown timer and urgency elements.',
        },
        {
          id: '6',
          icon: '📱',
          text: 'Build a mobile-first landing page for an app launch with...',
          fullText:
            'Build a mobile-first landing page for an app launch with app store badges and feature highlights.',
        },
      ] : [
        {
          id: '1',
          icon: 'B',
          text: 'Write an e-mail from brevo for email bounce issue that ne...',
          fullText:
            'Write an e-mail from brevo for email bounce issue that need to be fix urgently, no greeting, no salutation.',
        },
        {
          id: '2',
          icon: 'G',
          text: 'Write a professional email to the engineering team at Google ...',
          fullText:
            'Write a professional email to the engineering team at Google about API integration.',
        },
        {
          id: '3',
          icon: 'M',
          text: 'Write an email from the platform to access the last Micros...',
          fullText:
            'Write an email from the platform to access the last Microsoft security update details.',
        },
        {
          id: '4',
          icon: 'N',
          text: 'Write a notification from npm about a security vulnerabilit...',
          fullText:
            'Write a notification from npm about a security vulnerability in one of your packages.',
        },
        {
          id: '5',
          icon: '📧',
          text: 'Write an e-mail inviting your colleagues to vote for the loc...',
          fullText:
            'Write an e-mail inviting your colleagues to vote for the location of the next team building event.',
        },
        {
          id: '6',
          icon: '📧',
          text: 'Write an e-mail to all employees on behalf of the CEO, ann...',
          fullText:
            'Write an e-mail to all employees on behalf of the CEO, announcing the Q4 results.',
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
  };

  const onSubmit = async (data: FormData) => {
    if (!data.prompt.trim()) {
      return;
    }

    setIsGenerating(true);
    try {
      // Simulating API call for generation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock generated result based on type
      const result: GenerateResult = type === 'landing' ? {
        subject: 'Generated Landing Page',
        from: 'Generated Landing Page',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Generated Landing Page</title>
              <style>
                  body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
                  .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                  h1 { color: #333; text-align: center; margin-bottom: 20px; font-size: 2.5rem; }
                  p { color: #666; line-height: 1.6; text-align: center; font-size: 1.1rem; margin-bottom: 20px; }
                  .cta-button { display: inline-block; background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: bold; transition: background 0.3s; }
                  .cta-button:hover { background: #0056b3; }
                  .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 40px 0; }
                  .feature { text-align: center; padding: 20px; border: 1px solid #eee; border-radius: 6px; }
                  .feature h3 { color: #333; margin-bottom: 10px; }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>Welcome to Our Amazing Product</h1>
                  <p>This is a sample landing page generated based on your prompt. It includes modern styling and clear call-to-action elements.</p>
                  <div class="features">
                      <div class="feature">
                          <h3>Feature 1</h3>
                          <p>Amazing functionality that will help you achieve your goals.</p>
                      </div>
                      <div class="feature">
                          <h3>Feature 2</h3>
                          <p>Powerful tools designed to make your life easier.</p>
                      </div>
                      <div class="feature">
                          <h3>Feature 3</h3>
                          <p>Seamless integration with your existing workflow.</p>
                      </div>
                  </div>
                  <div style="text-align: center;">
                      <a href="#" class="cta-button">Get Started Now</a>
                  </div>
              </div>
          </body>
          </html>
        `,
      } : {
        subject: 'AirBnb Discount Scam',
        from: 'phish-sheriff@phish-sheriff.co',
        html: dummyAttackVectors[0].emailHtmlTemplate,
      };

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
