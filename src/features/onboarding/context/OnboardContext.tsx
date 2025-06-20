import { OnboardingDataType } from "@/data-access/profile.schema";
import { createProfileFn, logFn } from "@/data-access/profile.server";
import { createContext, useContext, useState } from "react";

type OnboardingContextType = {
  onboardingData:OnboardingDataType;
  step: number;
  nextStep: (data?:OnboardingDataType) => void;
  previousStep: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const OnboardingProvider = ({ 
  children,
}: { 
  children: React.ReactNode;
}) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingDataType>({
    username: undefined,
    location: undefined,
    github_url: undefined,
    linkedin_url: undefined,
    skills: undefined,
    interests: undefined,
    user_type: undefined,
    work_type: undefined,
  });
  const [step, setStep] = useState(1);

  const updateData = (newData: Partial<OnboardingDataType>) =>
    setOnboardingData((prev) => ({ ...prev, ...newData }));

  const nextStep = (data?: Partial<OnboardingDataType>) => {
    if (data) {
      updateData(data);
      if(step ==7 ){
        console.log("final step") 
        logFn()
      }
    }

    setStep(Math.min(7, step + 1));
  };

  const previousStep = () => {
    setStep(Math.max(1, step - 1));
  };

  return (
    <OnboardingContext.Provider value={{ 
      onboardingData,  
      step, 
      nextStep, 
      previousStep,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error("useOnboarding must be used within OnboardingProvider");
  return context;
};
