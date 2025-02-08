"use client"

import * as React from "react"
import {
  Home,
  Folder,
  CheckSquare,
  Calendar,
  BarChart,
  Settings,
  LogOut,
  Star,
  Clock,
  User,
  Target,
  Flag,
  ClipboardList,
} from "lucide-react";

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavWorkspaces } from "@/components/nav-workspaces"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


const data = {
  teams: 
    {
      name: "Personal Task Manager",
      logo: BarChart,
      plan: "Personal",
    },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Projects",
      url: "projects",
      icon: Folder, 
    },
    {
      title: "Tasks",
      url: "tasks",
      icon: CheckSquare, 
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar, 
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart, 
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings, 
    },
    {
      title: "Logout",
      url: "#",
      icon: LogOut, 
    },
  ],
  favorites: [
    {
      name: "Important Tasks",
      url: "#",
      icon: Star, 
    },
    {
      name: "Upcoming Deadlines",
      url: "#",
      icon: Clock, 
    },
  ],
  workspaces: [
    {
      name: "Personal",
      icon: User, 
      pages: [
        {
          name: "Daily Tasks",
          url: "#",
          icon: ClipboardList,
        },
        {
          name: "Weekly Goals",
          url: "#",
          icon: Target, 
        },
      ],
    },
    {
      name: "Work",
      icon: Flag, 
      pages: [
        {
          name: "Project Milestones",
          url: "#",
          icon: Flag, 
        },
        {
          name: "Meetings",
          url: "#",
          icon: Calendar, 
        },
      ],
    },
  ],
};

export function SidebarLeft({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0 " {...props}>
      <SidebarHeader className="">
        <TeamSwitcher team={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent className="overflow-y-hidden">
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} className="mx-auto p-4"/>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

