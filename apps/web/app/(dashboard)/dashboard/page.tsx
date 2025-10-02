import Link from "next/link";

const sections = [
  { title: "Automation rules", href: "/rules", description: "Build and monitor automation workflows." },
  { title: "Bulk creator", href: "/bulk", description: "Generate campaign structures in minutes." },
  { title: "Post boosting", href: "/boosting", description: "Promote high-performing organic posts automatically." }
];

export default function DashboardHomePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="text-slate-600">Select a workspace area to continue optimising your Meta ads.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-birch-500 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
