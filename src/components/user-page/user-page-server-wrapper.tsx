import "server-only";
import { UserPageServerWrapperProps } from "./models/user-page-server-wrapper-props";
import UserPageViewController from "./user-page-view-controller";

export default function UserPageServerWrapper({
  pageName,
}: UserPageServerWrapperProps) {
  return <UserPageViewController />;
}
