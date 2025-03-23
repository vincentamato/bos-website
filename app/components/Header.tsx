'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  // Set initial state to false by default
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    // Function to handle scroll
    function handleScroll() {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    
    // Initial check
    handleScroll()
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-sm' 
          : 'bg-gradient-to-b from-black via-black/70 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white">
            <h1 className='text-2xl font-bold wordmark'>BROWN ORIGINAL SERIES</h1>
          </Link>
        </div>
      </div>
    </header>
  )
} 