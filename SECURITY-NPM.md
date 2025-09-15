# Guía de Seguridad NPM - Protección contra Ataques de Supply Chain

## 🚨 Contexto del Problema

Recientemente se han detectado múltiples ataques a paquetes populares de NPM como **Chalk** y **Debac**, donde atacantes comprometieron las cuentas de los mantenedores mediante phishing y publicaron versiones maliciosas que:

- 🔓 Roban carteras de criptomonedas
- 🔑 Extraen tokens y variables de entorno
- 📊 Recopilan información sensible del sistema

## 🛡️ Medidas de Protección Implementadas

### 1. **Versionado Exacto de Dependencias**

❌ **ANTES** (Vulnerable):
```json
"dependencies": {
  "react": "^19.1.1",
  "express": "^5.1.0"
}
```

✅ **AHORA** (Seguro):
```json
"dependencies": {
  "react": "19.1.1",
  "express": "5.1.0"
}
```

**¿Por qué?** El símbolo `^` permite actualizaciones automáticas que podrían incluir versiones comprometidas.

### 2. **Configuración de .npmrc Segura**

Hemos configurado archivos `.npmrc` en cada nivel del proyecto con:

- `save-exact=true` - Solo versiones exactas
- `audit-level=moderate` - Auditoría de seguridad obligatoria
- `registry=https://registry.npmjs.org/` - Solo el registro oficial de NPM
- `audit=true` - Auditoría automática en instalaciones
- `strict-ssl=true` - Verificación SSL obligatoria

### 3. **Scripts de Seguridad Automatizados**

```bash
# Auditar vulnerabilidades en todo el proyecto
npm run security:audit

# Reparar vulnerabilidades automáticamente
npm run security:audit-fix

# Verificar versiones instaladas
npm run security:verify-lockfiles

# Revisar paquetes desactualizados
npm run security:check-updates
```

## 🔄 Protocolo de Actualización Segura

### Para Desarrolladores:

1. **NUNCA actualices dependencias automáticamente**
2. **Antes de cualquier actualización:**
   ```bash
   # 1. Revisar vulnerabilidades actuales
   npm run security:audit
   
   # 2. Verificar qué paquetes están desactualizados
   npm run security:check-updates
   
   # 3. Investigar MANUALMENTE cada actualización
   # - Revisa el changelog del paquete
   # - Verifica la reputación del mantenedor
   # - Busca reportes de seguridad
   ```

3. **Para actualizar UN paquete específico:**
   ```bash
   # Instalar versión específica exacta
   npm install package-name@exact.version.number
   
   # Ejemplo:
   npm install react@19.1.2
   ```

4. **Después de cada instalación:**
   ```bash
   # Verificar que no se instalaron paquetes no deseados
   npm run security:verify-lockfiles
   
   # Auditar nuevas vulnerabilidades
   npm run security:audit
   ```

## 🚫 Prácticas PROHIBIDAS

- ❌ **NUNCA** uses `npm update` sin revisión manual
- ❌ **NUNCA** uses `^` o `~` en package.json de librerías publicadas
- ❌ **NUNCA** instales paquetes sin verificar su legitimidad
- ❌ **NUNCA** ignores las advertencias de `npm audit`

## ✅ Checklist de Seguridad NPM

Antes de cada deploy a producción:

- [ ] Todas las dependencias tienen versiones exactas (sin ^ o ~)
- [ ] `npm audit` no reporta vulnerabilidades críticas o altas
- [ ] Todos los lockfiles están committeados y actualizados
- [ ] No hay paquetes desconocidos en node_modules
- [ ] Las variables de entorno están protegidas y no se exponen en el código

## 🔍 Monitoreo Continuo

### Herramientas Recomendadas:

1. **GitHub Dependabot** - Monitoreo automático de vulnerabilidades
2. **npm audit** - Auditoría regular de dependencias
3. **Snyk** - Análisis avanzado de vulnerabilidades
4. **npm outdated** - Revisión de paquetes desactualizados

### Automatización en CI/CD:

```yaml
# Ejemplo para GitHub Actions
- name: Security Audit
  run: |
    npm run security:audit
    npm run security:verify-lockfiles
```

## 📞 Protocolo de Respuesta a Incidentes

Si detectas un paquete comprometido:

1. **Inmediatamente** para todos los deploys
2. **Revierte** a la última versión conocida como segura
3. **Audita** todos los sistemas que puedan haber sido afectados
4. **Reporta** el incidente al equipo de seguridad
5. **Documenta** las lecciones aprendidas

## 🔗 Referencias y Recursos

- [NPM Security Best Practices](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities)
- [Supply Chain Attack Examples](https://snyk.io/blog/npm-security-preventing-supply-chain-attacks/)
- [Package Lock Files](https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json)

---

**Recuerda:** La seguridad de las dependencias es responsabilidad de todo el equipo. ¡Mantente vigilante! 🛡️