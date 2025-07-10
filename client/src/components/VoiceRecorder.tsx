import React, { useState } from 'react';
import { FaMicrophone, FaPlay, FaStop, FaPause } from 'react-icons/fa';

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handlePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Voice Recorder</h2>
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl">
          <div className="text-center space-y-8">
            <div className="relative">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-r from-primary to-secondary'}`}>
                <FaMicrophone className="text-white text-4xl" />
              </div>
              {isRecording && (
                <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping"></div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="text-2xl font-bold text-foreground">
                {formatTime(recordingTime)}
              </div>
              
              <div className="flex justify-center space-x-4">
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <FaMicrophone className="mr-2" />
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <FaStop className="mr-2" />
                    Stop Recording
                  </button>
                )}
                
                <button
                  onClick={handlePlayback}
                  className="bg-white/25 backdrop-blur-[10px] border border-white/18 text-foreground px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {isPlaying ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
              </div>
            </div>
            
            <div className="bg-white/50 p-6 rounded-xl shadow-inner">
              <h3 className="font-semibold text-foreground mb-4">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">High-quality audio recording</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">Auto-transcription</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">Cloud storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">Export to multiple formats</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceRecorder;
