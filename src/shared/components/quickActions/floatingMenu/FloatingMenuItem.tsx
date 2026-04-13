type Props = {
  label: string
  delay: number
  onClick: () => void
}

export default function FloatingMenuItem({ label, delay, onClick }: Props) {
  return (
    <button
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}