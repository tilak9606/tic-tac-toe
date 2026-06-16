import { useState, useCallback } from 'react';
import { checkWinner, getWinningLine, isBoardFull } from '../utils/gameLogic';

interface GameState {
  board: (string | null)[];
  currentPlayer: 'X' | 'O';
  winner: string | null;
  winningLine: number[] | null;
  isDraw: boolean;
  scores: { X: number; O: number; draws: number };
  gameActive: boolean;
}

export function useTicTacToe() {
  const createEmptyBoard = () => Array(9).fill(null);

  const [state, setState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 'X',
    winner: null,
    winningLine: null,
    isDraw: false,
    scores: { X: 0, O: 0, draws: 0 },
    gameActive: true,
  });

  const makeMove = useCallback((index: number) => {
    setState(prev => {
      if (!prev.gameActive) return prev;
      if (prev.board[index] !== null) return prev;
      if (prev.winner !== null) return prev;

      const newBoard = [...prev.board];
      newBoard[index] = prev.currentPlayer;

      const winner = checkWinner(newBoard);
      const winningLine = winner ? getWinningLine(newBoard) : null;
      const isDraw = !winner && isBoardFull(newBoard);

      let newScores = prev.scores;
      if (winner) {
        newScores = {
          ...prev.scores,
          X: winner === 'X' ? prev.scores.X + 1 : prev.scores.X,
          O: winner === 'O' ? prev.scores.O + 1 : prev.scores.O,
          draws: prev.scores.draws,
        };
      } else if (isDraw) {
        newScores = { ...prev.scores, draws: prev.scores.draws + 1 };
      }

      const newCurrentPlayer = prev.currentPlayer === 'X' ? 'O' : 'X';

      return {
        ...prev,
        board: newBoard,
        currentPlayer: newCurrentPlayer,
        winner,
        winningLine,
        isDraw,
        scores: newScores,
        gameActive: winner === null && !isDraw,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      board: createEmptyBoard(),
      currentPlayer: 'X',
      winner: null,
      winningLine: null,
      isDraw: false,
      gameActive: true,
    }));
  }, []);

  const resetScores = useCallback(() => {
    setState(prev => ({
      ...prev,
      board: createEmptyBoard(),
      currentPlayer: 'X',
      winner: null,
      winningLine: null,
      isDraw: false,
      scores: { X: 0, O: 0, draws: 0 },
      gameActive: true,
    }));
  }, []);

  return {
    board: state.board,
    currentPlayer: state.currentPlayer,
    winner: state.winner,
    winningLine: state.winningLine,
    isDraw: state.isDraw,
    scores: state.scores,
    gameActive: state.gameActive,
    makeMove,
    resetGame,
    resetScores,
  };
}
