// Restaurant info, store settings, delivery zones and the full menu — the only file to edit for menu changes.
// Values are the restaurant's own data (from their original site / admin panel).
//
// Photos: every item in MANAQEESH, KALZONI, MOAJANAT and DRINKS shows the photo  assets/images/menu/<id>.jpg
// (square or 4:3, at least 520px). An item without a photo yet gets  noPhoto: true  and shows a placeholder.

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
    { id: "zinger", name: "زنجر", nameEn: "Zinger", desc: "صوص، زنجر، موزريلا", descEn: "Sauce, zinger, mozzarella" },
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
    { id: "m-zinger", name: "زنجر مع موزريلا", nameEn: "Zinger & Mozzarella", price: 0.8 },
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

// Shared images (menu item photos follow the <id>.jpg rule above)
window.IMAGES = {
  logo: "assets/images/logo-mark.png",   // header logo: transparent cut-out of logo.jpg (logo.jpg stays for Google and link previews)
  appIcon: "assets/icons/icon-192x192.png",
  googleMaps: "assets/icons/google-maps.svg",   // official Google Maps pin (2020)
  pizza: "assets/images/menu/p-pizza.jpg"   // single-pizza cards (from the restaurant's site)
};
