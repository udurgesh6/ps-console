import { z } from 'zod'

export const adSyncConfigSchema = z.object({
  id: z.uuid(),
  tenantId: z.uuid(),
  clientId: z.string().min(1, 'Client ID is required'),
  clientSecret: z.string().min(1, 'Client Secret is required'),
  azureTenantId: z.string().min(1, 'Azure Tenant ID is required'),
  isActive: z.boolean(),
  lastSyncedAt: z.number().int().positive().optional(),
  createdAt: z.number().int().positive(),
  updatedAt: z.number().int().positive(),
})

export type ADSyncConfig = z.infer<typeof adSyncConfigSchema>

export const adSyncFormSchema = z.object({
  clientId: z.string().min(1, "Client ID is required"),
  clientSecret: z.string().min(1, "Client Secret is required"),
  azureTenantId: z.string().min(1, "Azure Tenant ID is required"),
})

export type ADSyncFormData = z.infer<typeof adSyncFormSchema>

export interface CreateADSyncRequest {
  clientId: string
  clientSecret: string
  azureTenantId: string
}

export interface UpdateADSyncRequest extends CreateADSyncRequest {
  id: string
}

export interface ADSyncResponse {
  message: string
  syncedEmployees?: number
  syncedGroups?: number
}

export interface ADSyncStatusResponse {
  isConfigured: boolean
  lastSyncedAt?: number
  config?: Partial<ADSyncConfig>
}
