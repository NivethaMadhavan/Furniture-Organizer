import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import FurnitureModel from './FurnitureModel';
import FurnitureMenu from './FurnitureMenu';
import './styles.css'; // Ensure your CSS file is imported

const ThreeDScene = () => {
  const [roomDimensions, setRoomDimensions] = useState({ length: 6, height: 4, breadth: 6 });
  const [objects, setObjects] = useState([]);
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [furnitureDimensions, setFurnitureDimensions] = useState({ length: 1, height: 1, breadth: 1 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open
  const [sidebarWidth, setSidebarWidth] = useState(300); // Set initial sidebar width
  const sidebarRef = useRef(null);
  const isResizing = useRef(false);
  const [toggleCount, setToggleCount] = useState(0); // Track toggle clicks

  const margin = 0.7; // Margin to prevent furniture from protruding

  const addObject = (modelPath, initialPosition) => {
    const yPos = initialPosition[1]; // Setting Y-coordinate to -0.45 for floor level
    console.log(`Adding object at: ${[initialPosition[0], yPos, initialPosition[2]]}`);
    setObjects((prevObjects) => [
      ...prevObjects,
      { 
        modelPath, 
        id: Date.now(), 
        position: [initialPosition[0], yPos, initialPosition[2]], 
        scale: [furnitureDimensions.length, furnitureDimensions.height, furnitureDimensions.breadth], 
        rotation: [0, 0, 0] 
      },
    ]);
  };

  const handleSelect = (id) => {
    setSelectedObjectId(id);
  };

  const handleMove = (id, newPos) => {
    const yPos = newPos[1]; // Setting Y-coordinate to -0.45 for floor level
    console.log(`Moving object to: ${[newPos[0], yPos, newPos[2]]}`);
    setObjects((prevObjects) =>
      prevObjects.map((obj) =>
        obj.id === id ? { ...obj, position: [newPos[0], yPos, newPos[2]] } : obj
      )
    );
  };

  const handleScale = (id, scaleFactor) => {
    setObjects((prevObjects) =>
      prevObjects.map((obj) => {
        if (obj.id === id) {
          const currentScaleY = obj.scale[1];
          const newScaleY = currentScaleY * scaleFactor;
          return { ...obj, scale: [obj.scale[0] * scaleFactor, newScaleY, obj.scale[2] * scaleFactor], position: [obj.position[0], obj.position[1]+0.01, obj.position[2]] };
        }
        return obj;
      })
    );
  };

  const handleRotateLeft = (id) => {
    setObjects((prevObjects) =>
      prevObjects.map((obj) =>
        obj.id === id ? { ...obj, rotation: [obj.rotation[0], obj.rotation[1] - Math.PI / 2, obj.rotation[2]] } : obj
      )
    );
  };

  const handleRotateRight = (id) => {
    setObjects((prevObjects) =>
      prevObjects.map((obj) =>
        obj.id === id ? { ...obj, rotation: [obj.rotation[0], obj.rotation[1] + Math.PI / 2, obj.rotation[2]] } : obj
      )
    );
  };

  const handleRoomDimensionChange = (e) => {
    setRoomDimensions({ ...roomDimensions, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleFurnitureDimensionChange = (e) => {
    setFurnitureDimensions({ ...furnitureDimensions, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSidebarToggle = () => {
    setToggleCount((prevCount) => prevCount + 1);
    setIsSidebarOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    if (toggleCount > 1) {
      setIsSidebarOpen(false);
      setToggleCount(0);
    }
  }, [toggleCount]);

  return (
    <div className="scene-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} style={{ width: isSidebarOpen ? sidebarWidth : '0px' }}>
        <FurnitureMenu
          roomDimensions={roomDimensions}
          furnitureDimensions={furnitureDimensions}
          handleRoomDimensionChange={handleRoomDimensionChange}
          handleFurnitureDimensionChange={handleFurnitureDimensionChange}
          addObject={addObject}
          handleScale={handleScale}
          handleRotateLeft={handleRotateLeft}
          handleRotateRight={handleRotateRight}
          selectedObjectId={selectedObjectId}
          isSidebarOpen={isSidebarOpen}
          sidebarWidth={sidebarWidth}
          setSidebarWidth={setSidebarWidth}
          sidebarRef={sidebarRef}
          isResizing={isResizing}
          setIsResizing={(value) => (isResizing.current = value)}
        />
      </div>
      <button className="toggle-button" onClick={handleSidebarToggle}>
        &#9776;
      </button>
      <Canvas className="canvas" camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[0, 5, 10]} />
        <Suspense fallback={null}>
          <Environment files="/hdrs/field.exr" />
          <mesh position={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[roomDimensions.breadth, roomDimensions.height, roomDimensions.length]} />
            <meshStandardMaterial color="lightgrey" side={2} />
          </mesh>
          {objects.map((object) => {
            console.log(object);
            return (
              <FurnitureModel
                key={object.id}
                modelPath={object.modelPath}
                position={object.position || [0, 0, 0]}
                rotation={object.rotation || [0, 0, 0]}
                scale={object.scale || [1, 1, 1]}
                roomBounds={{
                  xMin: -roomDimensions.breadth / 2 + margin,
                  xMax: roomDimensions.breadth / 2 - margin,
                  zMin: -roomDimensions.length / 2 + margin,
                  zMax: roomDimensions.length / 2 - margin,
                }}
                selected={object.id === selectedObjectId}
                onSelect={() => handleSelect(object.id)}
                onMove={(newPos) => handleMove(object.id, newPos)}
              />
            );
          })}
          {/* Add the ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="cream" />
          </mesh>
        </Suspense>
        <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={1} maxDistance={8} />
      </Canvas>
    </div>
  );
};

export default ThreeDScene;
