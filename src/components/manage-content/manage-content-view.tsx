"use client";

import logOutUserAction from "@/server-actions/auth/log-out-user-action";
import { Button } from "../ui/button";

export default function ManageContentView() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      DASHBOARD
      <Button onClick={() => logOutUserAction({ afterLogoutRedirect: "/" })}>
        Log out
      </Button>
    </div>
  );
}
