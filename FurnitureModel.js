import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import useKeyPress from './useKeyPress';

const FurnitureModel = ({ modelPath, position, rotation, scale, roomBounds, selected, onSelect, onMove }) => {
  const gltf = useGLTF(modelPath);
  const modelRef = useRef();

  const moveDistance = 0.05;

  const leftPressed = useKeyPress('ArrowLeft');
  const rightPressed = useKeyPress('ArrowRight');
  const upPressed = useKeyPress('ArrowUp');
  const downPressed = useKeyPress('ArrowDown');

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(position[0], position[1], position[2]);
      console.log(`Furniture initialized at: ${[position[0], 0, position[2]]}`);
    }
  }, [position]);

  useFrame(() => {
    if (selected) {
      let newX = position[0];
      let newZ = position[2];

      if (leftPressed) newX -= moveDistance;
      if (rightPressed) newX += moveDistance;
      if (upPressed) newZ -= moveDistance;
      if (downPressed) newZ += moveDistance;

      newX = Math.max(roomBounds.xMin, Math.min(newX, roomBounds.xMax));
      newZ = Math.max(roomBounds.zMin, Math.min(newZ, roomBounds.zMax));

      if (newX !== position[0] || newZ !== position[2]) {
        console.log(`Furniture moved to: ${[newX, 0, newZ]}`);
        onMove([newX, position[1], newZ]);
      }
    }
  });

  const handlePointerDown = (event) => {
    event.stopPropagation();
    onSelect();
  };

  return (
    <group ref={modelRef} rotation={rotation} scale={scale} onPointerDown={handlePointerDown}>
      <primitive object={gltf.scene} />
    </group>
  );
};

export default FurnitureModel;
