import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaUser } from "react-icons/fa";
import { useOnboarding } from "../context/OnboardContext";
import { usernameSchema } from "../validations/onboarding";
import { z } from "zod";

export default function UserName() {
  const { nextStep, previousStep, onboardingData } = useOnboarding();
  const [username, setUsername] = useState(onboardingData.username || "");
  const [error, setError] = useState<string | null>(null);

  const validate = (value: string) => {
    try {
      usernameSchema.parse({ username: value });
      setError(null);
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0]?.message || "Invalid username");
      } else {
        setError("Invalid username");
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validate(username)) {
      nextStep({
        ...onboardingData,
        username: username,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleNext();
    }
  };

  const handleBlur = () => {
    validate(username);
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaUser className="text-primary w-5 h-5" />
          Choose your username
        </h3>
        <Input
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          disabled={!!error || username.trim().length === 0}
          className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
        >
          Next
        </Button>
      </div>
    </div>
  );
} 