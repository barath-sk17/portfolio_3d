import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { Suspense, useEffect, useState } from "react";
import { Cursor } from "./components/Cursor";
import { Experience1 } from "./components/Experience1";
import { Interface1 } from "./components/Interface1";
import { LoadingScreen } from "./components/LoadingScreen";
import { Menu1 } from "./components/Menu1";
import { ScrollManager } from "./components/ScrollManager";
import { framerMotionConfig } from "./config";

export function Second() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
    <div style={{ height: '100vh' }}>
    <LoadingScreen started={started} setStarted={setStarted} />
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        <Canvas >
          <color attach="background" args={["#e6e7ff"]} />
          <ScrollControls pages={5} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Suspense>
                {started && (
                  <Experience1 section={section} menuOpened={menuOpened} />
                )}
              </Suspense>
            </Scroll>
            <Scroll html>
              {started && <Interface1 setSection={setSection} />}
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu1
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        <Cursor />
      </MotionConfig>
      <Leva hidden />
    </div>
    </>
  );
}

