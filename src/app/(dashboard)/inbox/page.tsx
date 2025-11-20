"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Mail } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  content?: React.ReactNode;
  primaryButton?: {
    label: string;
    action: () => void;
  };
  secondaryButton?: {
    label: string;
    action: () => void;
  };
}

export default function OnboardingStepper() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const handleStepClick = (stepId: number) => {
    setActiveStep(activeStep === stepId ? 0 : stepId);
  };

  const handleGotIt = () => {
    toast("Request registered");
    setActiveStep(0);
  };

  const handleSkip = () => {
    setActiveStep(0);
  };

  const steps: Step[] = [
    {
      id: 1,
      title: 'Create an alias',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Right now, your team can reach this inbox by forwarding an email to{' '}
            <span className="text-blue-600 font-medium">aditya-1w2@flag.phishsheriff.com</span>. 
            Obviously, this email address is too exotic to be remembered. You should create a more 
            friendly email alias that would redirect all emails to this address.
          </p>
        </div>
      ),
      primaryButton: {
        label: 'View the settings',
        action: () => console.log('View settings clicked'),
      },
    },
    {
      id: 2,
      title: 'Set up the Gmail add-on',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-6">
            <p className="text-gray-600 leading-relaxed flex-1">
              The Gmail add-on introduces an additional button on the right-hand side of Gmail for all 
              your employees. By clicking on this button, emails will be flagged as suspicious and 
              forwarded to this inbox.
            </p>
            <div className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-16 h-20 bg-white rounded shadow-md flex items-center justify-center">
                <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xl font-bold">!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      primaryButton: {
        label: 'Install the extension',
        action: () => console.log('Install extension clicked'),
      },
      secondaryButton: {
        label: 'Skip',
        action: handleSkip,
      },
    },
    {
      id: 3,
      title: 'Get the word out',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Now that your inbox is ready, your team needs to hear about it. Share the instructions 
            to your employees today.
          </p>
        </div>
      ),
      primaryButton: {
        label: 'Share the instructions',
        action: () => console.log('Share instructions clicked'),
      },
      secondaryButton: {
        label: 'Skip',
        action: handleSkip,
      },
    },
    {
      id: 4,
      title: 'Sort incoming emails',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Phishsheriff will automatically sort fraudulent emails, but from time to time our algorithm will 
            need your help to make up its mind. Click the button on the top right corner to mark this 
            email as fraudulent.
          </p>
        </div>
      ),
      primaryButton: {
        label: 'Got it',
        action: handleGotIt,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-semibold mb-3">You&apos;re almost there</h1>
          <p className="text-gray-600 text-lg">
            Follow the steps below to start receiving suspicious emails flagged by your team.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                activeStep === step.id
                  ? 'border-gray-200 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Step Header */}
              <button
                onClick={() => handleStepClick(step.id)}
                className="w-full px-6 py-5 flex items-center gap-4 text-left"
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
                    activeStep === step.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`text-lg font-medium transition-colors duration-300 ${
                    activeStep === step.id ? 'text-black' : 'text-gray-700'
                  }`}
                >
                  {step.title}
                </span>
              </button>

              {/* Step Content with smooth transition */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeStep === step.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  {/* Content */}
                  {step.content && <div className="mb-6">{step.content}</div>}

                  {/* Buttons */}
                  <div className="flex items-center gap-3">
                    {step.primaryButton && (
                      <Button
                        disabled={true}
                        onClick={step.primaryButton.action}
                        className="bg-black text-white hover:bg-gray-800"
                      >
                        {step.primaryButton.label}
                      </Button>
                    )}
                    {step.secondaryButton && (
                      <Button
                        disabled={true}
                        onClick={step.secondaryButton.action}
                        variant="ghost"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {step.secondaryButton.label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}