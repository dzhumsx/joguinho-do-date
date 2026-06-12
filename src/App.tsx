import { useState, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import './index.css';

const HeartParticles = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float text-4xl text-primary"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            opacity: 0.6 + Math.random() * 0.4,
            fontSize: `${1 + Math.random() * 2}rem`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
});

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const rawMail = searchParams.get('mail');
  let targetEmail = null;
  if (rawMail) {
    try {
      targetEmail = decodeURIComponent(atob(rawMail));
    } catch (e) {
      // Fallback in case of old plain-text links
      targetEmail = rawMail;
    }
  }

  const [generatorEmail, setGeneratorEmail] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const [step, setStep] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [food, setFood] = useState('');
  const [vibe, setVibe] = useState('');
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false);
  const [noTextIndex, setNoTextIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const noPhrases = [
    "Não 😢",
    "Por favor!!! 🥺",
    "Pense bem 🤔",
    "Tem certeza? 😭",
    "Dá uma chance! 🙏",
    "Ah qual é... 💔",
    "Olha de novo! 👀",
    "Última chance! 😤",
    "Para de fugir! 🏃‍♂️",
    "Aceita logo! 🥰"
  ];

  const handleNoHover = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const btn = noButtonRef.current.getBoundingClientRect();

    // Assume a maximum button width to ensure text changes don't push it off-screen
    const maxBtnWidth = Math.max(btn.width, 320);
    const maxBtnHeight = Math.max(btn.height, 100);

    // Use clientWidth/Height to avoid scrollbar issues
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const marginX = 20;
    const marginY = 20;

    // Max allowed positions (ensuring it stays within viewport)
    let maxX = viewportWidth - maxBtnWidth - marginX;
    let maxY = viewportHeight - maxBtnHeight - marginY;

    // If the screen is very small, fallback to at least marginX
    maxX = Math.max(marginX, maxX);
    maxY = Math.max(marginY, maxY);

    // Randomize position within safe bounds
    const randomX = marginX + Math.floor(Math.random() * (maxX - marginX + 1));
    const randomY = marginY + Math.floor(Math.random() * (maxY - marginY + 1));

    setNoPosition({ x: randomX, y: randomY });
    setIsNoButtonMoved(true);

    // Cycle to the next phrase, but if it's the first time, go to index 1.
    setNoTextIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex < noPhrases.length ? nextIndex : 1; // Loops back to index 1 to avoid 'Não 😢' again
    });
  };



  if (!targetEmail) {
    return (
      <div className="relative w-full h-screen bg-background overflow-hidden flex flex-col items-center justify-center p-4 font-sans text-slate-800">
        <HeartParticles />
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-3xl shadow-2xl z-10 max-w-lg w-full text-center animate-fade-in-up">
          <div className="text-6xl mb-6 animate-float">💌</div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Crie seu Joguinho
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Insira seu e-mail para gerar um link personalizado e mandar para a pessoa especial!
          </p>
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={generatorEmail}
            onChange={(e) => {
              setGeneratorEmail(e.target.value);
              setGeneratedLink('');
            }}
            className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 mb-4"
          />
          {generatedLink && (
            <div className="text-left mb-4 animate-fade-in-up">
              <p className="text-secondary font-bold mb-2 ml-2">Link para seu/sua amado(a):</p>
              <div className="bg-white/80 p-4 rounded-xl border border-primary/30 break-all text-sm text-slate-700 select-all font-mono">
                {generatedLink}
              </div>
            </div>
          )}
          <button
            onClick={() => {
              if (generatedLink) {
                navigator.clipboard.writeText(generatedLink);
                alert('Link copiado!');
              } else if (generatorEmail) {
                const compactedMail = btoa(encodeURIComponent(generatorEmail));
                setGeneratedLink(`${window.location.origin}${window.location.pathname}?mail=${compactedMail}`);
              }
            }}
            disabled={!generatorEmail && !generatedLink}
            className="w-full bg-primary hover:bg-secondary text-white font-bold text-xl py-3 px-8 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {generatedLink ? 'Copiar Link 📋' : 'Gerar Link ✨'}
          </button>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden flex flex-col items-center justify-center p-4 font-sans text-slate-800" ref={containerRef}>
      <HeartParticles />

      {step === 0 && (
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-3xl shadow-2xl z-10 max-w-lg w-full text-center transform transition-all duration-500 hover:scale-[1.02]">
          <div className="text-6xl mb-6 animate-heartbeat">🥺</div>
          <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-8 leading-tight">
            Você aceita sair <br /> comigo?
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 relative min-h-[60px]">
            <button
              onClick={() => setStep(1)}
              className="bg-primary hover:bg-secondary text-white font-bold text-xl py-3 px-8 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 transform hover:scale-110 active:scale-95 min-w-[160px] w-auto whitespace-nowrap z-20"
            >
              Sim! 😍
            </button>

            {isNoButtonMoved ? (
              <>
                {createPortal(
                  <button
                    ref={noButtonRef}
                    onTouchStart={handleNoHover}
                    onClick={handleNoHover}
                    style={{
                      position: 'fixed',
                      left: `${noPosition.x}px`,
                      top: `${noPosition.y}px`,
                      zIndex: 50,
                    }}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold text-xl py-3 px-8 rounded-full shadow-md transition-all duration-100 ease-out min-w-[160px] w-auto whitespace-nowrap"
                  >
                    {noPhrases[noTextIndex]}
                  </button>,
                  document.body
                )}
                <div className="opacity-0 pointer-events-none font-bold text-xl py-3 px-8 min-w-[160px] w-auto whitespace-nowrap">
                  {noPhrases[0]}
                </div>
              </>
            ) : (
              <button
                ref={noButtonRef}
                onTouchStart={handleNoHover}
                onClick={handleNoHover}
                className="bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold text-xl py-3 px-8 rounded-full shadow-md transition-all duration-200 min-w-[160px] w-auto whitespace-nowrap"
              >
                {noPhrases[noTextIndex]}
              </button>
            )}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-10 md:p-16 rounded-3xl shadow-2xl z-10 max-w-lg w-full text-center animate-fade-in-up">
          <div className="text-7xl mb-6 animate-heartbeat">🥺</div>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Você disse sim? 🥺
          </h1>
          <p className="text-xl text-primary font-medium mt-4 mb-8">
            Eu estava esperando você dizer não kkkkkkkkkkkk
          </p>
          <button
            onClick={() => setStep(2)}
            className="bg-primary hover:bg-secondary text-white font-bold text-xl py-3 px-8 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Próximo💙
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-10 md:p-12 rounded-3xl shadow-2xl z-10 max-w-lg w-full text-center animate-fade-in-up">
          <div className="text-6xl mb-6">📅</div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">
            Quando você ta livre?
          </h1>
          <div className="flex flex-col gap-4 mb-8 text-left">
            <div>
              <label className="block text-secondary font-bold mb-2">Data</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80"
              />
            </div>
            <div>
              <label className="block text-secondary font-bold mb-2">Hora</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80"
              />
            </div>
          </div>
          <button
            onClick={() => setStep(3)}
            disabled={!date || !time}
            className="bg-primary hover:bg-secondary disabled:opacity-50 disabled:hover:bg-primary text-white font-bold text-xl py-3 px-8 rounded-full shadow-lg shadow-primary/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            {(!date || !time) ? 'Escolhe primeiro ☝️' : 'Selecionar data 💙'}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-3xl shadow-2xl z-10 max-w-lg w-full text-center animate-fade-in-up">
          <div className="text-6xl mb-6">😋</div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">
            O que ta afim? 😏
          </h1>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {[
              { id: 'Hamburguer', emoji: '🍔' },
              { id: 'Sushi', emoji: '🍣' },
              { id: 'Massas', emoji: '🍝' },
              { id: 'Doces', emoji: '🍬' },
              { id: 'Pizza', emoji: '🍕' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setFood(item.id)}
                className={`py-3 px-5 rounded-2xl text-lg font-bold flex items-center gap-2 transition-all duration-200 ${food === item.id
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'bg-white/70 text-slate-700 hover:bg-white border border-slate-200'
                  }`}
              >
                <span>{item.emoji}</span> {item.id}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(4)}
            disabled={!food}
            className={`text-white font-bold text-xl py-3 px-8 rounded-full shadow-lg transition-all duration-300 ${!food
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-primary hover:bg-secondary transform hover:scale-105 active:scale-95 shadow-primary/30'
              }`}
          >
            {!food ? 'Escolhe primeiro ☝️' : 'Bora 💙'}
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-3xl shadow-2xl z-10 max-w-lg w-full text-center animate-fade-in-up">
          <div className="text-6xl mb-6">🌟</div>
          <h1 className="text-3xl font-bold text-secondary mb-2">
            Qual é a vibe? 🌟
          </h1>
          <p className="text-lg text-slate-600 mb-8">Escolha a atividade ideal</p>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {[
              { id: 'Caminhada', emoji: '🚶‍♀️' },
              { id: 'Cinema', emoji: '🍿' },
              { id: 'Boliche', emoji: '🎳' },
              { id: 'Caseira', emoji: '🏡' },
              { id: 'Praça', emoji: '🌳' },
              { id: 'Praia', emoji: '🏖️' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setVibe(item.id)}
                className={`py-3 px-5 rounded-2xl text-lg font-bold flex items-center gap-2 transition-all duration-200 ${vibe === item.id
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'bg-white/70 text-slate-700 hover:bg-white border border-slate-200'
                  }`}
              >
                <span>{item.emoji}</span> {item.id}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setStep(5);
              if (targetEmail) {
                fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                    _subject: "O Joguinho deu certo! Date confirmado! 💖",
                    Quando: `${date.split('-').reverse().join('/')} às ${time}`,
                    Comida: food,
                    Vibe: vibe,
                    Mensagem: "A pessoa amada aceitou o convite e montou o encontro ideal! Prepare-se."
                  })
                }).catch(err => console.error('Erro ao enviar email:', err));
              }
            }}
            disabled={!vibe}
            className={`text-white font-bold text-xl py-3 px-8 rounded-full shadow-lg transition-all duration-300 ${!vibe
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-primary hover:bg-secondary transform hover:scale-105 active:scale-95 shadow-primary/30'
              }`}
          >
            {!vibe ? 'Escolhe primeiro ☝️' : 'Isso parece legal 😎'}
          </button>
        </div>
      )}

      {step === 5 && (
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-3xl shadow-2xl z-10 max-w-lg w-full text-center animate-fade-in-up">
          <div className="text-7xl mb-6 animate-bounce">🥰</div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            to contigo gatinha. 💙
          </h1>
          <p className="text-xl text-primary font-medium mb-8">
            Fica pronta que vou te buscar. 🚗
          </p>

          <div className="bg-white/60 rounded-2xl p-6 text-left shadow-inner space-y-4 border border-white/50">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
              Nosso Date 💖
            </h2>
            <div className="flex items-center gap-3">
              <div className="text-2xl">📅</div>
              <div>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Quando</p>
                <p className="text-lg text-slate-800 font-medium">
                  {date.split('-').reverse().join('/')} às {time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl">😋</div>
              <div>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">O que vamos comer</p>
                <p className="text-lg text-slate-800 font-medium">{food}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl">🌟</div>
              <div>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Nossa Vibe</p>
                <p className="text-lg text-slate-800 font-medium">{vibe}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
    </div>
  );
}

export default App;
