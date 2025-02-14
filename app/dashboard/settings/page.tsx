"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import ChangePasswordModal from "@/components/ChangePasswordModal";

import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/cms/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from "@/public/logo/logo.png";
import profile from "@/public/galelio.jpg";
import { useRouter } from "next/navigation"; // Importing useRouter

export default function Page() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/unauthorized");
    } else {
      setUser(JSON.parse(user));
    }
  }, []);

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "logout",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-screen border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen w-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      {user && (
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between h-full gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Muneeb",
                  href: "#",
                  icon: (
                    <Image
                      src={profile}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      )}
      {user && <Settings />}
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex flex-col space-x-2 items-start text-sm text-black py-1 relative z-20"
    >
      <Image src={logo} alt="capco" width={50} className="w-fit object-fit" />
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src={logo} alt="capco" width={50} className="w-fit object-fit" />
    </Link>
  );
};

const Settings = () => {
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [newpassword,setNewPassword] = useState("");
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account settings and set preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-medium">Security</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Update your password and manage your account security.
          </p>
          <Button onClick={() => setIsChangePasswordModalOpen(true)}>
            Change Password
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
};
