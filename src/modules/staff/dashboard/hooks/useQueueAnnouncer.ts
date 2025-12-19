import { useState, useCallback, useEffect } from 'react';

export interface QueueTicket {
    $id: string;
    ticketNumber: string;
    fullName: string;
    status: string;
    calledAt?: string;
}

export const useQueueAnnouncer = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Get the best available Vietnamese voice (Prioritize Female)
    const getBestVoice = useCallback(() => {
        const voices = window.speechSynthesis.getVoices();

        // Priority 1: Microsoft HoaiMy (Female - Edge/Windows)
        const hoaiMyVoice = voices.find(voice =>
            voice.lang.includes('vi') && voice.name.includes('HoaiMy')
        );
        if (hoaiMyVoice) return hoaiMyVoice;

        // Priority 2: Google Tiếng Việt (Usually Female)
        const googleVoice = voices.find(voice =>
            voice.lang.includes('vi') && voice.name.includes('Google')
        );
        if (googleVoice) return googleVoice;

        // Priority 3: Any Microsoft Vietnamese voice (Fallback to NamMinh if HoaiMy not found)
        const microsoftVoice = voices.find(voice =>
            voice.lang.includes('vi') && voice.name.includes('Microsoft')
        );
        if (microsoftVoice) return microsoftVoice;

        // Fallback: Any Vietnamese voice
        return voices.find(voice => voice.lang.includes('vi'));
    }, []);

    // Ensure voices are loaded (needed for some browsers like Chrome)
    useEffect(() => {
        window.speechSynthesis.onvoiceschanged = () => {
            // Just to trigger voice loading
            window.speechSynthesis.getVoices();
        };
    }, []);

    const processTicketNumber = (ticketNumber: string) => {
        // Extract last 4 digits
        const lastFour = ticketNumber.slice(-4);
        // Add spaces between digits for clear reading
        return lastFour.split('').join(' ');
    };

    const speakAnnouncement = useCallback((ticket: QueueTicket) => {
        const synth = window.speechSynthesis;
        const processedNumber = processTicketNumber(ticket.ticketNumber);

        // "Mời công dân {fullName}, số thứ tự {processed_number}, đến quầy phục vụ."
        const textToSpeak = `Mời công dân ${ticket.fullName}, số thứ tự ${processedNumber}, đến quầy phục vụ.`;

        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        // Configure voice
        const voice = getBestVoice();
        if (voice) {
            utterance.voice = voice;
        } else {
            console.warn('No Vietnamese voice found. Using default.');
        }

        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = (e) => {
            console.error('Speech synthesis error:', e);
            setIsSpeaking(false);
        };

        synth.speak(utterance);
    }, [getBestVoice]);

    const announceTicket = useCallback((ticket: QueueTicket) => {
        if (!ticket) return;

        setIsSpeaking(true);

        // Directly speak without sound effect for now
        speakAnnouncement(ticket);

    }, [speakAnnouncement]);

    return {
        announceTicket,
        isSpeaking
    };
};
