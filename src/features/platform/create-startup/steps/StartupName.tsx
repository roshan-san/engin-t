import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form,FormControl,FormField,FormItem,FormMessage,} from "@/components/ui/form";
import { FaBuilding } from "react-icons/fa";
import { startupNameSchema} from "@/features/platform/create-startup/validations/startup";
import { useStartupCreation } from "../context/StartupCreateContext";
import { StartupInsert } from "@/db/tables/startups";

export default function StartupName() {
  const {nextStep, previousStep ,startupCreationData} = useStartupCreation();
  const form = useForm({
    resolver: zodResolver(startupNameSchema),
  });

  const handleSubmit = async (data: Partial<StartupInsert>) => {
    const isValid = await form.trigger();
    if (isValid) {
      nextStep({
        name: data.name,
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaBuilding className="text-primary w-5 h-5" />
          What&apos;s your startup name?
        </h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Enter your startup name" 
                      {...field}
                      className="h-14 text-lg rounded-xl"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
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
          type="submit"
          onClick={form.handleSubmit(handleSubmit)}
          className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
        >
          Next
        </Button>
      </div>
    </div>
  );
} 