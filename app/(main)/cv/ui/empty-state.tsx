import { IoSparklesOutline } from "react-icons/io5";

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="rounded-xl border border-dashed border-[#e5e5e5] bg-[#fafafa] px-6 py-12 text-center">
    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white">
      <IoSparklesOutline size={18} className="text-[#888888]" />
    </div>

    <h3 className="mt-4 text-sm font-medium text-[#0a0a0a]">{title}</h3>

    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#888888]">
      {description}
    </p>
  </div>
);

export default EmptyState;
