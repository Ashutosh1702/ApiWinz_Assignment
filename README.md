# ApiWinz Assignment - JSON Tree Visualizer

An interactive web application to visualize JSON data as a dynamic tree structure using React Flow. This project demonstrates modern React development practices with clean code architecture.

🔗 **Live Demo**: [Coming Soon]

## 🌟 Features

### ✅ Mandatory Features (All Implemented)

#### 1. JSON Input & Parsing
- ✅ Text area for pasting or typing JSON data
- ✅ Real-time JSON validation with helpful error messages
- ✅ One-click "Generate Tree" button to visualize
- ✅ Sample JSON as placeholder for quick testing

#### 2. Tree Visualization with React Flow
- ✅ Displays JSON structure as a hierarchical node tree
- ✅ **Object nodes**: Show object keys (Cyan/Teal theme)
- ✅ **Array nodes**: Show array indices (Green theme)
- ✅ **Primitive nodes**: Display key and value (Orange theme)
- ✅ Animated connecting lines between parent-child nodes
- ✅ Color-coded nodes for easy identification

#### 3. Search Functionality
- ✅ Search by JSON path (e.g., `$.user.address.city`, `items[0].name`)
- ✅ Highlights matching nodes with distinct color
- ✅ Automatically pans to center the matched node
- ✅ Displays "Match found" or "No match found" messages
- ✅ Built-in search examples with click-to-search

### 🎁 Bonus Features

#### 4. Interactive Controls
- 🔎 **Zoom In/Out**: Precise zoom controls
- 📐 **Fit View**: Automatically fit entire tree in viewport
- 🗺️ **Mini Map**: Navigate large trees easily
- 🖱️ **Pan**: Drag canvas to navigate
- 💡 **Hover Tooltips**: Display node path and value on hover
- 📸 **Export as PNG**: Download tree visualization
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📋 **Copy Path**: Click on any node to copy its JSON path to clipboard

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashutosh1702/ApiWinz_Assignment.git
   cd ApiWinz_Assignment/json-tree-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 📖 Usage

1. **Enter JSON Data**: Type or paste your JSON in the text area
2. **Generate Tree**: Click the "Generate Tree" button
3. **Explore**: Use mouse to pan and scroll to zoom
4. **Search**: Use the search bar to find specific nodes by path
5. **Interact**: Click nodes to copy path, hover to see details
6. **Export**: Download as PNG if needed

### Example JSON Paths

- `user.name` - Access user's name
- `user.address.city` - Access nested property
- `items[0].name` - Access first array item
- `items[1].price` - Access specific array index

## 🏗️ Project Structure

```
ApiWinz_Assignment/
└── json-tree-visualizer/
    ├── src/
    │   ├── components/
    │   │   ├── ErrorBoundary/       # Error handling component
    │   │   ├── JsonInput/           # JSON input textarea and validation
    │   │   └── JsonTreeVisualizer/  # Main visualization component
    │   │       ├── CustomNode.jsx   # Custom node rendering
    │   │       ├── JsonTreeVisualizer.jsx  # React Flow integration
    │   │       └── SearchBar.jsx    # Search functionality
    │   ├── pages/
    │   │   └── JsonInputPages.jsx   # Main page combining all components
    │   ├── utils/
    │   │   ├── JsonUtils.js         # JSON validation utilities
    │   │   └── generateNodesEdges.js # Helper functions
    │   ├── App.jsx                  # Root component
    │   └── main.jsx                 # Application entry point
    ├── public/                      # Static assets
    ├── package.json                 # Dependencies
    └── README.md                    # This file
```

## 🛠️ Technologies Used

- **React 19.2** - UI framework
- **React Flow 11.11** - Graph visualization library
- **Vite 7.1** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **DOM-to-Image** - PNG export functionality

## 🎨 Color Scheme

- **Objects**: Cyan/Teal (#2dd4bf)
- **Arrays**: Green (#10b981)
- **Primitives**: Orange/Amber (#f59e0b)
- **Root**: Purple (#8b5cf6)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Requirements Checklist

### Mandatory Features
- [x] JSON Input & Parsing
- [x] Tree Visualization using React Flow
- [x] Search Functionality
- [x] Different colors for different node types
- [x] Sample JSON placeholder
- [x] Error messages for invalid JSON
- [x] Highlight and pan to matched node
- [x] Match/No match messages

### Optional Features
- [x] Zoom controls (In/Out/Fit View)
- [x] Pan and drag functionality
- [x] Display node information on hover
- [x] Dark mode
- [x] PNG export
- [x] Mini map

## 📸 Screenshots

*Screenshots coming soon...*

## 🤝 Contributing

This is an assignment project. Contributions are welcome for learning purposes!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Ashutosh** - [GitHub](https://github.com/Ashutosh1702)

Created for APIWinz Assignment

---

**Made with ❤️ using React and React Flow**

