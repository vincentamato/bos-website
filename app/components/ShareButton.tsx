'use client'

import { useState, useRef, useEffect } from 'react'

interface ShareButtonProps {
  title: string
  url?: string
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [shareError, setShareError] = useState(false)
  const [isHttps, setIsHttps] = useState(true)
  const tempInputRef = useRef<HTMLInputElement>(null)
  
  // Check if we're on HTTPS once on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHttps(window.location.protocol === 'https:' || window.location.hostname === 'localhost')
    }
  }, [])
  
  const handleShare = async () => {
    const shareURL = url || window.location.href
    setShareError(false)
    
    // Try to use Web Share API if available (ideal for mobile)
    if (typeof navigator !== 'undefined' && 'share' in navigator && isHttps) {
      try {
        console.log('Attempting to use Web Share API...')
        await navigator.share({
          title: title,
          url: shareURL
        })
        console.log('Share successful!')
        return
      } catch (error) {
        // User likely canceled the share operation, which is fine
        console.log('Share API error:', error)
        if (error instanceof Error && error.name !== 'AbortError') {
          console.log('Share failed:', error)
        }
      }
    } else if (typeof navigator !== 'undefined' && 'share' in navigator && !isHttps) {
      console.log('Web Share API available but not used: requires HTTPS')
    }
    
    // Fallback to clipboard copy
    try {
      // Modern clipboard API
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        console.log('Using Clipboard API...')
        await navigator.clipboard.writeText(shareURL)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        return
      }
      
      // Fallback for older browsers
      if (tempInputRef.current) {
        console.log('Using execCommand fallback...')
        const input = tempInputRef.current
        input.value = shareURL
        input.style.position = 'fixed'
        input.style.opacity = '0'
        input.style.top = '0'
        input.style.left = '0'
        input.style.pointerEvents = 'none'
        input.focus()
        input.select()
        input.setSelectionRange(0, 99999) // For mobile devices
        
        const success = document.execCommand('copy')
        if (success) {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } else {
          setShareError(true)
          setTimeout(() => setShareError(false), 2000)
        }
      } else {
        // If all else fails, show error
        setShareError(true)
        setTimeout(() => setShareError(false), 2000)
      }
    } catch (error) {
      console.error('Failed to copy:', error)
      setShareError(true)
      setTimeout(() => setShareError(false), 2000)
    }
  }
  
  return (
    <button 
      onClick={handleShare}
      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm relative"
      title={!isHttps && typeof navigator !== 'undefined' && 'share' in navigator ? 
        "Native sharing requires HTTPS" : "Share this content"}
    >
      {/* Hidden input for fallback copy method */}
      <input 
        ref={tempInputRef}
        type="text"
        defaultValue=""
        className="opacity-0 h-0 w-0 absolute pointer-events-none"
        aria-hidden="true"
        readOnly
      />
      
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {copied ? 'Copied!' : shareError ? 'Error' : 'Share'}
      
      {/* Success tooltip */}
      {copied && (
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-green-600 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Link copied!
        </span>
      )}
      
      {/* Error tooltip */}
      {shareError && (
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-red-600 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Couldn't share
        </span>
      )}
    </button>
  )
} 