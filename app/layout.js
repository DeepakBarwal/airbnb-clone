import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb Clone",
  description: "Generated by create next app ;)",
  openGraph: {
    title: "testing title",
    description: "testing with Some description",
    url: "https://airbnb-clone-deepakbarwal.vercel.app/",
    siteName: "Airbnb Clone",
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#FF385C",
            colorText: "black",
          },
        }}
      >
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
