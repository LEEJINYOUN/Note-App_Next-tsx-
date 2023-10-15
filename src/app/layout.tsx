import "../styles/globals.css";
import type { Metadata } from "next";
import { ReactQueryProvider } from "@/utils/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Note App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html>
        <body>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
