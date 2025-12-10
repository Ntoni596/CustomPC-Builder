import { useState } from 'react'
import './App.css'
import PCBuilderScene from './components/PCBuilderScene'

function App() {
  const [components, setComponents] = useState({
    case: 'standard',
    motherboard: null,
    cpu: null,
    gpu: null,
  })

  const handleComponentSelect = (type, value) => {
    setComponents(prev => ({ ...prev, [type]: value }))
  }

  return (
    <div className="app-container">
      <header>
        <h1>Custom PC Builder</h1>
        <p>Build your dream PC in 3D</p>
      </header>
      
      <div className="builder-container">
        <div className="scene-container">
          <PCBuilderScene components={components} />
        </div>
        
        <div className="controls-panel">
          <h2>Components</h2>
          
          <div className="component-section">
            <h3>Case</h3>
            <div className="component-options">
              <button 
                className={components.case === 'standard' ? 'active' : ''}
                onClick={() => handleComponentSelect('case', 'standard')}
              >
                Standard
              </button>
              <button 
                className={components.case === 'compact' ? 'active' : ''}
                onClick={() => handleComponentSelect('case', 'compact')}
              >
                Compact
              </button>
            </div>
          </div>
          
          <div className="component-section">
            <h3>Motherboard</h3>
            <div className="component-options">
              <button 
                className={components.motherboard === 'atx' ? 'active' : ''}
                onClick={() => handleComponentSelect('motherboard', 'atx')}
              >
                ATX
              </button>
              <button 
                className={components.motherboard === 'microatx' ? 'active' : ''}
                onClick={() => handleComponentSelect('motherboard', 'microatx')}
              >
                Micro ATX
              </button>
            </div>
          </div>
          
          <div className="component-section">
            <h3>Instructions</h3>
            <ul>
              <li>Click and drag to rotate the PC</li>
              <li>Scroll to zoom in/out</li>
              <li>Select components from the panel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
