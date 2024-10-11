"use client";
import { Provider } from "react-redux";
import initStore from "@/store/initStore";
const store = initStore();

const ReduxProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
