import{f as t}from"./main-BwC6oJc1.js";/* empty css             */const r=JSON.parse(localStorage.getItem("ublioCart"))||[],a=r.reduce((e,n)=>e+n.price*n.quantity,0),o=a>=2e4?0:100,s=Math.round(a*.18),p=a+o+s;document.getElementById("orderSummary").innerHTML=`
      <div style="margin-bottom: var(--space-4);">
        ${r.map(e=>`
          <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-3);">
            <span>${e.name} x${e.quantity}</span>
            <span>₹${t(e.price*e.quantity)}</span>
          </div>
        `).join("")}
      </div>
      <hr style="margin: var(--space-4) 0; border: none; border-top: 1px solid var(--color-gray-300);">
      <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-3);">
        <span>Subtotal:</span>
        <span>₹${t(a)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-3);">
        <span>Shipping:</span>
        <span>${o===0?"Free":"₹"+t(o)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-4);">
        <span>Tax (GST 18%):</span>
        <span>₹${t(s)}</span>
      </div>
      <hr style="margin: var(--space-4) 0; border: none; border-top: 1px solid var(--color-gray-300);">
      <div style="display: flex; justify-content: space-between; font-size: var(--text-xl); font-weight: 700;">
        <span>Total:</span>
        <span style="color: var(--color-primary);">₹${t(p)}</span>
      </div>
    `;document.getElementById("checkoutForm").addEventListener("submit",e=>{if(e.preventDefault(),document.querySelector('input[name="payment"]:checked').value==="online"){const i={key:"rzp_test_1234567890",amount:p*100,currency:"INR",name:"UBLIO Audio",description:"Premium Audio Products",image:"/logo.png",handler:function(c){localStorage.removeItem("ublioCart"),alert("Payment Successful! Order ID: #UBL"+Date.now()),window.location.href="/"},prefill:{name:document.querySelector('input[name="name"]').value,email:document.querySelector('input[name="email"]').value,contact:document.querySelector('input[name="phone"]').value},theme:{color:"#D4AF37"}};new Razorpay(i).open()}else localStorage.removeItem("ublioCart"),alert("Order placed successfully! Order ID: #UBL"+Date.now()),window.location.href="/"});
