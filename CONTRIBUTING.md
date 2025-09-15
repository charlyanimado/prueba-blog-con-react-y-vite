# Contribuir al Blog con React y Vite

¡Gracias por considerar contribuir a nuestro proyecto! Este documento proporciona pautas para contribuir de manera efectiva.

## 🤝 Formas de Contribuir

### 🐛 Reportar Bugs
- Usa la plantilla de issues para reportar bugs
- Describe el comportamiento esperado vs el actual
- Incluye pasos para reproducir el problema
- Agrega capturas de pantalla si es aplicable

### 💡 Sugerir Mejoras
- Verifica que la característica no haya sido solicitada antes
- Proporciona una descripción clara de la mejora
- Explica por qué sería útil para el proyecto

### 🔧 Contribuir con Código
1. Fork el repositorio
2. Crea una rama para tu característica
3. Realiza tus cambios
4. Escribe o actualiza tests si es necesario
5. Asegúrate de que el código pase todos los tests
6. Envía un Pull Request

## 📋 Pautas de Desarrollo

### Estilo de Código
- **Frontend**: Seguir las reglas de ESLint configuradas
- **Backend**: Usar formato consistente con el código existente
- **Commits**: Usar mensajes descriptivos en inglés o español

### Estructura de Commits
```
tipo(ámbito): descripción breve

Descripción más detallada si es necesaria.

- Lista de cambios específicos
- Otro cambio importante
```

Tipos de commit:
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (espacios, punto y coma, etc.)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Cambios en el proceso de build o herramientas auxiliares

### Testing
- Prueba tu código en diferentes navegadores
- Verifica que las funcionalidades existentes sigan funcionando
- Prueba tanto en móvil como en escritorio

## 🚀 Configuración de Desarrollo

### Prerequisitos
- Node.js 18+
- MySQL 8+
- Git

### Setup Local
```bash
# 1. Fork y clonar
git clone https://github.com/tu-usuario/prueba-blog-con-react-y-vite.git
cd prueba-blog-con-react-y-vite

# 2. Instalar dependencias
npm install
cd frondend && npm install
cd ../backend && npm install

# 3. Configurar base de datos
# Ver README.md para instrucciones detalladas

# 4. Crear rama para tu característica
git checkout -b feature/mi-nueva-caracteristica

# 5. Realizar cambios y commit
git add .
git commit -m "feat: agregar nueva característica"

# 6. Push y crear PR
git push origin feature/mi-nueva-caracteristica
```

## 📝 Proceso de Pull Request

### Antes de Enviar
- [ ] El código compila sin errores
- [ ] Se han probado los cambios localmente
- [ ] Se ha actualizado la documentación si es necesario
- [ ] Los commits tienen mensajes descriptivos

### Plantilla de PR
```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de Cambio
- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva característica (cambio que agrega funcionalidad)
- [ ] Breaking change (fix o feature que causa que funcionalidad existente no funcione como antes)
- [ ] Cambio de documentación

## ¿Cómo se ha probado?
Describe las pruebas que realizaste para verificar tus cambios.

## Checklist
- [ ] Mi código sigue las pautas de estilo del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código, especialmente en áreas difíciles de entender
- [ ] He realizado los cambios correspondientes en la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He agregado tests que prueban que mi fix es efectivo o que mi característica funciona
```

## 🎯 Áreas Donde Necesitamos Ayuda

### 🔧 Desarrollo
- Optimización de rendimiento
- Mejoras en la UI/UX
- Tests automatizados
- Funcionalidades nuevas

### 📚 Documentación
- Tutoriales
- Ejemplos de uso
- Traducciones
- Videos explicativos

### 🐛 Testing
- Pruebas en diferentes dispositivos
- Pruebas de compatibilidad de navegadores
- Reportar bugs

## 📞 Contacto

Si tienes preguntas sobre cómo contribuir:
- Abre un issue con la etiqueta "question"
- Contacta al mantenedor del proyecto

## 🏆 Reconocimientos

Todos los contribuidores serán reconocidos en el README principal del proyecto.

¡Gracias por contribuir! 🚀