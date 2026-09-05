import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";

export default function AssistantRequiredProfile() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-225 flex-col px-6">
        <main className="flex flex-1 items-center justify-center py-8">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f7f7]">
              <IoPersonOutline size={26} className="text-[#00B48A]" />
            </div>

            <h2 className="text-lg font-semibold text-[#0a0a0a]">
              Configura tu perfil para usar el chat
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#888888]">
              El chat se habilitará cuando configures tu perfil profesional en
              la sección de configuración.
            </p>

            <Link
              href="/settings"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0a0a0a] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#222222]"
            >
              Ir a configuración
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
