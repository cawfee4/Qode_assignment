import React from "react";
import Head from "next/head";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { icons } from "antd/es/image/PreviewGroup";

export const metadata = {
  title: "Gallery",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
  apple: {
    icon: ["/apple-touch-icon.png"],
  },
  shortcut: ["/apple-touch-icon.png"],
  manifest: "/site.webmanifest",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <Head>
      <title>Default Title</title>
    </Head>
    <body>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
