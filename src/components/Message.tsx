export function Message({ role, text }: { role: string; text: string }) {
    return (
      <div className={`p-2 ${role === "user" ? "text-right" : "text-left"}`}>
        <span className={`inline-block px-3 py-1 rounded-lg ${role === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>{text}</span>
      </div>
    );
  }