import { useMemo, useState } from 'react'
import './App.css'
import PCBuilderScene from './components/PCBuilderScene'

const componentCatalog = {
  case: [
    {
      id: 'velox-atx',
      name: 'Velox ATX',
      size: 'tower',
      hasRender: true,
      panelZone: 'full-height',
      description: 'Flagship tempered glass tower with full height panel print area.',
    },
    {
      id: 'ion-compact',
      name: 'ION Compact',
      size: 'sff',
      hasRender: true,
      panelZone: 'split',
      description: 'Space-efficient chassis optimised for air and AIO cooling.',
    },
    {
      id: 'placeholder-tower',
      name: 'Legacy Tower',
      size: 'tower',
      hasRender: false,
      panelZone: 'full-height',
      description: 'Legacy enclosure – shows placeholder until render is available.',
    },
  ],
  motherboard: [
    { id: 'z790', name: 'Z790 ATX', formFactor: 'atx', hasRender: true },
    { id: 'b650', name: 'B650 Micro ATX', formFactor: 'microatx', hasRender: true },
    { id: 'placeholder-board', name: 'Placeholder Board', formFactor: 'atx', hasRender: false },
  ],
  cpu: [
    { id: 'i9', name: 'Intel i9', power: 'high', hasRender: true },
    { id: 'r7', name: 'Ryzen 7', power: 'balanced', hasRender: true },
  ],
  gpu: [
    { id: '4090', name: 'RTX 4090', length: 'long', hasRender: true },
    { id: '4070', name: 'RTX 4070', length: 'standard', hasRender: true },
    { id: 'placeholder-gpu', name: 'Placeholder GPU', length: 'standard', hasRender: false },
  ],
}

const defaultPanelGrid =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="#0f172a" />
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="2" />
    </pattern>
  </defs>
  <rect width="400" height="400" fill="url(#grid)" />
  <text x="50%" y="50%" fill="#94a3b8" font-size="18" text-anchor="middle" dy="6">UV print alignment grid</text>
</svg>`)

function App() {
  const [selectedParts, setSelectedParts] = useState({
    case: 'velox-atx',
    motherboard: 'z790',
    cpu: 'i9',
    gpu: '4090',
  })

  const [panelOverlay, setPanelOverlay] = useState({
    image: defaultPanelGrid,
    position: { x: 0, y: 0 },
    scale: 1,
    opacity: 0.9,
  })

  const selectedCase = useMemo(
    () => componentCatalog.case.find((item) => item.id === selectedParts.case),
    [selectedParts.case],
  )
  const selectedMotherboard = useMemo(
    () => componentCatalog.motherboard.find((item) => item.id === selectedParts.motherboard),
    [selectedParts.motherboard],
  )
  const selectedCpu = useMemo(
    () => componentCatalog.cpu.find((item) => item.id === selectedParts.cpu),
    [selectedParts.cpu],
  )
  const selectedGpu = useMemo(
    () => componentCatalog.gpu.find((item) => item.id === selectedParts.gpu),
    [selectedParts.gpu],
  )

  const handleComponentSelect = (type, value) => {
    setSelectedParts((prev) => ({ ...prev, [type]: value }))
  }

  const handlePanelUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setPanelOverlay((prev) => ({ ...prev, image: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handlePanelChange = (key, value) => {
    setPanelOverlay((prev) => ({ ...prev, [key]: value }))
  }

  const exportPanelPackage = () => {
    const payload = {
      caseId: selectedCase?.id,
      panelZone: selectedCase?.panelZone,
      overlay: panelOverlay,
      notes: 'Feed directly to UV printer – dimensions are normalised to the panel mesh in the scene.',
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'panel-print-package.json'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="app-container">
      <header>
        <div>
          <p className="eyebrow">Realtime visualiser • production-ready UV panel exports</p>
          <h1>Interactive Custom PC Builder</h1>
          <p>Create a photoreal single source of truth for customers and the build team.</p>
        </div>
        <div className="header-actions">
          <div className="badge">Aftershock AU ready</div>
          <div className="badge ghost">Placeholder renders auto handled</div>
        </div>
      </header>

      <div className="builder-container">
        <div className="scene-column">
          <div className="scene-topbar">
            <div>
              <h2>Live 3D preview</h2>
              <p className="muted">Rotate, zoom, and see components reposition instantly.</p>
            </div>
            <div className="pill">Panel alignment grid toggles with your upload.</div>
          </div>
          <div className="scene-container">
            <PCBuilderScene
              components={{
                case: selectedCase,
                motherboard: selectedMotherboard,
                cpu: selectedCpu,
                gpu: selectedGpu,
              }}
              panelOverlay={panelOverlay}
              placeholderTexture={defaultPanelGrid}
            />
          </div>
        </div>

        <div className="controls-panel">
          <section className="component-section">
            <div className="section-header">
              <div>
                <p className="eyebrow">Compatibility aware</p>
                <h3>Component library</h3>
                <p className="muted">Select parts to reposition the internal layout.</p>
              </div>
              <div className="legend">
                <span className="legend-dot available" /> Rendered
                <span className="legend-dot placeholder" /> Placeholder
              </div>
            </div>

            {Object.entries(componentCatalog).map(([type, options]) => (
              <div key={type} className="component-group">
                <div className="group-header">
                  <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                  <span className="count">{options.length} options</span>
                </div>
                <div className="options-grid">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      className={`option-card ${selectedParts[type] === option.id ? 'active' : ''}`}
                      onClick={() => handleComponentSelect(type, option.id)}
                    >
                      <div className="option-header">
                        <span className={`dot ${option.hasRender ? 'available' : 'placeholder'}`} />
                        <strong>{option.name}</strong>
                      </div>
                      {option.description && <p className="muted small">{option.description}</p>}
                      {!option.description && option.formFactor && (
                        <p className="muted small">Form factor: {option.formFactor.toUpperCase()}</p>
                      )}
                      {!option.hasRender && (
                        <p className="placeholder-note">No render yet – showing neutral block.</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="component-section">
            <div className="section-header">
              <div>
                <p className="eyebrow">UV printer ready</p>
                <h3>Panel print setup</h3>
                <p className="muted">Upload artwork, line it up, then export the JSON package for production.</p>
              </div>
            </div>

            <div className="panel-upload">
              <label htmlFor="panelUpload" className="upload-label">Upload PNG/JPG</label>
              <input id="panelUpload" type="file" accept="image/*" onChange={handlePanelUpload} />
              <p className="muted small">No artwork? The alignment grid is used instead.</p>
            </div>

            <div className="panel-controls">
              <div className="control-row">
                <label>Horizontal offset</label>
                <input
                  type="range"
                  min="-0.6"
                  max="0.6"
                  step="0.02"
                  value={panelOverlay.position.x}
                  onChange={(e) => handlePanelChange('position', { ...panelOverlay.position, x: Number(e.target.value) })}
                />
              </div>
              <div className="control-row">
                <label>Vertical offset</label>
                <input
                  type="range"
                  min="-0.6"
                  max="0.6"
                  step="0.02"
                  value={panelOverlay.position.y}
                  onChange={(e) => handlePanelChange('position', { ...panelOverlay.position, y: Number(e.target.value) })}
                />
              </div>
              <div className="control-row">
                <label>Scale</label>
                <input
                  type="range"
                  min="0.6"
                  max="1.4"
                  step="0.02"
                  value={panelOverlay.scale}
                  onChange={(e) => handlePanelChange('scale', Number(e.target.value))}
                />
              </div>
              <div className="control-row">
                <label>Print opacity</label>
                <input
                  type="range"
                  min="0.4"
                  max="1"
                  step="0.05"
                  value={panelOverlay.opacity}
                  onChange={(e) => handlePanelChange('opacity', Number(e.target.value))}
                />
              </div>
              <button className="export" onClick={exportPanelPackage}>Download UV print package</button>
            </div>
          </section>

          <section className="component-section">
            <div className="section-header">
              <div>
                <p className="eyebrow">Snapshot for the build team</p>
                <h3>Live BOM summary</h3>
                <p className="muted">Auto-updates as you click. Includes render coverage flags.</p>
              </div>
            </div>
            <ul className="summary-list">
              <li>
                <div>
                  <strong>Case</strong>
                  <p className="muted small">{selectedCase?.name}</p>
                </div>
                <span className={`pill ${selectedCase?.hasRender ? 'ok' : 'warn'}`}>
                  {selectedCase?.hasRender ? 'Render ready' : 'Placeholder'}
                </span>
              </li>
              <li>
                <div>
                  <strong>Motherboard</strong>
                  <p className="muted small">{selectedMotherboard?.name}</p>
                </div>
                <span className={`pill ${selectedMotherboard?.hasRender ? 'ok' : 'warn'}`}>
                  {selectedMotherboard?.hasRender ? 'Render ready' : 'Placeholder'}
                </span>
              </li>
              <li>
                <div>
                  <strong>CPU</strong>
                  <p className="muted small">{selectedCpu?.name}</p>
                </div>
                <span className="pill ok">Profiled</span>
              </li>
              <li>
                <div>
                  <strong>GPU</strong>
                  <p className="muted small">{selectedGpu?.name}</p>
                </div>
                <span className={`pill ${selectedGpu?.hasRender ? 'ok' : 'warn'}`}>
                  {selectedGpu?.hasRender ? 'Render ready' : 'Placeholder'}
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
