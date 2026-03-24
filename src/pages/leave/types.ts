export interface LeaveFormData {
  // Step 1: Reason
  leaveReason: string

  // Step 2: Child Details (conditional - only for child/pregnancy reasons)
  childArrivalStatus: string
  expectedDeliveryDate: string
  spouseWorksForEmployer: string

  // Step 3: Work Schedule
  scheduleConfirmed: boolean
  schedule: { day: string; hours: number }[]

  // Step 4: Leave Schedule & Duration
  leavePattern: string
  leaveStartDate: string
  expectedReturnDate: string
  relatedToPriorLeave: string

  // Step 5: Leave Estimate
  estimateUnderstood: boolean

  // Step 6: Compliance
  priorLeaveIn12Months: string
  workersCompRelated: string
  needsAccommodations: string
  complianceAcknowledged: boolean

  // Step 7: Review
  reviewConfirmed: boolean

  // Employee info (pre-filled)
  employeeName: string
  employeeId: string
  employmentType: string
}

export const defaultFormData: LeaveFormData = {
  leaveReason: '',
  childArrivalStatus: '',
  expectedDeliveryDate: '',
  spouseWorksForEmployer: '',
  scheduleConfirmed: false,
  schedule: [
    { day: 'Monday', hours: 8 },
    { day: 'Tuesday', hours: 8 },
    { day: 'Wednesday', hours: 8 },
    { day: 'Thursday', hours: 8 },
    { day: 'Friday', hours: 8 },
    { day: 'Saturday', hours: 0 },
    { day: 'Sunday', hours: 0 },
  ],
  leavePattern: '',
  leaveStartDate: '',
  expectedReturnDate: '',
  relatedToPriorLeave: '',
  estimateUnderstood: false,
  priorLeaveIn12Months: '',
  workersCompRelated: '',
  needsAccommodations: '',
  complianceAcknowledged: false,
  reviewConfirmed: false,
  employeeName: 'Sarah Johnson',
  employeeId: 'EMP-2025-4821',
  employmentType: 'Full-time',
}

export const CHILD_RELATED_REASONS = ['Bond with a new child', 'Pregnancy / maternity leave']

export type StepId = 'reason' | 'child-details' | 'work-schedule' | 'schedule-duration' | 'estimate' | 'compliance' | 'review' | 'confirmation'
