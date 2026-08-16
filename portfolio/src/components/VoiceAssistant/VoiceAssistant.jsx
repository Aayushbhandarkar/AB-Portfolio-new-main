import React, { useState, useRef, useEffect } from 'react';
import { useVoiceAssistant } from './useVoiceAssistant';
import gsap from 'gsap';
import './VoiceAssistant.css';

// Import your PNG image
import voiceAvatar from './voice-avatar.png';

const VoiceAssistant = () => {
  const {
    isListening,
    transcript,
    isSpeaking,
    isActive,
    toggleListening,
    stopEverything
  } = useVoiceAssistant();

  const [isExpanded, setIsExpanded] = useState(false);
  const avatarRef = useRef(null);
  const controlsRef = useRef(null);
  const assistantRef = useRef(null);

  // Click sound function
  const playClickSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  // GSAP animation on component mount
  useEffect(() => {
    if (assistantRef.current) {
      gsap.fromTo(assistantRef.current,
        {
          opacity: 0,
          scale: 0.8,
          x: -50
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          delay: 2,
          ease: "back.out(1.7)"
        }
      );
    }
  }, []);

  const handleMainClick = () => {
    // ADDED CLICK SOUND HERE
    playClickSound();
    
    if (!isActive && !isExpanded) {
      // Expand animation with GSAP - SMOOTH AND STABLE
      setIsExpanded(true);
      
      const tl = gsap.timeline();
      tl.to(avatarRef.current, {
        scale: 1.1, // Reduced from 1.15 to 1.1 for subtle effect
        duration: 0.3, // Faster
        ease: "power2.out" // Smoother easing
      });

      // Auto start listening after expansion
      setTimeout(() => {
        toggleListening();
      }, 400); // Reduced delay
    } else {
      // Collapse and stop everything - SMOOTH
      const tl = gsap.timeline();
      tl.to(controlsRef.current, {
        opacity: 0,
        y: 10, // Reduced from 20 to 10
        duration: 0.2,
        ease: "power2.out"
      })
      .to(avatarRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => setIsExpanded(false)
      }, "-=0.1");

      stopEverything();
    }
  };

  // GSAP animations for controls when expanded
  useEffect(() => {
    if (isExpanded && controlsRef.current) {
      gsap.fromTo(controlsRef.current,
        { 
          opacity: 0, 
          y: 10, // Reduced from 30 to 10
          scale: 0.95 // Reduced from 0.9 to 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.4, // Reduced from 0.6 to 0.4
          ease: "power2.out" // Simpler easing
        }
      );
    }
  }, [isExpanded]);

  // REMOVED FLOATING ANIMATION COMPLETELY - NO UP/DOWN MOVEMENT

  // Speaking state animation - SUBTLE
  useEffect(() => {
    if (isSpeaking && avatarRef.current) {
      const speakAnimation = gsap.to(avatarRef.current, {
        scale: 1.02, // Very subtle scale
        duration: 0.8, // Slower
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut" // Smoother
      });

      return () => speakAnimation.kill();
    } else {
      gsap.to(avatarRef.current, {
        scale: isExpanded ? 1.1 : 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  }, [isSpeaking, isExpanded]);

  return (
    <div className="voice-assistant" ref={assistantRef}>
      {/* Main Voice Avatar */}
      <div 
        ref={avatarRef}
        className={`voice-avatar ${isExpanded ? 'expanded' : ''} ${isActive ? 'active' : ''} ${isListening ? 'listening' : ''} ${isSpeaking ? 'speaking' : ''}`}
        onClick={handleMainClick}
      >
        <img 
          src={voiceAvatar} 
          alt="Voice Assistant" 
          className="avatar-image"
        />
        
        {/* Status Animations */}
        {isListening && (
          <div className="status-animation listening-pulse">
            <div className="pulse-ring"></div>
            <div className="pulse-ring delay-1"></div>
          </div>
        )}
        
        {isSpeaking && (
          <div className="status-animation speaking-waves">
            <div className="wave"></div>
            <div className="wave delay-1"></div>
          </div>
        )}
      </div>

      {/* Controls Container */}
      {isExpanded && (
        <div ref={controlsRef} className="controls-container">
          {/* Transcript */}
          {isListening && transcript && (
            <div className="transcript-box">
              <p>"{transcript}"</p>
            </div>
          )}

          {/* Status Indicators */}
          {isListening && !transcript && (
            <div className="status-indicator listening">
              <p>Listening... Ask about Ayush</p>
            </div>
          )}

          {isSpeaking && (
            <div className="status-indicator speaking">
              <p>Speaking...</p>
            </div>
          )}

          {/* Welcome Message */}
          {!isListening && !isSpeaking && (
            <div className="status-indicator welcome">
              <p>Ask me about Ayush's work!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;