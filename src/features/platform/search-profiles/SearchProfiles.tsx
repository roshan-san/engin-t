import { Input } from '@/components/ui/input';
import ReqDrawer from '../make-connections/ReqDrawer';

export default function SearchProfiles() {
  return (
    <div className="h-full flex flex-col gap-6 p-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for profiles..."
            autoFocus
            className="w-full h-14 rounded-2xl"
          />
        </div>
        <ReqDrawer />
      </div>

      </div>
  );
}
