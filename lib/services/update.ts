import { RootState } from "@react-three/fiber";

type Fn = (state?: RootState) => void;

const updates = new Map<string, Fn>();

export default function update(state: RootState) {
  updates.forEach((fn) => fn(state));
}

update.add = (uuid: string, fn: Fn) => {
  updates.set(uuid, fn);
};

update.remove = (uuid: string) => {
  if (updates.has(uuid)) {
    updates.delete(uuid);
  }
};
