import { Input } from '@/components/ui/input';
import { useProfileSearch } from './useProfileSearch';
import ProfileCard from './ProfileCard';
import ReqDrawer from '../make-connections/ReqDrawer';

export default function SearchProfiles() {
  const {
    searchQuery,
    setSearchQuery,
    data,
    status,
    isFetchingNextPage,
    hasNextPage,
    ref,
  } = useProfileSearch();

  return (
    <div className="h-full flex flex-col gap-6 p-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for profiles..."
            value={searchQuery}
            autoFocus
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 rounded-2xl"
          />
        </div>
        <ReqDrawer />
      </div>

      {status === 'pending' ? (
        <div className="flex items-center justify-center h-32 text-gray-500">Loading...</div>
      ) : status === 'error' ? (
        <div className="flex items-center justify-center h-32 text-red-500">Error loading Profiles</div>
      ) : data ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {data.pages.map((page) => (
            page.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))
          ))}
          
          <div ref={ref} className="col-span-full h-16 flex items-center justify-center text-gray-500">
            {isFetchingNextPage ? (
              <div className="animate-pulse">Loading more...</div>
            ) : hasNextPage ? (
              <div className="cursor-pointer hover:text-blue-500 transition-colors">Load more</div>
            ) : (
              <div>No more profiles to load</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
