import { useRouter } from "next/router";
import { FormEvent } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Contact } from "@/types";

import TailwindButton from "../tailwind-button";

const DeleteContactForm = ({ contact_id }: { contact_id: Contact["contact_id"] }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id }: { id?: string }) => {
      const res = await fetch(`http://localhost:3000/api/contacts/${id}/delete`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: () => {
      router.push("/dashboard");
      queryClient.invalidateQueries(["contacts"]);
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const id = formData.get("contact_id")?.toString();

    mutation.mutate({ id });
  };

  return (
    <form action={"DELETE"} onSubmit={onSubmit}>
      <input id={"contact_id"} name={"contact_id"} type={"hidden"} value={contact_id} />
      <TailwindButton type={"submit"}>delete</TailwindButton>
    </form>
  );
};

export default DeleteContactForm;
