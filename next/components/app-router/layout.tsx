import { Header } from "@/components/app-router/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header menu={null} />
      <main className="grow bg-mischka" id="main-content">
        <div className="max-w-6xl px-6 py-8 mx-auto">{children}</div>
      </main>
    </>
  );
}
