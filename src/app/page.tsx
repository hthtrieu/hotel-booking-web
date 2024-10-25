import HomePage from "./(public)/home/page";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
// import { Suspense } from "react";
// import Loading from "@/components/common/loading/Loading";
export default function Home() {
  return (
    <div>
      <div className="flex flex-col overflow-y-auto">
        <Header />
        <main className="min-h-screen">
          <MaxWidthWrapper>
            <HomePage />
          </MaxWidthWrapper>
        </main>
        <Footer />
      </div>
    </div>
  );
}
