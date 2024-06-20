"use client";

import { Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Мои курсы",
    href: "/",
  },
  {
    icon: Compass,
    label: "Все курсы",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Все курсы",
    href: "teacher/courses",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
