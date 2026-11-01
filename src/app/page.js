import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import NewArrivals from "@/components/NewArrivals";
import ReaderReviews from "@/components/ReaderReviews";

export default function Home() {
  return (
    <div>
      <main>
        <Banner />
        <NewArrivals />
        <HowItWorks />
        <ReaderReviews />
      </main>
    </div>
  );
}
