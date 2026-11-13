import { useEffect } from 'react';
import { FallingLeaves } from 'falling-leaves/react';
import TerminalShell from './components/TerminalShell.jsx';
import AmbientLyrics from './features/AmbientLyrics.jsx';
import { mountPortfolioTerminal } from './terminal/engine.js';

export default function App() {
  useEffect(() => mountPortfolioTerminal(), []);

  return (
    <>
      <TerminalShell />
      <AmbientLyrics />
      <FallingLeaves
        fullScreen
        shapes={['maple']}
        count={25}
        opacity={0.7}
      />
    </>
  );
}
