import React from "react";
import Link from "next/link";
import { classNames } from "@/utils/class-names";

export const Header: React.FC<{ authenticated?: boolean }> = (props = { authenticated: false }) => (
  <nav className="mx-auto flex max-w-7xl py-6 px-10 flex-col lg:flex-row space-y-5 lg:space-y-0">
    <HeaderLink href="/">Home</HeaderLink>
    <HeaderLink href="/examples/auth" className="lg:ml-10">Overview</HeaderLink>
    <HeaderLink href="/examples/auth/client-side-protected" className="lg:ml-10">
      Protected (client-side)
    </HeaderLink>
    <HeaderLink href="/examples/auth/server-side-protected" className="lg:ml-10">
      Protected (server-side)
    </HeaderLink>
    <HeaderLink href="/examples/auth/middleware-protected" className="lg:ml-10">
      Protected (middleware)
    </HeaderLink>
    {props.authenticated ? (
      <HeaderLink href="/api/auth/signout" className="lg:ml-auto">
        Sign out
      </HeaderLink>
    ) : (
      <HeaderLink href="/api/auth/signin" className="lg:ml-auto">
        Sign in
      </HeaderLink>
    )}
  </nav>
);

const HeaderLink: React.FC<{ href: string; children: string; className?: string }> = (props) => (
  <Link href={props.href}>
    <a className={classNames("text-lg font-medium text-slate-500 hover:text-slate-900", props.className)}>
      {props.children}
    </a>
  </Link>
);