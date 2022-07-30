import React from "react";
import { Header } from "@/components/header";

const links = [
  { href: "/examples/auth", text: "Overview" },
  { href: "/examples/auth/client-side-protected", text: "Protected (client-side)" },
  { href: "/examples/auth/server-side-protected", text: "Protected (server-side)" },
  { href: "/examples/auth/middleware-protected", text: "Protected (middleware)" },
];

export const AuthHeader: React.FC<{ authenticated?: boolean }> = (props) => (
  <Header authenticated={props.authenticated} links={links} />
);
