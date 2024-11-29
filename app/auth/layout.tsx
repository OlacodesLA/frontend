import ReactQueryProvider from "@/query/react-query-provider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Layout;
