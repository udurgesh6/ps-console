import { useState, useRef, useEffect } from "react";

export const useHtmlValidation = (
  htmlContent: string,
  setHtmlError: (error: string) => void
) => {
  const [isValidating, setIsValidating] = useState(false);
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastValidatedContentRef = useRef<string>("");

  useEffect(() => {
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }

    validationTimeoutRef.current = setTimeout(async () => {
      if (htmlContent === lastValidatedContentRef.current) return;
      
      lastValidatedContentRef.current = htmlContent;

      if (!htmlContent.trim()) {
        setHtmlError("HTML content cannot be empty");
        setIsValidating(false);
        return;
      }

      setIsValidating(true);
      try {
        const response = await fetch("/api/validate-html", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: htmlContent }),
        });
        const result = await response.json();

        if (result.valid) {
          setHtmlError("");
        } else {
          setHtmlError(result.errors[0].message);
        }
      } catch (error) {
        console.error("Failed to run server validation:", error);
        setHtmlError("Could not connect to the validation server.");
      } finally {
        setIsValidating(false);
      }
    }, 500);

    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, [htmlContent, setHtmlError]);

  return isValidating;
};