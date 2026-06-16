import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Trophy, Shuffle } from 'lucide-react';
import { useTicTacToe } from './hooks/useTicTacToe';

const PRIMARY_BTN: React.CSSProperties = {
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  fontFamily: "inherit",
  borderRadius: "16px",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  background: "linear-gradient(140deg, #f2d389, #d4b466, #b8923a)",
  color: "#1a1a1a",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "16px",
  padding: "14px 28px",
  boxShadow: "0 10px 35px -8px rgba(212,180,102,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
};

const SECONDARY_BTN: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.14)",
  cursor: "pointer",
  fontWeight: 600,
  fontFamily: "inherit",
  borderRadius: "16px",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  background: "rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.9)",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  padding: "10px 18px",
  backdropFilter: "blur(10px)",
};

const GLASS_PANEL: React.CSSProperties = {
  position: "relative",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(40px) saturate(130%)",
  WebkitBackdropFilter: "blur(40px) saturate(130%)",
  borderRadius: "32px",
  padding: "32px",
  boxShadow: "0 24px 80px -20px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
  textAlign: "center",
};

const OVERLAY_GRADIENT: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "32px",
  background: "linear-gradient(140deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 35%, transparent 50%)",
  pointerEvents: "none",
};

const CELL_BASE: React.CSSProperties = {
  width: "100%",
  aspectRatio: "1",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.04)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem",
  fontWeight: 800,
  color: "white",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  fontFamily: "ui-monospace, SFMono-Regular, monospace",
};

function App() {
  const {
    board,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    scores,
    gameActive,
    makeMove,
    resetGame,
    resetScores,
  } = useTicTacToe();

  const handleCellClick = (index: number) => {
    makeMove(index);
  };

  const getCellStyle = (index: number): React.CSSProperties => {
    const baseStyle = { ...CELL_BASE };
    const isWinningCell = winningLine?.includes(index);

    if (isWinningCell) {
      baseStyle.background = "linear-gradient(140deg, rgba(212,180,102,0.3), rgba(242,211,137,0.2))";
      baseStyle.boxShadow = "0 0 30px rgba(212,180,102,0.3)";
    }

    return baseStyle;
  };

  const getSymbolColor = (symbol: string | null): string => {
    if (symbol === 'X') return "#38bdf8";
    if (symbol === 'O') return "#f472b6";
    return "rgba(255,255,255,0.5)";
  };

  const getStatusText = (): string => {
    if (winner) return `${winner} Wins!`;
    if (isDraw) return "It's a Draw!";
    return `${currentPlayer}'s Turn`;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 16px", background: "#090b10" }}>
      <motion.div
        style={{ textAlign: "center", marginBottom: "40px" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: 900, letterSpacing: "-0.025em", margin: 0, background: "linear-gradient(to right, #fde68a, #facc15, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
          Tic Tac Toe
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginTop: "8px", fontWeight: 500, letterSpacing: "0.05em" }}>
          Player vs Player
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ width: "100%", maxWidth: "28rem" }}
      >
        <div style={GLASS_PANEL}>
          <div style={OVERLAY_GRADIENT} />

          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "24px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#38bdf8", marginBottom: "4px" }}>Player X</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "ui-monospace, SFMono-Regular, monospace", color: "#38bdf8" }}>{scores.X}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>Draws</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "ui-monospace, SFMono-Regular, monospace", color: "rgba(255,255,255,0.5)" }}>{scores.draws}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#f472b6", marginBottom: "4px" }}>Player O</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "ui-monospace, SFMono-Regular, monospace", color: "#f472b6" }}>{scores.O}</div>
            </div>
          </div>

          <div style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "20px", minHeight: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={winner || isDraw ? 'end' : currentPlayer}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{ color: winner ? "#34d399" : isDraw ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.9)" }}
              >
                {getStatusText()}
                {winner && <Trophy size={16} style={{ marginLeft: "6px" }} />}
              </motion.span>
            </AnimatePresence>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              maxWidth: "320px",
              margin: "0 auto",
            }}
          >
            {board.map((cell, index) => (
              <motion.button
                key={index}
                onClick={() => handleCellClick(index)}
                style={getCellStyle(index)}
                disabled={cell !== null || !gameActive}
                whileHover={cell === null && gameActive ? { scale: 1.03, background: "rgba(255,255,255,0.08)" } : {}}
                whileTap={cell === null && gameActive ? { scale: 0.97 } : {}}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
              >
                <AnimatePresence mode="wait">
                  {cell && (
                    <motion.span
                      key={cell}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ color: getSymbolColor(cell), display: "flex" }}
                    >
                      {cell === 'X' ? <X size={32} strokeWidth={3} /> : <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>O</span>}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ display: "flex", gap: "12px", marginTop: "24px" }}
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={resetGame}
          style={PRIMARY_BTN}
        >
          <RotateCcw size={16} strokeWidth={2.5} />
          New Game
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={resetScores}
          style={SECONDARY_BTN}
        >
          <Shuffle size={16} strokeWidth={2.5} />
          Reset Scores
        </motion.button>
      </motion.div>
    </div>
  );
}

export default App;
