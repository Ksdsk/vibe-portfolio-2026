export default function RandomPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-[480px] w-full">
        <h1 className="text-[2rem] font-medium text-white mb-4">
          Random Things About Me
        </h1>
        <p className="text-[0.9rem] text-[#666] mb-8">
          Not fully built yet, come back later
        </p>
        <a 
          href="/"
          className="inline-block text-[0.75rem] text-white border border-[#333] px-8 py-4 rounded-sm hover:border-white transition-colors"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
