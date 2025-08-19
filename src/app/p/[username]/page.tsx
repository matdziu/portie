import UserPageServerWrapper from "@/components/user-page/user-page-server-wrapper";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return <UserPageServerWrapper username={username} />;
}
