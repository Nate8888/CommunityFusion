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

export function VotingPageComponent() {
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
      { id: '1', title: 'Submission 1', description: 'A brief description of submission 1', imageUrl: '/placeholder.svg?height=300&width=400' },
      { id: '2', title: 'Submission 2', description: 'A brief description of submission 2', imageUrl: '/placeholder.svg?height=300&width=400' },
      { id: '3', title: 'Submission 3', description: 'A brief description of submission 3', imageUrl: '/placeholder.svg?height=300&width=400' },
      { id: '4', title: 'Submission 4', description: 'A brief description of submission 4', imageUrl: '/placeholder.svg?height=300&width=400' },
    ]
    setSubmissions(fetchedSubmissions)
    setCurrentPair([fetchedSubmissions[0], fetchedSubmissions[1]])
  }, [])

  const handleVote = (index: number) => {
    setLastVote(index)
    // Here you would typically send the vote to your backend
    console.log(`Voted for submission ${currentPair![index].id}`)
    
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
            { name: "Your Submissions", icon: Trophy, path: "/contests" },
            { name: "Ranking", icon: Award, path: "/ranking" },
            { name: "Rewards", icon: Gift, path: "/rewards" }
          ].map((item, index) => (
            <Button
              key={item.name}
              variant="ghost"
              size="icon"
              className="flex flex-col items-center gap-1 text-white"
              onClick={() => navigate(item.path)}
            >
              <item.icon className={`h-6 w-6 ${item.name === "Your Submissions" ? 'text-white' : 'text-gray-400'}`} />
              <span className="text-xs font-medium">{item.name}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}