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
import { useTranslations } from "next-intl";
import Link from "next/link";
import { AppSidebarViewProps } from "./models/app-sidebar-view-props";

export function AppSidebarView({
  sidebarMenuItems,
  accountRegularMenuItems,
  accountDestructiveMenuItems,
  formattedAnnualPassExpirationDate,
}: AppSidebarViewProps) {
  const componentTranslations = useTranslations("AppSidebar");
  return (
    <Sidebar>
      <SidebarContent className="pt-8">
        <SidebarGroup>
          {formattedAnnualPassExpirationDate && (
            <SidebarGroupLabel className="mb-3 text-center font-bold text-primary">
              <div>
                {componentTranslations("annualPassExpirationInfo", {
                  formattedDate: formattedAnnualPassExpirationDate,
                })}
              </div>
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenuItems.map((item) => {
                const sidebarMenuItemComponent = (
                  <div className="flex items-center gap-2 cursor-pointer text-start justify-start">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span className="select-none">{item.title}</span>
                  </div>
                );
                return (
                  <SidebarMenuItem
                    key={item.id}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      }
                    }}
                  >
                    <SidebarMenuButton asChild>
                      {(() => {
                        if (item.internalUrl) {
                          return (
                            <Link
                              className="focus:outline-none"
                              href={item.internalUrl}
                            >
                              {sidebarMenuItemComponent}
                            </Link>
                          );
                        } else if (item.externalUrl) {
                          return (
                            <a
                              className="focus:outline-none"
                              href={item.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {sidebarMenuItemComponent}
                            </a>
                          );
                        } else if (item.action) {
                          return sidebarMenuItemComponent;
                        }
                        return null;
                      })()}
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
                <SidebarMenuButton className="select-none shadow-[0_0_0_1px_hsl(var(--sidebar-border))] cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <User2 className="w-4 h-4" />{" "}
                  {componentTranslations("yourAccountButton")}
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
                  overflow-y-auto max-h-60
                "
              >
                {accountRegularMenuItems.map((item) => {
                  const regularMenuItemComponent = (
                    <div
                      className="flex items-center gap-2 w-full rounded-sm p-2 text-left transition-colors
                      focus:bg-accent focus:text-accent-foreground focus:outline-none
                      hover:bg-accent hover:text-accent-foreground
                      cursor-pointer select-none"
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.title}</span>
                    </div>
                  );
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      asChild
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        }
                      }}
                    >
                      {(() => {
                        if (item.internalUrl) {
                          return (
                            <Link
                              className="focus:outline-none"
                              href={item.internalUrl}
                            >
                              {regularMenuItemComponent}
                            </Link>
                          );
                        } else if (item.externalUrl) {
                          return (
                            <a
                              className="focus:outline-none"
                              href={item.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {regularMenuItemComponent}
                            </a>
                          );
                        } else if (item.action) {
                          return regularMenuItemComponent;
                        }
                        return null;
                      })()}
                    </DropdownMenuItem>
                  );
                })}
                <div className="my-2 mx-2 h-px bg-border" />
                {accountDestructiveMenuItems.map((item) => {
                  const destructiveMenuItemComponent = (
                    <div
                      className="flex items-center gap-2 w-full rounded-sm p-2 text-left transition-colors
                      focus:bg-destructive focus:text-destructive-foreground focus:outline-none
                      hover:bg-destructive hover:text-destructive-foreground select-none
                      cursor-pointer"
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.title}</span>
                    </div>
                  );
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      asChild
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        }
                      }}
                    >
                      {(() => {
                        if (item.internalUrl) {
                          return (
                            <Link
                              className="focus:outline-none"
                              href={item.internalUrl}
                            >
                              {destructiveMenuItemComponent}
                            </Link>
                          );
                        } else if (item.externalUrl) {
                          return (
                            <a
                              className="focus:outline-none"
                              href={item.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {destructiveMenuItemComponent}
                            </a>
                          );
                        } else if (item.action) {
                          return destructiveMenuItemComponent;
                        }
                        return null;
                      })()}
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
