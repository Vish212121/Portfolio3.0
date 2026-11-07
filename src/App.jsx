import { useEffect } from 'react';
import { FallingLeaves } from 'falling-leaves/react';
import TerminalShell from './components/TerminalShell.jsx';
import { mountPortfolioTerminal } from './terminal/engine.js';

export default function App() {
  useEffect(() => mountPortfolioTerminal(), []);

  return (
    <>
      <TerminalShell />
      <FallingLeaves
        fullScreen
        shapes={['maple']}
        count={25}
        opacity={0.7}
      />
    </>
  );
}