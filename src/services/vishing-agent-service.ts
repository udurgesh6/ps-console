// import { api } from "@/lib/axios";
import { VishingAgentsResponse } from "@/types";

// Dummy data for development
const DUMMY_VISHING_AGENTS: VishingAgentsResponse = {
  vishingAgents: [
    {
      id: "1",
      agentName: "Marketing Agent",
      agentDescription: "Impersonates a marketing representative offering exclusive deals and promotions to gather customer information.",
      agentPrompt: "Hello, this is {agentName} calling from {companyName} marketing department. We're reaching out to our valued customers about an exclusive {offerType} that's available for a limited time. To verify your eligibility, I'll need to confirm some details. Can you please verify your {personalInfo} for our records?",
      agentVariables: ["agentName", "companyName", "offerType", "personalInfo"]
    },
    {
      id: "2",
      agentName: "Sales Representative",
      agentDescription: "Poses as a sales rep following up on a recent purchase or inquiry to extract sensitive information.",
      agentPrompt: "Hi, I'm {salesRepName} from {companyName} sales team. I'm calling to follow up on your recent inquiry about {productName}. Before we proceed with your order, I need to confirm your {paymentMethod} details and {billingAddress} to process this transaction.",
      agentVariables: ["salesRepName", "companyName", "productName", "paymentMethod", "billingAddress"]
    },
    {
      id: "3",
      agentName: "Bank Security",
      agentDescription: "Pretends to be from the bank's security department reporting suspicious activity to obtain account credentials.",
      agentPrompt: "This is {securityOfficer} from {bankName} fraud prevention department. We've detected suspicious activity on your account ending in {accountNumber}. To secure your account, I need to verify your identity. Please confirm your {securityDetails} and the {verificationCode} sent to your phone.",
      agentVariables: ["securityOfficer", "bankName", "accountNumber", "securityDetails", "verificationCode"]
    },
    {
      id: "4",
      agentName: "IT Support",
      agentDescription: "Impersonates IT support to gain access to systems or credentials under the guise of technical assistance.",
      agentPrompt: "Hello, this is {technicianName} from {companyName} IT support. We're performing a mandatory {maintenanceType} on all systems. To complete this update, I'll need your {username} and temporary access to verify your system security settings. This won't take more than {duration} minutes.",
      agentVariables: ["technicianName", "companyName", "maintenanceType", "username", "duration"]
    },
    {
      id: "5",
      agentName: "Government Official",
      agentDescription: "Claims to be a government representative regarding taxes, benefits, or compliance matters.",
      agentPrompt: "This is {officialName} calling from the {departmentName}. We have an urgent matter regarding your {issueType}. According to our records, there's a discrepancy with your {documentType}. To resolve this immediately and avoid {consequence}, please provide your {requiredInfo}.",
      agentVariables: ["officialName", "departmentName", "issueType", "documentType", "consequence", "requiredInfo"]
    },
    {
      id: "6",
      agentName: "Customer Service",
      agentDescription: "Poses as customer service to resolve a fake issue and gather personal information.",
      agentPrompt: "Good day, I'm {agentName} from {companyName} customer care. We're calling about {issueDescription} with your account. To process your refund of {amount}, I need to verify your {accountDetails} and update your {contactInformation} in our system.",
      agentVariables: ["agentName", "companyName", "issueDescription", "amount", "accountDetails", "contactInformation"]
    },
    {
      id: "7",
      agentName: "HR Department",
      agentDescription: "Impersonates HR to collect employee information for supposed administrative updates.",
      agentPrompt: "Hi, this is {hrRepName} from {companyName} Human Resources. We're updating our employee records and need to verify your {employeeInfo}. Additionally, we need to confirm your {beneficiaryDetails} and {taxInformation} for the upcoming {fiscalYear} documentation.",
      agentVariables: ["hrRepName", "companyName", "employeeInfo", "beneficiaryDetails", "taxInformation", "fiscalYear"]
    },
    {
      id: "8",
      agentName: "Delivery Service",
      agentDescription: "Claims to be from a delivery company requiring information to complete a pending delivery.",
      agentPrompt: "Hello, this is {courierName} from {deliveryCompany}. We have a package for you at our {location} facility, but we need to verify some information. Can you confirm your {addressDetails} and provide {identificationInfo} to authorize the release of your shipment tracking number {trackingNumber}?",
      agentVariables: ["courierName", "deliveryCompany", "location", "addressDetails", "identificationInfo", "trackingNumber"]
    }
  ]
};

export const vishingAgentService = {
  getVishingAgents: async (): Promise<VishingAgentsResponse> => {
    // TODO: Replace with actual API call when endpoint is ready
    // const response = await api.get<VishingAgentsResponse>(
    //   "/vishing-agents",
    //   params
    // );
    // return response;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      vishingAgents: DUMMY_VISHING_AGENTS.vishingAgents,
    };
  }
};