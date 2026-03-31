
export interface IShop {
  id: string;
  name: string;
  address: string;
  rating: number;
  image_url?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  image_url?: string | null;
  shopId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IShopWithProducts extends IShop {
  products: IProduct[];
}


export interface IProductWithDetails extends IProduct {
  shop?: IShop;
  category?: ICategory;
}

export interface ICartItem extends Pick<IProduct, 'id' | 'name' | 'price' | 'image_url'> {
  quantity: number;
  shopId: string; 
}

export interface IOrder {
  id?: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  totalPrice: number;
  items: ICartItem[]; 
  createdAt?: string;
}
export interface ICartItem {
  product: IProduct;
  quantity: number;
}



export interface IShopState {
  shops: IShop[];
  activeRatingFilter: RatingRange;
  selectedShopId: string | null;
  isLoading: boolean;
  error: string | null;
  fetchShops: () => Promise<void>;
  setSelectedShop: (id: string) => void;
  setRatingFilter: (range: RatingRange) => void;
  getFilteredShops: () => IShop[];
}

export interface IProductState {
  products: IProductWithDetails[];
  currentProduct: IProductWithDetails | null;
  categories: ICategory[],
  activeCategoryId: string | undefined;
  sortBy: SortOption;
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  fetchProducts: (shopId: string) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  setCategory: (shopId: string, catId?: string) => void;
  setSortBy: (shopId: string, option: SortOption) => void;
}

export interface ICartState {
  items: ICartItem[];
  addItem: (product: IProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}


export interface IOrderFormData {
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
}


export interface IOrderPayload extends IOrderFormData {
  totalPrice: number;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export type RatingRange = "all" | "4-5" | "3-4" | "2-3";
export type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";