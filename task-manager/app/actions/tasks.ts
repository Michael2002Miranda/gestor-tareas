"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = formData.get("priority") as "low" | "medium" | "high"
  const due_date = formData.get("due_date") as string

  // En una app real, obtendrías el user_id del usuario autenticado
  // Por ahora usamos un placeholder
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Usuario no autenticado" }
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        title,
        description: description || null,
        priority,
        due_date: due_date || null,
        user_id: user.id,
      },
    ])
    .select()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true, data }
}

export async function toggleTask(taskId: string, completed: boolean) {
  const { error } = await supabase
    .from("tasks")
    .update({ completed, updated_at: new Date().toISOString() })
    .eq("id", taskId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function getTasks() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Usuario no autenticado" }
  }

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data }
}
