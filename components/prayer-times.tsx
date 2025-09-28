"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Loader2 } from "lucide-react"

interface PrayerTime {
  name: string
  time: string
  arabicName: string
  isNext: boolean
}

const uzbekistanRegions = [
  { name: "Toshkent", lat: 41.2995, lng: 69.2401 },
  { name: "Andijon", lat: 40.7821, lng: 72.3442 },
  { name: "Farg'ona", lat: 40.3842, lng: 71.7843 },
  { name: "Namangan", lat: 40.9983, lng: 71.6726 },
  { name: "Samarqand", lat: 39.627, lng: 66.975 },
  { name: "Buxoro", lat: 39.7747, lng: 64.4286 },
  { name: "Xorazm", lat: 41.3775, lng: 60.3619 },
  { name: "Navoiy", lat: 40.0844, lng: 65.3792 },
  { name: "Jizzax", lat: 40.1158, lng: 67.842 },
  { name: "Sirdaryo", lat: 40.8206, lng: 68.6533 },
  { name: "Surxondaryo", lat: 37.9414, lng: 67.5783 },
  { name: "Qashqadaryo", lat: 38.8597, lng: 65.7975 },
  { name: "Qoraqalpog'iston", lat: 42.4611, lng: 59.611 },
]

export function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([])
  const [selectedRegion, setSelectedRegion] = useState("Toshkent")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Fetch prayer times when region changes
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true)
        setError(null)

        const region = uzbekistanRegions.find((r) => r.name === selectedRegion)
        if (!region) return

        // Try multiple API sources for reliability
        let prayerData = null

        // First try: AlAdhan API (most reliable)
        try {
          const today = new Date()
          const prayerResponse = await fetch(
            `https://api.aladhan.com/v1/timings/${today.getDate()}-${
              today.getMonth() + 1
            }-${today.getFullYear()}?latitude=${region.lat}&longitude=${region.lng}&method=2&tune=0,0,0,0,0,0,0,0,0`,
            {
              headers: {
                Accept: "application/json",
              },
            },
          )

          if (prayerResponse.ok) {
            const data = await prayerResponse.json()
            if (data.code === 200) {
              prayerData = data.data.timings
            }
          }
        } catch (err) {
          console.log("AlAdhan API failed, trying alternative...")
        }

        // Second try: Prayer Times API as backup
        if (!prayerData) {
          try {
            const today = new Date()
            const prayerResponse = await fetch(
              `https://api.pray.zone/v2/times/today.json?city=${encodeURIComponent(selectedRegion)}&country=UZ`,
              {
                headers: {
                  Accept: "application/json",
                },
              },
            )

            if (prayerResponse.ok) {
              const data = await prayerResponse.json()
              if (data.results && data.results.datetime) {
                prayerData = {
                  Fajr: data.results.datetime[0].times.Fajr,
                  Dhuhr: data.results.datetime[0].times.Dhuhr,
                  Asr: data.results.datetime[0].times.Asr,
                  Maghrib: data.results.datetime[0].times.Maghrib,
                  Isha: data.results.datetime[0].times.Isha,
                }
              }
            }
          } catch (err) {
            console.log("Prayer Zone API also failed...")
          }
        }

        if (prayerData) {
          const prayers = [
            { name: "Bomdod", time: prayerData.Fajr, arabicName: "الفجر" },
            { name: "Peshin", time: prayerData.Dhuhr, arabicName: "الظهر" },
            { name: "Asr", time: prayerData.Asr, arabicName: "العصر" },
            { name: "Shom", time: prayerData.Maghrib, arabicName: "المغرب" },
            { name: "Xufton", time: prayerData.Isha, arabicName: "العشاء" },
          ]

          // Determine next prayer
          const now = new Date()
          const currentMinutes = now.getHours() * 60 + now.getMinutes()

          let nextPrayerIndex = -1
          for (let i = 0; i < prayers.length; i++) {
            const [hours, minutes] = prayers[i].time.split(":").map(Number)
            const prayerMinutes = hours * 60 + minutes
            if (prayerMinutes > currentMinutes) {
              nextPrayerIndex = i
              break
            }
          }

          // If no prayer found for today, next prayer is Fajr tomorrow
          if (nextPrayerIndex === -1) {
            nextPrayerIndex = 0
          }

          const prayerTimesWithNext = prayers.map((prayer, index) => ({
            ...prayer,
            isNext: index === nextPrayerIndex,
          }))

          setPrayerTimes(prayerTimesWithNext)
        } else {
          throw new Error("Barcha API manbalar ishlamayapti")
        }
      } catch (err) {
        console.error("Error fetching prayer times:", err)
        setError("Namoz vaqtlarini yuklashda xatolik yuz berdi. Standart vaqtlar ko'rsatilmoqda.")

        // Set region-specific default prayer times based on approximate times for Uzbekistan
        const getDefaultTimes = (regionName: string) => {
          const baseTime = {
            fajr: "05:30",
            dhuhr: "12:30",
            asr: "15:45",
            maghrib: "18:20",
            isha: "19:50",
          }

          // Adjust times slightly based on region (rough approximation)
          if (regionName.includes("Surxon") || regionName.includes("Qashqa")) {
            return {
              fajr: "05:25",
              dhuhr: "12:25",
              asr: "15:40",
              maghrib: "18:15",
              isha: "19:45",
            }
          } else if (regionName.includes("Xorazm") || regionName.includes("Qoraqal")) {
            return {
              fajr: "05:35",
              dhuhr: "12:35",
              asr: "15:50",
              maghrib: "18:25",
              isha: "19:55",
            }
          }

          return baseTime
        }

        const defaultTimes = getDefaultTimes(selectedRegion)

        setPrayerTimes([
          { name: "Bomdod", time: defaultTimes.fajr, arabicName: "الفجر", isNext: false },
          { name: "Peshin", time: defaultTimes.dhuhr, arabicName: "الظهر", isNext: true },
          { name: "Asr", time: defaultTimes.asr, arabicName: "العصر", isNext: false },
          { name: "Shom", time: defaultTimes.maghrib, arabicName: "المغرب", isNext: false },
          { name: "Xufton", time: defaultTimes.isha, arabicName: "العشاء", isNext: false },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPrayerTimes()
  }, [selectedRegion])

  const handleRefresh = () => {
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Namoz vaqtlari yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary text-shadow-gold">Namoz Vaqtlari</h1>
        <p className="text-lg text-muted-foreground">
          {currentTime.toLocaleDateString("uz-UZ", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="flex items-center justify-center space-x-4">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Viloyatni tanlang" />
            </SelectTrigger>
            <SelectContent>
              {uzbekistanRegions.map((region) => (
                <SelectItem key={region.name} value={region.name}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-destructive text-sm">{error}</p>
            <Button onClick={handleRefresh} variant="outline" size="sm" className="mt-2 bg-transparent">
              Qayta urinish
            </Button>
          </div>
        )}
      </div>

      {/* Prayer Times Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prayerTimes.map((prayer, index) => (
          <Card
            key={index}
            className={`transition-all duration-300 hover:scale-105 ${
              prayer.isNext ? "bg-primary/10 border-primary glow-gold" : "bg-card hover:bg-card/80"
            }`}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className={prayer.isNext ? "text-primary" : "text-card-foreground"}>{prayer.name}</span>
                {prayer.isNext && (
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">Keyingi</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className={`text-2xl font-bold ${prayer.isNext ? "text-primary" : "text-card-foreground"}`}>
                    {prayer.time}
                  </span>
                </div>
                <p className="text-lg text-muted-foreground font-arabic">{prayer.arabicName}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Time Display */}
      <Card className="bg-card/50">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Hozirgi vaqt</p>
            <p className="text-3xl font-bold text-primary">
              {currentTime.toLocaleTimeString("uz-UZ", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
