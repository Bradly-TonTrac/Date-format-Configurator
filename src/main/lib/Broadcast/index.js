import { execSync } from "child_process";

const broadcastIntlChange = () => {

    if (process.platform !== 'win32') {
        return;
    }
  const script = `
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class Win32 {
  [DllImport("user32.dll", SetLastError = true)]
  public static extern IntPtr SendMessageTimeout(
    IntPtr hWnd,
    int Msg,
    IntPtr wParam,
    string lParam,
    uint fuFlags,
    uint uTimeout,
    out IntPtr lpdwResult
  );
}
"@

$HWND_BROADCAST = [IntPtr]0xffff
$WM_SETTINGCHANGE = 0x1A
$result = [IntPtr]::Zero

[Win32]::SendMessageTimeout(
  $HWND_BROADCAST,
  $WM_SETTINGCHANGE,
  [IntPtr]::Zero,
  "intl",
  0x0002,
  5000,
  [ref]$result
)
`
    execSync(
        `powershell.exe -Command "${script.replace(/"/g, '\\"')}"`,
        { stdio: 'ignore' }
    );
};

export default broadcastIntlChange; 
