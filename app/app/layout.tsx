import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SidebarProvider className="md:w-full">{children}</SidebarProvider>;
}
