import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Grid } from "@react-three/drei";
import { Suspense } from "react";
const ModelView = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <OrbitControls />
        <gridHelper args={[10, 10]} />
        <Grid infiniteGrid />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        {/* Placeholder geometry for testing */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 1, 1]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0, 1, 5]} receiveShadow>
          <boxGeometry args={[4, 1, 1]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </Suspense>
    </Canvas>
  );
};

export default ModelView;
