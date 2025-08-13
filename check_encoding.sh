#!/bin/bash
# ENCODING TARKISTUS SKRIPTI
# Tarkistaa onko tiedostossa encoding-ongelmia

echo "Tarkistetaan encoding-ongelmat..."

# Tarkista korruptoituneet merkit
if grep -q "­ƒ\|Ô£\|´┐" index.html; then
    echo "❌ ENCODING-ONGELMIA LÖYDETTY!"
    echo "Korruptoituneet kohdat:"
    grep -n "­ƒ\|Ô£\|´┐" index.html
    echo ""
    echo "PALAUTA VARMUUSKOPIO:"
    echo "copy index_CLEAN_VERSION.html index.html"
    exit 1
else
    echo "✅ Encoding OK - ei ongelmia löydetty"
    echo "Tarkistetaan että emojit näkyvät oikein:"
    
    # Tarkista että emojit ovat paikallaan
    if grep -q "🤖\|✅\|📧\|🚀" index.html; then
        echo "✅ Emojit OK"
    else
        echo "⚠️  Emojeja ei löydy - mahdollinen ongelma"
    fi
    
    # Tarkista että suomalaiset merkit ovat OK
    if grep -q "ä\|ö\|å" index.html; then
        echo "✅ Suomalaiset merkit OK"
    else
        echo "⚠️  Suomalaisia merkkejä ei löydy"
    fi
fi

echo "Tarkistus valmis!"
