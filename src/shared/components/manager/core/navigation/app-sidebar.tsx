"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../ui/sidebar"
import { SidebarBrand } from "./SidebarBrand"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { useAuth } from "@/modules/auth/hooks"
import { User } from "@/modules/auth/types";
import { MANAGER_NAVIGATION_ITEMS } from "../../constants/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  // Create user data for NavUser component
  const userData = {
    fullName: user?.fullName || "Manager",
    email: user?.email || "manager@pascs.com",
    avatar: user?.avatar || "/avatars/manager.jpg",
  } satisfies Omit<User, 'id' | 'username' | 'role' | 'isActive' | 'createdAt' | 'updatedAt' | 'phone' | 'name'>;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={MANAGER_NAVIGATION_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
