// In-memory mock database for testing without MongoDB
let users = [];
let products = [];
let orders = [];

// Default products
const defaultProducts = [
  {
    id: '1',
    name: 'Neon Dreams T-Shirt',
    category: 'T-Shirts',
    price: 599,
    stock: 50,
    image: 'https://via.placeholder.com/300x300?text=Neon+Dreams+Tee',
    description: 'Experience the trippy essence of neon vibes',
    sizesAvailable: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Cosmic Purple Hoodie',
    category: 'Hoodies',
    price: 1299,
    stock: 30,
    image: 'https://via.placeholder.com/300x300?text=Cosmic+Hoodie',
    description: 'Deep space purple with neon accents',
    sizesAvailable: ['S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'Trippy Vibes Cap',
    category: 'Accessories',
    price: 399,
    stock: 100,
    image: 'https://via.placeholder.com/300x300?text=Trippy+Cap',
    description: 'Psychedelic design baseball cap',
    sizesAvailable: []
  },
  {
    id: '4',
    name: 'Electric Pink T-Shirt',
    category: 'T-Shirts',
    price: 599,
    stock: 45,
    image: 'https://via.placeholder.com/300x300?text=Electric+Pink+Tee',
    description: 'Vibrant pink with neon cyan details',
    sizesAvailable: ['S', 'M', 'L', 'XL']
  },
  {
    id: '5',
    name: 'Dark Matter Hoodie',
    category: 'Hoodies',
    price: 1299,
    stock: 25,
    image: 'https://via.placeholder.com/300x300?text=Dark+Matter+Hoodie',
    description: 'Black with neon grid pattern',
    sizesAvailable: ['S', 'M', 'L', 'XL']
  },
  {
    id: '6',
    name: 'Holographic Socks',
    category: 'Accessories',
    price: 299,
    stock: 150,
    image: 'https://via.placeholder.com/300x300?text=Holographic+Socks',
    description: 'Shimmering holographic design',
    sizesAvailable: []
  }
];

products = [...defaultProducts];

module.exports = {
  users,
  products,
  orders,
  
  // User operations
  createUser: (userData) => {
    const newUser = { id: Date.now().toString(), ...userData };
    users.push(newUser);
    return newUser;
  },
  
  findUserByEmail: (email) => {
    return users.find(u => u.email === email);
  },
  
  findUserById: (id) => {
    return users.find(u => u.id === id);
  },
  
  // Product operations
  getProducts: () => products,
  
  getProductById: (id) => {
    return products.find(p => p.id === id);
  },
  
  getProductsByCategory: (category) => {
    if (category === 'All') return products;
    return products.filter(p => p.category === category);
  },
  
  updateProduct: (id, data) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...data };
      return products[index];
    }
    return null;
  },
  
  // Order operations
  createOrder: (orderData) => {
    const newOrder = { id: Date.now().toString(), ...orderData, createdAt: new Date() };
    orders.push(newOrder);
    return newOrder;
  },
  
  getUserOrders: (userId) => {
    return orders.filter(o => o.userId === userId);
  },
  
  getAllOrders: () => orders,
  
  updateOrder: (id, data) => {
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...data };
      return orders[index];
    }
    return null;
  },

  // Reset for testing
  reset: () => {
    users = [];
    orders = [];
    products = [...defaultProducts];
  }
};
