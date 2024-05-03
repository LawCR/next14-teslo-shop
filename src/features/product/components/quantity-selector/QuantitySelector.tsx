
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number,
  className?: string
  setQuantity: (value: number) => void
  stock: number
  disabled?: boolean
}

export const QuantitySelector = ({ quantity, className = "gap-3", setQuantity, stock, disabled = false }: Props) => {

  const onQuantityChange = (value: number) => {
    if (quantity + value < 1) return
    if (quantity + value > stock) return
    
    setQuantity(quantity + value)
  }

  return (
    <div className={`flex flex-col ${className} `}>
      <h3 className="font-semibold text-sm text-textSecondary dark:text-dtextSecondary  uppercase">Cantidad</h3>
      <div className="flex items-center">
        <button className='text-disabled' onClick={() => onQuantityChange(-1)} disabled={disabled || quantity === 1}>
          <IoRemoveCircleOutline size={24} />
        </button>
        <span className="mx-3 w-20 px-5 py-1 rounded bg-gray-100 dark:bg-dhoverLink text-center">{quantity}</span>
        <button className='text-disabled' onClick={() => onQuantityChange(1)} disabled={disabled || quantity >= stock}>
          <IoAddCircleOutline size={24} />
        </button>
      </div>
    </div>
  )
}
