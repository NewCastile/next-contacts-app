import { useQuery } from "react-query";

import DashboardScreen from "@/components/screens/dashboard-screen";
import TailwindLink from "@/components/tailwind-link";
import { Contact } from "@/types";

const DashboardPage = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["contacts"],
    queryFn: async (): Promise<{ contacts: Array<Contact> }> => {
      const res = await fetch("http://localhost:3000/api/contacts");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    },
  });

  if (isLoading) return <div>Loading contacts ...</div>;

  if (error)
    return (
      <div className={"flex flex-col items-start justify-center space-y-4"}>
        <span>Something wrong happened while fetching contacts :c</span>
        <button onClick={() => refetch()}>Please try again</button>
        <span>Or</span>
        <TailwindLink href={"/dashboard"}>go to dashboard</TailwindLink>
      </div>
    );

  if (!data) return <div>No data available</div>;

  return <DashboardScreen {...{ contacts: data.contacts }} />;
};

export default DashboardPage;
