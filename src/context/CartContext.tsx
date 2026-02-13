"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

export interface Product {
  id: string
  name: string
  price: number
  oldPrice?: number | null
  image: string
  weight: string
  category: string
  description: string
  isHit?: boolean
  isNew?: boolean
  discount?: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  decrementQuantity: (productId: string) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  showFastOrderOnce: () => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [hasShownFastOrder, setHasShownFastOrder] = useState(false)

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const showFastOrderOnce = () => {
    if (!hasShownFastOrder) {
      setHasShownFastOrder(true)
      return true
    }
    return false
  }

  const decrementQuantity = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId)
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      }
      return prev.filter((item) => item.id !== productId)
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => setCart([])

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        decrementQuantity,
        removeFromCart, 
        clearCart, 
        totalItems, 
        totalPrice, 
        isCartOpen, 
        setIsCartOpen,
        showFastOrderOnce
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
