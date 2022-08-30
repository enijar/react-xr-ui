import { RootState } from "@react-three/fiber";
import { XRController } from "@react-three/xr";
import interactive from "./interactive";

type Fn = (state: RootState) => void;

const updates = new Map<string, Fn>();

export default function update(state: RootState, controllers: XRController[]) {
  interactive.update(state.camera, state.raycaster, controllers);
}

update.add = (uuid: string, fn: Fn) => {
  updates.set(uuid, fn);
};

update.remove = (uuid: string) => {
  if (updates.has(uuid)) {
    updates.delete(uuid);
  }
};
