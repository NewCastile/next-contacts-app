import { FormEvent } from "react";
import { FaSearch as SearchIcon } from "react-icons/fa";

import TailwindLink from "../tailwind-link";

const SearchContactsForm = ({
  onSubmit,
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <div className={"flex w-full flex-row items-center justify-between space-x-4"}>
      <form
        className={
          "flex w-full flex-row items-center justify-between space-x-4 rounded-full bg-secondary_active px-4 py-3"
        }
        onSubmit={onSubmit}
      >
        <input
          className={
            "block w-full rounded-full border-0 bg-secondary_active px-2 py-1 outline-none placeholder:text-secondary_hover focus:outline focus:outline-2 focus:outline-primary active:outline active:outline-2 active:outline-primary"
          }
          id={"search"}
          name={"search"}
          placeholder={"Search a contact..."}
          type={"text"}
        />
        <button
          className={"text-secondary hover:text-secondary_hover active:text-secondary_active"}
          type={"submit"}
        >
          <SearchIcon />
        </button>
      </form>
      <TailwindLink href={"/dashboard/create"}>new</TailwindLink>
    </div>
  );
};

export default SearchContactsForm;
