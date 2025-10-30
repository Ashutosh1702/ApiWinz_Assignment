import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  const { 
    label, 
    value, 
    isArray, 
    isObject, 
    isPrimitive, 
    isRoot,
    colors,
    isHighlighted,
    isCurrentMatch,
    path,
  } = data;

  const getNodeContent = () => {
    if (isRoot) {
      return (
        <header className="p-2 text-center">
          <h2 className="font-bold text-lg m-0">{label || 'Root'}</h2>
        </header>
      );
    }

    if (isPrimitive) {
      return (
        <section className="p-3 text-center" aria-label={`Value of ${label}`}>
          <h3 className="font-medium m-0">{label}:</h3>
          <output className="text-sm mt-1 wrap-break-word max-w-xs block">
            {typeof value === 'string' ? `"${value}"` : String(value)}
          </output>
        </section>
      );
    }

    // For array items, show the item's properties if it's an object
    if (isArray && typeof value === 'object' && value !== null) {
      return (
        <article className="p-3 text-center" aria-label={`Array item ${label}`}>
          <h3 className="font-medium m-0 mb-2">Item {label + 1}</h3>
          <div className="text-left text-sm space-y-1">
            {Object.entries(value).map(([key, val]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium">{key}:</span>
                <span className="ml-2">
                  {typeof val === 'string' ? `"${val}"` : String(val)}
                </span>
              </div>
            ))}
          </div>
        </article>
      );
    }

    return (
      <article className="p-3 text-center" aria-label={`${label} ${isArray ? 'Array' : 'Object'}`}>
        <h3 className="font-medium m-0">{label}</h3>
        <div className="text-sm mt-1">
          {isArray ? (
            <mark className="inline-block bg-opacity-80 px-2 py-0.5 rounded" 
                  style={{ backgroundColor: colors.border }}>
              Array <span className="sr-only">with</span> [{value?.length || 0}]
            </mark>
          ) : (
            <mark className="inline-block bg-opacity-80 px-2 py-0.5 rounded" 
                  style={{ backgroundColor: colors.border }}>
              Object
            </mark>
          )}
        </div>
      </article>
    );
  };

  const highlightStyle = isCurrentMatch 
    ? {
        boxShadow: `0 0 0 3px ${colors.border}, 0 0 15px ${colors.border}`,
        transform: 'scale(1.05)',
        zIndex: 10,
      }
    : isHighlighted
    ? {
        boxShadow: `0 0 0 2px ${colors.border}`,
        zIndex: 5,
      }
    : {};

  // Prepare tooltip content with path and value
  const getTooltipContent = () => {
    const tooltipParts = [`Path: ${path}`];
    if (isPrimitive && value) {
      tooltipParts.push(`Value: ${typeof value === 'string' ? `"${value}"` : String(value)}`);
    }
    return tooltipParts.join('\n');
  };

  return (
    <div className="h-full">
      <figure 
        className={`rounded-lg shadow-md transition-all duration-200 m-0 h-full ${
          isCurrentMatch ? 'animate-pulse' : ''
        }`}
        style={{
          background: colors.bg,
          color: colors.text,
          borderColor: isCurrentMatch ? '#f59e0b' : colors.border,
          borderWidth: isCurrentMatch ? '3px' : '2px',
          borderStyle: 'solid',
          minWidth: '120px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          ...highlightStyle,
      }}
      role="treeitem"
      aria-expanded={isRoot ? 'true' : 'false'}
      aria-current={isCurrentMatch ? 'true' : undefined}
      title={getTooltipContent()}
      >
      {!isRoot && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: colors.border, width: '10px', height: '10px' }}
          aria-hidden="true"
        />
      )}
      {getNodeContent()}
      {(isArray || isObject) && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: colors.border, width: '10px', height: '10px' }}
          aria-hidden="true"
        />
      )}
    </figure>
    </div>
  );
};

export default CustomNode;
