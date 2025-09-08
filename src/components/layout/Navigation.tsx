"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useTheme } from 'next-themes'
import { useGame } from '@/contexts/GameContext'

const navigationLinks = [
  { href: '/', label: 'Início' },
  { href: '/learn', label: 'Aprender' },
  { href: '/play', label: 'Jogar' },
  { href: '/rooms', label: 'Salas' },
]

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { state } = useGame()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm">
            ♔
          </div>
          <span className="hidden sm:inline-block">ChessAcademy</span>
          <span className="sm:hidden">CA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {state.currentRoom && (
            <div className="text-sm text-muted-foreground">
              Sala: {state.currentRoom.name}
            </div>
          )}
          
          {state.playerName && (
            <div className="text-sm font-medium">
              {state.playerName}
              {state.playerColor && (
                <span className="ml-1 text-xs text-muted-foreground">
                  ({state.playerColor === 'white' ? '⚪' : '⚫'})
                </span>
              )}
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-9 h-9 p-0"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="w-full h-0.5 bg-current"></div>
                  <div className="w-full h-0.5 bg-current"></div>
                  <div className="w-full h-0.5 bg-current"></div>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col space-y-4 mt-6">
                {/* User Info */}
                {state.playerName && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="font-medium">{state.playerName}</div>
                    {state.playerColor && (
                      <div className="text-sm text-muted-foreground">
                        {state.playerColor === 'white' ? 'Brancas ⚪' : 'Pretas ⚫'}
                      </div>
                    )}
                    {state.currentRoom && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Sala: {state.currentRoom.name}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Links */}
                <div className="space-y-2">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block p-3 rounded-lg text-sm font-medium transition-colors hover:bg-muted ${
                        pathname === link.href
                          ? 'bg-muted text-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Theme Toggle */}
                <Button
                  variant="outline"
                  onClick={toggleTheme}
                  className="justify-start"
                >
                  {theme === 'dark' ? '🌙' : '☀️'}
                  <span className="ml-2">
                    {theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}
                  </span>
                </Button>

                {/* Tutorial Progress */}
                {state.tutorialProgress > 0 && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm font-medium mb-2">Progresso no Tutorial</div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${state.tutorialProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {state.tutorialProgress}% completo
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="text-sm font-medium">Estatísticas</div>
                  <div className="text-xs text-muted-foreground">
                    Lições completas: {state.completedLessons.length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Jogos disputados: {state.moves.length > 0 ? 1 : 0}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Game Status Bar */}
      {state.gameStatus !== 'waiting' && (
        <div className="border-t bg-muted/50">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="font-medium">
                  Status: {getGameStatusText(state.gameStatus)}
                </span>
                <span className="text-muted-foreground">
                  Turno: {state.currentPlayer === 'white' ? 'Brancas' : 'Pretas'}
                  {state.currentPlayer === 'white' ? ' ⚪' : ' ⚫'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {state.isInCheck && (
                  <span className="text-yellow-600 font-medium">⚠️ Xeque</span>
                )}
                <span className="text-muted-foreground">
                  Movimentos: {state.moves.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function getGameStatusText(status: string): string {
  switch (status) {
    case 'playing': return 'Jogando'
    case 'check': return 'Xeque'
    case 'checkmate': return 'Xeque-mate'
    case 'draw': return 'Empate'
    case 'finished': return 'Finalizado'
    default: return 'Aguardando'
  }
}