import { useState, useRef, useEffect } from 'react'

const AUDIO_SRC = 'https://assets.mixkit.co/music/preview/mixkit-retro-synthwave-244.mp3'

export default function CassettePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.4)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Create audio element on mount
    audioRef.current = new Audio(AUDIO_SRC)
    audioRef.current.loop = true
    audioRef.current.volume = volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = muted ? 0 : volume
  }, [volume, muted])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(err => {
        console.error("Audio playback failed:", err)
      })
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-center select-none font-retro">
      {/* Tape cassette block */}
      <div 
        className={`w-52 p-3 bg-neutral-900 border-2 rounded-xl flex flex-col gap-2 transition-all duration-500 shadow-2xl ${
          isPlaying 
            ? 'border-red-600 shadow-red-900/50 stranger-glow' 
            : 'border-neutral-800 shadow-black'
        }`}
      >
        {/* Label */}
        <div className="h-10 bg-neutral-800 rounded border border-neutral-700 p-1 flex flex-col justify-between overflow-hidden relative">
          <div className="flex justify-between items-center text-[10px] text-red-500/80 tracking-wider">
            <span>A-SIDE</span>
            <span>STEREO</span>
          </div>
          <div className="text-[12px] text-center text-neutral-300 font-bold tracking-widest truncate animate-pulse">
            {isPlaying ? "PLAYING: AV MIX" : "CASSETTE TAPE"}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-red-600/5 via-transparent to-red-600/5" />
        </div>

        {/* Tape Reels window */}
        <div className="h-12 bg-neutral-950 rounded-lg border border-neutral-800 flex items-center justify-around relative overflow-hidden">
          {/* Reel Left */}
          <div 
            className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center relative"
            style={{
              transform: isPlaying ? 'rotate(360deg)' : 'rotate(0deg)',
              transition: isPlaying ? 'transform 10s linear infinite' : 'none',
              animation: isPlaying ? 'spinReel 3s linear infinite' : 'none'
            }}
          >
            <div className="w-6 h-6 rounded-full border border-dashed border-neutral-600 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
            </div>
          </div>

          {/* Tape center window strip */}
          <div className="w-12 h-4 bg-neutral-900/60 border border-neutral-800 rounded flex items-center justify-center text-[8px] text-neutral-600">
            <span>|||||||</span>
          </div>

          {/* Reel Right */}
          <div 
            className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center relative"
            style={{
              transform: isPlaying ? 'rotate(360deg)' : 'rotate(0deg)',
              transition: isPlaying ? 'transform 10s linear infinite' : 'none',
              animation: isPlaying ? 'spinReel 3s linear infinite' : 'none'
            }}
          >
            <div className="w-6 h-6 rounded-full border border-dashed border-neutral-600 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
            </div>
          </div>
        </div>

        {/* Buttons Panel */}
        <div className="flex items-center justify-between gap-1 mt-1 text-[11px]">
          {/* Play/Pause */}
          <button 
            onClick={togglePlay}
            className={`px-3 py-1.5 rounded border font-bold cursor-pointer transition-all ${
              isPlaying 
                ? 'bg-red-950 border-red-700 text-red-500' 
                : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-1.5 flex-1 justify-end px-2">
            <span 
              onClick={() => setMuted(!muted)}
              className="cursor-pointer text-neutral-400 hover:text-neutral-200"
            >
              {muted ? "🔇" : "🔊"}
            </span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05"
              value={muted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value))
                setMuted(false)
              }}
              className="w-14 accent-red-600 bg-neutral-950 rounded h-1 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spinReel {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
