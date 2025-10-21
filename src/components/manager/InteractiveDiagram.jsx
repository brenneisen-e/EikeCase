
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Database, FileSpreadsheet, FileText, X, Server, Trash2, Check, Plus, Upload, XCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { DiagramNode } from '@/api/entities';
import { DiagramEdge } from '@/api/entities';
import { DiagramSettings } from '@/api/entities';
import { UploadFile } from '@/api/integrations';
import { motion } from 'framer-motion'; // Import framer-motion

const InteractiveDiagram = ({ readOnly = false, highlightFilter = null, compact = false }) => {
  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const [positions, setPositions] = useState({});
  const [edges, setEdges] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [lineStyle, setLineStyle] = useState('solid');
  const [lineColor, setLineColor] = useState('#046A38');
  const [lineThickness, setLineThickness] = useState(2.5);
  const [connectionStyle, setConnectionStyle] = useState('direct');
  const [connectionType, setConnectionType] = useState('line');
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [draggingPoint, setDraggingPoint] = useState(null);
  const [hoverAnchor, setHoverAnchor] = useState(null);
  const [anchorSelectionMode, setAnchorSelectionMode] = useState(null);
  const [selectedStartAnchor, setSelectedStartAnchor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [draggingNode, setDraggingNode] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingFor, setUploadingFor] = useState(null);
  const [boxWidth, setBoxWidth] = useState(130);
  const [boxHeight, setBoxHeight] = useState(100);
  const [fontSize, setFontSize] = useState(12);
  const [editingNodeLabel, setEditingNodeLabel] = useState(null);
  const [legendText, setLegendText] = useState('Legende: Hier können Sie Text einfügen');
  const [settingsId, setSettingsId] = useState(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const [hasAnimated, setHasAnimated] = useState(false);
  const [blinkNoConnection, setBlinkNoConnection] = useState(false);

  // New states for Node Creation Form
  const [showCreateNodeForm, setShowCreateNodeForm] = useState(false);
  const [newNodeData, setNewNodeData] = useState({
    label: '',
    layer: 'output',
    col: 6,
    node_type: 'app',
    status: 'active',
    icon: '', // Default empty, can be configured later
    fill_color: '#FFFFFF',
    stroke_color: '#046A38'
  });

  const layerOrder = ['output', 'integration', 'apps', 'legacy'];

  const predefinedColors = [
    { name: 'Grün', value: '#046A38' },
    { name: 'Hellgrün', value: '#86BC25' },
    { name: 'Schwarz', value: '#000000' },
    { name: 'Grau', value: '#666666' },
    { name: 'Rot', value: '#DA291C' }
  ];

  const fillColors = [
    { name: 'Weiß', value: '#FFFFFF' },
    { name: 'Hellblau', value: '#E8F6CF' },
    { name: 'Blau', value: '#0070c0' },
    { name: 'Hellgrau', value: '#F5F5F5' },
    { name: 'Gelb', value: '#FFF4E6' }
  ];

  // Calculate effective box size based on compact mode
  const effectiveBoxWidth = compact ? boxWidth * 0.5 : boxWidth;
  const effectiveBoxHeight = compact ? boxHeight * 0.5 : boxHeight;
  const effectiveFontSize = compact ? fontSize * 0.7 : fontSize;

  useLayoutEffect(() => {
    if (!containerRef.current || nodes.length === 0) return;

    const newPositions = {};
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const layerHeight = (containerHeight - 80) / layerOrder.length;
    const topPadding = 60;

    let hasChanges = false;

    nodes.forEach((node) => {
      const layerIndex = layerOrder.indexOf(node.layer);
      const y = topPadding + layerIndex * layerHeight;
      const x = (containerWidth / 12) * node.col - effectiveBoxWidth / 2;

      const newPos = { x, y, width: effectiveBoxWidth, height: effectiveBoxHeight };

      const oldPos = positions[node.id];
      if (!oldPos || oldPos.x !== newPos.x || oldPos.y !== newPos.y ||
          oldPos.width !== newPos.width || oldPos.height !== newPos.height) {
        hasChanges = true;
      }

      newPositions[node.id] = newPos;
    });

    if (hasChanges) {
      setPositions(newPositions);
    }
  }, [nodes, effectiveBoxWidth, effectiveBoxHeight, layerOrder, positions, compact]); // Added compact to dependency array

  useEffect(() => {
    loadData();
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Animation effect beim ersten Laden
  useEffect(() => {
    if (animate && !hasAnimated && edges.length > 0) {
      setHasAnimated(true);

      // Blinken der roten X für 5 Sekunden
      setBlinkNoConnection(true);
      const blinkTimer = setTimeout(() => {
        setBlinkNoConnection(false);
      }, 5000);

      return () => clearTimeout(blinkTimer);
    }
  }, [animate, hasAnimated, edges.length]);

  const loadData = async () => {
    try {
      const settings = await DiagramSettings.list();
      if (settings.length > 0) {
        const s = settings[0];
        setBoxWidth(s.box_width || 130);
        setBoxHeight(s.box_height || 100);
        setFontSize(s.font_size || 12);
        setLegendText(s.legend_text || 'Legende: Hier können Sie Text einfügen');
        setSettingsId(s.id);
      } else {
        const created = await DiagramSettings.create({
          box_width: 130,
          box_height: 100,
          font_size: 12,
          legend_text: 'Legende: Hier können Sie Text einfügen'
        });
        setSettingsId(created.id);
      }

      const loadedNodes = await DiagramNode.list();
      const loadedEdges = await DiagramEdge.list();

      if (loadedNodes.length === 0) {
        await initializeDefaultData();
      } else {
        setNodes(loadedNodes.map(n => ({
          id: n.node_id,
          label: n.label,
          layer: n.layer,
          col: n.col,
          type: n.node_type,
          status: n.status,
          icon: n.icon,
          logo: n.logo_url,
          fillColor: n.fill_color || '#FFFFFF',
          strokeColor: n.stroke_color || '#046A38',
          dbId: n.id
        })));
        setEdges(loadedEdges.map(e => ({
          from: e.from_node_id,
          to: e.to_node_id,
          connectionType: e.connection_type,
          color: e.color,
          lineStyle: e.line_style,
          thickness: e.thickness,
          isFreeLine: e.is_free_line,
          customPoints: e.custom_points,
          startSide: e.start_side,
          endSide: e.end_side,
          midOffset: e.mid_offset,
          type: e.type || 'line',
          dbId: e.id
        })));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      await initializeDefaultData();
    }
  };

  const saveSettings = async (updates) => {
    if (!settingsId) return;

    try {
      await DiagramSettings.update(settingsId, updates);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleBoxWidthChange = (value) => {
    setBoxWidth(value);
    saveSettings({ box_width: value, box_height: boxHeight, font_size: fontSize, legend_text: legendText });
  };

  const handleBoxHeightChange = (value) => {
    setBoxHeight(value);
    saveSettings({ box_width: boxWidth, box_height: value, font_size: fontSize, legend_text: legendText });
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
    saveSettings({ box_width: boxWidth, box_height: boxHeight, font_size: value, legend_text: legendText });
  };

  const handleLegendTextChange = (value) => {
    setLegendText(value);
    saveSettings({ box_width: boxWidth, box_height: boxHeight, font_size: fontSize, legend_text: value });
  };

  const initializeDefaultData = async () => {
    const defaultNodes = [
      { id: 'Excel', label: 'Excel', layer: 'output', col: 5, type: 'doc', icon: 'excel' },
      { id: 'PDF', label: 'PDF', layer: 'output', col: 8, type: 'doc', icon: 'pdf' },

      { id: 'DB1', label: 'DB1', layer: 'integration', col: 2, type: 'db', status: 'active' },
      { id: 'DB2', label: 'DB2', layer: 'integration', col: 4, type: 'db', status: 'active' },
      { id: 'DWH', label: 'DWH', layer: 'integration', col: 6, type: 'dwh', status: 'light' },
      { id: 'DB4', label: 'DB4', layer: 'integration', col: 9, type: 'db', status: 'blocked' },
      { id: 'DB5', label: 'DB5', layer: 'integration', col: 11, type: 'db', status: 'blocked' },

      { id: 'Salesforce', label: 'Salesforce', layer: 'apps', col: 3, type: 'app', icon: 'sf' },
      { id: 'M365', label: 'M365', layer: 'apps', col: 5, type: 'app', icon: 'm365' },
      { id: 'Cloud', label: 'Cloud', layer: 'apps', col: 7, type: 'app', icon: 'cloud' },
      { id: 'Jira', label: 'Jira', layer: 'apps', col: 9, type: 'app', icon: 'jira' },
      { id: 'Other', label: 'Other', layer: 'apps', col: 11, type: 'app', icon: 'folder' },

      { id: 'Legacy1', label: 'Legacy 1', layer: 'legacy', col: 4, type: 'legacy' },
      { id: 'Legacy2', label: 'Legacy 2', layer: 'legacy', col: 7, type: 'legacy' },
      { id: 'Legacy3', label: 'Legacy 3', layer: 'legacy', col: 10, type: 'legacy' }
    ];

    const defaultEdges = [
      { from: 'DB1', to: 'Excel', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'DB2', to: 'Excel', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'DWH', to: 'PDF', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'Salesforce', to: 'DB1', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'Salesforce', to: 'DB2', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'M365', to: 'DB2', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'M365', to: 'DWH', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'Cloud', to: 'DWH', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'Jira', to: 'DWH', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'Other', to: 'DWH', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'Legacy1', to: 'Salesforce', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'Legacy2', to: 'M365', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 },
      { from: 'Legacy3', to: 'Cloud', connectionType: 'direct', color: '#046A38', lineStyle: 'solid', thickness: 2.5 }
    ];

    try {
      for (const node of defaultNodes) {
        await DiagramNode.create({
          node_id: node.id,
          label: node.label,
          layer: node.layer,
          col: node.col,
          node_type: node.type,
          status: node.status || 'active',
          icon: node.icon || '',
          logo_url: node.logo || '',
          fill_color: '#FFFFFF',
          stroke_color: '#046A38'
        });
      }

      for (const edge of defaultEdges) {
        const fromNode = defaultNodes.find(n => n.id === edge.from);
        const toNode = defaultNodes.find(n => n.id === edge.to);

        let startSide = 'bottom';
        let endSide = 'top';

        if (fromNode && toNode) {
          const fromLayer = layerOrder.indexOf(fromNode.layer);
          const toLayer = layerOrder.indexOf(toNode.layer);

          if (fromLayer === toLayer) {
            startSide = fromNode.col < toNode.col ? 'right' : 'left';
            endSide = fromNode.col < toNode.col ? 'left' : 'right';
          } else if (fromLayer > toLayer) {
            startSide = 'top';
            endSide = 'bottom';
          }
        }

        await DiagramEdge.create({
          from_node_id: edge.from,
          to_node_id: edge.to,
          connection_type: edge.connectionType,
          color: edge.color,
          line_style: edge.lineStyle,
          thickness: edge.thickness,
          is_free_line: false,
          custom_points: [],
          start_side: startSide,
          end_side: endSide,
          mid_offset: 0,
          type: 'line'
        });
      }

      await loadData();
    } catch (error) {
      console.error('Error initializing default data:', error);
    }
  };

  const saveNode = async (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node && node.dbId) {
      try {
        await DiagramNode.update(node.dbId, {
          node_id: node.id,
          label: node.label,
          layer: node.layer,
          col: node.col,
          node_type: node.type,
          status: node.status,
          icon: node.icon,
          logo_url: node.logo,
          fill_color: node.fillColor || '#FFFFFF',
          stroke_color: node.strokeColor || '#046A38'
        });
      } catch (error) {
        console.error('Error saving node:', error);
      }
    }
  };

  const saveEdge = async (edgeIndex) => {
    const edge = edges[edgeIndex];
    if (edge && edge.dbId) {
      try {
        await DiagramEdge.update(edge.dbId, {
          from_node_id: edge.from || '',
          to_node_id: edge.to || '',
          connection_type: edge.connectionType || 'direct',
          color: edge.color || lineColor,
          line_style: edge.lineStyle || lineStyle,
          thickness: edge.thickness || lineThickness,
          is_free_line: edge.isFreeLine || false,
          custom_points: edge.customPoints || [],
          start_side: edge.startSide || '',
          end_side: edge.endSide || '',
          mid_offset: edge.midOffset || 0,
          type: edge.type || 'line'
        });
      } catch (error) {
        console.error('Error saving edge:', error);
      }
    }
  };

  const handleToggleNodeSelection = async (nodeId, e) => {
    if (!editMode) return; // Added check for editMode
    e.stopPropagation();
    e.preventDefault();

    const isAlreadySelected = selectedNodes.includes(nodeId);

    if (isAlreadySelected) {
      const newSelection = selectedNodes.filter(id => id !== nodeId);
      setSelectedNodes(newSelection);

      if (selectedNode === nodeId) {
        await saveNode(nodeId);
        setSelectedNode(null);
      }

      if (newSelection.length === 1) {
        setSelectedNode(newSelection[0]);
      }
    } else {
      if (selectedNodes.length >= 2) {
        const firstNode = selectedNodes[0];
        if (selectedNode === firstNode) {
          await saveNode(firstNode);
        }
        setSelectedNodes([selectedNodes[1], nodeId]);
        setSelectedNode(null);
      } else {
        const newSelection = [...selectedNodes, nodeId];
        setSelectedNodes(newSelection);

        if (newSelection.length === 1) {
          if (selectedEdge !== null) {
            await saveEdge(selectedEdge);
            setSelectedEdge(null);
          }
          setSelectedNode(nodeId);
        } else {
          setSelectedNode(null);
        }
      }
    }
  };

  const handleNodeDragStart = (nodeId, e) => {
    if (!editMode) return;
    e.stopPropagation();

    setDraggingNode({
      id: nodeId,
      startX: e.clientX,
      startY: e.clientY,
      originalCol: nodes.find(n => n.id === nodeId)?.col || 0
    });
  };

  const handleNodeDrag = (e) => {
    if (!draggingNode || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const deltaX = e.clientX - draggingNode.startX;

    const colWidth = containerWidth / 12;
    const newCol = Math.max(1, Math.min(12, Math.round(draggingNode.originalCol + deltaX / colWidth)));

    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === draggingNode.id
          ? { ...node, col: newCol }
          : node
      )
    );
  };

  const handleNodeDragEnd = async () => {
    if (!draggingNode) return;

    const node = nodes.find(n => n.id === draggingNode.id);
    if (node && node.dbId) {
      try {
        await DiagramNode.update(node.dbId, {
          node_id: node.id,
          label: node.label,
          layer: node.layer,
          col: node.col,
          node_type: node.type,
          status: node.status,
          icon: node.icon,
          logo_url: node.logo,
          fill_color: node.fillColor || '#FFFFFF',
          stroke_color: node.strokeColor || '#046A38'
        });
      } catch (error) {
        console.error('Error saving node position:', error);
      }
    }

    setDraggingNode(null);
  };

  useEffect(() => {
    if (draggingNode) {
      document.addEventListener('mousemove', handleNodeDrag);
      document.addEventListener('mouseup', handleNodeDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleNodeDrag);
        document.removeEventListener('mouseup', handleNodeDragEnd);
      };
    }
  }, [draggingNode, handleNodeDrag, handleNodeDragEnd]);

  const handleToggleNodeStatus = async () => {
    if (!selectedNode) return;

    const node = nodes.find(n => n.id === selectedNode);
    if (!node) return;

    const newStatus = node.status === 'blocked' ? 'active' : 'blocked';

    setNodes(prevNodes =>
      prevNodes.map(n =>
        n.id === selectedNode
          ? { ...n, status: newStatus }
          : n
      )
    );

    if (node.dbId) {
      try {
        await DiagramNode.update(node.dbId, {
          node_id: node.id,
          label: node.label,
          layer: node.layer,
          col: node.col,
          node_type: node.type,
          status: newStatus,
          icon: node.icon,
          logo_url: node.logo,
          fill_color: node.fillColor || '#FFFFFF',
          stroke_color: node.strokeColor || '#046A38'
        });
      } catch (error) {
        console.error('Error updating node status:', error);
      }
    }
  };

  const handleNodeColorChange = async (fillColor, strokeColor) => {
    if (!selectedNode) return;

    setNodes(prevNodes =>
      prevNodes.map(n =>
        n.id === selectedNode
          ? { ...n, fillColor, strokeColor }
          : n
      )
    );

    await saveNode(selectedNode);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !uploadingFor) return;

    try {
      const { file_url } = await UploadFile({ file });

      setNodes(prevNodes =>
        prevNodes.map(n =>
          n.id === uploadingFor ? { ...n, logo: file_url } : n
        )
      );

      await saveNode(uploadingFor);
      setShowUploadModal(false);
      setUploadingFor(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Fehler beim Hochladen des Logos');
    }
  };

  const handleBackgroundClick = (e) => {
    // Only clear selection/mode if not in readOnly mode, or if anchorSelectionMode is active (which implies editMode)
    if (!editMode) {
      setSelectedNode(null);
      setSelectedNodes([]);
      setSelectedEdge(null);
    }
    if (anchorSelectionMode) {
      setAnchorSelectionMode(null);
      setSelectedStartAnchor(null);
    }
  };

  const getIconComponent = (icon) => {
    return {
      excel: FileSpreadsheet,
      pdf: FileText,
      db: Database,
      dwh: Server,
      sf: Server,
      m365: Server,
      cloud: Server,
      jira: Server,
      folder: FileText
    }[icon];
  };

  const handleGridPositionChange = async (nodeId, newCol) => {
    const col = parseInt(newCol, 10);
    if (isNaN(col) || col < 1 || col > 12) return;

    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    setNodes(prevNodes =>
      prevNodes.map(n =>
        n.id === nodeId
          ? { ...n, col: col }
          : n
      )
    );

    if (node.dbId) {
      try {
        await DiagramNode.update(node.dbId, {
          node_id: node.id,
          label: node.label,
          layer: node.layer,
          col: col,
          node_type: node.type,
          status: node.status,
          icon: node.icon,
          logo_url: node.logo,
          fill_color: node.fillColor,
          stroke_color: node.strokeColor
        });
      } catch (error) {
        console.error('Error updating grid position:', error);
      }
    }
  };

  const handleDeleteNode = async (nodeId) => {
    const nodeToDelete = nodes.find(n => n.id === nodeId);
    if (!nodeToDelete) return;

    setNodes(prevNodes => prevNodes.filter(n => n.id !== nodeId));
    setSelectedNode(null);
    setSelectedNodes([]);

    const edgesToDelete = edges.filter(e => e.from === nodeId || e.to === nodeId);
    const updatedEdges = edges.filter(e => e.from !== nodeId && e.to !== nodeId);
    setEdges(updatedEdges);
    if (selectedEdge !== null && edgesToDelete.some(e => e.dbId === edges[selectedEdge]?.dbId)) {
      setSelectedEdge(null);
    }

    if (nodeToDelete.dbId) {
      try {
        await DiagramNode.delete(nodeToDelete.dbId);
      } catch (error) {
        console.error('Error deleting node:', error);
      }
    }

    for (const edge of edgesToDelete) {
      if (edge.dbId) {
        try {
          await DiagramEdge.delete(edge.dbId);
        } catch (error) {
          console.error('Error deleting associated edge:', error);
        }
      }
    }
  };

  const handleCreateConnection = async () => {
    if (selectedNodes.length !== 2) return;

    const fromNode = nodes.find(n => n.id === selectedNodes[0]);
    const toNode = nodes.find(n => n.id === selectedNodes[1]);

    if (!fromNode || !toNode) return;

    const fromLayer = layerOrder.indexOf(fromNode.layer);
    const toLayer = layerOrder.indexOf(toNode.layer);

    let startSide = 'bottom';
    let endSide = 'top';

    if (fromLayer === toLayer) {
      if (fromNode.col < toNode.col) {
        startSide = 'right';
        endSide = 'left';
      } else {
        startSide = 'left';
        endSide = 'right';
      }
    } else if (fromLayer > toLayer) {
      startSide = 'top';
      endSide = 'bottom';
    }

    const newEdgeLocal = {
      from: selectedNodes[0],
      to: selectedNodes[1],
      connectionType: connectionType === 'no-connection' ? 'direct' : connectionStyle, // Use direct if no-connection selected, else actual connection style
      color: connectionType === 'no-connection' ? '#DA291C' : lineColor, // Red for no-connection
      lineStyle: connectionType === 'no-connection' ? 'solid' : lineStyle,
      thickness: connectionType === 'no-connection' ? 2.5 : lineThickness,
      type: connectionType,
      isFreeLine: false,
      customPoints: [],
      startSide: startSide,
      endSide: endSide,
      midOffset: 0
    };

    try {
      const created = await DiagramEdge.create({
        from_node_id: newEdgeLocal.from,
        to_node_id: newEdgeLocal.to,
        connection_type: newEdgeLocal.connectionType,
        color: newEdgeLocal.color,
        line_style: newEdgeLocal.lineStyle,
        thickness: newEdgeLocal.thickness,
        type: newEdgeLocal.type,
        is_free_line: false,
        custom_points: [],
        start_side: startSide,
        end_side: endSide,
        mid_offset: 0
      });

      const finalNewEdge = { ...newEdgeLocal, dbId: created.id };
      setEdges(prevEdges => [...prevEdges, finalNewEdge]);
      setSelectedNodes([]);
      setSelectedNode(null);
    } catch (error) {
      console.error('Error creating edge:', error);
      alert('Fehler beim Erstellen der Verbindung');
    }
  };

  const handleCreateFreeLine = () => {
    const svg = containerRef.current?.querySelector('svg');
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newEdge = {
      from: '',
      to: '',
      connectionType: connectionStyle,
      color: lineColor,
      lineStyle: lineStyle,
      thickness: lineThickness,
      type: 'line',
      isFreeLine: true,
      customPoints: [
        { x: centerX - 50, y: centerY },
        { x: centerX + 50, y: centerY }
      ],
      startSide: '',
      endSide: '',
      midOffset: 0
    };

    DiagramEdge.create({
      from_node_id: '',
      to_node_id: '',
      connection_type: newEdge.connectionType,
      color: newEdge.color,
      line_style: newEdge.lineStyle,
      thickness: newEdge.thickness,
      type: 'line',
      is_free_line: true,
      custom_points: newEdge.customPoints,
      start_side: '',
      end_side: '',
      mid_offset: 0
    }).then(created => {
      setEdges(prev => [...prev, { ...newEdge, dbId: created.id }]);
      setSelectedEdge(edges.length);
    }).catch(error => {
      console.error('Error creating free line:', error);
      alert('Fehler beim Erstellen der freien Linie');
    });
  };

  const handleCreateNoConnection = () => {
    const svg = containerRef.current?.querySelector('svg');
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newEdge = {
      from: '',
      to: '',
      connectionType: 'direct', // Always direct for no-connection symbol
      color: '#DA291C', // Always red
      lineStyle: 'solid',
      thickness: 2.5,
      type: 'no-connection',
      isFreeLine: true,
      customPoints: [{ x: centerX, y: centerY }],
      startSide: '',
      endSide: '',
      midOffset: 0
    };

    DiagramEdge.create({
      from_node_id: '',
      to_node_id: '',
      connection_type: 'direct',
      color: '#DA291C',
      line_style: 'solid',
      thickness: 2.5,
      type: 'no-connection',
      is_free_line: true,
      custom_points: newEdge.customPoints,
      start_side: '',
      end_side: '',
      mid_offset: 0
    }).then(created => {
      setEdges(prev => [...prev, { ...newEdge, dbId: created.id }]);
      setSelectedEdge(edges.length);
    }).catch(error => {
      console.error('Error creating no-connection symbol:', error);
      alert('Fehler beim Erstellen des Symbols');
    });
  };

  // Function for creating nodes
  const handleCreateNode = async () => {
    try {
      const newNodeId = `node_${Date.now()}`;
      const newNodeToSave = {
        node_id: newNodeId,
        label: newNodeData.label || 'New Node',
        layer: newNodeData.layer,
        col: newNodeData.col,
        node_type: newNodeData.node_type,
        status: newNodeData.status,
        icon: newNodeData.icon,
        logo_url: '', // New nodes start without a logo
        fill_color: newNodeData.fill_color,
        stroke_color: newNodeData.stroke_color
      };

      const created = await DiagramNode.create(newNodeToSave);
      setNodes(prev => [...prev, {
        ...newNodeToSave,
        id: newNodeId,
        dbId: created.id,
        logo: newNodeToSave.logo_url, // map logo_url to logo for component state
        fillColor: newNodeToSave.fill_color, // map fill_color to fillColor for component state
        strokeColor: newNodeToSave.stroke_color // map stroke_color to strokeColor for component state
      }]);
      setShowCreateNodeForm(false);
      setNewNodeData({
        label: '',
        layer: 'output',
        col: 6,
        node_type: 'app',
        status: 'active',
        icon: '',
        fill_color: '#FFFFFF',
        stroke_color: '#046A38'
      });
    } catch (error) {
      console.error('Error creating node:', error);
      alert('Fehler beim Erstellen der Box');
    }
  };

  const handleToggleEdgeSelection = async (edgeIndex, e) => {
    if (!editMode) return; // Added check for editMode
    e.stopPropagation();
    e.preventDefault();

    if (selectedEdge === edgeIndex) {
      await saveEdge(edgeIndex);
      setSelectedEdge(null);
    } else {
      if (selectedEdge !== null) {
        await saveEdge(selectedEdge);
      }

      if (selectedNode) {
        await saveNode(selectedNode);
        setSelectedNode(null);
      }
      setSelectedNodes([]);

      setSelectedEdge(edgeIndex);
    }
  };

  const handleDeleteEdge = async (index) => {
    const edge = edges[index];

    const updatedEdges = edges.filter((_, i) => i !== index);
    setEdges(updatedEdges);
    setSelectedEdge(null);

    if (edge.dbId) {
      try {
        await DiagramEdge.delete(edge.dbId);
      } catch (error) {
        console.warn('Could not delete edge from database:', error);
      }
    }
  };

  const handlePointDragStart = (edgeIndex, pointIndex) => {
    if (!editMode) return; // Added check for editMode
    setDraggingPoint({ edgeIndex, pointIndex });
  };

  const handlePointDrag = (e) => {
    if (!draggingPoint) return;

    const svg = containerRef.current?.querySelector('svg');
    if (!svg) return;

    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    const { edgeIndex, pointIndex } = draggingPoint;
    const updatedEdges = [...edges];
    const edge = updatedEdges[edgeIndex];

    if (edge.customPoints) {
      const newPoints = [...edge.customPoints];
      newPoints[pointIndex] = { x: svgP.x, y: svgP.y };
      updatedEdges[edgeIndex] = { ...edge, customPoints: newPoints };
      setEdges(updatedEdges);
    }
  };

  const handlePointDragEnd = () => {
    if (draggingPoint) {
      saveEdge(draggingPoint.edgeIndex);
    }
    setDraggingPoint(null);
  };

  useEffect(() => {
    if (draggingPoint) {
      document.addEventListener('mousemove', handlePointDrag);
      document.addEventListener('mouseup', handlePointDragEnd);
      return () => {
        document.removeEventListener('mousemove', handlePointDrag);
        document.removeEventListener('mouseup', handlePointDragEnd);
      };
    }
  }, [draggingPoint, handlePointDrag, handlePointDragEnd]);

  const getAnchorPosition = (input, side) => { // input can be nodeId or {x,y,width,height}
    let pos;
    if (typeof input === 'string') { // If it's a nodeId
      pos = positions[input];
    } else if (input && typeof input === 'object') { // If it's a position object
      pos = input;
    }
    if (!pos) return null;

    switch (side) {
      case 'top': return { x: pos.x + pos.width / 2, y: pos.y };
      case 'right': return { x: pos.x + pos.width, y: pos.y + pos.height / 2 };
      case 'bottom': return { x: pos.x + pos.width / 2, y: pos.y + pos.height };
      case 'left': return { x: pos.x, y: pos.y + pos.height / 2 };
      default: return null;
    }
  };

  const calculatePathLength = (pathD) => {
    let totalLength = 0;
    const pathSegments = Array.from(pathD.matchAll(/([ML])\s*([\d.]+)\s*([\d.]+)/g));
    let prevX, prevY;

    for (const match of pathSegments) {
      const command = match[1];
      const x = parseFloat(match[2]);
      const y = parseFloat(match[3]);

      if (command === 'M') {
        prevX = x;
        prevY = y;
      } else if (command === 'L') {
        const dx = x - prevX;
        const dy = y - prevY;
        totalLength += Math.sqrt(dx * dx + dy * dy);
        prevX = x;
        prevY = y;
      }
    }
    return totalLength;
  };

  const renderEdge = (edge, index) => {
    const isSelected = selectedEdge === index;
    const isHovered = hoveredEdge === index;

    // Animation: Linien von unten nach oben zeichnen
    // lineProgress ensures lines animate one after another
    const lineProgress = hasAnimated ? 1 : (animate ? Math.min(1, (index + 1) * 0.3) : 0);

    if (edge.type === 'no-connection') {
      if (!edge.customPoints || edge.customPoints.length === 0) return null;

      const point = edge.customPoints[0];
      const opacity = blinkNoConnection ? (Math.sin(Date.now() / 200) > 0 ? 1 : 0.3) : 1;

      // Adjust symbol size based on compact mode
      const symbolRadius = compact ? 10 : 15;
      const crossSize = compact ? 6 : 10;
      const deleteBoxOffset = compact ? 12 : 20;
      const deleteBoxWidth = compact ? 16 : 24;
      const deleteBoxHeight = compact ? 16 : 24;
      const deleteBoxPadding = compact ? 8 : 12;

      return (
        <g
          key={index}
          onMouseEnter={() => editMode && setHoveredEdge(index)}
          onMouseLeave={() => editMode && setHoveredEdge(null)}
        >
          <circle
            cx={point.x}
            cy={point.y}
            r={symbolRadius + 10} // Make clickable area larger
            fill="transparent"
            style={{ cursor: editMode ? 'pointer' : 'default', pointerEvents: 'stroke' }}
            onClick={(e) => {
              if (editMode) {
                e.stopPropagation();
                e.preventDefault();
                handleToggleEdgeSelection(index, e);
              }
            }}
          />

          <circle
            cx={point.x}
            cy={point.y}
            r={symbolRadius}
            fill="white"
            stroke={isSelected ? '#046A38' : isHovered ? '#86BC25' : (edge.color || '#DA291C')} // Use edge color
            strokeWidth={isSelected ? 3 : 2}
            style={{ pointerEvents: 'none', opacity }}
          />
          <path
            d={`M ${point.x - crossSize} ${point.y - crossSize} L ${point.x + crossSize} ${point.y + crossSize} M ${point.x + crossSize} ${point.y - crossSize} L ${point.x - crossSize} ${point.y + crossSize}`}
            stroke={edge.color || '#DA291C'}
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pointerEvents: 'none', opacity }}
          />

          {editMode && (isSelected || isHovered) && (
            <g
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleToggleEdgeSelection(index, e);
              }}
            >
              <rect
                x={point.x + deleteBoxOffset}
                y={point.y - deleteBoxWidth / 2 - deleteBoxPadding / 2}
                width={deleteBoxWidth + deleteBoxPadding}
                height={deleteBoxHeight + deleteBoxPadding}
                fill="transparent"
                style={{ cursor: 'pointer' }}
              />
              <rect
                x={point.x + deleteBoxOffset + deleteBoxPadding / 2}
                y={point.y - deleteBoxWidth / 2}
                width={deleteBoxWidth}
                height={deleteBoxHeight}
                fill="white"
                stroke={isSelected ? '#046A38' : '#86BC25'}
                strokeWidth="2"
                rx="3"
                style={{ pointerEvents: 'none' }}
              />
              {isSelected && (
                <path
                  d={`M ${point.x + deleteBoxOffset + deleteBoxPadding / 2 + deleteBoxWidth * 0.25} ${point.y - deleteBoxWidth / 2 + deleteBoxHeight * 0.5} L ${point.x + deleteBoxOffset + deleteBoxPadding / 2 + deleteBoxWidth * 0.5} ${point.y - deleteBoxWidth / 2 + deleteBoxHeight * 0.75} L ${point.x + deleteBoxOffset + deleteBoxPadding / 2 + deleteBoxWidth * 0.75} ${point.y - deleteBoxWidth / 2 + deleteBoxHeight * 0.25}`}
                  stroke="#046A38"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </g>
          )}

          {editMode && isSelected && (
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="white"
              stroke="#046A38"
              strokeWidth="2"
              style={{ cursor: 'move', pointerEvents: 'auto' }}
              onMouseDown={(e) => {
                e.stopPropagation();
                handlePointDragStart(index, 0);
              }}
            />
          )}
        </g>
      );
    }

    if (edge.isFreeLine && edge.customPoints && edge.customPoints.length >= 2) {
      const points = edge.customPoints;
      let pathD = `M ${points[0].x} ${points[0].y}`;

      if (edge.connectionType === 'corner' && points.length === 2) {
        let midY;
        if (points[0].y === points[1].y) {
          midY = points[0].y + (edge.midOffset || 0);
        } else {
          midY = (points[0].y + points[1].y) / 2 + (edge.midOffset || 0);
        }

        let midX;
        if (points[0].x === points[1].x) {
            midX = points[0].x + (edge.midOffset || 0);
        } else {
            midX = (points[0].x + points[1].x) / 2 + (edge.midOffset || 0);
        }

        if (Math.abs(points[0].x - points[1].x) > Math.abs(points[0].y - points[1].y)) {
            pathD = `M ${points[0].x} ${points[0].y} L ${midX} ${points[0].y} L ${midX} ${points[1].y} L ${points[1].x} ${points[1].y}`;
        } else {
            pathD = `M ${points[0].x} ${points[0].y} L ${points[0].x} ${midY} L ${points[1].x} ${midY} L ${points[1].x} ${points[1].y}`;
        }

      } else {
        for (let i = 1; i < points.length; i++) {
          pathD += ` L ${points[i].x} ${points[i].y}`;
        }
      }

      const pathLength = calculatePathLength(pathD);

      const midX = (points[0].x + points[points.length - 1].x) / 2;
      const midY = (points[0].y + points[points.length - 1].y) / 2;

      return (
        <g
          key={index}
          onMouseEnter={() => editMode && setHoveredEdge(index)}
          onMouseLeave={() => editMode && setHoveredEdge(null)}
        >
          <path
            d={pathD}
            stroke="transparent"
            strokeWidth="20"
            fill="none"
            style={{ cursor: editMode ? 'pointer' : 'default', pointerEvents: 'stroke' }}
            onClick={(e) => {
              if (editMode) {
                e.stopPropagation();
                e.preventDefault();
                handleToggleEdgeSelection(index, e);
              }
            }}
          />

          <path
            d={pathD}
            stroke={edge.color || lineColor}
            strokeWidth={(edge.thickness || lineThickness) + (isSelected ? 1 : isHovered ? 0.5 : 0)} // Adjusted thickness based on outline
            strokeDasharray={edge.lineStyle === 'dashed' ? '5,5' : '0'} // Outline suggested '8,4' but current is '5,5'
            fill="none"
            style={{ pointerEvents: 'none', transition: 'stroke-dashoffset 0.5s ease-out' }}
            strokeDashoffset={hasAnimated ? 0 : pathLength * (1 - lineProgress)}
          />

          {isSelected && (
            <path
              d={pathD}
              stroke="#86BC25"
              strokeWidth={(edge.thickness || lineThickness) + 4}
              fill="none"
              opacity="0.3"
              style={{ pointerEvents: 'none' }}
            />
          )}

          {editMode && (isSelected || isHovered) && (
            <g
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleToggleEdgeSelection(index, e);
              }}
            >
              <rect
                x={midX - (compact ? 12 : 20)}
                y={midY - (compact ? 12 : 20)}
                width={compact ? 24 : 40}
                height={compact ? 24 : 40}
                fill="transparent"
                style={{ cursor: 'pointer' }}
              />
              <rect
                x={midX - (compact ? 6 : 12)}
                y={midY - (compact ? 6 : 12)}
                width={compact ? 12 : 24}
                height={compact ? 12 : 24}
                fill="white"
                stroke={isSelected ? '#046A38' : '#86BC25'}
                strokeWidth="2"
                rx="4"
                style={{ pointerEvents: 'none' }}
              />
              {isSelected && (
                <path
                  d={`M ${midX - (compact ? 3 : 6)} ${midY} L ${midX - (compact ? 1 : 2)} ${midY + (compact ? 2 : 4)} L ${midX + (compact ? 3 : 6)} ${midY - (compact ? 2 : 4)}`}
                  stroke="#046A38"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </g>
          )}

          {editMode && isSelected && points.map((point, pIdx) => (
            <circle
              key={pIdx}
              cx={point.x}
              cy={point.y}
              r="8"
              fill="white"
              stroke="#046A38"
              strokeWidth="2"
              style={{ cursor: 'move', pointerEvents: 'auto' }}
              onMouseDown={(e) => {
                e.stopPropagation();
                handlePointDragStart(index, pIdx);
              }}
            />
          ))}

          {editMode && isSelected && edge.connectionType === 'corner' && points.length === 2 && (
            <circle
                cx={Math.abs(points[0].x - points[1].x) > Math.abs(points[0].y - points[1].y) ? ((points[0].x + points[1].x) / 2) + (edge.midOffset || 0) : points[0].x}
                cy={Math.abs(points[0].x - points[1].x) > Math.abs(points[0].y - points[1].y) ? points[0].y : ((points[0].y + points[1].y) / 2) + (edge.midOffset || 0)}
              r="10"
              fill="#86BC25"
              stroke="white"
              strokeWidth="2"
              style={{ cursor: Math.abs(points[0].x - points[1].x) > Math.abs(points[0].y - points[1].y) ? 'ew-resize' : 'ns-resize', pointerEvents: 'auto' }}
              onMouseDown={(e) => {
                e.stopPropagation();
                const startX = e.clientX;
                const startY = e.clientY;
                const startMidOffset = edge.midOffset || 0;

                const handleMouseMove = (moveEvent) => {
                    let delta;
                    if (Math.abs(points[0].x - points[1].x) > Math.abs(points[0].y - points[1].y)) {
                        delta = moveEvent.clientX - startX;
                    } else {
                        delta = moveEvent.clientY - startY;
                    }
                  const newMidOffset = startMidOffset + delta;

                  const updatedEdges = [...edges];
                  updatedEdges[index] = {
                    ...updatedEdges[index],
                    midOffset: newMidOffset
                  };
                  setEdges(updatedEdges);
                };

                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                  saveEdge(index);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            />
          )}
        </g>
      );
    }

    const fromPos = positions[edge.from];
    const toPos = positions[edge.to];

    if (!fromPos || !toPos) return null;

    const fromPoint = getAnchorPosition(fromPos, edge.startSide);
    const toPoint = getAnchorPosition(toPos, edge.endSide);

    if (!fromPoint || !toPoint) return null;

    let pathD;
    let checkboxX, checkboxY;
    if (edge.connectionType === 'corner') {
      let midX_int, midY_int;

      const isStartVertical = edge.startSide === 'top' || edge.startSide === 'bottom';

      if (isStartVertical) {
        midY_int = (fromPoint.y + toPoint.y) / 2 + (edge.midOffset || 0);
        pathD = `M ${fromPoint.x} ${fromPoint.y} L ${fromPoint.x} ${midY_int} L ${toPoint.x} ${midY_int} L ${toPoint.x} ${toPoint.y}`;
        checkboxX = toPoint.x;
        checkboxY = midY_int;
      } else { // isStartHorizontal
        midX_int = (fromPoint.x + toPoint.x) / 2 + (edge.midOffset || 0);
        pathD = `M ${fromPoint.x} ${fromPoint.y} L ${midX_int} ${fromPoint.y} L ${midX_int} ${toPoint.y} L ${toPoint.x} ${toPoint.y}`;
        checkboxX = midX_int;
        checkboxY = toPoint.y;
      }
    } else {
      pathD = `M ${fromPoint.x} ${fromPoint.y} L ${toPoint.x} ${toPoint.y}`;
      checkboxX = (fromPoint.x + toPoint.x) / 2;
      checkboxY = (fromPoint.y + toPoint.y) / 2;
    }

    const pathLength = calculatePathLength(pathD);

    return (
      <g
        key={index}
        onMouseEnter={() => editMode && setHoveredEdge(index)}
        onMouseLeave={() => editMode && setHoveredEdge(null)}
      >
        <path
          d={pathD}
          stroke="transparent"
          strokeWidth="20"
          fill="none"
          style={{ cursor: editMode ? 'pointer' : 'default', pointerEvents: 'stroke' }}
          onClick={(e) => {
            if (editMode) {
              e.stopPropagation();
              e.preventDefault();
              handleToggleEdgeSelection(index, e);
            }
          }}
        />

        <path
          d={pathD}
          stroke={edge.color || lineColor}
          strokeWidth={(edge.thickness || lineThickness) + (isSelected ? 1 : isHovered ? 0.5 : 0)} // Adjusted thickness based on outline
          strokeDasharray={edge.lineStyle === 'dashed' ? '5,5' : '0'} // Outline suggested '8,4' but current is '5,5'
          fill="none"
          style={{ pointerEvents: 'none', transition: 'stroke-dashoffset 0.5s ease-out' }}
          strokeDashoffset={hasAnimated ? 0 : pathLength * (1 - lineProgress)}
        />

        {isSelected && (
          <path
            d={pathD}
            stroke="#86BC25"
            strokeWidth={(edge.thickness || lineThickness) + 4}
            fill="none"
            opacity="0.3"
            style={{ pointerEvents: 'none' }}
          />
        )}

        {editMode && (isSelected || isHovered) && (
          <g
            style={{ pointerEvents: 'auto' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleToggleEdgeSelection(index, e);
            }}
          >
            <rect
              x={checkboxX - (compact ? 12 : 20)}
              y={checkboxY - (compact ? 12 : 20)}
              width={compact ? 24 : 40}
              height={compact ? 24 : 40}
              fill="transparent"
              style={{ cursor: 'pointer' }}
            />
            <rect
              x={checkboxX - (compact ? 6 : 12)}
              y={checkboxY - (compact ? 6 : 12)}
              width={compact ? 12 : 24}
              height={compact ? 12 : 24}
              fill="white"
              stroke={isSelected ? '#046A38' : '#86BC25'}
              strokeWidth="2"
              rx="4"
              style={{ pointerEvents: 'none' }}
            />
            {isSelected && (
              <path
                d={`M ${checkboxX - (compact ? 3 : 6)} ${checkboxY} L ${checkboxX - (compact ? 1 : 2)} ${checkboxY + (compact ? 2 : 4)} L ${checkboxX + (compact ? 3 : 6)} ${checkboxY - (compact ? 2 : 4)}`}
                stroke="#046A38"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pointerEvents: 'none' }}
              />
            )}
          </g>
        )}

        {editMode && isSelected && edge.connectionType === 'corner' && (
          <circle
            cx={checkboxX}
            cy={checkboxY}
            r="10"
            fill="#86BC25"
            stroke="white"
            strokeWidth="2"
            style={{ cursor: (edge.startSide === 'top' || edge.startSide === 'bottom') ? 'ns-resize' : 'ew-resize', pointerEvents: 'auto' }}
            onMouseDown={(e) => {
              e.stopPropagation();
              const startX = e.clientX;
              const startY = e.clientY;
              const startMidOffset = edge.midOffset || 0;

              const handleMouseMove = (moveEvent) => {
                const delta = (edge.startSide === 'top' || edge.startSide === 'bottom')
                  ? (moveEvent.clientY - startY)
                  : (moveEvent.clientX - startX);
                const newMidOffset = startMidOffset + delta;

                const updatedEdges = [...edges];
                updatedEdges[index] = {
                  ...updatedEdges[index],
                  midOffset: newMidOffset
                };
                setEdges(updatedEdges);
              };

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                saveEdge(index);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          />
        )}
      </g>
    );
  };

  // Helper function to determine if node should be highlighted
  const shouldHighlight = (node) => {
    if (!highlightFilter) return false;

    if (highlightFilter === 'blocked') {
      return node.status === 'blocked';
    }

    if (highlightFilter === 'legacy' || highlightFilter === 'apps' || highlightFilter === 'integration') {
      return node.layer === highlightFilter;
    }

    return false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: readOnly ? '#FFFFFF' : '#f9fafb' }}
      onClick={handleBackgroundClick}
    >
      {/* Only show controls in edit mode when not readOnly */}
      {!readOnly && (
        <>
          {/* Toggle Edit Mode Button */}
          <button
            onClick={() => {
              setEditMode(!editMode);
              if (editMode) {
                // If exiting edit mode, save any selected item and clear selections
                if (selectedNode) {
                  saveNode(selectedNode);
                  setSelectedNode(null);
                }
                if (selectedEdge !== null) {
                  const edge = edges[selectedEdge];
                  if (edge && edge.dbId) {
                    saveEdge(selectedEdge);
                  }
                  setSelectedEdge(null);
                }
                setSelectedNodes([]);
              }
            }}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              padding: '8px 16px',
              backgroundColor: editMode ? '#DA291C' : '#046A38',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              zIndex: 20,
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            {editMode ? 'Bearbeitungsmodus beenden' : 'Bearbeitungsmodus'}
          </button>

          {/* Collapse/Expand Panel Button - Only if not compact */}
          {editMode && !compact && (
            <button
              onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
              style={{
                position: 'absolute',
                top: 10,
                // Adjusted right position for the new right-aligned panel structure.
                // 350px width of panel + 10px spacing + 8px button padding (from outline, new is top-2 left-2, so right-aligned context)
                right: isPanelCollapsed ? 10 : 360,
                padding: '8px',
                backgroundColor: '#046A38',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isPanelCollapsed ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          )}
        </>
      )}

      {/* SVG Canvas for edges and layer names */}
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {layerOrder.map((layer, index) => {
          const containerHeight = containerRef.current?.clientHeight || 600;
          const layerHeight = (containerHeight - 80) / layerOrder.length;
          const y = 60 + index * layerHeight + layerHeight / 2;

          const layerNames = {
            output: 'Output',
            integration: 'Integration Layer',
            apps: 'Applications',
            legacy: 'Legacy Systems'
          };

          return (
            <text
              key={layer}
              x="10"
              y={y}
              fontSize={effectiveFontSize + (compact ? 2 : 4)} // Slightly larger font for layer names
              fill="#666"
              fontWeight="600"
              style={{ pointerEvents: 'none' }}>
              {layerNames[layer]}
            </text>
          );
        })}

        {animate && edges.map((edge, index) => renderEdge(edge, index))}
      </svg>

      {/* Nodes rendered as motion.div outside SVG for CSS styling and framer-motion */}
      {animate && nodes.map((node) => {
        const pos = positions[node.id];
        if (!pos) return null;

        const Icon = getIconComponent(node.icon);
        const isSelected = selectedNodes.includes(node.id);
        const isHovered = hoveredNode === node.id;
        const isBlocked = node.status === 'blocked';
        const highlighted = shouldHighlight(node);

        // Scale icon size based on compact mode
        const iconSize = compact ? 'w-8 h-8' : 'w-16 h-16';

        return (
          <motion.div
            key={node.id}
            ref={(el) => (nodeRefs.current[node.id] = el)}
            className={`absolute rounded-lg flex flex-col items-center justify-center text-center shadow-md
              ${!readOnly ? 'cursor-pointer' : ''}
              ${isSelected ? 'ring-4 ring-[#86BC25]' : ''}
              ${isHovered && !isSelected && !highlighted ? 'ring-2 ring-gray-400' : ''}
              ${highlighted ? 'ring-4 ring-[#FFA500] shadow-2xl' : ''}
            `}
            style={{
              left: pos.x,
              top: pos.y,
              width: pos.width, // Already effectiveBoxWidth due to useLayoutEffect
              height: pos.height, // Already effectiveBoxHeight due to useLayoutEffect
              backgroundColor: node.fillColor || '#FFFFFF',
              borderWidth: compact ? '1px' : '2px', // Adjusted for compact mode
              borderStyle: 'solid',
              borderColor: node.strokeColor || '#046A38',
              opacity: node.status === 'light' ? 0.5 : node.status === 'blocked' ? 0.7 : 1,
              zIndex: draggingNode?.id === node.id ? 1000 : isSelected ? 100 : isHovered ? 50 : highlighted ? 75 : 10,
              pointerEvents: readOnly ? 'none' : 'auto',
              padding: compact ? '4px' : '8px' // Adjusted for compact mode
            }}
            initial={animate ? { scale: 0, opacity: 0 } : false}
            animate={{
              scale: highlighted ? 1.15 : 1,
              opacity: node.status === 'light' ? 0.5 : node.status === 'blocked' ? 0.7 : 1
            }}
            transition={{
              scale: { duration: 0.3, type: 'spring', stiffness: 300 },
              opacity: { duration: 0.2 }
            }}
            whileInView={animate ? { scale: 1, opacity: node.status === 'light' ? 0.5 : node.status === 'blocked' ? 0.7 : 1 } : {}}
            viewport={{ once: true }}
            onMouseEnter={() => !readOnly && setHoveredNode(node.id)}
            onMouseLeave={() => !readOnly && setHoveredNode(null)}
            onMouseDown={(e) => {
              if (!readOnly) {
                handleNodeDragStart(node.id, e);
              }
            }}
            onClick={async (e) => {
              if (!readOnly) {
                await handleToggleNodeSelection(node.id, e);
              }
            }}
          >
            {node.logo ? (
              <img src={node.logo} alt={node.label} className={`${iconSize} object-contain ${compact ? 'mb-1' : 'mb-2'}`} style={{ pointerEvents: 'none' }} />
            ) : Icon ? (
              <Icon className={`${iconSize} ${compact ? 'mb-1' : 'mb-2'}`} style={{ color: node.strokeColor || '#046A38', pointerEvents: 'none' }} />
            ) : null}

            {editingNodeLabel === node.id && !readOnly ? (
              <input
                type="text"
                value={node.label}
                onChange={(e) => {
                  setNodes(prevNodes =>
                    prevNodes.map(n =>
                      n.id === node.id ? { ...n, label: e.target.value } : n
                    )
                  );
                }}
                onBlur={() => {
                  setEditingNodeLabel(null);
                  saveNode(node.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setEditingNodeLabel(null);
                    saveNode(node.id);
                  }
                }}
                className="w-full text-center bg-white border border-[#046A38] rounded px-1"
                style={{ fontSize: `${effectiveFontSize}px` }} // Use effectiveFontSize
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div
                className="px-2 font-semibold break-words max-w-full"
                style={{
                  fontSize: `${effectiveFontSize}px`, // Use effectiveFontSize
                  color: node.strokeColor || '#046A38',
                  lineHeight: '1.2',
                  pointerEvents: 'none' // Text content should not interfere with drag/click
                }}
                onDoubleClick={() => !readOnly && setEditingNodeLabel(node.id)}
              >
                {node.label}
              </div>
            )}

            {isBlocked && (
              <div className="absolute top-0 right-0 -mt-2 -mr-2" style={{ pointerEvents: 'none' }}>
                <XCircle className={compact ? 'w-4 h-4' : 'w-6 h-6'} style={{ color: '#DA291C' }} /> {/* Adjusted for compact mode */}
              </div>
            )}
          </motion.div>
        );
      })}

      <div style={{ position: 'absolute', bottom: 16, left: 16, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '12px', maxWidth: '320px', zIndex: 10 }}>
        <div style={{ fontSize: '12px', color: '#4A5568', whiteSpace: 'pre-wrap' }}>{legendText}</div>
      </div>

      {/* Edit Panel - only show when not readOnly and not compact */}
      {!readOnly && !compact && editMode && (
        <motion.div
          className="absolute top-4 right-4 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-[2000]"
          style={{ width: isPanelCollapsed ? '60px' : '350px' }}
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}>

          {/* Collapse Button */}
          <button
            onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
            className="absolute top-2 left-2 p-1 hover:bg-gray-100 rounded z-10">
            {isPanelCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {!isPanelCollapsed && (
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Diagramm bearbeiten</h3>
                <button onClick={() => setEditMode(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Box erstellen */}
              {!showCreateNodeForm ? (
                <button
                  onClick={() => setShowCreateNodeForm(true)}
                  className="w-full mb-4 px-4 py-2 bg-[#046A38] text-white rounded-lg hover:bg-[#035a2e] transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Box erstellen
                </button>
              ) : (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Neue Box</h4>

                  <input
                    type="text"
                    placeholder="Label"
                    value={newNodeData.label}
                    onChange={(e) => setNewNodeData({ ...newNodeData, label: e.target.value })}
                    className="w-full mb-2 px-3 py-2 border rounded"
                  />

                  <select
                    value={newNodeData.layer}
                    onChange={(e) => setNewNodeData({ ...newNodeData, layer: e.target.value })}
                    className="w-full mb-2 px-3 py-2 border rounded">
                    <option value="output">Output</option>
                    <option value="integration">Integration</option>
                    <option value="apps">Applications</option>
                    <option value="legacy">Legacy Systems</option>
                  </select>

                  <input
                    type="number"
                    min="1"
                    max="12"
                    placeholder="Spalte (1-12)"
                    value={newNodeData.col}
                    onChange={(e) => setNewNodeData({ ...newNodeData, col: parseInt(e.target.value) || 1 })}
                    className="w-full mb-2 px-3 py-2 border rounded"
                  />

                  <select
                    value={newNodeData.node_type}
                    onChange={(e) => setNewNodeData({ ...newNodeData, node_type: e.target.value })}
                    className="w-full mb-2 px-3 py-2 border rounded">
                    <option value="db">Database</option>
                    <option value="dwh">Data Warehouse</option>
                    <option value="doc">Document</option>
                    <option value="app">Application</option>
                    <option value="legacy">Legacy System</option>
                  </select>

                  <select
                    value={newNodeData.status}
                    onChange={(e) => setNewNodeData({ ...newNodeData, status: e.target.value })}
                    className="w-full mb-3 px-3 py-2 border rounded">
                    <option value="active">Active</option>
                    <option value="light">Light</option>
                    <option value="blocked">Blocked</option>
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateNode}
                      className="flex-1 px-3 py-2 bg-[#046A38] text-white rounded hover:bg-[#035a2e]">
                      Erstellen
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateNodeForm(false);
                        setNewNodeData({
                          label: '',
                          layer: 'output',
                          col: 6,
                          node_type: 'app',
                          status: 'active',
                          icon: '',
                          fill_color: '#FFFFFF',
                          stroke_color: '#046A38'
                        });
                      }}
                      className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                      Abbrechen
                    </button>
                  </div>
                </div>
              )}

              {selectedNodes.length === 2 && (
                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#046A38' }}>Verbindung erstellen</h4>

                  <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f0f9ff', borderRadius: '4px' }}>
                    <div style={{ fontSize: '14px', color: '#046A38' }}>
                      Von: <strong>{nodes.find(n => n.id === selectedNodes[0])?.label}</strong>
                    </div>
                    <div style={{ fontSize: '14px', color: '#046A38', marginTop: '5px' }}>
                      Nach: <strong>{nodes.find(n => n.id === selectedNodes[1])?.label}</strong>
                    </div>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                      Verbindungsart:
                    </label>
                    <select
                      value={connectionType}
                      onChange={(e) => setConnectionType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                      }}
                    >
                      <option value="line">Linie</option>
                      <option value="no-connection">Keine Verbindung (X)</option>
                    </select>
                  </div>

                  {connectionType === 'line' && (
                    <>
                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                          Linienstil:
                        </label>
                        <select
                          value={connectionStyle}
                          onChange={(e) => setConnectionStyle(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                          }}
                        >
                          <option value="direct">Direkt</option>
                          <option value="corner">Ecke (90°)</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                          Farbe:
                        </label>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                          {predefinedColors.map(color => (
                            <div
                              key={color.value}
                              onClick={() => setLineColor(color.value)}
                              style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: color.value,
                                border: lineColor === color.value ? '3px solid #046A38' : '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>

                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                          Linienart:
                        </label>
                        <select
                          value={lineStyle}
                          onChange={(e) => setLineStyle(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                          }}
                        >
                          <option value="solid">Durchgezogen</option>
                          <option value="dashed">Gestrichelt</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                          Dicke: {lineThickness}px
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="8"
                          step="0.5"
                          value={lineThickness}
                          onChange={(e) => setLineThickness(parseFloat(e.target.value))}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </>
                  )}

                  <button
                    onClick={handleCreateConnection}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#046A38',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                  >
                    Verbindung erstellen
                  </button>

                  <button
                    onClick={() => {
                      setSelectedNodes([]);
                      setSelectedNode(null);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '10px',
                      backgroundColor: '#666',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Auswahl aufheben
                  </button>
                </div>
              )}

              {selectedNode && selectedNodes.length === 1 && (
                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#046A38' }}>Box bearbeiten</h4>

                  <button
                    onClick={() => setEditingNodeLabel(selectedNode)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginBottom: '10px',
                      backgroundColor: '#86BC25',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Text bearbeiten
                  </button>

                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>
                      Grid-Position (1-12):
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={nodes.find(n => n.id === selectedNode)?.col || 1}
                      onChange={(e) => handleGridPositionChange(selectedNode, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <button
                    onClick={handleToggleNodeStatus}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginBottom: '10px',
                      backgroundColor: nodes.find(n => n.id === selectedNode)?.status === 'blocked' ? '#86BC25' : '#DA291C',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {nodes.find(n => n.id === selectedNode)?.status === 'blocked' ? 'Als Aktiv setzen' : 'Als Inaktiv markieren'}
                  </button>

                  <button
                    onClick={() => {
                      setUploadingFor(selectedNode);
                      setShowUploadModal(true);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginBottom: '10px',
                      backgroundColor: '#0070c0',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <Upload size={16} />
                    Logo hochladen
                  </button>

                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>
                      Füllfarbe:
                    </label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {fillColors.map(color => (
                        <div
                          key={color.value}
                          onClick={() => handleNodeColorChange(color.value, nodes.find(n => n.id === selectedNode)?.strokeColor || '#046A38')}
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: color.value,
                            border: nodes.find(n => n.id === selectedNode)?.fillColor === color.value ? '3px solid #046A38' : '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            boxShadow: color.value === '#FFFFFF' ? 'inset 0 0 0 1px #e0e0e0' : 'none'
                          }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>
                      Konturfarbe:
                    </label>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {predefinedColors.map(color => (
                        <div
                          key={color.value}
                          onClick={() => handleNodeColorChange(nodes.find(n => n.id === selectedNode)?.fillColor || '#FFFFFF', color.value)}
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: color.value,
                            border: nodes.find(n => n.id === selectedNode)?.strokeColor === color.value ? '3px solid #046A38' : '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteNode(selectedNode)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#DA291C',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <Trash2 size={16} />
                    Box löschen
                  </button>
                </div>
              )}

              {selectedEdge !== null && (
                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#046A38' }}>Verbindung bearbeiten</h4>

                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>Verbindungstyp:</label>
                    <select
                      value={edges[selectedEdge]?.type || 'line'}
                      onChange={(e) => {
                        const updatedEdges = [...edges];
                        updatedEdges[selectedEdge] = { ...updatedEdges[selectedEdge], type: e.target.value };
                        setEdges(updatedEdges);
                      }}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                    >
                      <option value="line">Linie</option>
                      <option value="no-connection">Keine Verbindung (⊗)</option>
                    </select>
                  </div>

                  {edges[selectedEdge]?.type === 'line' && (
                    <>
                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>Linientyp:</label>
                        <select
                          value={edges[selectedEdge]?.connectionType || 'direct'}
                          onChange={(e) => {
                            const updatedEdges = [...edges];
                            updatedEdges[selectedEdge] = { ...updatedEdges[selectedEdge], connectionType: e.target.value };
                            setEdges(updatedEdges);
                          }}
                          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                        >
                          <option value="direct">Direkt</option>
                          <option value="corner">Ecke (90°)</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>Farbe:</label>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                          {predefinedColors.map(color => (
                            <div
                              key={color.value}
                              onClick={() => {
                                const updatedEdges = [...edges];
                                updatedEdges[selectedEdge] = { ...updatedEdges[selectedEdge], color: color.value };
                                setEdges(updatedEdges);
                              }}
                              style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: color.value,
                                border: edges[selectedEdge]?.color === color.value ? '3px solid #046A38' : '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>

                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>Linienstil:</label>
                        <select
                          value={edges[selectedEdge]?.lineStyle || 'solid'}
                          onChange={(e) => {
                            const updatedEdges = [...edges];
                            updatedEdges[selectedEdge] = { ...updatedEdges[selectedEdge], lineStyle: e.target.value };
                            setEdges(updatedEdges);
                          }}
                          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                        >
                          <option value="solid">Durchgezogen</option>
                          <option value="dashed">Gestrichelt</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>Dicke: {edges[selectedEdge]?.thickness || 2.5}px</label>
                        <input
                          type="range"
                          min="1"
                          max="8"
                          step="0.5"
                          value={edges[selectedEdge]?.thickness || 2.5}
                          onChange={(e) => {
                            const updatedEdges = [...edges];
                            updatedEdges[selectedEdge] = { ...updatedEdges[selectedEdge], thickness: Number(e.target.value) };
                            setEdges(updatedEdges);
                          }}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </>
                  )}

                  <button
                    onClick={() => handleDeleteEdge(selectedEdge)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#DA291C',
                      color: 'white',
                      border: 'none',
                      borderRadius: '44px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <Trash2 size={16} />
                    Verbindung löschen
                  </button>
                </div>
              )}

              {!selectedNode && selectedEdge === null && selectedNodes.length === 0 && (
                <>
                  <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#046A38' }}>Neue Elemente erstellen</h4>

                    <button
                      onClick={handleCreateFreeLine}
                      style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        backgroundColor: '#046A38',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        fontWeight: 'bold'
                      }}
                    >
                      <Plus size={16} />
                      Freie Linie erstellen
                    </button>

                    <button
                      onClick={handleCreateNoConnection}
                      style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        backgroundColor: '#DA291C',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        fontWeight: 'bold'
                      }}
                    >
                      <XCircle size={16} />
                      Keine Verbindung Symbol erstellen
                    </button>
                  </div>

                  <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#046A38' }}>Linien-Voreinstellungen</h4>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>
                        Linienstil:
                      </label>
                      <select
                        value={connectionStyle}
                        onChange={(e) => setConnectionStyle(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '4px',
                          border: '1px solid #ccc'
                        }}
                      >
                        <option value="direct">Direkt</option>
                        <option value="corner">Ecke (90°)</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>
                        Linienart:
                      </label>
                      <select
                        value={lineStyle}
                        onChange={(e) => setLineStyle(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '4px',
                          border: '1px solid #ccc'
                        }}
                      >
                        <option value="solid">Durchgezogen</option>
                        <option value="dashed">Gestrichelt</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>
                        Farbe:
                      </label>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {predefinedColors.map(color => (
                          <div
                            key={color.value}
                            onClick={() => setLineColor(color.value)}
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: color.value,
                              border: lineColor === color.value ? '3px solid #046A38' : '1px solid #ccc',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>
                        Dicke: {lineThickness}px
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        step="0.5"
                        value={lineThickness}
                        onChange={(e) => setLineThickness(parseFloat(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#046A38' }}>Globale Diagramm-Einstellungen</h4>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>Box-Breite: {boxWidth}px</label>
                      <input
                        type="range"
                        min="60"
                        max="200"
                        value={boxWidth}
                        onChange={(e) => handleBoxWidthChange(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>Box-Höhe: {boxHeight}px</label>
                      <input
                        type="range"
                        min="40"
                        max="150"
                        value={boxHeight}
                        onChange={(e) => handleBoxHeightChange(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold', color: '#046A38' }}>Schriftgröße: {fontSize}px</label>
                      <input
                        type="range"
                        min="8"
                        max="20"
                        value={fontSize}
                        onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 10px 0', color: '#046A38' }}>Legende bearbeiten:</h4>
                    <textarea
                      value={legendText}
                      onChange={(e) => handleLegendTextChange(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                      rows="3"
                      placeholder="Legende Text hier eingeben..."
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Upload Modal - only show when not readOnly */}
      {!readOnly && showUploadModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Logo hochladen</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{ width: '100%', marginBottom: '16px' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowUploadModal(false)}
                style={{ flex: 1, padding: '8px 16px', backgroundColor: '#E2E8F0', borderRadius: '4px', cursor: 'pointer',  '&:hover': { backgroundColor: '#CBD5E0' }}}>
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveDiagram;
