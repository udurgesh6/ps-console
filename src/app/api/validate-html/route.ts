import { NextResponse } from 'next/server';
import { HtmlValidate } from 'html-validate';
import { getUserFriendlyHtmlErrorMessage } from '@/helpers/get-user-friendly-html-error-message';

// Create validator with explicit inline config
const htmlvalidate = new HtmlValidate({
  root: true,
  extends: [],
  rules: {
    "close-order": "error",           // Tags must close in correct order
    "no-dup-attr": "error",            // No duplicate attributes
    "void-content": "error",           // Void elements can't have content
    "void-style": "off",               // Allow both <meta> and <meta /> styles
    "element-required-content": "off", // Don't require specific content
    "no-unknown-elements": "off",      // Allow any element names
    "attr-quotes": "off",              // Quotes on attributes optional
    "no-inline-style": "off",          // Allow inline styles
    "require-doctype": "off",          // Doctype not required
    "no-trailing-whitespace": "off",   // Allow trailing whitespace
    "element-permitted-content": "off",// Allow any content in elements
    "element-required-ancestor": "off",// Don't enforce element hierarchy
    "element-required-parent": "off",  // Don't enforce parent requirements
  }
});

export async function POST(request: Request) {
  try {
    const { html } = await request.json();

    if (typeof html !== 'string' || !html.trim()) {
      return NextResponse.json(
        { valid: false, errors: [{ message: 'HTML content is required.', rule: 'empty-content' }] },
        { status: 400 }
      );
    }

    // Perform the validation
    const result = await htmlvalidate.validateString(html);

    if (result.valid) {
      return NextResponse.json({ valid: true });
    } else {
      // Map validation errors to user-friendly messages
      const validationErrors = result.results.flatMap(r => 
        r.messages.map(m => {
          const userFriendlyMessage = getUserFriendlyHtmlErrorMessage(m.ruleId, m.line);
          return {
            rule: m.ruleId,
            message: userFriendlyMessage,
            line: m.line,
            column: m.column,
          };
        })
      );
      
      return NextResponse.json(
        { valid: false, errors: validationErrors },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Server-side HTML validation failed:', error);
    return NextResponse.json(
      { valid: false, errors: [{ message: 'Internal server error during validation.', rule: 'server-error' }] },
      { status: 500 }
    );
  }
}
