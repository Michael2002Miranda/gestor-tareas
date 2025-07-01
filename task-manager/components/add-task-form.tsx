"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { createTask } from "@/app/actions/tasks"
import { Plus } from "lucide-react"

export function AddTaskForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    const result = await createTask(formData)

    if (result.success) {
      setIsOpen(false)
      // Reset form
      const form = document.getElementById("task-form") as HTMLFormElement
      form?.reset()
    }

    setIsLoading(false)
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Añadir Nueva Tarea
      </Button>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nueva Tarea</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="task-form" action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" placeholder="Título de la tarea" required />
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" name="description" placeholder="Descripción opcional" rows={3} />
          </div>

          <div>
            <Label htmlFor="priority">Prioridad</Label>
            <Select name="priority" defaultValue="medium">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baja</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="due_date">Fecha límite</Label>
            <Input id="due_date" name="due_date" type="date" />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear Tarea"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
