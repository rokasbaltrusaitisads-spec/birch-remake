export default function SignInPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-6 py-16">
      <header className="space-y-1 text-center">
        <h1 className="text-3xl font-semibold">Sign in to Birch</h1>
        <p className="text-slate-600">Access your organisations, automations, and dashboards.</p>
      </header>
      <form className="space-y-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Email
          <input className="rounded-md border border-slate-200 px-3 py-2" type="email" placeholder="you@example.com" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Password
          <input className="rounded-md border border-slate-200 px-3 py-2" type="password" placeholder="********" />
        </label>
        <button className="w-full rounded-md bg-birch-500 px-4 py-2 font-semibold text-white" type="button">
          Sign in (placeholder)
        </button>
      </form>
    </div>
  );
}
