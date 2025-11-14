"use client"

/**
 * Enhanced File Upload with Excel Support
 * 
 * Installation required:
 * npm install xlsx
 * or
 * yarn add xlsx
 * 
 * This version supports both CSV and Excel files (xlsx, xls)
 */

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { 
  Upload, 
  FileSpreadsheet, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Download
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploadFormProps {
  onSubmit: (data: ParsedFileData) => void
  onCancel: () => void
  isLoading?: boolean
  type: "employees" | "groups"
}

export interface ParsedFileData {
  fileName: string
  rowCount: number
  data: Record<string, string>[]
  errors?: string[]
}

export function FileUploadFormWithExcel({
  onSubmit,
  onCancel,
  isLoading = false,
  type,
}: FileUploadFormProps) {
  const [file, setFile] = React.useState<File | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [parseResult, setParseResult] = React.useState<ParsedFileData | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [parsing, setParsing] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const acceptedFormats = ".csv, .xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFileSelect(selectedFile)
    }
  }

  const handleFileSelect = async (selectedFile: File) => {
    setError(null)
    setParseResult(null)
    setParsing(true)

    // Validate file type
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()
    const validExtensions = ['csv', 'xlsx', 'xls']

    if (!validTypes.includes(selectedFile.type) && !validExtensions.includes(fileExtension || '')) {
      setError('Invalid file format. Please upload a CSV or Excel file.')
      setParsing(false)
      return
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB. Please upload a smaller file.')
      setParsing(false)
      return
    }

    setFile(selectedFile)
    
    // Parse the file
    try {
      const parsedData = await parseFile(selectedFile, type)
      setParseResult(parsedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file')
      setFile(null)
    } finally {
      setParsing(false)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setParseResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (parseResult) {
      onSubmit(parseResult)
    }
  }

  const downloadTemplate = () => {
    let csvContent = ""
    
    if (type === "employees") {
      csvContent = "firstName,lastName,email,phone,department,position,startDate,notes\n"
      csvContent += "John,Doe,john.doe@company.com,+1234567890,Engineering,Software Engineer,2024-01-15,New hire\n"
      csvContent += "Jane,Smith,jane.smith@company.com,+1234567891,Design,UI Designer,2024-01-20,Senior designer\n"
    } else {
      csvContent = "name,description,department,memberEmails\n"
      csvContent += "Engineering Team,Core development team,Engineering,\"john@company.com,jane@company.com\"\n"
      csvContent += "Design Team,UI/UX design team,Design,\"designer1@company.com,designer2@company.com\"\n"
    }

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${type}_import_template.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
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
                  e.stopPropagation()
                  handleRemoveFile()
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
              Successfully parsed {parseResult.rowCount} row(s) from {parseResult.fileName}
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
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          {type === "employees" ? (
            <>
              <li>Required columns: firstName, lastName, email, department, position, startDate</li>
              <li>Optional columns: phone, notes</li>
              <li>Email addresses must be valid and unique</li>
              <li>Date format: YYYY-MM-DD (e.g., 2024-01-15)</li>
            </>
          ) : (
            <>
              <li>Required columns: name, department</li>
              <li>Optional columns: description, memberEmails (comma-separated)</li>
              <li>Group names must be unique</li>
              <li>Member emails should match existing employees</li>
            </>
          )}
        </ul>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading || parsing}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={!parseResult || isLoading || parsing}
        >
          {isLoading ? "Importing..." : `Import ${parseResult?.rowCount || 0} Records`}
        </Button>
      </div>
    </form>
  )
}

// File parsing utility function with Excel support
async function parseFile(file: File, type: "employees" | "groups"): Promise<ParsedFileData> {
  return new Promise(async (resolve, reject) => {
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase()

      let parsedData: Record<string, string>[] = []
      
      if (fileExtension === 'csv') {
        const content = await file.text()
        parsedData = parseCSV(content)
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        // Excel parsing using xlsx library
        parsedData = await parseExcel(file)
      }

      // Validate required fields
      const errors: string[] = []
      const validatedData = parsedData.map((row, index) => {
        if (type === "employees") {
          if (!row.firstName || !row.lastName || !row.email) {
            errors.push(`Row ${index + 2}: Missing required fields (firstName, lastName, email)`)
          }
          if (row.email && !isValidEmail(row.email)) {
            errors.push(`Row ${index + 2}: Invalid email format - ${row.email}`)
          }
          if (row.startDate && !isValidDate(row.startDate)) {
            errors.push(`Row ${index + 2}: Invalid date format - ${row.startDate}`)
          }
        } else {
          if (!row.name) {
            errors.push(`Row ${index + 2}: Missing group name`)
          }
          if (!row.department) {
            errors.push(`Row ${index + 2}: Missing department`)
          }
        }
        return row
      })

      resolve({
        fileName: file.name,
        rowCount: validatedData.length,
        data: validatedData,
        errors: errors.length > 0 ? errors : undefined,
      })
    } catch (err) {
      console.log(err)
      reject(new Error('Failed to parse file. Please check the format.'))
    }
  })
}

async function parseExcel(file: File): Promise<Record<string, string>[]> {
  // Dynamically import xlsx only when needed
  const XLSX = await import('xlsx')
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'array' })
        
        // Get first worksheet
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          dateNF: 'yyyy-mm-dd'
        })
        
        resolve(jsonData as Record<string, string>[])
      } catch (err) {
        console.log(err)
        reject(new Error('Failed to parse Excel file'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read Excel file'))
    }
    
    reader.readAsArrayBuffer(file)
  })
}

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.split('\n').filter(line => line.trim())
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  const data: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    const row: Record<string, string> = {}
    
    headers.forEach((header, index) => {
      row[header] = values[index] || ''
    })
    
    if (Object.values(row).some(v => v !== '')) {
      data.push(row)
    }
  }

  return data
}

function parseCSVLine(line: string): string[] {
  const values: string[] = []
  let currentValue = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      values.push(currentValue.trim())
      currentValue = ''
    } else {
      currentValue += char
    }
  }

  values.push(currentValue.trim())
  return values
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidDate(dateString: string): boolean {
  // Check YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false
  
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}
