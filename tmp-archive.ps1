$ErrorActionPreference = 'Stop'
$root = 'C:\Users\Lokesh Reddy\Desktop\non'
$dest = Join-Path $root 'assets-src\supplied-2026-11-02'
New-Item -ItemType Directory -Force -Path $dest | Out-Null
$files = @(
  'public\WhatsApp Image 2026-11-02 at 8.45.16 AM.jpeg',
  'public\WhatsApp Image 2026-11-02 at 9.14.02 AM.jpeg',
  'public\Maroon Visionary with Golden Worldscape.png',
  'public\Hong Kong and Bengaluru Nightscapes.png',
  'public\WhatsApp Video 2026-11-02 at 11.04.56 AM.mp4'
)
foreach ($f in $files) {
  $src = Join-Path $root $f
  if (Test-Path $src) {
    Move-Item $src -Destination $dest -Force
    Write-Output ('archived: ' + (Split-Path $f -Leaf))
  } else {
    Write-Output ('not found: ' + (Split-Path $f -Leaf))
  }
}
Get-ChildItem $dest | ForEach-Object { Write-Output ($_.Name + '  ' + [math]::Round($_.Length / 1MB, 2) + ' MB') }
