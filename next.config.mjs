/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
    reactStrictMode: false,
    // other configuration options can go here
    onDemandEntries: {
      // This configuration slows down hot reloading, reducing the chances of double-render issues
      maxInactiveAge: 999999,
      pagesBufferLength: 999999,
    }
  }

export default nextConfig;
  