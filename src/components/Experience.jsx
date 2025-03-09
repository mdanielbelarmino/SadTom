import { Environment, OrbitControls, SoftShadows, Backdrop } from "@react-three/drei";
import { Avatar } from "./Avatar"

export const Experience = () => {
    return (
        <>
           <OrbitControls
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
            />
            {/* <Environment preset="warehouse" intensity={0.0}/> */}
            <Backdrop scale={[100, 15, 20]} floor={1.0} receiveShadow position-z={-4}>
                <meshStandardMaterial color="#d6b77c" />
            </Backdrop>
            <SoftShadows size={52} samples={16} />
            <ambientLight intensity={0.8} />

            {/* Key Light */}
            <directionalLight
                position={[10, 10, 10]}
                intensity={0.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
            />
            {/* Fill Light */}
            <directionalLight position={[-5, 5, 5]} intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.0} />  {/* Position reversed and less intensity */}
            {/* Upper front light with the same intensity */}
            <directionalLight position={[0, 5, 5]} intensity={0.5} />
            {/* Back Lights */}
            {/* <directionalLight position={[1, 0.1, -5]} intensity={2} color={"pink"} />
            <directionalLight position={[-1, 0.1, -5]} intensity={5} color={"purple"} /> */}

            <Avatar />
        </>
    );
};