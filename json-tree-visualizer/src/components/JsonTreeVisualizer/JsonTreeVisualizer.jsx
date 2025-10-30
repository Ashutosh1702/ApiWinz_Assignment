import React, { useCallback, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { useReactFlow, ReactFlowProvider, useNodesState, useEdgesState } from 'reactflow';
import ReactFlow, { Background, Controls, MiniMap, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = {
  objectNode: CustomNode,
  arrayNode: CustomNode,
  primitiveNode: CustomNode,
};

const NODE_COLORS = {
  object: {
    bg: "#2dd4bf",
    text: "#ffffff",
    border: "#14b8a6",
  },
  array: {
    bg: "#10b981",
    text: "#ffffff",
    border: "#059669",
  },
  primitive: {
    bg: "#f59e0b",
    text: "#1f2937",
    border: "#d97706",
  },
  root: {
    bg: "#8b5cf6",
    text: "#ffffff",
    border: "#7c3aed",
  },
};

const JsonTreeVisualizer = forwardRef(
  ({ jsonData, onSearchResultsChange }, ref) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [searchResults, setSearchResults] = React.useState({
      matches: [],
      currentMatch: -1,
      hasResults: null,
    });
    const reactFlowInstance = useReactFlow();
    const nodeIdsRef = useRef(new Map());
    const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });
    const [showMiniMap, setShowMiniMap] = useState(false);
    const wrapperRef = useRef(null);

    const handleMove = useCallback((event, vp) => {
      if (vp) setViewport(vp);
    }, []);

    const handleZoomIn = useCallback(() => {
      reactFlowInstance.zoomIn?.();
    }, [reactFlowInstance]);

    const handleZoomOut = useCallback(() => {
      reactFlowInstance.zoomOut?.();
    }, [reactFlowInstance]);

    const handleFitView = useCallback(() => {
      reactFlowInstance.fitView?.({ padding: 0.2, duration: 400 });
    }, [reactFlowInstance]);

    const toggleMiniMap = useCallback(() => {
      setShowMiniMap((v) => !v);
    }, []);

    const findNodeByPath = useCallback((path) => {
      const exactMatch = nodeIdsRef.current.get(path);
      if (exactMatch) return exactMatch;

      if (!path.startsWith("$")) {
        const withDollar = `$${path.startsWith("[") ? "" : "."}${path}`;
        const dollarMatch = nodeIdsRef.current.get(withDollar);
        if (dollarMatch) return dollarMatch;

        return nodeIdsRef.current.get(`$.${path}`) || null;
      }

      return null;
    }, []);

    const handleSearch = useCallback(
      (searchTerm) => {
        if (!searchTerm) return;

        try {
          let foundNodeId = findNodeByPath(searchTerm);

          if (!foundNodeId) {
            const cleanTerm = searchTerm.trim().replace(/^\$+/, '').replace(/^\./, '');
            const possiblePaths = [
              `$${cleanTerm}`,
              `$.${cleanTerm}`,
              cleanTerm,
              `[${cleanTerm}]`,
              `$[${cleanTerm}]`,
            ];

            for (const path of possiblePaths) {
              foundNodeId = findNodeByPath(path);
              if (foundNodeId) break;
            }
          }

          if (foundNodeId) {
            const next = {
              matches: [foundNodeId],
              currentMatch: 0,
              hasResults: true,
            };
            setSearchResults(next);
            onSearchResultsChange?.(next);

            setTimeout(() => {
              reactFlowInstance.fitView({
                padding: 0.5,
                includeHiddenNodes: false,
                nodes: [{ id: foundNodeId }],
                duration: 500,
              });
            }, 100);
          } else {
            const searchLower = searchTerm.toLowerCase();
            const matchedNodes = [];

            for (const [path, nodeId] of nodeIdsRef.current.entries()) {
              if (path.toLowerCase().includes(searchLower)) {
                matchedNodes.push(nodeId);
              }
            }

            if (matchedNodes.length > 0) {
              const next = {
                matches: matchedNodes,
                currentMatch: 0,
                hasResults: true,
              };
              setSearchResults(next);
              onSearchResultsChange?.(next);

              setTimeout(() => {
                reactFlowInstance.fitView({
                  padding: 0.5,
                  includeHiddenNodes: false,
                  nodes: [{ id: matchedNodes[0] }],
                  duration: 500,
                });
              }, 100);
            } else {
              const next = { matches: [], currentMatch: -1, hasResults: false };
              setSearchResults(next);
              onSearchResultsChange?.(next);
            }
          }
        } catch (error) {
          console.error("Search error:", error);
          const next = { matches: [], currentMatch: -1, hasResults: false };
          setSearchResults(next);
          onSearchResultsChange?.(next);
        }
      },
      [findNodeByPath, onSearchResultsChange, reactFlowInstance]
    );

    const handleClearSearch = useCallback(() => {
      const next = { matches: [], currentMatch: -1, hasResults: null };
      setSearchResults(next);
      onSearchResultsChange?.(next);
    }, [onSearchResultsChange]);

    useImperativeHandle(
      ref,
      () => ({
        search: handleSearch,
        clearSearch: handleClearSearch,
        exportAsPng: async (fileName = 'tree.png') => {
          if (!wrapperRef.current) return;
          const canvasEl = wrapperRef.current.querySelector('.react-flow');
          if (!canvasEl) return;
          const domToImage = (await import('dom-to-image')).default;
          const dataUrl = await domToImage.toPng(canvasEl, { 
            bgcolor: '#ffffff', 
            width: canvasEl.offsetWidth * 2, 
            height: canvasEl.offsetHeight * 2, 
            style: { 
              transform: 'scale(2)', 
              transformOrigin: 'top left' 
            } 
          });
          const link = document.createElement('a');
          link.download = fileName;
          link.href = dataUrl;
          link.click();
        },
      }),
      [handleSearch, handleClearSearch]
    );

    React.useEffect(() => {
      if (!jsonData) return;

      // Reset search when data changes
      setSearchResults({ matches: [], currentMatch: -1, hasResults: null });

      const { nodes: newNodes, edges: newEdges } =
        convertJsonToElements(jsonData);
      setNodes(newNodes);
      setEdges(newEdges);
    }, [jsonData, setNodes, setEdges]);

    
const convertJsonToElements = (
  data,
  parentId = null,
  parentKey = "",
  index = 0,
  depth = 0,
  parentPath = "$"
) => {
  const nodes = [];
  const edges = [];

  const isRoot = parentId === null;
  const isArray = Array.isArray(data);
  const isObject = !isArray && typeof data === "object" && data !== null;
  const isPrimitive = !isArray && !isObject;

  const nodeId = parentId ? `${parentId}-${parentKey || index}` : "root";
  // If the top-level object has a single key (e.g., { "user": { ... } })
  // treat that key as the visual root label to match the target UI.
  const singleKeyRoot = isRoot && isObject && Object.keys(data).length === 1;
  const rootDisplayKey = singleKeyRoot ? Object.keys(data)[0] : null;
  const label = isRoot ? rootDisplayKey || "root" : parentKey;
  const value = isPrimitive
    ? String(data)
    : isArray
    ? "[]"
    : isObject
    ? "{}"
    : "";

  // Choose color scheme
  const colors = isRoot
    ? NODE_COLORS.root
    : isArray
    ? NODE_COLORS.array
    : isObject
    ? NODE_COLORS.object
    : NODE_COLORS.primitive;

  // Build current JSONPath
  let currentPath = parentPath;
  if (isRoot) {
    currentPath = singleKeyRoot ? `$.${rootDisplayKey}` : "$";
  } else if (typeof parentKey === 'number') {
    currentPath = `${parentPath}[${parentKey}]`;
  } else {
    currentPath = parentPath === "$" ? `$.${parentKey}` : `${parentPath}.${parentKey}`;
  }
  // Store path → nodeId for search
  if (currentPath) nodeIdsRef.current.set(currentPath, nodeId);

  // Create node
  const currentNode = {
    id: nodeId,
    type: isArray
      ? "arrayNode"
      : isObject
      ? "objectNode"
      : "primitiveNode",
    data: {
      label,
      value,
      isArray,
      isObject,
      isPrimitive,
      isRoot,
      colors,
      path: currentPath,
    },
    position: { x: 0, y: depth * 120 }, // base Y offset per depth
    style: {
      borderRadius: "8px",
      padding: "8px 12px",
      width: "auto",
      minWidth: "100px",
      textAlign: "center",
      background: colors.bg,
      color: colors.text,
      border: `2px solid ${colors.border}`,
      boxShadow:
        "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    },
  };
  nodes.push(currentNode);

  if (parentId) {
    edges.push({
      id: `e-${parentId}-${nodeId}`,
      source: parentId,
      target: nodeId,
      type: "smoothstep",
      animated: true,
      style: { stroke: colors.border, strokeWidth: 2 },
      markerEnd: {
        type: "arrowclosed",
        width: 12,
        height: 12,
        color: colors.border,
      },
    });
  }

  if (isPrimitive) return { nodes, edges, width: 150 };

  const sourceForChildren = singleKeyRoot ? data[rootDisplayKey] : data;
  const entries = Array.isArray(sourceForChildren)
    ? sourceForChildren.map((v, i) => [i, v])
    : Object.entries(sourceForChildren || {});
  if (entries.length === 0) return { nodes, edges, width: 150 };

  const horizontalSpacing = 180;
  const childDepth = depth + 1;
  const basePathForChildren = currentPath;
  
  const childLayouts = entries.map(([key, value], i) =>
    convertJsonToElements(value, nodeId, key, i, childDepth, basePathForChildren)
  );

  const totalWidth = childLayouts.reduce((sum, c) => sum + c.width, 0) +
    horizontalSpacing * (childLayouts.length - 1);

  let currentX = -totalWidth / 2;
  childLayouts.forEach((childLayout) => {
    childLayout.nodes.forEach((n) => {
      n.position.x += currentX + childLayout.width / 2;
    });
    nodes.push(...childLayout.nodes);
    edges.push(...childLayout.edges);
    currentX += childLayout.width + horizontalSpacing;
  });

  return { nodes, edges, width: Math.max(totalWidth, 150) };
};

    if (!jsonData) return null;

    const nodesWithHighlights = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isHighlighted: searchResults.matches.includes(node.id),
        isCurrentMatch:
          searchResults.currentMatch >= 0 &&
          searchResults.matches[searchResults.currentMatch] === node.id,
      },
    }));

    return (
      <div ref={wrapperRef} className="w-full h-[600px] relative border rounded-lg overflow-hidden">
        <ReactFlow
          nodes={nodesWithHighlights}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onMove={handleMove}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={true}
          zoomOnPinch={true}
          panOnScroll={true}
          panOnDrag={[1, 2]}
          zoomOnDoubleClick={false}
          preventScrolling={true}
          defaultViewport={viewport}
          onNodeClick={(event, node) => {
            const path = node?.data?.path;
            if (!path) return;
            if (navigator?.clipboard?.writeText) {
              navigator.clipboard.writeText(path).catch(() => {});
            }
          }}
          minZoom={0.1}
          maxZoom={2}
        >
          <Background />
          <Panel position="top-right" className="flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white text-black rounded shadow hover:bg-gray-100"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-white text-black rounded shadow hover:bg-gray-100"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
              </svg>
            </button>
            <button
              onClick={handleFitView}
              className="p-2 bg-white text-black rounded shadow hover:bg-gray-100"
              title="Fit View"
              aria-label="Fit View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M8 3v18M3 12h18M3 8h4M3 16h4M16 3v18M21 8h-4M21 16h-4"></path>
              </svg>
            </button>
            <button
              onClick={toggleMiniMap}
              className={`p-2 text-black rounded shadow ${
                showMiniMap ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
              }`}
              title="Toggle Mini Map"
              aria-label="Toggle Mini Map"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M9 3v18M3 9h18M3 15h18M15 3v18"></path>
              </svg>
            </button>
          </Panel>

          {showMiniMap && (
            <MiniMap
              nodeStrokeWidth={3}
              zoomable
              pannable
              className="bg-white/80 rounded-lg shadow-md"
              style={{
                width: 150,
                height: 100,
                position: "absolute",
                right: 10,
                bottom: 10,
              }}
            />
          )}
        </ReactFlow>

        <div className="absolute bottom-2 left-2 bg-white/80 text-xs p-1 px-2 rounded shadow">
          Zoom: {Math.round(viewport.zoom * 100)}% | Position:{" "}
          {Math.round(viewport.x)}, {Math.round(viewport.y)}
        </div>
      </div>
    );
  }
);

const WrappedJsonTreeVisualizer = (props) => (
  <ReactFlowProvider>
    <JsonTreeVisualizer {...props} />
  </ReactFlowProvider>
);

export default WrappedJsonTreeVisualizer;
