import './BaseListItem.css'

type Props = {
    children: React.ReactNode
    onClick?: () => void
}

export default function BaseListItem({ children, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            className="list-item"
        >
            {children}
        </div>
    )
}