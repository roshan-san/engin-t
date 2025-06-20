import { createContext, useContext, useState } from "react";

export type OnboardingDataType= {
  username: string | undefined,
  location: string | undefined,
  github_url: string | undefined,
  linkedin_url: string | undefined,
  skills: string[] | undefined,
  interests: string[] | undefined,
  user_type: string | undefined,
  work_type: string | undefined,
}

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
      console.log(onboardingData)
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
