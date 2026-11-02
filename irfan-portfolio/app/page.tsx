import { Hero } from "@/components/hero/Hero";
import { Navbar } from "@/components/hero/Navbar";

export default function Home() {
  return (
    <main className="w-full flex-1 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center">
        <Hero />
      </div>
    </main>
  );
}
