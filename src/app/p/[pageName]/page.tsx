import UserPageServerWrapper from "@/components/user-page/user-page-server-wrapper";

export default async function UserPage({
  params,
}: {
  params: Promise<{ pageName: string }>;
}) {
  const { pageName } = await params;
  return <UserPageServerWrapper pageName={pageName} />;
}
