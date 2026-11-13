function TitleBar() {
  return (
    <div className="titlebar">
      <div className="titlebar-buttons" aria-hidden="true">
        <div className="tb-btn close" />
        <div className="tb-btn min" />
        <div className="tb-btn max" />
      </div>
      <div className="titlebar-title">guest@vishwa: ~/portfolio — tty1</div>
      <div className="titlebar-info">80×24</div>
    </div>
  );
}

function TerminalViewport() {
  return (
    <div className="terminal" id="terminal">
      <div className="output" id="output" />
      <div className="prompt-line" id="prompt-line">
        <span id="prompt-prefix" className="prompt-prefix" />
        <span className="input-area">
          <span className="input-text" id="input-text" />
          <span className="ghost-text" id="ghost-text" />
          <span className="cursor" />
        </span>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="statusbar" aria-label="Terminal status">
      <div className="statusbar-section"><span className="sb-label">MODE</span><span id="status-mode">GUEST</span></div>
      <div className="statusbar-section"><span className="sb-label">CWD</span><span id="status-cwd">~/portfolio</span></div>
      <div className="statusbar-section"><span className="sb-label">ENC</span>UTF-8</div>
      <div className="statusbar-section" id="status-help">access required</div>
      <div className="statusbar-section"><span className="sb-label">⌚</span><span id="status-clock">00:00:00</span></div>
    </div>
  );
}

export default function TerminalShell() {
  return (
    <>
      <div className="bezel">
        <div className="screen" id="screen">
          <TitleBar />
          <div className="scanlines" id="scanlines" />
          <div className="flicker" />
          <div className="phosphor-hum" />
          <div className="vignette" />
          <TerminalViewport />
          <StatusBar />
        </div>
      </div>
      <input
        type="text"
        className="hidden-input"
        id="hidden-input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </>
  );
}
