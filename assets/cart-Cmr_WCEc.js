import{f as n}from"./main-BwC6oJc1.js";/* empty css             */let r=JSON.parse(localStorage.getItem("ublioCart"))||[];function s(){const t=document.getElementById("cartItems"),a=document.getElementById("checkoutBtn");if(r.length===0){t.innerHTML=`
          <div class="empty-cart" style="text-align: center; padding: var(--space-12); background: var(--color-gray-100); border-radius: var(--radius-lg);">
            <svg width="80" height="80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="margin: 0 auto var(--space-6); opacity: 0.5;">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h3>Your cart is empty</h3>
            <p style="color: var(--color-gray-600); margin: var(--space-4) 0;">Add some luxury audio equipment to get started</p>
            <a href="/src/pages/products.html" class="btn btn-primary mt-6">Browse Products</a>
          </div>
        `,a.disabled=!0,m();return}a.disabled=!1,t.innerHTML=r.map(e=>`
        <div class="cart-item card" style="display: grid; grid-template-columns: 120px 1fr auto; gap: var(--space-5); padding: var(--space-5); margin-bottom: var(--space-4);">
          <img src="${e.image}" alt="${e.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: var(--radius-md);">
          <div>
            <h4>${e.name}</h4>
            <p style="color: var(--color-primary); font-size: var(--text-xl); font-weight: 700; margin-top: var(--space-2);">₹${n(e.price)}</p>
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-top: var(--space-4);">
              <button class="btn btn-sm btn-ghost qty-decrease" data-id="${e.id}">−</button>
              <span class="quantity-display" style="min-width: 30px; text-align: center; font-weight: 600;">${e.quantity}</span>
              <button class="btn btn-sm btn-ghost qty-increase" data-id="${e.id}">+</button>
            </div>
          </div>
          <div style="text-align: right;">
            <p style="font-weight: 700; font-size: var(--text-lg);">₹${n(e.price*e.quantity)}</p>
            <button class="btn btn-ghost btn-sm mt-4 remove-item" data-id="${e.id}" style="color: var(--color-error);">Remove</button>
          </div>
        </div>
      `).join(""),p(),m()}function p(){document.querySelectorAll(".qty-increase").forEach(t=>{t.addEventListener("click",function(){const a=this.getAttribute("data-id");u(a,1)})}),document.querySelectorAll(".qty-decrease").forEach(t=>{t.addEventListener("click",function(){const a=this.getAttribute("data-id");u(a,-1)})}),document.querySelectorAll(".remove-item").forEach(t=>{t.addEventListener("click",function(){const a=this.getAttribute("data-id");g(a)})})}function u(t,a){const e=r.find(o=>o.id===t);e&&(e.quantity+=a,e.quantity<=0&&(r=r.filter(o=>o.id!==t)),localStorage.setItem("ublioCart",JSON.stringify(r)),s())}function g(t){confirm("Remove this item from cart?")&&(r=r.filter(a=>a.id!==t),localStorage.setItem("ublioCart",JSON.stringify(r)),s())}function m(){const t=r.reduce((c,i)=>c+i.price*i.quantity,0),a=t>=2e4?0:t>0?100:0,e=Math.round(t*.18),o=t+a+e;document.getElementById("subtotal").textContent=`₹${n(t)}`,document.getElementById("shipping").textContent=a===0?"Free":`₹${n(a)}`,document.getElementById("tax").textContent=`₹${n(e)}`,document.getElementById("total").textContent=`₹${n(o)}`;const d=document.getElementById("cartCount"),l=r.reduce((c,i)=>c+i.quantity,0);d.textContent=l,d.style.display=l>0?"flex":"none"}s();
