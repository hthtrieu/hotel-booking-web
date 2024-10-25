// import Header from "@/components/common/header/Header";
// import Footer from "@/components/common/footer/Footer";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col">
      <div className="min-h-screen py-4">{children}</div>
    </div>
  );
};

export default layout;
