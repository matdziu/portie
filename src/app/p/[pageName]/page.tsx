import UserPageServerWrapper from "@/components/user-page/user-page-server-wrapper";
import pageHasAnnualPassUseCase from "@/domain/payments/use-cases/page-has-annual-pass-use-case";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ pageName: string }>;
}) {
  const { pageName } = await params;
  const { hasAnnualPass } = await pageHasAnnualPassUseCase({
    pageName: pageName,
  });
  if (!hasAnnualPass) notFound();
  return <UserPageServerWrapper pageName={pageName} />;
}
