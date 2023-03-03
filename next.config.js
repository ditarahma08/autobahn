/** @type {import('next').NextConfig} */
module.exports = () => {
  const env = {
    BASE_URL: 'http://localhost:3000/'
    // BASE_URL: 'http://0.0.0.0:3000/'
  }

  return {
    reactStrictMode: true,
    env
  }
}
