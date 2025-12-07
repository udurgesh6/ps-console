import { CreateLandingPageRequest, LandingPage, SubmissionForm } from "@/types"

export const decodeBase64 = (base64String: string): string => {
  // Check if the string is already decoded HTML/text
  if (base64String.includes('<') || base64String.includes('>') || base64String.includes('<!DOCTYPE')) {
    console.log("String appears to be already decoded HTML, returning as-is")
    return base64String
  }
  
  console.log("Attempting to decode base64:", base64String.substring(0, 100) + "...")
  
  try {
    // Clean and validate base64 string
    let cleanBase64 = base64String.trim()
    
    // Remove any non-base64 characters (keep only A-Z, a-z, 0-9, +, /, =)
    cleanBase64 = cleanBase64.replace(/[^A-Za-z0-9+/=]/g, '')
    
    // Add padding if necessary
    while (cleanBase64.length % 4) {
      cleanBase64 += '='
    }
    
    // If the string is empty or too short, return original
    if (cleanBase64.length < 4) {
      console.warn("Base64 string too short or invalid, returning original")
      return base64String
    }
    
    // Use TextDecoder for proper UTF-8 handling
    const binaryString = atob(cleanBase64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return new TextDecoder('utf-8').decode(bytes)
  } catch (error) {
    console.error("Failed to decode base64:", error)
    console.warn("Returning original string as fallback")
    return base64String // Return original if decode fails
  }
}

const encodeBase64 = (htmlString: string): string => {
  try {
    // Use TextEncoder for proper UTF-8 handling
    const bytes = new TextEncoder().encode(htmlString)
    const binaryString = Array.from(bytes, byte => String.fromCharCode(byte)).join('')
    return btoa(binaryString)
  } catch (error) {
    console.error("Failed to encode base64:", error)
    return htmlString
  }
}

export const decodeSubmissionForm = (form: SubmissionForm): SubmissionForm => {
  return {
    ...form,
    htmlPage: decodeBase64(form.htmlPage),
  }
}

export const decodeLandingPage = (page: LandingPage): LandingPage => {
  return {
    ...page,
    htmlPage: decodeBase64(page.htmlPage),
  }
}

export const encodeLandingPageRequest = (
  data: CreateLandingPageRequest
): CreateLandingPageRequest => {
  return {
    ...data,
    htmlPage: encodeBase64(data.htmlPage),
  }
}