export const BACKEND_URL = 'https://backend.durgesh-d1805.workers.dev';

export const formattedTime = (time: string) => {
  const dateObject = new Date(time);
  return dateObject.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};
