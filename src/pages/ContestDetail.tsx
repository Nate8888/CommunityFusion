"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Upload, Users, Clock, Trophy, Search, Home, Award, Gift } from 'lucide-react'
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
    // Store submission in localStorage
    const submission = {
      file: file?.name,
      description: submissionDescription,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("contestSubmission", JSON.stringify(submission))
    // Reset form
    setFile(null)
    setSubmissionDescription("")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="container flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="sr-only">{isLiked ? 'Unlike' : 'Like'} contest</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        {/* Contest Image */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
          <img
            src={image}
            alt={`${title} contest banner`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contest Info */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                <Trophy className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">{prizePool}</span>
                <span className="text-xs text-muted-foreground">Prize Pool</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                <Users className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">{participants}</span>
                <span className="text-xs text-muted-foreground">Participants</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                <Clock className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">{duration}</span>
                <span className="text-xs text-muted-foreground">Duration</span>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
              <img
                src="/placeholder.svg?height=50&width=50"
                alt={`${author} profile picture`}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{author}</h3>
                <p className="text-sm text-muted-foreground">Contest Organizer</p>
              </div>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Submit Your Entry</h2>
                <p className="text-sm text-muted-foreground">
                  Upload your submission and provide a brief description.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="file" className="text-sm font-medium">
                    Upload File
                  </label>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your submission..."
                    value={submissionDescription}
                    onChange={(e) => setSubmissionDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Entry
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Footer Navigation */}
      <nav className="sticky bottom-0 w-full bg-white border-t p-4 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {[{ name: "Home", icon: Home, path: "/" }, { name: "Contest", icon: Trophy, path: "/contests" }, { name: "Ranking", icon: Award, path: "/ranking" }, { name: "Rewards", icon: Gift, path: "/rewards" }].map((item, index) => (
            <Button
              key={item.name}
              variant="ghost"
              size="icon"
              className="flex flex-col items-center gap-1"
              onClick={() => navigate(item.path)}
            >
              <item.icon className={`h-6 w-6 ${index === 1 ? 'text-primary' : 'text-gray-500'}`} />
              <span className={`text-xs font-medium ${index === 1 ? 'text-primary' : 'text-gray-500'}`}>{item.name}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}