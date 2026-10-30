import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import ReaderReviews from "@/components/ReaderReviews";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <Banner />
        <HowItWorks />
        <ReaderReviews />
      </main>
    </div>
  );
}
