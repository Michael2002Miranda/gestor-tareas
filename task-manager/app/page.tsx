import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Users, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Gestor de Tareas</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Organiza tu trabajo, aumenta tu productividad y nunca pierdas de vista tus objetivos.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-3">
              Ir al Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CheckSquare className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Gestión Simple</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Crea, edita y marca tareas como completadas con una interfaz intuitiva.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <CardTitle>Seguro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Tus datos están protegidos con autenticación y políticas de seguridad.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <CardTitle>Rápido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">Construido con Next.js y Supabase para máximo rendimiento.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500">Proyecto de ejemplo creado con v0 → GitHub → Vercel</p>
        </div>
      </div>
    </div>
  )
}
