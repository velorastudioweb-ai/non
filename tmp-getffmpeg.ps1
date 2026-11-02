$ErrorActionPreference = 'Stop'
$dir = 'C:\Users\Lokesh Reddy\AppData\Local\Temp\opencode\ffmpeg'
$zip = Join-Path $dir 'ffmpeg.zip'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
Write-Output 'Downloading ffmpeg essentials...'
Invoke-WebRequest -UseBasicParsing -Uri 'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip' -OutFile $zip -TimeoutSec 900
Write-Output ('Downloaded MB: ' + [math]::Round((Get-Item $zip).Length / 1MB, 1))
$extract = Join-Path $dir 'extracted'
if (Test-Path $extract) { Remove-Item $extract -Recurse -Force }
Expand-Archive -Path $zip -DestinationPath $extract -Force
$exe = Get-ChildItem -Path $extract -Recurse -Filter ffmpeg.exe | Select-Object -First 1
Write-Output ('FFMPEG_EXE=' + $exe.FullName)
& $exe.FullName -version | Select-Object -First 1
