export function Section({
  children,
  id,
  className,
}: {
  children: React.ReactNode
  id?: string
  className?: string
}) {
  return (
    <section id={id} className={`py-14 ${className ?? ''}`}>
      {children}
    </section>
  )
}
