"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useGame } from '@/contexts/GameContext'

export default function HomePage() {
  const { state } = useGame()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 mb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            ChessAcademy
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Aprenda e jogue xadrez online
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Descubra o fascinante mundo do xadrez com nossos tutoriais interativos, 
            pratique com outros jogadores e melhore suas habilidades estratégicas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/learn">
              <Button size="lg" className="min-w-[200px]">
                🎓 Começar a Aprender
              </Button>
            </Link>
            <Link href="/play">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                ♟️ Jogar Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Por que escolher o ChessAcademy?</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Aprendizado Interativo */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <CardTitle>Aprendizado Interativo</CardTitle>
              <CardDescription>
                Tutoriais passo a passo com tabuleiro interativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Regras básicas e movimentos</li>
                <li>• Estratégias de abertura</li>
                <li>• Táticas e combinações</li>
                <li>• Finais de jogo</li>
              </ul>
            </CardContent>
          </Card>

          {/* Jogo Online */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <CardTitle>Jogo Online</CardTitle>
              <CardDescription>
                Jogue com pessoas do mundo todo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Partidas em tempo real</li>
                <li>• Sistema de salas</li>
                <li>• Chat com oponentes</li>
                <li>• Diferentes níveis</li>
              </ul>
            </CardContent>
          </Card>

          {/* Interface Moderna */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <CardTitle>Interface Moderna</CardTitle>
              <CardDescription>
                Design responsivo e intuitivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Tabuleiro interativo</li>
                <li>• Tema claro e escuro</li>
                <li>• Responsivo para mobile</li>
                <li>• Animações suaves</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Progress Section - Se houver progresso */}
      {(state.tutorialProgress > 0 || state.completedLessons.length > 0) && (
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🏆</span>
                Seu Progresso
              </CardTitle>
              <CardDescription>
                Continue de onde parou
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tutorial</span>
                    <span className="text-sm text-muted-foreground">
                      {state.tutorialProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${state.tutorialProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {state.completedLessons.length} lições completas
                  </Badge>
                  {state.moves.length > 0 && (
                    <Badge variant="secondary">
                      {state.moves.length} movimentos jogados
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link href="/learn">
                  <Button size="sm">Continuar Aprendendo</Button>
                </Link>
                <Link href="/play">
                  <Button variant="outline" size="sm">Praticar Jogando</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Getting Started Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Como Começar</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-primary-foreground font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-4">Aprenda as Regras</h3>
            <p className="text-muted-foreground mb-4">
              Comece com nossas lições básicas para entender como cada peça se move 
              e os objetivos do jogo.
            </p>
            <Link href="/learn">
              <Button variant="outline" size="sm">Ver Tutoriais</Button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-primary-foreground font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-4">Pratique</h3>
            <p className="text-muted-foreground mb-4">
              Aplique seus conhecimentos em partidas reais contra outros jogadores 
              online.
            </p>
            <Link href="/rooms">
              <Button variant="outline" size="sm">Ver Salas</Button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-primary-foreground font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-4">Melhore</h3>
            <p className="text-muted-foreground mb-4">
              Continue aprendendo táticas avançadas e estratégias para evoluir 
              seu jogo.
            </p>
            <Link href="/learn">
              <Button variant="outline" size="sm">Estratégias Avançadas</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Board Preview */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Experimente Nosso Tabuleiro</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Veja como é fácil e intuitivo jogar em nossa plataforma. 
            Tabuleiro responsivo com movimentos suaves e interface moderna.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <div className="aspect-square bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg p-4 mb-4">
              {/* Mini tabuleiro decorativo */}
              <div className="w-full h-full grid grid-cols-8 gap-0.5">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm flex items-center justify-center text-xs ${
                      (Math.floor(i / 8) + i) % 2 === 0
                        ? 'bg-amber-200 dark:bg-amber-700'
                        : 'bg-amber-300 dark:bg-amber-600'
                    }`}
                  >
                    {i < 16 || i >= 48 ? (
                      <span className="opacity-60">
                        {i === 0 || i === 7 || i === 56 || i === 63 ? '♜' :
                         i === 1 || i === 6 || i === 57 || i === 62 ? '♞' :
                         i === 2 || i === 5 || i === 58 || i === 61 ? '♝' :
                         i === 3 || i === 59 ? '♛' :
                         i === 4 || i === 60 ? '♚' :
                         i >= 8 && i <= 15 ? '♟' :
                         i >= 48 && i <= 55 ? '♙' : ''}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Tabuleiro interativo com peças arrastáveis
              </p>
              <Link href="/play">
                <Button>Começar a Jogar</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar sua jornada no xadrez?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Junte-se a milhares de jogadores que estão aprendendo e jogando xadrez 
          em nossa plataforma. É gratuito e fácil de usar!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/learn">
            <Button size="lg" className="min-w-[200px]">
              Começar Tutorial
            </Button>
          </Link>
          <Link href="/rooms">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              Encontrar Partida
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}