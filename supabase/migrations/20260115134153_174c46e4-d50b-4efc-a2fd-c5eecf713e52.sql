
-- Create categories table for women's clothing
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  age_group TEXT DEFAULT 'all',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  images TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors TEXT[] DEFAULT '{}',
  stock_quantity INTEGER DEFAULT 0,
  age_min INTEGER DEFAULT 1,
  age_max INTEGER DEFAULT 100,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create addresses table
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  label TEXT DEFAULT 'Home',
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id, size, color)
);

-- Create wishlist table
CREATE TABLE public.wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  shipping_address JSONB,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL,
  size TEXT,
  color TEXT,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (is_active = true);

-- Products policies (public read)
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (is_active = true);

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Addresses policies
CREATE POLICY "Users can view own addresses" ON public.addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own addresses" ON public.addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own addresses" ON public.addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own addresses" ON public.addresses FOR DELETE USING (auth.uid() = user_id);

-- Cart policies
CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart items" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart items" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart items" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Wishlist policies
CREATE POLICY "Users can view own wishlist" ON public.wishlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wishlist items" ON public.wishlist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own wishlist items" ON public.wishlist FOR DELETE USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Contact messages policies (anyone can insert)
CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to generate order number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'VYS-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for order number
CREATE TRIGGER set_order_number
  BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.generate_order_number();

-- Create updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create updated_at triggers
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON public.cart_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_featured ON public.products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_new ON public.products(is_new) WHERE is_new = true;
CREATE INDEX idx_cart_items_user ON public.cart_items(user_id);
CREATE INDEX idx_wishlist_user ON public.wishlist(user_id);
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_reviews_product ON public.reviews(product_id);

-- Insert initial categories for women's clothing
INSERT INTO public.categories (name, slug, description, age_group, display_order) VALUES
('Sarees', 'sarees', 'Traditional and modern sarees for all occasions', 'adult', 1),
('Kurtis', 'kurtis', 'Stylish kurtis and kurta sets', 'adult', 2),
('Dresses', 'dresses', 'Western dresses for every occasion', 'all', 3),
('Tops', 'tops', 'Trendy tops and blouses', 'all', 4),
('Jeans & Pants', 'jeans-pants', 'Comfortable jeans and pants', 'all', 5),
('Lehengas', 'lehengas', 'Beautiful lehengas for special occasions', 'adult', 6),
('Salwar Suits', 'salwar-suits', 'Elegant salwar suits and churidars', 'adult', 7),
('Ethnic Wear', 'ethnic-wear', 'Traditional Indian ethnic wear', 'all', 8),
('Western Wear', 'western-wear', 'Modern western clothing', 'all', 9),
('Girls Clothing', 'girls-clothing', 'Adorable clothing for young girls', 'kids', 10),
('Nightwear', 'nightwear', 'Comfortable nightwear and loungewear', 'adult', 11),
('Activewear', 'activewear', 'Sportswear and gym wear', 'all', 12);

-- Insert sample products
INSERT INTO public.products (category_id, name, slug, description, price, sale_price, images, sizes, colors, stock_quantity, is_featured, is_new, age_min, age_max) VALUES
((SELECT id FROM categories WHERE slug = 'sarees'), 'Banarasi Silk Saree', 'banarasi-silk-saree', 'Exquisite Banarasi silk saree with intricate zari work', 8999.00, 7499.00, ARRAY['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'], ARRAY['Free Size'], ARRAY['Red', 'Blue', 'Green', 'Pink'], 50, true, true, 18, 100),
((SELECT id FROM categories WHERE slug = 'sarees'), 'Georgette Party Saree', 'georgette-party-saree', 'Elegant georgette saree perfect for parties', 3999.00, 2999.00, ARRAY['https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800'], ARRAY['Free Size'], ARRAY['Black', 'Navy', 'Maroon'], 30, true, false, 18, 100),
((SELECT id FROM categories WHERE slug = 'kurtis'), 'Anarkali Kurta Set', 'anarkali-kurta-set', 'Beautiful Anarkali kurta with dupatta', 2499.00, 1999.00, ARRAY['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'], ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], ARRAY['Yellow', 'Pink', 'Blue'], 40, true, true, 16, 100),
((SELECT id FROM categories WHERE slug = 'kurtis'), 'Cotton Straight Kurti', 'cotton-straight-kurti', 'Comfortable cotton kurti for daily wear', 999.00, NULL, ARRAY['https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['White', 'Blue', 'Green'], 100, false, true, 16, 100),
((SELECT id FROM categories WHERE slug = 'dresses'), 'Floral Maxi Dress', 'floral-maxi-dress', 'Beautiful floral print maxi dress', 2999.00, 2499.00, ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Multicolor', 'Blue Floral', 'Pink Floral'], 35, true, true, 14, 60),
((SELECT id FROM categories WHERE slug = 'dresses'), 'A-Line Midi Dress', 'a-line-midi-dress', 'Elegant A-line dress for office and casual wear', 1999.00, NULL, ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Black', 'Navy', 'Burgundy'], 45, false, false, 16, 55),
((SELECT id FROM categories WHERE slug = 'tops'), 'Crop Top with Ruffles', 'crop-top-ruffles', 'Trendy crop top with ruffle details', 799.00, 599.00, ARRAY['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800'], ARRAY['XS', 'S', 'M', 'L'], ARRAY['White', 'Pink', 'Black'], 60, true, true, 14, 35),
((SELECT id FROM categories WHERE slug = 'tops'), 'Printed Casual Top', 'printed-casual-top', 'Comfortable printed top for everyday wear', 599.00, NULL, ARRAY['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['White Print', 'Blue Print'], 80, false, false, 12, 50),
((SELECT id FROM categories WHERE slug = 'jeans-pants'), 'High Waist Jeans', 'high-waist-jeans', 'Stylish high waist denim jeans', 1499.00, 1199.00, ARRAY['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800'], ARRAY['26', '28', '30', '32', '34'], ARRAY['Blue', 'Black', 'Light Blue'], 70, true, false, 14, 55),
((SELECT id FROM categories WHERE slug = 'jeans-pants'), 'Palazzo Pants', 'palazzo-pants', 'Flowy and comfortable palazzo pants', 999.00, NULL, ARRAY['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Black', 'Navy', 'Maroon', 'Olive'], 55, false, true, 16, 60),
((SELECT id FROM categories WHERE slug = 'lehengas'), 'Bridal Lehenga Set', 'bridal-lehenga-set', 'Stunning bridal lehenga with heavy embroidery', 45999.00, 39999.00, ARRAY['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Red', 'Maroon', 'Pink'], 15, true, true, 18, 45),
((SELECT id FROM categories WHERE slug = 'lehengas'), 'Party Wear Lehenga', 'party-wear-lehenga', 'Beautiful lehenga for parties and functions', 12999.00, 9999.00, ARRAY['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Blue', 'Green', 'Purple'], 25, true, false, 16, 50),
((SELECT id FROM categories WHERE slug = 'salwar-suits'), 'Embroidered Salwar Suit', 'embroidered-salwar-suit', 'Elegant embroidered salwar suit set', 3499.00, 2799.00, ARRAY['https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Blue', 'Pink', 'Yellow'], 40, true, true, 18, 70),
((SELECT id FROM categories WHERE slug = 'girls-clothing'), 'Girls Frock Dress', 'girls-frock-dress', 'Adorable frock dress for little girls', 799.00, 599.00, ARRAY['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800'], ARRAY['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'], ARRAY['Pink', 'Yellow', 'Blue', 'White'], 60, true, true, 2, 12),
((SELECT id FROM categories WHERE slug = 'girls-clothing'), 'Girls Lehenga Choli', 'girls-lehenga-choli', 'Beautiful ethnic wear for girls', 1499.00, 1199.00, ARRAY['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'], ARRAY['2-3Y', '4-5Y', '6-7Y', '8-9Y'], ARRAY['Red', 'Pink', 'Blue'], 35, true, false, 2, 10),
((SELECT id FROM categories WHERE slug = 'nightwear'), 'Cotton Night Suit', 'cotton-night-suit', 'Comfortable cotton night suit set', 899.00, NULL, ARRAY['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Pink', 'Blue', 'White'], 50, false, true, 16, 70),
((SELECT id FROM categories WHERE slug = 'activewear'), 'Yoga Pants Set', 'yoga-pants-set', 'Stretchable yoga pants with sports top', 1299.00, 999.00, ARRAY['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Black', 'Navy', 'Grey'], 45, true, true, 14, 55),
((SELECT id FROM categories WHERE slug = 'western-wear'), 'Denim Jacket', 'denim-jacket', 'Classic denim jacket for all seasons', 1999.00, 1599.00, ARRAY['https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Blue', 'Light Blue', 'Black'], 40, true, false, 14, 50),
((SELECT id FROM categories WHERE slug = 'ethnic-wear'), 'Sharara Set', 'sharara-set', 'Trendy sharara set with short kurti', 3999.00, 3299.00, ARRAY['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Yellow', 'Pink', 'Blue', 'Green'], 30, true, true, 16, 55),
((SELECT id FROM categories WHERE slug = 'ethnic-wear'), 'Gown Style Dress', 'gown-style-dress', 'Elegant floor-length gown for special occasions', 5999.00, 4999.00, ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Wine', 'Navy', 'Black', 'Emerald'], 25, true, false, 18, 55);
