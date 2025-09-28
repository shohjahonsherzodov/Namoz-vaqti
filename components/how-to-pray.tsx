"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Clock } from "lucide-react"

interface PrayerComponent {
  name: string
  arabic: string
  transliteration: string
  uzbek: string
  type: "azon" | "iqomat" | "niyat" | "rakat" | "tasbeh" | "vitr"
  rakats?: number
  details?: string[]
}

interface Prayer {
  name: string
  arabicName: string
  components: PrayerComponent[]
}

const prayerData: Prayer[] = [
  {
    name: "Bomdod namozi",
    arabicName: "صلاة الفجر",
    components: [
      {
        name: "Azon",
        arabic:
          "الله أكبر الله أكبر، أشهد أن لا إله إلا الله، أشهد أن محمداً رسول الله، حي على الصلاة، حي على الفلاح، الصلاة خير من النوم، الله أكبر الله أكبر، لا إله إلا الله",
        transliteration:
          "Allahu akbar Allahu akbar, Ashhadu an la ilaha illa Allah, Ashhadu anna Muhammadan rasul Allah, Hayya 'ala as-salah, Hayya 'ala al-falah, As-salatu khayrun min an-nawm, Allahu akbar Allahu akbar, La ilaha illa Allah",
        uzbek:
          "Alloh eng ulugdir, Alloh eng ulugdir. Guvohlik beramanki, Allohdan boshqa iloh yo'q. Guvohlik beramanki, Muhammad Allohning rasulidir. Namozga keling! Najotga keling! Namoz uyqudan yaxshiroqdir. Alloh eng ulugdir, Alloh eng ulugdir. Allohdan boshqa iloh yo'q.",
        type: "azon",
      },
      {
        name: "Azon duosi",
        arabic: "اللهم رب هذه الدعوة التامة والصلاة القائمة آت محمداً الوسيلة والفضيلة وابعثه مقاماً محموداً الذي وعدته",
        transliteration:
          "Allahumma rabba hadhihi ad-da'wati at-tammati wa as-salati al-qa'imati, ati Muhammadan al-wasilata wa al-fadilata, wa ab'athhu maqaman mahmuda alladhi wa'adtahu",
        uzbek:
          "Ey Alloh! Bu mukammal da'vat va o'rnatilgan namozning Rabbisi, Muhammadga vosila va fazilat ber va uni va'da qilgan maqtovli maqomga ko'tar.",
        type: "azon",
      },
      {
        name: "Iqomat",
        arabic:
          "الله أكبر الله أكبر، أشهد أن لا إله إلا الله، أشهد أن محمداً رسول الله، حي على الصلاة، حي على الفلاح، قد قامت الصلاة قد قامت الصلاة، الله أكبر الله أكبر، لا إله إلا الله",
        transliteration:
          "Allahu akbar Allahu akbar, Ashhadu an la ilaha illa Allah, Ashhadu anna Muhammadan rasul Allah, Hayya 'ala as-salah, Hayya 'ala al-falah, Qad qamat as-salah qad qamat as-salah, Allahu akbar Allahu akbar, La ilaha illa Allah",
        uzbek:
          "Alloh eng ulugdir, Alloh eng ulugdir. Guvohlik beramanki, Allohdan boshqa iloh yo'q. Guvohlik beramanki, Muhammad Allohning rasulidir. Namozga keling! Najotga keling! Namoz boshlandi, namoz boshlandi! Alloh eng ulugdir, Alloh eng ulugdir. Allohdan boshqa iloh yo'q.",
        type: "iqomat",
      },
      {
        name: "Niyat",
        arabic: "نويت أن أصلي فرض الفجر ركعتين مستقبل القبلة الله أكبر",
        transliteration: "Navaitu an usalli farda al-fajri rak'atayn mustaqbil al-qiblati Allahu akbar",
        uzbek: "Bomdod namozining ikki rakat farzini qibla tomonga qarab o'qishni niyat qildim, Alloh eng ulugdir.",
        type: "niyat",
      },
      {
        name: "Sunnat",
        arabic: "2 rakat sunnat",
        transliteration: "2 rakat sunnat",
        uzbek: "2 rakat sunnat namozi",
        type: "rakat",
        rakats: 2,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Farz",
        arabic: "2 rakat farz",
        transliteration: "2 rakat farz",
        uzbek: "2 rakat farz namozi",
        type: "rakat",
        rakats: 2,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Tasbeh va duo",
        arabic: "سبحان الله والحمد لله والله أكبر",
        transliteration: "Subhan Allah wa al-hamdu lillahi wa Allahu akbar",
        uzbek: "Allohni poklayman, Allohga hamd bo'lsin, Alloh eng ulugdir (33 marta har birini)",
        type: "tasbeh",
      },
    ],
  },
  {
    name: "Peshin namozi",
    arabicName: "صلاة الظهر",
    components: [
      {
        name: "Azon",
        arabic:
          "الله أكبر الله أكبر، أشهد أن لا إله إلا الله، أشهد أن محمداً رسول الله، حي على الصلاة، حي على الفلاح، الله أكبر الله أكبر، لا إله إلا الله",
        transliteration:
          "Allahu akbar Allahu akbar, Ashhadu an la ilaha illa Allah, Ashhadu anna Muhammadan rasul Allah, Hayya 'ala as-salah, Hayya 'ala al-falah, Allahu akbar Allahu akbar, La ilaha illa Allah",
        uzbek:
          "Alloh eng ulugdir, Alloh eng ulugdir. Guvohlik beramanki, Allohdan boshqa iloh yo'q. Guvohlik beramanki, Muhammad Allohning rasulidir. Namozga keling! Najotga keling! Alloh eng ulugdir, Alloh eng ulugdir. Allohdan boshqa iloh yo'q.",
        type: "azon",
      },
      {
        name: "Azon duosi",
        arabic: "اللهم رب هذه الدعوة التامة والصلاة القائمة آت محمداً الوسيلة والفضيلة وابعثه مقاماً محموداً الذي وعدته",
        transliteration:
          "Allahumma rabba hadhihi ad-da'wati at-tammati wa as-salati al-qa'imati, ati Muhammadan al-wasilata wa al-fadilata, wa ab'athhu maqaman mahmuda alladhi wa'adtahu",
        uzbek:
          "Ey Alloh! Bu mukammal da'vat va o'rnatilgan namozning Rabbisi, Muhammadga vosila va fazilat ber va uni va'da qilgan maqtovli maqomga ko'tar.",
        type: "azon",
      },
      {
        name: "Iqomat",
        arabic:
          "الله أكبر الله أكبر، أشهد أن لا إله إلا الله، أشهد أن محمداً رسول الله، حي على الصلاة، حي على الفلاح، قد قامت الصلاة قد قامت الصلاة، الله أكبر الله أكبر، لا إله إلا الله",
        transliteration:
          "Allahu akbar Allahu akbar, Ashhadu an la ilaha illa Allah, Ashhadu anna Muhammadan rasul Allah, Hayya 'ala as-salah, Hayya 'ala al-falah, Qad qamat as-salah qad qamat as-salah, Allahu akbar Allahu akbar, La ilaha illa Allah",
        uzbek:
          "Alloh eng ulugdir, Alloh eng ulugdir. Guvohlik beramanki, Allohdan boshqa iloh yo'q. Guvohlik beramanki, Muhammad Allohning rasulidir. Namozga keling! Najotga keling! Namoz boshlandi, namoz boshlandi! Alloh eng ulugdir, Alloh eng ulugdir. Allohdan boshqa iloh yo'q.",
        type: "iqomat",
      },
      {
        name: "Niyat",
        arabic: "نويت أن أصلي فرض الظهر أربع ركعات مستقبل القبلة الله أكبر",
        transliteration: "Navaitu an usalli farda az-zuhri arba'a raka'atin mustaqbil al-qiblati Allahu akbar",
        uzbek: "Peshin namozining to'rt rakat farzini qibla tomonga qarab o'qishni niyat qildim, Alloh eng ulugdir.",
        type: "niyat",
      },
      {
        name: "Sunnat (avval)",
        arabic: "4 rakat sunnat",
        transliteration: "4 rakat sunnat",
        uzbek: "4 rakat sunnat namozi (farzdan oldin)",
        type: "rakat",
        rakats: 4,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da",
          "3-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "4-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Farz",
        arabic: "4 rakat farz",
        transliteration: "4 rakat farz",
        uzbek: "4 rakat farz namozi",
        type: "rakat",
        rakats: 4,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da",
          "3-rakat: Takbir, Fotiha, ruku, sajda",
          "4-rakat: Takbir, Fotiha, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Sunnat (oxiri)",
        arabic: "2 rakat sunnat",
        transliteration: "2 rakat sunnat",
        uzbek: "2 rakat sunnat namozi (farzdan keyin)",
        type: "rakat",
        rakats: 2,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Tasbeh va duo",
        arabic: "سبحان الله والحمد لله والله أكبر",
        transliteration: "Subhan Allah wa al-hamdu lillahi wa Allahu akbar",
        uzbek: "Allohni poklayman, Allohga hamd bo'lsin, Alloh eng ulugdir (33 marta har birini)",
        type: "tasbeh",
      },
    ],
  },
  {
    name: "Asr namozi",
    arabicName: "صلاة العصر",
    components: [
      {
        name: "Azon",
        arabic:
          "الله أكبر الله أكبر، أشهد أن لا إله إلا الله، أشهد أن محمداً رسول الله، حي على الصلاة، حي على الفلاح، الله أكبر الله أكبر، لا إله إلا الله",
        transliteration:
          "Allahu akbar Allahu akbar, Ashhadu an la ilaha illa Allah, Ashhadu anna Muhammadan rasul Allah, Hayya 'ala as-salah, Hayya 'ala al-falah, Allahu akbar Allahu akbar, La ilaha illa Allah",
        uzbek:
          "Alloh eng ulugdir, Alloh eng ulugdir. Guvohlik beramanki, Allohdan boshqa iloh yo'q. Guvohlik beramanki, Muhammad Allohning rasulidir. Namozga keling! Najotga keling! Alloh eng ulugdir, Alloh eng ulugdir. Allohdan boshqa iloh yo'q.",
        type: "azon",
      },
      {
        name: "Azon duosi",
        arabic: "اللهم رب هذه الدعوة التامة والصلاة القائمة آت محمداً الوسيلة والفضيلة وابعثه مقاماً محموداً الذي وعدته",
        transliteration:
          "Allahumma rabba hadhihi ad-da'wati at-tammati wa as-salati al-qa'imati, ati Muhammadan al-wasilata wa al-fadilata, wa ab'athhu maqaman mahmuda alladhi wa'adtahu",
        uzbek:
          "Ey Alloh! Bu mukammal da'vat va o'rnatilgan namozning Rabbisi, Muhammadga vosila va fazilat ber va uni va'da qilgan maqtovli maqomga ko'tar.",
        type: "azon",
      },
      {
        name: "Iqomat",
        arabic:
          "الله أكبر الله أكبر، أشهد أن لا إله إلا الله، أشهد أن محمداً رسول الله، حي على الصلاة، حي على الفلاح، قد قامت الصلاة قد قامت الصلاة، الله أكبر الله أكبر، لا إله إلا الله",
        transliteration:
          "Allahu akbar Allahu akbar, Ashhadu an la ilaha illa Allah, Ashhadu anna Muhammadan rasul Allah, Hayya 'ala as-salah, Hayya 'ala al-falah, Qad qamat as-salah qad qamat as-salah, Allahu akbar Allahu akbar, La ilaha illa Allah",
        uzbek:
          "Alloh eng ulugdir, Alloh eng ulugdir. Guvohlik beramanki, Allohdan boshqa iloh yo'q. Guvohlik beramanki, Muhammad Allohning rasulidir. Namozga keling! Najotga keling! Namoz boshlandi, namoz boshlandi! Alloh eng ulugdir, Alloh eng ulugdir. Allohdan boshqa iloh yo'q.",
        type: "iqomat",
      },
      {
        name: "Niyat",
        arabic: "نويت أن أصلي فرض العصر أربع ركعات مستقبل القبلة الله أكبر",
        transliteration: "Navaitu an usalli farda al-'asri arba'a raka'atin mustaqbil al-qiblati Allahu akbar",
        uzbek: "Asr namozining to'rt rakat farzini qibla tomonga qarab o'qishni niyat qildim, Alloh eng ulugdir.",
        type: "niyat",
      },
      {
        name: "Farz",
        arabic: "4 rakat farz",
        transliteration: "4 rakat farz",
        uzbek: "4 rakat farz namozi",
        type: "rakat",
        rakats: 4,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da",
          "3-rakat: Takbir, Fotiha, ruku, sajda",
          "4-rakat: Takbir, Fotiha, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Tasbeh va duo",
        arabic: "سبحان الله والحمد لله والله أكبر",
        transliteration: "Subhan Allah wa al-hamdu lillahi wa Allahu akbar",
        uzbek: "Allohni poklayman, Allohga hamd bo'lsin, Alloh eng ulugdir (33 marta har birini)",
        type: "tasbeh",
      },
    ],
  },
  {
    name: "Shom namozi",
    arabicName: "صلاة المغرب",
    components: [
      {
        name: "Azon",
        arabic:
          "الله أكبر الله أكبر، أشهد أن لا إله إلا الله، أشهد أن محمداً رسول الله، حي على الصلاة، حي على الفلاح، الله أكبر الله أكبر، لا إله إلا الله",
        transliteration:
          "Allahu akbar Allahu akbar, Ashhadu an la ilaha illa Allah, Ashhadu anna Muhammadan rasul Allah, Hayya 'ala as-salah, Hayya 'ala al-falah, Allahu akbar Allahu akbar, La ilaha illa Allah",
        uzbek:
          "Alloh eng ulugdir, Alloh eng ulugdir. Guvohlik beramanki, Allohdan boshqa iloh yo'q. Guvohlik beramanki, Muhammad Allohning rasulidir. Namozga keling! Najotga keling! Alloh eng ulugdir, Alloh eng ulugdir. Allohdan boshqa iloh yo'q.",
        type: "azon",
      },
      {
        name: "Azon duosi",
        arabic: "اللهم رب هذه الدعوة التامة والصلاة القائمة آت محمداً الوسيلة والفضيلة وابعثه مقاماً محموداً الذي وعدته",
        transliteration:
          "Allahumma rabba hadhihi ad-da'wati at-tammati wa as-salati al-qa'imati, ati Muhammadan al-wasilata wa al-fadilata, wa ab'athhu maqaman mahmuda alladhi wa'adtahu",
        uzbek:
          "Ey Alloh! Bu mukammal da'vat va o'rnatilgan namozning Rabbisi, Muhammadga vosila va fazilat ber va uni va'da qilgan maqtovli maqomga ko'tar.",
        type: "azon",
      },
      {
        name: "Iqomat",
        arabic:
          "الله أكبر الله أكبر، أشهد أن لا إله إلا الله، أشهد أن محمداً رسول الله، حي على الصلاة، حي على الفلاح، قد قامت الصلاة قد قامت الصلاة، الله أكبر الله أكبر، لا إله إلا الله",
        transliteration:
          "Allahu akbar Allahu akbar, Ashhadu an la ilaha illa Allah, Ashhadu anna Muhammadan rasul Allah, Hayya 'ala as-salah, Hayya 'ala al-falah, Qad qamat as-salah qad qamat as-salah, Allahu akbar Allahu akbar, La ilaha illa Allah",
        uzbek:
          "Alloh eng ulugdir, Alloh eng ulugdir. Guvohlik beramanki, Allohdan boshqa iloh yo'q. Guvohlik beramanki, Muhammad Allohning rasulidir. Namozga keling! Najotga keling! Namoz boshlandi, namoz boshlandi! Alloh eng ulugdir, Alloh eng ulugdir. Allohdan boshqa iloh yo'q.",
        type: "iqomat",
      },
      {
        name: "Niyat",
        arabic: "نويت أن أصلي فرض المغرب ثلاث ركعات مستقبل القبلة الله أكبر",
        transliteration: "Navaitu an usalli farda al-maghribi thalatha raka'atin mustaqbil al-qiblati Allahu akbar",
        uzbek: "Shom namozining uch rakat farzini qibla tomonga qarab o'qishni niyat qildim, Alloh eng ulugdir.",
        type: "niyat",
      },
      {
        name: "Farz",
        arabic: "3 rakat farz",
        transliteration: "3 rakat farz",
        uzbek: "3 rakat farz namozi",
        type: "rakat",
        rakats: 3,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da",
          "3-rakat: Takbir, Fotiha, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Sunnat",
        arabic: "2 rakat sunnat",
        transliteration: "2 rakat sunnat",
        uzbek: "2 rakat sunnat namozi",
        type: "rakat",
        rakats: 2,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Tasbeh va duo",
        arabic: "سبحان الله والحمد لله والله أكبر",
        transliteration: "Subhan Allah wa al-hamdu lillahi wa Allahu akbar",
        uzbek: "Allohni poklayman, Allohga hamd bo'lsin, Alloh eng ulugdir (33 marta har birini)",
        type: "tasbeh",
      },
    ],
  },
  {
    name: "Xufton namozi",
    arabicName: "صلاة العشاء",
    components: [
      {
        name: "Azon",
        arabic:
          "الله أكبر الله أكبر، أشهد أن لا إله إلا الله، أشهد أن محمداً رسول الله، حي على الصلاة، حي على الفلاح، الله أكبر الله أكبر، لا إله إلا الله",
        transliteration:
          "Allahu akbar Allahu akbar, Ashhadu an la ilaha illa Allah, Ashhadu anna Muhammadan rasul Allah, Hayya 'ala as-salah, Hayya 'ala al-falah, Allahu akbar Allahu akbar, La ilaha illa Allah",
        uzbek:
          "Alloh eng ulugdir, Alloh eng ulugdir. Guvohlik beramanki, Allohdan boshqa iloh yo'q. Guvohlik beramanki, Muhammad Allohning rasulidir. Namozga keling! Najotga keling! Alloh eng ulugdir, Alloh eng ulugdir. Allohdan boshqa iloh yo'q.",
        type: "azon",
      },
      {
        name: "Azon duosi",
        arabic: "اللهم رب هذه الدعوة التامة والصلاة القائمة آت محمداً الوسيلة والفضيلة وابعثه مقاماً محموداً الذي وعدته",
        transliteration:
          "Allahumma rabba hadhihi ad-da'wati at-tammati wa as-salati al-qa'imati, ati Muhammadan al-wasilata wa al-fadilata, wa ab'athhu maqaman mahmuda alladhi wa'adtahu",
        uzbek:
          "Ey Alloh! Bu mukammal da'vat va o'rnatilgan namozning Rabbisi, Muhammadga vosila va fazilat ber va uni va'da qilgan maqtovli maqomga ko'tar.",
        type: "azon",
      },
      {
        name: "Iqomat",
        arabic:
          "الله أكبر الله أكبر، أشهد أن لا إله إلا الله، أشهد أن محمداً رسول الله، حي على الصلاة، حي على الفلاح، قد قامت الصلاة قد قامت الصلاة، الله أكبر الله أكبر، لا إله إلا الله",
        transliteration:
          "Allahu akbar Allahu akbar, Ashhadu an la ilaha illa Allah, Ashhadu anna Muhammadan rasul Allah, Hayya 'ala as-salah, Hayya 'ala al-falah, Qad qamat as-salah qad qamat as-salah, Allahu akbar Allahu akbar, La ilaha illa Allah",
        uzbek:
          "Alloh eng ulugdir, Alloh eng ulugdir. Guvohlik beramanki, Allohdan boshqa iloh yo'q. Guvohlik beramanki, Muhammad Allohning rasulidir. Namozga keling! Najotga keling! Namoz boshlandi, namoz boshlandi! Alloh eng ulugdir, Alloh eng ulugdir. Allohdan boshqa iloh yo'q.",
        type: "iqomat",
      },
      {
        name: "Niyat",
        arabic: "نويت أن أصلي فرض العشاء أربع ركعات مستقبل القبلة الله أكبر",
        transliteration: "Navaitu an usalli farda al-'isha'i arba'a raka'atin mustaqbil al-qiblati Allahu akbar",
        uzbek: "Xufton namozining to'rt rakat farzini qibla tomonga qarab o'qishni niyat qildim, Alloh eng ulugdir.",
        type: "niyat",
      },
      {
        name: "Sunnat (avval)",
        arabic: "4 rakat sunnat",
        transliteration: "4 rakat sunnat",
        uzbek: "4 rakat sunnat namozi (farzdan oldin)",
        type: "rakat",
        rakats: 4,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da",
          "3-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "4-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Farz",
        arabic: "4 rakat farz",
        transliteration: "4 rakat farz",
        uzbek: "4 rakat farz namozi",
        type: "rakat",
        rakats: 4,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da",
          "3-rakat: Takbir, Fotiha, ruku, sajda",
          "4-rakat: Takbir, Fotiha, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Sunnat (oxiri)",
        arabic: "2 rakat sunnat",
        transliteration: "2 rakat sunnat",
        uzbek: "2 rakat sunnat namozi (farzdan keyin)",
        type: "rakat",
        rakats: 2,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Vitr",
        arabic: "3 rakat vitr",
        transliteration: "3 rakat vitr",
        uzbek: "3 rakat vitr namozi (Qunut duosi bilan)",
        type: "vitr",
        rakats: 3,
        details: [
          "1-rakat: Takbir, Fotiha, sura, ruku, sajda",
          "2-rakat: Takbir, Fotiha, sura, ruku, sajda, qa'da",
          "3-rakat: Takbir, Fotiha, sura, Qunut duosi, ruku, sajda, qa'da, salom",
        ],
      },
      {
        name: "Tasbeh va duo",
        arabic: "سبحان الله والحمد لله والله أكبر",
        transliteration: "Subhan Allah wa al-hamdu lillahi wa Allahu akbar",
        uzbek: "Allohni poklayman, Allohga hamd bo'lsin, Alloh eng ulugdir (33 marta har birini)",
        type: "tasbeh",
      },
    ],
  },
]

export function HowToPray() {
  const [openPrayers, setOpenPrayers] = useState<string[]>([])
  const [openComponents, setOpenComponents] = useState<string[]>([])

  const togglePrayer = (prayerName: string) => {
    setOpenPrayers((prev) =>
      prev.includes(prayerName) ? prev.filter((name) => name !== prayerName) : [...prev, prayerName],
    )
  }

  const toggleComponent = (componentId: string) => {
    setOpenComponents((prev) =>
      prev.includes(componentId) ? prev.filter((id) => id !== componentId) : [...prev, componentId],
    )
  }

  const isPrayerOpen = (prayerName: string) => openPrayers.includes(prayerName)
  const isComponentOpen = (componentId: string) => openComponents.includes(componentId)

  const getComponentIcon = (type: string) => {
    switch (type) {
      case "azon":
        return "📢"
      case "iqomat":
        return "🔔"
      case "niyat":
        return "🤲"
      case "rakat":
        return "🕌"
      case "tasbeh":
        return "📿"
      case "vitr":
        return "🌙"
      default:
        return "📖"
    }
  }

  const getComponentColor = (type: string) => {
    switch (type) {
      case "azon":
        return "border-blue-500/30 bg-blue-500/10"
      case "iqomat":
        return "border-green-500/30 bg-green-500/10"
      case "niyat":
        return "border-purple-500/30 bg-purple-500/10"
      case "rakat":
        return "border-primary/30 bg-primary/10"
      case "tasbeh":
        return "border-orange-500/30 bg-orange-500/10"
      case "vitr":
        return "border-indigo-500/30 bg-indigo-500/10"
      default:
        return "border-muted/30 bg-muted/10"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary text-shadow-gold">Namoz O'qish</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Besh vaqt namozni to'liq o'qish uchun bosqichma-bosqich yo'riqnoma. Har bir namozning barcha qismlari: azon,
          iqomat, niyat, sunnat, farz va duo-tasbehlar bilan.
        </p>
      </div>

      {/* Prayer Guides */}
      <div className="space-y-4">
        {prayerData.map((prayer) => (
          <Card key={prayer.name} className="bg-card hover:bg-card/80 transition-colors">
            <Collapsible open={isPrayerOpen(prayer.name)} onOpenChange={() => togglePrayer(prayer.name)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {isPrayerOpen(prayer.name) ? (
                          <ChevronDown className="w-5 h-5 text-primary" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-primary" />
                        )}
                        <span className="text-primary">{prayer.name}</span>
                      </div>
                      <span className="text-lg text-muted-foreground font-arabic">{prayer.arabicName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-secondary">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{prayer.components.length} Bosqich</span>
                    </div>
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {prayer.components.map((component, index) => {
                      const componentId = `${prayer.name}-${index}`
                      return (
                        <Card
                          key={index}
                          className={`${getComponentColor(component.type)} border transition-all hover:shadow-md`}
                        >
                          <Collapsible
                            open={isComponentOpen(componentId)}
                            onOpenChange={() => toggleComponent(componentId)}
                          >
                            <CollapsibleTrigger asChild>
                              <CardHeader className="cursor-pointer hover:bg-background/20 transition-colors pb-3">
                                <CardTitle className="flex items-center justify-between text-base">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-xl">{getComponentIcon(component.type)}</span>
                                    <span className="text-primary font-semibold">{component.name}</span>
                                    {component.rakats && (
                                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                                        {component.rakats} rakat
                                      </span>
                                    )}
                                  </div>
                                  {isComponentOpen(componentId) ? (
                                    <ChevronDown className="w-4 h-4 text-primary" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-primary" />
                                  )}
                                </CardTitle>
                              </CardHeader>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                              <CardContent className="pt-0 space-y-4">
                                {/* Arabic Text */}
                                <div className="bg-background/50 rounded-lg p-4 border border-border/30">
                                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Arabcha:</h4>
                                  <p className="text-lg font-arabic text-center leading-relaxed">{component.arabic}</p>
                                </div>

                                {/* Transliteration */}
                                <div className="bg-background/30 rounded-lg p-4 border border-border/20">
                                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Talaffuz:</h4>
                                  <p className="text-sm text-muted-foreground italic text-center">
                                    {component.transliteration}
                                  </p>
                                </div>

                                {/* Uzbek Translation */}
                                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                                  <h4 className="text-sm font-semibold text-primary mb-2">O'zbek tarjima:</h4>
                                  <p className="text-sm text-card-foreground">{component.uzbek}</p>
                                </div>

                                {/* Rakat Details */}
                                {component.details && (
                                  <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/20">
                                    <h4 className="text-sm font-semibold text-secondary mb-3">Rakat tafsilotlari:</h4>
                                    <div className="space-y-2">
                                      {component.details.map((detail, detailIndex) => (
                                        <div key={detailIndex} className="flex items-start space-x-2">
                                          <span className="text-secondary text-xs mt-1">•</span>
                                          <span className="text-sm text-muted-foreground">{detail}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Special note for Vitr */}
                                {component.type === "vitr" && (
                                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                      <span className="text-indigo-500 text-lg">🌙</span>
                                      <div>
                                        <h4 className="font-semibold text-indigo-600 mb-1">Qunut duosi</h4>
                                        <p className="text-sm text-muted-foreground mb-2">
                                          Vitr namozining uchinchi rakatida Qunut duosi o'qiladi:
                                        </p>
                                        <div className="bg-background/50 rounded p-3 text-center">
                                          <p className="font-arabic text-base mb-1">اللهم اهدني فيمن هديت</p>
                                          <p className="text-xs text-muted-foreground italic">
                                            Allahumma ahdini fiman hadayt...
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </CollapsibleContent>
                          </Collapsible>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* General Guidelines */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-primary">Umumiy Ko'rsatmalar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-card-foreground flex items-center space-x-2">
                <span>🚿</span>
                <span>Namozdan Oldin</span>
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Tahorat oling va poklanib oling</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Qibla tomonga yuzlaning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Toza kiyim va joy ta'minlang</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Samimiy niyat qiling</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-card-foreground flex items-center space-x-2">
                <span>🤲</span>
                <span>Namoz Paytida</span>
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Diqqat va konsentratsiyani saqlang</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>To'g'ri talaffuz bilan o'qing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Sekin va ehtiyotkorlik bilan harakat qiling</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Ko'zlarni pastga qaratib turing</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
