"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Lightbulb, Star } from "lucide-react"

interface Rivoyat {
  id: number
  title: string
  content: string
  source: string
}

const categories = [
  {
    id: "prophet",
    title: "Payg'ambarimiz rivoyatlari",
    icon: BookOpen,
    color: "from-emerald-600 to-emerald-800",
    rivoyatlar: [
      {
        id: 1,
        title: "Mehribonlik haqida",
        content:
          "Payg'ambar (s.a.v.) dedilar: \"Mehribon bo'lgan kishiga Allah ham mehribon bo'ladi. Yer yuzidagilarga rahm qiling, osmon ahlidan sizga rahm qilinadi.\"",
        source: "Abu Dovud, Tirmiziy",
      },
      {
        id: 2,
        title: "Ilm olish haqida",
        content:
          "\"Ilm olish har bir musulmon erkak va ayolga farzdir. Ilm oling, hatto Xitoyga borishga to'g'ri kelsa ham.\"",
        source: "Ibn Moja",
      },
      {
        id: 3,
        title: "Sabr-toqat haqida",
        content:
          "\"Sabr qilgan kishi hech qachon mag'lub bo'lmaydi. Allah sabrli bandalariga cheksiz mukofot beradi.\"",
        source: "Buxoriy, Muslim",
      },
    ],
  },
  {
    id: "companions",
    title: "Sahobalardan rivoyatlar",
    icon: Users,
    color: "from-blue-600 to-blue-800",
    rivoyatlar: [
      {
        id: 4,
        title: "Abu Bakr (r.a.) dan",
        content:
          "\"Ey odamlar! Men sizning eng yaxshingiz emasman. Lekin men sizning amiringizman. Agar to'g'ri ish qilsam, yordam bering, agar xato qilsam, to'g'rilab qo'ying.\"",
        source: "Tabaqot Ibn Sa'd",
      },
      {
        id: 5,
        title: "Umar (r.a.) dan",
        content:
          "\"O'zingizni hisob qiling, sizni hisob qilishlaridan oldin. O'zingizni tortib ko'ring, sizni tortib ko'rishlaridan oldin.\"",
        source: "Tirmiziy",
      },
      {
        id: 6,
        title: "Ali (r.a.) dan",
        content:
          "\"Dunyo ikki kun: bir kun senga, bir kun sening zidding. Senga bo'lgan kun takabburlik qilma, sening zidding bo'lgan kun sabr qil.\"",
        source: "Nahjul Balag'a",
      },
    ],
  },
  {
    id: "wisdom",
    title: "Hikmatli so'zlar",
    icon: Lightbulb,
    color: "from-amber-600 to-amber-800",
    rivoyatlar: [
      {
        id: 7,
        title: "Ilm va amal",
        content:
          "\"Ilmsiz amal - yo'lsiz sayohat, amalsiz ilm - bargsiz daraxt. Ikkalasi birgalikda bo'lgandagina samara beradi.\"",
        source: "Hikmatli so'zlar",
      },
      {
        id: 8,
        title: "Do'stlik haqida",
        content:
          "\"Yaxshi do'st - ko'zgu kabi, sening kamchiligingni ko'rsatadi. Yomon do'st - soya kabi, faqat quyoshli kunlarda yoningda bo'ladi.\"",
        source: "Sharq hikmatlari",
      },
      {
        id: 9,
        title: "Vaqt haqida",
        content: '"Vaqt - eng qimmatli ne\'mat. Uni behuda sarflagan kishi, hayotini behuda sarflaydi."',
        source: "Islom hikmatlari",
      },
    ],
  },
  {
    id: "stories",
    title: "Qisqa ibratli hikoyalar",
    icon: Star,
    color: "from-purple-600 to-purple-800",
    rivoyatlar: [
      {
        id: 10,
        title: "Sabr va mukofot",
        content:
          "Bir kishi har kuni masjidga borar, yo'lda bir tilanchi uni to'xtatib yordam so'rar edi. U har doim yordam berardi. Bir kun tilanchi yo'qoldi. Keyin ma'lum bo'ldiki, u farishta bo'lib, uning sabrini sinab ko'rgan ekan.",
        source: "Ibratli hikoyalar",
      },
      {
        id: 11,
        title: "Halollik berakat",
        content:
          "Bir savdogar hech qachon yolg'on gapirmasdi. Bir kun xaridori kam pul berdi, lekin u buni aytdi. Xaridor hayron bo'lib, undan ko'p mol sotib oldi va doim mijozi bo'ldi.",
        source: "Halol tijorat",
      },
      {
        id: 12,
        title: "Kichik amal, katta mukofot",
        content:
          "Bir ayol har kuni yo'ldan toshlarni olib tashlardi. Odamlar buni kichik ish deb bilishardi. Vafot etgach, tushida ko'rdiki, har bir tosh uchun ajri yozilgan ekan.",
        source: "Solih amallar",
      },
    ],
  },
]

export function Rivoyatlar() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory)

  if (selectedCategory && selectedCategoryData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary text-shadow-gold">{selectedCategoryData.title}</h1>
          <Button
            onClick={() => setSelectedCategory(null)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Orqaga qaytish
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {selectedCategoryData.rivoyatlar.map((rivoyat) => (
            <Card
              key={rivoyat.id}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500 hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-emerald-400">{rivoyat.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-100 leading-relaxed text-sm">{rivoyat.content}</p>
                <div className="pt-2 border-t border-amber-500/30">
                  <p className="text-amber-400 text-xs font-medium">Manba: {rivoyat.source}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary text-shadow-gold">Rivoyatlar</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Payg'ambarimiz (s.a.v.), sahobalar va olimlardan yetib kelgan hikmatli so'zlar va ibratli hikoyalar
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Card
              key={category.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 bg-gradient-to-br from-card to-card/80 border-2 border-primary/20 hover:border-primary/40"
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div
                  className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">{category.rivoyatlar.length} ta rivoyat</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
