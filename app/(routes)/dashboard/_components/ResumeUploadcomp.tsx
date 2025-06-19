"use client"
import React, { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { File, Sparkle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function ResumeUploadcomp({ openResumeUpload, setOpenResumeDialog }: any) {
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
  
  const router = useRouter();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setFile(selectedFile || null)
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

const onUploadonAnalysis=async()=>{
  const recordId = uuidv4();
setLoading(true)

  const Formdata = new FormData();
  Formdata.append('recordId',recordId)
  if (file) {
    Formdata.append('resumeFiles',file)
  }

  const result = await axios.post('/api/ai-resume-analysis-agent',Formdata)
console.log(result.data)
router.push('/ai-tools/ai-resume-analysis/'+recordId)

setLoading(false)

setOpenResumeDialog(false);
}

  return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Resume PDF file</DialogTitle>
          <DialogDescription>
            Select a PDF file to upload and analyze
          </DialogDescription>
        </DialogHeader>
        
        {/* File Upload Section - moved outside DialogDescription */}
        <div className="mt-4">
          <div
            onClick={triggerFileInput}
            className="flex flex-col items-center justify-center p-7 border border-dashed rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            <File className="h-10 w-10" />
            {file ? (
              <p className="mt-3 text-black font-medium">{file.name}</p>
            ) : (
              <p className="mt-3">Click to upload PDF file</p>
            )}
          </div>
          <input
            key={file ? file.name : 'empty'}
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
        
        <DialogFooter className="mt-4">
            <Button onClick={onUploadonAnalysis} disabled={!file || loading}>
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Generating...
              </>
            ) : (
              <h2 className='flex'>
              
          <Sparkle className="mr-2 h-4 w-4 flex"/>    Upload and Analyze

              </h2>
            )}
          </Button>
          <Button variant="outline" onClick={() => setOpenResumeDialog(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ResumeUploadcomp