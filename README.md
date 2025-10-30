# JSON Tree Visualizer 🌳

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Hey there! 👋 I built this JSON Tree Visualizer to make working with complex JSON data less of a headache. It transforms those hard-to-read JSON blobs into a clean, interactive tree that you can actually understand at a glance. Perfect for developers, testers, or anyone who works with JSON data regularly.

## ✨ What's Inside

I've packed this tool with features that I found myself wishing for when working with JSON:

- **Interactive Flow Diagrams** - Built with React Flow for beautiful, interactive node-based visualizations
- **Type or paste JSON** - It updates in real-time as you work
- **Drag & Drop Interface** - Easily rearrange nodes to better understand your data structure
- **Interactive tree** - Expand and collapse nodes to focus on what matters
- **Clean syntax highlighting** - Because nobody likes squinting at plain text
- **Works everywhere** - Desktop, tablet, or phone - it just works
- **One-click copy** - Grab the formatted JSON with a single click
- **Helpful error messages** - No more guessing what went wrong with your JSON

## 🚀 Quick Start

Let's get you up and running:

### What You'll Need
- Node.js (I'm using v14, but anything recent should work)
- npm or Yarn (whichever you prefer)

### Let's Get Started

1. **Grab the code**
   ```bash
   git clone https://github.com/Ashutosh1702/ApiWinz_Assignment.git
   cd ApiWinz_Assignment/json-tree-visualizer
   ```

2. **Install the good stuff**
   ```bash
   npm install
   

3. **Fire it up!**
   
   npm run dev


4. **Check it out**
   Open [http://localhost:5173/](http://localhost:5173/) in your favorite browser

## 🏗️ Project Structure

```
json-tree-visualizer/
├── public/                 # Static files
│   ├── index.html          # Main HTML file
│   └── ...
├── src/
│   ├── assets/            # Images, icons, and other static assets
│   ├── components/        # Reusable React components
│   │   ├── Flow/         # React Flow diagram components
│   │   ├── JsonInput/    # JSON input component
│   │   ├── JsonTree/     # JSON tree visualization component
│   │   └── ...
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── styles/            # Global styles and Tailwind configuration
│   ├── utils/             # Utility functions and helpers
│   ├── App.jsx            # Main application component
│   └── index.jsx          # Application entry point
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## 📝 Usage

1. **Input JSON Data**
   - Paste your JSON directly into the input area
   - Or type it manually with syntax highlighting support

2. **Visualize**
   - Click the "Generate Tree" button to visualize your JSON
   - The tree will automatically render in the visualization panel

3. **Interact with the Tree**
   - Click on the arrow icons to expand/collapse nodes
   - Hover over nodes to see additional actions
   - Use the search functionality to find specific keys or values

4. **Copy JSON**
   - Click the copy icon to copy the JSON to your clipboard

## 🤝 Want to Help?

I'd love your help making this even better! Here's how you can contribute:

1. Fork this repo (you know the drill)
2. Create a feature branch (`git checkout -b your-awesome-feature`)
3. Make your changes (and don't forget to test them!)
4. Commit with a clear message (we all love good commit messages)
5. Push to your fork and open a PR


## 🙏 Shoutouts

Huge thanks to these amazing projects that made this possible:

- [React](https://reactjs.org/) - For making frontend development actually enjoyable
- [React Flow](https://reactflow.dev/) - For the amazing flow diagram functionality
- [Tailwind CSS](https://tailwindcss.com/) - Because writing CSS should be fun
- The open-source community - For all the packages and knowledge shared

---
