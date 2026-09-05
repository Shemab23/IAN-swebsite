import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  User, 
  Phone, 
  Compass, 
  Plane, 
  CheckCircle2, 
  Maximize2, 
  Minimize2, 
  RotateCcw,
  Sparkles,
  ExternalLink,
  PhoneCall,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    type: 'whatsapp' | 'call' | 'quote';
    label: string;
    url?: string;
  };
}

export const TravelChatBox: React.FC = () => {
  const { content, addQuoteRequest } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'callback'>('chat');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  // Callback form state
  const [cbName, setCbName] = useState('');
  const [cbPhone, setCbPhone] = useState('');
  const [cbTopic, setCbTopic] = useState('Urgent Flight Booking');
  const [cbSubmitted, setCbSubmitted] = useState(false);
  const [cbError, setCbError] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialWelcomeMessages: Message[] = [
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Hello! 👋 Welcome to IAN'S Travel & Tours.\n\nI'm your Kigali Travel Concierge. You can ask me anything about flights from Kigali (KGL), mountain gorilla permits, wildlife safaris, hotel reservations, or visa assistance.\n\nPrefer a direct phone call? Click "Request Call" or call our desk directly at ${content.phone1}!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: {
        type: 'whatsapp',
        label: 'Chat Directly on WhatsApp',
        url: `https://wa.me/250783553278?text=${encodeURIComponent("Hello IAN'S Travel Desk, I'm reaching out from your website.")}`
      }
    }
  ];

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('ians_chat_history');
    return saved ? JSON.parse(saved) : initialWelcomeMessages;
  });

  useEffect(() => {
    localStorage.setItem('ians_chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        if (activeTab === 'chat') {
          inputRef.current?.focus();
        }
      }, 150);
    }
  }, [isOpen, messages, activeTab]);

  // Conversational response engine tailored for open dialogue rather than rigid quiz
  const generateBotReply = (query: string): { text: string; action?: Message['action'] } => {
    const q = query.toLowerCase();

    // Call / phone number / callback requests in chat
    if (q.includes('call') || q.includes('phone') || q.includes('talk to someone') || q.includes('human') || q.includes('agent') || q.includes('speak')) {
      return {
        text: `We'd be delighted to speak with you! 📞\n\nOur Kigali travel specialists are available 24/7. You can:\n1. Call us directly at ${content.phone1} or ${content.phone2}\n2. Switch to the "Request Call" tab above to have us call your number within 5 minutes\n3. Click below to continue on WhatsApp instantly.`,
        action: {
          type: 'whatsapp',
          label: 'Continue on WhatsApp',
          url: `https://wa.me/250783553278?text=${encodeURIComponent(`Hello IAN'S Travel, I would like to speak directly with an agent regarding: "${query}"`)}`
        }
      };
    }

    // Friendly greetings
    if (q === 'hi' || q === 'hello' || q === 'hey' || q.includes('good morning') || q.includes('good afternoon') || q.includes('good evening') || q.includes('muraho')) {
      return {
        text: `Hello and welcome! 😊 Great to connect with you. What journey are you planning? We can help you check flight tickets, arrange a Rwanda gorilla safari, reserve boutique hotels, or coordinate airport transfers. Tell me where you'd like to go!`,
        action: {
          type: 'whatsapp',
          label: 'Chat on WhatsApp',
          url: `https://wa.me/250783553278?text=${encodeURIComponent("Hello IAN'S Travel Desk, I'm reaching out to plan a trip.")}`
        }
      };
    }

    // Flight inquiries
    if (q.includes('flight') || q.includes('ticket') || q.includes('airline') || q.includes('fly') || q.includes('fare') || q.includes('dubai') || q.includes('london') || q.includes('guangzhou') || q.includes('nairobi') || q.includes('brussels') || q.includes('paris') || q.includes('doha')) {
      let routeNote = 'We partner with RwandAir, Qatar Airways, Emirates, Ethiopian Airlines, Turkish Airlines, and Brussels Airlines for competitive fares from Kigali (KGL).';
      if (q.includes('dubai')) {
        routeNote = 'Direct flights to Dubai (DXB) are available via RwandAir, with seamless 1-stop alternatives via Ethiopian and Qatar Airways. Typical round-trip fares range from $420 to $680 depending on travel dates.';
      } else if (q.includes('london') || q.includes('uk')) {
        routeNote = 'Non-stop flights operate between Kigali (KGL) and London Heathrow (LHR) via RwandAir with generous luggage allowances (2x23kg).';
      } else if (q.includes('guangzhou') || q.includes('china')) {
        routeNote = 'Guangzhou (CAN) flights operate regularly, ideal for trade, business delegations, and sourcing trips.';
      } else if (q.includes('nairobi')) {
        routeNote = 'Frequent daily flights connect Kigali (KGL) and Nairobi (NBO) via RwandAir and Kenya Airways in just 1 hour 20 minutes.';
      }

      return {
        text: `✈️ **Flight Ticketing & Route Options**\n\n${routeNote}\n\nOur ticketing managers can lock in flexible fares, organize group bookings, and provide real-time availability.`,
        action: {
          type: 'whatsapp',
          label: 'Inquire Flight on WhatsApp',
          url: `https://wa.me/250783553278?text=${encodeURIComponent(`Hello IAN'S Travel desk, I was asking on your website about flight options: "${query}". Could you share current availability and fares?`)}`
        }
      };
    }

    // Gorilla trekking & Volcanoes
    if (q.includes('gorilla') || q.includes('volcano') || q.includes('musanze') || q.includes('permit') || q.includes('trek')) {
      return {
        text: `🦍 **Mountain Gorilla Trekking in Volcanoes National Park**\n\n- **Permit Rate**: USD $1,500 per person regulated by Rwanda Development Board (RDB).\n- **Location**: Musanze / Virunga range (a scenic 2.5-hour paved drive from Kigali).\n- **Experience**: 1 unforgettable hour in the presence of a habituated gorilla family with seasoned park rangers.\n- **Complete Tour**: We package your official permit with a customized 4x4 safari cruiser, professional driver-guide, and lodge reservations (from mid-range to luxury like Singita or One&Only).\n\nWould you like us to check permit date availability?`,
        action: {
          type: 'whatsapp',
          label: 'Check Gorilla Permit Dates',
          url: `https://wa.me/250783553278?text=${encodeURIComponent(`Hello IAN'S Travel, I am interested in Mountain Gorilla Trekking in Rwanda. Can you assist me with permit availability and a customized itinerary?`)}`
        }
      };
    }

    // Akagera National Park / Wildlife Safari
    if (q.includes('akagera') || q.includes('safari') || q.includes('game drive') || q.includes('wildlife') || q.includes('big five') || q.includes('lion') || q.includes('rhino') || q.includes('elephant')) {
      return {
        text: `🦁 **Akagera National Park — Big Five Safari**\n\n- **Wildlife**: Lions, white & black rhinos, elephants, buffalos, leopards, giraffes, zebras, and boat cruises on Lake Ihema with hippos and crocodiles.\n- **Options**: 1-Day Express Day Safari or 2–3 Day Immersive stay at Akagera Game Lodge, Ruzizi Tented Lodge, or Karenge Bush Camp.\n- **Vehicle**: 4x4 Land Cruiser with pop-up photography roof and expert wildlife spotter.`,
        action: {
          type: 'whatsapp',
          label: 'Book Akagera Safari',
          url: `https://wa.me/250783553278?text=${encodeURIComponent(`Hi IAN'S Tours, I'd like a quote and itinerary for an Akagera National Park Safari.`)}`
        }
      };
    }

    // Nyungwe Forest & Canopy Walk
    if (q.includes('nyungwe') || q.includes('canopy') || q.includes('chimpanzee') || q.includes('chimp') || q.includes('rainforest')) {
      return {
        text: `🌿 **Nyungwe Forest National Park & Canopy Walk**\n\n- **Experience**: Suspended 70m above the rainforest on the famous East African canopy bridge.\n- **Wildlife**: Habituated chimpanzee tracking in Cyamudongo and 400-strong Colobus monkey troops.\n- **Scenic Setting**: Rolling tea plantations, waterfalls, and pristine mountain air.`,
        action: {
          type: 'whatsapp',
          label: 'Plan Nyungwe Tour',
          url: `https://wa.me/250783553278?text=${encodeURIComponent(`Hello, I'd like to plan an excursion to Nyungwe Forest and Canopy Walk.`)}`
        }
      };
    }

    // Lake Kivu
    if (q.includes('kivu') || q.includes('gisenyi') || q.includes('rubavu') || q.includes('kibuye') || q.includes('karongi') || q.includes('lake') || q.includes('beach')) {
      return {
        text: `⛵ **Lake Kivu Getaway (Rubavu & Karongi)**\n\n- **Activities**: Sunset boat cruises, visiting Napoleon Island (fruit bats), kayaking, fresh lake fish (Sambaza & Tilapia), and coffee tours.\n- **Ideal Pair**: Perfect relaxation immediately following gorilla trekking in Musanze or safari in Akagera.`,
        action: {
          type: 'whatsapp',
          label: 'Inquire Lake Kivu Trip',
          url: `https://wa.me/250783553278?text=${encodeURIComponent(`Hi IAN'S Tours, please share package details for Lake Kivu (Rubavu/Karongi).`)}`
        }
      };
    }

    // Visa assistance
    if (q.includes('visa') || q.includes('passport') || q.includes('consulate') || q.includes('embassy') || q.includes('entry') || q.includes('requirement')) {
      return {
        text: `📑 **Visa Consultation & Document Assistance**\n\n- **Visiting Rwanda**: Citizens of all countries receive a 30-day visa upon arrival at Kigali International Airport (KGL). It is free for African Union, Commonwealth, and La Francophonie citizens.\n- **Outgoing Visas**: We assist Rwandan and international residents with Schengen visa scheduling, UAE / Dubai electronic visas, UK visitor visas, and East Africa Tourist Visas (Rwanda, Uganda, Kenya multi-entry).`,
        action: {
          type: 'whatsapp',
          label: 'Get Visa Assistance',
          url: `https://wa.me/250783553278?text=${encodeURIComponent(`Hello IAN'S Travel, I need visa consultation and assistance for my upcoming trip.`)}`
        }
      };
    }

    // Airport transfers & transport
    if (q.includes('airport') || q.includes('transfer') || q.includes('pickup') || q.includes('car') || q.includes('driver') || q.includes('taxi')) {
      return {
        text: `🚗 **Kigali Airport Transfers & Chauffeur Services**\n\n- **Service**: Punctual meet & greet at Kigali International Airport (KGL) arrivals with a personalized name board.\n- **Vehicles**: Clean executive SUVs, Safari 4x4 Land Cruisers, and group minibuses with guaranteed air conditioning.\n- **Pricing**: Transparent fixed rates with no airport bargaining. Available 24 hours a day.`,
        action: {
          type: 'whatsapp',
          label: 'Book Airport Transfer',
          url: `https://wa.me/250783553278?text=${encodeURIComponent(`Hello, I'd like to book an airport transfer in Kigali.`)}`
        }
      };
    }

    // Office location / contact
    if (q.includes('office') || q.includes('location') || q.includes('address') || q.includes('where') || q.includes('hours') || q.includes('contact')) {
      return {
        text: `📍 **IAN'S Travel & Tours Desk**\n\n- **Office Location**: ${content.buildingLocation}, Kigali, Rwanda\n- **Direct Phones**: ${content.phone1} / ${content.phone2}\n- **WhatsApp**: +250 783 553 278\n- **Email**: ${content.email}\n- **Hours**: Mon-Fri 08:00 - 18:00 | Sat 09:00 - 15:00\n- **Emergency Travel Support**: 24/7`,
        action: {
          type: 'whatsapp',
          label: 'Message Office on WhatsApp',
          url: `https://wa.me/250783553278?text=${encodeURIComponent(`Hello IAN'S Travel, I am inquiring from your website.`)}`
        }
      };
    }

    // General conversational fallback
    return {
      text: `Thank you for sharing your thoughts! ✨\n\nAt IAN'S Travel & Tours, we handle everything from international flights and gorilla trekking permits to customized multi-day expeditions and airport transfers.\n\nWould you like me to connect you with our travel desk right away, or would you prefer a quick phone call?`,
      action: {
        type: 'whatsapp',
        label: 'Chat with Senior Consultant',
        url: `https://wa.me/250783553278?text=${encodeURIComponent(`Hello IAN'S Travel, I was inquiring on your site: "${query}". Can you assist me?`)}`
      }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const messageText = (textToSend || inputText).trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const replyData = generateBotReply(messageText);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: replyData.action
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages(initialWelcomeMessages);
    localStorage.removeItem('ians_chat_history');
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCbError('');
    if (!cbName.trim() || !cbPhone.trim()) {
      setCbError('Please provide your name and phone number so we can call you.');
      return;
    }

    // Record quote/callback request in DataContext
    addQuoteRequest({
      name: cbName.trim(),
      phone: cbPhone.trim(),
      email: '',
      service: `Callback Request: ${cbTopic}`,
      message: `Traveler requested a direct phone call regarding ${cbTopic}.`
    });

    setCbSubmitted(true);
  };

  const handleResetCallback = () => {
    setCbSubmitted(false);
    setCbName('');
    setCbPhone('');
    setCbError('');
  };

  const quickPrompts = [
    '✈️ Flights from Kigali',
    '🦍 Gorilla Trekking Permits',
    '🦁 Akagera Safari',
    '📞 Talk with an agent',
    '📑 Visa assistance'
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-sky-600 hover:bg-sky-700 text-white shadow-xl shadow-sky-600/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open Travel Concierge Chat"
          id="travel-chat-trigger-btn"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
          </div>
          <span className="font-semibold text-xs sm:text-sm tracking-wide hidden xs:inline">
            Travel Concierge
          </span>
          {unreadCount > 0 && !isOpen && (
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Chat Box Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`fixed z-50 shadow-2xl rounded-3xl overflow-hidden flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 ${
              isExpanded
                ? 'inset-4 sm:inset-10 max-w-4xl max-h-[85vh] m-auto'
                : 'bottom-20 sm:bottom-24 left-4 sm:left-6 right-4 sm:right-auto w-full sm:w-[420px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[80vh]'
            }`}
          >
            {/* Top Header */}
            <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-slate-900 text-white px-4 py-3.5 flex items-center justify-between shadow-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-sky-200">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-bold text-sm tracking-tight text-white leading-none">
                      IAN'S Travel Concierge
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Live Desk
                    </span>
                  </div>
                  <p className="text-[11px] text-sky-200/80 mt-0.5 font-sans">
                    Kigali, Rwanda &bull; Available 24/7
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  title={isExpanded ? 'Minimize' : 'Expand'}
                  className="p-1.5 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition-colors hidden sm:inline-flex"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mode Switch Tabs: Live Chat vs Request Direct Callback */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950 text-xs shrink-0 font-medium">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                  activeTab === 'chat'
                    ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900 font-bold'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat Concierge</span>
              </button>

              <button
                onClick={() => setActiveTab('callback')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                  activeTab === 'callback'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 font-bold'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>Request Instant Call</span>
              </button>
            </div>

            {/* Quick Desk Action Ribbon */}
            <div className="bg-slate-50 dark:bg-slate-950/60 px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
              <span className="flex items-center gap-1 font-medium text-[11px]">
                <Clock className="w-3 h-3 text-emerald-500" />
                <span>Desk response time: &lt; 2 mins</span>
              </span>
              <a
                href={`tel:${content.phone1.replace(/[^0-9+]/g, '')}`}
                className="hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1 font-semibold text-[11px]"
                title="Call office immediately"
              >
                <Phone className="w-3 h-3 text-emerald-500" />
                <span>Direct Call: {content.phone1}</span>
              </a>
            </div>

            {/* TAB 1: Live Concierge Chat */}
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-900/50 text-sm">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5 border border-sky-200 dark:border-sky-800">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div className="max-w-[85%] space-y-2">
                        <div
                          className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                            msg.sender === 'user'
                              ? 'bg-sky-600 text-white rounded-tr-none'
                              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>

                        {/* Bot Action Button */}
                        {msg.action && (
                          <a
                            href={msg.action.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all hover:scale-[1.02]"
                          >
                            <MessageSquare className="w-3.5 h-3.5 fill-white" />
                            <span>{msg.action.label}</span>
                            <ExternalLink className="w-3 h-3 opacity-80" />
                          </a>
                        )}

                        <div
                          className={`text-[10px] text-slate-400 dark:text-slate-500 px-1 ${
                            msg.sender === 'user' ? 'text-right' : 'text-left'
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>

                      {msg.sender === 'user' && (
                        <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2.5 justify-start">
                      <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tl-none flex items-center gap-1.5 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Casual conversation topic chips */}
                <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSendMessage(prompt.replace(/^[^\w]+/, '').trim())}
                      className="whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-slate-700 transition-colors shrink-0 cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Text input bar */}
                <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tell us what you need or ask any travel question..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim()}
                    className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white transition-all shadow-md flex items-center justify-center cursor-pointer"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {/* TAB 2: Request Direct Instant Callback ("we call them all") */}
            {activeTab === 'callback' && (
              <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50 flex flex-col justify-center">
                {cbSubmitted ? (
                  <div className="text-center py-6 animate-in fade-in">
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                      Call Request Confirmed!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong>{cbName}</strong>. Our Kigali ticketing and tours desk has been alerted. We will call your number <strong>{cbPhone}</strong> shortly.
                    </p>

                    <div className="mt-6 flex flex-col gap-2">
                      <a
                        href={`tel:${content.phone1.replace(/[^0-9+]/g, '')}`}
                        className="py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Us Directly Now ({content.phone1})</span>
                      </a>
                      <button
                        onClick={handleResetCallback}
                        className="text-xs text-slate-500 dark:text-slate-400 hover:underline mt-2 cursor-pointer"
                      >
                        Request another call
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                        Let Us Call You Directly
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                        No typing needed. Our travel desk in Kigali will call you promptly.
                      </p>
                    </div>

                    {cbError && (
                      <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
                        {cbError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={cbName}
                        onChange={(e) => setCbName(e.target.value)}
                        placeholder="e.g. Marie Claire"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={cbPhone}
                        onChange={(e) => setCbPhone(e.target.value)}
                        placeholder="e.g. +250 788 123 456"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        What can we help you with?
                      </label>
                      <select
                        value={cbTopic}
                        onChange={(e) => setCbTopic(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-sky-500"
                      >
                        <option value="Urgent Flight Booking">Urgent Flight Booking</option>
                        <option value="Rwanda Gorilla Trekking">Rwanda Gorilla Trekking</option>
                        <option value="Akagera Wildlife Safari">Akagera Wildlife Safari</option>
                        <option value="Hotel & Transfers">Hotel & Airport Transfers</option>
                        <option value="Visa Consultation">Visa Consultation</option>
                        <option value="Corporate / Group Travel">Corporate / Group Travel</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Call Me Back in 5 Minutes</span>
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Free consultation. No obligations.</span>
                    </div>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
