import{p as i,f as d,u as n}from"./main-BwC6oJc1.js";/* empty css             */const l=new URLSearchParams(window.location.search),p=l.get("id"),t=i.products.find(s=>s.id===p);if(!t)document.getElementById("productContainer").innerHTML="<p>Product not found</p>";else{document.getElementById("pageTitle").textContent=`${t.name} - Ublio`;const e=`/src/assets/images/products/${{headphones:"headphones","studio-headphones":"studio-headphones",earbuds:"earbuds",speakers:"speakers",soundbars:"soundbars","home-theatre":"home-theatre",turntable:"turntable",spectacles:"spectacles",collaboration:"collaboration"}[t.category]||"products"}/${t.images[0]}`;document.getElementById("productContainer").innerHTML=`
        <div class="product-detail-grid">
          <div class="product-images">
            <img src="${e}" alt="${t.name}" class="main-image">
          </div>
          <div class="product-info">
            <h1>${t.name}</h1>
            <p class="product-category">${u(t.category)}</p>
            <p>${t.shortDescription}</p>
            <div class="price">₹${d(t.price)}</div>
            <button class="btn btn-primary add-to-cart-main" onclick="addToCart('${t.id}')">Add to Cart</button>
            
            <h3 style="margin-top: var(--space-8);">Features</h3>
            <ul class="features-list">
              ${t.features.map(a=>`<li>${a}</li>`).join("")}
            </ul>
            
            <h3 style="margin-top: var(--space-8);">Specifications</h3>
            <table class="specs-table">
              ${Object.entries(t.specifications).map(([a,o])=>`
                <tr><td>${a}</td><td>${o}</td></tr>
              `).join("")}
            </table>
            
            <h3 style="margin-top: var(--space-8);">What's in the Box</h3>
            <ul class="features-list">
              ${t.inBox.map(a=>`<li>${a}</li>`).join("")}
            </ul>
          </div>
        </div>
      `}window.addToCart=function(s){const e=i.products.find(r=>r.id===s);if(!e)return;let a=JSON.parse(localStorage.getItem("ublioCart"))||[];const o=a.find(r=>r.id===s),c={headphones:"headphones","studio-headphones":"studio-headphones",earbuds:"earbuds",speakers:"speakers",soundbars:"soundbars","home-theatre":"home-theatre",turntable:"turntable",spectacles:"spectacles",collaboration:"collaboration"}[e.category]||"products";o?o.quantity+=1:a.push({id:e.id,name:e.name,price:e.price,image:`/src/assets/images/products/${c}/${e.images[0]}`,quantity:1}),localStorage.setItem("ublioCart",JSON.stringify(a)),n(),alert(`${e.name} added to cart!`)};function u(s){const e=i.categories.find(a=>a.id===s);return e?e.name:""}n();
