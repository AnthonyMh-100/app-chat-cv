import { renderToStream } from "@react-pdf/renderer";
import { getCurriculumByIdAction } from "@/actions/chat/action-chat";
import { CvDocument } from "@/app/(main)/cv/ui/pdf/cv-document";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const curriculumId = Number(id);

  if (Number.isNaN(curriculumId))
    return new Response("ID inv\u00e1lido", { status: 400 });

  const { data } = await getCurriculumByIdAction(curriculumId);

  if (!data) return new Response("CV no encontrado", { status: 404 });

  const element = <CvDocument data={data} />;

  const stream = await renderToStream(element);
  const chunks: Uint8Array[] = [];

  for await (const chunk of stream) {
    if (typeof chunk === "string") {
      chunks.push(Buffer.from(chunk));
    } else {
      chunks.push(new Uint8Array(chunk));
    }
  }

  const pdfBuffer = Buffer.concat(chunks);

  const fileName = `${data.vacancy?.replace(/\s+/g, "-") || data.name.replace(/\s+/g, "-")}.pdf`;

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-cache",
    },
  });
}
