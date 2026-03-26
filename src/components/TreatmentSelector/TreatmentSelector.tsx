import './TreatmentSelector.css'

type Treatment = {
  id: string
  name: string
  price: number
}

type Selection = {
  treatmentId: string
  quantity: number
}

type Props = {
  treatments: Treatment[]
  selected: Selection[]
  onChange: (selected: Selection[]) => void
}

export default function TreatmentSelector({
  treatments,
  selected,
  onChange,
}: Props) {

  const getQuantity = (id: string) => {
    return selected.find(s => s.treatmentId === id)?.quantity || 0
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      onChange(selected.filter(s => s.treatmentId !== id))
      return
    }

    const exists = selected.find(s => s.treatmentId === id)

    if (exists) {
      onChange(
        selected.map(s =>
          s.treatmentId === id ? { ...s, quantity } : s
        )
      )
    } else {
      onChange([...selected, { treatmentId: id, quantity }])
    }
  }

  return (
    <div className="treatment-grid">
      {treatments.map(t => {
        const quantity = getQuantity(t.id)
        const isSelected = quantity > 0

        return (
          <div
            key={t.id}
            className={`treatment-card ${isSelected ? 'selected' : ''}`}
          >
            {/* שורה 1 - שם */}
            <div className="treatment-name">{t.name}</div>

            {/* שורה 2 */}
            <div className="treatment-bottom">
              {/* מחיר */}
              <div className="price">₪{t.price}</div>

              {/* כמות */}
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => updateQuantity(t.id, quantity - 1)}
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() => updateQuantity(t.id, quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}