import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useConfiguratorStore } from "../store";

export const Asset = ({ url, categoryName }) => {
    const { scene } = useGLTF(url);

    const customization = useConfiguratorStore((state) => state.customization);

    const assetColor = customization[categoryName].color;

    const skin = useConfiguratorStore((state) => state.skin);

    useEffect(() => {
        scene.traverse((child) => {
        if (child.isMesh) {
            if (child.material?.name.includes("Cloth")) {
            child.material.color.set(assetColor);
            }
        }
        });
    }, [assetColor, scene]); 

    const attachedItems = useMemo(() => {
        const items = [];
        scene.traverse((child) => {
            if (child.isMesh) {
                items.push({
                    geometry: child.geometry,
                    material: child.material,
                });
            }
        });
        return items;
    }, [scene]);

    return attachedItems.map((item, index) => (
        <mesh
            key={index}
            geometry={item.geometry}
            material={item.material}
            // position={[0, 0, 0]}
            castShadow
            receiveShadow
        />
    ));
};