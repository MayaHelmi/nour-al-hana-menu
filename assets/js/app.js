// Pizza Nour El Hana — digital menu
// Plain-JS rebuild of the original React page. Class names match the original 1:1
// so the compiled stylesheet (assets/css/styles.css) renders it identically.
(() => {
  const T = window.I18N;
  const R = window.RESTAURANT;
  const M = window.MENU;
  const IMG = window.IMAGES;
  const ZONES = window.DELIVERY_ZONES.filter((z) => z.active).sort((a, b) => a.sort_order - b.sort_order);
  const icon = window.icon;

  /* ---------- Component class strings (shadcn/ui, as compiled on the original) ---------- */
  const FOCUS = "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  const BTN = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors ${FOCUS}`;
  const V_DEFAULT = "bg-primary text-primary-foreground shadow hover:bg-primary/90";
  const V_OUTLINE = "border border-input bg-background shadow-sm hover:bg-muted hover:text-foreground";
  const V_GHOST = "hover:bg-muted hover:text-foreground";
  const C = {
    btnPrimary: `${BTN} ${V_DEFAULT} tap-h px-4 py-2`,
    btnOutline: `${BTN} ${V_OUTLINE} tap-h px-4 py-2`,
    btnPrimaryFull: `${BTN} ${V_DEFAULT} tap-h px-4 py-2 w-full`,
    btnAddToCart: `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors ${FOCUS} ${V_DEFAULT} h-9 px-4 py-2 gap-2`,
    btnIconOutline: `${BTN} ${V_OUTLINE} tap-target`,
    btnIconPrimary: `${BTN} ${V_DEFAULT} h-8 w-8`,
    btnOrder: `inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors ${FOCUS} ${V_DEFAULT} rounded-md h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm`,
    btnAdd: `inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors ${FOCUS} border bg-background shadow-sm h-8 rounded-md px-3 text-xs mt-auto w-full shrink-0 border-primary/30 text-primary btn-add-subtle`,
    btnWhatsApp: `${BTN} shadow tap-h px-4 py-2 gap-2 bg-[#25D366] hover:bg-[#1eb955] text-white`,
    btnCartFab: `inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer transition-colors ${FOCUS} bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl gap-3 rounded-full px-6 h-14 text-base`,
    btnInstall: `inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer transition-colors ${FOCUS} text-primary-foreground hover:bg-primary/90 h-9 py-2 gap-2 rounded-full bg-primary px-8 text-base shadow-md`,
    card: "rounded-xl border bg-card text-card-foreground shadow",
    input: "flex tap-h w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    textarea: "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    textareaMono: "flex w-full rounded-md border border-input bg-transparent px-3 py-2 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[280px] font-mono text-xs",
    label: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    radio: "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    overlay: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    dialog: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
    dialogSm: "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg max-w-sm rounded-lg text-center",
    dialogHeader: "flex flex-col space-y-1.5 text-center sm:text-left",
    dialogTitle: "text-lg font-semibold leading-none tracking-tight",
    dialogDesc: "text-sm text-muted-foreground",
    dialogFooter: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    dialogClose: "dialog-close absolute rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
  };

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }
  };
  const uid = () => Math.random().toString(36).slice(2, 10);
  const nameOf = (item) => (S.lang === "en" && item.nameEn ? item.nameEn : item.name);
  const SIZE_LABEL = { small: { ar: "صغير", en: "Small" }, medium: { ar: "وسط", en: "Medium" }, large: { ar: "كبير", en: "Large" } };
  const sizeLabel = (id) => SIZE_LABEL[id][S.lang];
  const t = (key) => T[key][S.lang];
  const money = (n) => (S.lang === "en" ? `${n.toFixed(2)} JD` : `${n.toFixed(2)} د.أ`);
  const waNumber = () => {
    let n = R.phone.replace(/\D/g, "");
    if (n.startsWith("0")) n = "962" + n.slice(1);
    return n;
  };
  function totals(subtotal, fee, discountOn, percent) {
    const s = Math.round((subtotal + 2 ** -52) * 100);
    const f = Math.round((fee + 2 ** -52) * 100);
    const d = discountOn ? Math.round((s * percent) / 100) : 0;
    return { subtotal: s / 100, discount_amount: d / 100, discount_percent: discountOn ? percent : 0, total: (s - d + f) / 100 };
  }
  // Search ignores spelling differences people type: أ/إ/آ/ا, ة/ه, ى/ي, ؤ/و, ئ/ي, harakat,
  // and doubled letters (so "Zatar" finds "Zaatar"). It looks at names and ingredients in both languages.
  const normText = (s) => String(s ?? "").toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
    .replace(/(.)\1+/g, "$1").replace(/\s+/g, " ").trim();
  const matches = (item, q) => {
    const n = normText(q);
    if (!n) return true;
    return [item.name, item.nameEn, item.desc, item.descEn].some((x) => normText(x).includes(n));
  };
  const OFFER_WORDS = ["عرض", "عروض", "offer", "offers", "deal", "deals"];
  const offerQuery = (q) => { const n = normText(q); return n.length >= 2 && OFFER_WORDS.some((w) => normText(w).startsWith(n) || n.startsWith(normText(w))); };

  // Jordan mobile numbers: 07X XXX XXXX, also typed as +962 / 00962 / 962, with Arabic digits or spaces
  function normPhone(raw) {
    let n = String(raw ?? "").replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[\s\-().]/g, "");
    if (n.startsWith("+")) n = n.slice(1);
    if (n.startsWith("00")) n = n.slice(2);
    if (n.startsWith("962")) n = "0" + n.slice(3);
    if (/^7[789]\d{7}$/.test(n)) n = "0" + n;
    return /^07[789]\d{7}$/.test(n) ? n : null;
  }

  /* ---------- Store hours (Asia/Amman) ---------- */
  function ammanNow(d) {
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: R.timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d);
    const p = (k) => parts.find((x) => x.type === k)?.value ?? "0";
    const date = `${p("year")}-${p("month")}-${p("day")}`;
    return { date, weekday: new Date(`${date}T12:00:00Z`).getUTCDay(), minutes: Number(p("hour")) * 60 + Number(p("minute")) };
  }
  const toMin = (s) => { const [h, m] = s.split(":").map(Number); return h * 60 + (m || 0); };
  const hoursFor = (st, weekday) => (weekday === 5
    ? { open: st.friday_open_time ?? "10:00:00", close: st.friday_close_time ?? "15:00:00" }
    : { open: st.open_time, close: st.close_time });
  function isOpenNow(st, d) {
    const n = ammanNow(d), h = hoursFor(st, n.weekday), o = toMin(h.open), c = toMin(h.close);
    if (c > o ? n.minutes >= o && n.minutes < c : n.minutes >= o) return true;
    const prev = hoursFor(st, (n.weekday + 6) % 7);
    return toMin(prev.close) <= toMin(prev.open) && n.minutes < toMin(prev.close);
  }
  function nextOpening(st, d) {
    const n = ammanNow(d), base = new Date(`${n.date}T00:00:00+03:00`).getTime();
    for (let i = 0; i < 8; i++) {
      const open = hoursFor(st, (n.weekday + i) % 7).open;
      const at = new Date(base + i * 864e5 + toMin(open) * 6e4);
      if (at > d) return at;
    }
    return new Date(base + 864e5);
  }
  function nextOpeningLabel(st, d, lang = "ar") {
    const at = nextOpening(st, d);
    const days = Math.round((new Date(`${ammanNow(at).date}T00:00:00Z`) - new Date(`${ammanNow(d).date}T00:00:00Z`)) / 864e5);
    const loc = lang === "en" ? "en-US" : "ar-JO-u-nu-latn"; // Western digits, same as the opening hours in the footer
    const day = days === 0 ? (lang === "en" ? "Today" : "اليوم") : days === 1 ? (lang === "en" ? "Tomorrow" : "غدًا")
      : new Intl.DateTimeFormat(loc, { timeZone: R.timeZone, weekday: "long" }).format(at);
    const time = new Intl.DateTimeFormat(loc, { timeZone: R.timeZone, hour: "numeric", minute: "2-digit", hour12: true }).format(at);
    return lang === "en" ? `${day} at ${time}` : `${day} الساعة ${time}`;
  }
  function storeState(st, d) {
    if (!st.accepting_orders) return "closed";
    if (!isOpenNow(st, d)) return "outside_hours";
    return st.busy && (!st.busy_until || new Date(st.busy_until) > d) ? "busy" : "open";
  }
  const hhmm = (s) => s.slice(0, 5);

  /* ---------- State ---------- */
  const S = {
    lang: store.get("pnh-lang") || "ar",
    settings: window.STORE_SETTINGS,
    hidden: new Set(window.UNAVAILABLE_ITEMS),
    now: new Date(),
    cart: [],   // lines keep ids only: { kind: "item", id } · { kind: "pizza", sizeId, typeId } · { kind: "offer", offerId, picks }
    query: "",
    activeNav: null,
    closedDismissed: (() => { try { return sessionStorage.getItem("pnh-closed-seen"); } catch { return null; } })(),   // seen once this visit
    coTried: false,
    installPrompt: null,
    installed: false,
    // dialogs
    offer: null, offerPicks: [],
    size: null, sizePick: "",
    cartOpen: false,
    checkoutOpen: false,
    preview: null,
    co: { mode: "pickup", zone: "inside", name: "", phone: "", address: "", notes: "" },
    sending: false,
    sentCheck: false
  };

  const visible = (list) => list.filter((i) => !S.hidden.has(i.id));
  const filtered = (list) => visible(list).filter((i) => matches(i, S.query));
  const searching = () => S.query.trim().length > 0;
  // Test mode: open the file on your own computer with "?open" at the end of the address to try ordering
  // outside opening hours. It only works for local files (file://), never on the live website.
  const TEST_OPEN = location.protocol === "file:" && new URLSearchParams(location.search).has("open");
  const status = () => (TEST_OPEN ? "open" : storeState(S.settings, S.now));
  const canOrder = () => { const s = status(); return s !== "closed" && s !== "outside_hours"; };
  // Names and prices always come from the menu, so the cart follows the language and the current prices
  const findItem = (id) => [M.MANAQEESH, M.KALZONI, M.MOAJANAT, M.AAJEEN, M.SALADS, M.DRINKS].flat().find((i) => i.id === id);
  function lineInfo(l, lang = S.lang) {
    const nm = (x) => (lang === "en" && x.nameEn ? x.nameEn : x.name);
    const sz = (id) => SIZE_LABEL[id][lang];
    const ok = (x) => x && !S.hidden.has(x.id);
    if (l.kind === "item") { const it = findItem(l.id); return ok(it) ? { title: nm(it), price: it.price } : null; }
    if (l.kind === "pizza") {
      const s = M.PIZZA_SIZES.find((x) => x.id === l.sizeId), p = M.PIZZA_TYPES.find((x) => x.id === l.typeId);
      return ok(s) && ok(p) ? { title: lang === "en" ? `Pizza ${nm(p)} — size ${sz(s.id)}` : `بيتزا ${nm(p)} — حجم ${sz(s.id)}`, price: s.price } : null;
    }
    if (l.kind === "offer") {
      const o = M.OFFERS.find((x) => x.id === l.offerId), picks = (l.picks ?? []).map((id) => M.PIZZA_TYPES.find((x) => x.id === id));
      return ok(o) && picks.length === o.count && picks.every(ok)
        ? { title: nm(o), price: o.price, details: picks.map((p, i) => `${i + 1}. ${nm(p)} (${sz(o.size)})`) } : null;
    }
    return null;
  }
  const cartCount = () => S.cart.reduce((a, l) => a + l.qty, 0);
  const cartSubtotal = () => S.cart.reduce((a, l) => a + lineInfo(l).price * l.qty, 0);

  // The cart and the customer's details are kept on this phone, so a refresh or closed tab doesn't lose the order.
  // A cart older than 3 hours is dropped (yesterday's order shouldn't come back); lines no longer on the menu are removed.
  const CART_TTL = 3 * 60 * 60 * 1000;
  function saveCart() { store.set("pnh-cart", JSON.stringify({ at: Date.now(), lines: S.cart })); }
  function saveCustomer() { const { mode, zone, name, phone, address } = S.co; store.set("pnh-customer", JSON.stringify({ mode, zone, name, phone, address })); }
  function loadSaved() {
    try {
      const c = JSON.parse(store.get("pnh-cart") || "null");
      if (c && Date.now() - c.at < CART_TTL && Array.isArray(c.lines)) {
        S.cart = c.lines.filter((l) => l && l.qty > 0 && l.lineId && lineInfo(l));
      }
      const p = JSON.parse(store.get("pnh-customer") || "null");
      if (p) for (const k of ["mode", "zone", "name", "phone", "address"]) if (typeof p[k] === "string") S.co[k] = p[k];
      if (!ZONES.some((z) => z.id === S.co.zone)) S.co.zone = ZONES[0]?.id ?? "";
    } catch { /* bad saved data: start fresh */ }
  }
  // Automatic pizza deals: every 3 single pizzas of the same size are charged at the offer price,
  // even when they were added one by one from the pizza section (not through an offer card).
  function pizzaDeals() {
    return visible(M.OFFERS).map((o) => {
      const size = M.PIZZA_SIZES.find((sz) => sz.id === o.size);
      const units = S.cart.reduce((a, l) => a + (l.kind === "pizza" && l.sizeId === o.size ? l.qty : 0), 0);
      const bundles = Math.floor(units / o.count);
      const amount = Math.round((size.price * o.count - o.price) * bundles * 100) / 100;
      return { offer: o, bundles, amount };
    }).filter((d) => d.bundles > 0 && d.amount > 0);
  }
  const dealsTotal = () => pizzaDeals().reduce((a, d) => a + d.amount, 0);
  const payable = () => cartSubtotal() - dealsTotal();
  const dealLabel = (d) => `${S.lang === "ar" ? "خصم عرض" : "Offer discount:"} ${nameOf(d.offer)}${d.bundles > 1 ? ` ×${d.bundles}` : ""}`;
  const dealRows = (cls) => pizzaDeals().map((d) => `<div class="${cls}"><span>${esc(dealLabel(d))}</span><span>-${money(d.amount)}</span></div>`).join("");
  const qtyOf = (id) => S.cart.find((l) => l.kind === "item" && l.id === id)?.qty ?? 0;

  /* ---------- Cart actions ---------- */
  function addSimple(item) {
    const line = S.cart.find((l) => l.kind === "item" && l.id === item.id);
    if (line) line.qty += 1; else S.cart.push({ lineId: uid(), kind: "item", id: item.id, qty: 1 });
    cartChanged();
  }
  function decSimple(id) {
    S.cart = S.cart.map((l) => (l.kind === "item" && l.id === id ? { ...l, qty: l.qty - 1 } : l)).filter((l) => l.qty > 0);
    cartChanged();
  }
  function cartChanged() {
    saveCart();
    renderMain();
    renderFab();
    if (S.cartOpen) renderPortal();
  }

  /* ---------- Static pieces ---------- */
  const badge = (b) => {
    if (b === "best") return `<span class="badge-shimmer inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">${icon("flame", "h-3 w-3")}${t("bestSeller")}</span>`;
    if (b === "chef") return `<span class="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">${icon("chef-hat", "h-3 w-3")}${t("chefsChoice")}</span>`;
    return `<span class="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-accent px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">${icon("sparkles", "h-3 w-3")}${t("newItem")}</span>`;
  };

  // Section title: bold title + one quiet line under it. The offers section gets the discount badge icon.
  function sectionShell(id, title, subtitle, fullHeading, accent, inner) {
    const head = `<div class="section-head"><div class="section-head__row">${id === "offers" ? icon("badge-percent", "section-head__icon") : ""}<h2 class="section-head__title">${esc(title)}</h2></div>${subtitle ? `<p class="section-head__sub">${esc(subtitle)}</p>` : ""}</div>`;
    return `<section id="${id}" class="scroll-mt-40">${head}${inner}</section>`;
  }


  const itemImage = (item) => window.ITEM_IMAGES[item.id] ?? window.ITEM_IMAGES_BY_NAME[item.name.trim()];

  function itemSection(id, title, fullHeading, items, note, showImages) {
    if (items.length === 0) return "";
    // Item card: photo → name → price (largest) → action. Same hierarchy as the offer cards.
    const cards = items.map((item) => {
      const name = nameOf(item);
      const qty = qtyOf(item.id);
      const img = showImages ? itemImage(item) : undefined;
      const ar = S.lang === "ar";
      // With a photo, the badge sits on the photo's top corner (top-left in Arabic); without one it stays by the name
      const onPhoto = !!(img && item.badge);
      const media = img
        ? `<div class="item-card__media"><img class="item-card__img" src="${img}" alt="${esc(name)}" loading="lazy">${onPhoto ? `<span class="item-card__badge">${badge(item.badge)}</span>` : ""}</div>`
        : showImages ? `<div class="item-photo-placeholder" aria-hidden="true">${icon(id === "drinks" ? "cup-soda" : "pizza", "item-photo-placeholder__icon")}</div>` : "";
      const controls = qty > 0
        ? `<div class="item-card__stepper" data-stop><button type="button" class="item-card__step" data-act="dec" data-id="${item.id}" aria-label="${ar ? "إنقاص" : "Decrease"}">${icon("minus", "item-card__step-icon")}</button><span class="item-card__qty" aria-live="polite">${qty}</span><button type="button" class="item-card__step" data-act="add" data-id="${item.id}" aria-label="${ar ? "زيادة" : "Increase"}">${icon("plus", "item-card__step-icon")}</button></div>`
        : `<button type="button" class="item-card__add" data-act="add" data-id="${item.id}">${icon("plus", "item-card__step-icon")}${ar ? "أضف" : "Add"}</button>`;
      return `<div class="item-card${qty > 0 ? " is-in-cart" : ""}">${media}` +
        `<div class="item-card__body"><div class="item-card__name"><span>${esc(name)}</span>${item.badge && !onPhoto ? badge(item.badge) : ""}</div>` +
        `<div class="item-card__price"><span class="item-card__amount">${item.price.toFixed(2)}</span><span class="item-card__cur">${ar ? "د.أ" : "JD"}</span></div></div>` +
        `${controls}</div>`;
    }).join("");
    const noteHtml = note ? `<div class="mb-3 rounded-md border-2 border-accent bg-accent/15 p-3 text-sm font-semibold text-secondary">${esc(note)}</div>` : "";
    return sectionShell(id, title, null, fullHeading, false, `${noteHtml}<div class="item-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">${cards}</div>`);
  }

  function offersSection() {
    // Offer card hierarchy: size (title) → price (largest) → saving badge (corner) → action
    const cards = visible(M.OFFERS).map((o) => {
      const single = M.PIZZA_SIZES.find((sz) => sz.id === o.size).price * o.count;
      const saving = single - o.price;
      const ar = S.lang === "ar";
      return `<div class="offer-card reveal">` +
        `<div class="offer-card__top"><h3 class="offer-card__title"><span class="offer-card__count">${o.count} ${t("offerPizzas")}</span> ${ar ? "حجم" : ""} ${sizeLabel(o.size)}</h3></div>` +
        (saving > 0 ? `<span class="offer-card__ribbon">${t("offerSave")} ${Number.isInteger(saving) ? saving : saving.toFixed(2)} ${ar ? "د.أ" : "JD"}</span>` : "") +
        `<div class="offer-card__prices"><span class="offer-card__price">${o.price.toFixed(2)}</span><span class="offer-card__cur">${ar ? "د.أ" : "JD"}</span>${saving > 0 ? `<span class="offer-card__was">${single.toFixed(2)}</span>` : ""}</div>` +
        `<button type="button" class="offer-card__btn" data-act="open-offer" data-id="${o.id}">${icon("plus", "offer-card__btn-icon")}${t("offerChoosePizzas")}</button>` +
        `</div>`;
    }).join("");
    return sectionShell("offers", t("sectionOffers"), null, true, true,
      `<div class="offer-grid">${cards}</div>`);
  }

  // Single pizzas use the same item card as the other sections: photo → name (right) / price (left) → action
  function pizzaSection(note) {
    const ar = S.lang === "ar";
    const cards = visible(M.PIZZA_SIZES).map((s) => {
      const name = `${ar ? "بيتزا" : "Pizza"} ${sizeLabel(s.id)}`;
      return `<div class="item-card">` +
        `<div class="item-card__media"><img class="item-card__img" src="${IMG.pizza}" alt="${esc(name)}" loading="lazy"></div>` +
        `<div class="item-card__body"><div class="item-card__name"><span>${esc(name)}</span></div>` +
        `<div class="item-card__price"><span class="item-card__amount">${s.price.toFixed(2)}</span><span class="item-card__cur">${ar ? "د.أ" : "JD"}</span></div></div>` +
        `<button type="button" class="item-card__add" data-act="open-size" data-id="${s.id}">${icon("plus", "item-card__step-icon")}${t("pizzaChooseType")}</button>` +
        `</div>`;
    }).join("");
    const noteHtml = note ? `<div class="mb-3 rounded-md border-2 border-accent bg-accent/15 p-3 text-sm font-semibold text-secondary">${esc(note)}</div>` : "";
    return sectionShell("pizza", t("sectionPizza"), null, true, false, `${noteHtml}<div class="item-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">${cards}</div>`);
  }



  /* ---------- Regions ---------- */
  // Where the sticky bars start: 0 in a normal browser, the notch height when installed as an app
  const safeTop = () => parseFloat(getComputedStyle(document.getElementById("site-header")).top) || 0;
  const $ = (id) => document.getElementById(id);

  function renderMain() {
    const q = searching();
    const lists = [M.MANAQEESH, M.KALZONI, M.MOAJANAT, M.AAJEEN, M.DRINKS].map(filtered);
    // While searching, pizza types / sizes and offers are searched too
    const pizzaTypes = q ? filtered(M.PIZZA_TYPES) : [];
    const pizzaHit = q && (pizzaTypes.length > 0 || filtered(M.PIZZA_SIZES).length > 0);
    const offerHit = q && (filtered(M.OFFERS).length > 0 || offerQuery(S.query));
    const count = lists.reduce((a, l) => a + l.length, 0) + pizzaTypes.length + (offerHit ? visible(M.OFFERS).length : 0);
    let html = "";
    if (q) html += `<div class="flex items-center justify-center gap-2 rounded-xl border bg-muted/60 p-3 text-center text-sm font-semibold">${icon("search", "h-4 w-4 text-primary")}<span>${count} ${S.lang === "ar" ? `نتيجة لـ "${esc(S.query)}"` : `results for "${esc(S.query)}"`}</span></div>`;
    if (!q || offerHit) html += offersSection();
    if (!q) html += pizzaSection();
    else if (pizzaHit) html += pizzaSection(pizzaTypes.length ? `${t("pizzaMatches")}: ${pizzaTypes.map(nameOf).join("، ")}` : null);
    html += itemSection("manaqeesh", t("sectionManakish"), q ? undefined : true, lists[0], undefined, true);
    html += itemSection("calzone", t("sectionCalzone"), q ? undefined : true, lists[1], undefined, true);
    html += itemSection("shami", t("sectionShami"), q ? undefined : true, lists[2], t("shamiNote"), true);
    if (!q) html += itemSection("salads", t("sectionSalads"), undefined, visible(M.SALADS));
    html += itemSection("drinks", t("sectionDrinks"), q ? undefined : true, lists[4], undefined, true);
    if (q && count === 0 && !pizzaHit) html += `<div class="rounded-xl border-2 border-dashed p-10 text-center text-muted-foreground">${t("searchNoResults")}</div>`;
    $("main").innerHTML = html;
    $("main").querySelectorAll(".item-card__img").forEach((img) => { if (img.complete) img.classList.add("is-loaded"); });
    observeSections();
  }

  function renderHeroExtras() {
    $("hero-content").innerHTML =
      `<h1 class="hero-title">${t("brandName")}</h1>` +
      `<p class="hero-subtitle">${t("brandTagline")}</p>` +
      `<div class="hero-actions">` +
      `<button type="button" class="hero-btn hero-btn--primary" data-act="scroll-down">${icon("shopping-cart", "hero-btn__icon")}${t("orderNow")}</button>` +
      `<a class="hero-btn hero-btn--secondary" href="tel:${R.phone}">${icon("phone", "hero-btn__icon")}${t("callUs")}</a>` +
      `</div>`;
  }

  function renderBrand() {
    const st = S.settings;
    $("brand").innerHTML =
      (st.menu_discount_enabled ? `<p class="mt-8 mb-4 border-y border-primary/30 bg-primary/10 py-3 text-sm font-bold text-primary">خصم ${st.menu_discount_percent}٪ عند الطلب من المنيو الرقمي · لا يشمل رسوم التوصيل</p>` : "");
  }

  const NAV = [
    { id: "offers", key: "navOffers" }, { id: "pizza", key: "navPizza" }, { id: "manaqeesh", key: "navManakish" },
    { id: "calzone", key: "navCalzone" }, { id: "shami", key: "navShami" }, { id: "salads", key: "navSalads" }, { id: "drinks", key: "navDrinks" }
  ];
  const NAV_BTN = `inline-flex items-center justify-center whitespace-nowrap cursor-pointer focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-2 h-11 shrink-0 gap-2 rounded-md px-3 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-primary`;
  const navBtnClass = (active) => `${NAV_BTN} ${active ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`;

  // Full search hint with examples on wider screens; a short one on phones so it isn't cut off
  const wideSearch = window.matchMedia("(min-width: 640px)");
  const searchHint = () => t(wideSearch.matches ? "searchPlaceholder" : "searchPlaceholderShort");
  wideSearch.addEventListener("change", () => { const el = $("search"); if (el) el.placeholder = searchHint(); });

  function renderNav() {
    const rtl = S.lang === "ar";
    $("cat-nav").setAttribute("aria-label", S.lang === "ar" ? "أقسام المنيو" : "Menu categories");
    $("nav").innerHTML =
      `<div class="nav-top"><a href="#" class="nav-brand" data-act="back-top" aria-label="${esc(t("brandName"))}"><img class="nav-brand__logo" src="${window.IMAGES.logo}" alt="" width="40" height="40"></a>` +
      `<div class="nav-search">${icon("search", `pointer-events-none absolute top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-primary ${rtl ? "right-4" : "left-4"}`)}` +
      `<input id="search" class="flex w-full px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-11 rounded-lg border border-primary/40 bg-muted font-semibold placeholder:text-muted-foreground ${rtl ? "pr-11 pl-10" : "pl-11 pr-10"}" placeholder="${esc(searchHint())}" value="${esc(S.query)}">` +
      `<button type="button" id="search-clear" data-act="clear-search" aria-label="${t("searchClear")}" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors ${FOCUS} hover:text-accent-foreground absolute top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:bg-muted ${rtl ? "left-3" : "right-3"}"${S.query ? "" : " hidden"}>${icon("x", "h-4 w-4")}</button></div>` +
      `<button type="button" class="nav-lang" data-act="lang" lang="${S.lang === "ar" ? "en" : "ar"}" aria-label="${t("switchLanguage")}">${icon("globe", "nav-lang__icon")}<span class="nav-lang__full">${t("switchLanguage")}</span><span class="nav-lang__short">${S.lang === "ar" ? "EN" : "ع"}</span></button></div>`;
    $("cat-nav").innerHTML =
      `<div class="flex gap-1 overflow-x-auto scrollbar-hide">${NAV.map((n) => `<button class="${navBtnClass(S.activeNav === n.id)}" data-act="nav" data-id="${n.id}"${S.activeNav === n.id ? ' aria-current="location"' : ""}>${t(n.key)}</button>`).join("")}</div>`;
  }

  function setActiveNav(id) {
    S.activeNav = id;
    document.querySelectorAll('[data-act="nav"]').forEach((b) => {
      const on = b.dataset.id === id;
      b.className = navBtnClass(on);
      if (on) b.setAttribute("aria-current", "location"); else b.removeAttribute("aria-current");
    });
  }

  // Scroll-spy: a tab is selected only once its section has reached the bar under the header.
  // Above the menu (on the hero) no tab is selected.
  function observeSections() {
    const update = () => {
      const line = safeTop() + ($("site-header")?.offsetHeight ?? 0) + (document.querySelector(".cat-nav")?.offsetHeight ?? 0) + 48;
      let current = null;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= line) current = n.id;
      }
      if (current !== S.activeNav) setActiveNav(current);
    };
    if (!observeSections.bound) {
      observeSections.bound = true;
      let queued = false;
      window.addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; update(); }); } }, { passive: true });
      window.addEventListener("resize", update);
    }
    update();
  }


  // Announcement bar above the header: red when closed, gold when busy, green with the delivery notice when open
  function renderStatus() {
    const st = S.settings, state = status(), ar = S.lang === "ar";
    let msg = "", tone = "open";
    if (state === "closed") { msg = ar ? "🚫 المطعم لا يستقبل طلبات حالياً" : "🚫 We are not accepting orders right now"; tone = "closed"; }
    else if (state === "outside_hours") { msg = ar ? `🕘 المطعم مغلق الآن · نفتح ${nextOpeningLabel(st, S.now)}` : `🕘 We're closed now · We open ${nextOpeningLabel(st, S.now, "en")}`; tone = "closed"; }
    else if (state === "busy") { msg = ar ? `🔥 الضغط عالي حالياً · وقت التحضير التقريبي ${st.prep_minutes} دقيقة` : `🔥 We're busy right now · approx. ${st.prep_minutes} min preparation`; tone = "busy"; }
    else if (st.notice) { msg = `🛵 ${esc(ar ? st.notice : st.notice_en || st.notice)}`; }
    if (TEST_OPEN) { msg = ar ? "🧪 وضع التجربة: الطلب مفتوح على جهازك فقط" : "🧪 Test mode: ordering is open on this computer only"; tone = "busy"; }
    $("announce").innerHTML = msg ? `<div class="announce announce--${tone}" role="status">${msg}</div>` : "";
  }


  function renderFab() {
    const n = cartCount();
    // Extra bottom space only while the floating cart button shows, so it never covers the footer
    document.body.classList.toggle("has-cart-fab", n > 0);
    // No "added" popup: the cart button gives a small bump when the count goes up (the card button already shows − 1 +)
    const bump = n > (renderFab.last ?? n);
    renderFab.last = n;
    $("cart-fab").innerHTML = n > 0
      ? `<div class="cart-fab-wrap fixed inset-x-0 flex justify-center z-40"><button class="${C.btnCartFab}${bump ? " cart-bump" : ""}" data-act="open-cart">${icon("shopping-cart", "h-5 w-5")}<span>${t("cartView")} (${n})</span><span class="font-bold">${money(totals(payable(), 0, S.settings.menu_discount_enabled, S.settings.menu_discount_percent).total)}</span></button></div>`
      : "";
  }

  function renderInstall() {
    if (S.installed) { $("install").innerHTML = ""; return; }
    const ua = navigator.userAgent, ios = /iPad|iPhone|iPod/.test(ua) && !window.MSStream, android = /Android/.test(ua);
    const list = (label, keys) => `<div class="rounded-2xl bg-background/70 p-4 text-sm text-foreground"><p class="mb-2 font-medium">${t(label)}</p><ol class="list-decimal ${S.lang === "ar" ? "pr-5 text-right" : "pl-5 text-left"} text-muted-foreground">${keys.map((k) => `<li>${t(k)}</li>`).join("")}</ol></div>`;
    // The install button always shows (as on their live site). Where the browser can't install directly,
    // tapping it reveals the manual steps for that phone instead.
    const steps = ios ? list("installIOSLabel", ["installIOSStep1", "installIOSStep2", "installIOSStep3"])
      : android ? list("installAndroidLabel", ["installAndroidStep1", "installAndroidStep2", "installAndroidStep3"])
        : `<p class="text-sm text-muted-foreground">${t("installGeneric")}</p>`;
    const body = `<button class="${C.btnInstall} install-card__btn" data-act="install">${icon("download", "h-5 w-5")}${t("installButton")}</button>` +
      (S.installHelp ? `<div class="install-steps">${steps}</div>` : "");
    // App-banner layout: icon beside the text (start side), button at the end; on phones the button drops below at full width.
    $("install").innerHTML = `<section class="install-section page-container"><div class="install-card rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-amber-50 shadow-sm"><div class="install-card__row"><img src="${IMG.appIcon}" alt="${t("brandName")}" class="install-card__icon"><div class="install-card__text"><h3 class="install-card__title">${t("installTitle")}</h3><p class="install-card__desc">${t("installDesc")}</p></div>${body}</div></div></section>`;
  }

  // Opening hours (as on their live site) — used in the footer and the closed popup
  function hoursRows() {
    const ar = S.lang === "ar", d = ar ? "rtl" : "ltr";
    const row = (day, time) => `<div class="flex justify-between gap-2"><span>${day}</span><span class="font-medium text-foreground" dir="${d}">${time}</span></div>`;
    return row(ar ? "السبت – الخميس" : "Sat – Thu", ar ? "9:30 ص – 10:00 م" : "9:30 AM – 10:00 PM") +
      row(ar ? "الجمعة" : "Friday", ar ? "10:00 ص – 3:00 م" : "10:00 AM – 3:00 PM");
  }

  function renderFooter() {
    const ar = S.lang === "ar";
    $("footer").innerHTML = `<div class="rounded-2xl border bg-card p-5 shadow-sm"><h3 class="mb-4 text-center text-lg font-bold text-secondary">${t("contactTitle")}</h3><div class="grid gap-3 sm:grid-cols-3"><a href="https://wa.me/${waNumber()}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] p-3 font-semibold text-white transition hover:bg-[#1eb955]">${window.brandIcon("whatsapp", "h-5 w-5")}${t("whatsapp")}</a><a href="${R.instagram}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-3 font-semibold text-white transition hover:opacity-90">${window.brandIcon("instagram", "h-5 w-5")}${t("instagram")}</a><a href="${R.facebook}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] p-3 font-semibold text-white transition hover:bg-[#1565ce]">${window.brandIcon("facebook", "h-5 w-5")}${t("facebook")}</a></div><a class="footer-map mt-4 flex items-start gap-3 rounded-lg bg-muted p-3 text-sm" href="${R.maps}" target="_blank" rel="noopener noreferrer"><img src="${IMG.googleMaps}" alt="" class="footer-map__icon"><span class="flex-1">${R.location[S.lang]}</span><span class="footer-map__cta">${S.lang === "ar" ? "افتح في الخريطة" : "Open in Maps"}${icon("external-link", "h-4 w-4")}</span></a><div class="mt-4 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">${icon("clock", "mt-0.5 h-5 w-5 shrink-0 text-primary")}<div class="flex-1"><div class="font-semibold text-secondary">${t("businessHours")}</div><div class="footer-hours mt-1 flex flex-col gap-0.5 text-muted-foreground">${hoursRows()}</div></div></div></div>`;
  }

  /* ---------- Dialogs ---------- */
  const dir = () => (S.lang === "ar" ? "rtl" : "ltr");
  const closeBtn = (key) => `<button type="button" class="${C.dialogClose}" data-act="close-dialog" data-dlg="${key}">${icon("x", "h-4 w-4")}<span class="sr-only">Close</span></button>`;
  const dialog = (key, cls, inner, attrs = "") => `<div data-dlg-overlay="${key}" data-state="open" class="${C.overlay}" aria-hidden="true"></div><div role="dialog" data-dlg="${key}" data-state="open" class="${cls}" tabindex="-1"${attrs}>${inner}${closeBtn(key)}</div>`;
  const header = (title, extra = "") => `<div class="${C.dialogHeader}"><h2 class="${C.dialogTitle}${extra ? " " + extra : ""}">${title}</h2></div>`;
  const radio = (checked, name, value) => `<button type="button" role="radio" aria-checked="${checked}" data-state="${checked ? "checked" : "unchecked"}" value="${value}" class="${C.radio}" data-act="radio" data-name="${name}" data-value="${value}">${checked ? `<span data-state="checked" class="flex items-center justify-center">${icon("circle", "h-3.5 w-3.5 fill-primary")}</span>` : ""}</button>`;

  // Closed popup: food photo with the logo, when we open next, the weekly hours, and one button to keep browsing
  function closedDialog() {
    const st = S.settings, paused = !st.accepting_orders;
    return dialog("closed", `${C.dialogSm} closed-card`,
      `<div class="closed-card__media"><img src="${IMG.pizza}" alt="" class="closed-card__photo"><img src="${IMG.appIcon}" alt="${t("brandName")}" class="closed-card__logo"></div>` +
      `<div class="closed-card__body">` +
      `<h2 class="closed-card__title">${t(paused ? "closedPausedTitle" : "closedTitle")}</h2>` +
      (paused
        ? `<p class="closed-card__next">${t("closedBackSoon")}</p>`
        : `<p class="closed-card__next">${S.lang === "ar" ? "نفتح" : "We open"} ${nextOpeningLabel(st, S.now, S.lang)}</p>` +
          `<div class="closed-card__hours">${hoursRows()}</div>`) +
      `<p class="closed-card__note">${t("closedBrowseNote")}</p>` +
      `<button class="${C.btnPrimaryFull}" data-act="close-dialog" data-dlg="closed">${t("closedBrowse")}</button>` +
      `</div>`, ` dir="${dir()}"`);
  }

  function typeButtons(selectedId, disabled, act) {
    const align = S.lang === "ar" ? "text-right" : "text-left";
    return `<div class="grid gap-2 sm:grid-cols-2">${M.PIZZA_TYPES.map((p) => {
      const cls = act === "pick-size-type"
        ? `rounded-md border p-3 transition ${align} ${selectedId === p.id ? "border-primary bg-primary/10" : "hover:bg-accent/20"}`
        : `rounded-md border p-3 hover:bg-accent/20 disabled:opacity-40 disabled:cursor-not-allowed transition ${align}`;
      const times = act === "pick-offer-type" ? S.offerPicks.filter((x) => x === p.id).length : 0;
      return `<button class="${cls}${times ? " type-btn--picked" : ""}" data-act="${act}" data-id="${p.id}"${disabled ? " disabled" : ""}><div class="flex items-center justify-between gap-2 font-semibold"><span>${esc(nameOf(p))}</span>${times ? `<span class="type-btn__count">×${times}</span>` : ""}</div><div class="text-xs text-muted-foreground">${esc(S.lang === "en" && p.descEn ? p.descEn : p.desc)}</div></button>`;
    }).join("")}</div>`;
  }

  function offerDialog() {
    const o = S.offer, picks = S.offerPicks, full = picks.length >= o.count;
    return dialog("offer", `${C.dialog} max-h-[90vh] overflow-y-auto`,
      header(esc(nameOf(o))) +
      `<p class="text-sm text-muted-foreground">${t("offerChooseCount")} ${o.count} ${t("offerChoose")}</p>` +
      `<div class="sheet-sticky-top"><div class="rounded-md bg-muted p-3"><div class="mb-2 text-sm font-semibold">${t("offerPicks")} (${picks.length}/${o.count})</div>${picks.length === 0
        ? `<div class="text-xs text-muted-foreground">${t("offerNotSelected")}</div>`
        : `<ol class="space-y-1">${picks.map((id, i) => `<li class="flex items-center justify-between text-sm"><span>${i + 1}. ${esc(nameOf(M.PIZZA_TYPES.find((p) => p.id === id)))}</span><button class="text-destructive text-xs" data-act="unpick-offer" data-index="${i}">${t("remove")}</button></li>`).join("")}</ol>`}</div></div>` +
      typeButtons(null, full, "pick-offer-type") +
      `<div class="${C.dialogFooter} sheet-sticky-bottom"><button class="${C.btnOutline}" data-act="close-dialog" data-dlg="offer">${t("cancel")}</button><button class="${C.btnPrimary}" data-act="confirm-offer"${picks.length !== o.count ? " disabled" : ""}>${t("offerAddToCart")} (${money(o.price)})</button></div>`,
      ` dir="${dir()}"`);
  }

  function sizeDialog() {
    const s = S.size;
    return dialog("size", `${C.dialog} max-h-[90vh] overflow-y-auto`,
      header(esc(nameOf(s))) +
      `<p class="text-sm text-muted-foreground">${t("singleChooseType")}</p>` +
      typeButtons(S.sizePick, false, "pick-size-type") +
      `<div class="${C.dialogFooter} sheet-sticky-bottom"><button class="${C.btnOutline}" data-act="close-dialog" data-dlg="size">${t("cancel")}</button><button class="${C.btnPrimary}" data-act="confirm-size"${S.sizePick ? "" : " disabled"}>${t("offerAddToCart")} (${money(s.price)})</button></div>`,
      ` dir="${dir()}"`);
  }

  function cartDialog() {
    const n = cartCount(), tt = totals(payable(), 0, S.settings.menu_discount_enabled, S.settings.menu_discount_percent);
    // Minus at quantity 1 removes the item — no separate delete button
    const lines = S.cart.map((l) => ({ ...l, ...lineInfo(l) })).map((l) => `<div class="${C.card} p-3"><div class="flex items-start justify-between gap-2"><div class="min-w-0 flex-1"><div class="font-semibold">${esc(l.title)}</div>${l.details ? `<ul class="mt-1 text-xs text-muted-foreground space-y-0.5">${l.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}<div class="mt-1 flex items-baseline gap-2"><span class="text-sm font-bold text-primary">${money(l.price * l.qty)}</span>${l.qty > 1 ? `<span class="text-[11px] text-muted-foreground">${l.qty} × ${money(l.price)}</span>` : ""}</div></div><div class="flex shrink-0 items-center gap-1"><button class="${C.btnIconOutline}" data-act="line-qty" data-line="${l.lineId}" data-delta="-1" aria-label="${l.qty === 1 ? t("remove") : "−1"}">${icon("minus", "h-3 w-3")}</button><span class="w-6 text-center font-bold">${l.qty}</span><button class="${C.btnIconOutline}" data-act="line-qty" data-line="${l.lineId}" data-delta="1" aria-label="+1">${icon("plus", "h-3 w-3")}</button></div></div></div>`).join("");
    const body = S.cart.length === 0
      ? `<div class="py-8 text-center">${icon("shopping-cart", "mx-auto mb-3 h-10 w-10 text-muted-foreground/50")}<p class="text-sm text-muted-foreground">${t("cartEmpty")}</p></div>`
      : `<div class="space-y-2">${lines}<div class="sticky bottom-0 -mx-1 border-t bg-background/95 px-1 pt-3 backdrop-blur">${dealRows("mb-2 flex justify-between text-sm text-primary")}${tt.discount_percent > 0 ? `<div class="mb-2 flex justify-between text-sm text-primary"><span>خصم المنيو ${tt.discount_percent}٪</span><span>-${money(tt.discount_amount)}</span></div>` : ""}<div class="flex items-center justify-between"><span class="font-semibold">${t("cartTotal")}</span><span class="text-lg font-bold text-primary">${money(tt.total)}</span></div></div></div>`;
    return dialog("cart", `${C.dialog} max-h-[90vh] overflow-y-auto`,
      header(`${icon("shopping-cart", "h-5 w-5 text-primary")}<span>${t("cartTitle")}</span>${n > 0 ? `<span class="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">${n}</span>` : ""}`, "flex items-center gap-2") +
      body +
      (!canOrder() && S.cart.length ? `<p class="cart-closed-note">${icon("clock", "h-4 w-4 shrink-0")}<span>${t("closedBrowseNote")}</span></p>` : "") +
      `<div class="${C.dialogFooter}"><button class="${C.btnOutline}" data-act="close-dialog" data-dlg="cart">${t("cartContinue")}</button><button class="${C.btnPrimary}" data-act="checkout"${S.cart.length === 0 ? " disabled" : ""}>${t("cartCheckout")}</button></div>`,
      ` dir="${dir()}"`);
  }

  const deliveryFee = () => (S.co.mode === "delivery" ? (ZONES.find((z) => z.id === S.co.zone)?.fee ?? 0) : 0);
  const checkoutTotals = () => totals(payable(), deliveryFee(), S.settings.menu_discount_enabled, S.settings.menu_discount_percent);
  // Message under a required field, or "" when it is fine
  function fieldError(f) {
    const v = (S.co[f] ?? "").trim();
    if (f === "address" && S.co.mode !== "delivery") return "";
    if (!v) return t("fieldRequired");
    if (f === "phone" && !normPhone(v)) return t("phoneInvalid");
    return "";
  }
  const canPreview = () => S.cart.length > 0 && !fieldError("name") && !fieldError("phone") && !fieldError("address");

  function checkoutDialog() {
    const co = S.co, tt = checkoutTotals(), del = co.mode === "delivery";
    // After a first tap on the button, empty required fields turn red with a short message under them
    const shown = (f) => (S.coTried ? fieldError(f) : "");
    const miss = (f) => (shown(f) ? ' aria-invalid="true"' : "");
    const err = (f) => `<p class="field-error${shown(f) ? "" : " hidden"}">${shown(f)}</p>`;
    const modeLabel = (m) => `<label class="flex items-center gap-2 rounded-md border p-3 cursor-pointer ${co.mode === m ? "border-primary bg-primary/10" : ""}" data-act="radio" data-name="mode" data-value="${m}">${radio(co.mode === m, "mode", m)}<span>${t(m)}</span></label>`;
    return dialog("checkout", `${C.dialog} max-h-[90vh] overflow-y-auto`,
      header(t("checkoutTitle")) +
      `<div class="space-y-4">` +
      `<div><label class="${C.label} mb-2 block">${t("orderType")}</label><div role="radiogroup" dir="${dir()}" class="grid gap-2 grid-cols-2">${modeLabel("pickup")}${modeLabel("delivery")}</div></div>` +
      `<div><label class="${C.label}" for="name">${t("name")}</label><input class="${C.input}" id="name" data-field="name" value="${esc(co.name)}"${miss("name")}>${err("name")}</div>` +
      `<div><label class="${C.label}" for="phone">${t("phone")}</label><input class="${C.input}" id="phone" type="tel" inputmode="tel" autocomplete="tel" data-field="phone" placeholder="07XXXXXXXX" value="${esc(co.phone)}"${miss("phone")}>${err("phone")}</div>` +
      (del ? `<div><label class="${C.label} mb-2 block">${t("deliveryZone")}</label><div role="radiogroup" dir="${dir()}" class="grid gap-2 grid-cols-1">${ZONES.map((z) => `<label class="flex items-center justify-between gap-2 rounded-md border p-3 cursor-pointer ${co.zone === z.id ? "border-primary bg-primary/10" : ""}" data-act="radio" data-name="zone" data-value="${z.id}"><div class="flex items-center gap-2">${radio(co.zone === z.id, "zone", z.id)}<span>${esc(z.name)}</span></div><span class="text-sm font-bold text-primary">${money(z.fee)}</span></label>`).join("")}</div></div>` : "") +
      (del ? `<div><label class="${C.label}" for="addr">${t("address")}</label><textarea class="${C.textarea}" id="addr" data-field="address"${miss("address")}>${esc(co.address)}</textarea>${err("address")}</div>` : "") +
      `<div><label class="${C.label}" for="notes">${t("notes")}</label><textarea class="${C.textarea}" id="notes" data-field="notes">${esc(co.notes)}</textarea></div>` +
      `<div class="border-t pt-3 space-y-1 text-sm"><div class="flex items-center justify-between"><span class="text-muted-foreground">${t("cartSubtotal")}</span><span>${money(cartSubtotal())}</span></div>${dealRows("flex items-center justify-between text-primary")}${tt.discount_percent > 0 ? `<div class="flex items-center justify-between text-primary"><span>خصم المنيو ${tt.discount_percent}٪</span><span>-${money(tt.discount_amount)}</span></div>` : ""}${del ? `<div class="flex items-center justify-between"><span class="text-muted-foreground">${t("deliveryFee")}</span><span>${money(deliveryFee())}</span></div>` : ""}<div class="flex items-center justify-between pt-1 border-t"><span class="font-semibold">${t("cartTotal")}</span><span class="text-lg font-bold text-primary">${money(tt.total)}</span></div></div>` +
      `</div>` +
      `<div class="${C.dialogFooter}"><button class="${C.btnOutline}" data-act="close-dialog" data-dlg="checkout">${t("back")}</button><button class="${C.btnWhatsApp}" data-act="preview" id="preview-btn">${icon("message-circle", "h-4 w-4")}${t("previewMessage")}</button></div>`,
      ` dir="${dir()}"`);
  }

  // The order message goes to the restaurant, so it is always written in Arabic, whatever language the customer browses in
  function buildMessage() {
    const uiLang = S.lang;
    S.lang = "ar";
    try { return buildMessageAr(); } finally { S.lang = uiLang; }
  }
  function buildMessageAr() {
    const co = S.co, tt = checkoutTotals(), del = co.mode === "delivery";
    const when = new Date().toLocaleString("ar-JO-u-nu-latn", { dateStyle: "short", timeStyle: "short", timeZone: R.timeZone });
    const count = cartCount();
    const items = S.cart.map((l, i) => { const x = lineInfo(l, "ar"); return [`${i + 1}) ${x.title} ×${l.qty}`, x.details?.map((d) => `    - ${d}`).join("\n")].filter(Boolean).join("\n"); });
    const line = "━━━━━━━━━━━━";
    const mode = co.mode === "pickup" ? `🏠 ${t("waPickup")}` : `🛵 ${t("waDelivery")}`;
    const zone = ZONES.find((z) => z.id === co.zone)?.name ?? co.zone;
    const customer = [`👤 ${t("waCustomer")}`, `• ${t("waName")}: ${co.name}`, `• ${t("waPhone")}: ${normPhone(co.phone) ?? co.phone}`, `• ${t("waOrderType")}: ${mode}`,
      del ? `• ${t("waZone")}: ${zone}` : null, del ? `• ${t("waAddress")}: ${co.address}` : null, co.notes ? `• ${t("waNotes")}: ${co.notes}` : null].filter(Boolean).join("\n");
    const order = [`🍕 ${t("waOrder")} (${count} ${t("waItems")})`, items.join("\n")].join("\n");
    const sums = [`• ${t("waSubtotal")}: ${money(cartSubtotal())}`, ...pizzaDeals().map((d) => `• ${dealLabel(d)}: -${money(d.amount)}`), tt.discount_percent > 0 ? `• خصم المنيو ${tt.discount_percent}٪: -${money(tt.discount_amount)}` : null,
      del ? `• ${t("waDeliveryFee")}: ${money(deliveryFee())}` : null, `• 💰 ${t("waGrandTotal")}: ${money(tt.total)}`].filter(Boolean).join("\n");
    return [`🌟 ${t("waNewOrder")}`, `🗓 ${when}`, line, customer, line, order, line, sums, "", `${t("waThankYou")} 🙏`].join("\n");
  }

  function previewDialog() {
    const del = S.co.mode === "delivery";
    return dialog("preview", `${C.dialog} max-h-[90vh] overflow-y-auto`,
      header(t("previewTitle")) +
      `<p class="text-xs text-muted-foreground">${t(del ? "previewHint" : "previewHintNameOnly")}</p>` +
      `<div class="grid gap-3 sm:grid-cols-2"><div><label class="${C.label}" for="p-name">${t("name")}</label><input class="${C.input}" id="p-name" data-pfield="name" value="${esc(S.co.name)}"></div>${del ? `<div><label class="${C.label}" for="p-addr">${t("address")}</label><input class="${C.input}" id="p-addr" data-pfield="address" value="${esc(S.co.address)}"></div>` : ""}</div>` +
      `<div><label class="${C.label}" for="p-msg">${S.lang === "ar" ? "نص الرسالة" : "Message text"}</label><textarea class="${C.textareaMono}" id="p-msg">${esc(S.preview)}</textarea></div>` +
      `<div class="${C.dialogFooter}"><button class="${C.btnOutline}" data-act="close-dialog" data-dlg="preview">${t("editData")}</button><button class="${C.btnWhatsApp}" data-act="send"${S.sending ? " disabled" : ""}>${icon("message-circle", "h-4 w-4")}${t("sendWhatsApp")}</button></div>`,
      ` dir="${dir()}"`);
  }

  function sentDialog() {
    return dialog("sent", C.dialogSm,
      `<div class="sent-card">${icon("message-circle", "sent-card__icon")}<h2 class="sent-card__title">${t("sentTitle")}</h2><p class="sent-card__text">${t("sentText")}</p>` +
      `<button class="${C.btnPrimaryFull}" data-act="sent-yes">${t("sentYes")}</button>` +
      `<button class="${C.btnOutline} w-full" data-act="sent-again">${icon("message-circle", "h-4 w-4")}${t("sentAgain")}</button></div>`, ` dir="${dir()}"`);
  }

  const closedKey = () => (canOrder() ? null : `${status()}:${nextOpeningLabel(S.settings, S.now)}`);
  const closedOpen = () => closedKey() !== null && S.closedDismissed !== closedKey();

  function renderPortal() {
    let html = "";
    if (S.offer) html += offerDialog();
    if (S.size) html += sizeDialog();
    if (S.cartOpen) html += cartDialog();
    if (S.checkoutOpen) html += checkoutDialog();
    if (S.preview !== null) html += previewDialog();
    if (S.sentCheck) html += sentDialog();
    if (closedOpen()) html += closedDialog();   // last = on top, so it is never hidden behind another window
    const portal = $("portal");
    const scrollers = {};
    portal.querySelectorAll("[data-dlg][role=dialog]").forEach((d) => { scrollers[d.dataset.dlg] = d.scrollTop; });
    portal.innerHTML = html;
    portal.querySelectorAll("[data-dlg][role=dialog]").forEach((d) => { if (scrollers[d.dataset.dlg]) d.scrollTop = scrollers[d.dataset.dlg]; });
    document.body.style.overflow = html ? "hidden" : "";
    syncHistory(portal.querySelectorAll("[role=dialog]").length);
  }

  // Phone back button: closes the open window instead of leaving the menu.
  // Every window that opens adds one history step; closing it with × removes that step again.
  let histDepth = 0, skipPop = false;
  function syncHistory(n) {
    if (n > histDepth) { for (let i = histDepth; i < n; i++) history.pushState({ pnhDialog: i + 1 }, ""); histDepth = n; }
    else if (n < histDepth) { const back = histDepth - n; histDepth = n; skipPop = true; history.go(-back); }
  }
  window.addEventListener("popstate", () => {
    if (skipPop) { skipPop = false; return; }
    const key = topDialogKey();
    if (!key) return;
    histDepth = Math.max(0, histDepth - 1);
    closeDialog(key);
  });

  function openDialog(fn) {
    fn();
    renderPortal();
    const all = $("portal").querySelectorAll("[role=dialog]");
    all[all.length - 1]?.focus({ preventScroll: true });
  }

  // Plays the close animation, then updates state
  function closeDialog(key, after) {
    const content = $("portal").querySelector(`[role=dialog][data-dlg="${key}"]`);
    const overlay = $("portal").querySelector(`[data-dlg-overlay="${key}"]`);
    const finish = () => {
      if (key === "closed") { S.closedDismissed = closedKey(); try { sessionStorage.setItem("pnh-closed-seen", S.closedDismissed); } catch { /* ignore */ } }
      if (key === "offer") { S.offer = null; S.offerPicks = []; }
      if (key === "size") { S.size = null; S.sizePick = ""; }
      if (key === "cart") S.cartOpen = false;
      if (key === "checkout") S.checkoutOpen = false;
      if (key === "preview") S.preview = null;
      if (key === "sent") S.sentCheck = false;
      after?.();
      renderPortal();
    };
    if (!content) return finish();
    content.dataset.state = "closed";
    if (overlay) overlay.dataset.state = "closed";
    setTimeout(finish, 180);
  }

  const topDialogKey = () => {
    const all = $("portal").querySelectorAll('[role=dialog][data-state="open"]');
    return all[all.length - 1]?.dataset.dlg;
  };

  /* ---------- Events ---------- */

  function send() {
    if (S.sending) return;
    S.sending = true;
    const msg = S.preview ?? buildMessage();
    S.lastMessage = msg;
    window.open(`https://wa.me/${waNumber()}?text=${encodeURIComponent(msg)}`, "_blank");
    // Don't empty the cart yet: WhatsApp may not have opened, or the customer may come back without sending.
    // Ask first; the cart is only cleared once they say the message went out.
    S.sending = false;
    S.preview = null;
    S.checkoutOpen = false;
    S.sentCheck = true;
    renderPortal();
  }

  /* ---------- Order lock (closed / outside hours) ---------- */
  const ORDER_ACTS = new Set(["scroll-down", "add", "open-offer", "confirm-offer", "open-size", "confirm-size", "checkout", "preview", "send"]);   // the cart itself stays viewable
  const ORDER_SELECTOR = [...ORDER_ACTS].map((x) => `[data-act="${x}"]`).join(",");
  function showClosedNotice() {
    S.closedDismissed = null;
    renderPortal();
  }
  // Mark order buttons as unavailable so they look and read as disabled
  function syncOrderLock() {
    const locked = !canOrder();
    document.documentElement.classList.toggle("ordering-closed", locked);
    document.querySelectorAll(ORDER_SELECTOR).forEach((b) => {
      if (locked) {
        b.setAttribute("aria-disabled", "true");
        const hovers = [...b.classList].filter((c) => c.startsWith("hover:"));
        if (hovers.length) { b.dataset.hover = hovers.join(" "); b.classList.remove(...hovers); }
      } else {
        b.removeAttribute("aria-disabled");
        if (b.dataset.hover) { b.classList.add(...b.dataset.hover.split(" ")); delete b.dataset.hover; }
      }
    });
  }
  new MutationObserver(syncOrderLock).observe(document.body, { childList: true, subtree: true });

  document.addEventListener("click", (e) => {
    const overlay = e.target.closest("[data-dlg-overlay]");
    if (overlay) { closeDialog(overlay.dataset.dlgOverlay); return; }
    const el = e.target.closest("[data-act]");
    if (!el || el.disabled) return;
    const a = el.dataset.act, id = el.dataset.id;

    // Outside opening hours (or orders paused) every order action is locked; the menu stays browsable
    if (ORDER_ACTS.has(a) && !canOrder()) { e.preventDefault(); e.stopPropagation(); showClosedNotice(); return; }
    switch (a) {
      case "lang": S.lang = S.lang === "ar" ? "en" : "ar"; store.set("pnh-lang", S.lang); renderAll(); break;
      case "scroll-down": document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" }); break;
      case "nav": document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); break;
      case "clear-search": S.query = ""; $("search").value = ""; $("search-clear").hidden = true; renderMain(); break;
      case "back-top": /* logo in the header */ e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); break;
      case "install": if (S.installPrompt) { S.installPrompt.prompt(); S.installPrompt.userChoice.then(({ outcome }) => { if (outcome === "accepted") { S.installPrompt = null; renderInstall(); } }); } else { S.installHelp = !S.installHelp; renderInstall(); } break;
      case "add": e.stopPropagation(); addSimple(findItem(id)); break;
      case "dec": e.stopPropagation(); decSimple(id); break;
      case "open-offer": openDialog(() => { S.offer = M.OFFERS.find((o) => o.id === id); S.offerPicks = []; }); break;
      case "pick-offer-type": if (S.offerPicks.length < S.offer.count) { S.offerPicks.push(id); renderPortal(); } break;
      case "unpick-offer": S.offerPicks.splice(Number(el.dataset.index), 1); renderPortal(); break;
      case "confirm-offer": {
        const o = S.offer, picks = [...S.offerPicks];
        closeDialog("offer", () => {
          S.cart.push({ lineId: uid(), kind: "offer", offerId: o.id, picks, qty: 1 });
          cartChanged();
        });
        break;
      }
      case "open-size": openDialog(() => { S.size = M.PIZZA_SIZES.find((s) => s.id === id); S.sizePick = ""; }); break;
      case "pick-size-type": S.sizePick = id; renderPortal(); break;
      case "confirm-size": {
        const sizeId = S.size.id, typeId = S.sizePick;
        closeDialog("size", () => {
          const line = S.cart.find((l) => l.kind === "pizza" && l.sizeId === sizeId && l.typeId === typeId);
          if (line) line.qty += 1; else S.cart.push({ lineId: uid(), kind: "pizza", sizeId, typeId, qty: 1 });
          cartChanged();
        });
        break;
      }
      case "open-cart": openDialog(() => { S.cartOpen = true; }); break;
      case "line-qty": S.cart = S.cart.map((l) => (l.lineId === el.dataset.line ? { ...l, qty: l.qty + Number(el.dataset.delta) } : l)).filter((l) => l.qty > 0); cartChanged(); break;
      case "checkout": S.cartOpen = false; S.checkoutOpen = true; S.coTried = false; renderPortal(); break;
      case "radio": e.preventDefault(); S.co[el.dataset.name] = el.dataset.value; saveCustomer(); renderPortal(); break;
      case "preview":
        if (!canPreview()) { S.coTried = true; renderPortal(); $("portal").querySelector('[aria-invalid="true"]')?.focus(); break; }
        openDialog(() => { S.preview = buildMessage(); }); break;
      case "send": send(); break;
      case "sent-yes": closeDialog("sent", () => { S.cart = []; S.co.notes = ""; cartChanged(); }); break;
      case "sent-again": window.open(`https://wa.me/${waNumber()}?text=${encodeURIComponent(S.lastMessage ?? buildMessage())}`, "_blank"); break;
      case "close-dialog": closeDialog(el.dataset.dlg); break;
    }
  });

  // Search lives in the header, results in #main (below the hero): bring the results up under the bars
  function scrollToResults() {
    // Scroll until the category bar sticks under the header; the results start right below it
    const top = document.querySelector(".cat-nav").getBoundingClientRect().top + window.scrollY - ($("site-header")?.offsetHeight ?? 0) - safeTop();
    if (window.scrollY < top - 1) window.scrollTo({ top, behavior: "auto" });
  }

  document.addEventListener("input", (e) => {
    const el = e.target;
    if (el.id === "search") {
      S.query = el.value;
      $("search-clear").hidden = !S.query;
      renderMain();
      if (S.query.trim()) scrollToResults();
    } else if (el.dataset.field) {
      S.co[el.dataset.field] = el.value;
      saveCustomer();
      if (S.coTried && el.nextElementSibling?.classList.contains("field-error")) {
        const msg = fieldError(el.dataset.field);
        if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
        el.nextElementSibling.textContent = msg;
        el.nextElementSibling.classList.toggle("hidden", !msg);
      }
    } else if (el.dataset.pfield) {
      const f = el.dataset.pfield, key = f === "name" ? T.waName.ar : T.waAddress.ar;   // the message is always Arabic
      S.co[f] = el.value;
      saveCustomer();
      S.preview = S.preview && S.preview.replace(new RegExp(`${key}: .*`), `${key}: ${el.value}`);
      $("p-msg").value = S.preview;
    } else if (el.id === "p-msg") {
      S.preview = el.value;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const key = topDialogKey();
    if (key) closeDialog(key);
  });

  window.addEventListener("scroll", () => {
    const d = document.documentElement, top = d.scrollTop || document.body.scrollTop, max = d.scrollHeight - d.clientHeight;
    $("progress").style.transform = `scaleX(${max > 0 ? top / max : 0})`;
  }, { passive: true });

  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); S.installPrompt = e; renderInstall(); });
  window.addEventListener("appinstalled", () => { S.installed = true; S.installPrompt = null; renderInstall(); });

  const tick = () => { S.now = new Date(); renderStatus(); renderFab(); renderPortal(); syncOrderLock(); };
  setInterval(tick, 15000);
  window.addEventListener("focus", tick);

  /* ---------- Boot ---------- */
  // Category tabs stick directly under the header: expose the header's live height as a CSS variable
  const headerObserver = new ResizeObserver(([entry]) => {
    document.documentElement.style.setProperty("--header-height", `${entry.target.offsetHeight}px`);
  });
  headerObserver.observe($("site-header"));

  function renderAll() {
    document.documentElement.dir = S.lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = S.lang;
    $("app").dir = S.lang === "ar" ? "rtl" : "ltr";
    renderHeroExtras();
    renderBrand();
    renderNav();
    renderStatus();
    renderMain();
    renderInstall();
    renderFooter();
    renderFab();
    renderPortal();
  }

  document.title = T.brandName.ar + " - قائمة الطلب";
  loadSaved();   // bring back the cart and the customer's details from this phone
  // Offline support: the menu opens even without internet (only on the real website — service workers don't run from a file)
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => { /* not critical */ }));
  }
  // Item photos show a shimmering placeholder until they finish loading
  document.addEventListener("load", (e) => { if (e.target.classList?.contains("item-card__img")) e.target.classList.add("is-loaded"); }, true);
  document.addEventListener("error", (e) => { if (e.target.classList?.contains("item-card__img")) e.target.classList.add("is-loaded"); }, true);
  renderAll();
  $("main").removeAttribute("aria-busy");
})();
