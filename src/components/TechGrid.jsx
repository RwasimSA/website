// خلايا تومض عند مواضع شبكة الـ 60px
const blinkingCells = [
  { x: 60,   y: 60,   d: '3.2s', delay: '0s'    },
  { x: 300,  y: 120,  d: '4.5s', delay: '0.8s'  },
  { x: 600,  y: 60,   d: '3.8s', delay: '1.4s'  },
  { x: 900,  y: 120,  d: '5.1s', delay: '0.3s'  },
  { x: 1200, y: 60,   d: '3.5s', delay: '2.1s'  },
  { x: 1320, y: 180,  d: '4.2s', delay: '0.6s'  },
  { x: 60,   y: 300,  d: '4.8s', delay: '1.9s'  },
  { x: 180,  y: 420,  d: '3.3s', delay: '0.4s'  },
  { x: 1260, y: 360,  d: '5.5s', delay: '1.2s'  },
  { x: 1380, y: 480,  d: '3.9s', delay: '2.5s'  },
  { x: 120,  y: 540,  d: '4.1s', delay: '0.7s'  },
  { x: 60,   y: 660,  d: '3.6s', delay: '1.6s'  },
  { x: 240,  y: 720,  d: '5.0s', delay: '0.2s'  },
  { x: 1200, y: 600,  d: '4.4s', delay: '1.8s'  },
  { x: 1320, y: 720,  d: '3.7s', delay: '0.9s'  },
  { x: 1380, y: 840,  d: '5.2s', delay: '2.3s'  },
  { x: 480,  y: 780,  d: '3.4s', delay: '1.1s'  },
  { x: 840,  y: 780,  d: '4.6s', delay: '0.5s'  },
  { x: 420,  y: 180,  d: '5.3s', delay: '2.7s'  },
  { x: 780,  y: 240,  d: '3.1s', delay: '1.3s'  },
  { x: 1020, y: 300,  d: '4.7s', delay: '0.1s'  },
  { x: 660,  y: 660,  d: '3.9s', delay: '2.0s'  },
  { x: 960,  y: 720,  d: '4.3s', delay: '1.5s'  },
]

export default function TechGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">

      {/* شبكة الخطوط — أخف */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.032) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* خلايا تومض */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {blinkingCells.map((cell, i) => (
          <rect
            key={i}
            x={cell.x}
            y={cell.y}
            width="60"
            height="60"
            fill="white"
            style={{
              animation: `cellBlink ${cell.d} ease-in-out ${cell.delay} infinite`,
              opacity: 0.04,
            }}
          />
        ))}

        {/* خطوط تقنية على الأطراف */}
        <line x1="0"    y1="200" x2="360" y2="200" stroke="white" strokeWidth="0.8" strokeDasharray="5 14" opacity="0.14" />
        <line x1="1080" y1="200" x2="1440" y2="200" stroke="white" strokeWidth="0.8" strokeDasharray="5 14" opacity="0.14" />
        <line x1="0"    y1="700" x2="420" y2="700" stroke="white" strokeWidth="0.8" strokeDasharray="4 12" opacity="0.11" />
        <line x1="1020" y1="700" x2="1440" y2="700" stroke="white" strokeWidth="0.8" strokeDasharray="4 12" opacity="0.11" />
        <line x1="200"  y1="0"   x2="200" y2="300"  stroke="white" strokeWidth="0.8" strokeDasharray="5 14" opacity="0.12" />
        <line x1="200"  y1="600" x2="200" y2="900"  stroke="white" strokeWidth="0.8" strokeDasharray="5 14" opacity="0.12" />
        <line x1="1240" y1="0"   x2="1240" y2="320" stroke="white" strokeWidth="0.8" strokeDasharray="5 14" opacity="0.12" />
        <line x1="1240" y1="620" x2="1240" y2="900" stroke="white" strokeWidth="0.8" strokeDasharray="5 14" opacity="0.12" />

        {/* نقاط تقاطع */}
        <circle cx="200"  cy="200" r="2.5" fill="white" opacity="0.20" />
        <circle cx="1240" cy="200" r="2.5" fill="white" opacity="0.20" />
        <circle cx="200"  cy="700" r="2.5" fill="white" opacity="0.16" />
        <circle cx="1240" cy="700" r="2.5" fill="white" opacity="0.16" />

        {/* زوايا تقنية */}
        <polyline points="40,40 40,90 90,90"         stroke="white" strokeWidth="1" fill="none" opacity="0.20" strokeLinecap="round" />
        <polyline points="1400,40 1400,90 1350,90"   stroke="white" strokeWidth="1" fill="none" opacity="0.20" strokeLinecap="round" />
        <polyline points="40,860 40,810 90,810"       stroke="white" strokeWidth="1" fill="none" opacity="0.16" strokeLinecap="round" />
        <polyline points="1400,860 1400,810 1350,810" stroke="white" strokeWidth="1" fill="none" opacity="0.16" strokeLinecap="round" />
      </svg>
    </div>
  )
}
