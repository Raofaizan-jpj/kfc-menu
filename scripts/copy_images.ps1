$imgDir = "c:\Users\LAPTOP MART\Desktop\kfc menu prices\images"
if (!(Test-Path $imgDir)) {
    New-Item -ItemType Directory -Path $imgDir -Force
}

$artDir = "C:\Users\LAPTOP MART\.gemini\antigravity-ide\brain\ee5d87ab-612d-4107-9207-d9be5c4cfd9b"

Copy-Item (Join-Path $artDir "zinger_burger_*.jpg") (Join-Path $imgDir "zinger_burger.jpg") -Force
Copy-Item (Join-Path $artDir "mighty_zinger_*.jpg") (Join-Path $imgDir "mighty_zinger.jpg") -Force
Copy-Item (Join-Path $artDir "fried_chicken_*.jpg") (Join-Path $imgDir "fried_chicken.jpg") -Force
Copy-Item (Join-Path $artDir "hot_wings_*.jpg") (Join-Path $imgDir "hot_wings.jpg") -Force
Copy-Item (Join-Path $artDir "signature_box_*.jpg") (Join-Path $imgDir "signature_box.jpg") -Force
Copy-Item (Join-Path $artDir "family_bucket_*.jpg") (Join-Path $imgDir "family_bucket.jpg") -Force
Copy-Item (Join-Path $artDir "crispy_fries_*.jpg") (Join-Path $imgDir "crispy_fries.jpg") -Force

Copy-Item (Join-Path $artDir "cat_burgers_*.jpg") (Join-Path $imgDir "cat_burgers.jpg") -Force
Copy-Item (Join-Path $artDir "cat_chicken_*.jpg") (Join-Path $imgDir "cat_chicken.jpg") -Force
Copy-Item (Join-Path $artDir "cat_combos_*.jpg") (Join-Path $imgDir "cat_combos.jpg") -Force
Copy-Item (Join-Path $artDir "cat_boxes_*.jpg") (Join-Path $imgDir "cat_boxes.jpg") -Force
Copy-Item (Join-Path $artDir "cat_family_*.jpg") (Join-Path $imgDir "cat_family.jpg") -Force
Copy-Item (Join-Path $artDir "cat_snacks_*.jpg") (Join-Path $imgDir "cat_snacks.jpg") -Force

Get-ChildItem $imgDir
