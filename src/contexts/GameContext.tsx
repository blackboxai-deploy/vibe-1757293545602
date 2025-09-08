"use client"

import React, { createContext, useContext, useReducer, useCallback } from 'react'

// Tipos para o jogo de xadrez
export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
export type PieceColor = 'white' | 'black'
export type GameStatus = 'waiting' | 'playing' | 'check' | 'checkmate' | 'draw' | 'finished'

export interface ChessPiece {
  type: PieceType
  color: PieceColor
  position: [number, number]
  hasMoved?: boolean
}

export interface GameMove {
  from: [number, number]
  to: [number, number]
  piece: ChessPiece
  capturedPiece?: ChessPiece
  timestamp: number
  notation: string
}

export interface GameRoom {
  id: string
  name: string
  players: {
    white?: string
    black?: string
  }
  spectators: string[]
  status: GameStatus
  timeLimit?: number
  isPrivate: boolean
  createdAt: number
}

export interface GameState {
  // Estado do tabuleiro
  board: (ChessPiece | null)[][]
  currentPlayer: PieceColor
  gameStatus: GameStatus
  moves: GameMove[]
  
  // Estado da sala
  currentRoom?: GameRoom
  playerColor?: PieceColor
  playerName?: string
  
  // Estado da interface
  selectedSquare?: [number, number]
  possibleMoves: [number, number][]
  isInCheck: boolean
  
  // Estado de aprendizado
  tutorialProgress: number
  completedLessons: string[]
  
  // Configurações
  showCoordinates: boolean
  playSound: boolean
  theme: 'light' | 'dark'
}

type GameAction = 
  | { type: 'INIT_BOARD' }
  | { type: 'SELECT_SQUARE', position: [number, number] }
  | { type: 'MOVE_PIECE', from: [number, number], to: [number, number] }
  | { type: 'SET_CURRENT_PLAYER', player: PieceColor }
  | { type: 'SET_GAME_STATUS', status: GameStatus }
  | { type: 'JOIN_ROOM', room: GameRoom, playerName: string, color: PieceColor }
  | { type: 'LEAVE_ROOM' }
  | { type: 'UPDATE_ROOM', room: GameRoom }
  | { type: 'SET_POSSIBLE_MOVES', moves: [number, number][] }
  | { type: 'SET_CHECK_STATUS', isInCheck: boolean }
  | { type: 'ADD_MOVE', move: GameMove }
  | { type: 'UPDATE_TUTORIAL_PROGRESS', progress: number }
  | { type: 'COMPLETE_LESSON', lessonId: string }
  | { type: 'TOGGLE_SETTING', setting: keyof Pick<GameState, 'showCoordinates' | 'playSound'> }
  | { type: 'SET_THEME', theme: 'light' | 'dark' }

// Estado inicial do tabuleiro de xadrez
const createInitialBoard = (): (ChessPiece | null)[][] => {
  const board: (ChessPiece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null))
  
  // Peças brancas
  board[7] = [
    { type: 'rook', color: 'white', position: [7, 0] },
    { type: 'knight', color: 'white', position: [7, 1] },
    { type: 'bishop', color: 'white', position: [7, 2] },
    { type: 'queen', color: 'white', position: [7, 3] },
    { type: 'king', color: 'white', position: [7, 4] },
    { type: 'bishop', color: 'white', position: [7, 5] },
    { type: 'knight', color: 'white', position: [7, 6] },
    { type: 'rook', color: 'white', position: [7, 7] },
  ]
  
  // Peões brancos
  for (let i = 0; i < 8; i++) {
    board[6][i] = { type: 'pawn', color: 'white', position: [6, i] }
  }
  
  // Peças pretas
  board[0] = [
    { type: 'rook', color: 'black', position: [0, 0] },
    { type: 'knight', color: 'black', position: [0, 1] },
    { type: 'bishop', color: 'black', position: [0, 2] },
    { type: 'queen', color: 'black', position: [0, 3] },
    { type: 'king', color: 'black', position: [0, 4] },
    { type: 'bishop', color: 'black', position: [0, 5] },
    { type: 'knight', color: 'black', position: [0, 6] },
    { type: 'rook', color: 'black', position: [0, 7] },
  ]
  
  // Peões pretos
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black', position: [1, i] }
  }
  
  return board
}

const initialState: GameState = {
  board: createInitialBoard(),
  currentPlayer: 'white',
  gameStatus: 'waiting',
  moves: [],
  selectedSquare: undefined,
  possibleMoves: [],
  isInCheck: false,
  tutorialProgress: 0,
  completedLessons: [],
  showCoordinates: true,
  playSound: true,
  theme: 'light'
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INIT_BOARD':
      return {
        ...state,
        board: createInitialBoard(),
        currentPlayer: 'white',
        gameStatus: 'waiting',
        moves: [],
        selectedSquare: undefined,
        possibleMoves: [],
        isInCheck: false
      }
      
    case 'SELECT_SQUARE':
      return {
        ...state,
        selectedSquare: action.position,
        possibleMoves: [] // Será calculado pela lógica do jogo
      }
      
    case 'MOVE_PIECE':
      // Esta lógica será expandida com validação completa
      const newBoard = state.board.map(row => [...row])
      const piece = newBoard[action.from[0]][action.from[1]]
      
      if (piece) {
        newBoard[action.to[0]][action.to[1]] = { ...piece, position: action.to }
        newBoard[action.from[0]][action.from[1]] = null
      }
      
      return {
        ...state,
        board: newBoard,
        selectedSquare: undefined,
        possibleMoves: [],
        currentPlayer: state.currentPlayer === 'white' ? 'black' : 'white'
      }
      
    case 'SET_CURRENT_PLAYER':
      return { ...state, currentPlayer: action.player }
      
    case 'SET_GAME_STATUS':
      return { ...state, gameStatus: action.status }
      
    case 'JOIN_ROOM':
      return {
        ...state,
        currentRoom: action.room,
        playerName: action.playerName,
        playerColor: action.color,
        gameStatus: 'waiting'
      }
      
    case 'LEAVE_ROOM':
      return {
        ...state,
        currentRoom: undefined,
        playerName: undefined,
        playerColor: undefined,
        gameStatus: 'waiting'
      }
      
    case 'UPDATE_ROOM':
      return { ...state, currentRoom: action.room }
      
    case 'SET_POSSIBLE_MOVES':
      return { ...state, possibleMoves: action.moves }
      
    case 'SET_CHECK_STATUS':
      return { ...state, isInCheck: action.isInCheck }
      
    case 'ADD_MOVE':
      return {
        ...state,
        moves: [...state.moves, action.move]
      }
      
    case 'UPDATE_TUTORIAL_PROGRESS':
      return { ...state, tutorialProgress: action.progress }
      
    case 'COMPLETE_LESSON':
      return {
        ...state,
        completedLessons: [...state.completedLessons, action.lessonId]
      }
      
    case 'TOGGLE_SETTING':
      return {
        ...state,
        [action.setting]: !state[action.setting]
      }
      
    case 'SET_THEME':
      return { ...state, theme: action.theme }
      
    default:
      return state
  }
}

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  
  // Ações convenientes
  initBoard: () => void
  selectSquare: (position: [number, number]) => void
  movePiece: (from: [number, number], to: [number, number]) => void
  joinRoom: (room: GameRoom, playerName: string, color: PieceColor) => void
  leaveRoom: () => void
  updateTutorialProgress: (progress: number) => void
  completeLesson: (lessonId: string) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  
  // Ações convenientes
  const initBoard = useCallback(() => {
    dispatch({ type: 'INIT_BOARD' })
  }, [])
  
  const selectSquare = useCallback((position: [number, number]) => {
    dispatch({ type: 'SELECT_SQUARE', position })
  }, [])
  
  const movePiece = useCallback((from: [number, number], to: [number, number]) => {
    dispatch({ type: 'MOVE_PIECE', from, to })
  }, [])
  
  const joinRoom = useCallback((room: GameRoom, playerName: string, color: PieceColor) => {
    dispatch({ type: 'JOIN_ROOM', room, playerName, color })
  }, [])
  
  const leaveRoom = useCallback(() => {
    dispatch({ type: 'LEAVE_ROOM' })
  }, [])
  
  const updateTutorialProgress = useCallback((progress: number) => {
    dispatch({ type: 'UPDATE_TUTORIAL_PROGRESS', progress })
  }, [])
  
  const completeLesson = useCallback((lessonId: string) => {
    dispatch({ type: 'COMPLETE_LESSON', lessonId })
  }, [])
  
  const value: GameContextType = {
    state,
    dispatch,
    initBoard,
    selectSquare,
    movePiece,
    joinRoom,
    leaveRoom,
    updateTutorialProgress,
    completeLesson
  }
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}