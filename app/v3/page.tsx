import Link from "next/link";

export default function V3() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black gap-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Version 3
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This is the third version of solving the problem of broken conversion to trial purchase and trust problem.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium">
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-8 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[200px]"
            href="/"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

