import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useOnboarding } from "../context/OnboardContext";
import { createProfileFn } from "@/data-access/profile.server";
import { contactSchema } from "../validations/onboarding";

export default function Contact() {
  const { nextStep, previousStep, onboardingData } = useOnboarding();
  const [githubUrl, setGithubUrl] = useState(onboardingData.github_url || "");
  const [linkedinUrl, setLinkedinUrl] = useState(onboardingData.linkedin_url || "");
  const [errors, setErrors] = useState<{ github_url?: string[]; linkedin_url?: string[] }>({});

  const validate = () => {
    const result = contactSchema.safeParse({
      github_url: githubUrl,
      linkedin_url: linkedinUrl,
    });

    if (result.success) {
      setErrors({});
      return true;
    } else {
      setErrors(result.error.flatten().fieldErrors);
      return false;
    }
  };

  const handleFinish = () => {
    if (validate()) {
      nextStep({
        ...onboardingData,
        github_url: githubUrl,
        linkedin_url: linkedinUrl,
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaGithub className="text-primary w-5 h-5" />
          Add your social links
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaGithub className="w-6 h-6 text-foreground/80" />
              <Input 
                placeholder="GitHub URL" 
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className={cn("h-14 text-lg rounded-xl", errors.github_url && "border-red-500 focus-visible:ring-red-500")}
                autoFocus
              />
            </div>
            {errors.github_url && <p className="text-sm text-red-500 px-1">{errors.github_url[0]}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaLinkedinIn className="w-6 h-6 text-foreground/80" />
              <Input 
                placeholder="LinkedIn URL" 
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className={cn("h-14 text-lg rounded-xl", errors.linkedin_url && "border-red-500 focus-visible:ring-red-500")}
              />
            </div>
            {errors.linkedin_url && <p className="text-sm text-red-500 px-1">{errors.linkedin_url[0]}</p>}
          </div>
        </div>
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
          onClick={handleFinish}
          className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
        >
          Finish
        </Button>
      </div>
    </div>
  );
}
