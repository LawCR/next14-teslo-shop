'use client'
import clsx from "clsx"
import type { Size } from "../../interfaces"

interface Props {
  selectedSize: Size | null
  availableSizes: Size[]
  onSizeChange: (size: Size) => void
}

export const SizeSelector = ({ availableSizes, selectedSize, onSizeChange }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-semibold text-sm text-textSecondary dark:text-dtextSecondary mb-3 uppercase">Tallas disponibles</h3>

      <div className="flex">
        {
          availableSizes.map(size => (
            <button
              key={size}
              className={
                clsx("mx-2 hover:underline",
                  {
                    "underline text-blue-600 dark:text-blue-400": size === selectedSize 
                  }
                )
              }
              onClick={() => onSizeChange(size)}
            >
              {size}
            </button>
          ))
        }
      </div>
    </div>
  )
}
