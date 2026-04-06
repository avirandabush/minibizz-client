import './DetailsRow.css'

type Props = {
  label: string
  value: React.ReactNode
}

export default function DetailsRow({ label, value }: Props) {
  return (
    <div className="details-row">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  )
}