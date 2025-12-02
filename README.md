# iDevStudio - Online Code Editor

A modern, powerful online code editor that lets you write, execute, and share code in 10+ programming languages with beautiful themes and real-time execution.

![iDevStudio](https://img.shields.io/badge/Next.js-15.5.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- **Multi-Language Support** - Write and execute code in JavaScript, TypeScript, Python, Java, C++, Go, Rust, C#, Ruby, and Swift
- **Real-Time Execution** - Run your code instantly with our powerful execution engine powered by Piston API
- **Beautiful Themes** - Choose from 6 professionally designed editor themes (VS Dark, VS Light, GitHub Dark, Monokai, Solarized Dark, Dracula)
- **Monaco Editor** - Professional code editor with IntelliSense, syntax highlighting, and code folding
- **Code Snippets** - Save, organize, and share your code snippets with the community
- **Star System** - Star your favorite snippets for quick access
- **Comments & Discussion** - Comment on snippets and engage with other developers
- **User Profiles** - Track your code executions, starred snippets, and coding statistics
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS 4 with custom color variables
- **Authentication:** Clerk
- **Database:** Convex (real-time backend)
- **Editor:** Monaco Editor
- **Code Execution:** Piston API
- **Animation:** Motion (Framer Motion)
- **State Management:** Zustand
- **Icons:** React Icons (Lucide)
- **Syntax Highlighting:** react-syntax-highlighter

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mhistiak3/i-dev-studio.git
   cd i-dev-studio
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Convex
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CONVEX_DEPLOYMENT=your_convex_deployment
   ```

4. **Set up Convex**

   ```bash
   npx convex dev
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Custom Color Theme

The application uses custom color variables defined in `globals.css`:

```css
--color-primary: #4f46e5; /* Primary brand color */
--color-dark: #1f2937; /* Dark backgrounds */
--color-light: #f3f4f6; /* Light text */
--color-body: #000; /* Body background */
--color-border: #374151; /* Border colors */
```

## 🌐 Supported Languages

| Language   | Version | Runtime |
| ---------- | ------- | ------- |
| JavaScript | 18.15.0 | Node.js |
| TypeScript | 5.0.3   | Node.js |
| Python     | 3.10.0  | CPython |
| Java       | 15.0.2  | OpenJDK |
| C++        | 10.2.0  | GCC     |
| Go         | 1.16.2  | Go      |
| Rust       | 1.68.2  | Rustc   |
| C#         | 6.12.0  | Mono    |
| Ruby       | 3.0.1   | Ruby    |
| Swift      | 5.3.3   | Swift   |

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── (root)/              # Landing page
│   │   │   └── _components/     # Landing page components
│   │   ├── editor/              # Code editor page
│   │   │   ├── _components/     # Editor components
│   │   │   └── _constants/      # Language configs & themes
│   │   ├── snippets/            # Snippets gallery
│   │   │   └── [id]/            # Snippet details
│   │   └── profile/             # User profile
│   ├── components/              # Shared components
│   ├── store/                   # Zustand store
│   ├── types/                   # TypeScript types
│   └── hooks/                   # Custom hooks
├── convex/                      # Backend functions & schema
└── public/                      # Static assets
```

## 🛠️ Development

- **Dev Server:** `pnpm dev`
- **Build:** `pnpm build`
- **Start:** `pnpm start`
- **Lint:** `pnpm lint`
- **Type Check:** `pnpm type-check`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Istiak Ahammad**

- GitHub: [@mhistiak3](https://github.com/mhistiak3)
- Repository: [i-dev-studio](https://github.com/mhistiak3/i-dev-studio)

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - The code editor that powers Visual Studio Code
- [Piston API](https://github.com/engineer-man/piston) - Code execution engine
- [Clerk](https://clerk.com/) - Authentication and user management
- [Convex](https://www.convex.dev/) - Real-time backend platform
- [Next.js](https://nextjs.org/) - The React framework for production

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/mhistiak3">Istiak Ahammad</a>
  <br>
  <sub>© 2025 iDevStudio | All Rights Reserved</sub>
</div>
