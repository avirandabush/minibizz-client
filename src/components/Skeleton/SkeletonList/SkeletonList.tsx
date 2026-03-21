import SkeletonListItem from '../SkeletonListItem/SkeletonListItem'

type Props = {
    count?: number
}

export default function SkeletonList({ count = 5 }: Props) {
    return (
        <div className="list-container">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonListItem key={i} />
            ))}
        </div>
    )
}