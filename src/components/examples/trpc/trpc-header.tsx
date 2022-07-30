import React from "react";
import { Header } from "@/components/header";

const links = [
  { href: "/examples/trpc", text: "Overview" },
  { href: "/examples/trpc/query-public", text: "Query (public)" },
  { href: "/examples/trpc/query-protected", text: "Query (protected)" },
  { href: "/examples/trpc/query-and-mutation", text: "Query + Mutation" },
];

export const TrpcHeader: React.FC<{ authenticated?: boolean }> = (props) => (
  <Header authenticated={props.authenticated} links={links} />
);
