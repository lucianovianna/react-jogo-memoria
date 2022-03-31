import { useEffect, useState } from 'react';
import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';
import { Buttom } from './components/Buttom';
import { InfoItem } from './components/InfoItem';
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';

const App = () => {

  const [playing, setPlaying] = useState<Boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<Number>(0);
  const [moveCount, setMoveCount] = useState<Number>(0);
  const [shownCount, setShownCount] = useState<Number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);
  
  useEffect(() => resetAndCreateGrid(), []);

  const resetAndCreateGrid = () => {
    // Reseta o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // Cria o grid
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      });
    }

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }

    setGridItems(tmpGrid);
    
    // Começa o jogo
    setPlaying(true);
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value="00:00" />
          <InfoItem label="Movimentos" value="0" />
        </C.InfoArea>

        <Buttom label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
      </C.Info>

      <C.GridArea>
        <C.Grid>

        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;