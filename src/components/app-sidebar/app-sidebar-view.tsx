"use client";

import { ChevronUp, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { AppSidebarViewProps } from "./models/app-sidebar-view-props";

export function AppSidebarView({
  sidebarMenuItems,
  accountRegularMenuItems,
  accountDestructiveMenuItems,
}: AppSidebarViewProps) {
  const handleItemClick = (item: string) => {
    console.log(`Clicked on ${item}`);
  };

  return (
    <Sidebar>
      <SidebarContent className="pt-8">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 text-center font-bold text-primary">
            <div>Your 1-Year Pass expires on the 1st June 2026</div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenuItems.map((item) => {
                const sidebarMenuItemComponent = (
                  <>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </>
                );
                return (
                  <SidebarMenuItem
                    key={item.title}
                    onSelect={() => {
                      if (item.action) {
                        item.action();
                      }
                    }}
                  >
                    <SidebarMenuButton asChild>
                      {item.internalUrl && (
                        <Link href={item.internalUrl}>
                          {sidebarMenuItemComponent}
                        </Link>
                      )}
                      {item.externalUrl && (
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {sidebarMenuItemComponent}
                        </a>
                      )}
                      {item.action && (
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {sidebarMenuItemComponent}
                        </a>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="shadow-[0_0_0_1px_hsl(var(--sidebar-border))] cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <User2 /> Your account
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                sideOffset={10}
                className="
                  w-[var(--radix-dropdown-menu-trigger-width)]
                  rounded-sm border border-border bg-card p-1
                  text-sm text-card-foreground shadow-md
                  animate-in fade-in-0 zoom-in-95
                  data-[state=closed]:animate-out
                  data-[state=closed]:fade-out-0
                  data-[state=closed]:zoom-out-95
                "
              >
                <DropdownMenuItem
                  asChild
                  onSelect={() => {
                    handleItemClick("Account");
                  }}
                >
                  <Link
                    href="/account"
                    className="
                      w-full rounded-sm p-2 text-left transition-colors
                      focus:bg-accent focus:text-accent-foreground focus:outline-none
                      hover:bg-accent hover:text-accent-foreground
                      cursor-pointer
                      block
                    "
                  >
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  onSelect={() => {
                    handleItemClick("Billing");
                  }}
                >
                  <button
                    className="
                      w-full rounded-sm p-2 text-left transition-colors
                      focus:bg-accent focus:text-accent-foreground focus:outline-none
                      hover:bg-accent hover:text-accent-foreground
                      cursor-pointer
                    "
                  >
                    <span>Billing</span>
                  </button>
                </DropdownMenuItem>
                <div className="my-1 h-px bg-border" />
                <DropdownMenuItem
                  asChild
                  onSelect={() => {
                    handleItemClick("Sign out");
                  }}
                >
                  <button
                    className="
                      w-full rounded-sm p-2 text-left transition-colors
                      focus:bg-destructive focus:text-destructive-foreground focus:outline-none
                      hover:bg-destructive hover:text-destructive-foreground
                      cursor-pointer
                    "
                  >
                    <span>Sign out</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
