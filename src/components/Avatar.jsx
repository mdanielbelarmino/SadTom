import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { GLTFExporter } from "three-stdlib";
import { pb, useConfiguratorStore } from "../store";
import { Asset } from "./Asset";

export const Avatar = ({
    ...props
}) => {
    const grp = useRef();
    // const { nodes, materials } = useGLTF('models/Body.glb')
    const customization = useConfiguratorStore((state) => state.customization);
    const setDownload = useConfiguratorStore((state) => state.setDownload);

    useEffect(() => {
        function download() {
            const exporter = new GLTFExporter();
            exporter.parse(
                grp.current,
                function (result) {
                    save(
                        new Blob([result], { type: "application/octet-stream" }),
                        `SadTom_${+new Date()}.glb`
                    );
                },
                function (error) {
                    console.error(error);
                },
                { binary: true }
            );
        }

        const link = document.createElement("a");
        link.style.display = "none";
        document.body.appendChild(link); // Firefox workaround, see #6594

        function save(blob, filename) {
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        }
        setDownload(download);
    }, []);

    return (
        <group ref={grp} {...props} dispose={null}>
            <group name="Scene">
                {Object.keys(customization).map(
                    (key) =>
                    customization[key]?.asset?.url && (
                        <Suspense key={customization[key].asset.id}>
                            <Asset
                                categoryName={key}
                                url={pb.files.getURL(
                                    customization[key].asset,
                                    customization[key].asset.url
                                )}
                            />
                        </Suspense>
                    )
                )}
            </group>
        </group>
    )
}