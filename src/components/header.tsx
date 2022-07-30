import React from "react";
import Link from "next/link";
import { classNames } from "@/utils/class-names";

export const Header: React.FC<{ authenticated?: boolean; links: { href: string; text: string }[] }> = (
  props = { authenticated: false, links: [] }
) => (
  <nav className="mx-auto flex max-w-7xl flex-col space-y-5 py-6 px-10 lg:flex-row lg:space-y-0">
    <HeaderLink href="/">Home</HeaderLink>
    {props.links.map((link) => (
      <HeaderLink key={link.href} href={link.href} className="lg:ml-10">
        {link.text}
      </HeaderLink>
    ))}
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
