"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Upload,
  FileSpreadsheet,
  X,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form } from "@/components/ui/form";
import { useImportEmployees } from "@/hooks";
import { useSidebar } from "@/context/sidebar-context";

// ========================================
// FIELD CONFIGURATION - Manage field validation here
// ========================================
interface FieldConfig {
  name: string;
  label: string;
  required: boolean;
  validator: z.ZodTypeAny; // Changed from z.ZodType<string | boolean> to z.ZodTypeAny
  description?: string;
}

const EMPLOYEE_FIELD_CONFIG: FieldConfig[] = [
  {
    name: "name",
    label: "Name",
    required: true,
    validator: z.string().min(1, "Name cannot be empty"),
    description: "Full name of the employee",
  },
  {
    name: "email",
    label: "Email",
    required: true,
    validator: z.string().email("Invalid email address"),
    description: "Valid email address",
  },
  {
    name: "department",
    label: "Department",
    required: true,
    validator: z.string().min(1, "Department cannot be empty"),
    description: "Employee's department",
  },
  {
    name: "positionTitle",
    label: "Position Title",
    required: true,
    validator: z.string().min(1, "Position title cannot be empty"),
    description: "Job title or position",
  },
  {
    name: "isActive",
    label: "Active Status",
    required: false,
    validator: z
      .union([z.string(), z.literal("")])
      .optional()
      .transform((val) => {
        if (!val || val === "") return true; // Default to true if not provided
        const normalized = val.toLowerCase().trim();
        return (
          normalized === "true" || normalized === "yes" || normalized === "1"
        );
      }),
    description: "Employee active status (true/false, yes/no, 1/0)",
  },
  {
    name: "managerEmployeeId",
    label: "Manager Email",
    required: false,
    validator: z
      .union([z.string(), z.literal("")])
      .optional()
      .transform((val) => {
        // Return undefined for empty strings
        if (!val || val === "") return undefined;
        return val;
      })
      .pipe(z.email("Invalid manager email address").optional()),
    description: "Manager's email address (optional)",
  },
];

// Build dynamic schema from field config
const buildEmployeeSchema = () => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  EMPLOYEE_FIELD_CONFIG.forEach((field) => {
    schemaShape[field.name] = field.validator;
  });

  return z.object(schemaShape);
};

const parsedEmployeeSchema = buildEmployeeSchema();

type ParsedEmployee = z.infer<typeof parsedEmployeeSchema>;

// ========================================
// END FIELD CONFIGURATION
// ========================================

// Schema for the file upload form
const fileUploadFormSchema = z.object({
  file: z.instanceof(File).optional(),
});

type FileUploadFormData = z.infer<typeof fileUploadFormSchema>;

export interface ParsedFileData {
  fileName: string;
  rowCount: number;
  data: ParsedEmployee[];
  errors?: string[];
}

export function FileUploadFormWithExcel() {
  const { mutate: importEmployees, isPending } = useImportEmployees();
  const { closeSidebar } = useSidebar();

  const [file, setFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [parseResult, setParseResult] = React.useState<ParsedFileData | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);
  const [parsing, setParsing] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<FileUploadFormData>({
    resolver: zodResolver(fileUploadFormSchema),
  });

  const acceptedFormats =
    ".csv, .xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleFileSelect = async (selectedFile: File) => {
    setError(null);
    setParseResult(null);
    setParsing(true);

    // Validate file type
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    const validExtensions = ["csv", "xlsx", "xls"];

    if (
      !validTypes.includes(selectedFile.type) &&
      !validExtensions.includes(fileExtension || "")
    ) {
      setError("Invalid file format. Please upload a CSV or Excel file.");
      setParsing(false);
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please upload a smaller file.");
      setParsing(false);
      return;
    }

    setFile(selectedFile);

    // Parse the file
    try {
      const parsedData = await parseFile(selectedFile);
      setParseResult(parsedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse file");
      setFile(null);
    } finally {
      setParsing(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setParseResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseResult && file) {
      importEmployees(file);
      closeSidebar()
      handleRemoveFile()
      form.reset()
    }
  };

  const downloadTemplate = () => {
    const headers = EMPLOYEE_FIELD_CONFIG.map((field) => field.name).join(",");

    const sampleRows = [
      "John Doe,john.doe@company.com,Engineering,Software Engineer,true,manager@company.com",
      "Jane Smith,jane.smith@company.com,Design,UI Designer,true,manager@company.com",
      "Bob Johnson,bob.johnson@company.com,Marketing,Marketing Manager,false,",
    ];

    const csvContent = `${headers}\n${sampleRows.join("\n")}`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees_import_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Get required and optional fields from config
  const requiredFields = EMPLOYEE_FIELD_CONFIG.filter((f) => f.required);
  const optionalFields = EMPLOYEE_FIELD_CONFIG.filter((f) => !f.required);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Upload File</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={downloadTemplate}
              className="text-xs"
            >
              <Download className="mr-2 h-3 w-3" />
              Download Template
            </Button>
          </div>

          {/* File Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-gray-400",
              file && "border-green-500 bg-green-50"
            )}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedFormats}
              onChange={handleFileInputChange}
              className="hidden"
            />

            {parsing ? (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3 animate-pulse">
                    <FileSpreadsheet className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-sm font-medium">Parsing file...</p>
              </div>
            ) : !file ? (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Drop your file here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports CSV, XLSX, XLS (Max 5MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <FileSpreadsheet className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="mt-2"
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove File
                </Button>
              </div>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Preview */}
          {parseResult && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Successfully parsed {parseResult.rowCount} row(s) from{" "}
                {parseResult.fileName}
                {parseResult.errors && parseResult.errors.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="font-medium">Warnings:</p>
                    <ul className="list-disc list-inside text-xs space-y-1">
                      {parseResult.errors.slice(0, 3).map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                      {parseResult.errors.length > 3 && (
                        <li>And {parseResult.errors.length - 3} more...</li>
                      )}
                    </ul>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* File Format Instructions */}
        <div className="rounded-lg bg-muted p-4 space-y-2">
          <h4 className="text-sm font-medium">File Format Requirements:</h4>
          <div className="space-y-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Required columns:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside pl-2">
                {requiredFields.map((field) => (
                  <li key={field.name}>
                    <span className="font-medium">{field.name}</span>
                    {field.description && ` - ${field.description}`}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Optional columns:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside pl-2">
                {optionalFields.map((field) => (
                  <li key={field.name}>
                    <span className="font-medium">{field.name}</span>
                    {field.description && ` - ${field.description}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={closeSidebar}
            disabled={isPending || parsing}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!parseResult || isPending || parsing}>
            {isPending
              ? "Importing..."
              : `Import ${parseResult?.rowCount || 0} Records`}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// File parsing utility function with Excel support
async function parseFile(file: File): Promise<ParsedFileData> {
  const fileExtension = file.name.split(".").pop()?.toLowerCase();

  let rawData: Record<string, string>[] = [];

  if (fileExtension === "csv") {
    const content = await file.text();
    rawData = parseCSV(content);
  } else if (fileExtension === "xlsx" || fileExtension === "xls") {
    rawData = await parseExcel(file);
  }

  if (rawData.length === 0) {
    throw new Error(
      "No data found in file. Please ensure the file contains employee data."
    );
  }

  // Validate headers - check if required fields are present
  const fileHeaders = Object.keys(rawData[0] || {});
  const requiredHeaders = EMPLOYEE_FIELD_CONFIG.filter((f) => f.required).map(
    (f) => f.name
  );
  const missingHeaders = requiredHeaders.filter(
    (header) => !fileHeaders.includes(header)
  );

  if (missingHeaders.length > 0) {
    throw new Error(
      `Missing required columns: ${missingHeaders.join(", ")}. Please ensure your file has all required columns.`
    );
  }

  // Filter to only include configured fields
  const allowedFields = EMPLOYEE_FIELD_CONFIG.map((f) => f.name);
  const filteredData = rawData.map((row) => {
    const filtered: Record<string, string> = {};
    allowedFields.forEach((field) => {
      if (row[field] !== undefined) {
        filtered[field] = row[field];
      }
    });
    return filtered;
  });

  // Validate and transform data
  const errors: string[] = [];
  const validatedData: ParsedEmployee[] = [];

  filteredData.forEach((row, index) => {
    try {
      // Validate each row against the schema
      const validated = parsedEmployeeSchema.parse(row);
      validatedData.push(validated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.issues
          .map((issue) => {
            const fieldName = issue.path.join(".");
            const fieldConfig = EMPLOYEE_FIELD_CONFIG.find(
              (f) => f.name === fieldName
            );
            const fieldLabel = fieldConfig?.label || fieldName;
            return `${fieldLabel}: ${issue.message}`;
          })
          .join(", ");
        errors.push(`Row ${index + 2}: ${fieldErrors}`);
      }
    }
  });

  if (validatedData.length === 0) {
    throw new Error(
      "No valid employee data found in file. Please check the format and required fields."
    );
  }

  return {
    fileName: file.name,
    rowCount: validatedData.length,
    data: validatedData,
    errors: errors.length > 0 ? errors : undefined,
  };
}

async function parseExcel(file: File): Promise<Record<string, string>[]> {
  // Dynamically import xlsx only when needed
  const XLSX = await import("xlsx");

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "array" });

        // Get first worksheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          defval: "",
        });

        resolve(jsonData as Record<string, string>[]);
      } catch (err) {
        console.error("Failed to parse Excel file", err);
        reject(new Error("Failed to parse Excel file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read Excel file"));
    };

    reader.readAsArrayBuffer(file);
  });
}

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.split("\n").filter((line) => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
  const data: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || "";
    });

    // Only add rows that have at least one non-empty value
    if (Object.values(row).some((v) => v !== "")) {
      data.push(row);
    }
  }

  return data;
}

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let currentValue = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(currentValue.trim());
      currentValue = "";
    } else {
      currentValue += char;
    }
  }

  values.push(currentValue.trim());
  return values;
}
