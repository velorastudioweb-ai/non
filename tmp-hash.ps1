$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Security
$root = 'C:\Users\Lokesh Reddy\Desktop\non'
$video = Join-Path $root 'public\assets\video\dr-vikas-singh-zee-business-times.mp4'
$bytes = [System.IO.File]::ReadAllBytes($video)
$sha = [System.Security.Cryptography.SHA256]::Create()
$hash = ([System.BitConverter]::ToString($sha.ComputeHash($bytes))).Replace('-', '').Substring(0, 12).ToLower()
$hashed = Join-Path $root ('public\assets\video\dr-vikas-singh-zee-business-times-' + $hash + '.mp4')
Move-Item $video -Destination $hashed -Force
$poster = Join-Path $root 'public\assets\img\dr-vikas-singh-media-poster.webp'
Write-Output ('VIDEO=/assets/video/' + (Split-Path $hashed -Leaf))
Write-Output ('POSTER=/assets/img/' + (Split-Path $poster -Leaf))
Write-Output ('MB=' + [math]::Round((Get-Item $hashed).Length / 1MB, 2))
