import { FishIcon } from "@phosphor-icons/react/ssr";

export default function Home() {
  return (
    <>
      <div className="bg-primary-1 text-title">colors</div>
      <div className="bg-primary-2 text-subtitle">colors</div>
      <div className="bg-primary-3 text-content">colors</div>
      <div className="bg-secondary-1 text-legend">colors</div>
      <div className="bg-secondary-2">colors</div>
      <div className="bg-secondary-3">colors</div>
      <FishIcon weight="duotone" />
      <main className="bg-foreground flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      </main>
    </>
  );
}
