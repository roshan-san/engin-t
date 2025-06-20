import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { locationSchema } from "../validations/onboarding";
import { useOnboarding } from "../context/OnboardContext";
import { z } from "zod";

export default function Location() {
  const { nextStep, previousStep, onboardingData } = useOnboarding();
  const [location, setLocation] = useState(onboardingData?.location || "");
  const [error, setError] = useState<string | null>(null);

  const validate = (value: string) => {
    try {
      locationSchema.parse({ location: value });
      setError(null);
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0]?.message || "Invalid location");
      } else {
        setError("Invalid location");
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validate(location)) {
      nextStep({
        ...onboardingData,
        location
       });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleNext();
    }
  };

  const handleBlur = () => {
    validate(location);
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase">
          Where are you located?
        </h3>
        <Input
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="h-14 text-lg rounded-xl"
          autoFocus
        />
        {error && (
          <div className="text-destructive text-sm mt-1">{error}</div>
        )}
      </div>
      <div className="w-full p-4 flex justify-between gap-4 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={previousStep}
          className="flex-1 h-12 text-lg font-medium hover:bg-muted/50 transition-colors"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={!!error || location.trim().length === 0}
          className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
        >
          Next
        </Button>
      </div>
    </div>
  );
} 