@echo off
echo =====================================================
echo  Yoro.fi GitHub Deployment Script
echo =====================================================
echo.

REM Navigate to the project directory
cd /d "c:\Konsultti_yritys_Yoro_Oy\kotisivu\yoro.fi"

echo 📁 Current directory: %CD%
echo.

REM Check if git is initialized
if not exist ".git" (
    echo 🔧 Initializing git repository...
    git init
    git remote add origin https://github.com/PLAAKKON/PLAAKKON.github.io.git
) else (
    echo ✅ Git repository already initialized
)

echo.
echo 📦 Adding files to git...

REM Add essential files
git add index.html
git add nav.html
git add auth.js
git add firebaseConfig.js
git add styles.css

REM Add assets
git add logo_transparent.png
git add logo.png
git add Yoro1_final_1080p_30s.mp4
git add LxP-Profiili_Esimerkki01.pdf

REM Add directories
git add kirjaudu/
git add profiiliselain/
git add yoro-integration/

echo.
echo 💾 Committing changes...
git commit -m "Enhanced yoro.fi with bilingual support and improved UX - Added Finnish/English language switching - Modernized homepage with card-based layout - Enhanced profile browser with better search - Improved authentication flow - Added navigation page - Mobile-responsive design - Glassmorphism UI effects"

echo.
echo 🚀 Pushing to GitHub...
git branch -M master
git push -u origin master

echo.
echo ✅ Deployment complete!
echo 🌐 Your site should be available at: https://plaakkon.github.io
echo.
pause
