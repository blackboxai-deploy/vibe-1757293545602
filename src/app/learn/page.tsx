"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tutorial } from '@/components/learn/Tutorial'
import { useGame } from '@/contexts/GameContext'

// Definição das lições
interface Lesson {
  id: string
  title: string
  description: string
  level: 'basic' | 'intermediate' | 'advanced'
  duration: string
  topics: string[]
  completed?: boolean
}

const lessons: Lesson[] = [
  {
    id: 'basic-1',
    title: 'O Tabuleiro de Xadrez',
    description: 'Aprenda sobre as 64 casas, coordenadas e como o tabuleiro é organizado',
    level: 'basic',
    duration: '5 min',
    topics: ['Tabuleiro', 'Coordenadas', 'Casas claras e escuras']
  },
  {
    id: 'basic-2',
    title: 'As Peças e Seus Movimentos',
    description: 'Conheça cada peça e como ela se move pelo tabuleiro',
    level: 'basic',
    duration: '10 min',
    topics: ['Peão', 'Torre', 'Bispo', 'Cavalo', 'Dama', 'Rei']
  },
  {
    id: 'basic-3',
    title: 'Objetivo do Jogo',
    description: 'Entenda o que é xeque, xeque-mate e como vencer uma partida',
    level: 'basic',
    duration: '8 min',
    topics: ['Xeque', 'Xeque-mate', 'Empate', 'Vitória']
  },
  {
    id: 'basic-4',
    title: 'Movimentos Especiais',
    description: 'Aprenda sobre roque, en passant e promoção do peão',
    level: 'basic',
    duration: '12 min',
    topics: ['Roque', 'En passant', 'Promoção']
  },
  {
    id: 'intermediate-1',
    title: 'Princípios de Abertura',
    description: 'Como começar bem uma partida de xadrez',
    level: 'intermediate',
    duration: '15 min',
    topics: ['Desenvolvimento', 'Centro', 'Segurança do rei']
  },
  {
    id: 'intermediate-2',
    title: 'Táticas Básicas',
    description: 'Garfo, cravada, descoberta e outras táticas essenciais',
    level: 'intermediate',
    duration: '20 min',
    topics: ['Garfo', 'Cravada', 'Descoberta', 'Duplo ataque']
  },
  {
    id: 'intermediate-3',
    title: 'Finais Básicos',
    description: 'Como finalizar partidas com vantagem material',
    level: 'intermediate',
    duration: '18 min',
    topics: ['Rei + Dama', 'Rei + Torre', 'Finais de peões']
  },
  {
    id: 'advanced-1',
    title: 'Estratégia no Meio-jogo',
    description: 'Planejamento e avaliação posicional',
    level: 'advanced',
    duration: '25 min',
    topics: ['Estrutura de peões', 'Peças ativas', 'Fraquezas']
  },
  {
    id: 'advanced-2',
    title: 'Aberturas Clássicas',
    description: 'Estudo das principais aberturas e seus planos',
    level: 'advanced',
    duration: '30 min',
    topics: ['Italiana', 'Espanhola', 'Francesa', 'Siciliana']
  },
  {
    id: 'advanced-3',
    title: 'Combinações Complexas',
    description: 'Cálculo de variantes e combinações avançadas',
    level: 'advanced',
    duration: '35 min',
    topics: ['Sacrifício', 'Combinação', 'Cálculo', 'Visualização']
  }
]

export default function LearnPage() {
  const { state, completeLesson } = useGame()
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  // Calcular estatísticas
  const basicLessons = lessons.filter(l => l.level === 'basic')
  const intermediateLessons = lessons.filter(l => l.level === 'intermediate')
  const advancedLessons = lessons.filter(l => l.level === 'advanced')

  const completedBasic = basicLessons.filter(l => state.completedLessons.includes(l.id)).length
  const completedIntermediate = intermediateLessons.filter(l => state.completedLessons.includes(l.id)).length
  const completedAdvanced = advancedLessons.filter(l => state.completedLessons.includes(l.id)).length

  const totalProgress = Math.round((state.completedLessons.length / lessons.length) * 100)

  const handleLessonComplete = (lessonId: string) => {
    completeLesson(lessonId)
    setSelectedLesson(null)
    setActiveTab('overview')
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getLevelText = (level: string) => {
    switch (level) {
      case 'basic': return 'Básico'
      case 'intermediate': return 'Intermediário'
      case 'advanced': return 'Avançado'
      default: return level
    }
  }

  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson)
    if (lesson) {
      return (
        <div className="container mx-auto px-4 py-8">
          <Tutorial 
            lesson={lesson}
            onComplete={() => handleLessonComplete(lesson.id)}
            onBack={() => setSelectedLesson(null)}
          />
        </div>
      )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Centro de Aprendizado</h1>
        <p className="text-lg text-muted-foreground">
          Aprenda xadrez do básico ao avançado com nossos tutoriais interativos
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8 bg-gradient-to-r from-primary/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏆</span>
            Seu Progresso Geral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Progresso Total</span>
              <span className="text-2xl font-bold text-primary">{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-green-600">{completedBasic}/{basicLessons.length}</div>
                <div className="text-sm text-muted-foreground">Básico</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{completedIntermediate}/{intermediateLessons.length}</div>
                <div className="text-sm text-muted-foreground">Intermediário</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-red-600">{completedAdvanced}/{advancedLessons.length}</div>
                <div className="text-sm text-muted-foreground">Avançado</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediário</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trilha de Aprendizado Recomendada</CardTitle>
                <CardDescription>
                  Siga esta sequência para obter o melhor aprendizado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons.slice(0, 6).map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        state.completedLessons.includes(lesson.id) 
                          ? 'bg-green-500 text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {state.completedLessons.includes(lesson.id) ? '✓' : index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{lesson.title}</h3>
                          <Badge className={getLevelColor(lesson.level)}>
                            {getLevelText(lesson.level)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{lesson.description}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-2">{lesson.duration}</div>
                        <Button 
                          size="sm"
                          onClick={() => setSelectedLesson(lesson.id)}
                          variant={state.completedLessons.includes(lesson.id) ? "outline" : "default"}
                        >
                          {state.completedLessons.includes(lesson.id) ? 'Revisar' : 'Começar'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="basic" className="mt-6">
          <LessonGrid 
            lessons={basicLessons} 
            completedLessons={state.completedLessons}
            onSelectLesson={setSelectedLesson}
          />
        </TabsContent>

        <TabsContent value="intermediate" className="mt-6">
          <LessonGrid 
            lessons={intermediateLessons} 
            completedLessons={state.completedLessons}
            onSelectLesson={setSelectedLesson}
          />
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <LessonGrid 
            lessons={advancedLessons} 
            completedLessons={state.completedLessons}
            onSelectLesson={setSelectedLesson}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LessonGrid({ 
  lessons, 
  completedLessons, 
  onSelectLesson 
}: { 
  lessons: Lesson[]
  completedLessons: string[]
  onSelectLesson: (id: string) => void
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lessons.map((lesson) => {
        const isCompleted = completedLessons.includes(lesson.id)
        
        return (
          <Card key={lesson.id} className={`hover:shadow-lg transition-all ${isCompleted ? 'border-green-200 dark:border-green-800' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                {isCompleted && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                )}
              </div>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duração: {lesson.duration}</span>
                  <Badge className="text-xs">
                    {lesson.level === 'basic' ? 'Básico' : 
                     lesson.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Tópicos abordados:</div>
                  <div className="flex flex-wrap gap-1">
                    {lesson.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => onSelectLesson(lesson.id)}
                  variant={isCompleted ? "outline" : "default"}
                >
                  {isCompleted ? 'Revisar Lição' : 'Começar Lição'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}