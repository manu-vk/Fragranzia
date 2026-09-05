#!/bin/bash
# Windows batch script to fix cart collection - run this first!
# This ensures the carts collection is completely clean

@echo off
echo.
echo ========================================
echo FRAGRANZIA CART FIX - Step 1
echo ========================================
echo.
echo This script will:
echo 1. Stop your server (if running)
echo 2. Drop the carts collection (removes old broken index)
echo 3. Restart the server
echo.

echo Step 1: Running database fix...
call node fix-cart-index.js

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo ERROR: Failed to fix database
  echo Make sure MongoDB is running on localhost:27017
  pause
  exit /b 1
)

echo.
echo ========================================
echo FIX COMPLETE!
echo ========================================
echo.
echo The carts collection has been reset.
echo Next: Restart your server with: npm start
echo.
pause
