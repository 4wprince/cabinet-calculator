import React, { useState } from 'react';
import './App.css';

const API_URL = '/api';

function App() {
  const [layoutMode, setLayoutMode] = useState('independent');
  
  const [config, setConfig] = useState({
    layoutMode: 'independent',
    wallALength: 140,
    wallBLength: 120,
    rangeCenter: 75,
    sinkCenter: 60,
    hasRefPanels: false,
    panelSize: 3.0,
    hasDishwasher: true,
    dishwasherPosition: 'right',
    hasTrayBase: false,
    trayBasePosition: 'opposite',
    hasTrashCan: false,
    hasValance: true,
    baseCornerType: 'ls36',
    wallCornerType: 'diagonal',
    // Wall cabinet config
    wallAHeight: 30,
    wallBHeight: 30,
    hasMicrowaveA: false,
    microwaveCenterA: 0,
    hasMicrowaveB: false,
    microwaveCenterB: 0,
    hasWineRackB: false,
    wineRackWidth: 30,
    wineRackCenterB: 0
  });

  const [drawerBaseA, setDrawerBaseA] = useState({
    enabled: false,
    type: '3drawer',
    position: 'left',
    leftSize: 18,
    rightSize: 18
  });

  const [drawerBaseB, setDrawerBaseB] = useState({
    enabled: false,
    type: '3drawer',
    position: 'right',
    leftSize: 18,
    rightSize: 18
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [svgData, setSvgData] = useState(null);
  const [profileSvgData, setProfileSvgData] = useState(null);
  const [aiRenderData, setAiRenderData] = useState(null);
  const [aiRenderData, setAiRenderData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleLayoutModeChange = (mode) => {
    setLayoutMode(mode);
    setConfig(prev => ({ ...prev, layoutMode: mode }));
  };

  const handleDrawerBaseAChange = (field, value) => {
    setDrawerBaseA(prev => ({ ...prev, [field]: value }));
  };

  const handleDrawerBaseBChange = (field, value) => {
    setDrawerBaseB(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        ...config,
        drawerBaseA: drawerBaseA.enabled ? {
          type: drawerBaseA.type,
          position: drawerBaseA.position,
          leftSize: drawerBaseA.leftSize,
          rightSize: drawerBaseA.rightSize
        } : null,
        drawerBaseB: drawerBaseB.enabled ? {
          type: drawerBaseB.type,
          position: drawerBaseB.position,
          leftSize: drawerBaseB.leftSize,
          rightSize: drawerBaseB.rightSize
        } : null
      };

      const response = await fetch(`${API_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.success) {
        setResults(data);
      } else {
        setError(data.error || 'Calculation failed');
      }
    } catch (err) {
      setError('Failed to connect to backend. Make sure the Python server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFloorPlan = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        ...config,
        drawerBaseA: drawerBaseA.enabled ? {
          type: drawerBaseA.type,
          position: drawerBaseA.position,
          leftSize: drawerBaseA.leftSize,
          rightSize: drawerBaseA.rightSize
        } : null,
        drawerBaseB: drawerBaseB.enabled ? {
          type: drawerBaseB.type,
          position: drawerBaseB.position,
          leftSize: drawerBaseB.leftSize,
          rightSize: drawerBaseB.rightSize
        } : null
      };

      const response = await fetch(`${API_URL}/generate-overhead-svg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const svgText = await response.text();
        setSvgData(svgText);
      } else {
        const data = await response.json();
        setError(data.error || 'SVG generation failed');
      }
    } catch (err) {
      setError('Failed to generate floor plan.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        ...config,
        drawerBaseA: drawerBaseA.enabled ? {
          type: drawerBaseA.type,
          position: drawerBaseA.position,
          leftSize: drawerBaseA.leftSize,
          rightSize: drawerBaseA.rightSize
        } : null,
        drawerBaseB: drawerBaseB.enabled ? {
          type: drawerBaseB.type,
          position: drawerBaseB.position,
          leftSize: drawerBaseB.leftSize,
          rightSize: drawerBaseB.rightSize
        } : null
      };

      const response = await fetch(`${API_URL}/generate-profile-svg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const svgText = await response.text();
        setProfileSvgData(svgText);
      } else {
        const data = await response.json();
        setError(data.error || 'Profile generation failed');
      }
    } catch (err) {
      setError('Failed to generate profile view.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAIRender = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        ...config,
        drawerBaseA: drawerBaseA.enabled ? {
          type: drawerBaseA.type,
          position: drawerBaseA.position,
          leftSize: drawerBaseA.leftSize,
          rightSize: drawerBaseA.rightSize
        } : null,
        drawerBaseB: drawerBaseB.enabled ? {
          type: drawerBaseB.type,
          position: drawerBaseB.position,
          leftSize: drawerBaseB.leftSize,
          rightSize: drawerBaseB.rightSize
        } : null
      };

      const response = await fetch(`${API_URL}/generate-ai-render`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setAiRenderData(data);
      } else {
        setError(data.error || 'AI render generation failed');
      }
    } catch (err) {
      setError('Failed to generate AI render. This can take 10-30 seconds, please wait...');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAIRender = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        ...config,
        drawerBaseA: drawerBaseA.enabled ? {
          type: drawerBaseA.type,
          position: drawerBaseA.position,
          leftSize: drawerBaseA.leftSize,
          rightSize: drawerBaseA.rightSize
        } : null,
        drawerBaseB: drawerBaseB.enabled ? {
          type: drawerBaseB.type,
          position: drawerBaseB.position,
          leftSize: drawerBaseB.leftSize,
          rightSize: drawerBaseB.rightSize
        } : null
      };

      const response = await fetch(`${API_URL}/generate-ai-render`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setAiRenderData(data);
      } else {
        setError(data.error || 'AI render generation failed');
      }
    } catch (err) {
      setError('Failed to generate AI render. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDrawerWidths = (type) => {
    return type === '2drawer' ? [30, 36] : [12, 15, 18, 21, 24, 27, 30, 33, 36];
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CabinetCloudAI</h1>
        <p className="subtitle">AI-Powered Kitchen Design System</p>
      </header>

      <div className="container">
        {/* Layout Mode Selector */}
        <div className="mode-selector">
          <h2>Layout Mode</h2>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                checked={layoutMode === 'independent'}
                onChange={() => handleLayoutModeChange('independent')}
              />
              Two Independent Walls
            </label>
            <label>
              <input
                type="radio"
                checked={layoutMode === 'lshape'}
                onChange={() => handleLayoutModeChange('lshape')}
              />
              L-Shape Kitchen
            </label>
          </div>
        </div>

        {/* Corner Configuration (only for L-Shape) */}
        {layoutMode === 'lshape' && (
          <div className="corner-section">
            <h2>Corner Configuration</h2>
            
            <div className="input-group">
              <label>Base Corner Type:</label>
              <select
                name="baseCornerType"
                value={config.baseCornerType}
                onChange={handleInputChange}
              >
                <option value="magic">Magic Corner (3" + 6" fillers)</option>
                <option value="ls33">Lazy Susan 33"</option>
                <option value="ls36">Lazy Susan 36"</option>
                <option value="blind3639">Blind Base 36-39"</option>
                <option value="blind3942">Blind Base 39-42"</option>
                <option value="blind4245">Blind Base 42-45"</option>
              </select>
            </div>

            <div className="input-group">
              <label>Wall Corner Type:</label>
              <select
                name="wallCornerType"
                value={config.wallCornerType}
                onChange={handleInputChange}
              >
                <option value="magic">Magic Corner</option>
                <option value="diagonal">Diagonal Wall 24"</option>
                <option value="blind">Blind Wall 27-30"</option>
              </select>
            </div>
          </div>
        )}

        {/* Wall A Configuration */}
        <div className="config-section">
          <h2>Wall A: Refrigerator + Range</h2>
          
          <div className="input-group">
            <label>Wall Length (inches):</label>
            <input
              type="number"
              name="wallALength"
              value={config.wallALength}
              onChange={handleInputChange}
              min="60"
              max="300"
            />
          </div>

          <div className="input-group">
            <label>Range Center Position (inches from left):</label>
            <input
              type="number"
              name="rangeCenter"
              value={config.rangeCenter}
              onChange={handleInputChange}
              min="30"
              max="250"
            />
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="hasRefPanels"
                checked={config.hasRefPanels}
                onChange={handleInputChange}
              />
              Has Refrigerator Panels
            </label>
          </div>

          {config.hasRefPanels && (
            <div className="input-group indent">
              <label>Panel Size:</label>
              <select
                name="panelSize"
                value={config.panelSize}
                onChange={handleInputChange}
              >
                <option value="0.75">0.75"</option>
                <option value="1.5">1.5"</option>
                <option value="3.0">3.0"</option>
              </select>
            </div>
          )}

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={drawerBaseA.enabled}
                onChange={(e) => handleDrawerBaseAChange('enabled', e.target.checked)}
              />
              Include Drawer Base
            </label>
          </div>

          {drawerBaseA.enabled && (
            <div className="indent">
              <div className="input-group">
                <label>Drawer Base Type:</label>
                <select
                  value={drawerBaseA.type}
                  onChange={(e) => handleDrawerBaseAChange('type', e.target.value)}
                >
                  <option value="2drawer">2-Drawer Base</option>
                  <option value="3drawer">3-Drawer Base</option>
                </select>
              </div>

              <div className="input-group">
                <label>Position:</label>
                <select
                  value={drawerBaseA.position}
                  onChange={(e) => handleDrawerBaseAChange('position', e.target.value)}
                >
                  <option value="left">Left Side (before range)</option>
                  <option value="right">Right Side (after range)</option>
                  <option value="both">Both Sides</option>
                </select>
              </div>

              {(drawerBaseA.position === 'left' || drawerBaseA.position === 'both') && (
                <div className="input-group">
                  <label>Left Drawer Base Size:</label>
                  <select
                    value={drawerBaseA.leftSize}
                    onChange={(e) => handleDrawerBaseAChange('leftSize', parseInt(e.target.value))}
                  >
                    {getDrawerWidths(drawerBaseA.type).map(w => (
                      <option key={w} value={w}>{w}"</option>
                    ))}
                  </select>
                </div>
              )}

              {(drawerBaseA.position === 'right' || drawerBaseA.position === 'both') && (
                <div className="input-group">
                  <label>Right Drawer Base Size:</label>
                  <select
                    value={drawerBaseA.rightSize}
                    onChange={(e) => handleDrawerBaseAChange('rightSize', parseInt(e.target.value))}
                  >
                    {getDrawerWidths(drawerBaseA.type).map(w => (
                      <option key={w} value={w}>{w}"</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Wall A - Wall Cabinets */}
        <div className="config-section wall-section">
          <h2>Wall A: Wall Cabinets</h2>
          
          <div className="input-group">
            <label>Wall Cabinet Height:</label>
            <select
              name="wallAHeight"
              value={config.wallAHeight}
              onChange={handleInputChange}
            >
              <option value={30}>30" Standard</option>
              <option value={36}>36" Standard</option>
              <option value={42}>42" Standard</option>
            </select>
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="hasMicrowaveA"
                checked={config.hasMicrowaveA}
                onChange={handleInputChange}
              />
              Include Microwave Wall Cabinet
            </label>
          </div>

          {config.hasMicrowaveA && (
            <div className="input-group indent">
              <label>Microwave Center Position (inches from left):</label>
              <input
                type="number"
                name="microwaveCenterA"
                value={config.microwaveCenterA}
                onChange={handleInputChange}
                min="20"
                max="250"
              />
            </div>
          )}
        </div>

        {/* Wall B Configuration */}
        <div className="config-section">
          <h2>Wall B: Sink + Dishwasher</h2>
          
          <div className="input-group">
            <label>Wall Length (inches):</label>
            <input
              type="number"
              name="wallBLength"
              value={config.wallBLength}
              onChange={handleInputChange}
              min="60"
              max="300"
            />
          </div>

          <div className="input-group">
            <label>Sink Center Position (inches from left):</label>
            <input
              type="number"
              name="sinkCenter"
              value={config.sinkCenter}
              onChange={handleInputChange}
              min="30"
              max="250"
            />
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="hasValance"
                checked={config.hasValance}
                onChange={handleInputChange}
              />
              Include Valance Over Sink
            </label>
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="hasDishwasher"
                checked={config.hasDishwasher}
                onChange={handleInputChange}
              />
              Include Dishwasher
            </label>
          </div>

          {config.hasDishwasher && (
            <div className="input-group indent">
              <label>Dishwasher Position:</label>
              <select
                name="dishwasherPosition"
                value={config.dishwasherPosition}
                onChange={handleInputChange}
              >
                <option value="right">Right of Sink</option>
                <option value="left">Left of Sink</option>
              </select>
            </div>
          )}

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={drawerBaseB.enabled}
                onChange={(e) => handleDrawerBaseBChange('enabled', e.target.checked)}
              />
              Include Drawer Base
            </label>
          </div>

          {drawerBaseB.enabled && (
            <div className="indent">
              <div className="input-group">
                <label>Drawer Base Type:</label>
                <select
                  value={drawerBaseB.type}
                  onChange={(e) => handleDrawerBaseBChange('type', e.target.value)}
                >
                  <option value="2drawer">2-Drawer Base</option>
                  <option value="3drawer">3-Drawer Base</option>
                </select>
              </div>

              <div className="input-group">
                <label>Position:</label>
                <select
                  value={drawerBaseB.position}
                  onChange={(e) => handleDrawerBaseBChange('position', e.target.value)}
                >
                  <option value="left">Left of Sink</option>
                  <option value="right">Right of Sink</option>
                  <option value="both">Both Sides</option>
                </select>
              </div>

              {(drawerBaseB.position === 'left' || drawerBaseB.position === 'both') && (
                <div className="input-group">
                  <label>Left Drawer Base Size:</label>
                  <select
                    value={drawerBaseB.leftSize}
                    onChange={(e) => handleDrawerBaseBChange('leftSize', parseInt(e.target.value))}
                  >
                    {getDrawerWidths(drawerBaseB.type).map(w => (
                      <option key={w} value={w}>{w}"</option>
                    ))}
                  </select>
                </div>
              )}

              {(drawerBaseB.position === 'right' || drawerBaseB.position === 'both') && (
                <div className="input-group">
                  <label>Right Drawer Base Size:</label>
                  <select
                    value={drawerBaseB.rightSize}
                    onChange={(e) => handleDrawerBaseBChange('rightSize', parseInt(e.target.value))}
                  >
                    {getDrawerWidths(drawerBaseB.type).map(w => (
                      <option key={w} value={w}>{w}"</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="hasTrayBase"
                checked={config.hasTrayBase}
                onChange={handleInputChange}
              />
              Include Tray Base (9" wide)
            </label>
          </div>

          {config.hasTrayBase && config.hasDishwasher && (
            <div className="input-group indent">
              <label>Tray Base Position:</label>
              <select
                name="trayBasePosition"
                value={config.trayBasePosition}
                onChange={handleInputChange}
              >
                <option value="opposite">Opposite Side of Dishwasher</option>
              </select>
            </div>
          )}

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="hasTrashCan"
                checked={config.hasTrashCan}
                onChange={handleInputChange}
              />
              Include Trash Can Cabinet (18" wide)
            </label>
          </div>
        </div>

        {/* Wall B - Wall Cabinets */}
        <div className="config-section wall-section">
          <h2>Wall B: Wall Cabinets</h2>
          
          <div className="input-group">
            <label>Wall Cabinet Height:</label>
            <select
              name="wallBHeight"
              value={config.wallBHeight}
              onChange={handleInputChange}
            >
              <option value={30}>30" Standard</option>
              <option value={36}>36" Standard</option>
              <option value={42}>42" Standard</option>
            </select>
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="hasMicrowaveB"
                checked={config.hasMicrowaveB}
                onChange={handleInputChange}
              />
              Include Microwave Wall Cabinet
            </label>
          </div>

          {config.hasMicrowaveB && (
            <div className="input-group indent">
              <label>Microwave Center Position (inches from left):</label>
              <input
                type="number"
                name="microwaveCenterB"
                value={config.microwaveCenterB}
                onChange={handleInputChange}
                min="20"
                max="250"
              />
            </div>
          )}

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="hasWineRackB"
                checked={config.hasWineRackB}
                onChange={handleInputChange}
              />
              Include Wine Rack
            </label>
          </div>

          {config.hasWineRackB && (
            <div className="indent">
              <div className="input-group">
                <label>Wine Rack Width:</label>
                <select
                  name="wineRackWidth"
                  value={config.wineRackWidth}
                  onChange={handleInputChange}
                >
                  <option value={30}>30"</option>
                  <option value={36}>36"</option>
                </select>
              </div>

              <div className="input-group">
                <label>Wine Rack Center Position (inches from left):</label>
                <input
                  type="number"
                  name="wineRackCenterB"
                  value={config.wineRackCenterB}
                  onChange={handleInputChange}
                  min="20"
                  max="250"
                />
              </div>
            </div>
          )}
        </div>

        <div className="button-group">
          <button 
            className="calculate-btn"
            onClick={handleCalculate}
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Calculate Layout'}
          </button>

          <button 
            className="calculate-btn svg-btn"
            onClick={handleGenerateFloorPlan}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Floor Plan'}
          </button>

          <button 
            className="calculate-btn profile-btn"
            onClick={handleGenerateProfile}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Profile View'}
          </button>

          <button 
            className="calculate-btn ai-btn"
            onClick={handleGenerateAIRender}
            disabled={loading}
          >
            {loading ? 'Generating AI Image...' : '✨ Generate AI Render'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {results && (
          <div className="results">
            <h2>{results.layoutMode === 'lshape' ? 'L-Shape Kitchen Layout' : 'Independent Walls Layout'}</h2>
            
            <div className="wall-results">
              <h3>Wall A ({results.layout.wallA.length}")</h3>
              
              <h4>Base Cabinets</h4>
              <div className="cabinet-list">
                {results.layout.wallA.base.map((item, index) => (
                  <div key={index} className="cabinet-item">
                    <span className="item-number">{index + 1}.</span>
                    <span className="item-position">[{item.position.toFixed(2)}"]</span>
                    <span className="item-sku">{item.sku}</span>
                    <span className="item-description">- {item.description}</span>
                  </div>
                ))}
              </div>

              <h4>Wall Cabinets</h4>
              <div className="cabinet-list">
                {results.layout.wallA.wall.map((item, index) => (
                  <div key={index} className="cabinet-item wall-item">
                    <span className="item-number">{index + 1}.</span>
                    <span className="item-position">[{item.position.toFixed(2)}"]</span>
                    <span className="item-height">[{item.bottomHeight}"]</span>
                    <span className="item-sku">{item.sku}</span>
                    <span className="item-description">- {item.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {results.layoutMode === 'lshape' && results.layout.corner && (
              <div className="corner-results">
                <h3>Corner Cabinets</h3>
                <div className="cabinet-list">
                  {results.layout.corner.base.map((item, index) => (
                    <div key={index} className="corner-item">
                      <span className="item-number">C{index + 1}.</span>
                      <span className="item-position">[{item.position.toFixed(2)}"]</span>
                      <span className="item-sku">{item.sku}</span>
                      <span className="item-description">- {item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="wall-results">
              <h3>Wall B ({results.layout.wallB.length}")</h3>
              
              <h4>Base Cabinets</h4>
              <div className="cabinet-list">
                {results.layout.wallB.base.map((item, index) => (
                  <div key={index} className="cabinet-item">
                    <span className="item-number">{index + 1}.</span>
                    <span className="item-position">[{item.position.toFixed(2)}"]</span>
                    <span className="item-sku">{item.sku}</span>
                    <span className="item-description">- {item.description}</span>
                  </div>
                ))}
              </div>

              <h4>Wall Cabinets</h4>
              <div className="cabinet-list">
                {results.layout.wallB.wall.map((item, index) => (
                  <div key={index} className="cabinet-item wall-item">
                    <span className="item-number">{index + 1}.</span>
                    <span className="item-position">[{item.position.toFixed(2)}"]</span>
                    <span className="item-height">[{item.bottomHeight}"]</span>
                    <span className="item-sku">{item.sku}</span>
                    <span className="item-description">- {item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {svgData && (
          <div className="svg-results">
            <h2>Floor Plan (Overhead View)</h2>
            <div className="svg-container" dangerouslySetInnerHTML={{ __html: svgData }} />
            <button 
              className="download-btn"
              onClick={() => {
                const blob = new Blob([svgData], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'kitchen-floor-plan.svg';
                a.click();
              }}
            >
              Download Floor Plan SVG
            </button>
          </div>
        )}

        {profileSvgData && (
          <div className="svg-results">
            <h2>Profile View (Front Elevation)</h2>
            <div className="svg-container" dangerouslySetInnerHTML={{ __html: profileSvgData }} />
            <button 
              className="download-btn"
              onClick={() => {
                const blob = new Blob([profileSvgData], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'kitchen-profile-view.svg';
                a.click();
              }}
            >
              Download Profile View SVG
            </button>
          </div>
        )}

        {aiRenderData && (
          <div className="ai-results">
            <h2>✨ AI Generated Render</h2>
            <div className="ai-image-container">
              <img src={aiRenderData.image_url} alt="AI Generated Kitchen Render" />
            </div>
            <div className="ai-prompt-info">
              <p><strong>Prompt Used:</strong> {aiRenderData.prompt}</p>
              {aiRenderData.revised_prompt && aiRenderData.revised_prompt !== aiRenderData.prompt && (
                <p><strong>DALL-E Revised:</strong> {aiRenderData.revised_prompt}</p>
              )}
            </div>
            <button 
              className="download-btn"
              onClick={() => {
                const a = document.createElement('a');
                a.href = aiRenderData.image_url;
                a.download = 'kitchen-ai-render.png';
                a.target = '_blank';
                a.click();
              }}
            >
              Download AI Render
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
