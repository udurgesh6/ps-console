export const scopeHtmlTemplate = (html: string, scopeClass: string = 'email-template-preview') => {
  return html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, cssContent) => {
    const scopedCss = cssContent.replace(
      /([^{}]+){/g, 
      (match: string, selector: string) => {
        if (selector.trim().startsWith('@')) return match;
        
        const scopedSelector = selector
          .split(',')
          .map((s: string) => `.${scopeClass} ${s.trim()}`)
          .join(', ');
        
        return `${scopedSelector} {`;
      }
    );
    
    return `<style>${scopedCss}</style>`;
  });
};
