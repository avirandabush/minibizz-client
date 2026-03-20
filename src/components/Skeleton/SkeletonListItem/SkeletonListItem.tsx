import './SkeletonListItem.css'

export default function SkeletonListItem() {
  return (
    <div className="list-item skeleton">
      <div className="item-right">
        <div className="skeleton-line title" />
        <div className="skeleton-line sub" />
      </div>

      <div className="item-left">
        <div className="skeleton-line small" />
        <div className="skeleton-pill" />
      </div>
    </div>
  )
}