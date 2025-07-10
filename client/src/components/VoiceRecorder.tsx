import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPlay, FaPause, FaDownload, FaTrash, FaFileAudio } from 'react-icons/fa';
import { useToast } from '../hooks/use-toast';

interface Recording {
  id: string;
  name: string;
  duration: string;
  size: string;
  date: string;
  url: string;
  blob: Blob;
}

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const { toast } = useToast();

  // Load recordings from localStorage on mount
  useEffect(() => {
    const savedRecordings = localStorage.getItem('voiceRecordings');
    if (savedRecordings) {
      const parsedRecordings = JSON.parse(savedRecordings);
      // Convert stored recordings back to proper format
      const recordingsWithBlobs = parsedRecordings.map((recording: any) => ({
        ...recording,
        blob: null // We can't restore blobs from localStorage, so we'll just show metadata
      }));
      setRecordings(recordingsWithBlobs);
    }
  }, []);

  // Save recordings to localStorage whenever recordings change
  useEffect(() => {
    if (recordings.length > 0) {
      const recordingsToSave = recordings.map(recording => ({
        ...recording,
        blob: null // Can't serialize blobs to localStorage
      }));
      localStorage.setItem('voiceRecordings', JSON.stringify(recordingsToSave));
    }
  }, [recordings]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const duration = formatTime(recordingTime);
        const size = formatSize(audioBlob.size);
        
        const newRecording: Recording = {
          id: Date.now().toString(),
          name: `Recording ${recordings.length + 1}`,
          duration,
          size,
          date: new Date().toLocaleString(),
          url: audioUrl,
          blob: audioBlob
        };
        
        setRecordings([newRecording, ...recordings]);
        setRecordingTime(0);
        
        toast({
          title: "Recording Saved",
          description: `Audio recording saved successfully (${duration})`,
          duration: 3000,
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Recording Started",
        description: "Your voice recording has begun",
        duration: 2000,
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        duration: 3000,
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Stop media stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsPaused(true);
      }
    }
  };

  const playRecording = (recording: Recording) => {
    if (isPlaying === recording.id) {
      // Stop playback
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(null);
    } else {
      // Start playback
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(recording.url);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(null);
      };
      
      audio.play();
      setIsPlaying(recording.id);
    }
  };

  const downloadRecording = (recording: Recording) => {
    const a = document.createElement('a');
    a.href = recording.url;
    a.download = `${recording.name}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Recording Downloaded",
      description: `${recording.name} has been downloaded`,
      duration: 2000,
    });
  };

  const deleteRecording = (id: string) => {
    const recordingToDelete = recordings.find(r => r.id === id);
    setRecordings(recordings.filter(r => r.id !== id));
    
    // Revoke URL to free memory
    if (recordingToDelete) {
      URL.revokeObjectURL(recordingToDelete.url);
    }
    
    if (isPlaying === id) {
      setIsPlaying(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    
    toast({
      title: "Recording Deleted",
      description: `${recordingToDelete?.name} has been removed`,
      duration: 2000,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">Voice Recorder</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {isRecording ? `Recording: ${formatTime(recordingTime)}` : 'Ready to record'}
          </span>
        </div>
      </div>

      {/* Recording Controls */}
      <div className="bg-white/30 backdrop-blur-[10px] border border-white/18 p-8 rounded-xl shadow-lg mb-6">
        <div className="flex items-center justify-center space-x-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
            >
              <FaMicrophone className="w-6 h-6" />
            </button>
          ) : (
            <>
              <button
                onClick={pauseRecording}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg"
              >
                {isPaused ? <FaPlay className="w-6 h-6" /> : <FaPause className="w-6 h-6" />}
              </button>
              <button
                onClick={stopRecording}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg"
              >
                <FaStop className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <div className="text-3xl font-mono font-bold text-foreground">
            {formatTime(recordingTime)}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {isRecording ? (isPaused ? 'Recording paused' : 'Recording in progress...') : 'Click microphone to start'}
          </div>
        </div>
      </div>

      {/* Recordings List */}
      <div className="bg-white/30 backdrop-blur-[10px] border border-white/18 p-6 rounded-xl shadow-lg">
        <h4 className="text-xl font-semibold text-foreground mb-4">Recordings ({recordings.length})</h4>
        
        {recordings.length === 0 ? (
          <div className="text-center py-8">
            <FaFileAudio className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-muted-foreground">No recordings yet</p>
            <p className="text-sm text-muted-foreground">Start recording to create your first voice note</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                className="bg-white/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaFileAudio className="w-5 h-5 text-blue-500" />
                    <div>
                      <h5 className="font-semibold text-foreground">{recording.name}</h5>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Duration: {recording.duration}</span>
                        <span>Size: {recording.size}</span>
                        <span>Date: {recording.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => playRecording(recording)}
                      className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
                      title={isPlaying === recording.id ? "Stop" : "Play"}
                    >
                      {isPlaying === recording.id ? <FaStop className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => downloadRecording(recording)}
                      className="p-2 text-green-500 hover:text-green-700 transition-colors"
                      title="Download"
                    >
                      <FaDownload className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteRecording(recording.id)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;