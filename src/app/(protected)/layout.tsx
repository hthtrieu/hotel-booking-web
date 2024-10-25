import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import AccountMenu from "@/components/user/menu/AccountMenu";
// import BlockContainer from "@/components/common/block-container/BlockContainer";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="min-h-screen">
        <MaxWidthWrapper className="">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-4 my-4">
            <div className="w-full md:w-1/4">
              <div className="md:sticky md:top-16 md:left-0">
                <AccountMenu />
              </div>
            </div>
            <div className="w-full md:w-3/4">{children}</div>
          </div>
        </MaxWidthWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default layout;
