
import { Input } from '@/components/ui/input';

export default function SearchStartups() {
  return (
    <div className="h-full flex flex-col gap-6 p-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for startups..."
          autoFocus
          className="w-full p-4 h-14 rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
        />
      </div>
    </div>
  );
}
