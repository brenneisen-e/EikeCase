import React, { useState, useEffect, useRef } from 'react';
import { Database, X, FileSpreadsheet, FileText, AlertCircle, Upload, Trash2, Plus } from 'lucide-react';
import { CompanyLogo } from '@/api/entities';
import { SystemConnection } from '@/api/entities';
import { UploadFile } from '@/api/integrations';

const DataChallengeAnimation = () => {
  const [animate, setAnimate] = useState(false);
  const [showProblems, setShowProblems] = useState(false);
  const [logos, setLogos] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingFor, setUploadingFor] = useState(null);
  const [connections, setConnections] = useState([]);
  const [systemPositions, setSystemPositions] = useState({});
  const [hoveredConnection, setHoveredConnection] = useState(null);
  const [hoveredAnchor, setHoveredAnchor] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [draftConnection, setDraftConnection] = useState(null);
  const [showConnectionConfig, setShowConnectionConfig] = useState(false);
  const containerRef = useRef(null);
  const systemRefs = useRef({});

  const systems = [
    { name: 'SAP', key: 'sap', text: 'SAP', bg: '#0FAAFF', textColor: 'white' },
    { name: 'Salesforce', key: 'salesforce', text: 'SF', bg: '#00A1E0', textColor: 'white' },
    { name: 'M365', key: 'm365', text: 'M365', bg: '#D83B01', textColor: 'white' },
    { name: 'Cloud', key: 'cloud', text: '☁', bg: '#4285F4', textColor: 'white' },
    { name: 'Jira', key: 'jira', text: 'JIRA', bg: '#0052CC', textColor: 'white' },
    { name: 'Other', key: 'other', text: '📁', bg: '#6B7280', textColor: 'white' }
  ];

  const integrationSystems = [
    { id: 'DB1', key: 'db1', active: true, blocked: false, text: 'DB', bg: '#5b9bd5' },
    { id: 'DB2', key: 'db2', active: true, blocked: false, text: 'DB', bg: '#5b9bd5' },
    { id: 'DWH', key: 'dwh', active: true, blocked: false, label: '(Light)', text: 'DB', bg: '#5b9bd5' },
    { id: 'DB4', key: 'db4', active: false, blocked: true, text: 'DB', bg: '#9ca3af' },
    { id: 'DB5', key: 'db5', active: false, blocked: true, text: 'DB', bg: '#9ca3af' }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimate(true), 500);
    const timer2 = setTimeout(() => setShowProblems(true), 2000);
    loadLogos();
    loadConnections();
    
    // Alle existierenden Connections löschen
    deleteAllConnections();
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        updateAllSystemPositions();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  const deleteAllConnections = async () => {
    try {
      const allConnections = await SystemConnection.list();
      for (const conn of allConnections) {
        await SystemConnection.delete(conn.id);
      }
      console.log('All connections deleted');
      setConnections([]);
    } catch (error) {
      console.error('Error deleting connections:', error);
    }
  };

  const updateAllSystemPositions = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions = {};
    
    Object.keys(systemRefs.current).forEach(systemKey => {
      const element = systemRefs.current[systemKey];
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const relX = elementRect.left - containerRect.left;
        const relY = elementRect.top - containerRect.top;
        
        newPositions[systemKey] = {
          x: relX + elementRect.width / 2,
          y: relY + elementRect.height / 2,
          width: elementRect.width,
          height: elementRect.height,
          anchors: {
            top: { x: relX + elementRect.width / 2, y: relY },
            right: { x: relX + elementRect.width, y: relY + elementRect.height / 2 },
            bottom: { x: relX + elementRect.width / 2, y: relY + elementRect.height },
            left: { x: relX, y: relY + elementRect.height / 2 }
          }
        };
      }
    });
    
    setSystemPositions(newPositions);
  };

  const loadLogos = async () => {
    try {
      const allLogos = await CompanyLogo.list();
      const logoMap = {};
      allLogos.forEach(logo => {
        logoMap[logo.company_key] = logo.logo_url;
      });
      setLogos(logoMap);
    } catch (error) {
      console.error('Error loading logos:', error);
    }
  };

  const loadConnections = async () => {
    try {
      const allConnections = await SystemConnection.list();
      setConnections(allConnections);
    } catch (error) {
      console.error('Error loading connections:', error);
    }
  };

  const handleLogoUpload = async (companyKey, file) => {
    try {
      const { file_url } = await UploadFile({ file });
      
      const existing = await CompanyLogo.filter({ company_key: companyKey });
      if (existing.length > 0) {
        await CompanyLogo.update(existing[0].id, { logo_url: file_url });
      } else {
        await CompanyLogo.create({
          company_key: companyKey,
          company_name: companyKey,
          logo_url: file_url,
          category: 'source_system'
        });
      }
      
      await loadLogos();
      setShowUploadModal(false);
      setUploadingFor(null);
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Fehler beim Hochladen des Logos');
    }
  };

  const handleCreateNewConnection = () => {
    const centerX = containerRef.current.offsetWidth / 2;
    const centerY = containerRef.current.offsetHeight / 2;
    
    setDraftConnection({
      id: 'draft',
      from: null,
      to: null,
      fromAnchor: null,
      toAnchor: null,
      x1: centerX - 100,
      y1: centerY,
      x2: centerX + 100,
      y2: centerY,
      color: '#86BC25',
      lineStyle: 'solid',
      showArrow: false,
      connectionType: 'direct'
    });
    setSelectedConnection('draft');
  };

  const handleAnchorClick = (systemKey, anchorPosition) => {
    if (!draftConnection) return;
    
    const pos = systemPositions[systemKey];
    if (!pos) return;
    
    const anchorPoint = pos.anchors[anchorPosition];
    
    if (!draftConnection.from) {
      // Erster Ankerpunkt
      setDraftConnection({
        ...draftConnection,
        from: systemKey,
        fromAnchor: anchorPosition,
        x1: anchorPoint.x,
        y1: anchorPoint.y
      });
    } else if (!draftConnection.to) {
      // Zweiter Ankerpunkt
      setDraftConnection({
        ...draftConnection,
        to: systemKey,
        toAnchor: anchorPosition,
        x2: anchorPoint.x,
        y2: anchorPoint.y
      });
      setShowConnectionConfig(true);
    }
  };

  const handleSaveConnection = async (config) => {
    if (!draftConnection || !draftConnection.from || !draftConnection.to) return;
    
    try {
      await SystemConnection.create({
        from_system: draftConnection.from,
        to_system: draftConnection.to,
        from_anchor: draftConnection.fromAnchor,
        to_anchor: draftConnection.toAnchor,
        connection_type: config.connectionType,
        color: config.color,
        line_style: config.lineStyle,
        show_arrow: config.showArrow
      });
      
      setDraftConnection(null);
      setSelectedConnection(null);
      setShowConnectionConfig(false);
      await loadConnections();
      updateAllSystemPositions();
      
    } catch (error) {
      console.error('Error creating connection:', error);
      alert('Fehler beim Erstellen der Verbindung: ' + error.message);
    }
  };

  const handleDeleteConnection = async (connectionId) => {
    try {
      await SystemConnection.delete(connectionId);
      setConnections(prev => prev.filter(c => c.id !== connectionId));
      setHoveredConnection(null);
      await loadConnections();
    } catch (error) {
      console.error('Error deleting connection:', error);
      if (error.message && error.message.includes('404')) {
        setConnections(prev => prev.filter(c => c.id !== connectionId));
        setHoveredConnection(null);
      }
    }
  };

  const renderConnection = (conn) => {
    const isDraft = conn.id === 'draft';
    const isHovered = hoveredConnection === conn.id;
    const isSelected = selectedConnection === conn.id;
    
    let x1, y1, x2, y2;
    
    if (isDraft) {
      x1 = conn.x1;
      y1 = conn.y1;
      x2 = conn.x2;
      y2 = conn.y2;
    } else {
      const fromPos = systemPositions[conn.from_system];
      const toPos = systemPositions[conn.to_system];
      
      if (!fromPos || !toPos) return null;
      
      const fromAnchor = fromPos.anchors[conn.from_anchor || 'right'];
      const toAnchor = toPos.anchors[conn.to_anchor || 'left'];
      
      x1 = fromAnchor.x;
      y1 = fromAnchor.y;
      x2 = toAnchor.x;
      y2 = toAnchor.y;
    }

    if (conn.connection_type === 'corner') {
      const midY = (y1 + y2) / 2;
      const pathD = `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
      
      return (
        <g key={conn.id}>
          <path
            d={pathD}
            stroke="transparent"
            strokeWidth="20"
            fill="none"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => !isDraft && setHoveredConnection(conn.id)}
            onMouseLeave={() => !isDraft && setHoveredConnection(null)}
            onClick={() => !isDraft && setSelectedConnection(conn.id)}
          />
          
          <path
            d={pathD}
            stroke={conn.color || '#86BC25'}
            strokeWidth={isSelected || isDraft ? "4" : isHovered ? "3" : "2"}
            strokeDasharray={conn.line_style === 'dashed' ? '5,5' : '0'}
            fill="none"
            opacity={isDraft ? "0.6" : isHovered || isSelected ? "1" : "0.9"}
            markerEnd={conn.show_arrow ? `url(#arrowhead-${conn.id})` : 'none'}
            style={{ 
              pointerEvents: 'none',
              transition: 'all 0.2s ease'
            }}
          />
          
          {(isHovered || isSelected) && !isDraft && (
            <g 
              style={{ cursor: 'pointer' }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDeleteConnection(conn.id);
              }}
            >
              <circle
                cx={x2}
                cy={midY}
                r="12"
                fill="white"
                stroke="#ef4444"
                strokeWidth="2"
              />
              <text
                x={x2}
                y={midY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#ef4444"
                style={{ pointerEvents: 'none' }}
              >
                ×
              </text>
            </g>
          )}
        </g>
      );
    } else {
      return (
        <g key={conn.id}>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="transparent"
            strokeWidth="20"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => !isDraft && setHoveredConnection(conn.id)}
            onMouseLeave={() => !isDraft && setHoveredConnection(null)}
            onClick={() => !isDraft && setSelectedConnection(conn.id)}
          />
          
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={conn.color || '#86BC25'}
            strokeWidth={isSelected || isDraft ? "4" : isHovered ? "3" : "2"}
            strokeDasharray={conn.line_style === 'dashed' ? '5,5' : '0'}
            markerEnd={conn.show_arrow ? `url(#arrowhead-${conn.id})` : 'none'}
            opacity={isDraft ? "0.6" : isHovered || isSelected ? "1" : "0.9"}
            style={{ 
              pointerEvents: 'none',
              transition: 'all 0.2s ease'
            }}
          />
          
          {(isHovered || isSelected) && !isDraft && (
            <g 
              style={{ cursor: 'pointer' }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDeleteConnection(conn.id);
              }}
            >
              <circle
                cx={(x1 + x2) / 2}
                cy={(y1 + y2) / 2}
                r="12"
                fill="white"
                stroke="#ef4444"
                strokeWidth="2"
              />
              <text
                x={(x1 + x2) / 2}
                y={(y1 + y2) / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#ef4444"
                style={{ pointerEvents: 'none' }}
              >
                ×
              </text>
            </g>
          )}
        </g>
      );
    }
  };

  const renderAnchors = (systemKey) => {
    if (!draftConnection) return null;
    
    const pos = systemPositions[systemKey];
    if (!pos) return null;
    
    const anchors = pos.anchors;
    const anchorKeys = ['top', 'right', 'bottom', 'left'];
    
    return anchorKeys.map(anchor => {
      const point = anchors[anchor];
      const isActive = hoveredAnchor === `${systemKey}-${anchor}`;
      const isConnected = 
        (draftConnection.from === systemKey && draftConnection.fromAnchor === anchor) ||
        (draftConnection.to === systemKey && draftConnection.toAnchor === anchor);
      
      return (
        <circle
          key={`${systemKey}-${anchor}`}
          cx={point.x}
          cy={point.y}
          r={isActive || isConnected ? "8" : "6"}
          fill={isConnected ? "#86BC25" : isActive ? "#86BC25" : "white"}
          stroke="#86BC25"
          strokeWidth="2"
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setHoveredAnchor(`${systemKey}-${anchor}`)}
          onMouseLeave={() => setHoveredAnchor(null)}
          onClick={() => handleAnchorClick(systemKey, anchor)}
        />
      );
    });
  };

  return (
    <div className="w-full h-full bg-white flex items-center justify-center p-8 relative">
      <div ref={containerRef} className="relative w-full max-w-5xl bg-gray-50 rounded-xl border-2 border-gray-200 p-8">
        
        {/* Plus Button zum Erstellen neuer Verbindungen */}
        <button
          onClick={handleCreateNewConnection}
          className="absolute top-4 right-4 z-[100] bg-[#86BC25] hover:bg-[#7AA422] text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
          title="Neue Verbindung erstellen"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* SVG Layer for Connections */}
        <svg 
          className="absolute top-0 left-0" 
          style={{ 
            width: '100%', 
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          <defs>
            {[...connections, draftConnection].filter(Boolean).map(conn => (
              <marker
                key={`arrow-${conn.id}`}
                id={`arrowhead-${conn.id}`}
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill={conn.color || '#86BC25'} />
              </marker>
            ))}
          </defs>
          
          <g style={{ pointerEvents: 'auto' }}>
            {connections.map(conn => renderConnection(conn))}
            {draftConnection && renderConnection(draftConnection)}
            
            {/* Ankerpunkte */}
            {draftConnection && Object.keys(systemPositions).map(systemKey => renderAnchors(systemKey))}
          </g>
        </svg>

        {/* Main Container */}
        <div className="relative flex flex-col gap-16" style={{ zIndex: 1 }}>
          
          {/* Title */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Heute: Fragmentiert, Isoliert, Intransparent
            </h2>
          </div>
          
          {/* OUTPUT */}
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-20 bg-gray-400"></div>
              <div className="text-sm font-bold text-gray-700 tracking-wider">OUTPUT</div>
              <div className="h-px flex-1 bg-gray-400"></div>
            </div>
            
            <div className="flex justify-center gap-16">
              <div 
                className={`flex flex-col items-center p-6 bg-gray-300 rounded-lg border-2 border-gray-500 transition-all duration-1000 ${
                  animate ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{ transitionDelay: '1500ms' }}
              >
                <FileSpreadsheet className="w-14 h-14 text-gray-700 mb-3" />
                <span className="text-base font-bold text-gray-800">Excel</span>
                {showProblems && (
                  <div className="mt-2 text-sm text-red-600 font-semibold">Manual Export</div>
                )}
              </div>

              <div 
                className={`flex flex-col items-center p-6 bg-gray-300 rounded-lg border-2 border-gray-500 transition-all duration-1000 ${
                  animate ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{ transitionDelay: '1700ms' }}
              >
                <FileText className="w-14 h-14 text-gray-700 mb-3" />
                <span className="text-base font-bold text-gray-800">PDF</span>
                {showProblems && (
                  <div className="mt-2 text-sm text-red-600 font-semibold">Manual Export</div>
                )}
              </div>
            </div>

            {showProblems && (
              <div className="text-center mt-4 text-base text-red-600 font-bold">
                ⚠️ Reactive, Cut-Off Based, No Steering Power
              </div>
            )}
          </div>

          {/* INTEGRATION LAYER */}
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-20 bg-gray-400"></div>
              <div className="text-sm font-bold text-gray-700 tracking-wider">INTEGRATION LAYER</div>
              <div className="h-px flex-1 bg-gray-400"></div>
            </div>
            
            <div className="flex justify-center gap-8">
              {integrationSystems.map((db, idx) => {
                const logo = logos[db.key];
                
                return (
                  <div 
                    key={db.id}
                    ref={el => systemRefs.current[db.key] = el}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-700 ${
                      db.active ? 'border-blue-500 hover:border-blue-600' : 'border-gray-400'
                    } ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                    style={{ 
                      transitionDelay: `${800 + idx * 150}ms`,
                      backgroundColor: logo ? 'white' : (db.active ? '#dbeafe' : '#e5e7eb'),
                      minWidth: '90px',
                      minHeight: '90px',
                      zIndex: 10
                    }}
                  >
                    {logo ? (
                      <img 
                        src={logo} 
                        alt={db.id} 
                        className="w-12 h-12 object-contain" 
                      />
                    ) : (
                      <Database className={`w-12 h-12 ${db.active ? 'text-blue-600' : 'text-gray-500'}`} />
                    )}
                    
                    {db.blocked && showProblems && (
                      <div className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1.5 animate-bounce z-20">
                        <X className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    {!logo && db.active && (
                      <button
                        className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors z-20"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadingFor(db.key);
                          setShowUploadModal(true);
                        }}
                      >
                        <Upload className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                    
                    {!logo && (
                      <>
                        <span className="text-sm font-bold text-gray-800 mt-2">{db.id}</span>
                        {db.label && <span className="text-xs text-gray-600">{db.label}</span>}
                      </>
                    )}
                    
                    {db.blocked && showProblems && (
                      <span className="text-xs text-red-600 mt-1 font-bold">✖ Blocked</span>
                    )}
                  </div>
                );
              })}
            </div>

            {showProblems && (
              <div className="text-center mt-4 text-sm italic text-gray-600">
                Strukturierte Daten nur teilweise verfügbar • Silos nicht verbunden
              </div>
            )}
          </div>

          {/* QUELLSYSTEME */}
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-20 bg-gray-400"></div>
              <div className="text-sm font-bold text-gray-700 tracking-wider">QUELLSYSTEME</div>
              <div className="h-px flex-1 bg-gray-400"></div>
            </div>
            
            <div className="flex justify-center gap-6">
              {systems.map((system, idx) => {
                const logo = logos[system.key];
                
                return (
                  <div
                    key={system.key}
                    ref={el => systemRefs.current[system.key] = el}
                    className={`relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 border-gray-300 hover:border-gray-400 ${
                      animate ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                      transitionDelay: `${1200 + idx * 100}ms`,
                      backgroundColor: 'white',
                      minWidth: '100px',
                      minHeight: '100px',
                      zIndex: 10
                    }}
                  >
                    {logo ? (
                      <img 
                        src={logo} 
                        alt={system.name} 
                        className="w-16 h-16 object-contain" 
                      />
                    ) : (
                      <div 
                        className="text-4xl" 
                        style={{ color: system.bg }}
                      >
                        {system.text}
                      </div>
                    )}
                    
                    {!logo && (
                      <button
                        className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors z-20"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadingFor(system.key);
                          setShowUploadModal(true);
                        }}
                      >
                        <Upload className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Info Text */}
        {draftConnection && (
          <div className="mt-4 text-sm text-center relative z-50">
            {!draftConnection.from && (
              <div className="text-[#86BC25] font-bold">
                Schritt 1: Klicke auf einen Ankerpunkt (⚪) an einer Box
              </div>
            )}
            {draftConnection.from && !draftConnection.to && (
              <div className="text-[#86BC25] font-bold">
                Schritt 2: Klicke auf einen Ankerpunkt (⚪) an einer anderen Box
              </div>
            )}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" onClick={() => setShowUploadModal(false)}>
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Logo hochladen für {uploadingFor}</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && uploadingFor) {
                  handleLogoUpload(uploadingFor, file);
                }
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={() => setShowUploadModal(false)}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Connection Configuration Modal */}
      {showConnectionConfig && draftConnection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">
              Verbindung konfigurieren
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Verbindungstyp</label>
                <div className="flex gap-4">
                  <button
                    className={`flex-1 px-4 py-2 rounded border-2 transition-all ${
                      draftConnection.connectionType === 'direct' ? 'border-[#86BC25] bg-green-50' : 'border-gray-300'
                    }`}
                    onClick={() => setDraftConnection({ ...draftConnection, connectionType: 'direct' })}
                  >
                    Direkt
                  </button>
                  <button
                    className={`flex-1 px-4 py-2 rounded border-2 transition-all ${
                      draftConnection.connectionType === 'corner' ? 'border-[#86BC25] bg-green-50' : 'border-gray-300'
                    }`}
                    onClick={() => setDraftConnection({ ...draftConnection, connectionType: 'corner' })}
                  >
                    Ecke (90°)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Farbe</label>
                <div className="flex gap-2">
                  {['#86BC25', '#0070c0', '#DA291C', '#FFA500', '#6B7280'].map(color => (
                    <button
                      key={color}
                      className={`w-12 h-12 rounded border-2 transition-all ${
                        draftConnection.color === color ? 'border-black scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setDraftConnection({ ...draftConnection, color })}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Linienstil</label>
                <div className="flex gap-4">
                  <button
                    className={`px-4 py-2 rounded border-2 transition-all ${
                      draftConnection.lineStyle === 'solid' ? 'border-[#86BC25] bg-green-50' : 'border-gray-300'
                    }`}
                    onClick={() => setDraftConnection({ ...draftConnection, lineStyle: 'solid' })}
                  >
                    Durchgängig
                  </button>
                  <button
                    className={`px-4 py-2 rounded border-2 transition-all ${
                      draftConnection.lineStyle === 'dashed' ? 'border-[#86BC25] bg-green-50' : 'border-gray-300'
                    }`}
                    onClick={() => setDraftConnection({ ...draftConnection, lineStyle: 'dashed' })}
                  >
                    Gestrichelt
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draftConnection.showArrow}
                    onChange={(e) => setDraftConnection({ ...draftConnection, showArrow: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-semibold">Pfeil am Ende anzeigen</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setDraftConnection(null);
                  setShowConnectionConfig(false);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleSaveConnection(draftConnection)}
                className="flex-1 bg-[#86BC25] hover:bg-[#7AA422] text-white font-bold py-2 px-4 rounded"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataChallengeAnimation;