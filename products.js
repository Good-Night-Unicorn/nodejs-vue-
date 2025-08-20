import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  // 商品数据
  const products = ref([
    {
      id: 1,
      name: '经典巧克力慕斯',
      description: '浓郁巧克力，层次丰富，口感顺滑',
      price: 128,
      originalPrice: 158,
      category: 'chocolate',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center',
      sales: 156,
      stock: 50,
      rating: 4.8,
      isHot: true,
      isSpecial: true
    },
    {
      id: 2,
      name: '草莓奶油蛋糕',
      description: '新鲜草莓配奶油，酸甜可口',
      price: 98,
      originalPrice: 128,
      category: 'fruit',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop&crop=center',
      sales: 203,
      stock: 45,
      rating: 4.9,
      isHot: true,
      isSpecial: false
    },
    {
      id: 3,
      name: '芝士蛋糕',
      description: '免烤芝士蛋糕，入口即化',
      price: 88,
      originalPrice: 108,
      category: 'cheese',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&crop=center',
      sales: 189,
      stock: 60,
      rating: 4.7,
      isHot: false,
      isSpecial: true
    },
    {
      id: 4,
      name: '提拉米苏',
      description: '意大利经典，咖啡香浓郁',
      price: 138,
      originalPrice: 168,
      category: 'coffee',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
      sales: 134,
      stock: 35,
      rating: 4.8,
      isHot: false,
      isSpecial: false
    },
    {
      id: 5,
      name: '芒果千层',
      description: '层层叠叠，芒果清香',
      price: 118,
      originalPrice: 148,
      category: 'fruit',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center',
      sales: 167,
      stock: 40,
      rating: 4.6,
      isHot: false,
      isSpecial: true
    },
    {
      id: 6,
      name: '红丝绒蛋糕',
      description: '经典美式，红色诱惑',
      price: 148,
      originalPrice: 188,
      category: 'chocolate',
      image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=300&fit=crop&crop=center',
      sales: 98,
      stock: 30,
      rating: 4.7,
      isHot: false,
      isSpecial: false
    },
    {
      id: 7,
      name: '抹茶红豆',
      description: '日式风味，清新淡雅',
      price: 108,
      originalPrice: 138,
      category: 'matcha',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop&crop=center',
      sales: 145,
      stock: 55,
      rating: 4.9,
      isHot: true,
      isSpecial: false
    },
    {
      id: 8,
      name: '蓝莓芝士',
      description: '蓝莓酸甜，芝士浓郁',
      price: 128,
      originalPrice: 158,
      category: 'cheese',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop&crop=center',
      sales: 178,
      stock: 42,
      rating: 4.8,
      isHot: false,
      isSpecial: true
    }
  ])

  // 状态 - 当前分类筛选
  const currentCategory = ref('all')
  const currentPage = ref(1)
  const pageSize = ref(8)
  const searchKeyword = ref('')

  // 计算属性 - 商品分类
  const categories = computed(() => {
    const categoryMap = {
      'chocolate': '巧克力蛋糕',
      'fruit': '水果蛋糕',
      'cheese': '芝士蛋糕',
      'coffee': '咖啡蛋糕',
      'matcha': '抹茶蛋糕'
    }
    return Object.entries(categoryMap).map(([value, label]) => ({ value, label }))
  })

  // 计算属性 - 筛选后的商品
  const filteredProducts = computed(() => {
    let result = products.value

    // 按分类筛选
    if (currentCategory.value && currentCategory.value !== 'all') {
      result = result.filter(product => product.category === currentCategory.value)
    }

    // 按关键词搜索
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      result = result.filter(product => 
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
      )
    }

    return result
  })

  // 计算属性 - 特价商品
  const specialProducts = computed(() => {
    return products.value.filter(p => p.isSpecial)
  })

  // 计算属性 - 分页后的商品
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredProducts.value.slice(start, end)
  })

  // 计算属性 - 总页数
  const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / pageSize.value)
  })

  // 方法 - 设置分类
  const setCategory = (category) => {
    currentCategory.value = category
    currentPage.value = 1 // 重置到第一页
  }

  // 方法 - 设置页码
  const setPage = (page) => {
    currentPage.value = page
  }

  // 方法 - 设置搜索关键词
  const setSearchKeyword = (keyword) => {
    searchKeyword.value = keyword
    currentPage.value = 1 // 重置到第一页
  }

  // 方法 - 根据ID获取商品
  const getProductById = (id) => {
    return products.value.find(p => p.id === parseInt(id))
  }

  // 方法 - 获取推荐商品
  const getRecommendedProducts = (excludeId, limit = 4) => {
    return products.value
      .filter(p => p.id !== excludeId)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  return {
    // 状态
    products,
    currentCategory,
    currentPage,
    pageSize,
    searchKeyword,
    
    // 计算属性
    categories,
    filteredProducts,
    specialProducts,
    paginatedProducts,
    totalPages,
    
    // 方法
    setCategory,
    setPage,
    setSearchKeyword,
    getProductById,
    getRecommendedProducts
  }
}) 