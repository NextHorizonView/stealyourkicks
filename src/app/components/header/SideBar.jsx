"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,   
    IconUserBolt,
} from "@tabler/icons-react";
import { RiAuctionFill } from "react-icons/ri";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ProductManagement from "@/app/AdminFlow/ProductManagement";
import UserManagement from "@/app/AdminFlow/UserManagement";
import AuctionManagement from "@/app/AdminFlow/AuctionManagement";
import OrderManagement from "@/app/AdminFlow/OrderMangement";

// Product management component
// const ProductsSection = () => {
//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">Products Management</h2>
//             {/* Add Product List, Add Product form, etc */}
//             <p>This is the products management section.</p>
//         </div>
//     );
// };

export function SidebarComp() {
    // Links for the sidebar
    const links = [
        {
            label: "Products",
            href: "#",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            section: "products",  // Add a section key
        },
        {
            label: "Orders",
            href: "#",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            section: "orders",  // Add a section key
        },
        {
            label: "User Management",
            href: "#",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            section: "userManagement",  // Add a section key
        },
        {
            label: "Coupons",
            href: "#",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            section: "coupons",  // Add a section key
        },
        {
            label: "Auction",
            href: "#",
            icon: (
                <RiAuctionFill className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            section: "auction",  // Add a section key
        },
    ];

    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("dashboard");  // State to track the active section

    // Render different sections based on the active section
    const renderContent = () => {
        switch (activeSection) {
            case "products":
                return <ProductManagement/>;  // Render the product section when active
            case "orders":
                return <OrderManagement/>
            case "userManagement":
                return <UserManagement/> 
            case "coupons":
                return <div className="p-6">Coupons Section</div>;
            case "auction":
                return <AuctionManagement/>
            default:
                return <Dashboard />;  // Default content for dashboard
        }
    };

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row  dark:bg-neutral-800 w-full flex-1 max-w-10xl  h-screen"
            )}
        >
            {/* Sidebar with links */}
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={link}
                                    onClick={() => setActiveSection(link.section)}  // Set the active section when clicked
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        {/* <SidebarLink
                            link={{
                                label:"Steal Your kicks",
                                href: "#",
                                icon: (
                                    <Image
                                        src="/Logo.png"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        /> */}
                    </div>
                </SidebarBody>
            </Sidebar>

            {/* Main dashboard content */}
            <div className="flex-grow p-5">{renderContent()}</div>
        </div>
    );
}

// Logo component
export const Logo = () => {
    return (
        <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Steal Your Kicks
            </motion.span>
        </Link>
    );
};

// Icon version of the logo
export const LogoIcon = () => {
    return (
        <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
           <img src="/Logo.png" alt="" />
        </Link>
    );
};

// Dummy dashboard component for default content
const Dashboard = () => {
    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                <div className="flex gap-2">
                    {[...new Array(4)].map((_, i) => (
                        <div
                            key={"first-array" + i}
                            className="h-20 w-full rounded-lg  dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
                <div className="flex gap-2 flex-1">
                    {[...new Array(2)].map((_, i) => (
                        <div
                            key={"second-array" + i}
                            className="h-full w-full rounded-lg  dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
