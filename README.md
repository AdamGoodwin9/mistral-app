# Mistral Chat Application

A Next.js-based chat application that uses the Mistral AI API to create an interactive chatbot experience. The application supports multiple Mistral models and features a responsive design with dark mode support.

## Features

- Real-time streaming responses
- Multiple Mistral model support (Tiny, Small, Medium, Large)
- Dark mode support
- Responsive design for mobile and desktop
- TypeScript implementation
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18.x or higher
- A Mistral AI API key ([Get one here](https://console.mistral.ai/))

## Setup

1. Clone the repository:

```bash
git clone https://github.com/AdamGoodwin9/mistral-app.git
cd mistral-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Mistral AI API key:

```bash
MISTRAL_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Select a Mistral model from the dropdown menu at the top of the chat interface:
   - Mistral Tiny: Fastest, suitable for simple queries
   - Mistral Small: Good balance of speed and capability
   - Mistral Medium: Enhanced comprehension and response quality
   - Mistral Large: Most capable, best for complex tasks

2. Type your message in the input field at the bottom of the chat interface

3. Press Enter or click the Send button to submit your message

4. Watch as the AI responds in real-time with streaming text

## Project Structure

- `/src/app`: Next.js app router configuration and global styles
- `/src/components`: React components
- `/src/app/api`: API routes for handling Mistral AI communication

## Key Components

- `Chat.tsx`: Main chat interface and logic
- `ModelSelector.tsx`: Model selection dropdown
- `Message.tsx`: Individual message display
- `ChatInput.tsx`: User input interface

## Environment Variables

Required environment variables:

```bash
MISTRAL_API_KEY=your_api_key_here
```

## Development

To run the development server with hot reload:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Technologies Used

- Next.js 15.1.7
- React 19
- TypeScript
- Tailwind CSS
- Mistral AI API
- Server-Sent Events (SSE) for streaming

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.