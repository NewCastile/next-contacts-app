import ContactForm from "@/components/forms/contact-form";
import TailwindLink from "@/components/tailwind-link";

const DashboardCreatePage = () => {
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
        <ContactForm />
      </div>
    </div>
  );
};

export default DashboardCreatePage;
