import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="dark flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-black gap-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-700">
            <Image
              src="/profile-photo.jpg"
              alt="Olena Kryvoviaz"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-zinc-100">Olena Kryvoviaz</h1>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-2xl text-lg leading-8 text-zinc-200">
            Here is a test task implementation page of Olena Kryvoviaz. The buttons below represent 3 options of solving the problem of broken conversion to trial purchase and a trust problem.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium w-full items-center">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#ccc] md:w-[120px]"
              href="/v1"
            >
              V1
            </Link>
            <Link
              className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#ccc] md:w-[120px]"
              href="/v2"
            >
              V2
            </Link>
            <Link
              className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#ccc] md:w-[120px]"
              href="/v3"
            >
              V3
            </Link>
          </div>
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#ccc] sm:w-[392px]"
            href="/combined"
          >
            Combined variant
          </Link>
        </div>
      </main>
    </div>
  );
}
