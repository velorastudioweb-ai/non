$ff = 'C:\Users\Lokesh Reddy\AppData\Local\Temp\opencode\ffmpeg\extracted\ffmpeg-9.0.2-essentials_build\bin'
$src = 'C:\Users\Lokesh Reddy\Desktop\non\assets-src\supplied-2026-11-02\WhatsApp Video 2026-11-02 at 11.04.56 AM.mp4'
& (Join-Path $ff 'ffprobe.exe') -v error -show_entries format=duration,bit_rate:stream=index,codec_type,codec_name,width,height,profile,pix_fmt,r_frame_rate,bit_rate $src
