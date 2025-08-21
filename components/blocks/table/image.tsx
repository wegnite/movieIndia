import Image from "next/image";

export default function TableItemImage({
  value,
  options,
  className,
}: {
  value: string;
  options?: any;
  className?: string;
}) {
  return (
    <div className={`relative w-10 h-10 rounded-full overflow-hidden ${className}`}>
      <Image
        src={value || "/images/placeholder.jpg"}
        alt="表格图片"
        fill
        className="object-cover"
        sizes="40px"
      />
    </div>
  );
}
