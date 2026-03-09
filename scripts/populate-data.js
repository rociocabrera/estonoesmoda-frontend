import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { config } from 'dotenv';

// Load environment variables
config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Categories to create
const categories = [
  { name: "Tops y Camisas", slug: "tops-y-camisas" },
  { name: "Faldas", slug: "faldas" },
  { name: "Pantalones y Jeans", slug: "pantalones-y-jeans" },
  { name: "Abrigos y Blazers", slug: "abrigos-y-blazers" },
  { name: "Vestidos", slug: "vestidos" },
  { name: "Shorts", slug: "shorts" },
  { name: "Accesorios", slug: "accesorios" },
];

// Products to create (with placeholder images from Unsplash)
const products = [
  // Abrigos y Blazers
  {
    title: "Chaqueta Denim Clásica",
    name: "Chaqueta Denim",
    slug: "chaqueta-denim-clasica",
    description: "Chaqueta de jean clásica en azul índigo. Un básico atemporal que combina con todo. Perfecta para looks casuales y versátiles.",
    price: 8000,
    category: "abrigos-y-blazers",
    img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500",
    images: ["https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500"],
    isNew: true
  },
  {
    title: "Blazer Terciopelo Bordeaux",
    name: "Blazer Terciopelo",
    slug: "blazer-terciopelo-bordeaux",
    description: "Elegante blazer de terciopelo en tono bordeaux con cuello de piel. Ideal para ocasiones especiales y noches de invierno.",
    price: 12000,
    category: "abrigos-y-blazers",
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"],
    isNew: false
  },
  {
    title: "Sweater Turquesa",
    name: "Sweater Turquesa",
    slug: "sweater-turquesa",
    description: "Sweater suave en vibrante tono turquesa. Cómodo y abrigado, perfecto para los días frescos.",
    price: 5000,
    category: "abrigos-y-blazers",
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"],
    isNew: false
  },
  {
    title: "Blazer Gris Formal",
    name: "Blazer Gris",
    slug: "blazer-gris-formal",
    description: "Blazer gris de corte clásico. Versátil para oficina o eventos semi-formales. Elegancia atemporal.",
    price: 10000,
    category: "abrigos-y-blazers",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500"],
    isNew: false
  },

  // Tops y Camisas
  {
    title: "Camisa Floral Vintage",
    name: "Camisa Floral",
    slug: "camisa-floral-vintage",
    description: "Camisa con estampado floral de inspiración vintage. Romántica y femenina, perfecta para cualquier ocasión.",
    price: 6000,
    category: "tops-y-camisas",
    img: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=500",
    images: ["https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=500"],
    isNew: true
  },
  {
    title: "Top Rosa Tejido",
    name: "Top Rosa",
    slug: "top-rosa-tejido",
    description: "Top tejido en delicado tono rosa. Suave al tacto y con un estilo dulce y femenino.",
    price: 4000,
    category: "tops-y-camisas",
    img: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500",
    images: ["https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500"],
    isNew: false
  },
  {
    title: "Blusa Negra Transparente",
    name: "Blusa Negra",
    slug: "blusa-negra-transparente",
    description: "Blusa elegante en tela transparente negra. Sofisticada y moderna, ideal para salidas nocturnas.",
    price: 5000,
    category: "tops-y-camisas",
    img: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=500",
    images: ["https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=500"],
    isNew: false
  },
  {
    title: "Top Estampado Tropical",
    name: "Top Tropical",
    slug: "top-estampado-tropical",
    description: "Top con vibrante estampado tropical. Colores alegres que destacan en cualquier look veraniego.",
    price: 5500,
    category: "tops-y-camisas",
    img: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=500",
    images: ["https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=500"],
    isNew: true
  },

  // Faldas
  {
    title: "Falda Gris Larga",
    name: "Falda Gris",
    slug: "falda-gris-larga",
    description: "Falda larga en tono gris con elegante abertura lateral. Sofisticada y versátil.",
    price: 6000,
    category: "faldas",
    img: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj78?w=500",
    images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0uj78?w=500"],
    isNew: false
  },
  {
    title: "Falda Violeta con Botones",
    name: "Falda Violeta",
    slug: "falda-violeta-botones",
    description: "Falda en llamativo tono violeta con detalle de botones. Un toque de color para tu guardarropa.",
    price: 5500,
    category: "faldas",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"],
    isNew: true
  },
  {
    title: "Falda Tweed Gris",
    name: "Falda Tweed",
    slug: "falda-tweed-gris",
    description: "Elegante falda de tweed gris. Textura clásica que aporta sofisticación a cualquier outfit.",
    price: 6500,
    category: "faldas",
    img: "https://images.unsplash.com/photo-1592301933927-35b597393c0a?w=500",
    images: ["https://images.unsplash.com/photo-1592301933927-35b597393c0a?w=500"],
    isNew: false
  },

  // Pantalones y Jeans
  {
    title: "Jean Azul Clásico",
    name: "Jean Azul",
    slug: "jean-azul-clasico",
    description: "Jean azul de corte clásico. Un básico esencial que nunca pasa de moda. Cómodo y duradero.",
    price: 6000,
    category: "pantalones-y-jeans",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"],
    isNew: false
  },
  {
    title: "Pantalón Cuadros Marrón",
    name: "Pantalón Cuadros",
    slug: "pantalon-cuadros-marron",
    description: "Pantalón con estampado de cuadros en tonos marrón. Estilo clásico con un toque moderno.",
    price: 5500,
    category: "pantalones-y-jeans",
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"],
    isNew: false
  },
  {
    title: "Pantalón Gris Oliva",
    name: "Pantalón Oliva",
    slug: "pantalon-gris-oliva",
    description: "Pantalón en elegante tono gris oliva. Corte cómodo y color versátil para múltiples combinaciones.",
    price: 5000,
    category: "pantalones-y-jeans",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
    images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500"],
    isNew: false
  },

  // Shorts
  {
    title: "Short Rojo con Pinzas",
    name: "Short Rojo",
    slug: "short-rojo-pinzas",
    description: "Short en vibrante rojo con elegantes pinzas. Perfecto para destacar con un look veraniego y chic.",
    price: 4500,
    category: "shorts",
    img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500",
    images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500"],
    isNew: true
  },
  {
    title: "Short Cuadros Blanco y Negro",
    name: "Short Cuadros",
    slug: "short-cuadros-bn",
    description: "Short con clásico estampado de cuadros en blanco y negro. Elegante y fácil de combinar.",
    price: 4000,
    category: "shorts",
    img: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=500",
    images: ["https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=500"],
    isNew: false
  },

  // Vestidos
  {
    title: "Vestido Rayas Rosa",
    name: "Vestido Rayas",
    slug: "vestido-rayas-rosa",
    description: "Vestido con delicadas rayas en tono rosa. Fresco y femenino, ideal para días de primavera.",
    price: 7000,
    category: "vestidos",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"],
    isNew: false
  },
  {
    title: "Vestido Gris Elegante",
    name: "Vestido Gris",
    slug: "vestido-gris-elegante",
    description: "Vestido en sofisticado tono gris. Corte elegante perfecto para oficina o eventos formales.",
    price: 8000,
    category: "vestidos",
    img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
    images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500"],
    isNew: false
  },
  {
    title: "Vestido Étnico con Botones",
    name: "Vestido Étnico",
    slug: "vestido-etnico-botones",
    description: "Vestido con hermoso estampado étnico y detalle de botones. Único y llamativo para ocasiones especiales.",
    price: 9000,
    category: "vestidos",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500",
    images: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500"],
    isNew: true
  },
  {
    title: "Vestido Negro con Plumas",
    name: "Vestido Plumas",
    slug: "vestido-negro-plumas",
    description: "Elegante vestido negro con delicados detalles de plumas. Perfecto para eventos de gala y noches especiales.",
    price: 15000,
    category: "vestidos",
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
    images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500"],
    isNew: false
  },

  // Accesorios (ejemplo)
  {
    title: "Pañuelo Estampado Vintage",
    name: "Pañuelo Vintage",
    slug: "panuelo-estampado-vintage",
    description: "Pañuelo de seda con estampado vintage. Perfecto para añadir un toque elegante a cualquier outfit. Versátil: usalo en el cuello, como vincha o en tu cartera.",
    price: 3500,
    category: "accesorios",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"],
    isNew: true
  }
];

async function createCategories() {
  console.log("📁 Creando categorías...\n");
  const categoryIds = {};

  for (const category of categories) {
    // Check if category already exists
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef, where("slug", "==", category.slug));
    const existing = await getDocs(q);

    if (existing.empty) {
      const docRef = await addDoc(categoriesRef, category);
      categoryIds[category.slug] = docRef.id;
      console.log(`✅ Categoría creada: ${category.name}`);
    } else {
      categoryIds[category.slug] = existing.docs[0].id;
      console.log(`⏭️  Categoría ya existe: ${category.name}`);
    }
  }

  return categoryIds;
}

async function createProducts(categoryIds) {
  console.log("\n📦 Creando productos...\n");

  for (const product of products) {
    // Check if product already exists
    const productsRef = collection(db, "items");
    const q = query(productsRef, where("slug", "==", product.slug));
    const existing = await getDocs(q);

    if (existing.empty) {
      const productData = {
        ...product,
        category: product.category // Keep slug for category reference
      };
      await addDoc(productsRef, productData);
      console.log(`✅ Producto creado: ${product.title}`);
    } else {
      console.log(`⏭️  Producto ya existe: ${product.title}`);
    }
  }
}

async function main() {
  console.log("🚀 Iniciando población de datos...\n");
  console.log("=".repeat(50) + "\n");

  try {
    const categoryIds = await createCategories();
    await createProducts(categoryIds);

    console.log("\n" + "=".repeat(50));
    console.log("\n✨ ¡Datos creados exitosamente!");
    console.log(`   - ${categories.length} categorías`);
    console.log(`   - ${products.length} productos\n`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
