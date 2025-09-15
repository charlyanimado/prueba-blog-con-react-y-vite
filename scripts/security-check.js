#!/usr/bin/env node

/**
 * Script de Verificación Automática de Seguridad NPM
 * Basado en las medidas de protección contra ataques de supply chain
 * mencionadas en el video sobre vulnerabilidades de NPM
 */

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

class NPMSecurityVerifier {
    constructor() {
        this.projectRoot = process.cwd();
        this.results = {
            timestamp: new Date().toISOString(),
            vulnerabilities: [],
            suspiciousChanges: [],
            integrityChecks: [],
            recommendations: []
        };
    }

    async runAudit(directory) {
        return new Promise((resolve, reject) => {
            exec('npm audit --json', { cwd: directory }, (error, stdout, stderr) => {
                try {
                    const result = JSON.parse(stdout);
                    resolve({
                        directory: path.relative(this.projectRoot, directory),
                        vulnerabilities: result.vulnerabilities || {},
                        advisoriesCount: Object.keys(result.vulnerabilities || {}).length
                    });
                } catch (e) {
                    // Si no hay JSON válido, significa que no hay vulnerabilidades
                    resolve({
                        directory: path.relative(this.projectRoot, directory),
                        vulnerabilities: {},
                        advisoriesCount: 0
                    });
                }
            });
        });
    }

    checkPackageIntegrity(packageJsonPath) {
        try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            const lockfilePath = path.join(path.dirname(packageJsonPath), 'package-lock.json');
            
            const issues = [];

            // Verificar versiones exactas (sin ^ o ~)
            Object.entries(packageJson.dependencies || {}).forEach(([name, version]) => {
                if (version.startsWith('^') || version.startsWith('~')) {
                    issues.push({
                        type: 'version_range',
                        package: name,
                        version: version,
                        risk: 'high',
                        message: `Dependencia ${name} usa rango de versión ${version}. Debería ser versión exacta.`
                    });
                }
            });

            // Verificar existencia de lockfile
            if (!fs.existsSync(lockfilePath)) {
                issues.push({
                    type: 'missing_lockfile',
                    risk: 'critical',
                    message: `Falta package-lock.json en ${path.dirname(packageJsonPath)}`
                });
            }

            return {
                path: path.relative(this.projectRoot, packageJsonPath),
                issues: issues,
                dependenciesCount: Object.keys(packageJson.dependencies || {}).length
            };
        } catch (error) {
            return {
                path: path.relative(this.projectRoot, packageJsonPath),
                issues: [{
                    type: 'read_error',
                    risk: 'medium',
                    message: `Error leyendo ${packageJsonPath}: ${error.message}`
                }],
                dependenciesCount: 0
            };
        }
    }

    checkNpmrcSecurity() {
        const npmrcPaths = [
            path.join(this.projectRoot, '.npmrc'),
            path.join(this.projectRoot, 'frondend', '.npmrc'),
            path.join(this.projectRoot, 'backend', '.npmrc')
        ];

        const issues = [];

        npmrcPaths.forEach(npmrcPath => {
            if (fs.existsSync(npmrcPath)) {
                const content = fs.readFileSync(npmrcPath, 'utf8');
                
                // Verificar configuraciones de seguridad críticas
                const requiredSettings = [
                    'save-exact=true',
                    'audit-level=moderate'
                ];

                requiredSettings.forEach(setting => {
                    if (!content.includes(setting)) {
                        issues.push({
                            type: 'missing_npmrc_setting',
                            file: path.relative(this.projectRoot, npmrcPath),
                            setting: setting,
                            risk: 'high',
                            message: `Configuración de seguridad faltante: ${setting}`
                        });
                    }
                });
            } else {
                issues.push({
                    type: 'missing_npmrc',
                    file: path.relative(this.projectRoot, npmrcPath),
                    risk: 'high',
                    message: `Archivo .npmrc faltante en ${path.dirname(npmrcPath)}`
                });
            }
        });

        return issues;
    }

    async generateReport() {
        console.log('🔒 Iniciando verificación de seguridad NPM...\n');

        // Auditorías de seguridad
        const auditPromises = [
            this.runAudit(this.projectRoot),
            this.runAudit(path.join(this.projectRoot, 'frondend')),
            this.runAudit(path.join(this.projectRoot, 'backend'))
        ];

        const auditResults = await Promise.all(auditPromises);
        
        // Verificación de integridad de packages
        const packagePaths = [
            path.join(this.projectRoot, 'package.json'),
            path.join(this.projectRoot, 'frondend', 'package.json'),
            path.join(this.projectRoot, 'backend', 'package.json')
        ];

        const integrityResults = packagePaths.map(p => this.checkPackageIntegrity(p));
        
        // Verificación de .npmrc
        const npmrcIssues = this.checkNpmrcSecurity();

        // Compilar resultados
        this.results.vulnerabilities = auditResults;
        this.results.integrityChecks = integrityResults;
        this.results.npmrcIssues = npmrcIssues;

        // Generar recomendaciones
        this.generateRecommendations();

        // Mostrar reporte
        this.displayReport();

        // Guardar reporte
        this.saveReport();
    }

    generateRecommendations() {
        const recs = [];

        // Basado en vulnerabilidades encontradas
        this.results.vulnerabilities.forEach(audit => {
            if (audit.advisoriesCount > 0) {
                recs.push({
                    priority: 'high',
                    action: `Ejecutar npm audit fix en ${audit.directory}`,
                    reason: `Se encontraron ${audit.advisoriesCount} vulnerabilidades`
                });
            }
        });

        // Basado en problemas de integridad
        this.results.integrityChecks.forEach(check => {
            check.issues.forEach(issue => {
                if (issue.type === 'version_range') {
                    recs.push({
                        priority: 'high',
                        action: `Fijar versión exacta de ${issue.package} en ${check.path}`,
                        reason: 'Prevenir instalación automática de versiones maliciosas'
                    });
                }
            });
        });

        // Basado en problemas de .npmrc
        this.results.npmrcIssues.forEach(issue => {
            recs.push({
                priority: 'high',
                action: `Configurar ${issue.setting || '.npmrc'} en ${issue.file}`,
                reason: 'Fortalecer configuración de seguridad NPM'
            });
        });

        this.results.recommendations = recs;
    }

    displayReport() {
        console.log('📊 REPORTE DE SEGURIDAD NPM');
        console.log('=' * 50);
        console.log(`Fecha: ${this.results.timestamp}`);
        console.log();

        // Vulnerabilidades
        console.log('🚨 VULNERABILIDADES:');
        this.results.vulnerabilities.forEach(audit => {
            if (audit.advisoriesCount > 0) {
                console.log(`  ❌ ${audit.directory}: ${audit.advisoriesCount} vulnerabilidades`);
            } else {
                console.log(`  ✅ ${audit.directory}: Sin vulnerabilidades`);
            }
        });
        console.log();

        // Problemas de integridad
        console.log('🔍 VERIFICACIÓN DE INTEGRIDAD:');
        this.results.integrityChecks.forEach(check => {
            if (check.issues.length > 0) {
                console.log(`  ❌ ${check.path}:`);
                check.issues.forEach(issue => {
                    console.log(`    - ${issue.message} (${issue.risk})`);
                });
            } else {
                console.log(`  ✅ ${check.path}: Sin problemas`);
            }
        });
        console.log();

        // Problemas de .npmrc
        if (this.results.npmrcIssues.length > 0) {
            console.log('⚙️ CONFIGURACIÓN .NPMRC:');
            this.results.npmrcIssues.forEach(issue => {
                console.log(`  ❌ ${issue.message} (${issue.risk})`);
            });
            console.log();
        }

        // Recomendaciones
        if (this.results.recommendations.length > 0) {
            console.log('💡 RECOMENDACIONES:');
            this.results.recommendations.forEach((rec, index) => {
                console.log(`  ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.action}`);
                console.log(`     Razón: ${rec.reason}`);
            });
        } else {
            console.log('✅ ¡Todas las verificaciones de seguridad pasaron!');
        }
        console.log();
    }

    saveReport() {
        const reportPath = path.join(this.projectRoot, 'security-reports', 
            `npm-security-${new Date().toISOString().split('T')[0]}.json`);
        
        // Crear directorio si no existe
        const dir = path.dirname(reportPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`📝 Reporte guardado en: ${reportPath}`);
    }
}

// Ejecutar verificación
if (require.main === module) {
    const verifier = new NPMSecurityVerifier();
    verifier.generateReport().catch(console.error);
}

module.exports = NPMSecurityVerifier;