'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Home, RotateCcw, Zap, Trophy, Award, Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'

type Submission = {
  id: string
  title: string
  description: string
  imageUrl: string
}

export default function VotingPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [currentPair, setCurrentPair] = useState<[Submission, Submission] | null>(null)
  const [pairIndex, setPairIndex] = useState(0)
  const [lastVote, setLastVote] = useState<number | null>(null)
  const [leftCardIndex, setLeftCardIndex] = useState(0)
  const [userTokens, setUserTokens] = useState(50000) // Example initial token balance
  const navigate = useNavigate()

  useEffect(() => {
    // Simulated data fetch
    const fetchedSubmissions = [
      { id: '1', title: 'LEGO Skyscraper', description: 'A towering LEGO skyscraper with intricate details.', imageUrl: 'assets/1.jpg' },
      { id: '2', title: 'LEGO Dragon', description: 'A fierce dragon built entirely from LEGO bricks.', imageUrl: 'assets/2.jpg' },
      { id: '3', title: 'LEGO Spaceship', description: 'A futuristic spaceship ready for intergalactic travel.', imageUrl: 'assets/3.jpg' },
      { id: '4', title: 'LEGO Castle', description: 'A medieval castle complete with knights and a drawbridge.', imageUrl: 'assets/4.jpg' },
      { id: '5', title: 'Coca-Cola Picnic', description: 'A digital artwork of a joyful Coca-Cola picnic.', imageUrl: 'assets/5.jpg' },
      { id: '6', title: 'Coca-Cola Celebration', description: 'A video capturing a Coca-Cola celebration moment.', imageUrl: 'assets/6.jpg' },
      { id: '7', title: 'Coca-Cola Family Time', description: 'A story about a family bonding over Coca-Cola.', imageUrl: 'assets/7.jpg' },
      { id: '8', title: 'Coca-Cola Adventure', description: 'An adventurous artwork featuring Coca-Cola.', imageUrl: 'assets/8.jpg' },
      { id: '9', title: 'Virtual Dunk', description: 'An animated clip of an epic virtual slam dunk.', imageUrl: 'assets/9.jpg' },
      { id: '10', title: 'Dunk Contest', description: 'A storyboard of a thrilling dunk contest.', imageUrl: 'assets/10.jpg' },
      { id: '11', title: 'Dunk Showdown', description: 'A creative dunk showdown animation.', imageUrl: 'assets/11.jpg' },
      { id: '12', title: 'Dunk Master', description: 'A clip of a masterful slam dunk performance.', imageUrl: 'assets/12.jpg' },
      { id: '13', title: 'Nike Shoe Concept', description: 'A concept design for a next-gen running shoe.', imageUrl: 'assets/13.jpg' },
      { id: '14', title: 'Nike Eco Shoe', description: 'A sustainable running shoe design.', imageUrl: 'assets/14.jpg' },
      { id: '15', title: 'Nike Performance Shoe', description: 'A high-performance running shoe concept.', imageUrl: 'assets/15.jpg' },
      { id: '16', title: 'Nike Innovation', description: 'An innovative running shoe with new features.', imageUrl: 'assets/16.jpg' },
      { id: '17', title: 'Disney Adventure', description: 'A new adventure story featuring Disney characters.', imageUrl: 'assets/17.jpg' },
      { id: '18', title: 'Disney Magic', description: 'An animated short with a magical Disney twist.', imageUrl: 'assets/18.jpg' },
      { id: '19', title: 'Disney Tale', description: 'A modern twist on a classic Disney tale.', imageUrl: 'assets/19.jpg' },
      { id: '20', title: 'Disney Fantasy', description: 'A fantasy story set in the Disney universe.', imageUrl: 'assets/20.jpg' },
      { id: '21', title: 'Apple App Concept', description: 'A concept for an app that enhances daily life.', imageUrl: 'assets/21.jpg' },
      { id: '22', title: 'Apple Innovation', description: 'An innovative app solving a modern problem.', imageUrl: 'assets/22.jpg' },
      { id: '23', title: 'Apple UI Design', description: 'A user interface mockup for a new app.', imageUrl: 'assets/23.jpg' },
      { id: '24', title: 'Apple Functionality', description: 'A brief overview of an app’s functionality.', imageUrl: 'assets/24.jpg' },
      { id: '25', title: 'Gucci Fashion Piece', description: 'A statement fashion piece for Gucci.', imageUrl: 'assets/25.jpg' },
      { id: '26', title: 'Gucci Collection', description: 'A collection that blends tradition and modernity.', imageUrl: 'assets/26.jpg' },
      { id: '27', title: 'Gucci Runway', description: 'A design for a Gucci-themed runway event.', imageUrl: 'assets/27.jpg' },
      { id: '28', title: 'Gucci Accessories', description: 'Accessorizing elements for a Gucci design.', imageUrl: 'assets/28.jpg' },
      { id: '29', title: 'Red Bull Adventure', description: 'A video of an adventurous moment with Red Bull.', imageUrl: 'assets/29.jpg' },
      { id: '30', title: 'Red Bull Hike', description: 'A photo series of a mountain hike with Red Bull.', imageUrl: 'assets/30.jpg' },
      { id: '31', title: 'Red Bull Skate', description: 'A video of a city skate with Red Bull.', imageUrl: 'assets/31.jpg' },
      { id: '32', title: 'Red Bull Project', description: 'A creative project fueled by Red Bull.', imageUrl: 'assets/32.jpg' },
    ]
    setSubmissions(fetchedSubmissions)
    setCurrentPair([fetchedSubmissions[0], fetchedSubmissions[1]])
  }, [])

  const handleVote = (index: number) => {
    setLastVote(index)
    // Here you would typically send the vote to your backend
    console.log(`Voted for submission ${currentPair![index].id}`)
    
    setUserTokens((prevTokens) => prevTokens + 10) // Increase FT by 10

    const nextPairIndex = pairIndex + 1
    if (nextPairIndex * 2 < submissions.length) {
      setCurrentPair([submissions[nextPairIndex * 2], submissions[nextPairIndex * 2 + 1]])
      setPairIndex(nextPairIndex)
      setLeftCardIndex(0)
    } else {
      // Voting completed
      setCurrentPair(null)
    }
  }

  const handleUndo = () => {
    if (lastVote !== null && pairIndex > 0) {
      const previousPairIndex = pairIndex - 1
      setCurrentPair([submissions[previousPairIndex * 2], submissions[previousPairIndex * 2 + 1]])
      setPairIndex(previousPairIndex)
      setLastVote(null)
      setLeftCardIndex(0)
    }
  }

  const toggleLeftCard = () => {
    setLeftCardIndex((prevIndex) => (prevIndex === 0 ? 1 : 0))
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-black/50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Go back</span>
          </Button>
          <h1 className="text-2xl font-bold">Vote Now</h1>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="font-semibold">{userTokens} FT</span>
            <span className="text-xs text-gray-400">EQDKbjIcfM6ezt8KjKJJLshZJJSqX7XOA4ff-W72r5gqPrHF</span>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center space-y-4">
        {currentPair ? (
          <>
            <div className="w-full max-w-md md:max-w-4xl">
              {/* Mobile Layout */}
              <div className="md:hidden relative h-[500px] overflow-hidden">
                <AnimatePresence initial={false}>
                  {currentPair.map((submission, index) => (
                    <motion.div
                      key={submission.id}
                      className="absolute top-0 w-[90%] h-full"
                      initial={{ x: index === 0 ? '0%' : '100%', scale: index === leftCardIndex ? 1 : 0.9 }}
                      animate={{ 
                        x: index === leftCardIndex ? '0%' : '75%', 
                        scale: index === leftCardIndex ? 1 : 0.9,
                        zIndex: index === leftCardIndex ? 2 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      onClick={() => index !== leftCardIndex && toggleLeftCard()}
                    >
                      <Card className="h-full overflow-hidden bg-gray-900 border-gray-800">
                        <img
                          src={submission.imageUrl}
                          alt={submission.title}
                          className="w-full h-48 object-cover"
                        />
                        <CardContent className="p-4">
                          <h2 className="text-xl font-semibold mb-2 text-white">{submission.title}</h2>
                          <p className="text-gray-400">{submission.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white" 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleVote(index)
                            }}
                            aria-label={`Vote for ${submission.title}`}
                          >
                            Vote
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-2 gap-4">
                {currentPair.map((submission, index) => (
                  <Card key={submission.id} className="overflow-hidden bg-gray-900 border-gray-800">
                    <img
                      src={submission.imageUrl}
                      alt={submission.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <h2 className="text-xl font-semibold mb-2 text-white">{submission.title}</h2>
                      <p className="text-gray-400">{submission.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white" 
                        onClick={() => handleVote(index)}
                        aria-label={`Vote for ${submission.title}`}
                      >
                        Vote
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            <p className="text-center text-gray-400 md:hidden">Tap the card on the right to bring it to the front</p>
            <p className="text-center text-gray-400">Click 'Vote' to choose the best submission</p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Voting Completed</h2>
            <p className="text-gray-400">Thank you for participating!</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 w-full bg-black border-t border-gray-800 p-4 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {[
            { name: "Home", icon: Home, path: "/" },
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
              <item.icon className={`h-6 w-6 ${item.name === "Arena" ? 'text-white' : 'text-gray-400'}`} />
              <span className="text-xs font-medium">{item.name}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}