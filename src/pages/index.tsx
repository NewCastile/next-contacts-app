import { Inter } from "next/font/google";

import RouteCard from "@/components/route-card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex h-full flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className={"flex h-screen w-full flex-col items-center justify-center space-y-4"}>
        <div className={"flex flex-col items-center justify-center space-y-4"}>
          <h1>Welcome to the interview app</h1>
          <p>To get started click on one of the following routes c:</p>
        </div>
        <div className={"flex flex-row items-center justify-center space-x-8"}>
          <RouteCard route={"/dashboard"} />
          <RouteCard route={"/dashboard/create"} />
        </div>
      </div>
    </main>
  );
}
