import HomePage from './(public)/home/page';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper';
export default function Home() {
  return (
    <div className='flex flex-col'>
      <Header />
      <main className='min-h-screen'>
        <MaxWidthWrapper >
          <HomePage />
        </MaxWidthWrapper>
      </main>
      <Footer />
    </div>
  );
}
