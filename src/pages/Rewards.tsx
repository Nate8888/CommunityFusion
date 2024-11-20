"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Gift, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { HomeIcon, Trophy, Award } from 'lucide-react'

type Reward = {
  id: string
  name: string
  description: string
  cost: number
  brand: string
  type: "digital" | "physical"
  image: string
}

const rewards: Reward[] = [
  {
    id: "1",
    name: "LEGO Digital Designer Pro License",
    description: "1-year pro license for LEGO Digital Designer software",
    cost: 5000,
    brand: "LEGO",
    type: "digital",
    image: "assets/lego-reward.jpg"
  },
  {
    id: "2",
    name: "Orlando Magic VIP Game Pass",
    description: "VIP access to an Orlando Magic home game",
    cost: 20000,
    brand: "Orlando Magic",
    type: "physical",
    image: "assets/orlandomagic-reward.jpg"
  },
  {
    id: "3",
    name: "Coca-Cola Customized Fridge",
    description: "A mini-fridge with your design printed on it",
    cost: 15000,
    brand: "Coca-Cola",
    type: "physical",
    image: "assets/coke-reward.jpg"
  },
  {
    id: "4",
    name: "Nike Custom Shoe Design Session",
    description: "Online session with Nike designers to create your custom shoe",
    cost: 10000,
    brand: "Nike",
    type: "digital",
    image: "assets/nike-reward.jpg"
  },
  {
    id: "5",
    name: "Disney+ Annual Subscription",
    description: "1-year subscription to Disney+ streaming service",
    cost: 8000,
    brand: "Disney",
    type: "digital",
    image: "assets/disney-reward.jpg"
  },
  {
    id: "6",
    name: "Apple Store Gift Card",
    description: "$100 Apple Store gift card",
    cost: 12000,
    brand: "Apple",
    type: "digital",
    image: "assets/apple-reward.jpg"
  },
  {
    id: "7",
    name: "Gucci Digital Collectible NFT",
    description: "Exclusive Gucci digital collectible NFT",
    cost: 25000,
    brand: "Gucci",
    type: "digital",
    image: "assets/gucci-reward.jpg"
  },
  {
    id: "8",
    name: "Red Bull Extreme Sports Experience",
    description: "Ticket to a Red Bull extreme sports event",
    cost: 30000,
    brand: "Red Bull",
    type: "physical",
    image: "assets/redbull-reward.jpg"
  },
]

export default function RewardsPage() {
  const [userTokens, setUserTokens] = useState(50000) // Example initial token balance
  const [selectedTab, setSelectedTab] = useState<"physical" | "digital">("physical")
  const navigate = useNavigate()

  const filteredRewards = rewards.filter((reward) => reward.type === selectedTab)

  const handleRedemption = (cost: number) => {
    if (userTokens >= cost) {
      setUserTokens(userTokens - cost)
      // Here you would typically call an API to process the redemption
      alert("Reward redeemed successfully!")
    } else {
      alert("Not enough tokens to redeem this reward.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-black">
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-black/50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Rewards</h1>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="font-semibold text-white">{userTokens} FT</span>
            <span className="text-xs text-gray-400">EQDKbjIcfM6ezt8KjKJJLshZJJSqX7XOA4ff-W72r5gqPrHF</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs defaultValue="physical" className="w-full" onValueChange={(value) => setSelectedTab(value as "physical" | "digital")}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="physical">Physical Rewards</TabsTrigger>
            <TabsTrigger value="digital">Digital Rewards</TabsTrigger>
          </TabsList>
          <TabsContent value="physical">
            <RewardsList rewards={filteredRewards} onRedeem={handleRedemption} />
          </TabsContent>
          <TabsContent value="digital">
            <RewardsList rewards={filteredRewards} onRedeem={handleRedemption} />
          </TabsContent>
        </Tabs>
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
              key={item.name + index}
              variant="ghost"
              size="icon"
              className="flex flex-col items-center gap-1 text-white"
              onClick={() => navigate(item.path)}
            >
              <item.icon className={`h-6 w-6 ${item.name === "Rewards" ? 'text-white' : 'text-gray-400'}`} />
              <span className="text-xs font-medium">{item.name}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}

function RewardsList({ rewards, onRedeem }: { rewards: Reward[], onRedeem: (cost: number) => void }) {
  return (
    <ScrollArea className="h-[calc(100vh-280px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="bg-white border-gray-200">
            <CardHeader>
              <img src={reward.image} alt={reward.name} className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2">{reward.name}</CardTitle>
              <CardDescription className="text-gray-600">{reward.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold">{reward.cost} FT</span>
              </div>
              <Button onClick={() => onRedeem(reward.cost)} variant="default">Redeem</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}