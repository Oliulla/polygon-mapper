import Sidebar from "@/components/Sidebar";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  return (
    <main className="container">
      <Sidebar />
      <Map />
    </main>
  );
}
