"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, formatTime } from "@/lib/utils";
import { otpSchema } from "@/schemas";

interface OtpVerificationProps {
  email: string;
  expiresIn: number;
  onVerify: (otp: string) => void;
  onBack: () => void;
  loading: boolean;
  error: string;
}

type OtpFormData = z.infer<typeof otpSchema>;

export const OtpVerification = ({
  email,
  expiresIn,
  onVerify,
  onBack,
  loading,
}: OtpVerificationProps) => {
  const [timeLeft, setTimeLeft] = useState(expiresIn);

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Reset timer when component mounts or expiresIn changes
  useEffect(() => {
    setTimeLeft(expiresIn);
    form.reset();
  }, [expiresIn, form]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const onSubmit = (data: OtpFormData) => {
    onVerify(data.otp);
  };

  const isExpired = timeLeft === 0;
  const isWarning = timeLeft > 0 && timeLeft <= 60;

  return (
    <div className="relative">
      <div className="mb-6">
        <div className="flex flex-row items-center justify-between space-y-2">
          <h2 className="text-xl font-bold">Two-Factor Authentication</h2>
          <Button
            onClick={onBack}
            className="rounded-lg hover:bg-gray-100 transition-colors p-0"
            disabled={loading}
            aria-label="Close"
            variant="ghost"
          >
            <X size={24} className="text-gray-600" />
          </Button>
        </div>

        <div className="flex items-center gap-3 text-gray-700 mb-2">
          <Mail size={20} className="text-gray-500" />
          <span className="text-xs">{email}</span>
        </div>

        <p className="text-gray-600 text-sm w-full">
          We&apos;ve sent a 6-digit verification code to your email address.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* OTP Input */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-black">
                  Enter Verification Code
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="000000"
                    className="h-10 text-center text-xl tracking-[0.5em] font-normal border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    autoComplete="off"
                    autoFocus
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Timer Display */}
          <div className="flex items-center gap-2 text-gray-600 mb-8 text-sm">
            <Clock size={18} />
            {isExpired ? (
              <span className="text-red-600 font-medium">Code has expired</span>
            ) : (
              <span className={cn(isWarning && "text-orange-600 font-medium")}>
                Code expires in: {formatTime(timeLeft)}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || isExpired || !form.formState.isValid}
          >
            {loading ? "Verifying..." : "Verify & Sign In"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-gray-500 mt-8 text-sm">
        Didn&apos;t receive the code? Check your spam folder or contact support.
      </div>
    </div>
  );
};
