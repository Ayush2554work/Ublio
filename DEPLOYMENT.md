# Ublio E-Commerce - Deployment Guide

## 🚀 Deployment Options

### Option 1: Netlify (Recommended - Free)

1. **Build the project:**
```bash
npm run build
```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repo for automatic deployments

3. **Custom Domain:**
   - In Netlify dashboard → Domain settings
   - Add your custom domain
   - Update DNS records as shown

### Option 2: Vercel (Fast & Free)

1. **Build:**
```bash
npm run build
```

2. **Deploy:**
```bash
npx vercel
```

3. **Add Custom Domain:**
   - Vercel dashboard → Domains
   - Add your domain and follow DNS instructions

### Option 3: GitHub Pages

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json:**
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Deploy:**
```bash
npm run deploy
```

## 🌐 Custom Domain Setup

### For Netlify/Vercel:
1. Go to domain settings in dashboard
2. Add your domain name
3. Update DNS records:
   - **A Record**: Point to their IP
   - **CNAME**: Point www to your site

### DNS Configuration Example:
```
Type    Host    Value
A       @       192.0.2.1 (Netlify/Vercel IP)
CNAME   www     your-site.netlify.app
```

## 🔧 Pre-Deployment Checklist

- [x] All images organized and optimized
- [x] Product data complete (43 products)
- [x] All pages functional
- [x] Dark theme implemented
- [x] Razorpay test mode integrated
- [ ] Replace Razorpay test keys with live keys
- [ ] Update contact email in forms
- [ ] Test all navigation links
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags verified

## 📝 Environment Variables (If needed)

Create `.env` file for production:
```
VITE_RAZORPAY_KEY=your_live_key_here
VITE_API_URL=your_api_url
```

## 🎯 Post-Deployment

1. **Test the site thoroughly**
2. **Submit to Google Search Console**
3. **Set up Google Analytics**
4. **Create XML sitemap**
5. **Test Razorpay payments in live mode**

## ⚡ Performance Tips

- Images are already organized
- Vite handles optimization
- Enable compression on hosting platform
- Use CDN for static assets (Netlify/Vercel provide this)

---

**Your site is ready to deploy! 🎉**
