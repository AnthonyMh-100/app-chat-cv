import SectionTitle from "./ui/secction-title";
import AdaptedCvCard from "./ui/adapted-cv-card";
import EmptyState from "./ui/empty-state";
import { getAdaptedCurriculumsAction } from "@/actions/chat/action-chat";

export default async function CvPage() {
  const data = await getAdaptedCurriculumsAction();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-[#0a0a0a]">
          Mis CV
        </h1>

        <p className="mt-2 text-sm text-[#888888]">
          Tus versiones de CV adaptadas para diferentes vacantes.
        </p>
      </div>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <SectionTitle title="CV adaptados" />

          <span className="rounded-full bg-[#f7f7f7] px-3 py-1 text-xs font-medium text-[#5a5a5c]">
            {data.length} CVs
          </span>
        </div>

        {data.length === 0 ? (
          <EmptyState
            title="Todavía no tienes CV adaptados."
            description="Los CV que generes desde el asistente IA aparecerán aquí."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {data.map((cv) => (
              <AdaptedCvCard key={cv.id} cv={cv} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
