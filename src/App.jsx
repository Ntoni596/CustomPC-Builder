import { useState } from 'react'
import './App.css'
import PanelPreview from './components/PanelPreview'
import frontGlass from './assets/chassis/front-glass.svg'
import sideMesh from './assets/chassis/side-mesh.svg'
import frontAngle from './assets/chassis/front-angle.svg'

const baseChassis = {
  name: 'Lian Li O11 Dynamic EVO',
  brand: 'Aftershock AU',
  printArea: 'Dual panel',
  surfaces: [
    {
      id: 'front-glass',
      label: 'Tempered glass',
      name: 'Front showcase window',
      finish: 'Print-ready',
      preview: frontGlass,
      hotspot: 'Full height glass for hero artwork. 400mm x 450mm normalised space.',
      desc: 'Use UV-cured ink for vibrant colours. Uploads are centred and can be offset for logo placement.',
    },
    {
      id: 'side-mesh',
      label: 'Ventilated steel',
      name: 'Side mesh panel',
      finish: 'Breathable',
      preview: sideMesh,
      hotspot: 'Mesh intake surface. Leave light spill-through for airflow.',
      desc: 'Optimised for breathable graphics. Keep opacity under 90% to preserve ventilation.',
    },
    {
      id: 'angle-proof',
      label: 'Assembly proof',
      name: 'Perspective reference',
      finish: 'Visualizer',
      preview: frontAngle,
      hotspot: 'Use to sanity check alignment across glass + mesh before exporting.',
      desc: 'Reference-only angle that mirrors the product photography provided.',
    },
  ],
  quickNotes: [
    'Base unit locked to O11 Dynamic EVO geometry for consistent panel sizing.',
    'JSON export mirrors printer pipeline – no rework required by the factory team.',
    'Alignment grid doubles as a proof if no artwork is supplied.',
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
  const [panelOverlay, setPanelOverlay] = useState({
    image: defaultPanelGrid,
    position: { x: 0, y: 0 },
    scale: 1,
    opacity: 0.9,
  })

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

  const resetOverlay = () => {
    setPanelOverlay({
      image: defaultPanelGrid,
      position: { x: 0, y: 0 },
      scale: 1,
      opacity: 0.9,
    })
  }

  const exportPanelPackage = () => {
    const payload = {
      caseName: baseChassis.name,
      surfaces: baseChassis.surfaces.map((surface) => surface.id),
      overlay: panelOverlay,
      notes: 'Feed directly to UV printer – dimensions are normalised to the panel mesh in the scene.',
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'o11-evo-uv-print-package.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app-container">
      <header>
        <div>
          <p className="eyebrow">Aftershock AU</p>
          <h1>O11 Dynamic EVO panel print desk</h1>
          <p>Focus on the chassis we ship every day. Upload customer artwork, preview, and export UV-ready files.</p>
        </div>
        <div className="header-actions">
          <div className="badge">Printer workflow aligned</div>
          <div className="badge ghost">Tempered glass + mesh</div>
        </div>
      </header>

      <div className="layout">
        <div className="preview-column">
          <PanelPreview chassis={baseChassis} panelOverlay={panelOverlay} placeholderTexture={defaultPanelGrid} />

          <div className="notes-card">
            <p className="eyebrow">Production crib notes</p>
            <ul>
              {baseChassis.quickNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="controls-panel">
          <section className="component-section">
            <div className="section-header">
              <div>
                <p className="eyebrow">Print surface locked</p>
                <h3>Artwork upload</h3>
                <p className="muted">Drop in customer art for the O11 Dynamic EVO. Your file sits on both printable panels.</p>
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
              <div className="actions">
                <button className="ghost" onClick={resetOverlay}>Reset to alignment grid</button>
                <button className="export" onClick={exportPanelPackage}>Download UV print package</button>
              </div>
            </div>
          </section>

          <section className="component-section">
            <div className="section-header">
              <div>
                <p className="eyebrow">Printer ready</p>
                <h3>Hand-off checklist</h3>
                <p className="muted">Everything the panel-print team needs in one JSON payload.</p>
              </div>
            </div>
            <ul className="summary-list">
              <li>
                <div>
                  <strong>Chassis</strong>
                  <p className="muted small">{baseChassis.name}</p>
                </div>
                <span className="pill ok">Locked</span>
              </li>
              <li>
                <div>
                  <strong>Surfaces</strong>
                  <p className="muted small">{baseChassis.surfaces.map((s) => s.label).join(' + ')}</p>
                </div>
                <span className="pill ok">Included</span>
              </li>
              <li>
                <div>
                  <strong>Artwork source</strong>
                  <p className="muted small">{panelOverlay.image === defaultPanelGrid ? 'Using alignment grid' : 'Customer upload applied'}</p>
                </div>
                <span className={`pill ${panelOverlay.image === defaultPanelGrid ? 'warn' : 'ok'}`}>
                  {panelOverlay.image === defaultPanelGrid ? 'Awaiting art' : 'Ready'}
                </span>
              </li>
              <li>
                <div>
                  <strong>Offsets</strong>
                  <p className="muted small">
                    X: {panelOverlay.position.x.toFixed(2)} | Y: {panelOverlay.position.y.toFixed(2)} | Scale: {panelOverlay.scale.toFixed(2)}
                  </p>
                </div>
                <span className="pill ghost">Opacity {Math.round(panelOverlay.opacity * 100)}%</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
