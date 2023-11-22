import { FormEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";

import { BodyParseSchema } from "@/constants/contact-form-schema";
import { Contact } from "@/types";

import TailwindButton from "../tailwind-button";
import TailwindInput from "../tailwind-input";

interface MutationFnArgs {
  contact_name: Contact["contact_name"];
  contact_email: Contact["contact_email"];
  contact_phone: Contact["contact_phone"];
}

const ContactForm = ({
  contact,
  action = "POST",
}: {
  contact?: Contact;
  action?: "POST" | "PUT";
}) => {
  const requestURL =
    action === "PUT" && contact
      ? `http://localhost:3000/api/contacts/${contact.contact_id}/update`
      : "http://localhost:3000/api/contacts/create";

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ body }: { body: MutationFnArgs }): Promise<{ message: string }> => {
      BodyParseSchema.parse({ ...body });

      const res = await fetch(requestURL, {
        method: action,
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const [contact_name, contact_phone, contact_email] = Array.from(formData.values()).map(
      (entryValue) => entryValue.toString(),
    );

    const postRequestBody = { contact_name, contact_phone, contact_email };

    mutation.mutate({ body: postRequestBody });
  };

  return (
    <div className={"flex flex-col items-center justify-center"}>
      <form
        action={"POST"}
        className={"flex flex-col items-center justify-center space-y-5"}
        onSubmit={onSubmit}
      >
        <div className={"flex flex-col items-start justify-center space-y-4"}>
          <label className={"border-b-2 border-secondary_contrast"} htmlFor={"contact_name"}>
            Name
          </label>
          <TailwindInput
            required
            defaultValue={contact?.contact_name ?? ""}
            id={"contact_name"}
            name={"contact_name"}
            type={"text"}
          />
        </div>
        <div className={"flex flex-col items-start justify-center space-y-4"}>
          <label className={"border-b-2 border-secondary_contrast"} htmlFor={"contact_phone"}>
            Phone Number
          </label>
          <TailwindInput
            required
            defaultValue={contact?.contact_phone ?? ""}
            id={"contact_phone"}
            name={"contact_phone"}
            type={"text"}
          />
        </div>
        <div className={"flex flex-col items-start justify-center space-y-4"}>
          <label className={"border-b-2 border-secondary_contrast"} htmlFor={"contact_email"}>
            Email
          </label>
          <TailwindInput
            required
            defaultValue={contact?.contact_email ?? ""}
            id={"contact_email"}
            name={"contact_email"}
            type={"email"}
          />
        </div>
        <div className={"flex w-full flex-row justify-end"}>
          <TailwindButton type={"submit"}>confirm</TailwindButton>
        </div>
      </form>
      {mutation.isError && (
        <div className={"w-full text-red-300"}>
          {mutation.error instanceof ZodError ? (
            <>
              {mutation.error.issues.map((issue: { message: string }, issueIdx: number) => {
                return <div key={issueIdx}>{issue.message}</div>;
              })}
            </>
          ) : mutation.error instanceof Error ? (
            <>{mutation.error.message}</>
          ) : (
            <>
              Error while
              {action === "POST" && "creating new contact"}
              {action === "PUT" && "updating contact"}
            </>
          )}
        </div>
      )}
      {mutation.isLoading && (
        <div className={"text-orange-300"}>
          {action === "POST" ? "Creating new contact..." : "Updating contact..."}
        </div>
      )}
      {mutation.isSuccess && (
        <div className={"text-green-400"}>
          {action === "POST" ? "Created new contact!" : "Contact updated!"}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
