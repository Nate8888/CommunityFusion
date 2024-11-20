"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Users, Clock, Trophy, Home, Award, Gift, DollarSign, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate, useLocation } from 'react-router-dom'

export default function ContestDetail() {
  const location = useLocation()
  const { contest } = location.state
  const { title, author, reward, description, image, prizePool, participants, duration } = contest

  const [isLiked, setIsLiked] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [submissionDescription, setSubmissionDescription] = useState("")
  const navigate = useNavigate()

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
    <div className="flex flex-col min-h-screen bg-black text-gray-100">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-lg bg-black border-b border-gray-700">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-100"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="sr-only">{isLiked ? 'Unlike' : 'Like'} contest</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 pt-16 pb-20">
        {/* Contest Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={image}
            alt={`${title} contest banner`}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="relative -mt-6 rounded-t-[2rem] bg-black">
          <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto mb-4">
            {/* Contest Info */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-100">{title}</h1>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-orange-900 p-3">
                  <DollarSign className="h-5 w-5 text-orange-400" />
                  <div className="text-sm">
                    <div className="font-semibold text-orange-400">Prize</div>
                    <div className="text-orange-400">{prizePool}</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-purple-900 p-3">
                  <User className="h-5 w-5 text-purple-400" />
                  <div className="text-sm">
                    <div className="font-semibold text-purple-400">Participants</div>
                    <div className="text-purple-400">{participants}</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-pink-900 p-3">
                  <Clock className="h-5 w-5 text-pink-400" />
                  <div className="text-sm">
                    <div className="font-semibold text-pink-400">Duration</div>
                    <div className="text-pink-400">{duration}</div>
                  </div>
                </div>
              </div>

              {/* Organizer */}
              <div className="flex items-center gap-4 py-4">
                <div className="font-semibold text-gray-100">Organizer: {author}</div>
                <div className="flex items-center gap-2">
                  {/* <img
                    src="/placeholder.svg?height=32&width=32"
                    alt={`${author} profile picture`}
                    className="h-8 w-8 rounded-full object-cover"
                  /> */}
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed">
                {description}
                <button className="text-primary font-medium ml-1 text-white p-2">Read more...</button>
              </p>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-100">Submit Your Entry</h2>
                <p className="text-sm text-gray-400">
                  Upload your submission and provide a brief description.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="file" className="text-sm font-medium block mb-2 text-white-100">
                    Upload File
                  </label>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="cursor-pointer text-white-100"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="text-sm font-medium block mb-2 text-gray-100">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your submission..."
                    value={submissionDescription}
                    onChange={(e) => setSubmissionDescription(e.target.value)}
                    rows={4}
                    className="text-gray-100"
                  />
                </div>

                <Button type="submit" className="w-full bg-orange text-gray-100 border border-white" size="lg">
                  Join now
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <nav className="fixed bottom-0 w-full bg-black border-t border-gray-700 py-1 px-4">
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
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-1 text-gray-100"
              onClick={() => navigate(item.path)}
            >
              <item.icon className={`h-5 w-5 ${index === 1 ? 'text-white' : 'text-gray-400'}`} />
              <span className={`text-xs ${index === 1 ? 'text-white' : 'text-gray-400'}`}>
                {item.name}
              </span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}