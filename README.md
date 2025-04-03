# EcoShop E-commerce Platform

A modern e-commerce platform built with Next.js, Redux Toolkit, and Tailwind CSS.

## Maintained by: [Anshulsm12](https://github.com/Anshulsm12)

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Anshulsm12/ecommerce-project.git
cd ecommerce-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📦 Project Structure

```
ecommerce-project/
├── components/
│   ├── Layout.js           # Main layout component with navigation
│   └── CategoryFilter.js   # Product category filtering component
├── pages/
│   ├── _app.js            # Next.js app configuration with Redux setup
│   ├── index.js           # Homepage with product listing
│   └── cart.js            # Shopping cart page
├── store/
│   ├── store.js           # Redux store configuration with persist
│   └── cartSlice.js       # Cart state management
├── styles/
│   └── globals.css        # Global styles and Tailwind imports
└── public/                # Static assets
```

## 🛠️ Built With

- **Framework:** Next.js 13.4.19
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Data Persistence:** Redux Persist

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Remove node_modules and .next
- `npm run clean:install` - Clean and reinstall dependencies
- `npm run validate` - Run linting and build validation

## 🔧 Dependencies

### Production Dependencies
```json
{
    "@reduxjs/toolkit": "1.9.7",
    "react-redux": "8.1.3",
    "redux-persist": "6.0.0",
    "next": "13.4.19",
    "react": "18.2.0",
    "react-dom": "18.2.0"
}
```

### Development Dependencies
```json
{
    "autoprefixer": "10.4.14",
    "eslint": "8.46.0",
    "eslint-config-next": "13.4.19",
    "postcss": "8.4.27",
    "rimraf": "5.0.1",
    "tailwindcss": "3.3.3"
}
```

## 🚨 Common Issues and Solutions

### Node Modules Issues
If you encounter issues with node_modules:
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Dependency Version Mismatch
If you encounter version mismatch issues:
```bash
npm run clean:install
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow the existing code style and organization
- Use Tailwind CSS for styling
- Maintain component-based architecture
- Write meaningful commit messages
- Keep dependencies up to date

## 🔒 Environment Variables

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

## ✨ Features

- [x] Product listing
- [x] Category filtering
- [x] Shopping cart functionality
- [x] Dark/Light mode toggle
- [x] Persistent cart state
- [ ] User authentication
- [ ] Checkout process
- [ ] Order history

## 📄 License

This project is MIT licensed.

---
Built with ❤️ by [Anshulsm12](https://github.com/Anshulsm12)
