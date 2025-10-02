import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featureLinks = [
  { href: "/rules", label: "Automation Rules" },
  { href: "/bulk", label: "Bulk Ad Creation" },
  { href: "/boosting", label: "Post Boosting" },
  { href: "/dashboards", label: "Dashboards" }
];

export default function MarketingPage() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16">
      <header className="space-y-4 text-center">
        <span className="inline-flex items-center rounded-full bg-birch-50 px-4 py-1 text-sm font-semibold text-birch-600">
          Birch Automation Suite
        </span>
        <h1 className="text-4xl font-bold">Automation that keeps Meta ads on pace</h1>
        <p className="text-lg text-slate-600">
          Build powerful optimisation rules, trigger Slack alerts, and launch campaigns faster with a purpose-built workflow
          engine.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            className="inline-flex items-center gap-2 rounded-md bg-birch-500 px-5 py-2 font-semibold text-white shadow-sm"
            href="/rules"
          >
            Explore the rule builder
            <ArrowRight size={16} />
          </Link>
          <Link className="inline-flex items-center gap-2 rounded-md border px-5 py-2" href="/signin">
            Sign in
          </Link>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {featureLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-birch-500 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">{link.label}</h2>
            <p className="mt-2 text-sm text-slate-600">Learn how Birch automations help you manage spend and creative health.</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
