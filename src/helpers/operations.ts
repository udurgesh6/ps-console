import { ObjectType, ValueType, OperationRequest, OperationInput, OperationType } from '@/types'

export const createOperationRequest = (
  objectType: ObjectType,
  operationType: OperationType,
  input: OperationInput[]
): OperationRequest => ({
  objectType,
  operationType,
  input,
})

// Helper for bulk delete
export const createBulkDeleteRequest = (
  objectType: ObjectType,
  ids: string[]
): OperationRequest => ({
  objectType,
  operationType: OperationType.DELETE,
  input: [
    {
      key: `${objectType}Ids`,
      value: ids,
      valueType: ValueType.ARRAY,
    },
  ],
})

// Helper for employee group assignment
export const createAssignGroupRequest = (
  employeeIds: string[],
  groupId: string
): OperationRequest => ({
  objectType: ObjectType.EMPLOYEE,
  operationType: OperationType.ASSIGN_GROUP,
  input: [
    {
      key: "employeeId",
      value: employeeIds,
      valueType: ValueType.ARRAY,
    },
    {
      key: "employeeGroupId",
      value: groupId,
      valueType: ValueType.STRING,
    },
  ],
})
