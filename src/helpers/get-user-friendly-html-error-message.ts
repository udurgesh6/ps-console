// Helper function to convert technical errors to user-friendly messages
export const getUserFriendlyHtmlErrorMessage = (ruleId: string, line?: number): string => {
  const lineInfo = line ? ` on line ${line}` : '';
  
  const errorMap: Record<string, string> = {
    'parser-error': `Invalid HTML syntax${lineInfo}. Please check for typos, missing closing tags, or incorrect tag structure.`,
    'close-order': `Tags are not closed in the correct order${lineInfo}. Make sure nested tags are closed before their parent tags.`,
    'no-dup-attr': `Duplicate attribute found${lineInfo}. Remove the duplicate attribute from the element.`,
    'void-content': `Self-closing tag contains content${lineInfo}. Tags like <img>, <br>, <input> cannot have content inside them.`,
    'element-required-content': `Missing required content${lineInfo}. This element needs specific content inside it.`,
  };
  
  // Check if we have a user-friendly message for this rule
  if (errorMap[ruleId]) {
    return errorMap[ruleId];
  }
  
  // For unknown errors, provide a generic helpful message
  return `HTML validation error${lineInfo}. Please check your HTML structure and fix any syntax issues.`;
}
