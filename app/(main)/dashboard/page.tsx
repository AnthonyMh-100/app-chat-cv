import { auth } from "@/app/auth";
import Link from "next/link";
import {
  IoArrowForwardOutline,
  IoDocumentTextOutline,
  IoPencilOutline,
  IoSparklesOutline,
} from "react-icons/io5";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-250 px-8 py-12">
        <header className="mb-10">
          <p className="mb-2 text-sm text-[#888888]">Panel</p>

          <h1 className="text-[30px] font-semibold tracking-[-0.7px] text-[#0a0a0a]">
            Hola, Anthony 👋
          </h1>

          <p className="mt-2 text-[15px] text-[#5a5a5c]">
            Revisa y mejora tu información profesional.
          </p>
        </header>

        <section className="rounded-xl border border-[#e5e5e5] bg-white p-7">
          <div className="flex flex-col gap-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f7f7f7]">
                  <IoDocumentTextOutline size={21} className="text-[#3a3a3c]" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-[#0a0a0a]">
                    Mi CV
                  </h2>

                  <p className="mt-1 text-sm text-[#888888]">
                    Tu información profesional
                  </p>
                </div>
              </div>

              <span className="text-sm font-medium text-[#00b48a]">82%</span>
            </div>

            {/* Progress */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-[#888888]">
                  Información completada
                </span>

                <span className="text-xs text-[#888888]">82%</span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-[#f0f0f0]">
                <div className="h-full w-[82%] rounded-full bg-[#00d4a4]" />
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/cv"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-[#0a0a0a] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1c1c1e]"
              >
                <IoDocumentTextOutline size={15} />
                Ver mi CV
              </Link>

              <Link
                href="/settings"
                className="inline-flex h-9 items-center gap-2 rounded-full border border-[#e5e5e5] px-4 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-[#f7f7f7]"
              >
                <IoPencilOutline size={15} />
                Editar CV
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white">
                <IoSparklesOutline size={20} className="text-[#00b48a]" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-[#0a0a0a]">
                  Asistente IA
                </h2>

                <p className="mt-1 max-w-lg text-sm leading-5 text-[#888888]">
                  ¿Encontraste una vacante? Analiza sus requisitos y descubre
                  cómo mejorar tu CV para esa oportunidad.
                </p>
              </div>
            </div>

            <Link
              href="/assistant"
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-[#0a0a0a] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1c1c1e]"
            >
              Abrir asistente
              <IoArrowForwardOutline size={15} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
