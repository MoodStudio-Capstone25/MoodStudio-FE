import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei/native";
import { SHAPE_MODELS } from "../../constants/threeDModels";

function ItemModel({ shape, position = [0, 1, 0], rotation = [0, 0, 0], scale = 0.5 }) {
  // shape이 유효한 경우에만 이 컴포넌트를 렌더하도록(부모에서) 보장해야 합니다.
  const asset = SHAPE_MODELS[shape];

  const { scene } = useGLTF(asset);

  // 같은 scene을 직접 mutate하면(트래버스/재질 변경 등) 공유 캐시에 영향 줄 수 있어 clone 권장
  const cloned = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={cloned} position={position} rotation={rotation} scale={scale} />;
}

// (선택) 미리 캐시 적재
Object.values(SHAPE_MODELS).forEach((asset) => useGLTF.preload(asset));

export default ItemModel;
