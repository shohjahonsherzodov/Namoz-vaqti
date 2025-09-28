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
  },
    {
    "number": 21,
    "name": "Al-Anbiyāʾ",
    "arabicName": "الأنبياء",
    "uzbekName": "Анбиё",
    "russianUzbek": "Иқтаробà линнàси ҳисàбухум ва ҳум фи ғàфлатим муъридýн.",
    "verses": 112,
    "revelation": "Макка",
    "uzbekTranslation": "Одамларнинг ҳисоб-китоби яқинлашди, улар эса ғофилликда юз ўгириб турибдилар.",
    "arabicText": "اقْتَرَبَ لِلنَّاسِ حِسَابُهُمْ وَهُمْ فِي غَفْلَةٍ مُعْرِضُونَ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/021.mp3"
  },
  {
    "number": 22,
    "name": "Al-Ḥajj",
    "arabicName": "الحج",
    "uzbekName": "Ҳаж",
    "russianUzbek": "Йà аййуҳàннàсу-ттакý раббакум инна залзàлатас-сàъати шайъун ъазýм.",
    "verses": 78,
    "revelation": "Мадина",
    "uzbekTranslation": "Эй одамлар! Роббингиздан қўрқинглар. Албатта, қиёматнинг зилзиласи катта нарсадир.",
    "arabicText": "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمْ إِنَّ زَلْزَلَةَ السَّاعَةِ شَيْءٌ عَظِيمٌ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/022.mp3"
  },
  {
    "number": 23,
    "name": "Al-Muʾminūn",
    "arabicName": "المؤمنون",
    "uzbekName": "Муъминун",
    "russianUzbek": "Қад афлаҳа-л-муъминýн.",
    "verses": 118,
    "revelation": "Макка",
    "uzbekTranslation": "Албатта, иймон келтирганлар нажот топдилар.",
    "arabicText": "قَدْ أَفْلَحَ الْمُؤْمِنُونَ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/023.mp3"
  },
  {
    "number": 24,
    "name": "An-Nūr",
    "arabicName": "النور",
    "uzbekName": "Нур",
    "russianUzbek": "Сýратун анзалнàҳà ва фарòзнàҳà.",
    "verses": 64,
    "revelation": "Мадина",
    "uzbekTranslation": "Бир сурани нозил қилдик ва унда ҳукмлар фарз қилинди.",
    "arabicText": "سُورَةٌ أَنزَلْنَاهَا وَفَرَضْنَاهَا ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/024.mp3"
  },
  {
    "number": 25,
    "name": "Al-Furqān",
    "arabicName": "الفرقان",
    "uzbekName": "Фурқон",
    "russianUzbek": "Табàраколлазúй наzzàла-л-фурқàна ъалà ъабдиҳи.",
    "verses": 77,
    "revelation": "Макка",
    "uzbekTranslation": "Баракотли Zot, У Ўз бандасига Фурқонни нозил қилди.",
    "arabicText": "تَبَارَكَ الَّذِي نَزَّلَ الْفُرْقَانَ عَلَىٰ عَبْدِهِ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/025.mp3"
  },
  {
    "number": 26,
    "name": "Ash-Shuʿarāʾ",
    "arabicName": "الشعراء",
    "uzbekName": "Шуаро",
    "russianUzbek": "Тà сúн. Тилкà аятýл-китàбил-мубýн.",
    "verses": 227,
    "revelation": "Макка",
    "uzbekTranslation": "То, Син, Мим. Ана шу аниқ Китобнинг оятларидир.",
    "arabicText": "طسم ﴿١﴾ تِلْكَ آيَاتُ الْكِتَابِ الْمُبِينِ ﴿٢﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/026.mp3"
  },
  {
    "number": 27,
    "name": "An-Naml",
    "arabicName": "النمل",
    "uzbekName": "Намл",
    "russianUzbek": "Тà сúн. Тилкà аятýл-Қуръàни ва китобин мубúн.",
    "verses": 93,
    "revelation": "Макка",
    "uzbekTranslation": "То, Син. Ана шу Қуръон ва аниқ Китобнинг оятларидир.",
    "arabicText": "طس ۚ تِلْكَ آيَاتُ الْقُرْآنِ وَكِتَابٍ مُّبِينٍ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/027.mp3"
  },
  {
    "number": 28,
    "name": "Al-Qaṣaṣ",
    "arabicName": "القصص",
    "uzbekName": "Қасас",
    "russianUzbek": "Тà сúн мýм.",
    "verses": 88,
    "revelation": "Макка",
    "uzbekTranslation": "То, Син, Мим.",
    "arabicText": "طسم ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/028.mp3"
  },
  {
    "number": 29,
    "name": "Al-ʿAnkabūt",
    "arabicName": "العنكبوت",
    "uzbekName": "Анкабут",
    "russianUzbek": "Алйф лàм мýм.",
    "verses": 69,
    "revelation": "Макка",
    "uzbekTranslation": "Алиф, Лом, Мим.",
    "arabicText": "الم ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/029.mp3"
  },
  {
    "number": 30,
    "name": "Ar-Rūm",
    "arabicName": "الروم",
    "uzbekName": "Рум",
    "russianUzbek": "Ғулибатир-рýм.",
    "verses": 60,
    "revelation": "Макка",
    "uzbekTranslation": "Румликлар мағлуб этилди.",
    "arabicText": "غُلِبَتِ الرُّومُ ﴿٢﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/030.mp3"
  },
    {
    "number": 31,
    "name": "Luqmān",
    "arabicName": "لقمان",
    "uzbekName": "Луқмон",
    "russianUzbek": "Алйф лàм мýм.",
    "verses": 34,
    "revelation": "Макка",
    "uzbekTranslation": "Алиф, Лом, Мим.",
    "arabicText": "الم ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/031.mp3"
  },
  {
    "number": 32,
    "name": "As-Sajda",
    "arabicName": "السجدة",
    "uzbekName": "Сажда",
    "russianUzbek": "Алйф лàм мýм.",
    "verses": 30,
    "revelation": "Макка",
    "uzbekTranslation": "Алиф, Лом, Мим.",
    "arabicText": "الم ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/032.mp3"
  },
  {
    "number": 33,
    "name": "Al-Aḥzāb",
    "arabicName": "الأحزاب",
    "uzbekName": "Аҳзоб",
    "russianUzbek": "Йà аййуҳàн-набийю-ттакýллаҳа ва лà тутиъил-кафирúна вал-мунàфиқúн.",
    "verses": 73,
    "revelation": "Мадина",
    "uzbekTranslation": "Эй пайғамбар! Аллоҳдан қўрқ ва кофирлар ҳамда мунофиқларга итоат қилма.",
    "arabicText": "يَا أَيُّهَا النَّبِيُّ اتَّقِ اللَّهَ وَلَا تُطِعِ الْكَافِرِينَ وَالْمُنَافِقِينَ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/033.mp3"
  },
  {
    "number": 34,
    "name": "Sabaʾ",
    "arabicName": "سبأ",
    "uzbekName": "Саба",
    "russianUzbek": "Алҳамду лиллаҳи-ллазӣ лаҳý mà фис-самавàти ва mà фил-арз.",
    "verses": 54,
    "revelation": "Макка",
    "uzbekTranslation": "Осмонлар ва ердаги ҳамма нарса Унга тааллуқли бўлган Zotга ҳамд бўлсин.",
    "arabicText": "الْحَمْدُ لِلَّهِ الَّذِي لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/034.mp3"
  },
  {
    "number": 35,
    "name": "Fāṭir",
    "arabicName": "فاطر",
    "uzbekName": "Фотир",
    "russianUzbek": "Алҳамду лиллаҳи-л-фàтирис-самавàти вал-арз.",
    "verses": 45,
    "revelation": "Макка",
    "uzbekTranslation": "Осмонлар ва ерни яратган Zotга ҳамд бўлсин.",
    "arabicText": "الْحَمْدُ لِلَّهِ فَاطِرِ السَّمَاوَاتِ وَالْأَرْضِ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/035.mp3"
  },
  {
    "number": 36,
    "name": "Yā-Sīn",
    "arabicName": "يس",
    "uzbekName": "Ясин",
    "russianUzbek": "Йà-сúн.",
    "verses": 83,
    "revelation": "Макка",
    "uzbekTranslation": "Ясин.",
    "arabicText": "يس ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/036.mp3"
  },
  {
    "number": 37,
    "name": "Aṣ-Ṣāffāt",
    "arabicName": "الصافات",
    "uzbekName": "Саффот",
    "russianUzbek": "Вас-сàффàти соффà.",
    "verses": 182,
    "revelation": "Макка",
    "uzbekTranslation": "Саф-саф тургувчилар ҳаққи учун қасам.",
    "arabicText": "وَالصَّافَّاتِ صَفًّا ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/037.mp3"
  },
  {
    "number": 38,
    "name": "Ṣād",
    "arabicName": "ص",
    "uzbekName": "Сод",
    "russianUzbek": "Сàд. Вал-қуръàнил-зи-з-зикр.",
    "verses": 88,
    "revelation": "Макка",
    "uzbekTranslation": "Сод. Зикрли Қуръон ҳаққи учун қасам.",
    "arabicText": "ص ۚ وَالْقُرْآنِ ذِي الذِّكْرِ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/038.mp3"
  },
  {
    "number": 39,
    "name": "Az-Zumar",
    "arabicName": "الزمر",
    "uzbekName": "Зумар",
    "russianUzbek": "Танзúлул-китàби миналлоҳи-л-ъазúзил-ҳàким.",
    "verses": 75,
    "revelation": "Макка",
    "uzbekTranslation": "Ушбу китоб Азиз ва Ҳаким бўлган Аллоҳдан нозил қилинди.",
    "arabicText": "تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْحَكِيمِ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/039.mp3"
  },
  {
    "number": 40,
    "name": "Ghāfir",
    "arabicName": "غافر",
    "uzbekName": "Ғофир",
    "russianUzbek": "Ҳà-мúм.",
    "verses": 85,
    "revelation": "Макка",
    "uzbekTranslation": "Ҳа, Мим.",
    "arabicText": "حم ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/040.mp3"
  },
    {
    "number": 41,
    "name": "Fuṣṣilat",
    "arabicName": "فصلت",
    "uzbekName": "Фуссилат",
    "russianUzbek": "Ҳà-мúм. Танзúлум-минар-раҳмàни-р-раҳúм.",
    "verses": 54,
    "revelation": "Макка",
    "uzbekTranslation": "Ҳа, Мим. Меҳрибон ва Раҳмли Аллоҳдан нозил қилинган.",
    "arabicText": "حم ﴿١﴾ تَنزِيلٌ مِّنَ الرَّحْمَـٰنِ الرَّحِيمِ ﴿٢﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/041.mp3"
  },
  {
    "number": 42,
    "name": "Ash-Shūrā",
    "arabicName": "الشورى",
    "uzbekName": "Шуро",
    "russianUzbek": "Ҳà-мúм. ъайин-сúн-ҡàф.",
    "verses": 53,
    "revelation": "Макка",
    "uzbekTranslation": "Ҳа, Мим. Айн, Син, Қоф.",
    "arabicText": "حم ﴿١﴾ عسق ﴿٢﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/042.mp3"
  },
  {
    "number": 43,
    "name": "Az-Zukhruf",
    "arabicName": "الزخرف",
    "uzbekName": "Зухруф",
    "russianUzbek": "Ҳà-мúм. Вал-китàбил-мубúн.",
    "verses": 89,
    "revelation": "Макка",
    "uzbekTranslation": "Ҳа, Мим. Аниқ Китоб ҳаққи учун қасам.",
    "arabicText": "حم ﴿١﴾ وَالْكِتَابِ الْمُبِينِ ﴿٢﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/043.mp3"
  },
  {
    "number": 44,
    "name": "Ad-Dukhān",
    "arabicName": "الدخان",
    "uzbekName": "Духон",
    "russianUzbek": "Ҳà-мúм. Вал-китàбил-мубúн.",
    "verses": 59,
    "revelation": "Макка",
    "uzbekTranslation": "Ҳа, Мим. Аниқ Китоб ҳаққи учун қасам.",
    "arabicText": "حم ﴿١﴾ وَالْكِتَابِ الْمُبِينِ ﴿٢﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/044.mp3"
  },
  {
    "number": 45,
    "name": "Al-Jāthiya",
    "arabicName": "الجاثية",
    "uzbekName": "Жосия",
    "russianUzbek": "Ҳà-мúм. Танзúлул-китàби миналлоҳи-л-ъазúзил-ҳàким.",
    "verses": 37,
    "revelation": "Макка",
    "uzbekTranslation": "Ҳа, Мим. Китобнинг нозил қилиниши Азиз ва Ҳаким Аллоҳдан.",
    "arabicText": "حم ﴿١﴾ تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْحَكِيمِ ﴿٢﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/045.mp3"
  },
  {
    "number": 46,
    "name": "Al-Aḥqāf",
    "arabicName": "الأحقاف",
    "uzbekName": "Аҳқоф",
    "russianUzbek": "Ҳà-мúм. Танзúлул-китàби миналлоҳи-л-ъазúзил-ҳàким.",
    "verses": 35,
    "revelation": "Макка",
    "uzbekTranslation": "Ҳа, Мим. Китобнинг нозил қилиниши Азиз ва Ҳаким Аллоҳдан.",
    "arabicText": "حم ﴿١﴾ تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْحَكِيمِ ﴿٢﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/046.mp3"
  },
  {
    "number": 47,
    "name": "Muḥammad",
    "arabicName": "محمد",
    "uzbekName": "Муҳаммад",
    "russianUzbek": "Аллазúйна кафàру ва соддý ъан сабúли-ллаҳи азàлла аъмàлахум.",
    "verses": 38,
    "revelation": "Мадина",
    "uzbekTranslation": "Кофир бўлган ва Аллоҳ йўлидан тўсганларнинг амалларини Аллоҳ йўққа чиқарди.",
    "arabicText": "الَّذِينَ كَفَرُوا وَصَدُّوا عَن سَبِيلِ اللَّهِ أَضَلَّ أَعْمَالَهُمْ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/047.mp3"
  },
  {
    "number": 48,
    "name": "Al-Fatḥ",
    "arabicName": "الفتح",
    "uzbekName": "Фатҳ",
    "russianUzbek": "Иннà фатàҳнà лака фатҳàн мубúнà.",
    "verses": 29,
    "revelation": "Мадина",
    "uzbekTranslation": "Албатта, Биз сенга очиқ фатҳ бердик.",
    "arabicText": "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/048.mp3"
  },
  {
    "number": 49,
    "name": "Al-Ḥujurāt",
    "arabicName": "الحجرات",
    "uzbekName": "Ҳужурот",
    "russianUzbek": "Йà аййуҳàллазúйна àманý лà туқаддúму байна йадàйи-ллаҳи ва расýлиҳи.",
    "verses": 18,
    "revelation": "Мадина",
    "uzbekTranslation": "Эй иймон келтирганлар! Аллоҳ ва Унинг Расулидан олдин ўтманглар.",
    "arabicText": "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُقَدِّمُوا بَيْنَ يَدَيِ اللَّهِ وَرَسُولِهِ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/049.mp3"
  },
  {
    "number": 50,
    "name": "Qāf",
    "arabicName": "ق",
    "uzbekName": "Қоф",
    "russianUzbek": "Қàф. Вал-қуръàнил-мажúд.",
    "verses": 45,
    "revelation": "Макка",
    "uzbekTranslation": "Қоф. Шон-шуҳратли Қуръон ҳаққи учун қасам.",
    "arabicText": "ق ۚ وَالْقُرْآنِ الْمَجِيدِ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/050.mp3"
  },
  {
    "number": 51,
    "name": "Adh-Dhāriyāt",
    "arabicName": "الذاريات",
    "uzbekName": "Зарият",
    "russianUzbek": "Ваз-зàрийàти зарвà.",
    "verses": 60,
    "revelation": "Макка",
    "uzbekTranslation": "Урувчи шамоллар ҳаққи учун қасам.",
    "arabicText": "وَالذَّارِيَاتِ ذَرْوًا ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/051.mp3"
  },
  {
    "number": 52,
    "name": "Aṭ-Ṭūr",
    "arabicName": "الطور",
    "uzbekName": "Тур",
    "russianUzbek": "Ват-тýр.",
    "verses": 49,
    "revelation": "Макка",
    "uzbekTranslation": "Тур тоғ ҳаққи учун қасам.",
    "arabicText": "وَالطُّورِ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/052.mp3"
  },
  {
    "number": 53,
    "name": "An-Najm",
    "arabicName": "النجم",
    "uzbekName": "Нажм",
    "russianUzbek": "Ван-наҷми изà ҳавà.",
    "verses": 62,
    "revelation": "Макка",
    "uzbekTranslation": "Сўнган пайтдаги юлдуз ҳаққи учун қасам.",
    "arabicText": "وَالنَّجْمِ إِذَا هَوَى ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/053.mp3"
  },
  {
    "number": 54,
    "name": "Al-Qamar",
    "arabicName": "القمر",
    "uzbekName": "Қамар",
    "russianUzbek": "Иқтаробатис-сàъату ваншаqqà-л-қàмар.",
    "verses": 55,
    "revelation": "Макка",
    "uzbekTranslation": "Қиёмат яқинлашди ва ой ярилди.",
    "arabicText": "اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/054.mp3"
  },
  {
    "number": 55,
    "name": "Ar-Raḥmān",
    "arabicName": "الرحمن",
    "uzbekName": "Раҳмон",
    "russianUzbek": "Ар-раҳмàн.",
    "verses": 78,
    "revelation": "Макка",
    "uzbekTranslation": "Раҳмон.",
    "arabicText": "الرَّحْمَـٰنُ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/055.mp3"
  },
  {
    "number": 56,
    "name": "Al-Wāqiʿa",
    "arabicName": "الواقعة",
    "uzbekName": "Воқиа",
    "russianUzbek": "Изà ваqaъатил-воқиъа.",
    "verses": 96,
    "revelation": "Макка",
    "uzbekTranslation": "Қачонки воқеа содир бўлса.",
    "arabicText": "إِذَا وَقَعَتِ الْوَاقِعَةُ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/056.mp3"
  },
  {
    "number": 57,
    "name": "Al-Ḥadīd",
    "arabicName": "الحديد",
    "uzbekName": "Ҳадид",
    "russianUzbek": "Саббаҳа лиллаҳи mà фис-самавàти вал-арзи ва ҳувал-ъазúзул-ҳàким.",
    "verses": 29,
    "revelation": "Мадина",
    "uzbekTranslation": "Осмонлар ва ердаги ҳамма нарса Аллоҳни тасбеҳ этди. У Азиз ва Ҳакимдир.",
    "arabicText": "سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ وَهُوَ الْعَزِيزُ الْحَكِيمُ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/057.mp3"
  },
  {
    "number": 58,
    "name": "Al-Mujādila",
    "arabicName": "المجادلة",
    "uzbekName": "Мужодала",
    "russianUzbek": "Қад самиа-ллоҳу қавла-ллатí тужодилука фӣ завжихà.",
    "verses": 22,
    "revelation": "Мадина",
    "uzbekTranslation": "Аллоҳ ўша аёлнинг сўзини эшитди, у сени эри ҳақида тортишар эди.",
    "arabicText": "قَدْ سَمِعَ اللَّهُ قَوْلَ الَّتِي تُجَادِلُكَ فِي زَوْجِهَا ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/058.mp3"
  },
  {
    "number": 59,
    "name": "Al-Ḥashr",
    "arabicName": "الحشر",
    "uzbekName": "Ҳашр",
    "russianUzbek": "Саббаҳа лиллаҳи mà фис-самавàти ва mà фил-арз.",
    "verses": 24,
    "revelation": "Мадина",
    "uzbekTranslation": "Осмонлар ва ердаги ҳамма нарса Аллоҳни тасбеҳ этди.",
    "arabicText": "سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/059.mp3"
  },
  {
    "number": 60,
    "name": "Al-Mumtaḥina",
    "arabicName": "الممتحنة",
    "uzbekName": "Мумтаҳина",
    "russianUzbek": "Йà аййуҳàллазúйна àманý лà таттаxизý ъадуwwӣ ва ъадуwwакум авлийà.",
    "verses": 13,
    "revelation": "Мадина",
    "uzbekTranslation": "Эй иймон келтирганлар! Менинг ва ўзингизнинг душманингизни дўст тутманглар.",
    "arabicText": "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَتَّخِذُوا عَدُوِّي وَعَدُوَّكُمْ أَوْلِيَاء ﴿١﴾",
    "audioUrl": "https://server8.mp3quran.net/afs/060.mp3"
  },
    {
    number: 61,
    name: "As-Saff",
    arabicName: "الصف",
    uzbekName: "Сафф",
    russianUzbek: "Саббаха лиллаҳи mà фис-самавàти ва mà фил-арз.",
    verses: 14,
    revelation: "Мадина",
    uzbekTranslation: "Осмону ердаги барча нарса Аллоҳни тасбеҳ қилур.",
    arabicText: "سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/061.mp3"
  },
  {
    number: 62,
    name: "Al-Jumuʿah",
    arabicName: "الجمعة",
    uzbekName: "Жумъа",
    russianUzbek: "Йусаббиху лиллаҳи mà фис-самавàти ва mà фил-арз.",
    verses: 11,
    revelation: "Мадина",
    uzbekTranslation: "Осмону ердаги барча нарса Аллоҳни тасбеҳ этур.",
    arabicText: "يُسَبِّحُ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/062.mp3"
  },
  {
    number: 63,
    name: "Al-Munāfiqūn",
    arabicName: "المنافقون",
    uzbekName: "Мунофиқун",
    russianUzbek: "Изà ҷàака-л-мунàфиқýн қàлу нащҳаду иннака ла расýлуллоҳ.",
    verses: 11,
    revelation: "Мадина",
    uzbekTranslation: "Мунофиқлар сенинг ҳузурингга келиб: «Албатта сен Аллоҳнинг Расулисан», дейдилар.",
    arabicText: "إِذَا جَاءَكَ الْمُنَافِقُونَ قَالُوا نَشْهَدُ إِنَّكَ لَرَسُولُ اللَّهِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/063.mp3"
  },
  {
    number: 64,
    name: "At-Taghābun",
    arabicName: "التغابن",
    uzbekName: "Тагабун",
    russianUzbek: "Йусаббиху лиллаҳи mà фис-самавàти ва mà фил-арз.",
    verses: 18,
    revelation: "Мадина",
    uzbekTranslation: "Осмону ердаги барча нарса Аллоҳни тасбеҳ этур.",
    arabicText: "يُسَبِّحُ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/064.mp3"
  },
  {
    number: 65,
    name: "At-Talāq",
    arabicName: "الطلاق",
    uzbekName: "Талоқ",
    russianUzbek: "Йà аййуҳàн-набййý изà толлақтумун-нисà’а фа толлиқýҳунна ли-ъиддатиҳинна.",
    verses: 12,
    revelation: "Мадина",
    uzbekTranslation: "Эй пайғамбар! Аёлларни талоқ қилсангиз, уларнинг ъиддасига мувофиқ талоқ қилинг.",
    arabicText: "يَا أَيُّهَا النَّبِيُّ إِذَا طَلَّقْتُمُ النِّسَاءَ فَطَلِّقُوهُنَّ لِعِدَّتِهِنَّ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/065.mp3"
  },
  {
    number: 66,
    name: "At-Taḥrīm",
    arabicName: "التحريم",
    uzbekName: "Таҳрим",
    russianUzbek: "Йà аййуҳàн-набййý лима тухарриму mà аҳаллоллоҳу лак.",
    verses: 12,
    revelation: "Мадина",
    uzbekTranslation: "Эй пайғамбар! Аллоҳ сенга ҳалол қилган нарсани нега ўзингга ҳаром қиласан?",
    arabicText: "يَا أَيُّهَا النَّبِيُّ لِمَ تُحَرِّمُ مَا أَحَلَّ اللَّهُ لَكَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/066.mp3"
  },
  {
    number: 67,
    name: "Al-Mulk",
    arabicName: "الملك",
    uzbekName: "Мулк",
    russianUzbek: "Табàрокаллазúй би-ядихил-мулку ва ҳува ъалà кулли шай’ин қодúр.",
    verses: 30,
    revelation: "Макка",
    uzbekTranslation: "Муборак бўлсин у Зотки, бутун мулк Унинг қўлида ва У ҳар бир нарсага қодир.",
    arabicText: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/067.mp3"
  },
  {
    number: 68,
    name: "Al-Qalam",
    arabicName: "القلم",
    uzbekName: "Қалам",
    russianUzbek: "Нýн. Вал-қолами ва mà йастýрун.",
    verses: 52,
    revelation: "Макка",
    uzbekTranslation: "Нун. Қаламга ва улар ёзиб турган нарсаларга қасам.",
    arabicText: "ن ۚ وَالْقَلَمِ وَمَا يَسْطُرُونَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/068.mp3"
  },
  {
    number: 69,
    name: "Al-Ḥāqqah",
    arabicName: "الحاقة",
    uzbekName: "Ҳоққа",
    russianUzbek: "Ал-ҳàққату.",
    verses: 52,
    revelation: "Макка",
    uzbekTranslation: "Ҳақиқат келадиган қиёмат.",
    arabicText: "الْحَاقَّةُ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/069.mp3"
  },
  {
    number: 70,
    name: "Al-Maʿārij",
    arabicName: "المعارج",
    uzbekName: "Маориж",
    russianUzbek: "Са’ала саàилум би-ъазàбин вàқиъ.",
    verses: 44,
    revelation: "Макка",
    uzbekTranslation: "Сўровчи яқин келадиган азоб ҳақида сўради.",
    arabicText: "سَأَلَ سَائِلٌ بِعَذَابٍ وَاقِعٍ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/070.mp3"
  },
    {
    number: 71,
    name: "Nūḥ",
    arabicName: "نوح",
    uzbekName: "Нух",
    russianUzbek: "Иннà арсàлнà нýҳан илà қавмиҳи.",
    verses: 28,
    revelation: "Макка",
    uzbekTranslation: "Албатта Биз Нухни ўз қавмига юбордик.",
    arabicText: "إِنَّا أَرْسَلْنَا نُوحًا إِلَى قَوْمِهِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/071.mp3"
  },
  {
    number: 72,
    name: "Al-Jinn",
    arabicName: "الجن",
    uzbekName: "Жинн",
    russianUzbek: "Қул ùҳиýa илаййа аннаҳу-стамаъа нафарум-минал-жинн.",
    verses: 28,
    revelation: "Макка",
    uzbekTranslation: "Айт: «Мenga ваҳий қилинди: бир гуруҳ жинлар Қуръонни эшитдилар».",
    arabicText: "قُلْ أُوحِيَ إِلَيَّ أَنَّهُ اسْتَمَعَ نَفَرٌ مِّنَ الْجِنِّ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/072.mp3"
  },
  {
    number: 73,
    name: "Al-Muzzammil",
    arabicName: "المزمل",
    uzbekName: "Муззммил",
    russianUzbek: "Йà аййуҳàл-муззаммýл.",
    verses: 20,
    revelation: "Макка",
    uzbekTranslation: "Эй кийимга ўралган (пайғамбар)!",
    arabicText: "يَا أَيُّهَا الْمُزَّمِّلُ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/073.mp3"
  },
  {
    number: 74,
    name: "Al-Muddaththir",
    arabicName: "المدثر",
    uzbekName: "Муддассир",
    russianUzbek: "Йà аййуҳàл-муддассúр.",
    verses: 56,
    revelation: "Макка",
    uzbekTranslation: "Эй ёпиниб олган (пайғамбар)!",
    arabicText: "يَا أَيُّهَا الْمُدَّثِّرُ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/074.mp3"
  },
  {
    number: 75,
    name: "Al-Qiyāmah",
    arabicName: "القيامة",
    uzbekName: "Қиёмат",
    russianUzbek: "Лà uqsimу би-йавмил-қийàма.",
    verses: 40,
    revelation: "Макка",
    uzbekTranslation: "Қиёмат кунига қасам ичаман.",
    arabicText: "لَا أُقْسِمُ بِيَوْمِ الْقِيَامَةِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/075.mp3"
  },
  {
    number: 76,
    name: "Al-Insān",
    arabicName: "الإنسان",
    uzbekName: "Инсон",
    russianUzbek: "Ҳал àтà ъалàл-инсàни ҳúнум-мин ад-даҳр.",
    verses: 31,
    revelation: "Мадина",
    uzbekTranslation: "Албатта инсоннинг бошига бир вақт келдики...",
    arabicText: "هَلْ أَتَى عَلَى الْإِنسَانِ حِينٌ مِّنَ الدَّهْرِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/076.mp3"
  },
  {
    number: 77,
    name: "Al-Mursalāt",
    arabicName: "المرسلات",
    uzbekName: "Мурсалот",
    russianUzbek: "Вал-мурсалàти ъурфà.",
    verses: 50,
    revelation: "Макка",
    uzbekTranslation: "Қасам юборилган шамолларга.",
    arabicText: "وَالْمُرْسَلَاتِ عُرْفًا ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/077.mp3"
  },
  {
    number: 78,
    name: "An-Nabaʾ",
    arabicName: "النبأ",
    uzbekName: "Набаъ",
    russianUzbek: "Ъамма йатасàалýн.",
    verses: 40,
    revelation: "Макка",
    uzbekTranslation: "Нима ҳақида савол суришмоқда?",
    arabicText: "عَمَّ يَتَسَاءَلُونَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/078.mp3"
  },
  {
    number: 79,
    name: "An-Nāziʿāt",
    arabicName: "النازعات",
    uzbekName: "Нозиъот",
    russianUzbek: "Ван-нàзиъàти ғàрқà.",
    verses: 46,
    revelation: "Макка",
    uzbekTranslation: "Қасам чуқур суғуриб олувчи (фаришталар)га.",
    arabicText: "وَالنَّازِعَاتِ غَرْقًا ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/079.mp3"
  },
  {
    number: 80,
    name: "ʿAbasa",
    arabicName: "عبس",
    uzbekName: "Абаса",
    russianUzbek: "Ъабаса ва таваллà.",
    verses: 42,
    revelation: "Макка",
    uzbekTranslation: "У (мушрик) турсаклади ва юз ўгирди.",
    arabicText: "عَبَسَ وَتَوَلَّى ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/080.mp3"
  },
  {
    number: 81,
    name: "At-Takwīr",
    arabicName: "التكوير",
    uzbekName: "Таквир",
    russianUzbek: "Изàш-шамсу куwwирàт.",
    verses: 29,
    revelation: "Макка",
    uzbekTranslation: "Қачонки қуёш ўралиб қолса.",
    arabicText: "إِذَا الشَّمْسُ كُوِّرَتْ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/081.mp3"
  },
  {
    number: 82,
    name: "Al-Infiṭār",
    arabicName: "الإنفطار",
    uzbekName: "Инфитор",
    russianUzbek: "Изàс-самàу-нфатарàт.",
    verses: 19,
    revelation: "Макка",
    uzbekTranslation: "Қачонки осмон ярилса.",
    arabicText: "إِذَا السَّمَاءُ انفَطَرَتْ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/082.mp3"
  },
  {
    number: 83,
    name: "Al-Muṭaffifīn",
    arabicName: "المطففين",
    uzbekName: "Мутаффифин",
    russianUzbek: "Вайлул-ил-мýтаффифúн.",
    verses: 36,
    revelation: "Макка",
    uzbekTranslation: "Улгурмасдан ўлчаб қолувчиларга ҳалакат.",
    arabicText: "وَيْلٌ لِّلْمُطَفِّفِينَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/083.mp3"
  },
  {
    number: 84,
    name: "Al-Inshiqqāq",
    arabicName: "الإنشقاق",
    uzbekName: "Иншиқоқ",
    russianUzbek: "Изàс-самàу-ншаққàт.",
    verses: 25,
    revelation: "Макка",
    uzbekTranslation: "Қачонки осмон ёрилиб кетса.",
    arabicText: "إِذَا السَّمَاءُ انشَقَّتْ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/084.mp3"
  },
  {
    number: 85,
    name: "Al-Burūj",
    arabicName: "البروج",
    uzbekName: "Буруж",
    russianUzbek: "Вас-самàи зàтил-бурýж.",
    verses: 22,
    revelation: "Макка",
    uzbekTranslation: "Қасам буржлар соҳиби осмонга.",
    arabicText: "وَالسَّمَاءِ ذَاتِ الْبُرُوجِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/085.mp3"
  },
  {
    number: 86,
    name: "Aṭ-Ṭāriq",
    arabicName: "الطارق",
    uzbekName: "Ториқ",
    russianUzbek: "Вас-самàи ват-торúқ.",
    verses: 17,
    revelation: "Макка",
    uzbekTranslation: "Қасам осмонга ва тунда келувчи юлдузга.",
    arabicText: "وَالسَّمَاءِ وَالطَّارِقِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/086.mp3"
  },
  {
    number: 87,
    name: "Al-Aʿlā",
    arabicName: "الأعلى",
    uzbekName: "Аъло",
    russianUzbek: "Саббиҳисма роббикал-аълà.",
    verses: 19,
    revelation: "Макка",
    uzbekTranslation: "Улуғ Роббингнинг номини тасбеҳ эт.",
    arabicText: "سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/087.mp3"
  },
  {
    number: 88,
    name: "Al-Ghāshiyah",
    arabicName: "الغاشية",
    uzbekName: "Ғошия",
    russianUzbek: "Ҳал атàка ҳадúсул-ғàшия.",
    verses: 26,
    revelation: "Макка",
    uzbekTranslation: "Сенга Қиёмат қийинлиги ҳақида хабар етдими?",
    arabicText: "هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/088.mp3"
  },
  {
    number: 89,
    name: "Al-Fajr",
    arabicName: "الفجر",
    uzbekName: "Фажр",
    russianUzbek: "Вал-фажр.",
    verses: 30,
    revelation: "Макка",
    uzbekTranslation: "Қасам тонгга.",
    arabicText: "وَالْفَجْرِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/089.mp3"
  },
  {
    number: 90,
    name: "Al-Balad",
    arabicName: "البلد",
    uzbekName: "Балад",
    russianUzbek: "Лà uqsimу би ҳàзал-балад.",
    verses: 20,
    revelation: "Макка",
    uzbekTranslation: "Бу шаҳарга қасам ичаман.",
    arabicText: "لَا أُقْسِمُ بِهَذَا الْبَلَدِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/090.mp3"
  },
    {
    number: 91,
    name: "Ash-Shams",
    arabicName: "الشمس",
    uzbekName: "Шамс",
    russianUzbek: "Ваш-шамси ва дуҳоҳо.",
    verses: 15,
    revelation: "Макка",
    uzbekTranslation: "Қасам қуёшга ва унинг ёруғлигига.",
    arabicText: "وَالشَّمْسِ وَضُحَاهَا ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/091.mp3"
  },
  {
    number: 92,
    name: "Al-Layl",
    arabicName: "الليل",
    uzbekName: "Лайл",
    russianUzbek: "Вал-лайли изà йағшà.",
    verses: 21,
    revelation: "Макка",
    uzbekTranslation: "Қасам кеча қоплаганда.",
    arabicText: "وَاللَّيْلِ إِذَا يَغْشَى ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/092.mp3"
  },
  {
    number: 93,
    name: "Aḍ-Ḍuḥa",
    arabicName: "الضحى",
    uzbekName: "Зуҳо",
    russianUzbek: "Вад-дуҳо.",
    verses: 11,
    revelation: "Макка",
    uzbekTranslation: "Қасам чошгоҳ нурга.",
    arabicText: "وَالضُّحَى ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/093.mp3"
  },
  {
    number: 94,
    name: "Ash-Sharḥ",
    arabicName: "الشرح",
    uzbekName: "Шарх",
    russianUzbek: "Алам нашраҳ лака содрак.",
    verses: 8,
    revelation: "Макка",
    uzbekTranslation: "Сен учун кўкрагингни очмадикми?",
    arabicText: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/094.mp3"
  },
  {
    number: 95,
    name: "At-Tīn",
    arabicName: "التين",
    uzbekName: "Тийн",
    russianUzbek: "Ват-тийни ваз-зайтýн.",
    verses: 8,
    revelation: "Макка",
    uzbekTranslation: "Қасам анжирга ва зайтунга.",
    arabicText: "وَالتِّينِ وَالزَّيْتُونِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/095.mp3"
  },
  {
    number: 96,
    name: "Al-ʿAlaq",
    arabicName: "العلق",
    uzbekName: "Алақ",
    russianUzbek: "Иқра’ бисми роббикал-лазӣ халақ.",
    verses: 19,
    revelation: "Макка",
    uzbekTranslation: "Ўқи! Яратган Роббинг номи билан.",
    arabicText: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/096.mp3"
  },
  {
    number: 97,
    name: "Al-Qadr",
    arabicName: "القدر",
    uzbekName: "Қадр",
    russianUzbek: "Иннà анзалнàҳу фи лайлатил-қадр.",
    verses: 5,
    revelation: "Макка",
    uzbekTranslation: "Биз уни Қадр кечасида нозил қилдик.",
    arabicText: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/097.mp3"
  },
  {
    number: 98,
    name: "Al-Bayyinah",
    arabicName: "البينة",
    uzbekName: "Баййина",
    russianUzbek: "Лам йàкунил-лазúна кафарý мин аҳлил-китàби вал-мушрикин.",
    verses: 8,
    revelation: "Мадина",
    uzbekTranslation: "Китоб аҳли ва мушриклардан кофирлар ажралиб турмадилар...",
    arabicText: "لَمْ يَكُنِ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/098.mp3"
  },
  {
    number: 99,
    name: "Az-Zalzalah",
    arabicName: "الزلزلة",
    uzbekName: "Зилзила",
    russianUzbek: "Изà зулзилатил-арзу зилзàлаҳа.",
    verses: 8,
    revelation: "Мадина",
    uzbekTranslation: "Ер ўзининг силкинишлари билан силкинганда.",
    arabicText: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/099.mp3"
  },
  {
    number: 100,
    name: "Al-ʿĀdiyāt",
    arabicName: "العاديات",
    uzbekName: "Одийот",
    russianUzbek: "Вал-ъàдийàти добà.",
    verses: 11,
    revelation: "Макка",
    uzbekTranslation: "Қасам chopuvchi отларга.",
    arabicText: "وَالْعَادِيَاتِ ضَبْحًا ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/100.mp3"
  },
  {
    number: 101,
    name: "Al-Qāriʿah",
    arabicName: "القارعة",
    uzbekName: "Қориъа",
    russianUzbek: "Ал-қòриъа.",
    verses: 11,
    revelation: "Макка",
    uzbekTranslation: "Қиёматнинг қаттиқ зарбаси.",
    arabicText: "الْقَارِعَةُ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/101.mp3"
  },
  {
    number: 102,
    name: "At-Takāthur",
    arabicName: "التكاثر",
    uzbekName: "Такосур",
    russianUzbek: "Алҳаàкумут-Такàсур.",
    verses: 8,
    revelation: "Макка",
    uzbekTranslation: "Кўпчиликка ортиқча ғурур сизни шуғуллантирди.",
    arabicText: "أَلْهَاكُمُ التَّكَاثُرُ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/102.mp3"
  },
  {
    number: 103,
    name: "Al-ʿAṣr",
    arabicName: "العصر",
    uzbekName: "Аср",
    russianUzbek: "Вал-ъаср.",
    verses: 3,
    revelation: "Макка",
    uzbekTranslation: "Қасам асрга.",
    arabicText: "وَالْعَصْرِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/103.mp3"
  },
  {
    number: 104,
    name: "Al-Humazah",
    arabicName: "الهمزة",
    uzbekName: "Ҳумаза",
    russianUzbek: "Вайлул-ли-кулли ҳумазатил-лумàза.",
    verses: 9,
    revelation: "Макка",
    uzbekTranslation: "Ҳар бир ҳақоратчи ва маломатчига ҳалокат.",
    arabicText: "وَيْلٌ لِكُلِّ هُمَزَةٍ لُّمَزَةٍ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/104.mp3"
  },
  {
    number: 105,
    name: "Al-Fīl",
    arabicName: "الفيل",
    uzbekName: "Фил",
    russianUzbek: "Алам тара кайфа фаъала роббука би-асҳàбил-фúл.",
    verses: 5,
    revelation: "Макка",
    uzbekTranslation: "Роббинг фил аҳли билан қандай иш тутганини кўрмадингми?",
    arabicText: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/105.mp3"
  },
  {
    number: 106,
    name: "Quraysh",
    arabicName: "قريش",
    uzbekName: "Қурайш",
    russianUzbek: "Ли-ílàфи Қурайш.",
    verses: 4,
    revelation: "Макка",
    uzbekTranslation: "Қурайшнинг муҳофазаси учун.",
    arabicText: "لِإِيلَافِ قُرَيْشٍ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/106.mp3"
  },
  {
    number: 107,
    name: "Al-Māʿūn",
    arabicName: "الماعون",
    uzbekName: "Маъун",
    russianUzbek: "Араайта-ллазӣ йуказзибу бид-дийн.",
    verses: 7,
    revelation: "Макка",
    uzbekTranslation: "Динни ёлғонга чиқарувчини кўрдингми?",
    arabicText: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/107.mp3"
  },
  {
    number: 108,
    name: "Al-Kawthar",
    arabicName: "الكوثر",
    uzbekName: "Кавсар",
    russianUzbek: "Иннà аътойнàкал-кавсар.",
    verses: 3,
    revelation: "Макка",
    uzbekTranslation: "Албатта, Биз сенга Кавсарни бердик.",
    arabicText: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/108.mp3"
  },
  {
    number: 109,
    name: "Al-Kāfirūn",
    arabicName: "الكافرون",
    uzbekName: "Кофирун",
    russianUzbek: "Қул йà аййуҳал-кàфирýн.",
    verses: 6,
    revelation: "Макка",
    uzbekTranslation: "Айт: «Эй кофирлар!».",
    arabicText: "قُلْ يَا أَيُّهَا الْكَافِرُونَ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/109.mp3"
  },
  {
    number: 110,
    name: "An-Naṣr",
    arabicName: "النصر",
    uzbekName: "Наср",
    russianUzbek: "Изà жàа насруллоҳи вал-фатҳ.",
    verses: 3,
    revelation: "Мадина",
    uzbekTranslation: "Аллоҳнинг ёрдами ва ғалаба келганда.",
    arabicText: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/110.mp3"
  },
  {
    number: 111,
    name: "Al-Masad",
    arabicName: "المسد",
    uzbekName: "Масад",
    russianUzbek: "Таббат йада аби Лаҳабин ва табб.",
    verses: 5,
    revelation: "Макка",
    uzbekTranslation: "Абу Лаҳабнинг қўллари ҳалокатга учрасин!",
    arabicText: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/111.mp3"
  },
  {
    number: 112,
    name: "Al-Ikhlāṣ",
    arabicName: "الإخلاص",
    uzbekName: "Ихлос",
    russianUzbek: "Қул ҳуваллоҳу аҳад.",
    verses: 4,
    revelation: "Макка",
    uzbekTranslation: "Айт: У Аллоҳ — ягона.",
    arabicText: "قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/112.mp3"
  },
  {
    number: 113,
    name: "Al-Falaq",
    arabicName: "الفلق",
    uzbekName: "Фалақ",
    russianUzbek: "Қул аъýзу би роббил-фалақ.",
    verses: 5,
    revelation: "Макка",
    uzbekTranslation: "Айт: «Тонгнинг Роббисига сиғинаман».",
    arabicText: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/113.mp3"
  },
  {
    number: 114,
    name: "An-Nās",
    arabicName: "الناس",
    uzbekName: "Нас",
    russianUzbek: "Қул аъýзу би роббин-нàс.",
    verses: 6,
    revelation: "Макка",
    uzbekTranslation: "Айт: «Инсонларнинг Роббисига сиғинаман».",
    arabicText: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾",
    audioUrl: "https://server8.mp3quran.net/afs/114.mp3"
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
