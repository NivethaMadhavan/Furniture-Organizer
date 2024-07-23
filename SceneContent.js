import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import FurnitureMenu from './FurnitureMenu';
import SceneContent from './SceneContent';

const ThreeDScene = () => {
  const roomBounds = {
    xMin: -5,
    xMax: 5,
    zMin: -5,
    zMax: 5,
  };

  const [selectedObjects, setSelectedObjects] = useState([]);

  const furnitureOptions = [
    { modelPath: '/models/chair.glb', name: 'Chair' },
    { modelPath: '/models/sofa.glb', name: 'Sofa' },
    { modelPath: '/models/shelf.glb', name: 'Shelf' },
  ];

  const handleSelect = (modelPath) => {
    setSelectedObjects(prevObjects => [...prevObjects, modelPath]);
  };

  const handleDeselect = (modelPath) => {
    setSelectedObjects(prevObjects => prevObjects.filter(obj => obj !== modelPath));
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <FurnitureMenu options={furnitureOptions} onSelect={handleSelect} />
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[0, 5, 10]} />
        <SceneContent roomBounds={roomBounds} selectedObjects={selectedObjects} onDeselect={handleDeselect} />
        <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={1} maxDistance={8} />
      </Canvas>
    </div>
  );
};

export default ThreeDScene;
