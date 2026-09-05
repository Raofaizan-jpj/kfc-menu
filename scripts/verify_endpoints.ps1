$urls = @(
  'http://localhost:5500/index.html',
  'http://localhost:5500/menu.html',
  'http://localhost:5500/cities.html',
  'http://localhost:5500/city.html',
  'http://localhost:5500/city-lahore.html',
  'http://localhost:5500/city-karachi.html',
  'http://localhost:5500/city-islamabad.html',
  'http://localhost:5500/city-multan.html',
  'http://localhost:5500/city-faisalabad.html',
  'http://localhost:5500/burgers.html',
  'http://localhost:5500/chicken.html',
  'http://localhost:5500/combos.html',
  'http://localhost:5500/signature-boxes.html',
  'http://localhost:5500/family-deals.html',
  'http://localhost:5500/snacks.html',
  'http://localhost:5500/beverages.html',
  'http://localhost:5500/deals.html',
  'http://localhost:5500/css/styles.css',
  'http://localhost:5500/js/script.js',
  'http://localhost:5500/images/chicken_tenders.jpg',
  'http://localhost:5500/images/chicken_nuggets.jpg',
  'http://localhost:5500/images/chicken_wrap.jpg',
  'http://localhost:5500/images/buttermilk_biscuits.jpg',
  'http://localhost:5500/images/chocolate_dessert.jpg'
)

$allPassed = $true
foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
        if ($response.StatusCode -eq 200) {
            Write-Host "PASS [200]: $url ($($response.Content.Length) bytes)" -ForegroundColor Green
        } else {
            Write-Host "FAIL [$($response.StatusCode)]: $url" -ForegroundColor Red
            $allPassed = $false
        }
    } catch {
        Write-Host "FAIL [Exception]: $url" -ForegroundColor Red
        $allPassed = $false
    }
}

if ($allPassed) {
    Write-Host "`nALL 24 ENDPOINTS VERIFIED SUCCESSFULLY WITH STATUS 200 OK!" -ForegroundColor Green
} else {
    Write-Host "`nSOME ENDPOINTS FAILED!" -ForegroundColor Red
}
