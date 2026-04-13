import "index.css"
import {
  CircleCheck,
  EllipsisVertical,
  PlusCircle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";


export function App() {
  const [mode, setMode] = useState<'pomo' | 'shortBreak' | 'longBreak'>('pomo');
  const [timer, setTimer] = useState<number>(2 * 60) //timer should be in seconds so 25*60
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<Timer | null>(null);

  function changeMode(mode: 'pomo' | 'shortBreak' | 'longBreak') {
    //First stop the timer if it's running 
    if (isRunning) {
      clearInterval(intervalRef.current ?? undefined);
      intervalRef.current = null;
      setIsRunning(false)
    }
    if (mode === 'shortBreak') {
      setTimer(5 * 60) //5 
    }
    else if (mode === 'longBreak') {
      setTimer(15 * 60) //15 minutes
    }
    else {
      setTimer(25 * 60)
    }
    setMode(mode);
    console.log("Mode changed: ", mode);
  }


  useEffect(() => {
    return () => {
      console.log("Cleanup function called")
      clearInterval(intervalRef.current ?? undefined)
    }
  }, [])
  function pauseTimer() {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    setIsRunning(false)
  }
  function startTimer() {
    if (intervalRef.current && isRunning) return;
    setIsRunning(true)
    intervalRef.current = setInterval(() => setTimer((prev) => {
      console.log(intervalRef)
      if (prev < 1) {
        clearInterval(intervalRef.current ?? undefined);
        intervalRef.current = null;
        setIsRunning(false)
        return 0
      }
      return prev - 1
    }), 1000)

  }


  return (
    <main className="min-h-screen bg-[#ba4949] text-white">
      <div className="mx-auto max-w-115 px-6 pt-5 pb-8">
        <header className="mb-8 flex items-center justify-between border-b border-[#0000001a] pb-4">
          <div className="flex items-center gap-2 text-[16px] leading-none font-semibold">
            <CircleCheck className="h-8 w-8 fill-white text-[#ba4949]" strokeWidth={2.75} />
            <span className="text-[16px]">Pomofocus</span>
          </div>


        </header>
        {/* Timer */}
        <section className="mx-auto max-w-108 rounded-2xl bg-[#ffffff1a] p-6 text-center">
          <div className="mb-8 flex items-center justify-center gap-3 text-[18px] font-medium text-[#ffe8e8]">
            <button className={`${mode === 'pomo' ?
              "rounded-md bg-[#0000001a] px-4 py-1.5 font-semibold text-white"
              :
              "px-2 py-1.5"
              }`} onClick={() => changeMode("pomo")}>Pomodoro</button>
            <button className={`${mode === 'longBreak' ?
              "rounded-md bg-[#0000001a] px-4 py-1.5 font-semibold text-white"
              :
              "px-2 py-1.5"
              }`} onClick={() => { changeMode("longBreak") }}>Long Break</button>
            <button className={`${mode === 'shortBreak' ?
              "rounded-md bg-[#0000001a] px-4 py-1.5 font-semibold text-white"
              :
              "px-2 py-1.5"
              }`} onClick={() => { changeMode("shortBreak") }}>Short Break</button>
          </div>

          <p className="mb-7 text-[100px] leading-[0.9] font-bold tracking-[0.02em] text-[#f8f8f8]">
            {/* divide seconds by 60seconds to get minutes 
            and find the remainder (modulus) to get the seconds */}
            {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
          </p>
          {!isRunning ?
            <button onClick={() => startTimer()} className="mb-2 w-64 rounded-md border-b-8 border-[#0000001f] bg-white py-4 text-[22px] leading-none font-semibold tracking-[0.02em] text-[#ba4949]">
              START
            </button> :

            <button onClick={() => pauseTimer()} className="mb-2 w-64 rounded-md border-b-8 border-[#0000001f] bg-white py-4 text-[22px] leading-none font-semibold tracking-[0.02em] text-[#ba4949]">
              PAUSE
            </button>
          }
          <button onClick={() => changeMode(mode)} className="mb-2 w-64 rounded-md border-b-8 border-[#0000001f] bg-white py-4 text-[22px] leading-none font-semibold tracking-[0.02em] text-[#ba4949]">
            RESET
          </button>
        </section>
        {/* Tasks List */}
        <section className="mx-auto mt-4 max-w-108 text-center">
          <p className="text-[16px] text-[#ffd7d7]">#1</p>
          <p className="mt-1 text-[22px] font-semibold">Time to focus!</p>
        </section>
        {/* Add tasks */}
        <section className="mx-auto mt-8 max-w-108">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[22px] font-semibold">Tasks</h2>
            <button className="rounded-md bg-[#ffffff26] p-2.5 text-[#ffe2e2]">
              <EllipsisVertical className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-5 border-b border-[#f2b9b9]" />

          <button className="flex w-full items-center justify-center gap-2 rounded-xl border-3 border-dashed border-[#d18686] py-5 text-[14px] font-semibold text-[#f1b5b5]">
            <PlusCircle className="h-5 w-5 fill-[#f1b5b5] text-[#ba4949]" />
            Add Task
          </button>
        </section>
      </div>
    </main>
  );
}

export default App;
