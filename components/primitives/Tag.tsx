export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] text-muted border border-border px-2 py-0.5 rounded-sm">
      {children}
    </span>
  )
}
