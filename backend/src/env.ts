const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  await import('dotenv/config');
}

const appUrl = process.env.APP_URL as string;

if (appUrl === undefined) {
  throw new Error('APP_URL env not set!');
}

export { isDev, appUrl };
