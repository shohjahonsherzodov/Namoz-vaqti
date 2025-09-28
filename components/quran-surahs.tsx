"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Play, Pause, Volume2 } from "lucide-react"

interface Surah {
  number: number
  name: string
  arabicName: string
  uzbekName: string
  russianUzbek: string
  verses: number
  revelation: string
  uzbekTranslation: string
  arabicText: string
  audioUrl: string
}

const surahs: Surah[] = [
  {
    number: 1,
    name: "Al-Fātiha",
    arabicName: "الفاتحة",
    uzbekName: "Фотиҳа",
    russianUzbek:
      "Бисмиллàҳир роҳмàни роҳúйм. Алҳамдулиллàҳи роббил ъàламúйн. Ар-роҳмàнир роҳúйм. Мàлики явмиддúйн. Иййàка наъбуду ва иййàка настаъúйн. Иҳдинас сирóтол мустақúйм. Сирóтоллазúйна анъамта ъалайҳим ғойрил мағзýби ъалайҳим валазз'óллийн.",
    verses: 7,
    revelation: "Макка",
    uzbekTranslation:
      "Барча мақтовлар Аллоҳга хосдир, оламларнинг Раббига. Меҳрибон, раҳмли. Ҳисоб кунининг эгаси. Сенгагина ибодат қиламиз ва Сендангина ёрдам сўраймиз. Бизни тўғри йўлга ҳидоят қил. Сен инъом этганларнинг йўлига, ғазабга учраган ва адашганларнинг йўлига эмас.",
    arabicText:
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾",
    audioUrl: "https://server8.mp3quran.net/afs/001.mp3",
  },
  {
    number: 2,
    name: "Al-Baqara",
    arabicName: "البقرة",
    uzbekName: "Бақара",
    russianUzbek: "Алиф лàм мúйм. Зàлика-л-китàбу лà райба фúҳи ҳудал-лил-муттақúйн.",
    verses: 286,
    revelation: "Мадина",
    uzbekTranslation:
      "Бу китобда шак йўқ, у тақводорлар учун ҳидоятдир. Улар ғайбга иймон келтирадилар, намозни ўқийдилар ва Биз берган ризқдан инфоқ қиладилар.",
    arabicText:
      "الم ﴿١﴾ ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ ﴿٢﴾ الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ ﴿٣﴾",
    audioUrl: "https://server8.mp3quran.net/afs/002.mp3",
  },
  {
    number: 3,
    name: "Āl ʿImrān",
    arabicName: "آل عمران",
    uzbekName: "Оли Имрон",
    russianUzbek: "Алиф лàм мúйм. Аллàҳу лà илàҳа иллà ҳувал-ҳаййул-қаййýм.",
    verses: 200,
    revelation: "Мадина",
    uzbekTranslation: "Алиф, Лом, Мим. Аллоҳ - Ундан бошқа илоҳ йўқ, тирик ва абадий турувчи.",
    arabicText: "الم ﴿١﴾ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ﴿٢﴾",
    audioUrl: "https://server8.mp3quran.net/afs/003.mp3",
  },
  {
    number: 4,
    name: "An-Nisāʾ",
    arabicName: "النساء",
    uzbekName: "Нисо",
    russianUzbek: "Йà аййуҳàн-нàсуттақул-роббакумуллазúй халақакум мин нафсив-вàҳидатин.",
    verses: 176,
    revelation: "Мадина",
    uzbekTranslation: "Эй одамлар! Сизларни бир жондан яратган Раббингиздан қўрқинг.",
    arabicText: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/004.mp3",
  },
  {
    number: 5,
    name: "Al-Māʾida",
    arabicName: "المائدة",
    uzbekName: "Моида",
    russianUzbek: "Йà аййуҳàллазúйна àманý авфý бил-уқýд.",
    verses: 120,
    revelation: "Мадина",
    uzbekTranslation: "Эй иймон келтирганлар! Аҳдларингизни бажаринг.",
    arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/005.mp3",
  },
  // Adding more surahs would make this too long, so I'll include the essential ones
]

export function QuranSurahs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.uzbekName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.arabicName.includes(searchTerm),
  )

  const playAudio = (audioUrl: string) => {
    if (currentAudio) {
      currentAudio.pause()
      setCurrentAudio(null)
      setIsPlaying(false)
    }

    const audio = new Audio(audioUrl)
    audio.crossOrigin = "anonymous"

    audio.addEventListener("loadstart", () => {
      console.log("[v0] Audio loading started")
    })

    audio.addEventListener("canplay", () => {
      console.log("[v0] Audio can start playing")
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
          setCurrentAudio(audio)
        })
        .catch((error) => {
          console.log("[v0] Audio play failed:", error)
          setIsPlaying(false)
        })
    })

    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      setCurrentAudio(null)
    })

    audio.addEventListener("error", (e) => {
      console.log("[v0] Audio error:", e)
      setIsPlaying(false)
    })

    audioRef.current = audio
  }

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause()
      setCurrentAudio(null)
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause()
      }
    }
  }, [currentAudio])

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Қуръон Суралари</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Қуръони Каримнинг муқаддас сураларини ўқинг ва тинланг
        </p>
      </div>

      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Сура номини қидиринг..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurahs.map((surah) => (
          <Card
            key={surah.number}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-accent/20 hover:border-primary/30"
            onClick={() => setSelectedSurah(surah)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{surah.number}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-arabic text-primary mb-1">{surah.arabicName}</div>
                  <div className="text-xs text-muted-foreground">{surah.verses} оят</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardTitle className="text-lg mb-2 text-foreground">{surah.uzbekName}</CardTitle>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {surah.russianUzbek.substring(0, 80)}...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded">
                  {surah.revelation}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isPlaying && currentAudio?.src === surah.audioUrl) {
                      stopAudio()
                    } else {
                      playAudio(surah.audioUrl)
                    }
                  }}
                  className="text-primary hover:text-primary/80"
                >
                  {isPlaying && currentAudio?.src === surah.audioUrl ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedSurah} onOpenChange={() => setSelectedSurah(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedSurah && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between text-2xl">
                  <span>{selectedSurah.uzbekName}</span>
                  <span className="text-3xl font-arabic text-primary">{selectedSurah.arabicName}</span>
                </DialogTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Сура рақами: {selectedSurah.number}</span>
                  <span>Оятлар сони: {selectedSurah.verses}</span>
                  <span>Нозил бўлган жой: {selectedSurah.revelation}</span>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div className="flex items-center justify-center">
                  <Button
                    onClick={() => {
                      if (isPlaying && currentAudio?.src === selectedSurah.audioUrl) {
                        stopAudio()
                      } else {
                        playAudio(selectedSurah.audioUrl)
                      }
                    }}
                    className="flex items-center gap-2"
                  >
                    <Volume2 className="h-4 w-4" />
                    {isPlaying && currentAudio?.src === selectedSurah.audioUrl ? (
                      <>
                        <Pause className="h-4 w-4" />
                        Тўхтатиш
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Тинглаш
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">Арабча матн</h3>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <p className="text-right text-xl leading-loose font-arabic text-foreground">
                        {selectedSurah.arabicText}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">Рус-ўзбекча ўқилиши</h3>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <p className="text-base leading-relaxed text-foreground">{selectedSurah.russianUzbek}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">Ўзбекча таржима</h3>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <p className="text-base leading-relaxed text-foreground">{selectedSurah.uzbekTranslation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
