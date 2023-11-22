import { ButtonHTMLAttributes } from "react";

const TailwindButton = ({
  children,
  type,
}: {
  children: React.ReactNode | Array<React.ReactNode>;
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}) => {
  return (
    <button
      className={
        "rounded-md bg-secondary px-3 py-2 capitalize hover:bg-secondary_hover active:bg-secondary_active"
      }
      type={type ?? "submit"}
    >
      {children}
    </button>
  );
};

export default TailwindButton;
