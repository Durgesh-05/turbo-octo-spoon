export const BlogCardSkeleton = () => {
  return (
    <div className='flex flex-col w-full gap-4 justify-between mt-6 mx-auto px-4 md:px-0 md:w-[55%] animate-pulse'>
      <div className='flex flex-row w-full gap-4'>
        <div className='flex-1'>
          <div className='flex gap-2 items-center'>
            <div className='inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-300 rounded-full'>
              <span className='font-medium text-gray-900 text-xs'></span>
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

export const BlogDetailSkeleton = () => {
  return (
    <div className='flex flex-col w-full md:w-[55%] mx-auto gap-4 mt-6'>
      <div className='h-10 bg-gray-300 rounded animate-pulse'></div>
      <div className='flex items-center gap-2 mb-4'>
        <div className='h-6 w-1/4 bg-gray-300 rounded animate-pulse'></div>
        <div className='h-4 w-1/6 bg-gray-300 rounded animate-pulse'></div>
      </div>
      <div className='h-6 w-full bg-gray-300 rounded animate-pulse mb-4'></div>
      <div className='h-4 w-full bg-gray-300 rounded animate-pulse mb-2'></div>
      <div className='h-4 w-full bg-gray-300 rounded animate-pulse mb-2'></div>
      <div className='h-4 w-full bg-gray-300 rounded animate-pulse mb-2'></div>
      <div className='h-4 w-full bg-gray-300 rounded animate-pulse mb-2'></div>
      <div className='h-4 w-full bg-gray-300 rounded animate-pulse mb-2'></div>
      <div className='h-4 w-full bg-gray-300 rounded animate-pulse mb-2'></div>
      <div className='h-4 w-full bg-gray-300 rounded animate-pulse mb-2'></div>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl animate-pulse'>
        <div className='flex items-center space-x-4'>
          <div className='w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-300'></div>
          <div>
            <h2 className='text-2xl font-semibold text-gray-300 h-6 w-48'></h2>
            <p className='text-gray-300 h-4 w-24'></p>
          </div>
        </div>
        <div className='mt-6'>
          <h3 className='text-xl font-semibold text-gray-800'>Bookmarks</h3>
          <ul className='mt-2 space-y-2'>
            {[1, 2, 3].map((_, index) => (
              <li
                key={index}
                className='bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition duration-200 animate-pulse'
              >
                <p className='text-gray-300 h-4 w-48'></p>
                <p className='text-gray-300 h-4 w-48'></p>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-6'>
          <h3 className='text-xl font-semibold text-gray-800'>Liked Posts</h3>
          <ul className='mt-2 space-y-2'>
            {[1, 2, 3].map((_, index) => (
              <li
                key={index}
                className='bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition duration-200 animate-pulse'
              >
                <p className='text-gray-300 h-4 w-48'></p>
                <p className='text-gray-300 h-4 w-48'></p>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-6'>
          <h3 className='text-xl font-semibold text-gray-800'>Comments</h3>
          <ul className='mt-2 space-y-2'>
            {[1, 2, 3].map((_, index) => (
              <li
                key={index}
                className='bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition duration-200 animate-pulse'
              >
                <p className='text-gray-300 h-4 w-48'></p>
                <span className='text-gray-300 h-4 w-24'></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
