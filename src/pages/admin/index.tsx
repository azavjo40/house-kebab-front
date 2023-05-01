import { withAuth } from "@/components/middleware-auth/withAuth";

function Home() {
  return (
    <div className="w-full h-full">
      <h1 className="text-red-500">hello admin</h1>
    </div>
  );
}

export default withAuth(Home);
