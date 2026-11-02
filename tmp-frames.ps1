$bin = 'C:\Users\Lokesh Reddy\AppData\Local\Temp\opencode\ffmpeg\extracted\ffmpeg-9.0.2-essentials_build\bin'
$src = 'C:\Users\Lokesh Reddy\Desktop\non\assets-src\supplied-2026-11-02\WhatsApp Video 2026-11-02 at 11.04.56 AM.mp4'
$out = 'C:\Users\Lokesh Reddy\AppData\Local\Temp\opencode\qh-shots'
foreach ($t in @(1, 15, 30, 45, 60, 68)) {
  & (Join-Path $bin 'ffmpeg.exe') -hide_banner -loglevel error -y -ss $t -i $src -frames:v 1 -vf 'scale=640:-1' (Join-Path $out ("frame-$t.jpg"))
}
Get-ChildItem $out -Filter 'frame-*.jpg' | ForEach-Object { $_.Name }
