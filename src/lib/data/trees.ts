// export const TREE_1 = '/assets/34M_17/34M_17.gltf';
const TREES = [
	{
		src: '/assets/tree_1/scene.gltf',
		customScale: 0.05
	},
	{
		src: '/assets/tree_2/scene.gltf',
		customScale: 0.07
	}
];

export const getRandomTree = (id: number) => {
	const index = id % TREES.length; // cycles through 0,1,...TREES.length-1
	return TREES[index];
};
