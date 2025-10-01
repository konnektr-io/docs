import { ModeToggle } from "../ui/mode-toggle";
import { LargeSearchToggle } from "fumadocs-ui/components/layout/search-toggle";

export default function HomeHeader() {
  return (
    <header className="flex items-center h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex-1 flex items-center gap-4">
        {/* Konnektr Logo with link to marketing site */}
        <a
          href="https://konnektr.io"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/konnektr.svg" alt="Konnektr" className="h-8 w-8" />
          <span className="font-bold text-lg tracking-tight">Konnektr</span>
        </a>

        {/* Documentation Label */}
        <span className="text-muted-foreground text-sm font-medium">
          Documentation
        </span>
      </div>
      <div className="flex items-center gap-2">
        {/* Search Button */}
        <LargeSearchToggle
          hideIfDisabled
          className="w-full my-auto max-md:hidden max-w-[240px]"
        />
        <ModeToggle />
      </div>
    </header>
  );
}
