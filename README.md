# Coin Cash - منصة كاش كوين الشاملة

منصة متكاملة للربح من الإحالات والعجلة الدوارة، مبنية بـ React + TypeScript + Tailwind CSS للواجهة الأمامية، و tRPC + Drizzle ORM + Hono للـ Backend، وبوت تيليجرام بايثون.

## المكونات

### 1. واجهة إدارة الويب (Admin Panel)
- لوحة تحكم شاملة مع إحصائيات ورسوم بيانية
- إدارة المستخدمين (بحث، حظر، تعديل رصيد)
- إدارة عمليات السحب (موافقة/رفض)
- إدارة الإحالات والمكافآت
- إدارة التذاكر والدعم
- البث الجماعي
- الإعدادات والتقارير

### 2. تطبيق الويب للمستخدمين (WebApp)
- عجلة حظ تفاعلية
- نظام إحالات
- صفحة دعوات
- قسم المزيد (سحب، مهام، برومو كود، شكوى)

### 3. بوت تيليجرام (Python)
- أمر /start مع رسالة ترحيبية
- نظام إحالات كامل
- أزرار: دعم، إحالات، WebApp
- أوامر الأدمن

## التقنيات المستخدمة

### Frontend
- React 19 + TypeScript
- Vite + Tailwind CSS
- shadcn/ui
- Recharts (رسوم بيانية)
- tRPC Client

### Backend
- Hono (server)
- tRPC 11 (API)
- Drizzle ORM
- MySQL

### Bot
- python-telegram-bot
- JSON storage

## المتطلبات

- Node.js 20+
- Python 3.9+
- MySQL

## التشغيل المحلي

### 1. تشغيل الواجهة والـ Backend

```bash
# تثبيت الاعتمادات
npm install

# دفع قاعدة البيانات
npm run db:push

# التشغيل في وضة التطوير
npm run dev
```

### 2. تشغيل بوت التيليجرام

```bash
cd bot

# إنشاء بيئة افتراضية (اختياري)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# أو: venv\Scripts\activate  # Windows

# تثبيت الاعتمادات
pip install -r requirements.txt

# تشغيل البوت
python telegram_bot.py
```

## الإعدادات

### توكن البوت
تم تعيين التوكن في الملفات:
- `bot/telegram_bot.py` - BOT_TOKEN
- `api/routers/adminAuth.ts` - ADMIN_ID

### إعدادات الأدمن
- اسم المستخدم: `admin`
- كلمة المرور: `admin123`

## رفع المشروع على GitHub

### 1. إنشاء repository جديد على GitHub

### 2. رفع الملفات

```bash
git init
git add .
git commit -m "Initial commit: Coin Cash Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/coincash.git
git push -u origin main
```

### 3. النشر

يمكن نشر الواجهة على:
- **Vercel**: `npm i -g vercel && vercel`
- **Netlify**: `npm i -g netlify-cli && netlify deploy`
- **Railway**: `railway up`

للبوت:
- **Railway**: أضف Dockerfile أو Procfile
- **Heroku**: استخدم heroku-cli
- ** VPS**: شغل البوت بـ systemd

## هيكل المشروع

```
coincash/
├── api/                    # Backend API
│   ├── routers/           # tRPC Routers
│   │   ├── stats.ts
│   │   ├── users.ts
│   │   ├── withdrawals.ts
│   │   ├── referrals.ts
│   │   ├── tickets.ts
│   │   ├── broadcast.ts
│   │   ├── wheel.ts
│   │   ├── tasks.ts
│   │   ├── promo.ts
│   │   └── adminAuth.ts
│   ├── middleware.ts
│   ├── context.ts
│   └── router.ts
├── bot/                   # Telegram Bot
│   ├── telegram_bot.py
│   └── requirements.txt
├── db/                    # Database Schema
│   ├── schema.ts
│   └── relations.ts
├── src/                   # Frontend
│   ├── pages/
│   │   ├── admin/        # Admin Pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── UsersPage.tsx
│   │   │   ├── WithdrawalsPage.tsx
│   │   │   ├── ReferralsPage.tsx
│   │   │   ├── TicketsPage.tsx
│   │   │   ├── BroadcastPage.tsx
│   │   │   ├── SettingsPage.tsx
│   │   │   └── ReportsPage.tsx
│   │   └── Home.tsx      # User WebApp
│   ├── components/
│   │   └── admin/
│   │       └── AdminLayout.tsx
│   ├── hooks/
│   │   └── useAdminAuth.ts
│   └── App.tsx
├── contracts/             # Shared types
├── package.json
├── drizzle.config.ts
├── vite.config.ts
└── README.md
```

## المميزات

- 🔒 نظام مصادقة متكامل للأدمن
- 📊 إحصائيات ورسوم بيانية حية
- 💰 إدارة أرصدة متعددة (ليرة، دولار، بتكوين، كوين)
- 🎰 عجلة حظ تفاعلية
- 🔗 نظام إحالات كامل
- 🎫 نظام تذاكر الدعم
- 📢 بث جماعي
- ⚙️ إعدادات مرنة
- 📱 تصميم متجاوب (Mobile + Desktop)
- 🌙 وضع داكن

## المساهمة

نرحب بالمساهمات! يرجى فتح Issue أو Pull Request.

## الترخيص

MIT License

---

<div dir="rtl">

تم بناء هذا المشروع بكل ❤️ لمنصة كاش كوين

</div>
