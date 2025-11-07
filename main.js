/* main.js — The Big Taste
   Features:
   - Full weekly menus
   - Add/remove/quantity with localStorage
   - WhatsApp order (manual or automated)
   - Paystack checkout + WhatsApp receipt sending
*/

const PAYSTACK_KEY = 'pk_live_9372515233e4b6a764c90df064a994aff9d56aaf'; // Replace with your real key
const WHATSAPP_PHONE = '23470512218928'; // Your business WhatsApp number
const LOCALSTORAGE_KEY = 'bt_cart_v1';

const dayMenus = {
  monday: [
    { name: "Fried Rice", price: 1500, img: "fried.jpg" },
    { name: "Jollof Rice", price: 1200, img: "jollof.jpg" },
    { name: "Dodo", price: 600, img: "dodo.jpg" },
    { name: "Beans & Plantain", price: 1300, img: "beans.jpeg" },
    { name: "Egusi Vegetable Soup", price: 1500, img: "egusi.jpg" },
    { name: "Eba", price: 500, img: "eba.jpg" },
    { name: "Fufu", price: 500, img: "fufu.jpg" },
    { name: "Turkey", price: 2000, img: "turkey.jpg" },
    { name: "Chicken", price: 1800, img: "chicken.jpg" },
    { name: "Beef", price: 1000, img: "beef.jpg" },
    { name: "Fish", price: 1500, img: "fish.jpeg" }
  ],
  tuesday: [
    { name: "Fried Rice", price: 1500, img: "fried.jpg" },
    { name: "White Rice & Stew", price: 1300, img: "white.jpg" },
    { name: "Salad", price: 1000, img: "salad.jpg" },
    { name: "Fried Beans & Dodo", price: 1200, img: "beans.jpeg" },
    { name: "Vegetable Soup", price: 1500, img: "veg.jpeg" },
    { name: "Ogbono Soup", price: 1500, img: "ogbono.jpeg" },
    { name: "Chicken", price: 1800, img: "chicken.jpg" },
    { name: "Fish", price: 1500, img: "fish.jpeg" },
    { name: "Boiled Egg", price: 500, img: "eggs.jpeg" }
  ],
  wednesday: [
    { name: "Fried Rice", price: 1500, img: "fried.jpg" },
    { name: "Jollof Rice", price: 1200, img: "jollof.jpg" },
    { name: "Dodo & Fried Beans", price: 1300, img: "beans.jpeg" },
    { name: "Turkey", price: 2000, img: "turkey.jpg" },
    { name: "Chicken", price: 1800, img: "chicken.jpg" },
    { name: "Fish", price: 1500, img: "fish.jpeg" },
    { name: "Egg", price: 500, img: "eggs.jpeg" }
  ],
  thursday: [
    { name: "Fried Rice", price: 1500, img: "fried.jpg" },
    { name: "Jollof Rice", price: 1200, img: "jollof.jpg" },
    { name: "Dodo", price: 600, img: "dodo.jpg" },
    { name: "Beans & Plantain", price: 1300, img: "beans.jpeg" },
    { name: "Egusi Vegetable Soup", price: 1500, img: "egusi.jpg" },
    { name: "Eba", price: 500, img: "eba.jpg" },
    { name: "Fufu", price: 500, img: "fufu.jpg" },
    { name: "Turkey", price: 2000, img: "turkey.jpg" },
    { name: "Chicken", price: 1800, img: "chicken.jpg" },
    { name: "Beef", price: 1000, img: "beef.jpg" },
    { name: "Fish", price: 1500, img: "fish.jpeg" }
  ],
  friday: [
    { name: "Fried Rice", price: 1500, img: "fried.jpg" },
    { name: "Jollof Rice", price: 1200, img: "jollof.jpg" },
    { name: "Dodo", price: 600, img: "dodo.jpg" },
    { name: "Beans & Plantain", price: 1300, img: "beans.jpeg" },
    { name: "Egusi Vegetable Soup", price: 1500, img: "egusi.jpg" },
    { name: "Eba", price: 500, img: "eba.jpg" },
    { name: "Fufu", price: 500, img: "fufu.jpg" },
    { name: "Turkey", price: 2000, img: "turkey.jpg" },
    { name: "Chicken", price: 1800, img: "chicken.jpg" },
    { name: "Beef", price: 1000, img: "beef.jpg" },
    { name: "Fish", price: 1500, img: "fish.jpeg" }
  ],
  saturday: [
    { name: "Fried Rice", price: 1500, img: "fried.jpg" },
    { name: "Jollof Rice", price: 1200, img: "jollof.jpg" },
    { name: "Dodo", price: 600, img: "dodo.jpg" },
    { name: "Beans & Plantain", price: 1300, img: "beans.jpeg" },
    { name: "Egusi Vegetable Soup", price: 1500, img: "egusi.jpg" },
    { name: "Eba", price: 500, img: "eba.jpg" },
    { name: "Fufu", price: 500, img: "fufu.jpg" },
    { name: "Turkey", price: 2000, img: "turkey.jpg" },
    { name: "Chicken", price: 1800, img: "chicken.jpg" },
    { name: "Beef", price: 1000, img: "beef.jpg" },
    { name: "Fish", price: 1500, img: "fish.jpeg" }
  ],
  sunday: [
    { name: "Fried Rice", price: 1500, img: "fried.jpg" },
    { name: "Jollof Rice", price: 1200, img: "jollof.jpg" },
    { name: "Dodo & Fried Beans", price: 1300, img: "beans.jpeg" },
    { name: "Turkey", price: 2000, img: "turkey.jpg" },
    { name: "Chicken", price: 1800, img: "chicken.jpg" },
    { name: "Fish", price: 1500, img: "fish.jpeg" },
    { name: "Egg", price: 500, img: "eggs.jpeg" }
  ]
};

// ---------- DOM REFS ----------
const menuContainer = document.getElementById('menuContainer');
const daySelect = document.getElementById('daySelect');
const cartItemsContainer = document.querySelector('.cart-items');
const totalDisplay = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout');
const whatsappBtn = document.getElementById('whatsappOrder');

let cart = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]');

function saveCart() { localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(cart)); }
function formatCurrency(n) { return n.toLocaleString(); }

// ---------- RENDER MENU ----------
function renderMenu(dayKey) {
  const meals = dayMenus[dayKey] || [];
  if (!meals.length) {
    menuContainer.innerHTML = '<p style="color:#777">No items for this day.</p>';
    return;
  }
  menuContainer.innerHTML = meals.map((meal, idx) => `
    <div class="menu-card" data-idx="${idx}">
      <img src="${meal.img}" alt="${meal.name}" loading="lazy">
      <h4>${meal.name}</h4>
      <p class="price">₦${formatCurrency(meal.price)}</p>
      <button class="add-btn" data-name="${escapeHtml(meal.name)}" data-price="${meal.price}">Add to Cart</button>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

// ---------- CART FUNCTIONS ----------
function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) existing.qty++;
  else cart.push({ name, price, qty: 1 });
  updateCartUI(); saveCart();
}

function removeFromCart(index) {
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  updateCartUI(); saveCart();
}

function changeQty(index, delta) {
  const item = cart[index];
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(index);
  else { updateCartUI(); saveCart(); }
}

function updateCartUI() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<li style="text-align:center;color:#888;">Cart is empty</li>';
    totalDisplay.textContent = '0';
    return;
  }
  cartItemsContainer.innerHTML = cart.map((item, i) => `
    <li>
      <div style="display:flex;gap:8px;align-items:center;">
        <button class="qty-btn" data-action="decrease" data-index="${i}">-</button>
        <strong>${escapeHtml(item.name)}</strong>
        <button class="qty-btn" data-action="increase" data-index="${i}">+</button>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span>₦${formatCurrency(item.price * item.qty)}</span>
        <button class="remove-item" data-index="${i}">×</button>
      </div>
    </li>
  `).join('');
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
  totalDisplay.textContent = formatCurrency(total);
}

// ---------- MODAL ----------
function createDeliveryModal() {
  if (document.getElementById('deliveryModal')) return document.getElementById('deliveryModal');
  const modal = document.createElement('div');
  modal.id = 'deliveryModal';
  modal.style = `
    position: fixed; inset: 0; display:flex; align-items:center; justify-content:center;
    background: rgba(0,0,0,0.5); z-index: 9999; padding: 20px;
  `;
  modal.innerHTML = `
    <div style="width:100%;max-width:520px;background:#fff;border-radius:10px;padding:18px;">
      <h3 style="color:#e67e22">Delivery Details</h3>
      <p>Enter your name, phone, WhatsApp and address.</p>
      <div style="display:grid;gap:8px;">
        <input id="del_name" placeholder="Full name" style="padding:10px;border-radius:6px;border:1px solid #ddd" />
        <input id="del_phone" placeholder="Phone number" style="padding:10px;border-radius:6px;border:1px solid #ddd" />
        <input id="del_whatsapp" placeholder="WhatsApp number" style="padding:10px;border-radius:6px;border:1px solid #ddd" />
        <textarea id="del_address" placeholder="Delivery address" rows="3" style="padding:10px;border-radius:6px;border:1px solid #ddd"></textarea>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">
        <button id="del_cancel" style="background:#ccc;border:none;padding:8px 12px;border-radius:6px;cursor:pointer">Cancel</button>
        <button id="del_submit" style="background:#e67e22;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer">Continue to Pay</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  document.getElementById('del_cancel').addEventListener('click', () => modal.remove());
  return modal;
}

// ---------- PAYSTACK + WHATSAPP RECEIPT ----------
checkoutBtn.addEventListener('click', () => {
  if (!cart.length) return alert('Your cart is empty!');
  const modal = createDeliveryModal(); modal.style.display = 'flex';
  document.getElementById('del_submit').onclick = function () {
    const name = del_name.value.trim(), phone = del_phone.value.trim(), whatsapp = del_whatsapp.value.trim(), address = del_address.value.trim();
    if (!name || !phone || !address) return alert('Please complete all required fields.');
    localStorage.setItem('bt_delivery', JSON.stringify({ name, phone, whatsapp, address }));
    openPaystackCheckout({ name, phone, whatsapp, address });
    modal.remove();
  };
});

function openPaystackCheckout(delivery) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (!window.PaystackPop) return alert('Paystack not loaded.');
  const orderItemsString = cart.map(i => `${i.name} x${i.qty}`).join(', ');
  const handler = PaystackPop.setup({
    key: PAYSTACK_KEY,
    email: prompt('Enter your email for receipt (optional):', '') || '',
    amount: total * 100,
    currency: 'NGN',
    ref: 'BT' + Math.floor(Math.random() * 1000000000 + 1),
    metadata: { custom_fields: [
      { display_name: 'Customer Name', value: delivery.name },
      { display_name: 'Customer Phone', value: delivery.phone },
      { display_name: 'Delivery Address', value: delivery.address },
      { display_name: 'Order Items', value: orderItemsString }
    ]},
    callback: function(response) {
      const receiptMsg = `
✅ *Payment Successful!*
Ref: ${response.reference}
Customer: ${delivery.name}
Phone: ${delivery.phone}
Address: ${delivery.address}

*Items Ordered:*
${orderItemsString}

Total: ₦${formatCurrency(total)}

Thank you for choosing *The Big Taste!* 🍛
      `;
      if (delivery.whatsapp) {
        const whatsappUrl = `https://wa.me/${delivery.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(receiptMsg)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        alert('Payment successful! Receipt could not be sent because WhatsApp number was not provided.');
      }
      cart = []; saveCart(); updateCartUI();
    },
    onClose: function() { alert('Payment window closed.'); }
  });
  handler.openIframe();
}

// ---------- INIT ----------
(function init() {
  const today = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  daySelect.value = (today in dayMenus) ? today : 'monday';
  renderMenu(daySelect.value);
  updateCartUI();
  daySelect.addEventListener('change', (e) => renderMenu(e.target.value));
  menuContainer.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.add-btn');
    if (btn) addToCart(btn.dataset.name, parseInt(btn.dataset.price));
  });
  cartItemsContainer.addEventListener('click', (ev) => {
    const r = ev.target.closest('.remove-item');
    const q = ev.target.closest('.qty-btn');
    if (r) removeFromCart(parseInt(r.dataset.index));
    if (q) changeQty(parseInt(q.dataset.index), q.dataset.action === 'increase' ? 1 : -1);
  });
})();
