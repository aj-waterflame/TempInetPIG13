
@echo off
echo.

cd D:\Work\01-Labview Works\TempInet_RBP\TempInet_PIG13\Server_PIG13\
set NodePackagesPath=D:\Work\01-Labview Works\TempInet_RBP\TempInet_PIG13\Server_PIG13\  // This is my path, you can edit them

set Path=%NodePackagesPath%\node_modules\.bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=production

echo Environment variables are successfully added.
echo. 
echo. 
echo. 

npm start