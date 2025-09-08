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
                  <div>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </div>
                );
                return (
                  <SidebarMenuItem
                    key={item.id}
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
                      {item.action && sidebarMenuItemComponent}
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
                {accountRegularMenuItems.map((item) => {
                  const regularMenuItemComponent = (
                    <div
                      className="w-full rounded-sm p-2 text-left transition-colors
                      focus:bg-accent focus:text-accent-foreground focus:outline-none
                      hover:bg-accent hover:text-accent-foreground
                      cursor-pointer
                      block"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </div>
                  );
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      asChild
                      onSelect={() => {
                        if (item.action) {
                          item.action();
                        }
                      }}
                    >
                      {item.internalUrl && (
                        <Link href={item.internalUrl}>
                          {regularMenuItemComponent}
                        </Link>
                      )}
                      {item.externalUrl && (
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {regularMenuItemComponent}
                        </a>
                      )}
                      {item.action && regularMenuItemComponent}
                    </DropdownMenuItem>
                  );
                })}
                <div className="my-2 mx-2 h-px bg-border" />
                {accountDestructiveMenuItems.map((item) => {
                  const destructiveMenuItemComponent = (
                    <div
                      className="w-full rounded-sm p-2 text-left transition-colors
                      focus:bg-destructive focus:text-destructive-foreground focus:outline-none
                      hover:bg-destructive hover:text-destructive-foreground
                      cursor-pointer"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </div>
                  );
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      asChild
                      onSelect={() => {
                        if (item.action) {
                          item.action();
                        }
                      }}
                    >
                      {item.internalUrl && (
                        <Link href={item.internalUrl}>
                          {destructiveMenuItemComponent}
                        </Link>
                      )}
                      {item.externalUrl && (
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {destructiveMenuItemComponent}
                        </a>
                      )}
                      {item.action && destructiveMenuItemComponent}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
