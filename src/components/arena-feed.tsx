import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'

export function ArenaFeed() {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(0)

  useEffect(() => {
    if (emblaApi) {
      setSlideCount(emblaApi.slideNodes().length)
      emblaApi.on('select', () => {
        setCurrentSlide(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  return (
    <div className="flex flex-col min-h-dvh bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Good Morning</p>
            <h1 className="text-lg font-semibold text-purple-500">Stephen Luwk</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-x-hidden">
        {/* Featured Banner */}
        <div className="mb-8">
          <Card className="bg-blue-500 text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Join the Arena contest</h2>
                  <p className="text-blue-100">on 25 April</p>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Join now
                  </Button>
                </div>
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt=""
                  className="h-24 w-24"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Contests */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">New Contest</h2>
          <Carousel ref={emblaRef} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Fly Arena"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Fly.. Fly! Arena</h3>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          ❤️
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">By Tonny Birs</p>
                      <p className="text-orange-500 font-semibold mt-2">$5.00</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Singing Arena"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Singing Arena</h3>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          ❤️
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">By Cecilia Wong</p>
                      <p className="text-orange-500 font-semibold mt-2">$5.00</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Dance Arena"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Dance Arena</h3>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          ❤️
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">By Emma Johnson</p>
                      <p className="text-orange-500 font-semibold mt-2">$6.00</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
            <div className="flex justify-center mt-4">
              {Array.from({ length: slideCount }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </Carousel>
        </section>

        {/* Arena Gear */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-center">Arena Gear for Sale</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Super Redly Gear"
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">Super Redly Gear</h3>
                  <p className="text-sm text-gray-500">Nicolas Jone</p>
                  <p className="text-orange-500 font-semibold mt-2">$271.00</p>
                </div>
                <Button variant="outline" className="self-center text-red-500 border-red-500">
                  View more
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t p-4">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 bg-blue-500 rounded-lg" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 bg-gray-300 rounded-lg" />
            <span className="text-xs">Contest</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 bg-gray-300 rounded-lg" />
            <span className="text-xs">Ranking</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 bg-gray-300 rounded-lg" />
            <span className="text-xs">Rewards</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}