"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Trophy, Users, Clock, Home, Award, Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from 'react-router-dom'

interface ContestDetailProps {
  title: string
  author: string
  reward: string
  description: string
  image: string
  prizePool: string
  participants: number
  duration: string
}

export default function ContestDetail() {
  const location = useLocation()
  const { contest } = location.state
  const { title, author, reward, description, image, prizePool, participants, duration } = contest

  const [isLiked, setIsLiked] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [submissionDescription, setSubmissionDescription] = useState("")
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submission = {
      file: file?.name,
      description: submissionDescription,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("contestSubmission", JSON.stringify(submission))
    setFile(null)
    setSubmissionDescription("")
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Full screen image */}
      <div className="fixed inset-0">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />
      </div>

      {/* Content overlay */}
      <div className="relative min-h-screen flex flex-col">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-black/70 text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="sr-only">{isLiked ? 'Unlike' : 'Like'} contest</span>
          </Button>
        </div>

        {/* Contest details */}
        <div className="mt-auto p-6 text-white">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <p className="text-sm/relaxed opacity-90 mb-6">{description}</p>
          <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">
            Join Challenge
          </Button>
        </div>

        {/* Bottom navigation */}
        <nav className="sticky bottom-0 w-full bg-white border-t p-4 shadow-lg">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {["Home", "Contest", "Ranking", "Rewards"].map((item, index) => (
              <Button key={item} variant="ghost" size="icon" className="flex flex-col items-center gap-1">
                <div className={`h-6 w-6 ${index === 1 ? 'bg-red-600' : 'bg-gray-300'} rounded-lg`} />
                <span className="text-xs font-medium">{item}</span>
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}