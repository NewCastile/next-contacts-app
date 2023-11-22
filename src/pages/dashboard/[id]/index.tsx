import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FaMailBulk as MailIcon, FaPhone as PhoneIcon } from "react-icons/fa";
import { useQuery } from "react-query";

import DeleteContactForm from "@/components/forms/delete-contact-form";
import TailwindLink from "@/components/tailwind-link";
import { Contact } from "@/types";

export const getServerSideProps = (async (context) => {
  const { id } = context.query;

  return { props: { id } };
}) satisfies GetServerSideProps<{ id: string | string[] | undefined }>;

const DashboardDetailedPage = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

  const {
    contact: { contact_id, contact_name, contact_email, contact_phone },
  } = data;

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
        <h1 className={"mb-8 text-7xl"}>{contact_name}</h1>
        <div className={"flex w-full flex-row items-center justify-around"}>
          <h2 className={"w-full text-left text-xl text-secondary_active"}>{contact_phone}</h2>
          <PhoneIcon />
        </div>
        <div className={"flex w-full flex-row items-center justify-around"}>
          <h2 className={"w-full text-left text-xl text-secondary_active"}>{contact_email}</h2>
          <MailIcon />
        </div>
        <div className={"flex flex-row items-center justify-around space-x-4 pt-12"}>
          <TailwindLink href={"/dashboard"}>back</TailwindLink>
          <TailwindLink href={`/dashboard/${contact_id}/edit`}>edit</TailwindLink>
          <DeleteContactForm {...{ contact_id }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardDetailedPage;
