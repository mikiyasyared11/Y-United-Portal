/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrainCircuit, 
  ChevronRight, 
  ClipboardCheck, 
  GraduationCap, 
  Gamepad2, 
  MessageSquareText, 
  Lightbulb, 
  Rocket, 
  Users, 
  ShieldCheck,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Target,
  Menu,
  X,
  Plus
} from 'lucide-react';

// --- Data Types ---
interface Certification {
  title: string;
  provider: string;
  link: string;
  description: string;
  icon: React.ReactNode;
  initials: string;
  theme: string;
}

interface Game {
  title: string;
  source: string;
  link: string;
  description: string;
  tags: string[];
}

// --- Components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bento-bg/80 backdrop-blur-xl border-b border-bento-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-bento-accent rounded-full flex items-center justify-center font-black italic text-white">Y</div>
          <div>
            <h1 className="text-xl font-black tracking-tight uppercase">United <span className="text-bento-text-muted">/ Portal</span></h1>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-bento-text-muted">
          {['Home', 'Survey', 'Tools', 'Skills', 'Games'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-bento-accent transition-colors">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block bg-zinc-800 text-bento-text px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-bento-accent hover:text-white transition-all border border-zinc-700">
            Contact
          </button>
          <button className="md:hidden text-bento-text" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-4 pb-6"
          >
            <div className="flex flex-col gap-4">
              {['Home', 'Survey', 'Tools', 'Skills', 'Games'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold uppercase tracking-widest text-bento-text py-2 hover:text-bento-accent border-b border-bento-border/50"
                >
                  {item}
                </a>
              ))}
              <button className="bg-bento-accent text-zinc-950 py-3 rounded-xl text-xs font-black uppercase tracking-widest mt-2">
                Contact Service
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const SectionHeading = ({ number, title, description, badge }: { number: string, title: string, description: string, badge?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="max-w-4xl mb-12 space-y-4"
  >
    <div className="flex items-center gap-4">
      <span className="text-3xl md:text-4xl font-black italic text-bento-accent/20">{number}</span>
      {badge && <span className="px-3 py-1 bg-bento-accent/10 border border-bento-accent/20 rounded-full text-[10px] font-black uppercase tracking-widest text-bento-accent italic">{badge}</span>}
    </div>
    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">{title}</h2>
    <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">{description}</p>
  </motion.div>
);

const App = () => {
  // Survey State
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const questions = [
    { id: 1, q: "How comfortable are you with AI in your workflow?", options: ["Anxious", "Neutral", "Comfortable", "Enthusiastic"] },
    { id: 2, q: "What is your biggest fear regarding AI?", options: ["Job Displacement", "Loss of Control", "Quality Issues", "None"] },
    { id: 3, q: "How often do you currently use LLMs?", options: ["Never", "Occasionally", "Daily", "Constantly"] },
    { id: 4, q: "What training do you value most?", options: ["Prompt Engineering", "Strategy", "Ethics", "Technical Dev"] }
  ];

  // Tools State
  const [activeTool, setActiveTool] = useState(0);
  const mindsetTools = [
    { title: "Empathy Audit", icon: <Users />, desc: "Recognize emotions as data points in the transition." },
    { title: "Reframe Workshop", icon: <Lightbulb />, desc: "Convert anxiety into actionable growth strategies." },
    { title: "Tool Deployment", icon: <Rocket />, desc: "Integrate specialized AI agents into your daily tasks." },
    { title: "Feedback & Mastery", icon: <Target />, desc: "Iterate based on performance metrics and sentiment." }
  ];

  // Skills Hub Data
  const certifications: Certification[] = [
    { title: "AI Literacy Professional", provider: "IBM", link: "https://www.coursera.org", description: "Foundational concepts for the modern professional.", icon: <GraduationCap size={16}/>, initials: "AI", theme: "text-green-400 bg-green-400/10 border-green-400/20" },
    { title: "GenAI for Business Leaders", provider: "LinkedIn", link: "https://www.linkedin.com", description: "Strategic implementation and change management.", icon: <BrainCircuit size={16}/>, initials: "BL", theme: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
    { title: "Advanced Prompting", provider: "DeepLearning.AI", link: "https://www.deeplearning.ai", description: "Mastering communication with LLMs.", icon: <Sparkles size={16}/>, initials: "AP", theme: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
    { title: "AI Ethics & Governance", provider: "Microsoft", link: "https://learn.microsoft.com", description: "Responsible AI development and deployment.", icon: <ShieldCheck size={16}/>, initials: "EG", theme: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" }
  ];

  const games: Game[] = [
    { title: "Quick, Draw!", source: "Google", link: "https://quickdraw.withgoogle.com/", description: "Train a neural network by doodling objects in seconds.", tags: ["CREATIVE", "FAST"] },
    { title: "Teachable Machine", source: "Google", link: "https://teachablemachine.withgoogle.com/", description: "Create your own ML models with no coding required.", tags: ["LEARNING", "TOOLS"] },
    { title: "AI Dungeon", source: "Latitude", link: "https://aidungeon.io/", description: "Infinite text adventures powered by generative AI.", tags: ["STORY", "RPG"] },
    { title: "Human or Not?", source: "SocialAI", link: "https://www.humanornot.ai/", description: "Test your ability to distinguish humans from bots.", tags: ["ETHICS", "SOCIAL"] }
  ];

  return (
    <div className="min-h-screen bg-bento-bg flex flex-col font-sans">
      <Header />

      <main className="flex-grow space-y-24 sm:space-y-32 py-10 sm:py-20 overflow-x-hidden">
        
        {/* --- HOME SECTION --- */}
        <section id="home" className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min"
          >
            <div className="md:col-span-12 lg:col-span-8 bento-card bg-bento-card min-h-[350px] sm:min-h-[400px] flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <span className="label-caps mb-6 sm:mb-8 inline-block underline decoration-bento-accent decoration-2 underline-offset-4">Mission Statement</span>
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase">
                  LEAD THE <br/>
                  <span className="text-zinc-700 italic">TRANSITION.</span>
                </h1>
              </div>
              <div className="relative z-10 pt-8 sm:pt-12 flex flex-col sm:flex-row justify-between items-end gap-6">
                <p className="text-zinc-400 max-w-sm text-sm sm:text-base md:text-lg leading-relaxed">
                  We empower YearUp United students and alumni to bridge the gap between human intuition and machine intelligence.
                </p>
                <div className="flex gap-4 w-full sm:w-auto">
                  <a href="#survey" className="flex flex-grow sm:flex-grow-0 items-center justify-center gap-2 bg-bento-accent text-white px-6 py-3 rounded-full font-black uppercase text-xs hover:scale-105 transition-transform shadow-xl shadow-bento-accent/20">
                    Get Started <ChevronRight size={18} />
                  </a>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-bento-accent/5 rounded-full blur-[100px] -mr-32 -mt-32 sm:-mr-48 sm:-mt-48 pointer-events-none" />
            </div>

            <div className="md:col-span-6 lg:col-span-4 bento-card bg-zinc-950 flex flex-col justify-between">
              <h3 className="label-caps flex justify-between uppercase">Pulse Metric <Target size={14}/></h3>
              <div className="py-6 sm:py-8">
                <div className="text-5xl sm:text-6xl font-black tracking-tighter italic text-bento-accent">82%</div>
                <p className="text-[10px] sm:text-xs uppercase font-bold text-zinc-500 tracking-widest mt-2">Team Confidence Score</p>
              </div>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(i => <div key={i} className={`h-1 flex-grow rounded-full ${i <= 4 ? 'bg-bento-accent' : 'bg-zinc-800'}`} />)}
              </div>
            </div>

            <div className="md:col-span-6 lg:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {['Audit', 'Reframe', 'Deploy', 'Master'].map((item, idx) => (
                <div key={item} className="bento-card bg-bento-card py-6 flex flex-col items-center justify-center text-center gap-2 group cursor-default">
                  <span className="text-zinc-800 text-3xl sm:text-4xl font-black italic group-hover:text-bento-accent transition-colors">0{idx+1}</span>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-500">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- SURVEY SECTION --- */}
        <section id="survey" className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="01" 
            title="AI Pulse Survey" 
            badge="Interactive Feedback"
            description="Our real-time technology survey allows students to provide feedback in real time, giving you a voice in how tools are developed."
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bento-card bg-zinc-950 p-0 overflow-hidden border-2 border-bento-accent/20"
          >
            <div className="grid lg:grid-cols-[1fr,400px]">
              <div className="p-6 sm:p-10 md:p-16 space-y-10 sm:space-y-12">
                <AnimatePresence mode="wait">
                  {!surveyComplete ? (
                    <motion.div 
                      key={surveyStep}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6 sm:space-y-8"
                    >
                      <div className="flex gap-2 sm:gap-4">
                        {questions.map((_, i) => (
                          <div key={i} className={`h-1 flex-grow rounded-full transition-colors ${i <= surveyStep ? 'bg-bento-accent' : 'bg-zinc-800'}`} />
                        ))}
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight italic uppercase">{questions[surveyStep].q}</h3>
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        {questions[surveyStep].options.map((opt) => (
                          <button 
                            key={opt} 
                            onClick={() => {
                              if (surveyStep < questions.length - 1) setSurveyStep(surveyStep + 1);
                              else setSurveyComplete(true);
                            }}
                            className="bg-zinc-900 border border-bento-border p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-left hover:border-bento-accent hover:bg-bento-accent/5 transition-all text-xs sm:text-sm font-bold uppercase tracking-widest group flex justify-between items-center"
                          >
                            {opt}
                            <Plus size={16} className="text-zinc-700 group-hover:text-bento-accent" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10 sm:py-20 space-y-6">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-bento-accent rounded-full mx-auto flex items-center justify-center text-white">
                        <ShieldCheck size={40} />
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter">Transmission Received</h3>
                      <p className="text-zinc-500 text-sm sm:text-base max-w-sm mx-auto">Your metrics have been integrated into the YearUp United AI Strategy. Thank you for your transparency.</p>
                      <button 
                        onClick={() => {setSurveyStep(0); setSurveyComplete(false);}}
                        className="text-bento-accent text-[10px] sm:text-xs font-black uppercase tracking-widest hover:underline"
                      >
                        Start New Session
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="bg-zinc-900/50 p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-bento-border flex flex-col justify-between gap-8 sm:gap-12">
                <div className="space-y-4">
                  <h4 className="label-caps">Why this matters</h4>
                  <p className="text-[10px] sm:text-xs text-zinc-500 leading-relaxed font-bold uppercase italic">
                    AI transformation succeeds only when human feedback is prioritized. Your data directly influences the development of our specialized student curriculum.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                    <span>Survey Progress</span>
                    <span className="text-bento-accent">{Math.round(((surveyStep + (surveyComplete ? 1 : 0)) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-zinc-950 rounded-full border border-bento-border overflow-hidden">
                    <div className="h-full bg-bento-accent transition-all duration-500" style={{ width: `${((surveyStep + (surveyComplete ? 1 : 0)) / questions.length) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- TOOLS SECTION --- */}
        <section id="tools" className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="02" 
            title="Mindset Micro-Tools" 
            badge="1-3 Minute Drills"
            description="Practical, rapid-access tools designed to keep students calm, open, and curious during the transition phase."
          />
          
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="space-y-3 sm:space-y-4">
              {mindsetTools.map((tool, idx) => (
                <motion.button 
                  key={tool.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveTool(idx)}
                  className={`w-full bento-card text-left flex items-center gap-4 sm:gap-6 group transition-all p-5 sm:p-8 ${activeTool === idx ? 'border-bento-accent bg-bento-accent/5' : 'hover:border-zinc-700'}`}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors shrink-0 ${activeTool === idx ? 'bg-bento-accent text-zinc-950' : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700'}`}>
                    {tool.icon}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className={`text-base sm:text-lg font-black uppercase italic tracking-tight truncate ${activeTool === idx ? 'text-white' : 'text-zinc-400'}`}>{tool.title}</h4>
                    <p className="text-[10px] sm:text-xs text-zinc-500 font-medium">{idx + 1}.0 Transformation Phase</p>
                  </div>
                  <ArrowRight size={20} className={`transition-transform shrink-0 ${activeTool === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} />
                </motion.button>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bento-card bg-zinc-950 border-2 border-bento-accent/20 flex flex-col justify-between overflow-hidden relative min-h-[300px] sm:min-h-[400px]"
            >
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <span className="label-caps text-bento-accent">Active Procedure</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTool}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="text-zinc-800 text-7xl sm:text-8xl md:text-9xl font-black italic absolute -right-4 -top-6 sm:-top-8 select-none pointer-events-none opacity-20">0{activeTool + 1}</div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">{mindsetTools[activeTool].title}</h3>
                    <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed font-serif italic max-w-sm">"{mindsetTools[activeTool].desc}"</p>
                    <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button className="bg-bento-accent text-white px-6 sm:px-8 py-3 rounded-full font-black uppercase text-[10px] sm:text-xs flex items-center justify-center gap-2">Initiate Drill <Plus size={16}/></button>
                      <button className="px-6 sm:px-8 py-3 rounded-full font-black uppercase text-[10px] sm:text-xs border border-zinc-700 text-zinc-400 hover:bg-zinc-800">Learn More</button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 bg-bento-accent/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* --- SKILLS SECTION --- */}
        <section id="skills" className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="03" 
            title="Skill-Up Hub" 
            badge="Professional Growth"
            description="Official certifications and learning pathways focusing on AI competency for YearUp United winners."
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, idx) => (
              <motion.a 
                key={cert.title} 
                href={cert.link} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                target="_blank" 
                rel="noreferrer" 
                className={`bento-card flex flex-col justify-between group hover:scale-[1.02] active:scale-95 min-h-[220px] ${cert.theme}`}
              >
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-zinc-950 rounded-2xl border border-white/10 group-hover:border-current transition-colors">
                      {cert.icon}
                    </div>
                    <span className="font-mono text-[10px] sm:text-xs font-black italic opacity-50">{cert.initials}</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black uppercase leading-[0.9] tracking-tighter text-white">{cert.title}</h4>
                    <p className="text-[10px] sm:text-xs font-bold leading-relaxed opacity-60 text-white truncate-2-lines">{cert.description}</p>
                  </div>
                </div>
                <div className="pt-6 sm:pt-8 flex justify-between items-center text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white">
                  <span>{cert.provider} • CORE</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sm:col-span-2 lg:col-span-4 bento-card bg-zinc-950 border-dashed flex flex-col lg:flex-row items-center justify-between gap-8 py-8 sm:py-12"
            >
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-800 rounded-full border border-zinc-700 flex items-center justify-center shrink-0">
                  <GraduationCap size={28} className="text-zinc-500" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tighter italic text-bento-accent">United Reimbursement</h4>
                  <p className="text-xs sm:text-sm text-zinc-500 font-bold uppercase tracking-widest italic">All YearUp United members qualify for 100% course funding.</p>
                </div>
              </div>
              <button className="w-full lg:w-auto bg-bento-accent text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-black uppercase text-[10px] sm:text-xs shadow-lg shadow-bento-accent/20 transition-transform hover:scale-105 active:scale-95">Request Access Token</button>
            </motion.div>
          </div>
        </section>

        {/* --- GAMES SECTION --- */}
        <section id="games" className="max-w-7xl mx-auto px-6 pb-10 sm:pb-20">
          <SectionHeading 
            number="04" 
            title="AI Acceptance Games" 
            badge="Creative Sandbox"
            description="Playful interactions designed to familiarize students with neural networks and machine learning output."
          />
          
          <div className="grid md:grid-cols-2 gap-4">
            {games.map((game, i) => (
              <motion.a 
                key={game.title} 
                href={game.link} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                target="_blank" 
                rel="noreferrer" 
                className={`bento-card group flex flex-col justify-between gap-8 sm:gap-12 overflow-hidden relative min-h-[250px] sm:min-h-[300px] ${i % 3 === 0 ? 'bg-bento-accent text-white' : 'bg-bento-card border-zinc-800'}`}
              >
                <div className="relative z-10 space-y-4 sm:space-y-6">
                  <div className="flex justify-between items-start">
                    <span className={`label-caps ${i % 3 === 0 ? 'text-white/60' : 'text-zinc-500'}`}>{game.source} // LAB</span>
                    <Gamepad2 size={24} className={i % 3 === 0 ? 'text-white/40' : 'text-zinc-800'} />
                  </div>
                  <h4 className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.8] ${i % 3 === 0 ? 'text-white' : 'text-white'}`}>{game.title}</h4>
                  <p className={`text-xs sm:text-sm font-bold leading-relaxed max-w-xs ${i % 3 === 0 ? 'text-white/70' : 'text-zinc-500'}`}>{game.description}</p>
                </div>
                <div className="relative z-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {game.tags.map(tag => (
                    <span key={tag} className={`px-2 sm:px-3 py-1 rounded-md text-[8px] sm:text-[9px] font-black uppercase tracking-widest shrink-0 ${i % 3 === 0 ? 'bg-zinc-950 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 sm:-mr-32 sm:-mt-32 pointer-events-none" />
              </motion.a>
            ))}
          </div>
        </section>

      </main>

      <footer className="bg-zinc-950 border-t border-bento-border py-12 sm:py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr] gap-12 sm:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-bento-accent rounded-full flex items-center justify-center font-black italic text-white text-lg sm:text-xl">Y</div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase">United <span className="text-bento-text-muted">/ Portal</span></h1>
            </div>
            <p className="text-zinc-500 max-w-md text-xs sm:text-sm font-bold uppercase tracking-widest italic leading-relaxed">
              Leading the AI transformation with a growth mindset. Building a human-centric future through YearUp United excellence.
            </p>
            <div className="flex gap-4">
              {['Discord', 'GitHub', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-bento-border flex items-center justify-center hover:bg-bento-accent hover:text-white transition-all">
                  <ArrowRight size={16} className="-rotate-45" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <h4 className="label-caps text-white">Ecosystem</h4>
            <nav className="flex flex-wrap md:flex-col gap-3 sm:gap-3">
              {['Home', 'Survey', 'Tools', 'Skills', 'Games'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-bento-accent transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h4 className="label-caps text-white">Status</h4>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white italic">Service Operational</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] italic">v2.1 // United AI Portal</p>
              <a href="mailto:slin@my.yearup.org" className="text-[9px] sm:text-[10px] text-bento-accent font-black uppercase tracking-widest hover:underline italic">slin@my.yearup.org</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 sm:mt-20 pt-8 border-t border-zinc-900 flex justify-center">
          <p className="text-[9px] sm:text-[10px] text-zinc-700 font-black uppercase tracking-widest italic">© 2026 YearUp United Portal • All Systems Verified</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
