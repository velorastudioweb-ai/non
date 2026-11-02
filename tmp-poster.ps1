$bin = 'C:\Users\Lokesh Reddy\AppData\Local\Temp\opencode\ffmpeg\extracted\ffmpeg-9.0.2-essentials_build\bin'
$src = 'C:\Users\Lokesh Reddy\Desktop\non\assets-src\supplied-2026-11-02\WhatsApp Video 2026-11-02 at 11.04.56 AM.mp4'
$dst = 'C:\Users\Lokesh Reddy\Desktop\non\public\assets\img\dr-vikas-singh-media-poster.webp'
& (Join-Path $bin 'ffmpeg.exe') -hide_banner -loglevel error -y -ss 45 -i $src -frames:v 1 -vf 'scale=1280:720:flags=lanczos' -c:v libwebp -quality 80 $dst
Write-Output ('poster KB: ' + [int]((Get-Item $dst).Length / 1024))
