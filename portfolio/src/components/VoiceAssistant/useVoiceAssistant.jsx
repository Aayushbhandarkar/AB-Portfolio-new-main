import { useState, useEffect, useRef } from 'react';

export const useVoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const recognitionRef = useRef(null);

  // Enhanced responses matching your home page style
  const responses = {
    about: "I'm Ayush Bhandarkar, a passionate full-stack developer open to job opportunities worldwide. I specialize in building polished, intuitive, and thoughtful digital experiences that leave a mark.",
    projects: "I've created several impressive projects including modern web applications and innovative solutions. Let me navigate you to my projects section where you can explore my work in detail.",
    experience: "I have valuable experience working with cutting-edge technologies and delivering high-quality solutions. Let me take you to my experience section to learn more about my journey.",
    contact: "You can reach out to me for collaborations or opportunities. Let me show you my contact section with all the details you need to get in touch.",
    services: "I offer comprehensive web development services focusing on creating exceptional user experiences. Let me navigate you to my services section.",
    skills: "I specialize in modern web technologies including React, Node.js, and various databases, with a focus on creating scalable and efficient applications.",
    resume: "Opening your resume now. Here you can see Ayush's detailed qualifications and experience."
  };

  // Function to open resume
  const openResume = () => {
    // Replace '/resume.pdf' with your actual resume file path
    window.open('/resume.pdf', '_blank');
  };

  const speak = (text) => {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        // Stop any ongoing speech
        window.speechSynthesis.cancel();
        
        setIsSpeaking(true);
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.rate = 0.9;
        speech.pitch = 1;
        speech.volume = 0.8;
        
        // Get male voice
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(voice => 
          voice.name.includes('Male') || 
          voice.name.includes('Google UK English Male') ||
          voice.name.includes('Microsoft David') ||
          voice.lang.includes('en-US')
        );
        
        if (maleVoice) {
          speech.voice = maleVoice;
        }

        speech.onend = () => {
          setIsSpeaking(false);
          resolve();
        };

        speech.onerror = () => {
          setIsSpeaking(false);
          resolve();
        };

        // Small delay for better UX
        setTimeout(() => {
          window.speechSynthesis.speak(speech);
        }, 300);
      } else {
        resolve();
      }
    });
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll with offset
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const processCommand = async (command) => {
    const lowerCommand = command.toLowerCase().trim();
    
    if (lowerCommand.includes('who is') || lowerCommand.includes('about ayush') || lowerCommand.includes('tell me about')) {
      await speak(responses.about);
      navigateToSection('home');
    }
    else if (lowerCommand.includes('project') || lowerCommand.includes('work') || lowerCommand.includes('portfolio')) {
      await speak(responses.projects);
      navigateToSection('projects');
    }
    else if (lowerCommand.includes('experience') || lowerCommand.includes('background')) {
      await speak(responses.experience);
      navigateToSection('experience');
    }
    else if (lowerCommand.includes('contact') || lowerCommand.includes('email') || lowerCommand.includes('phone')) {
      await speak(responses.contact);
      navigateToSection('contact');
    }
    else if (lowerCommand.includes('service') || lowerCommand.includes('what do you do')) {
      await speak(responses.services);
      navigateToSection('services');
    }
    else if (lowerCommand.includes('skill') || lowerCommand.includes('technology')) {
      await speak(responses.skills);
    }
    else if (lowerCommand.includes('resume') || lowerCommand.includes('cv') || lowerCommand.includes('download resume')) {
      await speak(responses.resume);
      openResume();
    }
    else if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      await speak("Hello! I'm Ayush's assistant. How can I help you today?");
    }
    else {
      await speak("I'm not sure I understand. You can ask me about Ayush's projects, experience, contact information, or say 'open resume' to view his resume.");
    }
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setIsActive(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        setTranscript(transcript);

        if (event.results[0].isFinal) {
          processCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setIsActive(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setTranscript('');
        // Don't set isActive to false here to maintain expanded state
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const stopEverything = () => {
    stopListening();
    stopSpeaking();
    setIsActive(false);
  };

  return {
    isListening,
    transcript,
    isSpeaking,
    isActive,
    startListening,
    stopListening,
    stopSpeaking,
    stopEverything,
    toggleListening
  };
};