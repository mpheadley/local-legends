import Image from "next/image";

interface TestimonialBlockProps {
  quote: string;
  name: string;
  role?: string;
  photo?: string;
}

export default function TestimonialBlock({ quote, name, role, photo }: TestimonialBlockProps) {
  return (
    <aside className="my-10 rounded-xl bg-ll-warm border border-ll-accent/20 p-6 flex gap-5 items-start">
      {photo && (
        <div className="flex-shrink-0">
          <Image
            src={photo}
            alt={name}
            width={64}
            height={64}
            className="rounded-full object-cover border-2 border-ll-accent/30"
          />
        </div>
      )}
      <div>
        <p className="text-ll-dark italic leading-relaxed mb-3 text-base">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="text-sm font-bold text-ll-dark not-italic">{name}</p>
        {role && <p className="text-xs text-ll-text/60 mt-0.5">{role}</p>}
      </div>
    </aside>
  );
}
