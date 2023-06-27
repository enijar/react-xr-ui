import React from "react";
import type { Intersection } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Layer from "./layer";
import Interaction from "./interaction";

type Props = {
  onChange?: (value: string) => void;
};

const ACTION = {
  delete: "delete",
  toggleCase: "toggleCase",
} as const;

export default function Keyboard({ onChange }: Props) {
  const onChangeRef = React.useRef(onChange);
  React.useMemo(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const meshRef = React.useRef<THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.MeshBasicMaterial
  > | null>(null);

  const settings = React.useMemo(() => {
    return {
      width: 1,
      height: 0.38461538461538464,
      scale: 1,
    };
  }, []);

  const ctx = React.useMemo(() => {
    const canvas = document.createElement("canvas");
    return canvas.getContext("2d")!;
  }, []);

  React.useMemo(() => {
    ctx.canvas.width = settings.width * 512;
    ctx.canvas.height = settings.height * 512;
  }, [ctx.canvas, settings.width, settings.height]);

  type Key = {
    label: string;
    value?: string;
    action?: keyof typeof ACTION;
    spanCols?: number;
    spanRows?: number;
  };

  type State = {
    uppercase: boolean;
    pointer: { x: number; y: number };
    value: string;
    hitKey: Key | null;
  };

  const stateRef = React.useRef<State>({
    uppercase: false,
    pointer: { x: -1, y: -1 },
    value: "",
    hitKey: null,
  });

  type Layout = Array<Array<Array<Key | null>>>;

  const layout = React.useMemo<Layout>(() => {
    return [
      [
        [
          { label: "§", value: "§" },
          { label: "±", value: "±" },
        ],
        [
          { label: "1", value: "1" },
          { label: "!", value: "!" },
        ],
        [
          { label: "2", value: "2" },
          { label: "@", value: "@" },
        ],
        [
          { label: "3", value: "3" },
          { label: "£", value: "£" },
        ],
        [
          { label: "4", value: "4" },
          { label: "$", value: "$" },
        ],
        [
          { label: "5", value: "5" },
          { label: "%", value: "%" },
        ],
        [
          { label: "6", value: "6" },
          { label: "^", value: "^" },
        ],
        [
          { label: "7", value: "7" },
          { label: "&", value: "&" },
        ],
        [
          { label: "8", value: "8" },
          { label: "*", value: "*" },
        ],
        [
          { label: "9", value: "9" },
          { label: "(", value: "(" },
        ],
        [
          { label: "0", value: "0" },
          { label: ")", value: ")" },
        ],
        [
          { label: "-", value: "-" },
          { label: "_", value: "_" },
        ],
        [
          { label: "=", value: "=" },
          { label: "+", value: "+" },
        ],
        [{ label: "DEL", action: ACTION.delete }],
      ],
      [
        [{ label: "TAB", value: "\t" }],
        [
          { label: "q", value: "q" },
          { label: "Q", value: "Q" },
        ],
        [
          { label: "w", value: "w" },
          { label: "W", value: "W" },
        ],
        [
          { label: "e", value: "e" },
          { label: "E", value: "E" },
        ],
        [
          { label: "r", value: "r" },
          { label: "R", value: "R" },
        ],
        [
          { label: "t", value: "t" },
          { label: "T", value: "T" },
        ],
        [
          { label: "y", value: "y" },
          { label: "Y", value: "Y" },
        ],
        [
          { label: "u", value: "u" },
          { label: "U", value: "U" },
        ],
        [
          { label: "i", value: "i" },
          { label: "I", value: "I" },
        ],
        [
          { label: "o", value: "o" },
          { label: "O", value: "O" },
        ],
        [
          { label: "p", value: "p" },
          { label: "P", value: "P" },
        ],
        [
          { label: "[", value: "[" },
          { label: "{", value: "{" },
        ],
        [
          { label: "]", value: "]" },
          { label: "}", value: "}" },
        ],
      ],
      [
        [{ label: "CAPS", action: ACTION.toggleCase }],
        [
          { label: "a", value: "a" },
          { label: "A", value: "A" },
        ],
        [
          { label: "s", value: "s" },
          { label: "S", value: "S" },
        ],
        [
          { label: "d", value: "d" },
          { label: "D", value: "D" },
        ],
        [
          { label: "f", value: "f" },
          { label: "F", value: "F" },
        ],
        [
          { label: "g", value: "g" },
          { label: "G", value: "G" },
        ],
        [
          { label: "h", value: "h" },
          { label: "H", value: "H" },
        ],
        [
          { label: "j", value: "j" },
          { label: "J", value: "J" },
        ],
        [
          { label: "k", value: "k" },
          { label: "K", value: "K" },
        ],
        [
          { label: "l", value: "l" },
          { label: "L", value: "L" },
        ],
        [
          { label: ";", value: ";" },
          { label: ":", value: ":" },
        ],
        [
          { label: "'", value: "'" },
          { label: '"', value: '"' },
        ],
        [
          { label: "\\", value: "\\" },
          { label: "|", value: "|" },
        ],
      ],
      [
        [null],
        [
          { label: "`", value: "`" },
          { label: "~", value: "~" },
        ],
        [
          { label: "z", value: "z" },
          { label: "Z", value: "Z" },
        ],
        [
          { label: "x", value: "x" },
          { label: "X", value: "X" },
        ],
        [
          { label: "c", value: "c" },
          { label: "C", value: "C" },
        ],
        [
          { label: "v", value: "v" },
          { label: "V", value: "V" },
        ],
        [
          { label: "b", value: "b" },
          { label: "B", value: "B" },
        ],
        [
          { label: "n", value: "n" },
          { label: "N", value: "N" },
        ],
        [
          { label: "m", value: "m" },
          { label: "M", value: "M" },
        ],
        [
          { label: ",", value: "," },
          { label: "<", value: "<" },
        ],
        [
          { label: ".", value: "." },
          { label: ">", value: ">" },
        ],
        [
          { label: "?", value: "?" },
          { label: "/", value: "/" },
        ],
      ],
      [[null], [null], [null], [{ label: "SPACE", value: " ", spanCols: 7 }]],
    ];
  }, []);

  const maxRowLength = React.useMemo(() => {
    return layout.reduce((maxRowLength, cols) => {
      return Math.max(maxRowLength, cols.length);
    }, 0);
  }, [layout]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (mesh === null) return;
    if (mesh.material.map === null) return;
    const [w, h] = [ctx.canvas.width, ctx.canvas.height];

    const keySize = w / maxRowLength;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);

    // Layout
    layout.forEach((cols, rowIndex) => {
      cols.forEach((keys, colIndex) => {
        let key = keys[0];
        if (stateRef.current.uppercase) {
          key = keys[1] ?? keys[0];
        }
        if (key === null) return;
        if (key.label === undefined) return;

        function isPointerHit(
          kx: number,
          ky: number,
          kw: number,
          kh: number
        ): boolean {
          const px = stateRef.current.pointer.x * w;
          const py = stateRef.current.pointer.y * h;
          return px >= kx && px <= kx + kw && py >= ky && py <= ky + kh;
        }

        const spanCols = key.spanCols ?? 1;
        const kx = keySize * colIndex;
        const ky = keySize * rowIndex;
        const cx = kx + (keySize * spanCols) / 2;
        const cy = ky + keySize / 2;
        const hit = isPointerHit(kx, ky, keySize * spanCols, keySize);
        if (hit) {
          stateRef.current.hitKey = key;
        }
        ctx.fillStyle = hit ? "crimson" : "#222222";
        ctx.fillRect(kx, ky, keySize * spanCols, keySize);
        ctx.font = `${keySize * 0.35}px system-ui`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(key.label, cx, cy);
      });
    });

    // Paint
    mesh.material.map.needsUpdate = true;
  });

  const setPointer = React.useCallback((intersection: Intersection) => {
    stateRef.current.pointer.x = intersection.uv.x;
    stateRef.current.pointer.y = 1 - intersection.uv.y;
  }, []);

  return (
    <Interaction
      onOver={setPointer}
      onMove={setPointer}
      onOut={() => {
        stateRef.current.pointer.x = -1;
        stateRef.current.pointer.y = -1;
      }}
      onDown={(intersection) => {
        setPointer(intersection);
        if (stateRef.current.hitKey === null) return;
        if (stateRef.current.hitKey.value !== undefined) {
          // todo: account for cursor position
          stateRef.current.value += stateRef.current.hitKey.value;
        }
        if (stateRef.current.hitKey.action !== undefined) {
          switch (stateRef.current.hitKey.action) {
            case ACTION.delete:
              // todo: account for cursor position
              stateRef.current.value = stateRef.current.value.slice(0, -1);
              break;
            case ACTION.toggleCase:
              stateRef.current.uppercase = !stateRef.current.uppercase;
              break;
          }
        }
        if (onChangeRef.current !== undefined) {
          onChangeRef.current(stateRef.current.value);
        }
      }}
    >
      <Layer width={settings.width} height={settings.height}>
        <mesh ref={meshRef} scale={settings.scale} renderOrder={999999}>
          <planeGeometry args={[settings.width, settings.height]} />
          <meshBasicMaterial depthWrite={false}>
            <canvasTexture attach="map" image={ctx.canvas} />
          </meshBasicMaterial>
        </mesh>
      </Layer>
    </Interaction>
  );
}
