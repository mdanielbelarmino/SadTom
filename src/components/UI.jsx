import { useEffect } from "react";
import { pb, useConfiguratorStore } from "../store";

const AssetsBox = () => {
    const {
        categories,
        currentCategory,
        fetchCategories,
        setCurrentCategory,
        changeAsset,
        customization,
    } = useConfiguratorStore();

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className="rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20  backdrop-blur-sm drop-shadow-md flex flex-col py-6 gap-3 overflow-hidden ">
            <div className="flex items-center gap-8 pointer-events-auto overflow-x-auto noscrollbar px-6 pb-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setCurrentCategory(category)}
                        className={`transition-colors duration-200 font-medium flex-shrink-0 border-b ${
                            currentCategory.name === category.name
                              ? "text-white shadow-purple-100 border-b-white"
                              : "text-gray-600 hover:text-gray-800 border-b-transparent"
                          }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="flex gap-2 flex-wrap px-6">
                {currentCategory?.removable && (
                <button
                    onClick={() => changeAsset(currentCategory.name, null)}
                    className={`w-20 h-20 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300
                    ${
                        !customization[currentCategory.name].asset
                        ? "border-white opacity-100"
                        : "opacity-80 border-transparent"
                    }`}
                >
                    <div className="w-full h-full flex items-center justify-center bg-black/40 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                    </div>
                </button>
                )}
                {currentCategory?.assets.map((asset) => (
                <button
                    key={asset.thumbnail}
                    onClick={() => changeAsset(currentCategory.name, asset)}
                    className={`w-20 h-20 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300
                    ${
                        customization[currentCategory.name]?.asset?.id === asset.id
                        ? "border-white opacity-100"
                        : "opacity-80 border-transparent"
                    }`}
                >
                    <img
                    className="object-cover w-full h-full"
                    src={pb.files.getURL(asset, asset.thumbnail)}
                    />
                </button>
                ))}
            </div>
        </div>
    );
};

const DownloadButton = () => {
    const download = useConfiguratorStore((state) => state.download);
    return (
        <button
            className="pointer-events-auto rounded-lg bg-indigo-500 px-4 py-3 font-medium text-white transition-colors duration-300 hover:bg-indigo-600"
            onClick={download}
        >
            Download
        </button>
    );
};

export const UI = () => {
    const currentCategory = useConfiguratorStore(
        (state) => state.currentCategory
    );
    const customization = useConfiguratorStore((state) => state.customization);
    return (
        <main className="z-10 pointer-events-none fixed inset-0 select-none">
            <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col justify-between">
                <div className="flex items-center justify-between p-10">
                    <a
                        className="pointer-events-auto"
                        href="http://localhost:5173/"
                    >
                        <img className="w-20" src="/images/icon.png" />
                    </a>
                    <DownloadButton />
                </div>
                <div className="px-10 flex flex-col">
                    {currentCategory?.colorPalette &&
                        customization[currentCategory.name] && <ColorPicker />}
                    <AssetsBox />
                </div>
            </div>
        </main>
    );
};

const ColorPicker = () => {
    const updateColor = useConfiguratorStore((state) => state.updateColor);
    const currentCategory = useConfiguratorStore(
      (state) => state.currentCategory
    );
    const handleColorChange = (color) => {
      updateColor(color);
    };
    const customization = useConfiguratorStore((state) => state.customization);
  
    if (!customization[currentCategory.name]?.asset) {
      return null;
    }
    return (
      <div className="pointer-events-auto noscrollbar relative flex gap-2 max-w-full overflow-x-auto backdrop-blur-sm py-2 drop-shadow-md">
        {currentCategory.expand?.colorPalette?.colors.map((color, index) => (
          <button
            key={`${index}-${color}`}
            className={`w-10 h-10 p-1.5 drop-shadow-md bg-black/20 shrink-0 rounded-lg overflow-hidden transition-all duration-300 border-2
               ${
                 customization[currentCategory.name].color === color
                   ? "border-white"
                   : "border-transparent"
               }
            `}
            onClick={() => handleColorChange(color)}
          >
            <div
              className="w-full h-full rounded-md"
              style={{ backgroundColor: color }}
            />
          </button>
        ))}
      </div>
    );
  };