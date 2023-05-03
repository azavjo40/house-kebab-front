/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // apiUrl: 'http://localhost:1337',
    apiUrl: 'https://house-kebab-back.herokuapp.com',
  },
}

module.exports = nextConfig
