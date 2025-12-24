import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Star, Search, Filter, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 99.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    brand: 'AudioTech',
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and smartphone integration.',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Electronics',
    brand: 'FitTech',
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
  },
  {
    id: '3',
    name: 'Premium Laptop Backpack',
    description: 'Durable and stylish laptop backpack with multiple compartments and USB charging port.',
    price: 49.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'Clothing',
    brand: 'TravelGear',
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: '4',
    name: 'Wireless Phone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 29.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    category: 'Electronics',
    brand: 'ChargeTech',
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: '5',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Clothing',
    brand: 'EcoWear',
    rating: 4.4,
    reviewCount: 123,
    inStock: true,
  },
  {
    id: '6',
    name: 'JavaScript Programming Book',
    description: 'Complete guide to modern JavaScript development with practical examples.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    category: 'Books',
    brand: 'TechBooks',
    rating: 4.9,
    reviewCount: 201,
    inStock: true,
  },
  {
    id: '7',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 elegant ceramic coffee mugs perfect for home or office.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    brand: 'HomeStyle',
    rating: 4.3,
    reviewCount: 78,
    inStock: true,
  },
  {
    id: '8',
    name: 'Yoga Exercise Mat',
    description: 'Non-slip yoga mat with excellent cushioning for all types of workouts.',
    price: 19.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    category: 'Sports & Outdoors',
    brand: 'FitLife',
    rating: 4.6,
    reviewCount: 145,
    inStock: true,
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [showOnSale, setShowOnSale] = useState(false);
  
  const { addItem } = useCart();

  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      // Price range filter
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        matchesPrice = product.price >= min && (max ? product.price <= max : true);
      }
      
      // On sale filter
      const matchesOnSale = !showOnSale || product.originalPrice;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesOnSale;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, priceRange, showOnSale]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of quality products
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </h3>
              
              {/* Search */}
              <div className="space-y-2 mb-6">
                <Label>Search Products</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Separator className="my-4" />

              {/* Category Filter */}
              <div className="space-y-2 mb-6">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {PRODUCT_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-4" />

              {/* Price Range */}
              <div className="space-y-2 mb-6">
                <Label>Price Range</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-25">$0 - $25</SelectItem>
                    <SelectItem value="25-50">$25 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="200">$200+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-4" />

              {/* On Sale Filter */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="onSale"
                  checked={showOnSale}
                  onCheckedChange={setShowOnSale}
                />
                <Label htmlFor="onSale">On Sale Only</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} of {mockProducts.length} products
            </p>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2" variant="destructive">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        <Link to={`/products/${product.id}`}>
                          {product.name}
                        </Link>
                      </h3>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-lg font-bold">${product.price}</p>
                        {product.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </p>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleAddToCart(product)}
                        className="gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange('all');
                  setShowOnSale(false);
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}