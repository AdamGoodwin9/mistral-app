export function Message({ role, text }: { role: string; text: string }) {
    return (
      <div className={`p-2 ${role === "user" ? "text-right" : "text-left"}`}>
        <span 
          className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
            role === "user" 
              ? "bg-blue-600 text-white" 
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          }`}
        >
          {text}
        </span>
      </div>
    );
  }