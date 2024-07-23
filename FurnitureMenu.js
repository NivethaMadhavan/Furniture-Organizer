import React from 'react';

const FurnitureMenu = ({
  roomDimensions,
  furnitureDimensions,
  handleRoomDimensionChange,
  handleFurnitureDimensionChange,
  addObject,
  handleScale,
  handleRotateLeft,
  handleRotateRight,
  selectedObjectId,
  isSidebarOpen,
  sidebarWidth,
  setSidebarWidth,
  sidebarRef,
  isResizing,
  setIsResizing
}) => {
  const handleResizeMouseDown = (e) => {
    setIsResizing(true); // Start resizing
    e.preventDefault();
  };

  const handleResizeMouseMove = (e) => {
    if (isResizing.current) {
      setSidebarWidth(Math.max(100, e.clientX));
    }
  };

  const handleResizeMouseUp = () => {
    setIsResizing(false); // Stop resizing
  };

  return (
    <div
      ref={sidebarRef}
      className={`sidebar-content ${isSidebarOpen ? 'open' : 'closed'}`}
      style={{ width: sidebarWidth }}
      onMouseMove={handleResizeMouseMove}
      onMouseUp={handleResizeMouseUp}
    >
      <div className="furniture-menu">
        <h3>Room Dimensions</h3>
        <label>
          Length:
          <input
            type="number"
            name="length"
            value={roomDimensions.length}
            onChange={handleRoomDimensionChange}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            name="height"
            value={roomDimensions.height}
            onChange={handleRoomDimensionChange}
          />
        </label>
        <label>
          Breadth:
          <input
            type="number"
            name="breadth"
            value={roomDimensions.breadth}
            onChange={handleRoomDimensionChange}
          />
        </label>
        <h3>Furniture Dimensions</h3>
        <label>
          Length:
          <input
            type="number"
            name="length"
            value={furnitureDimensions.length}
            onChange={handleFurnitureDimensionChange}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            name="height"
            value={furnitureDimensions.height}
            onChange={handleFurnitureDimensionChange}
          />
        </label>
        <label>
          Breadth:
          <input
            type="number"
            name="breadth"
            value={furnitureDimensions.breadth}
            onChange={handleFurnitureDimensionChange}
          />
        </label>

        <button onClick={() => addObject('/models/chair.glb', [0, -0.04, 0])}>Add Chair</button>
        <button onClick={() => addObject('/models/b_sofa.glb', [1, -0.04, 0])}>Add Sofa</button>
        <button onClick={() => addObject('/models/shelf.glb', [-1, -0.04, 0])}>Add Shelf</button>
        {selectedObjectId && (
          <div>
            <h3>Adjust Selected Object</h3>
            <button onClick={() => handleScale(selectedObjectId, 1.1)}>Scale Up</button>
            <button onClick={() => handleScale(selectedObjectId, 0.9)}>Scale Down</button>
            <button onClick={() => handleRotateLeft(selectedObjectId)}>Rotate Left</button>
            <button onClick={() => handleRotateRight(selectedObjectId)}>Rotate Right</button>
          </div>
        )}
      </div>
      <div
        className="sidebar-resizer"
        onMouseDown={handleResizeMouseDown}
        onMouseMove={handleResizeMouseMove}
        onMouseUp={handleResizeMouseUp}
      />
    </div>
  );
};

export default FurnitureMenu;
