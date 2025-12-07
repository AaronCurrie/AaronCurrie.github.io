const generateGrid = (GRID_SIZE) => {
    const nodeTypes = ['xp', 'setback', 'big-setback', 'setback', 'warp', 'shield', 'dead'];
    const grid = Array(GRID_SIZE).fill(null).map(() =>
      Array(5).fill(null).map(() => {
        const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
        return {
          type,
          visited: false,
          revealed: false,
          reachable: false,
          score: type === 'xp' ? 50 : type === 'shield' ? -25 : type === 'big-setback' ? -50 : type === 'setback' ? -25 : type === 'warp' ? -25 : 0,
        };
      })
    );
    grid[0][3] = {...grid[0][3], reachable: true };
    grid[0][1] = {...grid[0][1], reachable: true };
    grid[1][2] = {...grid[1][2], reachable: true };
    grid[0][2] = { type: 'start', visited: true, reachable: false };
    grid[GRID_SIZE - 1][5 - 1] = { type: 'final', visited: false, revealed: true, score: -100 };
    return grid;
  };

export default generateGrid