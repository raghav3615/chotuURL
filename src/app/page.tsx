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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <h1 className="text-4xl font-bold text-center mb-10">
            Shorten Your Long URLs
          </h1>

          {!shortUrl ? (
            <form onSubmit={handleSubmit} className="relative flex items-center w-full">
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError(''); // Clear error when user types
                }}
                placeholder="Paste your long URL here..."
                className="w-full pl-4 pr-16 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500 text-lg"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Shorten URL"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <SendIcon />
                )}
              </button>
              {error && (
                <p className="absolute -bottom-7 left-0 text-red-400 text-sm mt-2">{error}</p>
              )}
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <p className="text-xl text-green-400 font-medium">URL shortened successfully!</p>
              
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Your shortened URL:</p>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={shortUrl}
                    readOnly
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-lg text-white"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    aria-label="Copy to clipboard"
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
                {copied && (
                  <p className="text-green-400 text-sm mt-2">Copied to clipboard!</p>
                )}
              </div>
              
              <button
                onClick={resetForm}
                className="w-full max-w-xs mx-auto bg-gray-700 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-600 transition-colors"
              >
                Shorten Another URL
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
