// Restaurant info, store settings, delivery zones and the full menu.
// Values are the original site's own data. Edit here only.

window.RESTAURANT = {
  phone: "0799371612",
  instagram: "https://www.instagram.com/pizzanuralhuna?igsh=a3pxYmNpa3cydTk2",
  maps: "https://www.google.com/maps/search/?api=1&query=Noor%20AlHana%20Pastries&query_place_id=ChIJO3i09VefHBURC3CDyGA68Jk",
  facebook: "https://www.facebook.com/share/1D9UgEW6wP/",
  location: {
    ar: "عمان ضاحية الرشيد مقابل مدارس الريادة",
    en: "Amman, Dhahiyat Al-Rasheed, opposite Al-Riyada Schools"
  },
  timeZone: "Asia/Amman"
};

// Store settings (on the original site these come from the admin panel)
window.STORE_SETTINGS = {
  menu_discount_enabled: false,
  menu_discount_percent: 5,
  busy: false,
  accepting_orders: true,
  open_time: "09:30:00",
  close_time: "22:00:00",
  prep_minutes: 25,
  notice: "التوصيل خلال 30 دقيقة",
  notice_en: "Delivery within 30 minutes",
  busy_until: null,
  friday_open_time: "10:00:00",
  friday_close_time: "15:00:00"
};

// Item ids listed here are hidden from the menu (sold out)
window.UNAVAILABLE_ITEMS = [];

window.DELIVERY_ZONES = [
  { id: "inside", name: "داخل ضاحية الرشيد", fee: 1, sort_order: 1, active: true },
  { id: "mansour", name: "حي المنصور", fee: 2, sort_order: 2, active: true },
  { id: "zuwaytina", name: "أم زويتينة", fee: 2, sort_order: 3, active: true },
  { id: "outside", name: "خارج ضاحية الرشيد", fee: 3, sort_order: 4, active: true }
];

window.MENU = {
  PIZZA_TYPES: [
    { id: "khodar", name: "خضار", nameEn: "Veggie", desc: "صوص، زيتون، فليفلة، فطر، موزريلا", descEn: "Sauce, olives, peppers, mushrooms, mozzarella" },
    { id: "salami", name: "سلامي", nameEn: "Salami", desc: "صوص، سلامي، موزريلا", descEn: "Sauce, salami, mozzarella", badge: "best" },
    { id: "alfredo", name: "الفريدو", nameEn: "Alfredo", desc: "كريمة، دجاج، فطر، موزريلا", descEn: "Cream, chicken, mushrooms, mozzarella" },
    { id: "ranger", name: "زنجر", nameEn: "Zinger", desc: "صوص، زنجر، موزريلا", descEn: "Sauce, zinger, mozzarella" },
    { id: "bbq", name: "باربيكيو", nameEn: "BBQ", desc: "صوص، دجاج، موزريلا، صوص الباربيكيو", descEn: "Sauce, chicken, mozzarella, BBQ sauce" },
    { id: "supreme-meat", name: "سبريم لحمة", nameEn: "Supreme Meat", desc: "صوص، قطع لحمة، زيتون، فليفلة، موزريلا", descEn: "Sauce, meat chunks, olives, peppers, mozzarella" },
    { id: "peproni", name: "بروني", nameEn: "Pepperoni", desc: "صوص، قطع البروني، موزريلا", descEn: "Sauce, pepperoni, mozzarella" },
    { id: "turkey", name: "تركي", nameEn: "Turkey", desc: "صوص، تركي، زيتون، موزريلا", descEn: "Sauce, turkey, olives, mozzarella" },
    { id: "supreme-salami", name: "سبريم سلامي", nameEn: "Supreme Salami", desc: "صوص، سلامي، تركي، فليفلة، زيتون، موزريلا", descEn: "Sauce, salami, turkey, peppers, olives, mozzarella" },
    { id: "chicken-veg", name: "دجاج بالخضار", nameEn: "Chicken & Veggies", desc: "صوص، دجاج، فليفلة، زيتون، موزريلا", descEn: "Sauce, chicken, peppers, olives, mozzarella" },
    { id: "corn", name: "ذرة", nameEn: "Corn", desc: "صوص، ذرة، زيتون، موزريلا", descEn: "Sauce, corn, olives, mozzarella" },
    { id: "hawaii", name: "هاواي", nameEn: "Hawaiian", desc: "صوص، سلامي، قطع الأناناس، موزريلا", descEn: "Sauce, salami, pineapple chunks, mozzarella" },
    { id: "nour-alhana", name: "نور الهنا", nameEn: "Nour El Hana", desc: "صوص، سلامي، تركي، زيتون، فليفلة، زنجر، موزريلا", descEn: "Sauce, salami, turkey, olives, peppers, zinger, mozzarella", badge: "chef" },
    { id: "four-seasons", name: "الفصول الأربعة", nameEn: "Four Seasons", desc: "كل قسم على حدا: خضار، سلامي، تركي، مارغريتا", descEn: "Four sections: veggie, salami, turkey, margherita" },
    { id: "mix-cheese", name: "مكس أجبان", nameEn: "Mix Cheese", desc: "صوص، موزريلا، جبنة شدر، جبنة القشقوان", descEn: "Sauce, mozzarella, cheddar, kashkawan cheese", badge: "best" },
    { id: "meat", name: "لحمة", nameEn: "Meat", desc: "صوص، قطع اللحم، موزريلا", descEn: "Sauce, meat chunks, mozzarella" },
    { id: "fajita", name: "فاهيتا", nameEn: "Fajita", desc: "صوص، دجاج، فليفلة، بصل، موزريلا", descEn: "Sauce, chicken, peppers, onion, mozzarella", badge: "best" },
    { id: "margarita", name: "مارغريتا", nameEn: "Margherita", desc: "صوص، موزريلا", descEn: "Sauce, mozzarella" },
    { id: "hotdog", name: "هوت دوغ", nameEn: "Hot Dog", desc: "صوص، هوت دوغ، زيتون، موزريلا", descEn: "Sauce, hot dog, olives, mozzarella" }
  ],

  PIZZA_SIZES: [
    { id: "small", name: "بيتزا صغير", nameEn: "Small Pizza", price: 2 },
    { id: "medium", name: "بيتزا وسط", nameEn: "Medium Pizza", price: 3 },
    { id: "large", name: "بيتزا كبير", nameEn: "Large Pizza", price: 5 }
  ],

  OFFERS: [
    { id: "offer-small", name: "3 بيتزا صغير", nameEn: "3 Small Pizzas", price: 5, size: "small", count: 3 },
    { id: "offer-medium", name: "3 بيتزا وسط", nameEn: "3 Medium Pizzas", price: 8, size: "medium", count: 3 },
    { id: "offer-large", name: "3 بيتزا كبير", nameEn: "3 Large Pizzas", price: 12, size: "large", count: 3 }
  ],

  MANAQEESH: [
    { id: "m-zaatar", name: "زعتر", nameEn: "Zaatar", price: 0.35 },
    { id: "m-jibneh-zaatar", name: "جبنة مع زعتر", nameEn: "Cheese & Zaatar", price: 0.6 },
    { id: "m-jibneh-bayda", name: "جبنة بيضة", nameEn: "White Cheese", price: 0.6 },
    { id: "m-jibneh-mix", name: "جبنة مكس", nameEn: "Mixed Cheese", price: 0.6, badge: "best" },
    { id: "m-mohammara", name: "محمرة مع قشقوان", nameEn: "Mohammara & Kashkawan", price: 0.6 },
    { id: "m-lahmeh", name: "لحمة", nameEn: "Meat", price: 0.7 },
    { id: "m-hotdog", name: "هوت دوج مع موزريلا", nameEn: "Hot Dog & Mozzarella", price: 0.6 },
    { id: "m-salami", name: "سلامي مع قشقوان", nameEn: "Salami & Kashkawan", price: 0.6 },
    { id: "m-turkey", name: "تركي مع قشقوان", nameEn: "Turkey & Kashkawan", price: 0.6 },
    { id: "m-baid", name: "بيض", nameEn: "Egg", price: 0.6 },
    { id: "m-jibneh-qashqawan", name: "جبنة قشقوان", nameEn: "Kashkawan Cheese", price: 0.6 },
    { id: "m-jibneh-safra", name: "جبنة صفراء", nameEn: "Yellow Cheese", price: 0.6 },
    { id: "m-zaatar-qashqawan", name: "زعتر مع قشقوان", nameEn: "Zaatar & Kashkawan", price: 0.6 },
    { id: "m-baid-jibneh", name: "بيض مع جبنة", nameEn: "Egg & Cheese", price: 0.8 },
    { id: "m-baid-hotdog", name: "بيض مع هوت دوج", nameEn: "Egg & Hot Dog", price: 0.8 },
    { id: "m-lahmeh-qashqawan", name: "لحمة مع قشقوان", nameEn: "Meat & Kashkawan", price: 0.8 },
    { id: "m-fajita", name: "فاهيتا", nameEn: "Fajita", price: 0.8 },
    { id: "m-shish-qashqawan", name: "شيش مع قشقوان", nameEn: "Shish & Kashkawan", price: 0.8 },
    { id: "m-ranger", name: "رينجر مع موزريلا", nameEn: "Ranger & Mozzarella", price: 0.8 },
    { id: "m-sabanekh", name: "سبانخ", nameEn: "Spinach", price: 0.6 },
    { id: "m-zaytoun-jibneh", name: "زيتون مع جبنة", nameEn: "Olives & Cheese", price: 0.6 },
    { id: "m-cheddar-sanawbar", name: "شيدر مع سنيورة", nameEn: "Cheddar & Pine Nuts", price: 0.6 },
    { id: "m-alfredo", name: "الفريدو", nameEn: "Alfredo", price: 0.8 },
    { id: "m-pizza", name: "بيتزا", nameEn: "Pizza", price: 0.6 },
    { id: "m-mohammara-plain", name: "محمرا سادا", nameEn: "Plain Mohammara", price: 0.4 },
    { id: "m-qashqawan-zaytoun", name: "قشقوان مع زيتون", nameEn: "Kashkawan & Olives", price: 0.6 }
  ],

  KALZONI: [
    { id: "k-alfredo", name: "كالزوني الفريدو", nameEn: "Calzone Alfredo", price: 2.5 },
    { id: "k-zinger", name: "كالزوني زنجر", nameEn: "Calzone Zinger", price: 2.5, badge: "best" },
    { id: "k-zinger-cream", name: "كالزوني زنجر بالكريمة", nameEn: "Calzone Zinger Cream", price: 2.5 },
    { id: "k-bbq", name: "كالزوني باربكيو", nameEn: "Calzone BBQ", price: 2.5 },
    { id: "k-supreme", name: "كالزوني سبريم", nameEn: "Calzone Supreme", price: 2.5, badge: "chef" },
    { id: "k-fajita", name: "كالزوني فاهيتا", nameEn: "Calzone Fajita", price: 2.5 },
    { id: "k-mix-cheese", name: "كالزوني مكس أجبان", nameEn: "Calzone Mix Cheese", price: 2.5 }
  ],

  MOAJANAT: [
    { id: "mo-jibneh-bayda", name: "جبنة بيضاء", nameEn: "White Cheese", price: 0.3 },
    { id: "mo-jibneh-safra", name: "جبنة صفراء", nameEn: "Yellow Cheese", price: 0.3 },
    { id: "mo-hotdog", name: "هوت دوغ", nameEn: "Hot Dog", price: 0.3 },
    { id: "mo-jibneh-zaatar", name: "جبنة مع زعتر", nameEn: "Cheese & Zaatar", price: 0.3 },
    { id: "mo-cheddar-sanawbar", name: "شدر مع سنيورة", nameEn: "Cheddar & Pine Nuts", price: 0.3 },
    { id: "mo-batata", name: "بطاطا", nameEn: "Potato", price: 0.3 },
    { id: "mo-pizza", name: "بيتزا", nameEn: "Pizza", price: 0.3 },
    { id: "mo-lahmeh", name: "لحمة", nameEn: "Meat", price: 0.3 },
    { id: "mo-jibneh-zaytoun", name: "جبنة مع زيتون", nameEn: "Cheese & Olives", price: 0.3 },
    { id: "mo-jibneh-qashqawan-zaatar", name: "جبنة قشقوان مع زعتر", nameEn: "Kashkawan & Zaatar", price: 0.3 },
    { id: "mo-safiha", name: "صفيحة شامية", nameEn: "Shami Sfiha", price: 0.3 },
    { id: "mo-sabanekh", name: "سبانخ", nameEn: "Spinach", price: 0.3 }
  ],

  AAJEEN: [
    { id: "a-moajanat", name: "معجنات", nameEn: "Pastry", price: 0.12 },
    { id: "a-manqousheh", name: "منقوشة", nameEn: "Manqousheh", price: 0.2 }
  ],

  SALADS: [],

  DRINKS: [
    { id: "d-cola", name: "ماتركس كولا", nameEn: "Matrix Cola", price: 0.3 },
    { id: "d-cola-zero", name: "ماتركس كولا زيرو", nameEn: "Matrix Cola Zero", price: 0.3 },
    { id: "d-orange", name: "ماتركس برتقال", nameEn: "Matrix Orange", price: 0.3 },
    { id: "d-seven-up", name: "ماتركس أب", nameEn: "Matrix Up", price: 0.3 },
    { id: "d-seven-up-zero", name: "ماتركس أب زيرو", nameEn: "Matrix Up Zero", price: 0.3 },
    { id: "d-fruits", name: "ماتركس فواكه", nameEn: "Matrix Fruit", price: 0.3 },
    { id: "d-lemon", name: "ماتركس ليمون", nameEn: "Matrix Lemon", price: 0.3 }
  ]
};

// Item photos (Shami pastries + Manakish), looked up by item id, then by Arabic name
window.ITEM_IMAGES = {
  // Calzone — photos from the restaurant's live site (Nov 2026 update)
  "k-alfredo": "assets/images/menu/k-alfredo.jpg",
  "k-zinger": "assets/images/menu/k-zinger.jpg",
  "k-zinger-cream": "assets/images/menu/k-zinger-cream.jpg",
  "k-bbq": "assets/images/menu/k-bbq.jpg",
  "k-supreme": "assets/images/menu/k-supreme.jpg",
  "k-fajita": "assets/images/menu/k-fajita.jpg",
  "k-mix-cheese": "assets/images/menu/k-mix-cheese.jpg",
  // Drinks — Matrix 250ml cans (same studio set, white background)
  "d-cola": "assets/images/menu/d-cola.jpg",
  "d-cola-zero": "assets/images/menu/d-cola-zero.jpg",
  "d-orange": "assets/images/menu/d-orange.jpg",
  "d-seven-up": "assets/images/menu/d-seven-up.jpg",
  "d-fruits": "assets/images/menu/d-fruits.jpg",
  "d-lemon": "assets/images/menu/d-lemon.jpg",
  "d-seven-up-zero": "assets/images/menu/d-seven-up-zero.jpg",
  "mo-lahmeh": "assets/images/menu/shami-mo-lahmeh.jpg",
  "mo-jibneh-bayda": "assets/images/menu/shami-mo-jibneh-bayda.jpg",
  "mo-hotdog": "assets/images/menu/shami-mo-hotdog.jpg",
  "mo-pizza": "assets/images/menu/shami-mo-pizza.jpg",
  "mo-batata": "assets/images/menu/shami-mo-batata.jpg",
  "mo-jibneh-qashqawan-zaatar": "assets/images/menu/shami-mo-jibneh-qashqawan-zaatar.jpg",
  "mo-sabanekh": "assets/images/menu/shami-mo-sabanekh.jpg",
  "mo-jibneh-safra": "assets/images/menu/shami-mo-jibneh-safra.jpg",
  "mo-safiha": "assets/images/menu/shami-mo-safiha.jpg",
  "mo-jibneh-zaytoun": "assets/images/menu/shami-mo-jibneh-zaytoun.jpg",
  "mo-jibneh-zaatar": "assets/images/menu/shami-mo-jibneh-zaatar.jpg",
  "mo-cheddar-sanawbar": "assets/images/menu/shami-mo-cheddar-sanawbar.jpg",
  "m-zaatar": "assets/images/menu/m-zaatar.jpg",
  "m-jibneh-zaatar": "assets/images/menu/m-jibneh-zaatar.jpg",
  "m-jibneh-bayda": "assets/images/menu/m-jibneh-bayda.jpg",
  "m-jibneh-mix": "assets/images/menu/m-jibneh-mix.jpg",
  "m-mohammara": "assets/images/menu/m-mohammara.jpg",
  "m-lahmeh": "assets/images/menu/m-lahmeh.jpg",
  "m-hotdog": "assets/images/menu/m-hotdog.jpg",
  "m-salami": "assets/images/menu/m-salami.jpg",
  "m-turkey": "assets/images/menu/m-turkey.jpg",
  "m-baid": "assets/images/menu/m-baid.jpg",
  "m-jibneh-qashqawan": "assets/images/menu/m-jibneh-qashqawan.jpg",
  "m-jibneh-safra": "assets/images/menu/m-jibneh-safra.jpg",
  "m-zaatar-qashqawan": "assets/images/menu/m-zaatar-qashqawan.jpg",
  "m-baid-jibneh": "assets/images/menu/m-baid-jibneh.jpg",
  "m-baid-hotdog": "assets/images/menu/m-baid-hotdog.jpg",
  "m-lahmeh-qashqawan": "assets/images/menu/m-lahmeh-qashqawan.jpg",
  "m-fajita": "assets/images/menu/m-fajita.jpg",
  "m-shish-qashqawan": "assets/images/menu/m-shish-qashqawan.jpg",
  "m-ranger": "assets/images/menu/m-ranger.jpg",
  "m-sabanekh": "assets/images/menu/m-sabanekh.jpg",
  "m-zaytoun-jibneh": "assets/images/menu/m-zaytoun-jibneh.jpg",
  "m-cheddar-sanawbar": "assets/images/menu/m-cheddar-sanawbar.jpg",
  "m-alfredo": "assets/images/menu/m-alfredo.jpg",
  "m-pizza": "assets/images/menu/m-pizza.jpg",
  "m-mohammara-plain": "assets/images/menu/m-mohammara-plain.jpg",
  "m-qashqawan-zaytoun": "assets/images/menu/m-qashqawan-zaytoun.jpg"
};
const ITEM_IMAGES = window.ITEM_IMAGES;
window.ITEM_IMAGES_BY_NAME = {
  "لحمة": ITEM_IMAGES["mo-lahmeh"],
  "جبنة بيضاء": ITEM_IMAGES["mo-jibneh-bayda"],
  "هوت دوغ": ITEM_IMAGES["mo-hotdog"],
  "هوت دوج": ITEM_IMAGES["mo-hotdog"],
  "بيتزا": ITEM_IMAGES["mo-pizza"],
  "بطاطا": ITEM_IMAGES["mo-batata"],
  "جبنة قشقوان مع زعتر": ITEM_IMAGES["mo-jibneh-qashqawan-zaatar"],
  "سبانخ": ITEM_IMAGES["mo-sabanekh"],
  "جبنة صفراء": ITEM_IMAGES["mo-jibneh-safra"],
  "صفيحة شامية": ITEM_IMAGES["mo-safiha"],
  "جبنة مع زيتون": ITEM_IMAGES["mo-jibneh-zaytoun"],
  "شدر مع سنيورة": ITEM_IMAGES["mo-cheddar-sanawbar"],
  "شيدر مع سمندورة": ITEM_IMAGES["mo-cheddar-sanawbar"],
  "زعتر": ITEM_IMAGES["m-zaatar"],
  "جبنة مع زعتر": ITEM_IMAGES["m-jibneh-zaatar"],
  "جبنة بيضة": ITEM_IMAGES["m-jibneh-bayda"],
  "جبنة مكس": ITEM_IMAGES["m-jibneh-mix"],
  "محمرة مع قشقوان": ITEM_IMAGES["m-mohammara"],
  "هوت دوج مع موزريلا": ITEM_IMAGES["m-hotdog"],
  "سلامي مع قشقوان": ITEM_IMAGES["m-salami"],
  "تركي مع قشقوان": ITEM_IMAGES["m-turkey"],
  "بيض": ITEM_IMAGES["m-baid"],
  "جبنة قشقوان": ITEM_IMAGES["m-jibneh-qashqawan"],
  "زعتر مع قشقوان": ITEM_IMAGES["m-zaatar-qashqawan"],
  "بيض مع جبنة": ITEM_IMAGES["m-baid-jibneh"],
  "بيض مع هوت دوج": ITEM_IMAGES["m-baid-hotdog"],
  "لحمة مع قشقوان": ITEM_IMAGES["m-lahmeh-qashqawan"],
  "فاهيتا": ITEM_IMAGES["m-fajita"],
  "شيش مع قشقوان": ITEM_IMAGES["m-shish-qashqawan"],
  "رينجر مع موزريلا": ITEM_IMAGES["m-ranger"],
  "زيتون مع جبنة": ITEM_IMAGES["m-zaytoun-jibneh"],
  "شيدر مع سنيورة": ITEM_IMAGES["m-cheddar-sanawbar"],
  "الفريدو": ITEM_IMAGES["m-alfredo"],
  "محمرا سادا": ITEM_IMAGES["m-mohammara-plain"],
  "قشقوان مع زيتون": ITEM_IMAGES["m-qashqawan-zaytoun"]
};

window.IMAGES = {
  logo: "assets/images/logo.jpg",
  appIcon: "assets/icons/icon-192x192.png",
  googleMaps: "assets/icons/google-maps.svg",   // official Google Maps pin (2020)
  heroVideo: "assets/video/hero.mp4",
  pizza: "assets/images/menu/p-pizza.jpg"   // single-pizza cards (from the restaurant's site)
};
