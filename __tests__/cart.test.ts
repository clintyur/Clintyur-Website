// Cart reducer unit tests — independent of React rendering

import { CartItem } from '@/components/shop/CartProvider'

// Inline the reducer since we can't import the private function
type CartState = { items: CartItem[] }
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; variantId: string }
  | { type: 'UPDATE_QTY'; variantId: string; quantity: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
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

const ITEM: CartItem = {
  variantId: 'v1', productId: 'p1', name: 'Apron', variantName: 'Black / OS',
  price: 8900, image: '', quantity: 1,
}

describe('cartReducer', () => {
  it('adds a new item', () => {
    const state = cartReducer({ items: [] }, { type: 'ADD_ITEM', payload: ITEM })
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(1)
  })

  it('increments quantity for existing item', () => {
    const start = { items: [ITEM] }
    const next = cartReducer(start, { type: 'ADD_ITEM', payload: { ...ITEM, quantity: 2 } })
    expect(next.items[0].quantity).toBe(3)
  })

  it('removes item', () => {
    const state = cartReducer({ items: [ITEM] }, { type: 'REMOVE_ITEM', variantId: 'v1' })
    expect(state.items).toHaveLength(0)
  })

  it('removes item when qty set to 0', () => {
    const state = cartReducer({ items: [ITEM] }, { type: 'UPDATE_QTY', variantId: 'v1', quantity: 0 })
    expect(state.items).toHaveLength(0)
  })

  it('clears all items', () => {
    const state = cartReducer({ items: [ITEM, { ...ITEM, variantId: 'v2' }] }, { type: 'CLEAR' })
    expect(state.items).toHaveLength(0)
  })
})
