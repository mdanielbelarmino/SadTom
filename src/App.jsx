import { Canvas } from "@react-three/fiber"
import { UI } from "./components/UI"
import { Experience } from "./components/Experience"

function App() {

  return (
    <>
      <UI />
      <Canvas camera={{
        position: [5, 5, 7 ],
        fov: 45,
      }}
      shadows
      >
        {/* <color attach="background" args={["#e8e0b0"]} /> */}
        <fog attach="fog" args={["#f5f4ed", 60, 100]} />
        <group position-y={-1}>
            <Experience />
        </group>

      </Canvas>
    </>
  )
}

export default App
