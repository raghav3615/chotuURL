'use client'

import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { nanoid } from "nanoid";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// SVG Icon for Send/Submit
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

// SVG Icon for Copy
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

// SVG Icon for Check (used for copied state)
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);


export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Generate a short code
      const shortCode = nanoid(8)
      
      // Save to Supabase
      const { error: insertError } = await supabase
        .from('urls')
        .insert([
          {
            original_url: url,
            short_code: shortCode,
            click_count: 0
          }
        ])

      if (insertError) {
        throw insertError
      }

      // Create the short URL
      const shortUrl = `${window.location.origin}/${shortCode}`
      setShortUrl(shortUrl)
      
    } catch (error) {
      console.error('Error shortening URL:', error)
      setError('Failed to shorten URL. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const resetForm = () => {
    setUrl('')
    setShortUrl('')
    setError('')
    setCopied(false)
  }

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Navbar />
      <div className="flex justify-center mt-4 mb-8">
        <a href="https://www.producthunt.com/products/chotuurl?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-chotuurl" target="_blank">
        <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=973153&theme=dark&t=1749019255781" alt="ChotuURL - A&#0032;modern&#0044;&#0032;minimal&#0044;&#0032;open&#0045;source&#0044;&#0032;ad&#0045;free&#0032;URL&#0032;shortene | Product Hunt" style={{width: "250px", height: "54px"}} width="250" height="54" />
        </a>
      </div>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Shorten Your URLs
            </h1>
            <p className="text-xl text-white/70">
              Transform long, complex URLs into short, shareable links
            </p>
          </div>

          {!shortUrl ? (
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-1.5 shadow-lg">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (error) setError(''); // Clear error when user types
                    }}
                    placeholder="Enter your long URL here..."
                    className="flex-1 bg-transparent border-0 outline-none px-4 py-3 text-white placeholder-white/60 text-lg"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !url.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed min-w-[120px] flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Shortening...</span>
                      </div>
                    ) : (
                      'Shorten'
                    )}
                  </button>
                </div>
              </form>
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
            </div>
          ) : (
            <div className="space-y-8 text-center">
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-500 rounded-full p-2">
                    <CheckIcon />
                  </div>
                </div>
                <p className="text-xl text-green-400 font-medium mb-6">URL shortened successfully!</p>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/60 mb-3">Your shortened URL:</p>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={shortUrl}
                      readOnly
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-lg text-white focus:outline-none select-all"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg transition-colors duration-200 flex-shrink-0"
                      aria-label="Copy to clipboard"
                    >
                      {copied ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-green-400 text-sm mt-3">✓ Copied to clipboard!</p>
                  )}
                </div>
              </div>
              
              <button
                onClick={resetForm}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white py-3 px-8 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
              >
                Create Another Short URL
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
