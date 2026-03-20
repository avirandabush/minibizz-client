
import { useNavigate } from 'react-router-dom'
import './DetailsLayout.css'

type Props = {
  title: string
  children: React.ReactNode
  leftAction?: React.ReactNode
}

export default function DetailsLayout({ title, children, leftAction }: Props) {
  const navigate = useNavigate()

  return (
    <div className="details-page">
      
      {/* Header */}
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>

        <h2 className="details-title">{title}</h2>

        <div className="header-action">
          {leftAction}
        </div>
      </div>

      {/* Content */}
      <div className="details-content">
        {children}
      </div>
    </div>
  )
}