Add-Type -AssemblyName System.Drawing

$imagesDir = Join-Path $PSScriptRoot "..\images"
$files = Get-ChildItem -Path $imagesDir -Include *.jpg, *.png -Recurse

Write-Host "Starting image optimization in: $imagesDir" -ForegroundColor Cyan

function Get-JpegEncoder {
    $codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
    foreach ($codec in $codecs) {
        if ($codec.MimeType -eq "image/jpeg") {
            return $codec
        }
    }
    return $null
}

$jpegEncoder = Get-JpegEncoder

foreach ($file in $files) {
    if ($file.Length -lt 95KB -and $file.Extension -eq ".svg") {
        continue
    }

    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        $origWidth = $img.Width
        $origHeight = $img.Height
        
        # Target max width: 600px for food cards, icons smaller
        $maxWidth = 600
        if ($file.Name.Contains("icon") -or $file.Name.Contains("logo") -or $file.Name.Contains("favicon")) {
            $maxWidth = 300
        }

        $newWidth = $origWidth
        $newHeight = $origHeight

        if ($origWidth -gt $maxWidth) {
            $newWidth = $maxWidth
            $newHeight = [int]($origHeight * ($maxWidth / $origWidth))
        }

        $bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graph = [System.Drawing.Graphics]::FromImage($bmp)
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)

        $img.Dispose()
        $graph.Dispose()

        # Quality encoder parameter
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $qualityParam = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int]78)
        $encoderParams.Param[0] = $qualityParam

        $tempPath = $file.FullName + ".tmp"
        if ($file.Extension -eq ".png" -and ($file.Name.Contains("logo") -or $file.Name.Contains("favicon"))) {
            # Keep PNG for transparent logos/favicons if small
            $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
        } else {
            $bmp.Save($tempPath, $jpegEncoder, $encoderParams)
        }

        $bmp.Dispose()

        # Replace original file if temp file is created and smaller or valid
        if (Test-Path $tempPath) {
            Remove-Item $file.FullName -Force
            Move-Item $tempPath $file.FullName -Force
            $newFile = Get-Item $file.FullName
            $newSizeKB = [math]::Round($newFile.Length / 1KB, 2)
            Write-Host "Optimized: $($file.Name) -> $newSizeKB KB" -ForegroundColor Green
        }
    } catch {
        Write-Host "Error processing $($file.Name): $_" -ForegroundColor Red
    }
}

Write-Host "Image optimization complete!" -ForegroundColor Cyan
