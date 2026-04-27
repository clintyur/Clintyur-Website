'use client'

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'

export interface CartItem {
  variantId: string
  productId: string
  name: string
  variantName: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; variantId: string }
  | { type: 'UPDATE_QTY'; variantId: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; payload: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.payload }

    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.variantId === action.payload.variantId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variantId === action.payload.variantId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        }
      }
      return { items: [...state.items, action.payload] }
    }

    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.variantId !== action.variantId) }

    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.variantId !== action.variantId) }
      }
      return {
        items: state.items.map((i) =>
          i.variantId === action.variantId ? { ...i, quantity: action.quantity } : i
        ),
      }

    case 'CLEAR':
      return { items: [] }

    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQty: (variantId: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('provecho-cart')
      if (saved) dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) })
    } catch { /* ignore parse errors */ }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('provecho-cart', JSON.stringify(state.items))
  }, [state.items])

  const addItem    = useCallback((item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item }), [])
  const removeItem = useCallback((id: string) => dispatch({ type: 'REMOVE_ITEM', variantId: id }), [])
  const updateQty  = useCallback((id: string, qty: number) => dispatch({ type: 'UPDATE_QTY', variantId: id, quantity: qty }), [])
  const clear      = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const count    = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items: state.items, count, subtotal, addItem, removeItem, updateQty, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
