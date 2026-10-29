$code = @'
using System;
using System.Threading.Tasks;
using Windows.Graphics.Imaging;
using Windows.Media.Ocr;
using Windows.Storage;
public static class OcrHelper {
  public static async Task<string> Run(string path) {
    var file = await StorageFile.GetFileFromPathAsync(path);
    using (var stream = await file.OpenAsync(FileAccessMode.Read)) {
      var decoder = await BitmapDecoder.CreateAsync(stream);
      var bitmap = await decoder.GetSoftwareBitmapAsync();
      var engine = OcrEngine.TryCreateFromUserProfileLanguages();
      var result = await engine.RecognizeAsync(bitmap);
      return result.Text;
    }
  }
}
'@
Add-Type -TypeDefinition $code -Language CSharp -ReferencedAssemblies @('System.Runtime.WindowsRuntime','System.Runtime.WindowsRuntime.UI.Xaml')
$files = Get-ChildItem 'public' -File | Where-Object { $_.Extension -match 'png|webp' }
foreach ($f in $files) {
  try { $text = [OcrHelper]::Run($f.FullName).Result; Write-Output ("=== " + $f.Name + " ==="); Write-Output $text } catch { Write-Output ("=== " + $f.Name + " === ERROR " + $_.Exception.Message) }
}
