import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useQuery } from "react-query";

import ContactForm from "@/components/forms/contact-form";
import TailwindLink from "@/components/tailwind-link";
import { Contact } from "@/types";

export const getServerSideProps = (async (context) => {
  const { id } = context.query;

  return { props: { id } };
}) satisfies GetServerSideProps<{ id: string | string[] | undefined }>;

const DashboardEditPage = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["contacts", id],
    queryFn: async (): Promise<{ contact: Contact }> => {
      if (!id || Array.isArray(id)) throw new Error("No contact with this id was found.");
      const res = await fetch(`http://localhost:3000/api/contacts/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading contact information...</div>;
  if (error)
    return (
      <div className={"flex flex-col items-start justify-center space-y-4"}>
        <span>Something wrong happened while getting the contact information :c</span>
        <button onClick={() => refetch()}>Try again</button>
        <span>Or</span>
        <TailwindLink href={"/dashboard"}>go to dashboard</TailwindLink>
      </div>
    );
  if (!data) return <div>No data available for this contact :c</div>;

  const { contact } = data;

  return (
    <div
      className={
        "relative flex flex-col items-center justify-center rounded-lg border-2 border-secondary_contrast p-28"
      }
    >
      <div className={"absolute left-4 top-4"}>
        <TailwindLink href={"/dashboard"}>go to dashboard</TailwindLink>
      </div>
      <div className={"flex flex-col items-center justify-center space-y-2"}>
        <ContactForm {...{ action: "PUT", contact }} />
      </div>
    </div>
  );
};

export default DashboardEditPage;
