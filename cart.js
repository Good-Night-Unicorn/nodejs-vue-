import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // 状态 - 购物车商品列表
  const cartItems = ref([])

  // 计算属性 - 购物车商品总数
  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  // 计算属性 - 购物车总价
  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  // 计算属性 - 购物车商品种类数
  const uniqueItems = computed(() => {
    return cartItems.value.length
  })

  // 方法 - 添加商品到购物车
  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      // 如果商品已存在，增加数量
      existingItem.quantity += 1
    } else {
      // 如果商品不存在，添加新商品
      cartItems.value.push({
        ...product,
        quantity: 1
      })
    }
    
    // 保存到本地存储
    saveToLocalStorage()
  }

  // 方法 - 从购物车移除商品
  const removeFromCart = (productId) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  // 方法 - 更新商品数量
  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveToLocalStorage()
      }
    }
  }

  // 方法 - 清空购物车
  const clearCart = () => {
    cartItems.value = []
    saveToLocalStorage()
  }

  // 方法 - 检查商品是否在购物车中
  const isInCart = (productId) => {
    return cartItems.value.some(item => item.id === productId)
  }

  // 方法 - 获取商品在购物车中的数量
  const getItemQuantity = (productId) => {
    const item = cartItems.value.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  // 方法 - 保存到本地存储
  const saveToLocalStorage = () => {
    localStorage.setItem('cake-shop-cart', JSON.stringify(cartItems.value))
  }

  // 方法 - 从本地存储加载
  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('cake-shop-cart')
    if (saved) {
      cartItems.value = JSON.parse(saved)
    }
  }

  // 初始化时从本地存储加载数据
  loadFromLocalStorage()

  return {
    // 状态
    cartItems,
    
    // 计算属性
    totalItems,
    totalPrice,
    uniqueItems,
    
    // 方法
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    saveToLocalStorage,
    loadFromLocalStorage
  }
}) 