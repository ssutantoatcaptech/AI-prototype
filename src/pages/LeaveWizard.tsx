import { useState, useCallback, useMemo } from 'react'
import Stepper from '../components/leave/Stepper'
import ReasonForLeave from './leave/ReasonForLeave'
import NewChildDetails from './leave/NewChildDetails'
import WorkSchedule from './leave/WorkSchedule'
import LeaveScheduleDuration from './leave/LeaveScheduleDuration'
import LeaveEstimate from './leave/LeaveEstimate'
import Compliance from './leave/Compliance'
import ReviewSubmit from './leave/ReviewSubmit'
import Confirmation from './leave/Confirmation'
import { type LeaveFormData, type StepId, defaultFormData, CHILD_RELATED_REASONS } from './leave/types'

const ALL_STEPS: StepId[] = [
  'reason', 'child-details', 'work-schedule', 'schedule-duration',
  'estimate', 'compliance', 'review', 'confirmation',
]

function getActiveSteps(formData: LeaveFormData): StepId[] {
  const showChildDetails = CHILD_RELATED_REASONS.includes(formData.leaveReason)
  return ALL_STEPS.filter(s => s !== 'child-details' || showChildDetails)
}

function getStepperConfig(currentStep: StepId, activeSteps: StepId[]) {
  const labels = ['Start', 'Employee', 'Leave Reason', 'Details', 'Review & Submit']
  const detailSteps: StepId[] = ['child-details', 'work-schedule', 'schedule-duration', 'estimate', 'compliance']
  const currentIdx = activeSteps.indexOf(currentStep)
  const reasonIdx = activeSteps.indexOf('reason')
  const reviewIdx = activeSteps.indexOf('review')

  return labels.map((label, i) => {
    const stepNum = i + 1
    let status: 'completed' | 'current' | 'upcoming'

    if (stepNum <= 2) {
      status = 'completed'
    } else if (stepNum === 3) {
      status = currentStep === 'reason' ? 'current' : currentIdx > reasonIdx ? 'completed' : 'upcoming'
    } else if (stepNum === 4) {
      if (detailSteps.includes(currentStep)) status = 'current'
      else if (currentIdx <= reasonIdx) status = 'upcoming'
      else status = 'completed'
    } else {
      if (currentStep === 'review') status = 'current'
      else if (currentIdx > reviewIdx) status = 'completed'
      else status = 'upcoming'
    }

    return { label, status }
  })
}

interface Props {
  onBack: () => void
}

export default function LeaveWizard({ onBack }: Props) {
  const [formData, setFormData] = useState<LeaveFormData>(defaultFormData)
  const [step, setStep] = useState<StepId>('reason')
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [animating, setAnimating] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const activeSteps = useMemo(() => getActiveSteps(formData), [formData])

  const updateForm = useCallback((updates: Partial<LeaveFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
    setErrors([])
  }, [])

  const validate = useCallback((): string[] => {
    const errs: string[] = []
    switch (step) {
      case 'reason':
        if (!formData.leaveReason) errs.push('Please select a reason for your leave.')
        break
      case 'child-details':
        if (!formData.childArrivalStatus) errs.push('Please select whether the child has arrived.')
        if (formData.childArrivalStatus === 'Planning for a future arrival' && !formData.expectedDeliveryDate)
          errs.push('Please enter an expected delivery date.')
        if (!formData.spouseWorksForEmployer) errs.push('Please answer the spouse/partner question.')
        break
      case 'work-schedule':
        if (!formData.scheduleConfirmed) errs.push('Please confirm your work schedule.')
        break
      case 'schedule-duration':
        if (!formData.leavePattern) errs.push('Please select a leave pattern.')
        if (!formData.leaveStartDate) errs.push('Please enter a leave start date.')
        if (!formData.expectedReturnDate) errs.push('Please enter an expected return date.')
        if (!formData.relatedToPriorLeave) errs.push('Please answer whether this is related to a prior leave.')
        break
      case 'estimate':
        if (!formData.estimateUnderstood) errs.push('Please acknowledge that this is an estimate.')
        break
      case 'compliance':
        if (!formData.priorLeaveIn12Months) errs.push('Please answer the prior leave question.')
        if (!formData.workersCompRelated) errs.push("Please answer the workers' compensation question.")
        if (!formData.needsAccommodations) errs.push('Please answer the accommodations question.')
        if (!formData.complianceAcknowledged) errs.push('Please acknowledge your rights and responsibilities.')
        break
      case 'review':
        if (!formData.reviewConfirmed) errs.push('Please confirm the information is accurate.')
        break
    }
    return errs
  }, [step, formData])

  const navigateTo = useCallback((targetStep: StepId, dir: 'forward' | 'backward') => {
    setDirection(dir)
    setAnimating(true)
    setErrors([])
    setTimeout(() => {
      setStep(targetStep)
      setAnimating(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 200)
  }, [])

  const goNext = useCallback(() => {
    const errs = validate()
    if (errs.length > 0) {
      setErrors(errs)
      return
    }
    const idx = activeSteps.indexOf(step)
    if (idx < activeSteps.length - 1) {
      navigateTo(activeSteps[idx + 1], 'forward')
    }
  }, [step, activeSteps, validate, navigateTo])

  const goPrev = useCallback(() => {
    const idx = activeSteps.indexOf(step)
    if (idx > 0) {
      navigateTo(activeSteps[idx - 1], 'backward')
    } else {
      onBack()
    }
  }, [step, activeSteps, navigateTo, onBack])

  const goToStep = useCallback((targetStep: StepId) => {
    const currentIdx = activeSteps.indexOf(step)
    const targetIdx = activeSteps.indexOf(targetStep)
    if (targetIdx < currentIdx) {
      navigateTo(targetStep, 'backward')
    }
  }, [step, activeSteps, navigateTo])

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-[#eef0f4] font-['Source_Sans_Pro',sans-serif]">
        <div className="max-w-[696px] mx-auto py-8 px-4">
          <Confirmation formData={formData} onViewStatus={onBack} />
        </div>
      </div>
    )
  }

  const stepperConfig = getStepperConfig(step, activeSteps)
  const currentStepIndex = activeSteps.indexOf(step)
  const totalFormSteps = activeSteps.length - 1 // exclude confirmation
  const progressPercent = Math.round(((currentStepIndex + 1) / totalFormSteps) * 100)

  return (
    <div className="min-h-screen bg-[#eef0f4] font-['Source_Sans_Pro',sans-serif]">
      <div className="max-w-[696px] mx-auto py-8 px-4 flex flex-col gap-5">
        <Stepper steps={stepperConfig} />

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-[#e2e2e5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1a1a2e] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-[#62626e] font-semibold whitespace-nowrap">
            Step {currentStepIndex + 1} of {totalFormSteps}
          </span>
        </div>

        {/* Validation errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 animate-[shake_0.3s_ease-in-out]">
            <p className="text-sm font-semibold text-red-700 mb-1">Please fix the following:</p>
            <ul className="list-disc list-inside text-sm text-red-600 space-y-0.5">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Step content with transition */}
        <div
          className={`transition-all duration-200 ease-out ${
            animating
              ? direction === 'forward'
                ? 'opacity-0 translate-x-8'
                : 'opacity-0 -translate-x-8'
              : 'opacity-100 translate-x-0'
          }`}
        >
          {step === 'reason' && (
            <ReasonForLeave formData={formData} onChange={updateForm} onBack={goPrev} onContinue={goNext} />
          )}
          {step === 'child-details' && (
            <NewChildDetails formData={formData} onChange={updateForm} onBack={goPrev} onContinue={goNext} />
          )}
          {step === 'work-schedule' && (
            <WorkSchedule formData={formData} onChange={updateForm} onBack={goPrev} onContinue={goNext} />
          )}
          {step === 'schedule-duration' && (
            <LeaveScheduleDuration formData={formData} onChange={updateForm} onBack={goPrev} onContinue={goNext} />
          )}
          {step === 'estimate' && (
            <LeaveEstimate formData={formData} onChange={updateForm} onBack={goPrev} onContinue={goNext} />
          )}
          {step === 'compliance' && (
            <Compliance formData={formData} onChange={updateForm} onBack={goPrev} onContinue={goNext} />
          )}
          {step === 'review' && (
            <ReviewSubmit formData={formData} onChange={updateForm} onBack={goPrev} onContinue={goNext} onGoToStep={goToStep} />
          )}
        </div>
      </div>
    </div>
  )
}
