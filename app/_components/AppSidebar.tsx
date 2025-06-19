import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
} from "@/components/ui/sidebar"
import { Calendar, Inbox, Layers3, UserRoundIcon, WalletIcon } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import logo from '@/public/logo.png'
const items = [
    {
        title: "AI Tools",
        url: "/dashboard",
        icon: Inbox,
    },
    {
        title: "My History",
        url: "/history",
        icon: Calendar,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: WalletIcon,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: UserRoundIcon,
    },
]

export function AppSidebar() {
    const path = usePathname();
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center group transition-all duration-300 hover:bg-sky-50/80 rounded-2xl p-1 pr-4 cursor-pointer">
  <div className="relative flex-shrink-0">
    <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <Image 
      src={logo} 
      alt="AI Career Hub Logo"
      className="relative w-12 h-12 sm:w-14 sm:h-14 p-2 z-10 transition-transform duration-300 group-hover:scale-110"
    />
  </div>
  
  <div className="ml-2 overflow-hidden">
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
      <span className="block transition-transform duration-500 group-hover:-translate-y-6 ">
        AI Career Hub
      </span>
      <span className="block text-lg text-sky-400 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-[-2.0rem]">
        APVS 
      </span>
    </h2>
  </div>
</div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            {items.map((item, index) => (
                               
                                <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg ${path.includes(item.url) && 'bg-gray-200ß'}`}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>
                              
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
        </Sidebar>
    )
}