import{u as e}from"./main-BwC6oJc1.js";/* empty css             */const o=JSON.parse(localStorage.getItem("ublioUser"));!o||!o.loggedIn?window.location.href="/src/pages/auth/login.html":document.getElementById("userInfo").innerHTML=`
        <div class="card" style="padding: var(--space-6); background: var(--color-gray-100);">
          <p style="font-size: var(--text-lg); margin-bottom: var(--space-2);">Welcome back, <strong>${o.name||o.email}</strong>!</p>
          <p style="color: var(--color-gray-600);">Email: ${o.email}</p>
        </div>
      `;window.logout=function(){localStorage.removeItem("ublioUser"),window.location.href="/"};e();
