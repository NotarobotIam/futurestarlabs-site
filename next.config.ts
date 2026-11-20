import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build the site as plain static files (the `out/` folder) so GitHub Pages can serve it.
  output: "export",
  // Write each page as folder/index.html so GitHub Pages serves /company, /bactesign, etc.
  trailingSlash: true,
};

export default nextConfig;
