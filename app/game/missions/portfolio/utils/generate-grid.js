const generateRandomArray = () => {
    const array = Array(30).fill("blank");
    
    const verticalStart = Math.floor(Math.random() * 20);

    for (let i = 0; i < 3; i++) {
      array[verticalStart + i * 5] = "filled";
    }
    const filledBlocks = [0, 1].map(() => {
      let blockStart;
      do {
        blockStart = Math.floor(Math.random() * 28);
      } while (
        array.slice(blockStart, blockStart + 3).includes("filled") || 
        blockStart % 5 >= 3
      );
      for (let i = 0; i < 3; i++) {
        array[blockStart + i] = "filled";
      }
    });

    return array;
  }

  export default generateRandomArray;