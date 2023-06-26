import React from "react";
import * as THREE from "three";
import Layer from "./layer";
import Interaction from "./interaction";
import { useFrame } from "@react-three/fiber";

type Props = {
  onChange?: (value: string) => void;
};

export default function Keyboard({ onChange }: Props) {
  const meshRef = React.useRef<THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.MeshBasicMaterial
  > | null>(null);

  const settings = React.useMemo(() => {
    return {
      width: 1,
      height: 0.7,
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

  const stateRef = React.useRef({ shift: false });

  type Layout = Array<
    Array<Array<{ label: string; value?: string; spanCols?: number } | null>>
  >;

  const layout: Layout = React.useMemo(() => {
    return [
      [
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
      ],
      [
        [{ label: "⇥", value: "\t" }],
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
        [{ label: "⇧" }],
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
    ctx.fillStyle = "crimson";
    ctx.fillRect(0, 0, w, h);

    // Layout
    layout.forEach((cols, rowIndex) => {
      cols.forEach((keys, colIndex) => {
        let key = keys[0];
        if (stateRef.current.shift) {
          key = keys[1] ?? keys[0];
        }
        if (key === null) return;
        if (key.value === undefined) return;
        const spanCols = key.spanCols ?? 1;
        const cx = keySize * spanCols;
        const cy = 0;
        const x = keySize * colIndex;
        const y = keySize * rowIndex;
        ctx.fillStyle = "#555555";
        ctx.fillRect(x, y, keySize * spanCols, keySize);
        ctx.font = `12px system-ui`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(key.value, x, y);
      });
    });

    // Paint
    mesh.material.map.needsUpdate = true;
  });

  return (
    <Interaction>
      <Layer width={1} aspectRatio={1}>
        <mesh ref={meshRef} scale={settings.scale}>
          <planeGeometry args={[settings.width, settings.height]} />
          <meshBasicMaterial>
            <canvasTexture attach="map" image={ctx.canvas} />
          </meshBasicMaterial>
        </mesh>
      </Layer>
    </Interaction>
  );
}
