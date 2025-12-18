import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
          <img src="/konnektr.svg" alt="Konnektr Logo" className="h-7 w-7" />
          <span className="hidden sm:inline">Konnektr Docs</span>
        </div>
      ),
    },
    githubUrl: "https://github.com/konnektr-io",
  };
}
