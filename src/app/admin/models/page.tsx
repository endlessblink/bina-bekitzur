"use client"

import { useEffect, useState } from "react"
import { getModels, updateModel, deleteModel } from "@/lib/supabase"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const PRICING_OPTIONS = [
  { value: "free", label: "חינמי" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "בתשלום" }
]

export default function AdminModelsPage() {
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingModel, setEditingModel] = useState(null)

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      const data = await getModels()
      setModels(data.map(model => ({
        ...model,
        pros: Array.isArray(model.pros) ? model.pros : [],
        cons: Array.isArray(model.cons) ? model.cons : []
      })))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (model) => {
    try {
      await updateModel(model.id, model)
      await fetchModels()
      setEditingModel(null)
    } catch (err) {
      console.error("Error saving model:", err)
    }
  }

  const handleDelete = async (id) => {
    if (confirm("האם אתה בטוח שברצונך למחוק מודל זה?")) {
      try {
        await deleteModel(id)
        await fetchModels()
      } catch (err) {
        console.error("Error deleting model:", err)
      }
    }
  }

  if (loading) return <div className="container py-8">טוען...</div>
  if (error) return <div className="container py-8 text-red-500">שגיאה: {error}</div>

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">ניהול מודלים</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {models?.map((model) => (
          <div key={model.id} className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              {model.favicon_url && (
                <img src={model.favicon_url} alt="" className="w-4 h-4" />
              )}
              <h2 className="text-lg font-semibold">{model.name}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{model.description}</p>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setEditingModel({
                    ...model,
                    pros: Array.isArray(model.pros) ? model.pros : [],
                    cons: Array.isArray(model.cons) ? model.cons : []
                  })}>
                    ערוך
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>עריכת מודל - {model.name}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label>שם</label>
                      <Input 
                        value={editingModel?.name || ""} 
                        onChange={(e) => setEditingModel({...editingModel, name: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label>תיאור</label>
                      <Textarea 
                        value={editingModel?.description || ""} 
                        onChange={(e) => setEditingModel({...editingModel, description: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label>יתרונות (אחד בכל שורה)</label>
                      <Textarea 
                        value={editingModel?.pros?.join("\n") || ""} 
                        onChange={(e) => setEditingModel({...editingModel, pros: e.target.value.split("\n")})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label>חסרונות (אחד בכל שורה)</label>
                      <Textarea 
                        value={editingModel?.cons?.join("\n") || ""} 
                        onChange={(e) => setEditingModel({...editingModel, cons: e.target.value.split("\n")})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label>לינק לאתר</label>
                      <Input 
                        value={editingModel?.website_url || ""} 
                        onChange={(e) => setEditingModel({...editingModel, website_url: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label>לינק לפאביקון</label>
                      <Input 
                        value={editingModel?.favicon_url || ""} 
                        onChange={(e) => setEditingModel({...editingModel, favicon_url: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label>תמחור</label>
                      <Select 
                        value={editingModel?.pricing || "free"}
                        onValueChange={(value) => setEditingModel({...editingModel, pricing: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PRICING_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setEditingModel(null)}>
                        ביטול
                      </Button>
                      <Button onClick={() => handleSave(editingModel)}>
                        שמור
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button 
                variant="outline" 
                size="sm"
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleDelete(model.id)}
              >
                מחק
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 