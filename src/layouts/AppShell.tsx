import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Bell, ChevronDown, Command, HelpCircle, Menu, Search, Settings, Sparkles, X } from 'lucide-react'

import { CommandPalette, OPEN_COMMAND_EVENT } from '@/components/CommandPalette'
import { Wordmark } from '@/components/Brand/Wordmark'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { findRouteByPath, groupRoutesBySection } from '@/routes/registry'
import { cn } from '@/utils/cn'

const openCommand = () => window.dispatchEvent(new CustomEvent(OPEN_COMMAND_EVENT))

function NavSections({ onNavigate }: { onNavigate?: () => void }) {
  const sections = groupRoutesBySection()
  return (
    <nav className="flex-1 overflow-y-auto px-3 pb-2">
      {sections.map(({ section, entries }) => {
        if (entries.length === 0) return null
        return (
          <div key={section} className="mt-3 first:mt-1">
            <p className="px-2 pb-1.5 pt-1 eyebrow">{section}</p>
            <ul className="space-y-0.5">
              {entries.map((entry) => (
                <li key={entry.path}>
                  <NavLink
                    to={entry.path}
                    end={entry.end}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        'group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors',
                        isActive ? 'bg-teal/8 text-teal font-medium' : 'text-ink-muted hover:bg-canvas-subtle hover:text-ink',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn(
                            'absolute -left-3 top-1.5 bottom-1.5 w-0.5 rounded-r-full transition-colors',
                            isActive ? 'bg-teal' : 'bg-transparent',
                          )}
                          aria-hidden
                        />
                        <entry.icon
                          className={cn('h-4 w-4 shrink-0', isActive ? 'text-teal' : 'text-ink-subtle group-hover:text-ink-muted')}
                        />
                        <span className="flex-1 truncate">{entry.label}</span>
                        {entry.badge && (
                          <Badge variant={entry.badge.variant ?? 'secondary'} className="ml-1 px-1.5">
                            {entry.badge.text}
                          </Badge>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}

function UserCard() {
  return (
    <div className="border-t border-hairline px-3 py-3">
      <button type="button" className="flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors hover:bg-canvas-subtle">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-teal text-canvas text-xs font-semibold tabular">MD</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">Maya Donnelly</p>
          <p className="truncate text-xs text-ink-subtle">Relocating · Austin, TX</p>
        </div>
        <ChevronDown className="h-4 w-4 text-ink-subtle" />
      </button>
    </div>
  )
}

export function AppShell() {
  const { pathname } = useLocation()
  const current = findRouteByPath(pathname)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-hairline bg-card lg:flex">
        <div className="flex h-16 items-center px-5">
          <Wordmark size="md" />
        </div>
        <Separator />
        <div className="px-5 pb-3 pt-4">
          <p className="eyebrow">Workspace</p>
          <p className="mt-1 text-sm font-medium text-ink">Relocation Intelligence</p>
          <p className="text-xs text-ink-subtle">Austin–Round Rock metro · Demo</p>
        </div>
        <NavSections />
        <UserCard />
      </aside>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-ink/30 backdrop-blur-[2px] animate-fade-in" onClick={() => setMobileNavOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-[280px] flex-col border-r border-hairline bg-card shadow-card-lg animate-fade-in">
            <div className="flex h-16 items-center justify-between px-5">
              <Wordmark size="md" />
              <button type="button" onClick={() => setMobileNavOpen(false)} className="grid h-8 w-8 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink" aria-label="Close menu">
                <X className="h-4 w-4" />
              </button>
            </div>
            <Separator />
            <div className="px-5 pb-3 pt-4">
              <p className="eyebrow">Workspace</p>
              <p className="mt-1 text-sm font-medium text-ink">Relocation Intelligence</p>
              <p className="text-xs text-ink-subtle">Austin–Round Rock metro · Demo</p>
            </div>
            <NavSections onNavigate={() => setMobileNavOpen(false)} />
            <UserCard />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-hairline bg-card/85 px-4 backdrop-blur-md lg:px-6">
          <button type="button" onClick={() => setMobileNavOpen(true)} className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>

          <div className="lg:hidden">
            <Wordmark size="sm" variant="mark" />
          </div>

          <div className="hidden min-w-0 flex-col lg:flex">
            <p className="eyebrow truncate">{current?.eyebrow ?? 'SettleSavvy'}</p>
            <h1 className="truncate text-[15px] font-semibold leading-tight text-ink">
              {current?.label ?? 'Relocation Intelligence'}
            </h1>
          </div>

          <button
            type="button"
            onClick={openCommand}
            className="group ml-auto flex w-full max-w-[420px] items-center gap-2 rounded-md border border-hairline bg-canvas px-3 py-1.5 text-sm text-ink-subtle transition-colors hover:border-hairline-strong"
          >
            <Search className="h-4 w-4" aria-hidden />
            <span className="flex-1 text-left text-ink-faint group-hover:text-ink-subtle">Search neighborhoods, schools, listings…</span>
            <kbd className="hidden items-center gap-0.5 rounded border border-hairline bg-card px-1.5 py-0.5 font-mono text-[10px] text-ink-subtle sm:inline-flex">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>

          <Badge variant="iris" className="hidden xl:inline-flex">
            <Sparkles className="mr-1 h-3 w-3" aria-hidden />
            AI · Demo
          </Badge>

          <div className="flex items-center gap-1">
            <button type="button" className="hidden h-9 w-9 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink sm:grid" aria-label="Help">
              <HelpCircle className="h-4 w-4" />
            </button>
            <button type="button" className="relative grid h-9 w-9 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-signal-warning ring-2 ring-card" />
            </button>
            <button type="button" className="hidden h-9 w-9 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink sm:grid" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-5 py-6 lg:px-10 lg:py-8">
          <Outlet />
        </main>
      </div>

      <CommandPalette />
    </div>
  )
}
