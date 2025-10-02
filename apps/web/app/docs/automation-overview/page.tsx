export default function AutomationOverviewPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
      <header>
        <h1 className="text-3xl font-semibold">Automation overview</h1>
        <p className="text-slate-600">Understand how rules, schedules, and actions come together.</p>
      </header>
      <article className="prose prose-slate">
        <p>
          Birch automations are defined through a JSON-based DSL that captures the scope, filters, custom metrics, actions, and
          execution schedule for a given rule. This documentation page will continue to evolve as the implementation solidifies.
        </p>
        <ol>
          <li><strong>Scope</strong> – Target accounts, campaigns, ad sets, or ads.</li>
          <li><strong>Filters</strong> – Apply metric thresholds, comparisons, and formulas.</li>
          <li><strong>Actions</strong> – Perform Meta API mutations, send notifications, or log context.</li>
          <li><strong>Schedule</strong> – Cron expressions with a minimum granularity of 15 minutes.</li>
        </ol>
        <p>
          Future iterations will connect this page to live API documentation and walkthrough videos.
        </p>
      </article>
    </div>
  );
}
