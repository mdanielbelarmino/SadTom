import { Canvas } from "@react-three/fiber"
import { UI } from "./components/UI"
import { Experience } from "./components/Experience"
import { useRef } from "react"

function App() {
  const ref = useRef();

  function downloadScreenshot() {
      const image = ref.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.setAttribute('download', 'screenshot.png');
      a.setAttribute('href', image);
      a.click();
  }

  return (
    <>
      <UI />
      <button className={`w-20 h-20 rounded-xl`} onClick={() => downloadScreenshot()}>
          Download Screenshot
      </button>
      <Canvas ref={ref} gl={{ preserveDrawingBuffer: true }} camera={{
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
