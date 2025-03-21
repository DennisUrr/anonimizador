// src/components/StepByStep/StepIndicator.tsx
import React from 'react';

interface Step {
  number: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: Set<number>;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, completedSteps }) => {
  return (
    <div className="step-indicator mb-8">
      {steps.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = completedSteps.has(step.number);
        const isLastStep = index === steps.length - 1;
        
        return (
          <div 
            key={step.number}
            className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
          >
            <div className="step-number">
              {isCompleted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <div className="step-title">{step.title}</div>
            {!isLastStep && (
              <div 
                className={`step-connector ${isCompleted ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-700'}`}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '-50%',
                  width: '100%',
                  height: '2px',
                  zIndex: 1
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;