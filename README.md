# 🔒 Profiiliselain - Firebase/Firestore-pohjainen

## Arkkitehtuuri

### ☁️ **Pilvipalvelupohjaisuus**
- **Firebase/Firestore**: Tietokanta ja autentikaatio
- **Google AI**: Automaattinen anonymisointi
- **Vercel**: Hosting ja serverless-funktiot
- **Yoro.fi**: Käyttäjäautentikaatio

### 🔄 **Dataflow**
1. **Uudet hakemukset** → Firebase (raakadata)
2. **Google AI** → Anonymisointi automaattisesti
3. **Firestore** → Tallennus anonymisoituna
4. **Profiiliselain** → Turvallinen haku

## Turvallisuusominaisuudet

### ✅ **Datatietoturva**
- **Firebase Security Rules**: Pääsyn hallinta
- **Automaattinen anonymisointi**: Google AI:lla
- **Reaaliaikainen käsittely**: Ei tallenneta raakatietoja
- **Audit-loki**: Kaikki toiminnot lokitettu

### ✅ **Pilvipalvelujen edut**
- **24/7 käytettävyys**: Ei tarvitse omaa palvelinta
- **Automaattinen skaalautuvuus**: Käsittelee tuhansia hakemuksia
- **Varmuuskopiot**: Firebase hoitaa automaattisesti
- **Maantieteellinen jakelu**: Nopea ympäri maailman

### 🔒 **Käyttöoikeussuojaus**
- **Firebase Auth**: Integroitu Yoro.fi:n kanssa
- **Security Rules**: Kentän tason käyttöoikeudet
- **Real-time monitoring**: Epäilyttävän toiminnan seuranta

## Asennus ja käyttö

### 1. **Firebase-projektin luominen**
```bash
# Mene https://console.firebase.google.com
# Luo uusi projekti: "yoro-profiiliselain"
# Ota käyttöön: Firestore, Authentication, Security Rules
```

### 2. **Kloonaa repo**
```bash
git clone https://github.com/yoro-oy/profiiliselain.git
cd profiiliselain
npm install
```

### 3. **Ympäristömuuttujat**
```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=yoro-profiiliselain
GOOGLE_AI_API_KEY=your_google_ai_key
```

### 4. **Firestore Security Rules**
```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Vain autentikoidut Yoro.fi käyttäjät
    match /profiles/{document} {
      allow read: if request.auth != null && 
                     request.auth.token.email.matches('.*@yoro.fi');
    }
    
    // Hakemukset - vain systeemi voi kirjoittaa
    match /applications/{document} {
      allow write: if request.auth != null;
      allow read: if false; // Ei suoraa lukua
    }
  }
}
```

### 5. **Käynnistä**
```bash
npm run dev
```

## Uusien hakemusten vastaanotto

### 📝 **Hakemusflow**
1. **Yoro.fi-sivusto** → lähettää hakemuksen
2. **API** → vastaanottaa ja validoi
3. **Google AI** → anonymisoi automaattisesti
4. **Firestore** → tallentaa turvallisesti
5. **Profiiliselain** → näyttää anonymisoidut profiilit

### 🔗 **Integraatio yoro.fi:hin**
```javascript
// Yoro.fi:n hakemussivulla
fetch('https://profiiliselain.vercel.app/api/applications/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${yoroToken}`
  },
  body: JSON.stringify(applicationData)
})
```

## Deployment

### 🚀 **Vercel (automaattinen)**
```bash
# Linkitä GitHub repo
vercel --prod

# Environment variables (Vercel Dashboard):
# NEXT_PUBLIC_FIREBASE_API_KEY
# NEXT_PUBLIC_FIREBASE_PROJECT_ID
# GOOGLE_AI_API_KEY
```

### 📊 **Monitorointi**
- **Firebase Console**: Reaaliaikainen käyttö
- **Vercel Analytics**: Sivuston suorituskyky
- **Google AI Usage**: API-kutsut ja kustannukset

## Kustannukset (arvio)

### 💰 **Kuukausittaiset kustannukset**
- **Firebase**: 0-50€ (riippuen käytöstä)
- **Google AI**: 0-20€ (per 1000 hakemusta)
- **Vercel**: 0€ (Pro: 20$ jos tarvitaan)
- **Yhteensä**: ~20-90€/kk

### 🔄 **Skaalautuvuus**
- **1-1000 hakemusta/kk**: ~20€
- **1000-10000 hakemusta/kk**: ~50€
- **10000+ hakemusta/kk**: ~100€+

**Ei tarvetta omille palvelimille tai ylläpidolle! 🎉**

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
