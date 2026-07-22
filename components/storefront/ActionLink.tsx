"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface ActionLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function ActionLink({ href, className = "", children }: ActionLinkProps) {
  const [loading, setLoading] = useState(false);

  return (
    <Link
      href={href}
      onClick={() => setLoading(true)}
      className={`${className} inline-flex items-center justify-center space-x-2 transition-all`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />}
      <span>{children}</span>
    </Link>
  );
}
