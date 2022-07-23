import React from "react";
import Link from "next/link";
import { classNames } from "@/utils/class-names";

export const Header: React.FC<{ authenticated?: boolean }> = (props = { authenticated: false }) => (
  <nav className="mx-auto flex max-w-7xl py-6 px-10">
    <HeaderLink href="/">Home</HeaderLink>
    <HeaderLink href="/client-side-protected" className="ml-10">
      Protected (client-side)
    </HeaderLink>
    <HeaderLink href="/server-side-protected" className="ml-10">
      Protected (server-side)
    </HeaderLink>
    <HeaderLink href="/app/middleware-protected" className="ml-10">
      Protected (middleware)
    </HeaderLink>
    {props.authenticated ? (
      <HeaderLink href="/api/auth/signout" className="ml-auto">
        Sign out
      </HeaderLink>
    ) : (
      <HeaderLink href="/api/auth/signin" className="ml-auto">
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
