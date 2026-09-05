$jsContent = Get-Content -Raw "c:\Users\LAPTOP MART\Desktop\kfc menu prices\js\script.js"

# Basic checks
if ($jsContent -match "const KFC_MENU_DATA = \[") {
    Write-Host "PASS: KFC_MENU_DATA declared" -ForegroundColor Green
} else {
    Write-Host "FAIL: KFC_MENU_DATA missing" -ForegroundColor Red
}

if ($jsContent -match "const KFC_CITIES_DATA = \[") {
    Write-Host "PASS: KFC_CITIES_DATA declared" -ForegroundColor Green
} else {
    Write-Host "FAIL: KFC_CITIES_DATA missing" -ForegroundColor Red
}

if ($jsContent -match "function setGlobalCurrency") {
    Write-Host "PASS: setGlobalCurrency declared" -ForegroundColor Green
} else {
    Write-Host "FAIL: setGlobalCurrency missing" -ForegroundColor Red
}

if ($jsContent -match "function openItemModal") {
    Write-Host "PASS: openItemModal declared" -ForegroundColor Green
} else {
    Write-Host "FAIL: openItemModal missing" -ForegroundColor Red
}

# Count menu items
$itemMatches = [regex]::Matches($jsContent, 'id:\s*"([^"]+)"')
Write-Host "Total Menu Items declared: $($itemMatches.Count)" -ForegroundColor Cyan

# Count cities
$cityMatches = [regex]::Matches($jsContent, 'slug:\s*"([^"]+)"')
Write-Host "Total Cities declared: $($cityMatches.Count)" -ForegroundColor Cyan
