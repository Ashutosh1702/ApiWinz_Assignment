// src/utils/generateNodesEdges.js

let nodeId = 0;

/**
 * Determine the color based on JSON node type
 */
const getColor = (value) => {
  if (Array.isArray(value)) return "#34D399"; // green
  if (typeof value === "object" && value !== null) return "#3B82F6"; // blue
  return "#FBBF24"; // yellow/orange for primitives
};

/**
 * Traverse JSON and build React Flow nodes & edges
 */
export const generateNodesEdges = (data, parentId = null, path = "$", depth = 0, x = 0) => {
  const nodes = [];
  const edges = [];

  const id = `node-${nodeId++}`;
  const isArray = Array.isArray(data);
  const isObject = typeof data === "object" && data !== null;

  const label = isArray ? "Array" : isObject ? "Object" : `${path.split(".").pop()}: ${String(data)}`;

  const node = {
    id,
    data: { label },
    position: { x: x * 250, y: depth * 120 },
    style: {
      background: getColor(data),
      color: "#fff",
      padding: 10,
      borderRadius: 8,
      border: "1px solid #ddd",
      fontSize: 12,
    },
  };

  nodes.push(node);

  if (parentId) {
    edges.push({
      id: `edge-${parentId}-${id}`,
      source: parentId,
      target: id,
      animated: true,
    });
  }

  // Recurse through children if object/array
  if (isObject) {
    const entries = Object.entries(data);
    entries.forEach(([key, value], index) => {
      const childPath = isArray ? `${path}[${index}]` : `${path}.${key}`;
      const { nodes: childNodes, edges: childEdges } = generateNodesEdges(
        value,
        id,
        childPath,
        depth + 1,
        index
      );
      nodes.push(...childNodes);
      edges.push(...childEdges);
    });
  }

  return { nodes, edges };
};
