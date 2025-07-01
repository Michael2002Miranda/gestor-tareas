import { getTasks } from "@/app/actions/tasks"
import { AddTaskForm } from "@/components/add-task-form"
import { TaskList } from "@/components/task-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Clock, AlertCircle } from "lucide-react"

export default async function DashboardPage() {
  const result = await getTasks()

  if (result.error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p className="text-red-500">Error: {result.error}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Asegúrate de estar autenticado y tener Supabase configurado
          </p>
        </div>
      </div>
    )
  }

  const tasks = result.data || []
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = tasks.filter((task) => !task.completed).length
  const highPriorityTasks = tasks.filter((task) => task.priority === "high" && !task.completed).length

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestor de Tareas</h1>
        <p className="text-muted-foreground">{tasks.length} tareas totales</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alta Prioridad</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highPriorityTasks}</div>
          </CardContent>
        </Card>
      </div>

      {/* Formulario para añadir tareas */}
      <AddTaskForm />

      {/* Lista de tareas */}
      <TaskList tasks={tasks} />
    </div>
  )
}
