"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
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
import {
  useResetPassword,
  useConfirmResetPassword,
} from "@/hooks/use-auth";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  resetPasswordEmailSchema,
  resetPasswordSchema,
} from "@/schemas/auth";
import { getErrorMessage } from "@/lib/utils";

type ResetPasswordEmailFormData = z.infer<typeof resetPasswordEmailSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const resetPasswordMutation = useResetPassword();
  const confirmResetPasswordMutation = useConfirmResetPassword();

  // Form for email input (step 1)
  const emailForm = useForm<ResetPasswordEmailFormData>({
    resolver: zodResolver(resetPasswordEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form for new password input (step 2)
  const passwordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle email submission (step 1)
  const onEmailSubmit = async (data: ResetPasswordEmailFormData) => {
    resetPasswordMutation.mutate(
      { email: data.email },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Reset link sent to your email!");
          setSentEmail(data.email);
          setEmailSent(true);
        },
        onError: (error) => {
          toast.error(
            getErrorMessage(error, "Failed to send reset link. Please try again.")
          );
        },
      }
    );
  };

  // Handle new password submission (step 2)
  const onPasswordSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid reset token");
      return;
    }

    confirmResetPasswordMutation.mutate(
      {
        token,
        newPassword: data.newPassword,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Password reset successful!");
          setResetSuccess(true);
          // Redirect to login after 2 seconds
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        },
        onError: (error) => {
          toast.error(
            getErrorMessage(
              error,
              "Failed to reset password. The link may have expired."
            )
          );
        },
      }
    );
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const handleTryAnotherEmail = () => {
    setEmailSent(false);
    setSentEmail("");
    emailForm.reset();
    resetPasswordMutation.reset();
  };

  // If token exists in URL, show password reset form
  if (token) {
    if (resetSuccess) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
          <div className="mb-8">
            <Image
              src="/phish-sheriff-logo-navbar.png"
              alt="PhishSheriff Logo"
              width={200}
              height={200}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={32} />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Password Reset!</h2>
            <p className="text-gray-500 text-sm mb-6">
              Your password has been successfully reset. Redirecting to login...
            </p>

            <Button onClick={handleBackToLogin} className="w-full">
              Continue to Login
            </Button>
          </div>

          <div className="mt-8 text-xs text-gray-400 text-center">
            © 2025 YourCompany. All rights reserved.
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="mb-8">
          <Image
            src="/phish-sheriff-logo-navbar.png"
            alt="PhishSheriff Logo"
            width={200}
            height={200}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToLogin}
            className="mb-4 -ml-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Login
          </Button> */}

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center mb-1">
              Create New Password
            </h2>
            <p className="text-gray-500 text-center text-sm">
              Enter your new password below
            </p>
          </div>

          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-5"
            >
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-2.5 text-gray-400 pointer-events-none"
                          size={18}
                        />
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          placeholder="Enter new password"
                          autoComplete="new-password"
                          disabled={confirmResetPasswordMutation.isPending}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          tabIndex={-1}
                          aria-label={
                            showNewPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showNewPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters with uppercase, lowercase,
                      and number
                    </p>
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-2.5 text-gray-400 pointer-events-none"
                          size={18}
                        />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          placeholder="Confirm new password"
                          autoComplete="new-password"
                          disabled={confirmResetPasswordMutation.isPending}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          tabIndex={-1}
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={confirmResetPasswordMutation.isPending}
              >
                {confirmResetPasswordMutation.isPending
                  ? "Resetting Password..."
                  : "Reset Password"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="mt-8 text-xs text-gray-400 text-center">
          © 2025 YourCompany. All rights reserved.
        </div>
      </div>
    );
  }

  // No token in URL - show email input form
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="mb-8">
        <Image
          src="/phish-sheriff-logo-navbar.png"
          alt="PhishSheriff Logo"
          width={200}
          height={200}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {!emailSent ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-center mb-1">
                Reset Password
              </h2>
              <p className="text-gray-500 text-center text-sm">
                Enter your email address and we&apos;ll send you a link to reset your
                password
              </p>
            </div>

            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-2.5 text-gray-400 pointer-events-none"
                            size={18}
                          />
                          <Input
                            type="email"
                            className="pl-10"
                            placeholder="Enter your email"
                            autoComplete="email"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending
                    ? "Sending Link..."
                    : "Send Reset Link"}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm text-gray-500 mt-6">
              Remember your password?{" "}
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToLogin}
                className="font-medium ml-1"
              >
                Sign In
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={32} />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
            <p className="text-gray-500 text-sm mb-6">
              We&apos;ve sent a password reset link to
              <br />
              <span className="font-medium text-gray-700">{sentEmail}</span>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                Click the link in the email to reset your password. The link
                will expire in 1 hour.
              </p>
            </div>

            <div className="space-y-3">
              <Button onClick={handleBackToLogin} className="w-full">
                Back to Login
              </Button>

              <Button
                variant="outline"
                onClick={handleTryAnotherEmail}
                className="w-full"
              >
                Try Another Email
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500 mt-6">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <Button
                type="button"
                variant="link"
                onClick={handleTryAnotherEmail}
                className="text-blue-600 p-0 h-auto hover:text-blue-700 font-medium"
              >
                try again
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-xs text-gray-400 text-center">
        © 2025 YourCompany. All rights reserved.
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
