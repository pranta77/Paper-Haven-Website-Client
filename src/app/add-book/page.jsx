import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AddBookForm from "@/components/AddBookForm";

const AddBookPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signIn");
  }

  return (
    <div className="min-h-screen bg-[#F7F4EA] px-4 py-12">
      <AddBookForm />
    </div>
  );
};

export default AddBookPage;