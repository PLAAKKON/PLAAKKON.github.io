# VARMUUSKOPIOINTI OHJEET

## Encoding-ongelman estäminen

Tämä dokumentti sisältää ohjeet varmuuskopioinnista ja encoding-ongelmien estämisestä.

## Automaattinen varmuuskopiointi

Käytä tätä PowerShell-komentoa luodaksesi aikaleimallinen varmuuskopio:

```powershell
copy index.html "index_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').html"
```

## Ennen jokaista muokkausta

1. **Luo varmuuskopio:**
   ```powershell
   copy index.html index_safe_backup.html
   ```

2. **Tarkista encoding:**
   ```powershell
   Get-Content index.html -Encoding UTF8 | Select-String "­ƒ|Ô£|´┐"
   ```

3. **Jos löytyy korruptoituja merkkejä, ÄLÄ muokkaa!**

## Turvallinen muokkaaminen

1. **Käytä aina UTF-8 encoding**
2. **Vältä copy-paste operaatioita eri järjestelmistä**
3. **Testaa muutokset paikallisesti ennen Git push**

## Palautus korruptoidusta tilasta

Jos encoding menee rikki:

1. **Palauta varmuuskopio:**
   ```powershell
   copy index_safe_backup.html index.html
   ```

2. **Tarkista että palautus onnistui:**
   ```powershell
   Get-Content index.html -Encoding UTF8 | Select-String "🤖|✅|📧"
   ```

## Kriittisten tiedostojen lista

- `index.html` - Pääsivu (TÄRKEIN!)
- `checkbox-data-full.json` - Kaikki search data
- `create-chunked-final.js` - Data processing script

## Git-varmuuskopiot

Jokaisessa commitissa on automaattinen varmuuskopio:
```powershell
git log --oneline | head -10
```

## Hätätilanne palautus

Jos kaikki menee pieleen:
```powershell
git reset --hard HEAD~1
git push --force-with-lease
```

**VAROITUS:** Force push poistaa uusimmat muutokset!

## Luotu: $(Get-Date)
## Tila: Encoding-ongelmat korjattu ✅
## Yhteensä search optioita: 43,553 ✅
