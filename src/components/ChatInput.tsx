export function ChatInput({ input, setInput, sendMessage, loading }: { input: string; setInput: (value: string) => void; sendMessage: () => void; loading: boolean }) {
    return (
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md" onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    );
  }