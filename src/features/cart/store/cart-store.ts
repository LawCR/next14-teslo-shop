import { create } from 'zustand';
import type { CartProduct } from '../interfaces/cart.interface';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  // methods
  getTotalItems: () => number;
  getSummaryInformation: () => { subtotal: number, taxes: number, total: number, totalItems: number };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeFromCart: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CartProduct) => {
        const { cart } = get()
  
        // Revisar si el producto ya existe en el carrito con la talla seleccionada
        const productInCart = cart.some((item) => item.id === product.id && item.size === product.size)
  
        // Si no existe agregarlo al carrito
        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }
  
        // Si ya existe, actualizar la cantidad
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity }
          }
          return item
        })
  
        set({ cart: updatedCart })
      },
      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((acc, item) => acc + item.quantity, 0)
      },
      getSummaryInformation: () => {
        const { cart } = get()
        const subtotal = cart.reduce((acc, item) => acc + ( item.price * item.quantity ), 0)
        const taxes = subtotal * 0.15
        const total = subtotal + taxes
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
        return { subtotal, taxes, total, totalItems }
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get()
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity }
          }
          return item
        })
        set({ cart: updatedCart })
      },
      removeFromCart: (product: CartProduct) => {
        const { cart } = get()
        const updatedCart = cart.filter((item) => !(item.id === product.id && item.size === product.size))
        set({ cart: updatedCart })
      },
      clearCart: () => {
        set({ cart: [] })
      }
    }), 
    {
      name: 'shopping-cart',
    }
  )
);
