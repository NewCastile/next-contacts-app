import { HTMLAttributes, InputHTMLAttributes } from "react";

const TailwindInput = ({
  defaultValue,
  type,
  name,
  id,
  required,
}: {
  defaultValue: HTMLAttributes<HTMLInputElement>["defaultValue"];
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  name: InputHTMLAttributes<HTMLInputElement>["name"];
  id: InputHTMLAttributes<HTMLInputElement>["id"];
  required: InputHTMLAttributes<HTMLInputElement>["required"];
}) => {
  return (
    <input
      className={
        "block w-full rounded-full border-0 bg-secondary_active px-2 py-1 placeholder:text-secondary_hover focus:ring-2 focus:ring-inset focus:ring-secondary_active active:ring-2 active:ring-inset active:ring-secondary_active"
      }
      defaultValue={defaultValue ?? ""}
      id={id}
      name={name}
      placeholder={"Search a contact..."}
      required={required}
      type={type ?? "text"}
    />
  );
};

export default TailwindInput;
