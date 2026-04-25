import Image from "next/image";

interface InlineImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function InlineImage({ src, alt, caption }: InlineImageProps) {
  return (
    <div className="not-prose my-8 mx-auto" style={{ maxWidth: "400px" }}>
      <Image
        src={src}
        alt={alt}
        width={400}
        height={533}
        className="w-full rounded-lg object-cover"
      />
      {caption && (
        <p className="mt-2 text-xs text-center italic text-ll-text-light">{caption}</p>
      )}
    </div>
  );
}
