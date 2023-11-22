import { Contact } from "@/types";

import DeleteContactForm from "./forms/delete-contact-form";
import TailwindLink from "./tailwind-link";
import { arrayIsEmpty } from "./utils/array-is-empty";

const ContactsList = ({ contacts }: { contacts: Array<Contact> }) => {
  return (
    <>
      {!arrayIsEmpty(contacts) && (
        <ul className={"flex w-full flex-col items-center justify-start space-y-4 "}>
          {contacts.map((contact, contactIdx) => {
            const { contact_id, contact_name } = contact;

            return (
              <li key={contactIdx} className={"flex w-full flex-row items-center justify-between"}>
                <span className={"flex flex-row items-center justify-center space-x-4"}>
                  <div className={"h-4 w-4 rounded-full bg-secondary_contrast "} />
                  <p>{contact_name}</p>
                </span>
                <div className={"flex flex-row space-x-4"}>
                  <TailwindLink href={`/dashboard/${contact_id}`}>view</TailwindLink>
                  <TailwindLink href={`/dashboard/${contact_id}/edit`}>edit</TailwindLink>
                  <span>
                    <DeleteContactForm {...{ contact_id }} />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ContactsList;
