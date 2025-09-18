#!/bin/bash

# Script de inicio para Railway
echo "🚀 Iniciando aplicación en Railway..."
echo "📂 Directorio actual: $(pwd)"
echo "📦 Contenido del directorio:"
ls -la

echo "🔍 Verificando estructura del proyecto..."
if [ -d "backend" ]; then
    echo "✅ Directorio backend encontrado"
    cd backend
    echo "📂 Contenido de backend:"
    ls -la
    echo "🏃 Ejecutando npm start en backend..."
    npm start
else
    echo "❌ Directorio backend no encontrado"
    exit 1
fi