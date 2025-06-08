# Blockchain Academic Records Management System

A comprehensive web application for managing academic records using blockchain technology, built with React.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **Dashboard** - Overview with statistics, charts, and recent activity
- **Records Management** - Create, view, edit, and export academic records
- **Certificate Verification** - Upload files or scan QR codes to verify authenticity
- **Institution Management** - Manage educational institutions and their data
- **Wallet Integration** - Connect MetaMask and view transaction history
- **User Profile** - Manage personal information and account settings
- **Settings** - Comprehensive application configuration

### Technical Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI/UX** - Clean interface with smooth animations using Framer Motion
- **TypeScript** - Type-safe development with full TypeScript support
- **State Management** - Efficient state handling with Zustand
- **Mock Data** - Realistic sample data for development and testing
- **Component Architecture** - Modular, reusable React components

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: Zustand for lightweight state management
- **Routing**: React Router v6 for client-side navigation
- **Animations**: Framer Motion for smooth transitions
- **Icons**: React Icons and Lucide React
- **Charts**: Recharts for data visualization
- **Web3**: Integration ready for blockchain connectivity
- **File Handling**: React Dropzone for file uploads
- **QR Codes**: React QR Code for QR code generation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Card, Input, etc.)
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   ├── records/        # Record management components
│   ├── verification/   # Certificate verification components
│   └── wallet/         # Wallet-related components
├── pages/              # Main application pages
├── store/              # State management (Zustand)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and mock data
└── hooks/              # Custom React hooks
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Used for main actions and highlights
- **Secondary**: Gray shades for text and backgrounds
- **Success**: Green (#10B981) - For verified status and positive actions
- **Warning**: Yellow (#F59E0B) - For pending status and cautions
- **Error**: Red (#EF4444) - For errors and destructive actions

### Typography
- **Font Family**: Inter (from Google Fonts)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **Cards**: Clean white backgrounds with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Consistent styling with proper validation states
- **Navigation**: Responsive sidebar with collapsible menu

## 🔑 Key Components

### Layout Components
- **Layout**: Main application wrapper with sidebar and header
- **Sidebar**: Collapsible navigation menu with route indicators
- **Header**: Top navigation with user profile and wallet status

### Dashboard Components
- **StatCard**: Displays key metrics with icons and animations
- **Charts**: Interactive charts for data visualization
- **RecentActivity**: Timeline of recent system activities

### Record Management
- **RecordList**: Filterable and searchable list of academic records
- **RecordForm**: Multi-step form for creating/editing records
- **RecordDetail**: Detailed view of individual records

### Verification System
- **FileUpload**: Drag-and-drop file upload with validation
- **QRScanner**: Camera-based QR code scanning functionality

## 🔧 Configuration

### Environment Setup
The application uses mock data for development. To connect to a real backend:

1. Update the API endpoints in `src/services/`
2. Replace mock data with actual API calls
3. Configure authentication and blockchain integration

### Tailwind CSS
Custom configuration in `tailwind.config.js` includes:
- Custom color palette
- Extended spacing and sizing
- Custom animations and transitions

## 🚀 Available Scripts

- `npm start` - Start the development server
- `npm build` - Build the application for production
- `npm test` - Run the test suite
- `npm run eject` - Eject from Create React App (not recommended)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1024px and above)
- **Tablet** (768px to 1023px)
- **Mobile** (320px to 767px)

## 🔒 Security Features

- Input validation and sanitization
- Secure authentication flow (ready for implementation)
- Protection against common web vulnerabilities
- Blockchain integration for immutable records

## 🧪 Testing

The project includes:
- Jest for unit testing
- React Testing Library for component testing
- TypeScript compilation checks

## 📈 Performance

Optimizations included:
- Code splitting with React.lazy (ready for implementation)
- Optimized bundle size with tree shaking
- Efficient re-rendering with React.memo where appropriate
- Lazy loading of heavy components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation for common solutions
- Review the component examples in the codebase

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
