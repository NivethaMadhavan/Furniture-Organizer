import React, { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Box3, Vector3 } from 'three';

const CustomModel = ({ modelPath, position, rotation, scale, roomBounds }) => {
  const [model, setModel] = useState(null);
  const gltf = useLoader(GLTFLoader, modelPath);

  useEffect(() => {
    if (gltf) {
      const model = gltf.scene;
      model.position.set(...position);
      model.rotation.set(...rotation);
      model.scale.set(...scale);

      // Ensure the model is within the room bounds
      const box = new Box3().setFromObject(model);
      const center = new Vector3();
      box.getCenter(center);
      if (
        center.x < roomBounds.xMin || center.x > roomBounds.xMax ||
        center.z < roomBounds.zMin || center.z > roomBounds.zMax
      ) {
        console.error('Model is out of bounds');
        return;
      }

      setModel(model);
    }
  }, [gltf, position, rotation, scale, roomBounds]);

  return model ? <primitive object={model} /> : null;
};

export default CustomModel;
