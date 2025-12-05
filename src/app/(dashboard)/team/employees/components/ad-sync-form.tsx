"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { ADSyncFormData, adSyncFormSchema } from "@/types";
import { useToast } from "@/hooks";
import {
  useGetADSyncConfig,
  useCreateADSyncConfig,
  useUpdateADSyncConfig,
  useSyncADNow,
  useGetADSyncStatus,
} from "@/hooks";

interface ADSyncFormProps {
  onCancel?: () => void;
}

export function ADSyncForm({ onCancel }: ADSyncFormProps) {
  const { toast } = useToast();
  const { data: configData, isLoading: isLoadingConfig } = useGetADSyncConfig();
  const { data: statusData } = useGetADSyncStatus();
  const createConfig = useCreateADSyncConfig();
  const updateConfig = useUpdateADSyncConfig();
  const syncNow = useSyncADNow();

  const isEditMode = !!configData?.id;

  const form = useForm<ADSyncFormData>({
    resolver: zodResolver(adSyncFormSchema),
    defaultValues: {
      clientId: "",
      clientSecret: "",
      azureTenantId: "",
    },
  });

  // Update form when config data loads
  React.useEffect(() => {
    if (configData) {
      form.reset({
        clientId: configData.clientId || "",
        clientSecret: configData.clientSecret || "",
        azureTenantId: configData.azureTenantId || "",
      });
    }
  }, [configData, form]);

  const handleSubmit = async (data: ADSyncFormData) => {
    try {
      if (isEditMode && configData?.id) {
        await updateConfig.mutateAsync({
          id: configData.id,
          data,
        });
        toast({
          title: "AD Sync configuration updated successfully",
          type: "success",
        });
      } else {
        await createConfig.mutateAsync(data);
        toast({
          title: "AD Sync configuration created successfully",
          type: "success",
        });
      }
      onCancel?.();
    } catch (error) {
      console.log(error);
      toast({
        title: `Failed to ${isEditMode ? "update" : "create"} AD Sync configuration`,
        type: "error",
      });
    }
  };

  const handleSync = async () => {
    try {
      const result = await syncNow.mutateAsync();
      toast({
        title: "Sync completed successfully",
        description: result.message || `Synced ${result.syncedEmployees || 0} employees and ${result.syncedGroups || 0} groups`,
        type: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Sync failed",
        description: "Failed to sync with Azure Active Directory. Please check your credentials.",
        type: "error",
      });
    }
  };

  const isMutating = createConfig.isPending || updateConfig.isPending;
  const isSyncing = syncNow.isPending;

  if (isLoadingConfig) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      {statusData?.isConfigured && statusData.lastSyncedAt && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Last synced:{" "}
            {new Date(statusData.lastSyncedAt).toLocaleString()}
          </AlertDescription>
        </Alert>
      )}

      {!statusData?.isConfigured && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Azure AD Sync is not configured. Please fill in the credentials below to enable synchronization.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Client ID <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 12345678-1234-1234-1234-123456789abc"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The Application (client) ID from your Azure AD app registration
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="azureTenantId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Azure Tenant ID <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 87654321-4321-4321-4321-cba987654321"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The Directory (tenant) ID from your Azure AD
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientSecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Client Secret <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your client secret"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The client secret value from your Azure AD app registration
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3 pt-4 border-t">
            {/* Sync Button - only show if config exists */}
            {isEditMode && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleSync}
                disabled={isSyncing || isMutating}
                className="w-full"
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sync Now
                  </>
                )}
              </Button>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isMutating || isSyncing}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isMutating || isSyncing}>
                {isMutating
                  ? "Saving..."
                  : isEditMode
                    ? "Update Configuration"
                    : "Save Configuration"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
