export const splitEmail = (fullEmail: string | undefined): { prefix: string, domain: string } => {
    if (!fullEmail || fullEmail.indexOf('@') === -1) {
      return { prefix: "", domain: "" };
    }
    const parts = fullEmail.split('@');
    return {
      prefix: parts[0] || "",
      domain: parts.slice(1).join('@') || "",
    };
  };