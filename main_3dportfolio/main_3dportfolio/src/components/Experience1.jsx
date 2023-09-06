import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { AvatarSpeak } from "./Avatarspeak";
import { motion } from "framer-motion-3d";
import { useThree } from "@react-three/fiber";

export const Experience1 = () => {
  const texture = useTexture("textures/room.jpg");
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <motion.group>
        <OrbitControls />
        {/* Avatara dislaying in front */}
        <AvatarSpeak position={[0.5, -2.9, 3]} scale={2}/>
        {/*<Environment preset="sunset"/>*/}
        <ambientLight intensity={0.9}/>
        <motion.mesh>
          <planeGeometry args={[viewport.width, viewport.height]}/>
          <meshBasicMaterial map={texture}/>
        </motion.mesh>
      </motion.group>
    </>
  );
};
