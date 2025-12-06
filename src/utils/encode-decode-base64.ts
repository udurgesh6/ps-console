import { CreateLandingPageRequest, LandingPage, SubmissionForm } from "@/types"

export const decodeBase64 = (base64String: string): string => {
  console.log(base64String)
  try {
    return atob(base64String)
  } catch (error) {
    console.error("Failed to decode base64:", error)
    return base64String // Return original if decode fails
  }
}

const encodeBase64 = (htmlString: string): string => {
  try {
    return btoa(htmlString)
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