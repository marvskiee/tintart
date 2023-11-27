import React, { useState } from 'react';

const DraggableComponent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
      setDragging(true);
      const rect = e.target.getBoundingClientRect();
      setInitialOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - initialOffset.x,
        y: e.clientY - initialOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        border: '1px solid black',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img
        src="https://via.placeholder.com/150"
        alt="Draggable Image"
        style={{
          width: '100px',
          height: '100px',
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
          cursor: 'move',
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default DraggableComponent;
