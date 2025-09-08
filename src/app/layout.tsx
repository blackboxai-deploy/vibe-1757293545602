import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/layout/Navigation"
import { GameProvider } from "@/contexts/GameContext"
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ChessAcademy - Aprenda e Jogue Xadrez Online",
  description: "Plataforma completa para aprender xadrez com tutoriais interativos e jogar online com outros usuários. Aprenda desde o básico até estratégias avançadas.",
  keywords: ["xadrez", "chess", "ensino", "tutorial", "jogo online", "estratégia"],
  authors: [{ name: "ChessAcademy" }],
  openGraph: {
    title: "ChessAcademy - Aprenda e Jogue Xadrez Online",
    description: "Plataforma completa para aprender e jogar xadrez online",
    type: "website",
    locale: "pt_BR",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GameProvider>
            <div className="min-h-screen bg-background flex flex-col">
              <Navigation />
              <main className="flex-1">
                {children}
              </main>
              <footer className="border-t bg-card">
                <div className="container mx-auto px-4 py-6">
                  <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>© 2024 ChessAcademy. Todos os direitos reservados.</p>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                      <span>Feito com ❤️ para amantes do xadrez</span>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}