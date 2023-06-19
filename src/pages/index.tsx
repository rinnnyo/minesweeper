import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const normalBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const directions = [
    [1, -1],
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
  ];
  const board = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  const [bombMap, setBombMap] = useState(normalBoard);
  const [userimput, setUserimput] = useState(normalBoard);
  const newBombMap: number[][] = JSON.parse(JSON.stringify(bombMap));
  const newUserimput = JSON.parse(JSON.stringify(userimput));
  const setBombCount = () => newBombMap.flat().filter(Boolean).length;

  const bombCount = (a: number, b: number) => {
    let bombCounter = 0;
    for (const direction of directions) {
      if (
        newBombMap[a + direction[0]] !== undefined &&
        newBombMap[a + direction[0]][b + direction[1]] === 1
      ) {
        bombCounter += 1;
      }
    }
    return bombCounter;
  };
  const randam = (n: number) => Math.floor(Math.random() * n);
  const onClick = (x: number, y: number) => {
    console.log(x, y);

    if (bombMap[y][x] === 0) {
      newUserimput[y][x] = 1;
      setUserimput(newUserimput);
    }

    while (setBombCount() < 10) {
      newBombMap[y][x] = 1;
      newBombMap[randam(9)][randam(9)] = 1;
      newBombMap[y][x] = 0;
    }

    setBombMap(newBombMap);
  };
  const reBoard = (i: number, j: number) => {
    board[i][j] = bombCount(i, j);
    if (board[i][j] === 0) {
      for (const direction of directions) {
        if (
          board[i + direction[0]] !== undefined &&
          board[i + direction[0]][j + direction[1]] === -1
        ) {
          reBoard(i + direction[0], j + direction[1]);
        }
      }
    }
  };
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (userimput[i][j] === 1) {
        reBoard(i, j);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((type, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              onClick={() => onClick(x, y)}
              style={{
                backgroundPositionX: 30 - type * 30,
                border: type === -1 ? 5 : 1,
                borderStyle: type === -1 ? 'outset' : 'solid',
                backgroundColor: type !== -1 ? 'grey' : 'lightgrey',
              }}
            >
              {/* {type !== 0 && <div className={styles.stone} />} */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
