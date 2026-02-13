// Estado de la aplicación
const state = {
    panelIslandAbierto: false,
    pantalla: 'home',
    appExpandida: null,
    numApps: 4
};

// Datos de las apps
const apps = [
    { id: 'discord', nombre: 'Discord', color: 'indigo', info: { titulo: 'Llamada activa', detalle: 'Usuario#1234', tiempo: '00:45' }},
    { id: 'alarma', nombre: 'Alarma', color: 'orange', info: { titulo: 'Sonando ahora', detalle: 'Despertar', tiempo: '07:00 AM' }},
    { id: 'mensaje', nombre: 'WhatsApp', color: 'green', info: { titulo: '3 mensajes', detalle: 'María, Juan', tiempo: 'Hace 2 min' }},
    { id: 'tiktok', nombre: 'TikTok', color: 'pink', info: { titulo: 'Nuevo video', detalle: '@usuario', tiempo: 'Hace 5 min' }}
];

// Menú de opciones
const menuItems = [
    { id: 'personalizacion', titulo: 'Personalización', desc: 'Colores, transparencia, temas', gradient: 'linear-gradient(to right, #ec4899, #f43f5e)' },
    { id: 'apps', titulo: 'Apps permitidas', desc: 'Activar/desactivar apps', gradient: 'linear-gradient(to right, #3b82f6, #06b6d4)' },
    { id: 'prueba', titulo: 'Prueba de Island', desc: 'Tutorial interactivo', gradient: 'linear-gradient(to right, #a855f7, #6366f1)' },
    { id: 'actualizaciones', titulo: 'Actualizaciones', desc: 'Novedades y changelog', gradient: 'linear-gradient(to right, #22c55e, #10b981)' },
    { id: 'config', titulo: 'Configuración', desc: 'Ajustes avanzados', gradient: 'linear-gradient(to right, #f97316, #f59e0b)' },
    { id: 'perfil', titulo: 'Perfil', desc: 'Cuenta y preferencias', gradient: 'linear-gradient(to right, #6b7280, #64748b)' }
];

// Iconos SVG
const icons = {
    phone: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />',
    bell: '<path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />',
    message: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />',
    music: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />',
    x: '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />',
    settings: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />',
    chevronRight: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />',
    home: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />'
};

// Función para crear iconos SVG
function createIcon(type, className = '') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 24 24');
    svg.innerHTML = icons[type];
    return svg;
}

// Renderizar Preview del Panel Island
function renderPanelPreview() {
    const appsActivas = apps.slice(0, state.numApps);
    
    return `
        <div class="panel-preview gradient-sky">
            <div class="island-container">
                ${appsActivas.slice(0, 2).map(app => `
                    <div class="app-circle bg-${app.color} ${state.appExpandida === app.id ? 'hidden' : ''}" 
                         onclick="toggleApp('${app.id}')">
                        <svg class="app-icon" fill="none" viewBox="0 0 24 24">
                            ${icons[app.id === 'discord' ? 'phone' : app.id === 'alarma' ? 'bell' : app.id === 'mensaje' ? 'message' : 'music']}
                        </svg>
                        <div class="notification-badge"></div>
                    </div>
                `).join('')}
                
                <div class="island-pill"></div>
                
                ${appsActivas.slice(2, 3).map(app => `
                    <div class="app-circle bg-${app.color} ${state.appExpandida === app.id ? 'hidden' : ''}" 
                         onclick="toggleApp('${app.id}')">
                        <svg class="app-icon" fill="none" viewBox="0 0 24 24">
                            ${icons[app.id === 'discord' ? 'phone' : app.id === 'alarma' ? 'bell' : app.id === 'mensaje' ? 'message' : 'music']}
                        </svg>
                        <div class="notification-badge"></div>
                    </div>
                `).join('')}
            </div>
            
            ${state.appExpandida ? renderExpansion() : ''}
            
            <p class="preview-label">Preview - Panel Island</p>
        </div>
    `;
}

// Renderizar expansión de app
function renderExpansion() {
    const app = apps.find(a => a.id === state.appExpandida);
    if (!app) return '';
    
    return `
        <div class="app-expansion">
            <div class="expansion-card">
                <div class="expansion-header bg-${app.color}">
                    <div class="expansion-icon-bg">
                        <svg class="expansion-icon" fill="none" viewBox="0 0 24 24">
                            ${icons[app.id === 'discord' ? 'phone' : app.id === 'alarma' ? 'bell' : app.id === 'mensaje' ? 'message' : 'music']}
                        </svg>
                    </div>
                    <div class="expansion-info">
                        <div class="expansion-title">${app.info.titulo}</div>
                        <div class="expansion-detail">${app.info.detalle}</div>
                    </div>
                    <button class="close-btn" onclick="toggleApp(null)">
                        <svg class="app-icon" fill="none" viewBox="0 0 24 24">
                            ${icons.x}
                        </svg>
                    </button>
                </div>
                <div class="expansion-body">
                    <div class="time-display text-${app.color}">${app.info.tiempo}</div>
                    <div class="action-buttons">
                        <button class="btn btn-primary bg-${app.color}">Acción</button>
                        <button class="btn btn-secondary">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Renderizar pantalla de inicio (antes de abrir Panel Island)
function renderHome() {
    return `
        <div class="main-container gradient-dark">
            ${renderPanelPreview()}
            <div class="content-section">
                <div class="text-center" style="margin-bottom: 2rem;">
                    <h1 class="title">Panel Island</h1>
                    <p class="subtitle">Toca para configurar</p>
                </div>
                
                <button class="open-btn gradient-cyan-blue" onclick="abrirPanelIsland()">
                    <div class="open-btn-content">
                        <div class="open-btn-left">
                            <div class="icon-container">
                                <svg class="settings-icon" fill="none" viewBox="0 0 24 24">
                                    ${icons.settings}
                                </svg>
                            </div>
                            <div class="open-btn-text">
                                <div class="open-btn-title">Abrir Panel Island</div>
                                <div class="open-btn-desc">Configuración y ajustes</div>
                            </div>
                        </div>
                        <svg class="chevron" fill="none" viewBox="0 0 24 24">
                            ${icons.chevronRight}
                        </svg>
                    </div>
                </button>
                
                <div class="demo-controls">
                    <p class="demo-title">🔧 DEMO - Simular apps:</p>
                    <div class="demo-buttons">
                        ${[0, 1, 2, 3, 4].map(n => `
                            <button class="demo-btn ${state.numApps === n ? 'active' : ''}" 
                                    onclick="cambiarNumApps(${n})">
                                ${n}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Renderizar menú principal
function renderMenu() {
    return `
        <div class="main-container gradient-dark">
            ${renderPanelPreview()}
            <div class="content-section">
                <div class="menu-header">
                    <h1 class="menu-title">🏝️ Panel Island</h1>
                    <button class="home-btn" onclick="cerrarPanelIsland()">
                        <svg class="chevron" fill="none" viewBox="0 0 24 24" style="stroke: white;">
                            ${icons.home}
                        </svg>
                    </button>
                </div>
                
                <div class="menu-grid">
                    ${menuItems.map(item => `
                        <button class="menu-item" style="background: ${item.gradient};" 
                                onclick="irAPantalla('${item.id}')">
                            <div class="menu-item-content">
                                <div class="icon-container">
                                    <svg class="settings-icon" fill="none" viewBox="0 0 24 24">
                                        ${icons.settings}
                                    </svg>
                                </div>
                                <div class="menu-item-info">
                                    <div class="menu-item-title">${item.titulo}</div>
                                    <div class="menu-item-desc">${item.desc}</div>
                                </div>
                                <svg class="chevron" fill="none" viewBox="0 0 24 24" style="stroke: white;">
                                    ${icons.chevronRight}
                                </svg>
                            </div>
                        </button>
                    `).join('')}
                </div>
                
                <div class="version-info">
                    <p class="version-text">Versión 0.1 Beta</p>
                    <p class="version-subtext">Dynamic Island para Android</p>
                </div>
            </div>
        </div>
    `;
}

// Renderizar pantalla interna
function renderPantallaInterna() {
    const item = menuItems.find(i => i.id === state.pantalla);
    const textos = {
        personalizacion: 'Aquí podrás personalizar colores, transparencia e imágenes de fondo.',
        apps: 'Aquí podrás activar/desactivar qué apps aparecen en el Panel Island.',
        prueba: 'Tutorial interactivo para probar todas las funciones del Panel Island.',
        actualizaciones: 'Novedades, changelog y sistema de actualizaciones automáticas.',
        config: 'Ajustes avanzados del Panel Island.',
        perfil: 'Gestión de cuenta, estado VIP y preferencias.'
    };
    
    return `
        <div class="main-container gradient-dark">
            ${renderPanelPreview()}
            <div class="content-section">
                <div class="section-header">
                    <button class="back-btn" onclick="volverMenu()">
                        <svg class="chevron" fill="none" viewBox="0 0 24 24" style="stroke: white; transform: rotate(180deg);">
                            ${icons.chevronRight}
                        </svg>
                    </button>
                    <h1 class="section-title">${item.titulo}</h1>
                </div>
                
                <div class="section-card text-center">
                    <div class="section-icon-bg">
                        <svg class="section-icon" fill="none" viewBox="0 0 24 24">
                            ${icons.settings}
                        </svg>
                    </div>
                    <h2 class="section-card-title">${item.titulo}</h2>
                    <p class="section-card-subtitle">Sección en desarrollo</p>
                    <div class="info-box">
                        <p class="info-text">${textos[state.pantalla]}</p>
                    </div>
                    <button class="btn btn-primary gradient-cyan-blue" style="width: 100%; padding: 0.75rem;" onclick="volverMenu()">
                        Volver al menú
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Funciones de interacción
function toggleApp(appId) {
    state.appExpandida = state.appExpandida === appId ? null : appId;
    render();
}

function cambiarNumApps(num) {
    state.numApps = num;
    state.appExpandida = null;
    render();
}

function abrirPanelIsland() {
    state.panelIslandAbierto = true;
    state.pantalla = 'home';
    render();
}

function cerrarPanelIsland() {
    state.panelIslandAbierto = false;
    render();
}

function irAPantalla(pantalla) {
    state.pantalla = pantalla;
    render();
}

function volverMenu() {
    state.pantalla = 'home';
    render();
}

// Renderizar aplicación
function render() {
    const app = document.getElementById('app');
    
    if (!state.panelIslandAbierto) {
        app.innerHTML = renderHome();
    } else if (state.pantalla === 'home') {
        app.innerHTML = renderMenu();
    } else {
        app.innerHTML = renderPantallaInterna();
    }
}

// Iniciar aplicación
document.addEventListener('DOMContentLoaded', () => {
    render();
});
