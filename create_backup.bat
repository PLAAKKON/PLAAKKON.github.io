@echo off
REM AUTOMAATTINEN VARMUUSKOPIOINTI
REM Käynnistä tämä ennen jokaista muokkausta!

echo Luodaan varmuuskopiot...

REM Luo aikaleimallinen varmuuskopio
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a%%b)
copy index.html "index_backup_%mydate%_%mytime%.html"

REM Luo turvallinen varmuuskopio
copy index.html index_safe_backup.html

REM Tarkista encoding-ongelmat
findstr /C:"­ƒ" index.html > nul
if %errorlevel% equ 0 (
    echo VAROITUS: Encoding-ongelmia löydetty!
    echo Älä muokkaa tiedostoa ennen korjausta!
    pause
) else (
    echo Encoding OK - voit jatkaa muokkausta
)

echo Varmuuskopiot luotu!
pause
