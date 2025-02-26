export function ChatInput({ input, setInput, sendMessage, loading }: { input: string; setInput: (value: string) => void; sendMessage: () => void; loading: boolean }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="flex-1 p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 
                   text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 dark:focus:ring-blue-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={loading ? "Waiting for response..." : "Type a message..."}
      />
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg 
                   transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={sendMessage} 
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="animate-pulse">...</span>
          </span>
        ) : (
          'Send'
        )}
      </button>
    </div>
  );
}