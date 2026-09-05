import Link from "next/link";
import { IoArrowBackOutline, IoDocumentTextOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-5xl justify-center px-6 py-20">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#f7f7f7]">
          <IoDocumentTextOutline size={24} className="text-[#888888]" />
        </div>

        <h1 className="mt-6 text-xl font-semibold text-[#0a0a0a]">
          CV no encontrado
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#5a5a5c]">
          El CV que buscas no existe o ya no está disponible.
        </p>

        <Link
          href="/cv"
          className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-lg bg-[#0a0a0a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#222222]"
        >
          <IoArrowBackOutline size={16} />
          Volver a mis CV
        </Link>
      </div>
    </main>
  );
}
