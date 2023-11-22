import { FormEvent, useEffect, useState } from "react";

import { arrayIsEmpty } from "@/components/utils/array-is-empty";
import { Contact } from "@/types";

const useSearch = ({ contacts }: { contacts: Array<Contact> }) => {
  const [filteredContacts, setFilteredContacts] = useState<Array<Contact>>(() => contacts);

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get("search")?.toString();

    setFilteredContacts(() => {
      if (arrayIsEmpty(contacts)) {
        return [];
      } else {
        if (search) {
          const newFilteredContacts = contacts.filter((contact) => {
            return contact.contact_name.toLowerCase().includes(search.toLowerCase());
          });

          return newFilteredContacts;
        } else {
          return contacts;
        }
      }
    });
  };

  return { filteredContacts, onSubmit } as const;
};

export default useSearch;
