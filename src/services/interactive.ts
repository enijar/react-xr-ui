import * as THREE from "three";
import { XRController } from "@react-three/xr";

type Interaction = {
  uuid: string;
  object?: THREE.Object3D;
  onPointerMove?: (...args: any[]) => void;
  onPointerOver?: (...args: any[]) => void;
  onPointerOut?: (...args: any[]) => void;
  onPointerDown?: (...args: any[]) => void;
  onPointerUp?: (...args: any[]) => void;
};

type Interactive = {
  disabled: boolean;
  enabled: boolean;
  lastInteractionUuid: string;
  interactions: Interaction[];
  interactionsState: {
    [uuid: string]: {
      downFired: boolean;
      upFired: boolean;
      overFired: boolean;
      outFired: boolean;
    };
  };
  pointerDown: boolean;
  cleanUp: boolean;
  cleanDown: boolean;
  cleanMove: boolean;
  create: () => void;
  add: (interaction: Interaction) => void;
  remove: (uuid: string) => void;
  handle: (camera: THREE.PerspectiveCamera, raycaster: THREE.Raycaster) => void;
  update: (
    camera: THREE.Camera,
    raycaster: THREE.Raycaster,
    controllers: XRController[]
  ) => void;
};

const matrix = new THREE.Matrix4();

function hasPointerEvent(interaction: Interaction): boolean {
  return (
    interaction.onPointerMove !== undefined ||
    interaction.onPointerOver !== undefined ||
    interaction.onPointerOut !== undefined ||
    interaction.onPointerDown !== undefined ||
    interaction.onPointerUp !== undefined
  );
}

function firePointerOver(interaction: Interaction): boolean {
  if (!interaction.object) return;
  const state = interactive.interactionsState[interaction.object.uuid];
  return !state.overFired;
}

function firePointerOut(interaction: Interaction): boolean {
  if (!interaction.object) return;
  const state = interactive.interactionsState[interaction.object.uuid];
  return state.overFired && !state.outFired;
}

function firePointerDown(interaction: Interaction): boolean {
  if (!interactive.pointerDown) return false;
  if (!interaction.object) return;
  const state = interactive.interactionsState[interaction.object.uuid];
  return !state.downFired;
}

function firePointerUp(interaction: Interaction): boolean {
  if (interactive.pointerDown) return false;
  if (!interaction.object) return;
  const state = interactive.interactionsState[interaction.object.uuid];
  return state.downFired && !state.upFired;
}

function firePointerMove(interaction: Interaction): boolean {
  return true;
}

const interactive: Interactive = {
  disabled: false,
  enabled: true,
  lastInteractionUuid: "",
  interactions: [],
  interactionsState: {},
  pointerDown: false,
  cleanUp: false,
  cleanDown: false,
  cleanMove: false,
  create() {
    function onMove() {
      interactive.enabled = true;
      interactive.cleanMove = true;
    }

    function onDown() {
      interactive.enabled = true;
      interactive.pointerDown = true;
      interactive.cleanDown = true;
    }

    function onUp() {
      interactive.pointerDown = false;
      interactive.cleanUp = true;
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  },
  add(interaction) {
    if (!hasPointerEvent(interaction)) return;
    const index = interactive.interactions.findIndex((item) => {
      return item.object?.uuid === interaction.object?.uuid;
    });
    if (index === -1 && interaction.object) {
      interactive.interactionsState[interaction.object.uuid] = {
        downFired: false,
        upFired: false,
        overFired: false,
        outFired: false,
      };
      interactive.interactions.push(interaction);
    }
  },
  remove(uuid) {
    const index = interactive.interactions.findIndex((item) => {
      return item.uuid === uuid;
    });
    if (index > -1) {
      interactive.interactions.splice(index, 1);
      document.body.style.cursor = "auto";
    }
  },
  handle(camera, raycaster) {
    for (let i = 0, length = interactive.interactions.length; i < length; i++) {
      const interaction = interactive.interactions[i];
      if (!interaction.object) continue;
      const intersects = raycaster.intersectObject(interaction.object, true);
      if (intersects.length === 0) {
        if (firePointerOut(interaction)) {
          interactive.interactionsState[interaction.object.uuid].outFired =
            true;
          interactive.interactionsState[interaction.object.uuid].overFired =
            false;
          if (interaction.onPointerOut !== undefined) {
            interaction.onPointerOut();
            document.body.style.cursor = "auto";
          }
        }
        continue;
      }
      const intersect = intersects.sort((a, b) => a.distance - b.distance)[0];
      if (firePointerOver(interaction)) {
        interactive.interactionsState[interaction.object.uuid].overFired = true;
        interactive.interactionsState[interaction.object.uuid].outFired = false;
        if (interaction.onPointerOver !== undefined) {
          interaction.onPointerOver(intersect);
          document.body.style.cursor = "pointer";
        }
      }
      if (firePointerDown(interaction)) {
        interactive.interactionsState[interaction.object.uuid].downFired = true;
        if (interaction.onPointerDown !== undefined) {
          interaction.onPointerDown(intersect);
        }
      }
      if (firePointerUp(interaction)) {
        interactive.interactionsState[interaction.object.uuid].upFired = true;
        if (interaction.onPointerUp !== undefined) {
          interaction.onPointerUp(intersect);
          document.body.style.cursor = "auto";
        }
      }
      if (firePointerMove(interaction)) {
        if (interaction.onPointerMove !== undefined) {
          interaction.onPointerMove(intersect);
        }
      }
    }
  },
  update(
    camera: THREE.PerspectiveCamera,
    raycaster: THREE.Raycaster,
    controllers: XRController[]
  ) {
    if (!interactive.enabled || interactive.disabled) return;

    if (controllers.length > 0) {
      for (let i = 0, length = controllers.length; i < length; i++) {
        if (controllers[i].inputSource.handedness !== "right") continue;
        const controller = controllers[i].controller;
        matrix.identity().extractRotation(controller.matrixWorld);
        raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(matrix);
      }
      interactive.handle(camera, raycaster);
    } else {
      interactive.handle(camera, raycaster);
    }

    if (interactive.cleanUp && !interactive.pointerDown) {
      interactive.cleanUp = false;
      for (const uuid in interactive.interactionsState) {
        if (!interactive.interactionsState.hasOwnProperty(uuid)) {
          continue;
        }
        interactive.interactionsState[uuid].upFired = false;
        interactive.interactionsState[uuid].downFired = false;
      }
    }

    if (interactive.cleanDown && interactive.pointerDown) {
      interactive.cleanDown = false;
    }
  },
};

export default interactive;
