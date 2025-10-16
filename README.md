# Gym Coach Dark Theme

## Overview
This project is a dark-themed website for a gym coaching service. It utilizes modern web technologies including Tailwind CSS for styling, GSAP for animations, and Google Fonts for typography.

## Project Structure
```
gym-coach-dark-theme
├── public
│   └── index.html          # Main HTML document
├── src
│   ├── styles
│   │   ├── variables.css   # CSS variables for dark theme
│   │   └── main.css        # Main CSS file with Tailwind and custom styles
│   ├── scripts
│   │   └── main.js         # JavaScript file for interactivity and animations
│   └── assets              # Directory for images, fonts, and other static assets
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json            # npm configuration and dependencies
├── postcss.config.js       # PostCSS configuration
└── README.md               # Project documentation
```

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd gym-coach-dark-theme
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Build the project:**
   To build the CSS and prepare the project for development, run:
   ```bash
   npm run build
   ```

4. **Start the development server:**
   To start a local development server, run:
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` (or the specified port) to view the website.

## Usage
- Customize the styles in `src/styles/variables.css` to adjust the dark theme colors and fonts.
- Add any interactive features or animations in `src/scripts/main.js`.
- Use the `public/index.html` file as the main entry point for your web application.

## Contributing
Feel free to submit issues or pull requests if you have suggestions or improvements for the project. 

## License
This project is licensed under the MIT License.