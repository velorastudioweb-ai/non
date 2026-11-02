$ErrorActionPreference = 'Stop'
$bin = 'C:\Users\Lokesh Reddy\AppData\Local\Temp\opencode\ffmpeg\extracted\ffmpeg-9.0.2-essentials_build\bin'
$root = 'C:\Users\Lokesh Reddy\Desktop\non'
$src = Join-Path $root 'assets-src\supplied-2026-11-02\WhatsApp Video 2026-11-02 at 11.04.56 AM.mp4'
$outDir = Join-Path $root 'public\assets\video'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$dst = Join-Path $outDir 'dr-vikas-singh-zee-business-times.mp4'

& (Join-Path $bin 'ffmpeg.exe') -hide_banner -loglevel error -y -i $src `
  -map 0:v:0 -map 0:a:0 `
  -vf 'scale=1280:720:flags=lanczos' `
  -c:v libx264 -preset slow -crf 26 -profile:v high -level 3.1 -pix_fmt yuv420p `
  -c:a aac -b:a 96k -ac 2 `
  -movflags +faststart `
  $dst

Write-Output ('video MB: ' + [math]::Round((Get-Item $dst).Length / 1MB, 2))
& (Join-Path $bin 'ffprobe.exe') -v error -show_entries format=duration,bit_rate -of compact $dst

# Poster frame for the click-to-play facade.
& (Join-Path $bin 'ffmpeg.exe') -hide_banner -loglevel error -y -ss 6 -i $src `
  -frames:v 1 -vf 'scale=1280:720:flags=lanczos' -c:v libwebp -quality 80 `
  (Join-Path $root 'public\assets\img\dr-vikas-singh-media-poster.webp')
Write-Output 'poster written'
