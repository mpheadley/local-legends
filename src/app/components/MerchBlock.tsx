import Image from "next/image";

interface MerchBlockProps {
  href: string;
  frontImage: string;
  backImage: string;
  title: string;
  description: string;
}

export default function MerchBlock({ href, frontImage, backImage, title, description }: MerchBlockProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block my-10 border border-ll-border rounded-sm overflow-hidden no-underline hover:border-ll-text transition-colors"
    >
      <div className="flex">
        <div className="relative w-1/2 aspect-[3/4]">
          <Image src={frontImage} alt={`${title} — front`} fill className="object-cover" />
        </div>
        <div className="relative w-1/2 aspect-[3/4]">
          <Image src={backImage} alt={`${title} — back`} fill className="object-cover" />
        </div>
      </div>
      <div className="px-4 py-3 border-t border-ll-border">
        <p className="text-sm font-medium text-ll-text">{title}</p>
        <p className="text-xs text-ll-muted mt-0.5">{description}</p>
      </div>
    </a>
  );
}
