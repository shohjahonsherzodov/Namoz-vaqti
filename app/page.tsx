"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { PrayerTimes } from "@/components/prayer-times"
import { HowToPray } from "@/components/how-to-pray"
import { QuranSurahs } from "@/components/quran-surahs"
import { Rivoyatlar } from "@/components/rivoyatlar"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("prayer-times")

  const renderActiveSection = () => {
    switch (activeSection) {
      case "prayer-times":
        return <PrayerTimes />
      case "how-to-pray":
        return <HowToPray />
      case "quran-surahs":
        return <QuranSurahs />
      case "rivoyatlar":
        return <Rivoyatlar />
      default:
        return <PrayerTimes />
    }
  }

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="container mx-auto px-4 py-8">{renderActiveSection()}</main>
    </div>
  )
}
