import { Input } from '@/components/ui/input';
import StartupCard from './StartupCard';
import { useStartupSearch } from './useStartupSearch';

export default function SearchStartups() {
  const {
    searchQuery,
    setSearchQuery,
    data,
    status,
    isFetchingNextPage,
    hasNextPage,
    ref,
  } = useStartupSearch();

  return (
    <div className="h-full flex flex-col gap-6 p-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for startups..."
          value={searchQuery}
          autoFocus
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 h-14 rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
        />
      </div>

      {status === 'pending' ? (
        <div className="flex items-center justify-center h-32 text-gray-500">Loading...</div>
      ) : status === 'error' ? (
        <div className="flex items-center justify-center h-32 text-red-500">Error loading startups</div>
      ) : data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.pages.map((page) => (
            page.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))
          ))}
          
          <div ref={ref} className="col-span-full h-16 flex items-center justify-center text-gray-500">
            {isFetchingNextPage ? (
              <div className="animate-pulse">Loading more...</div>
            ) : hasNextPage ? (
              <div className="cursor-pointer hover:text-blue-500 transition-colors">Load more</div>
            ) : (
              <div>No more startups to load</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
