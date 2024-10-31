import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Provider from "@/components/Providers/SessionProvider";
import { Metadata } from "next";
// import NavBar from "@/components/NavBar/NavBar";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FakeData",
  description: "FakeData",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${poppins.className} antialiased overflow-x-hidden`}
      >
        <Provider>
          <header>
            <NavBar />
          </header>
          <main className="max-w-[1280px] pt-[100px] min-h-screen mx-auto">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
