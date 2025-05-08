import Image from "next/image";
import BannerLogo from "./components/layout/BannerLogo";
import Header from "./components/layout/Header";

export default function Home() {
  return (
    <>
      <Header showBackArrow label="Home" />
        <BannerLogo
        src="/Ducati9992.xml" //9992 is lower resolution to load faster
        width={400}
        height={400}
        fill="flex items-center gap-3 black"
        className="relative bg-center pr-2"
        loadingFallback={<div className="">Loading icon…</div>}
        errorFallback={<div className="text-red-500">Error loading icon</div>}
        />
    </>
    
  );
}
