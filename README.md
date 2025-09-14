# Chatty - AI-Powered Chat Application

A modern real-time chat application built with Next.js 15, Firebase, and Google AI (Genkit). Features intelligent message categorization using AI and a sleek, responsive interface.

## Features

- 🚀 **Modern Tech Stack**: Next.js 15 with Turbopack, TypeScript, Tailwind CSS
- 🤖 **AI Integration**: Google Gemini AI for message categorization via Genkit
- 💬 **Real-time Chat**: Private and group messaging with live updates
- 🎨 **Beautiful UI**: Radix UI components with custom styling
- 📱 **Responsive Design**: Mobile-first approach with adaptive layouts
- 🔥 **Firebase Ready**: Configured for Firebase App Hosting deployment

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **AI**: Google Genkit with Gemini 2.5 Flash
- **Deployment**: Firebase App Hosting
- **Build Tool**: Turbopack

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Google AI API key (for message categorization)

## Getting Started

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd Chatty
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:9002`

## Available Scripts

- `npm run dev` - Start development server with Turbopack on port 9002
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit with file watching

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main chat interface
│   ├── layout.tsx         # Root layout with fonts and toaster
│   └── actions.ts         # Server actions for AI categorization
├── components/
│   ├── chat/              # Chat-specific components
│   │   ├── chat-layout.tsx    # Main chat layout manager
│   │   ├── chat-list.tsx      # Chat sidebar with conversations
│   │   ├── chat-view.tsx      # Individual chat view
│   │   ├── message-bubble.tsx # Message display component
│   │   └── ...
│   └── ui/                # Reusable UI components (Radix UI)
├── ai/
│   ├── genkit.ts          # Genkit AI configuration
│   └── flows/
│       └── categorize-incoming-messages.ts # AI message categorization
├── lib/
│   ├── data.ts            # Mock data for users and chats
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
└── hooks/                 # Custom React hooks
```

## Key Features

### AI Message Categorization
Messages can be automatically categorized using Google's Gemini AI:
- Predefined labels for categorization
- Confidence scoring for categorization accuracy
- Server-side processing with Genkit flows

### Chat Interface
- Private and group conversations
- Real-time message updates
- User avatars and profiles
- Message timestamps
- Responsive design for all devices

### UI Components
- Built with Radix UI primitives
- Custom Tailwind CSS styling
- Dark mode support
- Accessible components
- Toast notifications

## Deployment

### Firebase App Hosting
The project is configured for Firebase App Hosting deployment:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase:**
   ```bash
   firebase deploy
   ```

Configuration is managed via `apphosting.yaml`.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| `GOOGLE_GENAI_API_KEY` | Google AI API key for Genkit | Yes (for AI features) |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## License

This project is private and proprietary.
