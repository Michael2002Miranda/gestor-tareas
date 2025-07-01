"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Calendar } from "lucide-react"
import { toggleTask, deleteTask } from "@/app/actions/tasks"
import type { Task } from "@/lib/supabase"

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  const [loadingTasks, setLoadingTasks] = useState<Set<string>>(new Set())

  async function handleToggle(taskId: string, completed: boolean) {
    setLoadingTasks((prev) => new Set(prev).add(taskId))
    await toggleTask(taskId, !completed)
    setLoadingTasks((prev) => {
      const newSet = new Set(prev)
      newSet.delete(taskId)
      return newSet
    })
  }

  async function handleDelete(taskId: string) {
    setLoadingTasks((prev) => new Set(prev).add(taskId))
    await deleteTask(taskId)
    setLoadingTasks((prev) => {
      const newSet = new Set(prev)
      newSet.delete(taskId)
      return newSet
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Media"
      case "low":
        return "Baja"
      default:
        return priority
    }
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground">No tienes tareas aún</p>
          <p className="text-sm text-muted-foreground">¡Crea tu primera tarea arriba!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className={task.completed ? "opacity-60" : ""}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleToggle(task.id, task.completed)}
                disabled={loadingTasks.has(task.id)}
              />

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(task.priority)}>{getPriorityText(task.priority)}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(task.id)}
                      disabled={loadingTasks.has(task.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {task.due_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(task.due_date).toLocaleDateString()}
                    </div>
                  )}
                  <span>Creada: {new Date(task.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
