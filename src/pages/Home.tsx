"use client"

import { useState, useEffect } from 'react'
import { Search, Home as HomeIcon, Award, Gift } from 'lucide-react'
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
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

const contests = [
  {
    title: "LEGO Constructive Arena - \"Brick Master Builder\" Contest",
    author: "LEGO",
    reward: "Special recognition and digital LEGO exhibition",
    description: "Unleash your creativity with the 'Brick Master Builder' challenge! Design an awe-inspiring LEGO creation either through digital build software or detailed concept sketches. Themes can range from futuristic cities to mythical creatures—wherever your imagination leads. The top builders will receive special recognition, and the winning designs will be built and displayed in a digital LEGO exhibition hall!",
    image: "assets/lego.jpg",
    prizePool: "8,000 FT",
    participants: 120,
    duration: "2 months"
  },
  {
    title: "Coca-Cola Refreshment Arena: \"Taste the Feeling Challenge\"",
    author: "Coca-Cola",
    reward: "Exclusive branded merchandise",
    description: "Capture the essence of Coca-Cola in a digital creation that celebrates shared moments of joy and refreshment. Whether it's an artwork, video, or story, let your imagination flow by highlighting how Coca-Cola brings people together. Top submissions will be featured in our virtual Coca-Cola Gallery, with a chance to win exclusive branded merchandise!",
    image: "assets/coke.jpg",
    prizePool: "10,000 FT",
    participants: 150,
    duration: "3 months"
  },
  {
    title: "Orlando Magic Slam Dunk Contest: \"Virtual Dunk Off\"",
    author: "Orlando Magic",
    reward: "Showcased during an online fan event",
    description: "Step into the virtual arena and show off your best slam dunk moves! Design and submit a 30-second animated clip or storyboard of your avatar performing an epic, crowd-pleasing dunk, complete with Orlando Magic flair. Creativity in choreography and style will score you points with our judges, and winners will be showcased during an online fan event!",
    image: "assets/orlandomagic.jpg",
    prizePool: "5,000 FT",
    participants: 100,
    duration: "2 months"
  },
  {
    title: "Nike Marathon Arena - \"Run & Innovate Experience\" now",
    author: "Nike",
    reward: "Nike gear vouchers",
    description: "Combine technology and athletics in the 'Run & Innovate Experience.' Participants are tasked with designing a concept for the next-gen running shoe, incorporating features that improve performance and environmental sustainability. Present your ideas through sketches or 3D models, and demonstrate the impact on virtual runners in a brief synopsis. Top innovators will receive recognition and Nike gear vouchers!",
    image: "assets/nike.jpg",
    prizePool: "20,000 FT",
    participants: 200,
    duration: "4 months"
  },
  {
    title: "Disney Creativity Arena - \"Story Magic Contest\" DIY now",
    author: "Disney",
    reward: "Exclusive Disney memorabilia",
    description: "Bring a touch of Disney magic to life by creating a unique story or animated short inspired by your favorite Disney characters and themes. Whether it's a modern twist on a classic tale or an entirely new adventure, enchant us with your storytelling prowess. Winning entries may have the opportunity to be showcased in a special Disney virtual event, and creators will receive exclusive Disney memorabilia!",
    image: "assets/disney.jpg",
    prizePool: "15,000 FT",
    participants: 180,
    duration: "3 months"
  },
  {
    title: "Apple Innovation Arena - \"App of Tomorrow\" Innovate Contest",
    author: "Apple",
    reward: "Apple product gifts",
    description: "Design an app concept that enhances everyday life or solves a modern problem, using Apple's design principles. Participants need to present a user interface mockup and a brief functionality overview. The most creative and impactful ideas will be featured on the CommunityFusion Arena, with potential mentorship opportunities for app development and Apple product gifts for winners!",
    image: "assets/apple.jpg",
    prizePool: "25,000 FT",
    participants: 250,
    duration: "5 months"
  },

  {
    title: "Gucci Fashion Arena - \"Style Innovator Competition\" Battle",
    author: "Gucci",
    reward: "Brand-exclusive rewards",
    description: "Step onto the virtual fashion stage and design a statement piece or collection that encapsulates Gucci's fusion of tradition and modernity. Use design software or sketches to illustrate your vision, complete with accessorizing elements. Finalists will see their designs virtually showcased in a Gucci-themed runway event and earn brand-exclusive rewards!",
    image: "assets/gucci.jpg",
    prizePool: "12,000 FT",
    participants: 140,
    duration: "3 months"
  },
  {
    title: "Red Bull Adventure Challenge: \"Wings for Your Day\" Contest",
    author: "Red Bull",
    reward: "Chance to attend a Red Bull extreme sports event or receive branded gear",
    description: "Purchase a can of Red Bull and capture your most adventurous 'gives you wings' moment. Whether you're hiking a mountain, skating through the city, or tackling a challenging project, show how Red Bull fuels your passion. Document your adventure with a creative video or photo series that prominently features Red Bull. The most exhilarating and innovative entries will be showcased on Red Bull's social media, and the top adventurer could win a chance to attend a Red Bull extreme sports event or receive branded gear for their next adventure.",
    image: "assets/redbull.jpg",
    prizePool: "18,000 FT",
    participants: 160,
    duration: "4 months"
  }
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(contests.length)
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const navigate = useNavigate()

  const getTimeOfDay = () => {
    const hours = new Date().getHours()
    if (hours < 12) return "Good Morning"
    if (hours < 18) return "Good Afternoon"
    return "Good Evening"
  }

  useEffect(() => {
    if (emblaApi) {
      setSlideCount(contests.length)
      emblaApi.on('select', () => {
        setCurrentSlide(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi, currentSlide])

  return (
    <div className="flex flex-col min-h-screen w-full bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-black p-4 shadow-md">
        <div className="flex items-center justify-between max-w-[93rem] mx-auto">
          <div>
            <p className="text-sm text-gray-400">{getTimeOfDay()}</p>
            <h1 className="text-xl font-bold text-white">Nate</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full text-white">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </header>
      <main className="border-none flex-1 w-full container mx-auto px-4 py-8 overflow-x-hidden lg:w-full border-none">
        {/* Featured Banner */}
        <div className="mb-8 border-none">
          {isMobile && (
            <div className="text-center mb-4 border-none">
              <h2 className="text-2xl font-extrabold mb-1 text-white">Join the Arena Contest</h2>
              <p className="text-lg mb-2 text-gray-400">Red Bull "Wings for Your Day" Challenge</p>
            </div>
          )}
          <Card className="bg-gradient-to-r from-red-600 to-blue-600 text-white overflow-hidden border-none">
            <CardContent className="p-0">
              <div className="relative aspect-[16/3]">
                <img
                  src="assets/banner.gif"
                  alt="Red Bull Wings for Your Day"
                  className="w-full h-full object-cover"
                />
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h2 className="text-3xl md:text-2xl sm:text-xl font-extrabold mb-2 sm:mb-1">Join the Arena Contest</h2>
                    <p className="text-xl md:text-lg sm:text-base mb-4 sm:mb-2">Red Bull "Wings for Your Day" Challenge</p>
                    <Button 
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold self-start"
                      onClick={() => navigate('/contest-detail', { state: { contest: contests.find(c => c.title.includes("Red Bull Adventure Challenge")) } })}
                    >
                      Join now
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* New Contests */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">New Contests</h2>
          <Carousel ref={emblaRef} className="w-full border-none">
            <CarouselContent className="-ml-2 md:-ml-4 border-none">
              {contests.map((contest, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 border-none"
                  onClick={() => navigate('/contest-detail', { state: { contest } })}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
                    <CardContent className="p-0 border-none">
                      <img
                        src={contest.image}
                        alt={contest.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-black">{contest.title}</h3>
                          {/* <Button variant="ghost" size="icon" className="rounded-full text-red-500 hover:text-red-600">
                            ❤️
                          </Button> */}
                        </div>
                        <p className="text-sm text-gray-400">By {contest.author}</p>
                        <p className="text-red-600 font-semibold mt-2">{contest.prizePool}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
            <div className="flex justify-center mt-4">
              {Array.from({ length: slideCount }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 ${
                    index === currentSlide ? 'bg-red-600' : 'bg-red-600'
                  }`}
                />
              ))}
            </div>
          </Carousel>
        </section>
        {/* Arena Gear */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Coming Soon...</h2>
          {/* <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src="assets/super-redly-gear.jpg"
                  alt="Super Redly Gear"
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white">Super Redly Gear</h3>
                  <p className="text-sm text-gray-400">Nicolas Jone</p>
                  <p className="text-red-600 font-semibold mt-2">$271.00</p>
                </div>
                <Button variant="outline" className="self-center text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300">
                  View more
                </Button>
              </div>
            </CardContent>
          </Card> */}
        </section>
      </main>
      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 w-full bg-black border-t p-4 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {[
            { name: "Home", icon: HomeIcon, path: "/" },
            { name: "Arena", icon: Award, path: "/voting" },
            { name: "Rewards", icon: Gift, path: "/rewards" }
          ].map((item, index) => (
            <Button
              key={item.name}
              variant="ghost"
              size="icon"
              className="flex flex-col items-center gap-1 text-white"
              onClick={() => navigate(item.path)}
            >
              <item.icon className={`h-6 w-6 ${index === 0 ? 'text-white' : 'text-gray-400'}`} />
              <span className="text-xs font-medium">{item.name}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}