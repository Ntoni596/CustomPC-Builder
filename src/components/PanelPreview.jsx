import './PanelPreview.css'

function PanelPreview({ chassis, panelOverlay, placeholderTexture }) {
  const overlayImage = panelOverlay?.image || placeholderTexture
  const overlayStyle = {
    backgroundImage: `url(${overlayImage})`,
    opacity: panelOverlay.opacity,
    transform: `translate(${panelOverlay.position.x * 50}%, ${panelOverlay.position.y * 50}%) scale(${panelOverlay.scale})`,
  }

  return (
    <div className="panel-preview">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{chassis.brand} UV-ready</p>
          <h2>{chassis.name} artwork preview</h2>
          <p className="muted small">Dual surface mock with your upload mapped to the tempered glass and side mesh zones.</p>
        </div>
        <div className="badge ghost">{chassis.printArea} printable</div>
      </div>

      <div className="panel-grid">
        {chassis.surfaces.map((surface) => (
          <div key={surface.id} className="surface-card">
            <div className="surface-meta">
              <div>
                <p className="eyebrow">{surface.label}</p>
                <h4>{surface.name}</h4>
              </div>
              <span className="pill ok">{surface.finish}</span>
            </div>

            <div className="surface-frame">
              <div
                className="case-shell"
                style={{ backgroundImage: surface.preview ? `url(${surface.preview})` : undefined }}
              >
                <div className={`panel panel-${surface.id}`}> </div>
                <div className="panel-overlay" style={overlayStyle} />
              </div>
            </div>

            <p className="muted small">{surface.desc}</p>
            {surface.hotspot ? <p className="muted micro">{surface.hotspot}</p> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PanelPreview
