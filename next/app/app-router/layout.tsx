import { Header } from "@/components/app-router/header/header";
import "styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header menu={null} />
      <main className="grow bg-mischka" id="main-content">
        <div className="max-w-6xl px-6 py-8 mx-auto">{children}</div>
      </main>
    </>
  );
}
