import Link from "next/link";

const RouteCard = ({ route }: { route: string }) => {
  return (
    <div className={"rounded-md border-2 border-gray-600 px-20 py-10"}>
      <span>
        <Link className={"hover:underline"} href={route}>
          {route}
        </Link>
      </span>
    </div>
  );
};

export default RouteCard;
