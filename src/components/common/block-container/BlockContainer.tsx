"use client";
import React from "react";

const BlockContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="p-4 shadow-xl rounded-md ">{children}</div>;
};

export default BlockContainer;
