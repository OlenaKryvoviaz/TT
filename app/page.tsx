import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black gap-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-2xl text-lg leading-8 text-zinc-800 dark:text-zinc-200">
            Here is a test task implementation page of Olena Kryvoviaz. The buttons below represent 3 options of solving the problem of broken conversion to trial purchase and a trust problem.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[120px]"
            href="/v1"
          >
            V1
          </Link>
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[120px]"
            href="/v2"
          >
            V2
          </Link>
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[120px]"
            href="/v3"
          >
            V3
          </Link>
        </div>
      </main>
    </div>
  );
}
