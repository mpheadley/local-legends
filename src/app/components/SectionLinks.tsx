import Link from "next/link";

const SECTIONS = [
  { label: "Stories", href: "/profiles", desc: "People and places of the South" },
  { label: "Places", href: "/places", desc: "Cities and towns across Alabama" },
  { label: "Arts", href: "/arts", desc: "Poetry, music, and theater" },
  { label: "Books", href: "/books", desc: "Literature from and about the South" },
  { label: "Land", href: "/land", desc: "Farming, gardening, and homesteading" },
  { label: "Essays", href: "/essays", desc: "Long-form from Matt Headley" },
  { label: "Theology", href: "/theology", desc: "The shape underneath the work" },
];

interface Props {
  current: string; // href of current section, e.g. "/arts"
  count?: number;  // how many to show (default 4)
}

export default function SectionLinks({ current, count = 4 }: Props) {
  const others = SECTIONS.filter((s) => s.href !== current).slice(0, count);

  return (
    <div className="border-t border-stone-200 dark:border-stone-700 pt-10 mt-16">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-5">Explore Southern Legends</p>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {others.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group border border-stone-200 dark:border-stone-700 rounded-lg p-4 hover:border-amber-500 dark:hover:border-amber-500 transition"
          >
            <p className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 text-sm mb-1">
              {s.label} →
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
