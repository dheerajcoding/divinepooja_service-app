/**
 * Idempotent Seed Script for Pujari Baba Pooja Catalogue
 * 
 * Usage: npm run seed
 * Or: node scripts/seed.js
 */

const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} = require('firebase/auth');
const {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} = require('firebase/firestore');

// Load environment variables from .env
const envPath = path.join(__dirname, '..', '.env');
const env = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        env[key] = val;
      }
    }
  });
}

const firebaseConfig = {
  apiKey: env.REACT_APP_FIREBASE_API_KEY || process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN || process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: env.REACT_APP_FIREBASE_PROJECT_ID || process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_FIREBASE_APP_ID || process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: env.REACT_APP_FIREBASE_MEASUREMENT_ID || process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// 16 Professional Catalog Poojas to Seed
const CATALOG_POOJAS = [
  {
    name: 'Navratri Durga Puja',
    category: 'Protection & Shakti',
    description:
      'Invoke the divine blessings of Maa Durga during Shardiya Navratri with a traditional Durga Puja performed by an experienced priest. The ceremony includes Ganesh Puja, Kalash Sthapana, Durga Mantra Jaap, Aarti and traditional offerings, performed according to traditional rituals.',
    price: 3100,
    originalPrice: 4000,
    duration: 2.5,
    rating: 4.9,
    reviews: 856,
    benefits: ['Protection', 'Strength', 'Peace', 'Prosperity', 'Removal of Negativity'],
    samagri: [
      'Maa Durga Idol/Image',
      'Kalash',
      'Coconut',
      'Mango Leaves',
      'Flowers',
      'Fruits',
      'Kumkum',
      'Roli',
      'Akshat',
      'Incense',
      'Ghee',
      'Diya',
      'Prasad',
    ],
    priest: 'Pandit Rajesh Sharma',
    experience: '12 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: true,
    image: '/images/image13.jpg',
  },
  {
    name: 'Maa Durga Ashtami Puja',
    category: 'Shakti & Protection',
    description:
      'Perform a sacred Maa Durga Ashtami Puja to seek the blessings of Goddess Durga for strength, protection and family well-being. The ceremony includes Durga mantra recitation, traditional offerings, devotional rituals and Maa Durga Aarti.',
    price: 3500,
    originalPrice: 4500,
    duration: 3,
    rating: 4.9,
    reviews: 742,
    benefits: ['Protection', 'Strength', 'Family Well-being', 'Peace', 'Positive Energy'],
    samagri: [
      'Red Chunri',
      'Flowers',
      'Coconut',
      'Fruits',
      'Kalash',
      'Kumkum',
      'Roli',
      'Akshat',
      'Diya',
      'Ghee',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Amit Kumar',
    experience: '10 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: true,
    image: '/images/durga_ashtami.jpg',
  },
  {
    name: 'Dussehra Ram Puja',
    category: 'Prosperity & Protection',
    description:
      'Celebrate Vijayadashami with a traditional Dussehra Puja dedicated to Lord Rama. The ceremony seeks blessings for victory over obstacles, righteousness, peace and prosperity and includes Lord Rama Puja, mantra recitation and Aarti.',
    price: 3100,
    originalPrice: 4000,
    duration: 2.5,
    rating: 4.9,
    reviews: 623,
    benefits: ['Victory', 'Protection', 'Success', 'Courage', 'Removal of Obstacles'],
    samagri: [
      'Lord Rama Image',
      'Flowers',
      'Fruits',
      'Coconut',
      'Kalash',
      'Roli',
      'Kumkum',
      'Akshat',
      'Incense',
      'Ghee',
      'Diya',
      'Prasad',
    ],
    priest: 'Pandit Vijay Singh',
    experience: '11 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: true,
    image: '/images/dussehra_ram_puja.jpg',
  },
  {
    name: 'Karwa Chauth Puja',
    category: 'Marriage & Family',
    description:
      'A traditional Karwa Chauth Puja performed for marital harmony, the well-being of the husband and the happiness and longevity of married life. The ceremony includes Ganesh Puja, Shiva-Parvati Puja, Karwa Puja, Chandra Dev Puja and traditional Aarti.',
    price: 2500,
    originalPrice: 3200,
    duration: 2,
    rating: 4.9,
    reviews: 918,
    benefits: ['Marital Harmony', 'Long Married Life', 'Family Happiness', 'Love', 'Well-being'],
    samagri: [
      'Karwa',
      'Roli',
      'Kumkum',
      'Akshat',
      'Mehendi',
      'Flowers',
      'Fruits',
      'Sweets',
      'Diya',
      'Incense',
      'Chunri',
      'Sindoor',
      'Prasad',
    ],
    priest: 'Pandit Rajesh Sharma',
    experience: '12 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: true,
    image: '/images/karwa_chauth.jpg',
  },
  {
    name: 'Dhanteras Lakshmi Kuber Puja',
    category: 'Wealth & Prosperity',
    description:
      'Invite abundance, prosperity and financial well-being into your home with a traditional Dhanteras Lakshmi Kuber Puja. The ceremony worships Goddess Lakshmi and Lord Kuber with traditional mantras, offerings and Aarti.',
    price: 4100,
    originalPrice: 5500,
    duration: 2.5,
    rating: 4.9,
    reviews: 687,
    benefits: ['Wealth', 'Prosperity', 'Financial Growth', 'Business Success', 'Abundance'],
    samagri: [
      'Lakshmi-Ganesha Idol',
      'Kuber Yantra',
      'Kalash',
      'Coconut',
      'Flowers',
      'Fruits',
      'Coins',
      'Rice',
      'Kumkum',
      'Roli',
      'Diya',
      'Ghee',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Amit Kumar',
    experience: '14 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: true,
    image: '/images/dhanteras_lakshmi_kuber.jpg',
  },
  {
    name: 'Diwali Lakshmi Ganesh Puja',
    category: 'Wealth & Prosperity',
    description:
      'Celebrate Diwali with a traditional Lakshmi Ganesh Puja performed to invite prosperity, happiness and positive energy into your home or workplace. The ceremony includes Ganesh Puja, Lakshmi Puja, Saraswati Puja, mantra recitation and Diwali Aarti.',
    price: 5100,
    originalPrice: 6500,
    duration: 2.5,
    rating: 5.0,
    reviews: 1247,
    benefits: ['Wealth', 'Prosperity', 'Success', 'Happiness', 'Business Growth', 'Peace'],
    samagri: [
      'Lakshmi-Ganesh Idols',
      'Saraswati Idol',
      'Kalash',
      'Coconut',
      'Flowers',
      'Fruits',
      'Sweets',
      'Coins',
      'Rice',
      'Kumkum',
      'Roli',
      'Diya',
      'Ghee',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Rajesh Sharma',
    experience: '15 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: true,
    image: '/images/diwali_lakshmi_ganesh.jpg',
  },
  {
    name: 'Diwali Business & Office Puja',
    category: 'Business & Prosperity',
    description:
      'A special Diwali Puja for shops, offices, businesses and commercial establishments. Seek blessings of Goddess Lakshmi, Lord Ganesha and Goddess Saraswati for prosperity, successful ventures and positive growth in the coming year.',
    price: 7500,
    originalPrice: 9500,
    duration: 3,
    rating: 4.9,
    reviews: 436,
    benefits: ['Business Growth', 'Wealth', 'Success', 'New Opportunities', 'Prosperity'],
    samagri: [
      'Lakshmi-Ganesh Idols',
      'Saraswati Idol',
      'Kalash',
      'Coconut',
      'Flowers',
      'Fruits',
      'Sweets',
      'Coins',
      'Accounting Books',
      'Kumkum',
      'Roli',
      'Rice',
      'Diya',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Ramesh Gupta',
    experience: '16 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: true,
    image: '/images/dhanteras_lakshmi_kuber.jpg',
  },
  {
    name: 'Govardhan Puja',
    category: 'Protection & Prosperity',
    description:
      'Perform a traditional Govardhan Puja dedicated to Lord Krishna to seek divine protection, prosperity and family well-being. The ceremony includes Krishna Puja, Govardhan Puja, Annakut offerings, mantra recitation and Aarti.',
    price: 3100,
    originalPrice: 4000,
    duration: 2,
    rating: 4.9,
    reviews: 512,
    benefits: ['Protection', 'Prosperity', 'Family Happiness', 'Abundance', 'Peace'],
    samagri: [
      'Lord Krishna Idol',
      'Annakut Bhog',
      'Flowers',
      'Fruits',
      'Milk',
      'Curd',
      'Ghee',
      'Honey',
      'Tulsi',
      'Coconut',
      'Kalash',
      'Diya',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Vijay Singh',
    experience: '11 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: true,
    image: '/images/govardhan_puja.jpg',
  },
  {
    name: 'Bhai Dooj Puja',
    category: 'Family & Well-being',
    description:
      'Celebrate the sacred bond between brothers and sisters with a traditional Bhai Dooj Puja. The ceremony seeks blessings for the brother\'s health, longevity, happiness and prosperity while celebrating the timeless bond of sibling love.',
    price: 2100,
    originalPrice: 2800,
    duration: 1.5,
    rating: 4.9,
    reviews: 381,
    benefits: ['Sibling Bond', 'Protection', 'Health', 'Longevity', 'Family Happiness'],
    samagri: [
      'Roli',
      'Kumkum',
      'Akshat',
      'Diya',
      'Flowers',
      'Fruits',
      'Sweets',
      'Coconut',
      'Kalash',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Sanjay Mishra',
    experience: '9 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: true,
    image: '/images/bhai_dooj.jpg',
  },
  {
    name: 'Chhath Puja',
    category: 'Health & Family',
    description:
      'A traditional Chhath Puja dedicated to Surya Dev and Chhathi Maiya, performed with devotion for health, prosperity, family well-being and gratitude. The ceremony includes traditional offerings, Surya Arghya and devotional prayers.',
    price: 3100,
    originalPrice: 4000,
    duration: 2.5,
    rating: 4.9,
    reviews: 562,
    benefits: ['Health', 'Family Well-being', 'Prosperity', 'Happiness', 'Positive Energy'],
    samagri: [
      'Thekua',
      'Fruits',
      'Sugarcane',
      'Coconut',
      'Diya',
      'Flowers',
      'Bamboo Basket',
      'Kalash',
      'Roli',
      'Akshat',
      'Prasad',
    ],
    priest: 'Pandit Ramesh Gupta',
    experience: '14 years',
    languages: ['Hindi', 'Sanskrit', 'Bhojpuri'],
    isPopular: true,
    isOffer: true,
    image: '/images/chhath_puja.jpg',
  },
  {
    name: 'Mahamrityunjaya Jaap & Shiv Puja',
    category: 'Health & Protection',
    description:
      'A sacred Mahamrityunjaya Jaap and Shiva Puja performed with traditional Vedic mantras and offerings. The ceremony is undertaken by devotees seeking spiritual strength, peace, well-being and protection.',
    price: 5100,
    originalPrice: 6500,
    duration: 3,
    rating: 4.9,
    reviews: 624,
    benefits: ['Health', 'Peace', 'Protection', 'Spiritual Strength', 'Positive Energy'],
    samagri: [
      'Shivling',
      'Gangajal',
      'Milk',
      'Curd',
      'Honey',
      'Ghee',
      'Bel Patra',
      'Flowers',
      'Fruits',
      'Dhatura',
      'Coconut',
      'Kalash',
      'Diya',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Rajesh Sharma',
    experience: '18 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: false,
    image: '/images/mahamrityunjaya_shiv.jpg',
  },
  {
    name: 'Satyanarayan Katha & Puja',
    category: 'Prosperity & Family',
    description:
      'A traditional Shri Satyanarayan Katha and Puja performed to seek the blessings of Lord Vishnu for peace, prosperity and family well-being. The ceremony includes Ganesh Puja, Kalash Puja, Satyanarayan Katha, Aarti and Prasad.',
    price: 3500,
    originalPrice: 4500,
    duration: 3,
    rating: 4.9,
    reviews: 1247,
    benefits: ['Prosperity', 'Peace', 'Family Happiness', 'Success', 'Spiritual Well-being'],
    samagri: [
      'Lord Vishnu Image',
      'Kalash',
      'Coconut',
      'Banana',
      'Fruits',
      'Panchamrit',
      'Tulsi',
      'Flowers',
      'Rice',
      'Kumkum',
      'Roli',
      'Diya',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Rajesh Sharma',
    experience: '15 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: false,
    image: '/images/image15.png',
  },
  {
    name: 'Griha Pravesh Puja',
    category: 'Home & Prosperity',
    description:
      'Begin a new chapter in your home with a traditional Griha Pravesh Puja. The ceremony is performed to seek blessings for peace, prosperity, protection and positive energy in the new home and includes Ganesh Puja, Vastu Puja, Kalash Sthapana, Navgraha Puja and Havan.',
    price: 7100,
    originalPrice: 9000,
    duration: 4,
    rating: 4.9,
    reviews: 734,
    benefits: ['Home Protection', 'Peace', 'Prosperity', 'Positive Energy', 'Family Happiness'],
    samagri: [
      'Kalash',
      'Coconut',
      'Mango Leaves',
      'Navadhanya',
      'Havan Samagri',
      'Ghee',
      'Flowers',
      'Fruits',
      'Rice',
      'Kumkum',
      'Roli',
      'Vastu Yantra',
      'Diya',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Ramesh Gupta',
    experience: '18 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: false,
    image: '/images/image16.jpg',
  },
  {
    name: 'Vastu Shanti Puja',
    category: 'Vastu & Protection',
    description:
      'A traditional Vastu Shanti Puja performed to establish harmony and positive energy within a home or property. The ceremony includes Ganesh Puja, Vastu Devta Puja, Navgraha Puja, Havan and traditional Vedic mantras.',
    price: 6100,
    originalPrice: 8000,
    duration: 3.5,
    rating: 4.9,
    reviews: 486,
    benefits: ['Peace', 'Harmony', 'Protection', 'Positive Energy', 'Prosperity'],
    samagri: [
      'Vastu Yantra',
      'Kalash',
      'Coconut',
      'Mango Leaves',
      'Navadhanya',
      'Havan Samagri',
      'Ghee',
      'Flowers',
      'Fruits',
      'Rice',
      'Kumkum',
      'Roli',
      'Diya',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Amit Kumar',
    experience: '16 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: false,
    isOffer: false,
    image: '/images/govardhan_puja.jpg',
  },
  {
    name: 'Ganesh Lakshmi Business Puja',
    category: 'Business & Prosperity',
    description:
      'A traditional Ganesh Lakshmi Puja for entrepreneurs, shop owners and businesses seeking blessings for prosperity, success and removal of obstacles. The ceremony combines Lord Ganesha and Goddess Lakshmi Puja with traditional mantras, offerings and Aarti.',
    price: 4100,
    originalPrice: 5500,
    duration: 2.5,
    rating: 4.9,
    reviews: 395,
    benefits: ['Business Growth', 'Wealth', 'Success', 'New Opportunities', 'Removal of Obstacles'],
    samagri: [
      'Lakshmi-Ganesh Idols',
      'Kalash',
      'Coconut',
      'Flowers',
      'Fruits',
      'Sweets',
      'Coins',
      'Rice',
      'Kumkum',
      'Roli',
      'Diya',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Sanjay Mishra',
    experience: '13 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: true,
    isOffer: false,
    image: '/images/dhanteras_lakshmi_kuber.jpg',
  },
  {
    name: 'Navgraha Shanti Puja',
    category: 'Astrology & Well-being',
    description:
      'A traditional Navgraha Shanti Puja performed to seek harmony and balance through prayers to the nine planetary deities. The ceremony includes Navgraha Puja, mantra recitation, offerings and Havan according to traditional practices.',
    price: 7100,
    originalPrice: 9000,
    duration: 4,
    rating: 4.9,
    reviews: 318,
    benefits: ['Peace', 'Stability', 'Success', 'Well-being', 'Positive Energy'],
    samagri: [
      'Navgraha Items',
      'Kalash',
      'Nine Grains',
      'Flowers',
      'Fruits',
      'Havan Samagri',
      'Ghee',
      'Rice',
      'Kumkum',
      'Roli',
      'Diya',
      'Incense',
      'Prasad',
    ],
    priest: 'Pandit Vijay Singh',
    experience: '20 years',
    languages: ['Hindi', 'Sanskrit'],
    isPopular: false,
    isOffer: false,
    image: '/images/mahamrityunjaya_shiv.jpg',
  },
];

const slugify = (str) =>
  String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const arePoojasEqual = (a, b) => {
  if (slugify(a.name) !== slugify(b.name)) return false;
  if (a.price !== b.price) return false;
  if (a.originalPrice !== b.originalPrice) return false;
  if (a.duration !== b.duration) return false;
  if (a.category !== b.category) return false;
  if (a.rating !== b.rating) return false;
  if (a.reviews !== b.reviews) return false;
  if (a.isPopular !== b.isPopular) return false;
  if (a.isOffer !== b.isOffer) return false;
  if (a.priest !== b.priest) return false;
  if (a.experience !== b.experience) return false;
  if (a.image !== b.image) return false;
  if (a.description !== b.description) return false;
  if (JSON.stringify(a.benefits || []) !== JSON.stringify(b.benefits || [])) return false;
  if (JSON.stringify(a.samagri || []) !== JSON.stringify(b.samagri || [])) return false;
  if (JSON.stringify(a.languages || []) !== JSON.stringify(b.languages || [])) return false;
  return true;
};

// Authenticate helper to enable Firestore write
const authenticateForFirestore = async (auth) => {
  const seedEmail = 'admin_seeder@pujaribaba.com';
  const seedPass = 'SeedAdmin@PujariBaba2026';
  try {
    const cred = await signInWithEmailAndPassword(auth, seedEmail, seedPass);
    return cred.user;
  } catch (err) {
    if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
      try {
        const cred = await createUserWithEmailAndPassword(auth, seedEmail, seedPass);
        return cred.user;
      } catch (createErr) {
        console.warn('Could not create seed auth user:', createErr.message);
      }
    }
    return null;
  }
};

async function main() {
  console.log('====================================================');
  console.log('🕉️ Pujari Baba - Professional Pooja Catalogue Seeder');
  console.log('====================================================\n');

  let remoteSiteDoc = null;
  let authUser = null;
  let db = null;
  let auth = null;

  const isConfigured = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

  if (isConfigured) {
    try {
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
      auth = getAuth(app);

      // Fetch current Firestore site/data
      const snap = await getDoc(doc(db, 'site', 'data'));
      if (snap.exists()) {
        remoteSiteDoc = snap.data();
        console.log(`📡 Connected to Firestore (${firebaseConfig.projectId}). Current poojas in cloud: ${remoteSiteDoc.poojas?.length || 0}`);
      } else {
        console.log(`📡 Connected to Firestore (${firebaseConfig.projectId}). No site/data document found, initializing.`);
      }
    } catch (err) {
      console.warn('⚠️ Could not connect to Firestore:', err.message);
    }
  }

  // Load local src/data.js poojas as baseline if needed
  let existingPoojas = [];
  if (Array.isArray(remoteSiteDoc?.poojas) && remoteSiteDoc.poojas.length > 0) {
    existingPoojas = [...remoteSiteDoc.poojas];
  } else {
    // Read from src/data.js
    const dataJsPath = path.join(__dirname, '..', 'src', 'data.js');
    if (fs.existsSync(dataJsPath)) {
      const content = fs.readFileSync(dataJsPath, 'utf8');
      const match = content.match(/export const dummyPoojas = (\[[\s\S]*?\]);/);
      if (match) {
        try {
          // evaluate dummyPoojas
          existingPoojas = eval(match[1]);
        } catch {
          existingPoojas = [];
        }
      }
    }
  }

  console.log(`🔍 Baseline poojas count before seed: ${existingPoojas.length}`);
  existingPoojas.forEach((p) => {
    console.log(`   - [ID: ${p.id}] ${p.name} (${p.category || 'No category'})`);
  });

  // Calculate next ID
  let nextId = existingPoojas.length ? Math.max(...existingPoojas.map((i) => Number(i.id) || 0)) + 1 : 1;

  let insertedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  const finalPoojas = [...existingPoojas];

  CATALOG_POOJAS.forEach((catalogPooja) => {
    const catalogSlug = slugify(catalogPooja.name);
    const existingIndex = finalPoojas.findIndex((p) => slugify(p.name) === catalogSlug);

    if (existingIndex !== -1) {
      const existing = finalPoojas[existingIndex];
      if (arePoojasEqual(existing, { ...catalogPooja, id: existing.id })) {
        skippedCount++;
      } else {
        finalPoojas[existingIndex] = {
          ...catalogPooja,
          id: existing.id,
        };
        updatedCount++;
        console.log(`🔄 Updated existing: "${catalogPooja.name}" (ID: ${existing.id})`);
      }
    } else {
      const newPooja = {
        ...catalogPooja,
        id: nextId++,
      };
      finalPoojas.push(newPooja);
      insertedCount++;
      console.log(`✨ Inserted new: "${newPooja.name}" (Assigned ID: ${newPooja.id})`);
    }
  });

  console.log('\n----------------------------------------------------');
  console.log(`📊 Seed Summary:`);
  console.log(`   - Inserted : ${insertedCount}`);
  console.log(`   - Updated  : ${updatedCount}`);
  console.log(`   - Skipped  : ${skippedCount} (already exact match)`);
  console.log(`   - Total    : ${finalPoojas.length} poojas in catalogue`);
  console.log('----------------------------------------------------\n');

  // Prepare full site state
  const updatedSiteData = {
    ...(remoteSiteDoc || {}),
    poojas: finalPoojas,
    packages: remoteSiteDoc?.packages || [
      {
        id: 1,
        name: 'Family Blessing Package',
        description: 'Complete pooja package for family prosperity and well-being',
        poojas: ['Satyanarayan Pooja', 'Ganesh Pooja'],
        originalPrice: 4000,
        discountedPrice: 3500,
        savings: 500,
        features: ['2 Experienced Priests', 'Complete Samagri', 'Prasad Distribution', 'Family Counseling'],
      },
      {
        id: 2,
        name: 'Wealth & Success Bundle',
        description: 'Combined pooja for wealth attraction and success',
        poojas: ['Lakshmi Pooja', 'Ganesh Pooja'],
        originalPrice: 3500,
        discountedPrice: 3000,
        savings: 500,
        features: ['Premium Priest', 'Gold-plated Items', 'Wealth Yantra', 'Success Mantras'],
      },
      {
        id: 3,
        name: 'Complete Spiritual Package',
        description: 'Comprehensive spiritual cleansing and blessing ceremony',
        poojas: ['Satyanarayan Pooja', 'Vishnu Pooja', 'Durga Pooja'],
        originalPrice: 8800,
        discountedPrice: 7500,
        savings: 1300,
        features: ['Senior Priest', 'Complete Samagri Kit', 'Spiritual Consultation', 'Follow-up Prayers'],
      },
    ],
    testimonials: remoteSiteDoc?.testimonials || [
      {
        id: 1,
        name: 'Mrs. Priya Sharma',
        location: 'South Delhi, New Delhi',
        rating: 5,
        text: 'We booked Pandit Ji for our new home Griha Pravesh & Satyanarayan Katha. Pandit Ji arrived 20 minutes early with fresh flowers and all pure samagri. The Vedic chanting was deeply spiritual and our entire family felt blessed.',
        pooja: 'Griha Pravesh & Satyanarayan',
        date: '15 Jan 2026',
        verified: true,
      },
    ],
    stats: remoteSiteDoc?.stats || {
      totalPoojas: 1247,
      happyCustomers: 892,
      experiencedPriests: 15,
      yearsOfService: 1,
    },
  };

  // 1. Write to Firestore if configured
  if (isConfigured && db && auth) {
    try {
      console.log('🔐 Authenticating for Firestore write...');
      authUser = await authenticateForFirestore(auth);
      if (authUser) {
        await setDoc(doc(db, 'site', 'data'), updatedSiteData, { merge: false });
        console.log('✅ Firestore document "site/data" updated successfully!');
        await signOut(auth);
      } else {
        console.warn('⚠️ Could not authenticate with Firebase. Firestore write skipped.');
      }
    } catch (fsErr) {
      console.error('❌ Failed to update Firestore:', fsErr.message);
    }
  }

  // 2. Write to src/data.js
  const dataJsPath = path.join(__dirname, '..', 'src', 'data.js');
  try {
    let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
    const poojasJsString = `export const dummyPoojas = ${JSON.stringify(finalPoojas, null, 2)};`;
    dataJsContent = dataJsContent.replace(/export const dummyPoojas = \[[\s\S]*?\];/m, poojasJsString);
    fs.writeFileSync(dataJsPath, dataJsContent, 'utf8');
    console.log(`✅ File updated: ${path.relative(process.cwd(), dataJsPath)}`);
  } catch (err) {
    console.error('❌ Failed to update src/data.js:', err.message);
  }

  // 3. Write backup export file public/seed-data.json
  const backupPath = path.join(__dirname, '..', 'public', 'seed-data.json');
  try {
    fs.writeFileSync(backupPath, JSON.stringify(updatedSiteData, null, 2), 'utf8');
    console.log(`✅ Seed backup generated: ${path.relative(process.cwd(), backupPath)}`);
  } catch (err) {
    console.error('❌ Failed to write backup file:', err.message);
  }

  console.log('\n🎉 Seed process completed successfully!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error during seeding:', err);
  process.exit(1);
});
