import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-6 md:px-16 py-6 bg-black border-t border-gray-900/20 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs md:text-left text-gray-500">
        <div className="flex items-center justify-center md:justify-start gap-2 text-white font-semibold">
          <svg
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-red-600"
          >
            <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h15a3 3 0 003-3v-9a3 3 0 00-3-3h-15z" />
            <path
              fillRule="evenodd"
              d="M10.5 8.414l5.25 3.343a.25.25 0 010 .426l-5.25 3.343a.25.25 0 01-.375-.213V8.627a.25.25 0 01.375-.213z"
              clipRule="evenodd"
            />
          </svg>
          <span className="tracking-wide">Movie</span>
        </div>
        <div className="text-xs md:text-sm text-gray-500 font-medium tracking-wide">
          Copyright @2026 Movie Explorer
        </div>
      </div>
    </footer>
  );
};

export default Footer;
