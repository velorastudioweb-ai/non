$content = Get-Content -Path "build/quantum-health.js" -Raw
$old = "portrait:d.id === 'arivazhagan' ? '/dr-arivazhagan.png' : null}));"
$new = "portrait:d.id === 'arivazhagan' ? '/dr-arivazhagan.png' : d.id === 'subramini' ? '/dr-subramini.png' : null}));"
if ($content -match [regex]::Escape($old)) {
    $content = $content.Replace($old, $new)
    Set-Content -Path "build/quantum-health.js" -Value $content -NoNewline
    Write-Output "ok"
} else {
    Write-Output "no"
}
