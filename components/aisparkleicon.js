const AISparkleIcon = ({ className = "", color = "#bfa85c", activeColor = "#f3d672" }) => (
    <svg
      className={`ai-sparkle-icon ${className}`}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes pulse1 {
          0%, 100% {
            transform: scale(1);
            fill: ${color};
          }
          50% {
            transform: scale(1.12);
            fill: ${activeColor};
          }
        }
  
        @keyframes pulse2 {
          0%, 100% {
            transform: scale(1);
            fill: ${color};
          }
          50% {
            transform: scale(1.08);
            fill: ${activeColor};
          }
        }
  
        .pulse {
          transform-box: fill-box;
          transform-origin: center;
        }
  
        .ai-sparkle-icon {
          width: 28px;
          height: 28px;
          display: block;
        }
  
        @media (max-width: 768px) {
          .ai-sparkle-icon {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
  
      {/* Steaua mare, centrală */}
      <path
        className="pulse"
        style={{ animation: 'pulse1 2.8s ease-in-out infinite' }}
        d="M32 12 C34 24 40 30 52 32 C40 34 34 40 32 52 C30 40 24 34 12 32 C24 30 30 24 32 12 Z"
        fill={color}
      />
  
      {/* Steaua mică jos-stânga */}
      <path
        className="pulse"
        style={{ animation: 'pulse1 2.8s ease-in-out infinite' }}
        d="M16 42 C17 45 20 48 24 49 C20 50 17 53 16 56 C15 53 12 50 8 49 C12 48 15 45 16 42 Z"
        fill={color}
      />
  
      {/* Steaua mică sus-dreapta */}
      <path
        className="pulse"
        style={{ animation: 'pulse2 3.6s ease-in-out infinite' }}
        d="M48 6 C49 10 52 13 56 14 C52 15 49 18 48 22 C47 18 44 15 40 14 C44 13 47 10 48 6 Z"
        fill={color}
      />
    </svg>
  );
  
  export default AISparkleIcon;
  