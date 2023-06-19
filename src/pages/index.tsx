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
    [-1, 0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, -1, -1],
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
  const newUserimput = JSON.parse(JSON.stringify(bombMap));
  const setBombCount = () => newBombMap.flat().filter(Boolean).length;
  const randam = (n: number) => Math.floor(Math.random() * n);
  const onClick = (x: number, y: number) => {
    console.log(x, y);

    while (setBombCount() < 10) {
      newBombMap[y][x] = 1;
      newBombMap[randam(9)][randam(9)] = 1;
      newBombMap[y][x] = 0;
      console.log(setBombCount);
    }

    setBombMap(newBombMap);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {newBombMap.map((row, y) =>
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
