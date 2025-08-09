# Yoro.fi Integraatio-ohje

## 1. Kopioi tarvittavat tiedostot yoro.fi projektiin

### Komponentit:
```
components/ProfiiliSelainYoro.tsx  // Pääkomponentti
components/ui/input.tsx            // UI-komponentit
components/ui/card.tsx
```

### Lib-tiedostot:
```
lib/firestore-client.ts           // Firestore-yhteys
lib/firebase.ts                   // Firebase-konfiguraatio (vain data)
```

### Ympäristömuuttujat (.env.local):
```bash
# Firebase - vain data-yhteys (urapolku-7780a)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAnfsX522_ybXR7yhnAJbxDjuszVu4rZLE
NEXT_PUBLIC_FIREBASE_PROJECT_ID=urapolku-7780a
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=urapolku-7780a.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=314066598772
NEXT_PUBLIC_FIREBASE_APP_ID=1:314066598772:web:50183db006293290378a21
```

## 2. Käyttö yoro.fi:ssä

```tsx
import ProfiiliSelainYoro from '@/components/ProfiiliSelainYoro';

function ProfiiliSelainSivu() {
  // Käytä yoro.fi:n olemassa olevaa käyttäjätietoa
  const currentUser = useYoroAuth(); // tai miten ikinä hoidatte authin
  
  return (
    <ProfiiliSelainYoro currentUser={currentUser} />
  );
}
```

## 3. Edut:

### ✅ Ei Google-kirjautumista
- Käyttää yoro.fi:n omaa kirjautumissysteemiä
- Ei popup-ikkunoita tai redirection

### ✅ Sama data
- Sama 27,717 profiilia kuin ennenkin
- Sama haku- ja suodatustoiminnallisuus

### ✅ Saumaton integraatio
- Toimii yoro.fi:n designin kanssa
- Ei kilpailevia auth-systeemejä

## 4. Firebase-asetukset

### Lisää yoro.fi domain Firebase Consoleen:
1. Mene: https://console.firebase.google.com/project/urapolku-7780a
2. Authentication → Settings → Authorized domains
3. Lisää: `yoro.fi` ja `www.yoro.fi`

## 5. Turvallisuus

- Firestore Rules säilyy ennallaan
- Vain luku-oikeudet profiileihin
- Ei muutoksia dataan

## 6. Testiminen

1. **Kopioi ProfiiliSelainYoro.tsx** yoro.fi projektiin
2. **Lisää Firebase-konfiguraatio** (vain data)
3. **Testaa** omalla dev-ympäristöllä
4. **Deploy** kun toimii

Tällä tavalla saat saman toiminnallisuuden ilman Google Auth -riippuvuutta!
