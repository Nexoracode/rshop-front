/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://app-backend-rshop-nodejs.roohbakhshac.com/api/:path*",
      },
      /*   {
        source: "/api/:path*",
        destination: "http://192.168.32.172:3000/api/:path*",
      }, */
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl.poshtybanman.ir",
        port: "",
        pathname: "/Rshop/**",
        search: "",
      },
    ],
  },
  devIndicators: {
    position: "bottom-right",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
