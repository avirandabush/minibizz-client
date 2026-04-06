import './ListToolbarMenu.css'

type MenuProps = {
  options: string[]
  onSelect: (option: string) => void
  isOpen: boolean
  onClose: () => void
}

export default function Menu({ options, onSelect, isOpen, onClose }: MenuProps) {
  if (!isOpen) return null

  return (
    <div className="menu">
      {options.map(opt => (
        <div
          key={opt}
          onClick={() => {
            onSelect(opt)
            onClose()
          }}
        >
          {opt}
        </div>
      ))}
    </div>
  )
}