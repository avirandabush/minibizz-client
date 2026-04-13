import FloatingMenuItem from "./FloatingMenuItem"
import type { FabAction } from "../fab/FAB"

type Props = {
  open: boolean
  actions: FabAction[]
  onActionClick: (path: string) => void
}


export default function FloatingMenu({ open, actions, onActionClick }: Props) {
  return (
    <div className={`fab-menu ${open ? 'open' : ''}`}>
      {actions.map((action, i) => {
        const delayIndex = actions.length - 1 - i

        return (
          <FloatingMenuItem
            key={action.label}
            label={action.label}
            delay={delayIndex * 60}
            onClick={() => onActionClick(action.path)}
          />
        )
      })}
    </div>
  )
}