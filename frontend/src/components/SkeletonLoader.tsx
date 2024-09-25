export const BlogCardSkeleton = () => {
  return (
    <div className='flex flex-col w-full gap-4 justify-between mt-6 mx-auto px-4 md:px-0 md:w-[55%] animate-pulse'>
      <div className='flex flex-row w-full gap-4'>
        <div className='flex-1'>
          <div className='flex gap-2 items-center'>
            <div className='inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-300 rounded-full'>
              <span className='font-medium text-gray-900 text-xs'>DD</span>
            </div>
            <div className='h-5 bg-gray-300 rounded w-1/3'></div>
            <div className='h-4 bg-gray-300 rounded w-1/5'></div>
          </div>
          <div className='flex flex-col gap-y-4 mt-2'>
            <div className='h-6 bg-gray-300 rounded w-3/4'></div>
            <div className='h-4 bg-gray-300 rounded w-full'></div>
          </div>
          <div className='flex gap-6 mt-4 justify-start'>
            <div className='h-8 w-8 bg-gray-300 rounded-full'></div>
            <div className='h-8 w-8 bg-gray-300 rounded-full'></div>
            <div className='h-8 w-8 bg-gray-300 rounded-full'></div>
          </div>
        </div>
        <div className='w-32 md:w-40 lg:w-48'>
          <div className='h-32 md:h-40 lg:h-48 bg-gray-300 rounded'></div>
        </div>
      </div>
    </div>
  );
};
