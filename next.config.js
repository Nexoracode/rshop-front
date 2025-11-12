return {
  async rewrites() {
    return [
      /*  {
        source: "/api/:path*",
        destination:
          "https://app-backend-rshop-nodejs.roohbakhshac.com/api/:path*",
      }, */
      {
        source: "/api/:path*",
        destination: "http://172.18.100.42:3001/api/:path*",
      },
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
};
