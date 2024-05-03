
interface Props {
  isLoading: boolean;
  stock: number
}

export const StockLabel = ({ isLoading, stock }: Props) => {
  
  return (
    <>
      <h3 className="font-semibold text-md text-textSecondary dark:text-dtextSecondary mb-3">STOCK</h3>
      {
        isLoading ? (
          <p className={`bg-gray-200 dark:bg-gray-400 animate-pulse mb-5 w-36 rounded`}>
            &nbsp;
          </p>
        ) : (
          <p className="text-sm uppercase text-textSecondary2 dark:text-dtextSecondary2 leading-6 mb-5 ">
            {stock} disponibles
          </p>
        )
      }
    </>
  )
}
