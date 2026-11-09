export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: "Table Lamp" | "Pendant Light" | "Floor Lamp" | "Wall Sconce" | "Ambient Art";
  image: string;
  secondaryImage: string;
  gallery: string[];
  badge?: "Best Seller" | "Artisan Choice" | "New" | "Limited Edition";
  inStock: boolean;
  designer: string;
  dimensions: string;
  materials: string[];
  lumens: string;
  colorTemperature: string;
  wattage: string;
  description: string;
  features: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "solis-amber-table-lamp",
    name: "Solis Amber Luminaire",
    tagline: "Mouth-blown fluted amber glass with hand-finished spun brass base.",
    price: 340,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 84,
    category: "Table Lamp",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "Best Seller",
    inStock: true,
    designer: "Elena Rostova",
    dimensions: "H 38cm × W 24cm × D 24cm",
    materials: ["Mouth-blown Amber Glass", "Aged Brushed Brass", "Braided Cotton Cable"],
    lumens: "650 lm",
    colorTemperature: "2200K - 2700K Dimmable",
    wattage: "6W Integrated Warm LED",
    description:
      "The Solis Table Lamp is an homage to twilight. Sculpted from mouth-blown optic glass with ribbed contours that diffuse a warm golden glow across any bedside, credenza, or reading nook. Features our precision capacitive brass touch-dimmer.",
    features: [
      "Smooth capacitive 3-step touch dimming",
      "Hand-turned solid brass base with protective felt lining",
      "95+ High CRI for natural, calming evening ambiance",
      "Includes 2m braided amber textile cord",
    ],
  },
  {
    id: "aurora-pendant-orb",
    name: "Aurora Chandelier Orb",
    tagline: "Sculptural tiered pendant floating like a glowing sunset eclipse.",
    price: 680,
    originalPrice: 790,
    rating: 5.0,
    reviewsCount: 62,
    category: "Pendant Light",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "Artisan Choice",
    inStock: true,
    designer: "Mathias Lindqvist",
    dimensions: "H 52cm × Dia 45cm (Drop: Up to 250cm)",
    materials: ["Smoked Opaline Glass", "Matte Black Steel", "Patinated Brass Ring"],
    lumens: "1200 lm",
    colorTemperature: "2700K Warm Sunset",
    wattage: "14W Warm Core LED",
    description:
      "Suspended mid-air, the Aurora Pendant creates an architectural focal point above dining tables and high-ceiling living atriums. The inner amber core casts a tranquil radiance that mimics dusk light.",
    features: [
      "Adjustable drop height up to 2.5 meters",
      "Zero-flicker architectural dimmer compatible",
      "Individually inspected and signed by master glassblowers",
      "Universal canopy mount suitable for flat or angled ceilings",
    ],
  },
  {
    id: "arcadia-minimal-floor-lamp",
    name: "Arcadia Minimal Floor Arc",
    tagline: "Graceful cantilevered arch with counterweighted cast terracotta base.",
    price: 520,
    rating: 4.8,
    reviewsCount: 47,
    category: "Floor Lamp",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "New",
    inStock: true,
    designer: "Kaelen Thorne",
    dimensions: "H 195cm × Reach 120cm × Base Dia 36cm",
    materials: ["Cast Terracotta", "Powder-coated Carbon Steel", "Frosted Acrylic Lens"],
    lumens: "950 lm",
    colorTemperature: "2700K Warm Comfort",
    wattage: "12W High-Efficiency LED",
    description:
      "Designed to float gentle light over sofas, deep lounge chairs, or quiet library spaces without ceiling wiring. The heavy textured terracotta base provides rock-solid stability while introducing tactile organic warmth.",
    features: [
      "Discrete foot pedal switch with continuous rotary dimming",
      "Architectural curved arm with concealed wiring",
      "360-degree rotatable lamp shade",
      "Soft indirect glare-free downward warm glow",
    ],
  },
  {
    id: "vesper-brass-wall-sconce",
    name: "Vesper Sunset Sconce",
    tagline: "Radial disc wall sculpture that reflects warm indirect halo lighting.",
    price: 240,
    originalPrice: 290,
    rating: 4.9,
    reviewsCount: 93,
    category: "Wall Sconce",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "Best Seller",
    inStock: true,
    designer: "Atelier Vyqen",
    dimensions: "Dia 28cm × D 6.5cm",
    materials: ["Solid Spun Brass", "Internal Diffuser Plate"],
    lumens: "480 lm",
    colorTemperature: "2400K Sunset Gold",
    wattage: "5W Ambient LED",
    description:
      "Vesper transforms flat walls into living architectural canvases. Light radiates outwards in a soft solar ring, creating depth and a calming ambiance perfect for corridors, master bedrooms, and dining accents.",
    features: [
      "Hardwire or plug-in convertible installation",
      "Zero glare direct line-of-sight protection",
      "Solid brushed brass disc with clear protective micro-coat",
      "Moisture-rated for luxury powder rooms (IP44)",
    ],
  },
  {
    id: "terra-cordless-lantern",
    name: "Terra Cordless Portable Beacon",
    tagline: "Rechargeable tactile terracotta lamp for indoor tables and evening terraces.",
    price: 195,
    rating: 4.9,
    reviewsCount: 118,
    category: "Ambient Art",
    image: "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "Limited Edition",
    inStock: true,
    designer: "Noor Al-Mansoor",
    dimensions: "H 26cm × Dia 16cm",
    materials: ["Hand-thrown Terracotta", "Frosted Silicone Diffuser", "Brass Handle"],
    lumens: "350 lm",
    colorTemperature: "2000K Candlelight to 2700K",
    wattage: "3.5W Rechargeable Battery (Up to 24 hrs)",
    description:
      "Light that moves wherever you converse. Terra combines ancient ceramic pottery texture with cutting-edge lithium battery tech and warm glowing LED optics. Bring it to the dinner table, the balcony, or the bedside.",
    features: [
      "24-hour battery life on single USB-C fast charge",
      "Magnetic charging contact puck included",
      "Weather-resistant for garden dinners and covered patios",
      "Candle flicker effect mode and steady warm beam",
    ],
  },
  {
    id: "helios-linear-chandelier",
    name: "Helios Architectural Chandelier",
    tagline: "A sweeping horizontal bar of warm light enveloped in cognac glass globes.",
    price: 890,
    originalPrice: 1100,
    rating: 5.0,
    reviewsCount: 39,
    category: "Pendant Light",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "Artisan Choice",
    inStock: true,
    designer: "Sebastian Cruz",
    dimensions: "L 140cm × H 45cm × Dia 18cm globes",
    materials: ["Cognac Tinted Glass", "Anodized Warm Bronze", "Silicon Diffusers"],
    lumens: "2100 lm",
    colorTemperature: "2700K Warm Horizon",
    wattage: "24W Dimmable System",
    description:
      "Created for long dining tables, open kitchen islands, and expansive executive meeting suites. Helios balances five glowing cognac orbs across a slender bronze spine, evoking mid-century Danish refinement.",
    features: [
      "Fully dimmable with standard 0-10V or TRIAC wall dimmers",
      "Reinforced aircraft cable suspension",
      "Even, shadow-free warm light across tabletop surfaces",
      "Custom lengths available on bespoke architectural request",
    ],
  },
  {
    id: "nimbus-mushroom-accent",
    name: "Nimbus Smoked Mushroom Lamp",
    tagline: "Sensual organic silhouette casting a downward dome of serene amber warmth.",
    price: 285,
    rating: 4.8,
    reviewsCount: 71,
    category: "Table Lamp",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "New",
    inStock: true,
    designer: "Mia Dahl",
    dimensions: "H 32cm × Dia 26cm",
    materials: ["Smoked Glass Shade", "Solid Oak Pedestal", "Brass Accents"],
    lumens: "520 lm",
    colorTemperature: "2200K - 2800K",
    wattage: "5W LED",
    description:
      "A harmonious dialogue between smoked glass and turned natural oak. The Nimbus lamp shields direct bulb vision while flooding the tabletop with a gentle pool of warm orange glow.",
    features: [
      "Rotary brass dimmer wheel built into oak base",
      "FSC-certified sustainable European Oak",
      "Includes premium braided copper-tone power cable",
      "Anti-scratch padded base for delicate marble or wood",
    ],
  },
  {
    id: "dune-ceramic-monolith",
    name: "Dune Monolith Ambient Lamp",
    tagline: "Sculpted stoneware lamp that doubles as a minimalist gallery artifact.",
    price: 410,
    originalPrice: 480,
    rating: 4.9,
    reviewsCount: 53,
    category: "Ambient Art",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
    ],
    badge: "Limited Edition",
    inStock: true,
    designer: "Kenzo Takahashi",
    dimensions: "H 42cm × W 22cm × D 18cm",
    materials: ["Coarse Textured Terracotta", "Raw Linen Diffuser"],
    lumens: "600 lm",
    colorTemperature: "2500K Desert Sunset",
    wattage: "7W LED",
    description:
      "Inspired by the shifting shadows of desert sand dunes at golden hour. Each Dune lamp is hand-pinched and fired at low temperatures to preserve its raw, tactile earthy texture.",
    features: [
      "Each piece carries unique organic kiln markings",
      "Handcrafted unbleached linen diffuser shade",
      "Warm, meditative light output with zero glare",
      "Numbered certificate of authenticity included",
    ],
  },
];

