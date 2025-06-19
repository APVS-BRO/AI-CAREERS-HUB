import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { v4 } from 'uuid'
import { useRouter } from 'next/navigation'

/**
 * RoadMapComp
 * 
 * A modal dialog that prompts the user to enter a position or skill
 * and generates a personalized roadmap based on the input.
 *
 * Props:
 * - openDialog (boolean): Controls whether the dialog is open.
 * - setOpenDialog (function): Handler to toggle the dialog state.
 */
function RoadMapComp({ openDialog, setOpenDialog }:any) {
  const [loading, setLoading] = useState(false)

  const [query, setQuery] = useState('')
const router = useRouter()
  const handleGenerate = async () => {
  const recordId = v4()
  setLoading(true)
  try {
    const result = await axios.post('/api/ai-roadmap-generator-agent', {
      recordId,
      userInput: query,
    })

    router.push(`/ai-tools/ai-roadmap-generator/${recordId}`)
  } catch (e) {
    console.error("Error generating roadmap:", e)
  } finally {
    setLoading(false)
    setOpenDialog(false)
  }
}

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Your Professional Roadmap</DialogTitle>
          <DialogDescription>
            Please enter the desired position or skill set below to create a customized
            roadmap outlining the steps, resources, and timelines to achieve your goal.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <label htmlFor="roadmap-input" className="block text-sm font-medium text-gray-700 p-5">
            Position or Skill
          </label>
          <Input
            id="roadmap-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Full Stack Developer, Data Scientist"
            className="mt-1 w-full"
          />
        </div>

        <DialogFooter>
         <Button onClick={handleGenerate} disabled={!query.trim() || loading}>
  {loading ? (
    <>
      <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
      </svg>
      Generating...
    </>
  ) : (
    'Generate Roadmap'
  )}
</Button>

           <Button  variant={'outline'} onClick={()=>setOpenDialog(false)
}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RoadMapComp
