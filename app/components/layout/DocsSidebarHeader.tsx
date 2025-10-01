import { SidebarHeader } from "../ui/sidebar";

export default function DocsSidebarHeader() {
  return (
    <SidebarHeader className="border-b border-border px-4 flex justify-center h-16">
      <div className="flex items-center gap-2">
        <a
          href="https://konnektr.io"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <img src="/konnektr.svg" alt="Konnektr" className="h-6 w-6" />
        </a>
        <span className="font-bold text-base tracking-tight">
          Documentation
        </span>
      </div>
    </SidebarHeader>
  );
}
