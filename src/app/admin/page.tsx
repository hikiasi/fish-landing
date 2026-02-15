"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, LogOut, Package, ShoppingCart, Building2, Upload, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([])
  const [b2bProducts, setB2BProducts] = useState<any[]>([])
  const [selectedRetailIds, setSelectedRetailIds] = useState<string[]>([])
  const [selectedB2BIds, setSelectedB2BIds] = useState<string[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    price200: "",
    oldPrice: "",
    weight: "",
    category: "Филе и стейки",
    description: "",
    image: "",
    isHit: false,
    isNew: false,
    type: "retail"
  })
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  const fetchData = async () => {
    try {
      const [resRetail, resB2B, resOrders] = await Promise.all([
        fetch("/api/products?type=retail"),
        fetch("/api/products?type=b2b"),
        fetch("/api/orders")
      ])
      const dataRetail = await resRetail.json()
      const dataB2B = await resB2B.json()
      const dataOrders = await resOrders.json()

      setProducts(dataRetail.products || [])
      setB2BProducts(dataB2B || [])
      setOrders(dataOrders || [])
      setSelectedRetailIds([])
      setSelectedB2BIds([])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/login")
    router.push("/admin/login")
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const data = new FormData()
    data.set("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data
      })
      const result = await res.json()
      if (result.url) {
        if (isEdit) {
          setEditingProduct({ ...editingProduct, image: result.url })
        } else {
          setFormData({ ...formData, image: result.url })
        }
      }
    } catch (err) {
      alert("Ошибка при загрузке")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setFormData({
          name: "",
          price: "",
          price200: "",
          oldPrice: "",
          weight: "",
          category: formData.type === "retail" ? "Филе и стейки" : "Филе и стейки рыб",
          description: "",
          image: "",
          isHit: false,
          isNew: false,
          type: formData.type
        })
        fetchData()
      }
    } catch (err) {
      alert("Ошибка при добавлении")
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct)
      })
      if (res.ok) {
        setIsEditModalOpen(false)
        setEditingProduct(null)
        fetchData()
      }
    } catch (err) {
      alert("Ошибка при обновлении")
    }
  }

  const openEditModal = (product: any, type: string) => {
    setEditingProduct({ ...product, type })
    setIsEditModalOpen(true)
  }

  const handleDelete = async (id: string, type: string) => {
    if (!confirm("Удалить этот товар?")) return
    try {
      const res = await fetch(`/api/products/${id}?type=${type}`, { method: "DELETE" })
      if (res.ok) fetchData()
    } catch (err) {
      alert("Ошибка при удалении")
    }
  }

  const handleBulkDelete = async (type: string) => {
    const ids = type === 'retail' ? selectedRetailIds : selectedB2BIds
    if (!ids.length) return
    if (!confirm(`Удалить выбранные товары (${ids.length})?`)) return

    try {
      const res = await fetch(`/api/products?type=${type}&ids=${ids.join(",")}`, { method: "DELETE" })
      if (res.ok) fetchData()
    } catch (err) {
      alert("Ошибка при массовом удалении")
    }
  }

  const toggleSelectAll = (type: string) => {
    if (type === 'retail') {
      if (selectedRetailIds.length === products.length) {
        setSelectedRetailIds([])
      } else {
        setSelectedRetailIds(products.map(p => p.id))
      }
    } else {
      if (selectedB2BIds.length === b2bProducts.length) {
        setSelectedB2BIds([])
      } else {
        setSelectedB2BIds(b2bProducts.map(p => p.id))
      }
    }
  }

  const toggleSelect = (id: string, type: string) => {
    if (type === 'retail') {
      setSelectedRetailIds(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      )
    } else {
      setSelectedB2BIds(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      )
    }
  }

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      })
      if (res.ok) fetchData()
    } catch (err) {
      alert("Ошибка при обновлении статуса")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW': return <Badge className="bg-blue-500">Новая</Badge>
      case 'IN_WORK': return <Badge className="bg-orange-500">В работе</Badge>
      case 'COMPLETED': return <Badge className="bg-green-500">Выполнена</Badge>
      case 'CANCELLED': return <Badge variant="outline" className="text-slate-400">Отменена</Badge>
      default: return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 py-4 mb-8 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white">
              <Package className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Админ-панель</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-slate-500">
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <Tabs defaultValue="retail" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-xl border border-slate-200">
            <TabsTrigger value="retail" className="rounded-lg gap-2">
              <ShoppingCart className="w-4 h-4" />
              Розница
            </TabsTrigger>
            <TabsTrigger value="b2b" className="rounded-lg gap-2">
              <Building2 className="w-4 h-4" />
              Опт
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg gap-2">
              <Package className="w-4 h-4" />
              Заявки
              {orders.length > 0 && (
                <Badge className="ml-1 bg-orange-500">{orders.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="retail" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form */}
              <div className="lg:col-span-5">
                <Card className="rounded-3xl border-none shadow-sm sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5 text-sky-600" />
                      Добавить розничный товар
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        placeholder="Название"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value, type: "retail"})}
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Цена"
                          type="number"
                          value={formData.price}
                          onChange={e => setFormData({...formData, price: e.target.value})}
                          required
                        />
                        <Input
                          placeholder="Старая цена (опц)"
                          type="number"
                          value={formData.oldPrice}
                          onChange={e => setFormData({...formData, oldPrice: e.target.value})}
                        />
                      </div>
                      <Input
                        placeholder="Вес (напр. 1 кг)"
                        value={formData.weight}
                        onChange={e => setFormData({...formData, weight: e.target.value})}
                        required
                      />
                      <select
                        className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        <option>Филе и стейки</option>
                        <option>Целая рыба</option>
                        <option>Креветки и раки</option>
                        <option>Кальмары и осьминоги</option>
                        <option>Икра и деликатесы</option>
                        <option>Готовые наборы</option>
                      </select>
                      <Textarea
                        placeholder="Описание"
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        required
                      />

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Изображение</label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="URL изображения"
                            value={formData.image}
                            onChange={e => setFormData({...formData, image: e.target.value})}
                            required
                          />
                          <div className="relative">
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={handleFileUpload}
                              disabled={uploading}
                            />
                            <Button type="button" variant="outline" size="icon" disabled={uploading}>
                              <Upload className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {formData.image && (
                          <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-slate-100 relative">
                            <Image src={formData.image} alt="Preview" fill className="object-cover" />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-6 py-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="isHit"
                            checked={formData.isHit}
                            onCheckedChange={(checked) => setFormData({...formData, isHit: !!checked})}
                          />
                          <label htmlFor="isHit" className="text-sm font-medium">Хит</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="isNew"
                            checked={formData.isNew}
                            onCheckedChange={(checked) => setFormData({...formData, isNew: !!checked})}
                          />
                          <label htmlFor="isNew" className="text-sm font-medium">Новинка</label>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
                        Добавить
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* List */}
              <div className="lg:col-span-7">
                <Card className="rounded-3xl border-none shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Список товаров ({products.length})</CardTitle>
                    <div className="flex items-center gap-4">
                      {selectedRetailIds.length > 0 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="rounded-xl gap-2"
                          onClick={() => handleBulkDelete('retail')}
                        >
                          <Trash2 className="w-4 h-4" />
                          Удалить ({selectedRetailIds.length})
                        </Button>
                      )}
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="select-all-retail"
                          checked={selectedRetailIds.length === products.length && products.length > 0}
                          onCheckedChange={() => toggleSelectAll('retail')}
                        />
                        <label htmlFor="select-all-retail" className="text-sm font-medium text-slate-500 cursor-pointer">
                          Выбрать все
                        </label>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products.map((p) => (
                        <div key={p.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 group">
                          <Checkbox
                            checked={selectedRetailIds.includes(p.id)}
                            onCheckedChange={() => toggleSelect(p.id, 'retail')}
                          />
                          <div className="w-16 h-16 rounded-lg overflow-hidden relative shrink-0">
                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                          </div>
                          <div className="flex-grow">
                            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{p.category}</div>
                            <h4 className="font-bold text-slate-900">{p.name}</h4>
                            <div className="text-sm text-sky-600 font-bold">{p.price} ₽</div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-slate-300 hover:text-sky-500 transition-colors"
                              onClick={() => openEditModal(p, "retail")}
                            >
                              <Pencil className="w-5 h-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-slate-300 hover:text-red-500 transition-colors"
                              onClick={() => handleDelete(p.id, "retail")}
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="b2b" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               {/* Form B2B */}
               <div className="lg:col-span-5">
                <Card className="rounded-3xl border-none shadow-sm sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5 text-sky-600" />
                      Добавить оптовый товар
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        placeholder="Название"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value, type: "b2b"})}
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Цена (50-200кг)"
                          type="number"
                          value={formData.price}
                          onChange={e => setFormData({...formData, price: e.target.value})}
                          required
                        />
                        <Input
                          placeholder="Цена (200кг+)"
                          type="number"
                          value={formData.price200}
                          onChange={e => setFormData({...formData, price200: e.target.value})}
                        />
                      </div>
                      <Input
                        placeholder="Упаковка (напр. 10 кг коробка)"
                        value={formData.weight}
                        onChange={e => setFormData({...formData, weight: e.target.value})}
                        required
                      />
                      <select
                        className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        <option>Филе и стейки рыб</option>
                        <option>Креветки и раки</option>
                        <option>Мидии, гребешки, кальмары</option>
                        <option>Красная икра</option>
                        <option>Крабы</option>
                      </select>
                      <Textarea
                        placeholder="Описание"
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        required
                      />

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Изображение</label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="URL изображения"
                            value={formData.image}
                            onChange={e => setFormData({...formData, image: e.target.value})}
                            required
                          />
                          <div className="relative">
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={handleFileUpload}
                              disabled={uploading}
                            />
                            <Button type="button" variant="outline" size="icon" disabled={uploading}>
                              <Upload className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
                        Добавить в опт
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* List B2B */}
              <div className="lg:col-span-7">
                <Card className="rounded-3xl border-none shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Оптовый список ({b2bProducts.length})</CardTitle>
                    <div className="flex items-center gap-4">
                      {selectedB2BIds.length > 0 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="rounded-xl gap-2"
                          onClick={() => handleBulkDelete('b2b')}
                        >
                          <Trash2 className="w-4 h-4" />
                          Удалить ({selectedB2BIds.length})
                        </Button>
                      )}
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="select-all-b2b"
                          checked={selectedB2BIds.length === b2bProducts.length && b2bProducts.length > 0}
                          onCheckedChange={() => toggleSelectAll('b2b')}
                        />
                        <label htmlFor="select-all-b2b" className="text-sm font-medium text-slate-500 cursor-pointer">
                          Выбрать все
                        </label>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {b2bProducts.map((p) => (
                        <div key={p.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 group">
                          <Checkbox
                            checked={selectedB2BIds.includes(p.id)}
                            onCheckedChange={() => toggleSelect(p.id, 'b2b')}
                          />
                          <div className="w-16 h-16 rounded-lg overflow-hidden relative shrink-0">
                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                          </div>
                          <div className="flex-grow">
                            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{p.category}</div>
                            <h4 className="font-bold text-slate-900">{p.name}</h4>
                            <div className="text-sm flex gap-4">
                              <span className="text-sky-600 font-bold">{p.price} ₽</span>
                              {p.price200 && <span className="text-slate-400">{p.price200} ₽ (от 200кг)</span>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-slate-300 hover:text-sky-500 transition-colors"
                              onClick={() => openEditModal(p, "b2b")}
                            >
                              <Pencil className="w-5 h-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-slate-300 hover:text-red-500 transition-colors"
                              onClick={() => handleDelete(p.id, "b2b")}
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
             <Card className="rounded-3xl border-none shadow-sm">
                <CardHeader>
                  <CardTitle>История заявок ({orders.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orders.map((o) => (
                      <div key={o.id} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <Badge className={o.type === "B2B" ? "bg-purple-500" : "bg-sky-500"}>
                              {o.type}
                            </Badge>
                            {getStatusBadge(o.status)}
                            <span className="text-sm font-bold text-slate-900">{o.name}</span>
                            <span className="text-sm text-slate-500">{o.phone}</span>
                          </div>
                          <div className="text-xs text-slate-400">
                            {new Date(o.createdAt).toLocaleString()}
                          </div>
                        </div>
                        {o.address && <div className="text-sm text-slate-600 mb-2"><b>Адрес:</b> {o.address}</div>}
                        {o.comment && <div className="text-sm text-slate-600 mb-2 italic">&quot;{o.comment}&quot;</div>}
                        {o.products && (
                          <div className="mt-4 pt-4 border-t border-slate-50">
                            <div className="text-xs font-bold text-slate-400 uppercase mb-2">Заказ:</div>
                            <div className="flex flex-wrap gap-2">
                    {JSON.parse(o.products).map((p: {name: string, quantity: number}, idx: number) => (
                                <Badge key={idx} variant="outline" className="rounded-md">
                                  {p.name} x {p.quantity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                          <div className="flex gap-2">
                            <select
                              className="text-xs border rounded px-2 py-1 focus:outline-none"
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                            >
                              <option value="NEW">Новая</option>
                              <option value="IN_WORK">В работе</option>
                              <option value="COMPLETED">Выполнена</option>
                              <option value="CANCELLED">Отменена</option>
                            </select>
                          </div>
                          {o.total && <div className="font-bold text-sky-600">Итого: {o.total} ₽</div>}
                        </div>
                      </div>
                    ))}
                    {orders.length === 0 && (
                      <div className="text-center py-10 text-slate-400">Заявок пока нет</div>
                    )}
                  </div>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактирование товара</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <form onSubmit={handleUpdate} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Название</label>
                <Input
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    {editingProduct.type === 'retail' ? 'Цена' : 'Цена (50-200кг)'}
                  </label>
                  <Input
                    type="number"
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({...editingProduct, price: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    {editingProduct.type === 'retail' ? 'Старая цена' : 'Цена (200кг+)'}
                  </label>
                  <Input
                    type="number"
                    value={editingProduct.type === 'retail' ? (editingProduct.oldPrice || '') : (editingProduct.price200 || '')}
                    onChange={e => {
                      if (editingProduct.type === 'retail') {
                        setEditingProduct({...editingProduct, oldPrice: e.target.value})
                      } else {
                        setEditingProduct({...editingProduct, price200: e.target.value})
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">
                  {editingProduct.type === 'retail' ? 'Вес' : 'Упаковка'}
                </label>
                <Input
                  value={editingProduct.weight}
                  onChange={e => setEditingProduct({...editingProduct, weight: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Категория</label>
                <select
                  className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm focus:outline-none"
                  value={editingProduct.category}
                  onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                >
                  {editingProduct.type === 'retail' ? (
                    <>
                      <option>Филе и стейки</option>
                      <option>Целая рыба</option>
                      <option>Креветки и раки</option>
                      <option>Кальмары и осьминоги</option>
                      <option>Икра и деликатесы</option>
                      <option>Готовые наборы</option>
                    </>
                  ) : (
                    <>
                      <option>Филе и стейки рыб</option>
                      <option>Креветки и раки</option>
                      <option>Мидии, гребешки, кальмары</option>
                      <option>Красная икра</option>
                      <option>Крабы</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Описание</label>
                <Textarea
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Изображение</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="URL изображения"
                    value={editingProduct.image}
                    onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                    required
                  />
                  <div className="relative">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload(e, true)}
                      disabled={uploading}
                    />
                    <Button type="button" variant="outline" size="icon" disabled={uploading}>
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {editingProduct.image && (
                  <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-slate-100 relative">
                    <Image src={editingProduct.image} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              {editingProduct.type === 'retail' && (
                <div className="flex gap-6 py-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="edit-isHit"
                      checked={editingProduct.isHit}
                      onCheckedChange={(checked) => setEditingProduct({...editingProduct, isHit: !!checked})}
                    />
                    <label htmlFor="edit-isHit" className="text-sm font-medium">Хит</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="edit-isNew"
                      checked={editingProduct.isNew}
                      onCheckedChange={(checked) => setEditingProduct({...editingProduct, isNew: !!checked})}
                    />
                    <label htmlFor="edit-isNew" className="text-sm font-medium">Новинка</label>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsEditModalOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit" className="flex-1 bg-sky-600 hover:bg-sky-700">
                  Сохранить
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
