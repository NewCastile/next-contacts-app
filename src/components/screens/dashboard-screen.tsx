import useSearch from "@/hooks/useSearch";
import { Contact } from "@/types";

import ContactsList from "../contacts-list";
import SearchContactsForm from "../forms/search-contact-form";

const DashboardScreen = ({ contacts }: { contacts: Array<Contact> }) => {
  const { filteredContacts, onSubmit } = useSearch({ contacts });

  return (
    <>
      <SearchContactsForm {...{ onSubmit }} />
      <ContactsList {...{ contacts: filteredContacts }} />
    </>
  );
};

export default DashboardScreen;
