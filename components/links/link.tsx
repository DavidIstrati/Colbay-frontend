import Link from "next/link";

export default function CustomLink({
  href,
  content,
}: {
  href: string;
  content: string;
}): JSX.Element {
  return (
    <Link href={href}>
      <span className="text-blue-500">{content}</span>
    </Link>
  );
}
