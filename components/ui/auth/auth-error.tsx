"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AuthErrorType = 
  | "Configuration"
  | "AccessDenied"
  | "Verification"
  | "OAuthSignin"
  | "OAuthCallback"
  | "OAuthCreateAccount"
  | "EmailCreateAccount"
  | "Callback"
  | "EmailSignin"
  | string;

const getErrorMessage = (errorCode: AuthErrorType): string => {
  switch (errorCode) {
    case "Configuration":
      return "There is a problem with the server configuration.";
    case "AccessDenied":
      return "Access has been denied.";
    case "Verification":
      return "The verification link may have expired or already been used.";
    case "OAuthSignin":
      return "Error occurred while signing in with the provider.";
    case "OAuthCallback":
      return "Error occurred while processing the authentication.";
    case "OAuthCreateAccount":
      return "Error occurred while creating your account.";
    case "EmailCreateAccount":
      return "Error occurred while creating your account with email.";
    case "Callback":
      return "Error occurred during authentication.";
    case "EmailSignin":
      return "Error sending the email signin link.";
    default:
      return "An unexpected authentication error occurred.";
  }
};

const AuthErrorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  React.useEffect(() => {
    if (!error) {
      router.replace("/");
    }
  }, [error, router]);

  const handleClose = () => {
    router.replace("/");
  };

  if (!error) return null;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-[22rem] sm:max-w-sm">
          <DialogHeader className="space-y-4">
            <div className="flex justify-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <DialogTitle className="text-center">Authentication Error</DialogTitle>
            <DialogDescription className="text-center">
              {getErrorMessage(error as AuthErrorType)}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              variant="default"
              onClick={handleClose}
              className="w-full"
            >
              Go Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthErrorPage;