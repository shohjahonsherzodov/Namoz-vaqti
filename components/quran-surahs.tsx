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
  {
    number: 6,
    name: "Al-Anʿām",
    arabicName: "الأنعام",
    uzbekName: "Анъом",
    russianUzbek: "Алҳамду лиллаҳи-ллазӣ халақа-с-самавàти вал-арз ва ҷаъала-з-зулумàти ван-нýр.",
    verses: 165,
    revelation: "Макка",
    uzbekTranslation: "Осмону ерни яратган, zulmat va nurni paydo qilgan Zotга ҳамд бўлсин!",
    arabicText: "الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَجَعَلَ الظُّلُمَاتِ وَالنُّورَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/006.mp3"
  },
  {
    number: 7,
    name: "Al-Aʿrāf",
    arabicName: "الأعراف",
    uzbekName: "Аъроф",
    russianUzbek: "Алйф лам мим сод.",
    verses: 206,
    revelation: "Макка",
    uzbekTranslation: "Алиф, Лом, Мим, Сод.",
    arabicText: "المص ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/007.mp3"
  },
  {
    number: 8,
    name: "Al-Anfāl",
    arabicName: "الأنفال",
    uzbekName: "Анфол",
    russianUzbek: "Йà аййуҳàллазúйна àманý иттакýллаҳа ва аслиҳý зàта байни кум.",
    verses: 75,
    revelation: "Мадина",
    uzbekTranslation: "Эй иймон келтирганлар! Аллоҳдан қўрқингиз ва бир-бирингизни ислоҳ этингиз.",
    arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَأَصْلِحُوا ذَاتَ بَيْنِكُمْ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/008.mp3"
  },
  {
    number: 9,
    name: "At-Tawbah",
    arabicName: "التوبة",
    uzbekName: "Тавба",
    russianUzbek: "Бараàтун миналлоҳи ва расýлиҳи илàллазúйна ъàҳадтум минал-мýшрикин.",
    verses: 129,
    revelation: "Мадина",
    uzbekTranslation: "Аллоҳ ва Унинг Расулидан мушрикларга берган аҳдлардан безорлик.",
    arabicText: "بَرَاءَةٌ مِّنَ اللَّهِ وَرَسُولِهِ إِلَى الَّذِينَ عَاهَدتُّم مِّنَ الْمُشْرِكِينَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/009.mp3"
  },
  {
    number: 10,
    name: "Yūnus",
    arabicName: "يونس",
    uzbekName: "Юнус",
    russianUzbek: "Алйф лам рà. Тилкà аятýл-китàбил-ҳàким.",
    verses: 109,
    revelation: "Макка",
    uzbekTranslation: "Алиф, Лом, Ро. Ушбу ҳикматли Китобнинг оятларидир.",
    arabicText: "الر ۚ تِلْكَ آيَاتُ الْكِتَابِ الْحَكِيمِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/010.mp3"
  },    
  {
    number: 11,
    name: "Hūd",
    arabicName: "هود",
    uzbekName: "Ҳуд",
    russianUzbek: "Алйф лам рà. Китàбун ухкимàт аятуҳý сумма фуссилàт.",
    verses: 123,
    revelation: "Макка",
    uzbekTranslation: "Алиф, Лом, Ро. Оятлари мустаҳкам қилинган, кейин баён қилинган Китоб.",
    arabicText: "الر ۚ كِتَابٌ أُحْكِمَتْ آيَاتُهُ ثُمَّ فُصِّلَتْ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/011.mp3"
  },
  {
    number: 12,
    name: "Yūsuf",
    arabicName: "يوسف",
    uzbekName: "Юсуф",
    russianUzbek: "Алйф лам рà. Тилкà аятýл-китàбил-мубúн.",
    verses: 111,
    revelation: "Макка",
    uzbekTranslation: "Алиф, Лом, Ро. Ушбу очиқ Китобнинг оятларидир.",
    arabicText: "الر ۚ تِلْكَ آيَاتُ الْكِتَابِ الْمُبِينِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/012.mp3"
  },
  {
    number: 13,
    name: "Ar-Raʿd",
    arabicName: "الرعد",
    uzbekName: "Раъд",
    russianUzbek: "Алйф лам мим рà. Тилкà аятýл-китàб.",
    verses: 43,
    revelation: "Макка",
    uzbekTranslation: "Алиф, Лом, Мим, Ро. Ушбу Китобнинг оятларидир.",
    arabicText: "المر ۚ تِلْكَ آيَاتُ الْكِتَابِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/013.mp3"
  },
  {
    number: 14,
    name: "Ibrāhīm",
    arabicName: "ابراهيم",
    uzbekName: "Иброҳим",
    russianUzbek: "Алйф лам рà. Китàбун anzalнàҳу ilayка литухрижан-нас.",
    verses: 52,
    revelation: "Макка",
    uzbekTranslation: "Алиф, Лом, Ро. Биз ушбу Китобни одамларни чиқариш учун нозил қилдик.",
    arabicText: "الر ۚ كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ لِتُخْرِجَ النَّاسَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/014.mp3"
  },
  {
    number: 15,
    name: "Al-Ḥijr",
    arabicName: "الحجر",
    uzbekName: "Ҳижр",
    russianUzbek: "Алйф лам рà. Тилкà аятýл-китàби ва қуръанин мубúн.",
    verses: 99,
    revelation: "Макка",
    uzbekTranslation: "Алиф, Лом, Ро. Бу Китоб ва очиқ Қуръоннинг оятларидир.",
    arabicText: "الر ۚ تِلْكَ آيَاتُ الْكِتَابِ وَقُرْآنٍ مُّبِينٍ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/015.mp3"
  },
  {
    number: 16,
    name: "An-Naḥl",
    arabicName: "النحل",
    uzbekName: "Наҳл",
    russianUzbek: "Атаà амруллоҳи фалà тастаъҷилýҳу.",
    verses: 128,
    revelation: "Макка",
    uzbekTranslation: "Аллоҳнинг амри келди, уни шоширманглар.",
    arabicText: "أَتَىٰ أَمْرُ اللَّهِ فَلَا تَسْتَعْجِلُوهُ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/016.mp3"
  },
  {
    number: 17,
    name: "Al-Isrāʾ",
    arabicName: "الإسراء",
    uzbekName: "Исро",
    russianUzbek: "Субҳàналлазúй асрà биъабдиҳí лайлан.",
    verses: 111,
    revelation: "Макка",
    uzbekTranslation: "Бандини кечаси юргизган Зот покдир.",
    arabicText: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/017.mp3"
  },
  {
    number: 18,
    name: "Al-Kahf",
    arabicName: "الكهف",
    uzbekName: "Каҳф",
    russianUzbek: "Алҳамду лиллаҳи-ллазúй anzалà ъалà ъабдиҳил-китàб.",
    verses: 110,
    revelation: "Макка",
    uzbekTranslation: "Бандига Китобни нозил қилган Аллоҳга ҳамд бўлсин.",
    arabicText: "الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/018.mp3"
  },
  {
    number: 19,
    name: "Maryam",
    arabicName: "مريم",
    uzbekName: "Марям",
    russianUzbek: "Каф ҳà йà ъайн сод.",
    verses: 98,
    revelation: "Макка",
    uzbekTranslation: "Коф, Ҳо, Йо, Айн, Сод.",
    arabicText: "كهيعص ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/019.mp3"
  },
  {
    number: 20,
    name: "Ṭā-Hā",
    arabicName: "طه",
    uzbekName: "Тоҳо",
    russianUzbek: "То ҳà. Мà анзалнà ъалàйкал-қуръàна литашқà.",
    verses: 135,
    revelation: "Макка",
    uzbekTranslation: "То, Ҳо. Биз Қуръонни сенга машаққат учун нозил қилмадик.",
    arabicText: "طه ﴿١﴾ مَا أَنزَلْنَا عَلَيْكَ الْقُرْآنَ لِتَشْقَىٰ ﴿٢﴾",
    audioUrl: "https://server8.mp3quran.net/afs/020.mp3"
  }

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
