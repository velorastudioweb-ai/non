$results = New-Object System.Collections.Generic.List[object]
Get-ChildItem -Path 'public' -File -Recurse | Where-Object { $_.Extension -match '\.(png|jpe?g|webp)$' } | ForEach-Object {
  $age = [math]::Round(((Get-Date) - $_.LastWriteTime).TotalHours, 1)
  $kb = [int]($_.Length / 1024)
  $results.Add([pscustomobject]@{ AgeHours = $age; KB = $kb; Path = $_.FullName.Replace((Get-Location).Path + '\', '') })
}
$results | Sort-Object AgeHours | Select-Object -First 30 | Format-Table -AutoSize -Wrap
