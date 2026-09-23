$urls = @(
  'http://localhost:5500/index.html',
  'http://localhost:5500/menu.html',
  'http://localhost:5500/burgers.html',
  'http://localhost:5500/chicken.html',
  'http://localhost:5500/combos.html',
  'http://localhost:5500/signature-boxes.html',
  'http://localhost:5500/family-deals.html',
  'http://localhost:5500/snacks.html',
  'http://localhost:5500/beverages.html',
  'http://localhost:5500/deals.html',
  'http://localhost:5500/cities.html',
  'http://localhost:5500/city.html',
  'http://localhost:5500/city-new-york.html',
  'http://localhost:5500/city-los-angeles.html',
  'http://localhost:5500/city-chicago.html',
  'http://localhost:5500/city-houston.html',
  'http://localhost:5500/city-miami.html',
  'http://localhost:5500/about.html',
  'http://localhost:5500/contact.html',
  'http://localhost:5500/disclaimer.html',
  'http://localhost:5500/privacy-policy.html',
  'http://localhost:5500/sitemap.xml',
  'http://localhost:5500/robots.txt',
  'http://localhost:5500/css/styles.css',
  'http://localhost:5500/js/script.js'
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
        Write-Host "FAIL [Exception]: $url ($($_.Exception.Message))" -ForegroundColor Red
        $allPassed = $false
    }
}

if ($allPassed) {
    Write-Host "`nALL 25 USA KFC MENU ENDPOINTS VERIFIED SUCCESSFULLY WITH STATUS 200 OK!" -ForegroundColor Green
} else {
    Write-Host "`nSOME ENDPOINTS FAILED!" -ForegroundColor Red
}
