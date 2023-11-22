import Link from "next/link";

const TailwindLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode | React.ReactNode;
}) => {
  return (
    <span className={"border-b-2 border-b-secondary_contrast px-3 py-2 capitalize"}>
      <Link href={href}>{children}</Link>
    </span>
  );
};

export default TailwindLink;
