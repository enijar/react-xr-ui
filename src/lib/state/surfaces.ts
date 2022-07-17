type Surface = {
  id: string;
  width: number;
  height: number;
};

const surfaces: { [parentId: string]: Surface[] } = {};

export default surfaces;
