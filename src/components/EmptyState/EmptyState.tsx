type Props = {
  title?: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({
  title = 'אין נתונים להצגה',
  subtitle,
  actionLabel,
  onAction,
}: Props) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📭</div>

      <h3>{title}</h3>

      {subtitle && <p>{subtitle}</p>}

      {actionLabel && onAction && (
        <button onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  )
}