// ============================================================
// PREMIUM MEN'S CLOTHING — Product Data & State Management
// ============================================================

const DEFAULT_PRODUCTS = [
  // CHECKED SHIRTS
  { id: 1, name: "Heritage Check Oxford", category: "checked", price: 2999, originalPrice: 4499, rating: 4.5, reviews: 128, colors: ["#1a3a5c", "#8b4513", "#2d5a3d"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "regular", fabric: "Oxford Cotton", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop", "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=750&fit=crop"], description: "A timeless checked oxford shirt crafted from premium long-staple cotton. Perfect for smart-casual occasions.", care: "Machine wash cold. Tumble dry low. Iron on medium.", stock: 24, badge: "bestseller" },
  { id: 2, name: "Classic Windowpane Check", category: "checked", price: 2499, originalPrice: 3499, rating: 4.3, reviews: 89, colors: ["#2c3e50", "#7f8c8d", "#c0392b"], sizes: ["S", "M", "L", "XL"], fit: "slim", fabric: "Cotton Blend", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=750&fit=crop"], description: "Refined windowpane check pattern in a slim silhouette. Ideal for boardroom to bar transitions.", care: "Machine wash cold. Hang dry. Iron on medium.", stock: 18, badge: "" },
  { id: 3, name: "Tartan Flannel Premium", category: "checked", price: 3499, originalPrice: 4999, rating: 4.7, reviews: 56, colors: ["#8b0000", "#006400", "#191970"], sizes: ["M", "L", "XL", "XXL"], fit: "regular", fabric: "Brushed Cotton Flannel", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=600&h=750&fit=crop"], description: "Luxuriously soft brushed flannel with a classic tartan pattern. Warmth meets style.", care: "Machine wash cold. Do not bleach. Tumble dry low.", stock: 12, badge: "new" },
  { id: 4, name: "Micro Gingham Elite", category: "checked", price: 2799, originalPrice: 3999, rating: 4.4, reviews: 102, colors: ["#1a5276", "#922b21", "#1e8449"], sizes: ["S", "M", "L", "XL"], fit: "slim", fabric: "Premium Cotton", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=750&fit=crop"], description: "Micro gingham pattern exuding sophistication. A boardroom essential.", care: "Dry clean recommended. Iron on low.", stock: 30, badge: "" },
  { id: 5, name: "Buffalo Check Casual", category: "checked", price: 1999, originalPrice: 2999, rating: 4.2, reviews: 74, colors: ["#c0392b", "#2c3e50", "#27ae60"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "oversized", fabric: "Cotton", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop"], description: "Bold buffalo check in a relaxed oversized fit. Weekend vibes perfected.", care: "Machine wash cold. Tumble dry low.", stock: 20, badge: "" },

  // PLAIN SHIRTS
  { id: 6, name: "Pure White Signature", category: "plain", price: 2499, originalPrice: 3499, rating: 4.8, reviews: 245, colors: ["#ffffff", "#f5f5dc", "#e8e8e8"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "slim", fabric: "Egyptian Cotton", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop", "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=750&fit=crop"], description: "The quintessential white shirt crafted from 100% Egyptian cotton. A wardrobe cornerstone.", care: "Machine wash warm. Iron on high for crisp finish.", stock: 50, badge: "bestseller" },
  { id: 7, name: "Midnight Navy Essential", category: "plain", price: 2299, originalPrice: 3299, rating: 4.6, reviews: 189, colors: ["#1a1a2e", "#16213e", "#0f3460"], sizes: ["S", "M", "L", "XL"], fit: "regular", fabric: "Premium Cotton", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&h=750&fit=crop"], description: "Deep midnight navy that commands attention. Versatile enough for any occasion.", care: "Machine wash cold. Hang dry.", stock: 35, badge: "" },
  { id: 8, name: "Sky Blue Luxe", category: "plain", price: 2699, originalPrice: 3799, rating: 4.5, reviews: 156, colors: ["#87ceeb", "#5dade2", "#2e86c1"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "slim", fabric: "Supima Cotton", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"], description: "Crafted from rare Supima cotton for unparalleled softness. The perfect shade of sky blue.", care: "Machine wash cold. Iron on medium.", stock: 28, badge: "new" },
  { id: 9, name: "Charcoal Grey Minimal", category: "plain", price: 2199, originalPrice: 2999, rating: 4.4, reviews: 112, colors: ["#36454f", "#4a4a4a", "#696969"], sizes: ["M", "L", "XL"], fit: "regular", fabric: "Cotton Blend", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=750&fit=crop"], description: "Understated charcoal grey for the modern minimalist. Effortless sophistication.", care: "Machine wash cold. Tumble dry low.", stock: 22, badge: "" },
  { id: 10, name: "Sage Green Mandarin", category: "plain", price: 2899, originalPrice: 3999, rating: 4.6, reviews: 78, colors: ["#8fbc8f", "#556b2f", "#6b8e23"], sizes: ["S", "M", "L", "XL"], fit: "slim", fabric: "Linen Blend", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop"], description: "Earthy sage green with a mandarin collar. A statement piece for the style-forward man.", care: "Hand wash recommended. Iron on low.", stock: 15, badge: "limited" },

  // STRIPED SHIRTS
  { id: 11, name: "Banker Stripe Classic", category: "striped", price: 2599, originalPrice: 3799, rating: 4.5, reviews: 167, colors: ["#1a5276", "#922b21", "#4a235a"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "regular", fabric: "Premium Cotton", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=750&fit=crop"], description: "The definitive banker stripe shirt. Sharp, authoritative, and impeccably tailored.", care: "Machine wash cold. Iron on medium-high.", stock: 40, badge: "bestseller" },
  { id: 12, name: "Pinstripe Power", category: "striped", price: 2999, originalPrice: 4299, rating: 4.7, reviews: 98, colors: ["#2c3e50", "#1a1a2e", "#343434"], sizes: ["S", "M", "L", "XL"], fit: "slim", fabric: "Egyptian Cotton", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&h=750&fit=crop"], description: "Power pinstripe in Egyptian cotton. For the man who means business.", care: "Dry clean recommended.", stock: 16, badge: "" },
  { id: 13, name: "Bengal Stripe Resort", category: "striped", price: 2199, originalPrice: 3199, rating: 4.3, reviews: 134, colors: ["#e74c3c", "#3498db", "#27ae60"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "regular", fabric: "Linen", sleeve: "half", occasion: "casual", image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=750&fit=crop"], description: "Wide Bengal stripes in breathable linen. Your vacation wardrobe essential.", care: "Hand wash cold. Hang dry. Iron on low.", stock: 25, badge: "" },
  { id: 14, name: "Dual Tone Stripe", category: "striped", price: 2399, originalPrice: 3399, rating: 4.4, reviews: 67, colors: ["#1a5276", "#7b241c", "#1e8449"], sizes: ["M", "L", "XL"], fit: "slim", fabric: "Cotton", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop"], description: "Contemporary dual-tone striping with contrast cuff details. Modern sophistication.", care: "Machine wash cold. Iron on medium.", stock: 19, badge: "new" },
  { id: 15, name: "Candy Stripe Summer", category: "striped", price: 1899, originalPrice: 2699, rating: 4.2, reviews: 88, colors: ["#ff6b6b", "#48dbfb", "#feca57"], sizes: ["S", "M", "L", "XL"], fit: "regular", fabric: "Cotton Blend", sleeve: "half", occasion: "casual", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop"], description: "Playful candy stripes for the summer months. Light, airy, and effortlessly cool.", care: "Machine wash cold. Tumble dry low.", stock: 32, badge: "" },

  // PRINTED SHIRTS
  { id: 16, name: "Tropical Palm Print", category: "printed", price: 2699, originalPrice: 3999, rating: 4.4, reviews: 95, colors: ["#1a5276", "#145a32", "#4a235a"], sizes: ["S", "M", "L", "XL"], fit: "regular", fabric: "Viscose", sleeve: "half", occasion: "casual", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop"], description: "Sophisticated tropical palm print on premium viscose. Resort luxury redefined.", care: "Hand wash cold. Do not wring. Hang dry.", stock: 14, badge: "new" },
  { id: 17, name: "Abstract Geometric", category: "printed", price: 2899, originalPrice: 4199, rating: 4.6, reviews: 72, colors: ["#2c3e50", "#7f8c8d", "#e74c3c"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "slim", fabric: "Premium Cotton", sleeve: "full", occasion: "party", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=750&fit=crop"], description: "Bold abstract geometry meets Italian design sensibility. A conversation starter.", care: "Machine wash cold. Iron inside out.", stock: 10, badge: "limited" },
  { id: 18, name: "Paisley Heritage", category: "printed", price: 3199, originalPrice: 4599, rating: 4.5, reviews: 63, colors: ["#4a235a", "#7b241c", "#1a5276"], sizes: ["M", "L", "XL"], fit: "regular", fabric: "Silk Blend", sleeve: "full", occasion: "party", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop"], description: "Rich paisley heritage print on luxurious silk blend. Evening elegance personified.", care: "Dry clean only.", stock: 8, badge: "limited" },
  { id: 19, name: "Micro Floral Casual", category: "printed", price: 2099, originalPrice: 2999, rating: 4.3, reviews: 115, colors: ["#1a5276", "#145a32", "#4a235a"], sizes: ["S", "M", "L", "XL"], fit: "slim", fabric: "Cotton", sleeve: "half", occasion: "casual", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop"], description: "Subtle micro-floral print that adds personality without shouting. Refined casual wear.", care: "Machine wash cold. Hang dry.", stock: 26, badge: "" },
  { id: 20, name: "Digital Camo Urban", category: "printed", price: 2399, originalPrice: 3499, rating: 4.1, reviews: 54, colors: ["#2c3e50", "#556b2f", "#696969"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "oversized", fabric: "Cotton Twill", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop"], description: "Urban digital camo in muted tones. Street style meets premium craftsmanship.", care: "Machine wash cold. Tumble dry low.", stock: 17, badge: "" },

  // FORMAL SHIRTS
  { id: 21, name: "Executive White Broadcloth", category: "formal", price: 3499, originalPrice: 4999, rating: 4.8, reviews: 312, colors: ["#ffffff", "#f8f8ff", "#fffff0"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "slim", fabric: "Egyptian Broadcloth", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop", "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=750&fit=crop"], description: "The ultimate boardroom companion. 200-thread count Egyptian broadcloth with French cuffs.", care: "Professional launder recommended. Iron on high.", stock: 45, badge: "bestseller" },
  { id: 22, name: "French Cuff Royal Blue", category: "formal", price: 3299, originalPrice: 4699, rating: 4.7, reviews: 178, colors: ["#1a5276", "#2e86c1", "#21618c"], sizes: ["S", "M", "L", "XL"], fit: "slim", fabric: "Premium Twill", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"], description: "Royal blue French cuff shirt that commands respect. Premium twill with a subtle sheen.", care: "Dry clean recommended. Iron on medium.", stock: 20, badge: "" },
  { id: 23, name: "Silver Grey Herringbone", category: "formal", price: 3699, originalPrice: 5299, rating: 4.6, reviews: 92, colors: ["#c0c0c0", "#a9a9a9", "#808080"], sizes: ["M", "L", "XL", "XXL"], fit: "regular", fabric: "Herringbone Cotton", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&h=750&fit=crop"], description: "Subtle herringbone texture in refined silver grey. Elevated formal dressing at its finest.", care: "Professional launder. Iron on medium-high.", stock: 11, badge: "limited" },
  { id: 24, name: "Tuxedo Dress Shirt", category: "formal", price: 4499, originalPrice: 6499, rating: 4.9, reviews: 67, colors: ["#ffffff", "#f5f5f5"], sizes: ["S", "M", "L", "XL"], fit: "slim", fabric: "Marcella Cotton", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop"], description: "Black-tie ready Marcella cotton with a bib front. The pinnacle of formal shirts.", care: "Professional launder only.", stock: 6, badge: "limited" },
  { id: 25, name: "Lavender Spread Collar", category: "formal", price: 2899, originalPrice: 3999, rating: 4.5, reviews: 143, colors: ["#e6e6fa", "#d8bfd8", "#dda0dd"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "regular", fabric: "Oxford Cotton", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=750&fit=crop"], description: "Soft lavender with an Italian spread collar. Sophistication with a touch of personality.", care: "Machine wash cold. Iron on medium.", stock: 33, badge: "" },

  // CASUAL SHIRTS
  { id: 26, name: "Denim Chambray Classic", category: "casual", price: 2799, originalPrice: 3999, rating: 4.6, reviews: 198, colors: ["#4682b4", "#5f9ea0", "#6495ed"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "regular", fabric: "Chambray Denim", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop"], description: "Premium chambray denim that gets better with every wash. An everyday icon.", care: "Machine wash cold. Tumble dry low. Will soften with wear.", stock: 38, badge: "bestseller" },
  { id: 27, name: "Linen Beach Resort", category: "casual", price: 3199, originalPrice: 4499, rating: 4.5, reviews: 87, colors: ["#f5f5dc", "#faebd7", "#ffe4c4"], sizes: ["S", "M", "L", "XL"], fit: "regular", fabric: "Pure Linen", sleeve: "half", occasion: "casual", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop"], description: "100% pure linen for those sun-soaked days. Natural texture, effortless style.", care: "Hand wash cold. Hang dry. Iron while damp.", stock: 21, badge: "new" },
  { id: 28, name: "Corduroy Weekend", category: "casual", price: 3499, originalPrice: 4999, rating: 4.4, reviews: 65, colors: ["#8b4513", "#a0522d", "#d2691e"], sizes: ["M", "L", "XL", "XXL"], fit: "oversized", fabric: "Fine Corduroy", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=600&h=750&fit=crop"], description: "Rich corduroy in an oversized silhouette. Autumn-winter luxury casual.", care: "Machine wash cold inside out. Tumble dry low.", stock: 13, badge: "" },
  { id: 29, name: "Henley Long Sleeve", category: "casual", price: 1999, originalPrice: 2799, rating: 4.3, reviews: 221, colors: ["#2c3e50", "#7f8c8d", "#c0392b"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "slim", fabric: "Jersey Cotton", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=750&fit=crop"], description: "Classic henley in premium jersey cotton. Layering essential with character.", care: "Machine wash cold. Tumble dry low.", stock: 42, badge: "" },
  { id: 30, name: "Cuban Collar Retro", category: "casual", price: 2599, originalPrice: 3699, rating: 4.5, reviews: 104, colors: ["#1a1a2e", "#e74c3c", "#f39c12"], sizes: ["S", "M", "L", "XL"], fit: "regular", fabric: "Viscose Blend", sleeve: "half", occasion: "party", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop"], description: "Retro Cuban collar with contemporary flair. Own the night in vintage-inspired style.", care: "Hand wash cold. Hang dry.", stock: 16, badge: "new" },

  // SLIM FIT SHIRTS
  { id: 31, name: "Italian Slim White", category: "slim-fit", price: 3299, originalPrice: 4799, rating: 4.7, reviews: 267, colors: ["#ffffff", "#f5f5f5", "#fafafa"], sizes: ["S", "M", "L", "XL"], fit: "slim", fabric: "Italian Cotton", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop"], description: "Precision-cut Italian cotton with tapered waist and high armhole. The modern man's armor.", care: "Professional launder for best results.", stock: 30, badge: "bestseller" },
  { id: 32, name: "Muscle Fit Black", category: "slim-fit", price: 2499, originalPrice: 3499, rating: 4.5, reviews: 189, colors: ["#000000", "#1a1a1a", "#2d2d2d"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "slim", fabric: "Stretch Cotton", sleeve: "full", occasion: "party", image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&h=750&fit=crop"], description: "Athletic muscle fit with 2% elastane for comfort. Designed to accentuate your build.", care: "Machine wash cold. Hang dry to maintain shape.", stock: 35, badge: "" },
  { id: 33, name: "Stretch Poplin Navy", category: "slim-fit", price: 2699, originalPrice: 3899, rating: 4.6, reviews: 145, colors: ["#1a1a2e", "#16213e", "#0f3460"], sizes: ["S", "M", "L", "XL"], fit: "slim", fabric: "Stretch Poplin", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"], description: "Navy stretch poplin that moves with you. All-day comfort without compromising on style.", care: "Machine wash cold. Tumble dry low.", stock: 27, badge: "" },
  { id: 34, name: "Tech Fit Performance", category: "slim-fit", price: 3499, originalPrice: 4999, rating: 4.4, reviews: 78, colors: ["#36454f", "#708090", "#778899"], sizes: ["S", "M", "L", "XL"], fit: "slim", fabric: "Performance Blend", sleeve: "full", occasion: "formal", image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=750&fit=crop"], description: "Wrinkle-resistant performance fabric with moisture-wicking. Business travel perfected.", care: "Machine wash cold. No iron needed.", stock: 22, badge: "new" },
  { id: 35, name: "Fitted Linen Sage", category: "slim-fit", price: 2999, originalPrice: 4299, rating: 4.3, reviews: 56, colors: ["#8fbc8f", "#9acd32", "#6b8e23"], sizes: ["S", "M", "L", "XL"], fit: "slim", fabric: "Cotton Linen", sleeve: "half", occasion: "casual", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop"], description: "Slim-cut cotton-linen blend in muted sage. Summer sophistication.", care: "Hand wash cold. Iron while slightly damp.", stock: 14, badge: "" },

  // OVERSIZED SHIRTS
  { id: 36, name: "Oversized Street Black", category: "oversized", price: 2799, originalPrice: 3999, rating: 4.5, reviews: 156, colors: ["#000000", "#1a1a1a", "#2d2d2d"], sizes: ["M", "L", "XL", "XXL"], fit: "oversized", fabric: "Heavy Cotton", sleeve: "half", occasion: "casual", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=750&fit=crop"], description: "Heavyweight oversized tee-shirt hybrid. Street culture meets premium fabric.", care: "Machine wash cold. Hang dry.", stock: 25, badge: "bestseller" },
  { id: 37, name: "Drop Shoulder Cream", category: "oversized", price: 2499, originalPrice: 3599, rating: 4.4, reviews: 98, colors: ["#fffdd0", "#faf0e6", "#faebd7"], sizes: ["M", "L", "XL", "XXL"], fit: "oversized", fabric: "Organic Cotton", sleeve: "half", occasion: "casual", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop"], description: "Organic cotton drop-shoulder in warm cream. Conscious fashion with attitude.", care: "Machine wash cold. Tumble dry low.", stock: 20, badge: "new" },
  { id: 38, name: "Boxy Fit Oxford", category: "oversized", price: 3199, originalPrice: 4599, rating: 4.3, reviews: 45, colors: ["#4682b4", "#87ceeb", "#b0c4de"], sizes: ["M", "L", "XL", "XXL"], fit: "oversized", fabric: "Oxford Cotton", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop"], description: "Boxy Oxford in a relaxed silhouette. Japanese-inspired minimalism.", care: "Machine wash cold. Hang dry.", stock: 12, badge: "" },
  { id: 39, name: "Oversized Flannel Check", category: "oversized", price: 3499, originalPrice: 4999, rating: 4.6, reviews: 73, colors: ["#8b0000", "#2f4f4f", "#daa520"], sizes: ["M", "L", "XL", "XXL"], fit: "oversized", fabric: "Brushed Flannel", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=600&h=750&fit=crop"], description: "Oversized brushed flannel for maximum comfort. Cozy meets cool.", care: "Machine wash cold. Tumble dry low.", stock: 18, badge: "" },
  { id: 40, name: "Relaxed Utility Shirt", category: "oversized", price: 3699, originalPrice: 5199, rating: 4.5, reviews: 61, colors: ["#556b2f", "#8b7355", "#696969"], sizes: ["M", "L", "XL", "XXL"], fit: "oversized", fabric: "Cotton Twill", sleeve: "full", occasion: "casual", image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&h=750&fit=crop", images: ["https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&h=750&fit=crop"], description: "Military-inspired utility shirt in a relaxed fit. Functional pockets, premium fabric.", care: "Machine wash cold. Iron on low.", stock: 9, badge: "limited" }
];

const DEFAULT_CATEGORIES = [
  { id: "checked", name: "Checked Shirts", icon: "grid_view", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop" },
  { id: "plain", name: "Plain Shirts", icon: "square", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=500&fit=crop" },
  { id: "striped", name: "Striped Shirts", icon: "view_day", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=500&fit=crop" },
  { id: "printed", name: "Printed Shirts", icon: "palette", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop" },
  { id: "formal", name: "Formal Shirts", icon: "business_center", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop" },
  { id: "casual", name: "Casual Shirts", icon: "weekend", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop" },
  { id: "slim-fit", name: "Slim Fit Shirts", icon: "straighten", image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400&h=500&fit=crop" },
  { id: "oversized", name: "Oversized Shirts", icon: "open_in_full", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=400&h=500&fit=crop" }
];

const TESTIMONIALS = [
  { name: "Arjun Mehta", role: "Creative Director", rating: 5, text: "The quality of these shirts is unparalleled. I've replaced my entire wardrobe with their collection. The fit is impeccable and the fabrics feel luxurious against the skin.", avatar: "AM" },
  { name: "Rahul Sharma", role: "Investment Banker", rating: 5, text: "Finally, a brand that understands what professionals need. The formal shirts are boardroom-ready and incredibly comfortable for long hours. Worth every penny.", avatar: "RS" },
  { name: "Vikram Patel", role: "Tech Entrepreneur", rating: 4, text: "The slim-fit collection is exactly what I was looking for. Modern, clean lines with premium fabric. These shirts transition beautifully from meetings to dinner.", avatar: "VP" },
  { name: "Karan Singh", role: "Fashion Blogger", rating: 5, text: "As someone who reviews menswear for a living, I can confidently say this brand delivers premium quality at accessible prices. The attention to detail is remarkable.", avatar: "KS" },
  { name: "Aditya Nair", role: "Architect", rating: 5, text: "The linen collection is sublime. Perfect for tropical climates without compromising on style. I get compliments every time I wear their shirts.", avatar: "AN" },
  { name: "Siddharth Roy", role: "Marketing VP", rating: 4, text: "Exceptional customer service and fast delivery. The shirts arrived perfectly packaged and the quality exceeded my expectations. A new go-to brand.", avatar: "SR" }
];

// Load admin-SavedData from localStorage, fallback to defaults
let PRODUCTS = JSON.parse(localStorage.getItem('pmcAdminProducts') || 'null') || [...DEFAULT_PRODUCTS];
let CATEGORIES = JSON.parse(localStorage.getItem('pmcAdminCategories') || 'null') || [...DEFAULT_CATEGORIES];

// ============================================================
// ADMIN STORE (saves to Firebase + localStorage)
// ============================================================

const AdminStore = {
  saveProducts() {
    localStorage.setItem('pmcAdminProducts', JSON.stringify(PRODUCTS));
    // Save to Firebase if available
    if (typeof FirebaseDB !== 'undefined') {
      FirebaseDB.saveProducts();
    }
  },
  saveCategories() {
    localStorage.setItem('pmcAdminCategories', JSON.stringify(CATEGORIES));
    // Save to Firebase if available
    if (typeof FirebaseDB !== 'undefined') {
      FirebaseDB.saveCategories();
    }
  },
  resetToDefaults() {
    PRODUCTS = [...DEFAULT_PRODUCTS];
    CATEGORIES = [...DEFAULT_CATEGORIES];
    localStorage.removeItem('pmcAdminProducts');
    localStorage.removeItem('pmcAdminCategories');
    // Reset Firebase too
    if (typeof FirebaseDB !== 'undefined') {
      FirebaseDB.saveProducts();
      FirebaseDB.saveCategories();
    }
  },
  getNextProductId() {
    return PRODUCTS.length > 0 ? Math.max(...PRODUCTS.map(p => p.id)) + 1 : 1;
  },
  exportData() {
    return JSON.stringify({ products: PRODUCTS, categories: CATEGORIES }, null, 2);
  },
  importData(json) {
    const data = JSON.parse(json);
    if (data.products && Array.isArray(data.products)) {
      PRODUCTS = data.products;
      this.saveProducts();
    }
    if (data.categories && Array.isArray(data.categories)) {
      CATEGORIES = data.categories;
      this.saveCategories();
    }
  }
};

// ============================================================
// DATA READY PROMISE
// ============================================================
// Pages should use: DataReady.then(() => { /* render content */ });
//
let DataReady;
if (typeof FirebaseDB !== 'undefined') {
  FirebaseDB.init();
  DataReady = FirebaseDB.ready;
} else {
  // No Firebase — data is already loaded from localStorage/defaults
  DataReady = Promise.resolve();
}

// ============================================================
// STATE MANAGEMENT (localStorage-based)
// ============================================================

const Store = {
  // CART
  getCart() {
    return JSON.parse(localStorage.getItem('pmcCart') || '[]');
  },
  saveCart(cart) {
    localStorage.setItem('pmcCart', JSON.stringify(cart));
    this._dispatch('cartUpdated');
  },
  addToCart(productId, size, color, qty = 1) {
    const cart = this.getCart();
    const existing = cart.find(i => i.productId === productId && i.size === size && i.color === color);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ productId, size, color, qty });
    }
    this.saveCart(cart);
    return cart;
  },
  removeFromCart(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    this.saveCart(cart);
    return cart;
  },
  updateCartQty(index, qty) {
    const cart = this.getCart();
    if (qty <= 0) { cart.splice(index, 1); }
    else { cart[index].qty = qty; }
    this.saveCart(cart);
    return cart;
  },
  getCartCount() {
    return this.getCart().reduce((sum, i) => sum + i.qty, 0);
  },
  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => {
      const p = getProduct(item.productId);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  },
  clearCart() {
    this.saveCart([]);
  },

  // WISHLIST
  getWishlist() {
    return JSON.parse(localStorage.getItem('pmcWishlist') || '[]');
  },
  saveWishlist(wl) {
    localStorage.setItem('pmcWishlist', JSON.stringify(wl));
    this._dispatch('wishlistUpdated');
  },
  toggleWishlist(productId) {
    const wl = this.getWishlist();
    const idx = wl.indexOf(productId);
    if (idx > -1) { wl.splice(idx, 1); }
    else { wl.push(productId); }
    this.saveWishlist(wl);
    return wl;
  },
  isInWishlist(productId) {
    return this.getWishlist().includes(productId);
  },
  getWishlistCount() {
    return this.getWishlist().length;
  },

  // AUTH
  getUser() {
    return JSON.parse(localStorage.getItem('pmcUser') || 'null');
  },
  login(userData) {
    localStorage.setItem('pmcUser', JSON.stringify(userData));
    this._dispatch('authUpdated');
  },
  logout() {
    localStorage.removeItem('pmcUser');
    this._dispatch('authUpdated');
  },
  isLoggedIn() {
    return !!this.getUser();
  },

  // ORDERS
  isValidOrder(order) {
    return order && order.id && order.date && order.total != null && Array.isArray(order.items) && order.items.length > 0;
  },
  getOrders() {
    return JSON.parse(localStorage.getItem('pmcOrders') || '[]');
  },
  getOrdersForUser(email) {
    if (!email) return this.getOrders();
    const all = this.getOrders();
    return all.filter(o => {
      const orderEmail = o.userEmail || (o.address && o.address.email) || '';
      return orderEmail.toLowerCase() === email.toLowerCase();
    });
  },
  addOrder(order) {
    // Tag with userEmail if not already set
    if (!order.userEmail) {
      const user = this.getUser();
      order.userEmail = (user && user.email) ? user.email.toLowerCase() : (order.address && order.address.email ? order.address.email.toLowerCase() : '');
    }
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem('pmcOrders', JSON.stringify(orders));
    // Always save to Firebase
    const email = order.userEmail || (order.address && order.address.email);
    if (email && typeof FirebaseOrders !== 'undefined') {
      FirebaseOrders.save(email, order);
    }
    return order;
  },

  // EVENT DISPATCH
  _dispatch(event) {
    window.dispatchEvent(new CustomEvent(event));
  }
};

// ============================================================
// USER ACCOUNTS DATABASE (localStorage-based)
// ============================================================

const UserDB = {
  _key: 'pmcUsersDB',
  getAll() {
    return JSON.parse(localStorage.getItem(this._key) || '[]');
  },
  _save(users) {
    localStorage.setItem(this._key, JSON.stringify(users));
  },
  findByEmail(email) {
    return this.getAll().find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  findByPhone(phone) {
    const clean = phone.replace(/\D/g, '');
    return this.getAll().find(u => u.phone.replace(/\D/g, '') === clean);
  },
  register({ name, email, phone, password }) {
    const users = this.getAll();
    // Duplicate checks
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'This email is already registered. Please login instead.' };
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone && users.find(u => u.phone.replace(/\D/g, '') === cleanPhone)) {
      return { ok: false, error: 'This phone number is already registered.' };
    }
    const user = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name, email: email.toLowerCase(), phone, password,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    this._save(users);
    return { ok: true, user };
  },
  authenticate(email, password) {
    const user = this.findByEmail(email);
    if (!user) return { ok: false, error: 'No account found with this email.' };
    if (user.password !== password) return { ok: false, error: 'Incorrect password. Please try again.' };
    return { ok: true, user };
  },
  updateUser(id, updates) {
    const users = this.getAll();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    Object.assign(users[idx], updates);
    this._save(users);
    return true;
  }
};

// UTILITY FUNCTIONS
function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

function getDiscount(original, current) {
  return Math.round(((original - current) / original) * 100);
}

function getStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function getProduct(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.fabric.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  ).slice(0, 8);
}

function generateOrderId() {
  return 'PMC' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
}
