@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  py tools\preview.py
  goto :done
)
where python >nul 2>nul
if not errorlevel 1 (
  python tools\preview.py
  goto :done
)
for /d %%D in ("C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.*") do (
  if exist "%%~D\dependencies\python\python.exe" (
    "%%~D\dependencies\python\python.exe" tools\preview.py
    goto :done
  )
)
echo Python was not found. Open site\index.html directly for this prototype.
start "" "site\index.html"
:done
pause
