import { getName } from "@/app/actions";
import Featured from "@/components/Featured";
import TopArticles from "@/components/TopArticles";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  return (
    <div className="pt-5 pb-10 flex flex-col gap-10">
      <Featured />
      <TopArticles />
    </div>
  );
}
