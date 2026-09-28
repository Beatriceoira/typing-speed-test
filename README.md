# Typing Speed Test

A lightweight typing speed test built from scratch using **HTML, CSS, and vanilla JavaScript**.

The application generates random text, tracks typing time, calculates words per minute (WPM), measures typing accuracy, highlights correct and incorrect characters, and displays progress in real time.

## Features

* Random text generation
* Real-time typing test
* Automatic timer
* Words Per Minute (WPM) calculation
* Typing accuracy calculation
* Correct character highlighting
* Incorrect character highlighting
* Current character indicator
* Real-time progress bar
* Automatic test completion
* Restart/New Test functionality
* Responsive interface
* No frameworks or external libraries

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* DOM API
* Browser `Date` API
* JavaScript string manipulation

## Project Structure

```text
typing-speed-test/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## How It Works

### 1. Random Text Generation

The application stores several sample passages in an array.

When a new test starts, JavaScript randomly selects one:

```javascript
const randomIndex =
    Math.floor(Math.random() * texts.length);

currentText = texts[randomIndex];
```

The selected text is then displayed character by character.

### 2. Typing Timer

The timer starts automatically when the user enters their first character.

The application records the starting timestamp:

```javascript
startTime = Date.now();
```

It then repeatedly updates the elapsed time:

```javascript
setInterval(updateStats, 100);
```

The timer stops when the user finishes typing the generated text.

### 3. WPM Calculation

The project uses the standard typing-test convention of:

```text
5 characters = 1 word
```

The calculation is:

```text
WPM = (typed characters / 5) / elapsed minutes
```

For example:

```text
300 characters
300 / 5 = 60 words
60 words / 1 minute = 60 WPM
```

### 4. Accuracy Calculation

Each typed character is compared against the corresponding character in the target text.

```javascript
if (typedText[i] === currentText[i]) {
    correctCharacters++;
}
```

Accuracy is calculated using:

```text
Accuracy =
(correct characters / total typed characters) × 100
```

### 5. Character Highlighting

Characters are dynamically assigned CSS classes based on whether they were typed correctly.

Correct:

```text
correct
```

Incorrect:

```text
incorrect
```

The next character to type is marked:

```text
current
```

This provides immediate visual feedback while typing.

### 6. Progress Tracking

The progress bar represents how much of the generated text has been typed.

```text
Progress =
(typed characters / total characters) × 100
```

The value is updated every time the user enters a character.

## Running the Project

No installation or build process is required.

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/typing-speed-test.git
```

Enter the project directory:

```bash
cd typing-speed-test
```
Because this is a static web application, you don't need Node.js or any additional dependencies.

For a reliable local development environment, start Python's built-in HTTP server:

python3 -m http.server 8000

Then open:

http://localhost:8000

### Alternative:

Open:

```text
index.html
```

in a web browser.

You can also use VS Code's **Live Server** extension for local development.

## Usage

1. Open the application.
2. A random passage will appear.
3. Click inside the typing area.
4. Begin typing the displayed text.
5. The timer starts automatically.
6. WPM and accuracy update in real time.
7. Correct and incorrect characters are highlighted.
8. The test ends when the entire passage has been typed.
9. Click **New Test** to start again.

## Example

During a test, the interface might display:

```text
Time       WPM       Accuracy
12.4s      67        94%
```

The text itself provides visual feedback:

```text
The quick brown fox
^^^ ^^^^^
```

Correct characters and incorrect characters are visually distinguished through CSS.

## Learning Objectives

This project demonstrates several fundamental JavaScript concepts:

* Variables and state
* Arrays
* Functions
* Random number generation
* String manipulation
* Loops
* Conditional statements
* DOM manipulation
* Event listeners
* Timers
* Date/time calculations
* Real-time UI updates
* Basic application state management

## Possible Improvements

Future versions could include:

* 15-second mode
* 30-second mode
* 60-second mode
* Difficulty levels
* Random word generation
* Custom text mode
* Characters Per Minute (CPM)
* Error count
* Backspace statistics
* Best WPM tracking
* Typing history
* `localStorage` support
* Dark mode
* Pause/resume functionality
* Keyboard heatmap
* Leaderboard
* Mobile keyboard support
* User accounts and online statistics

## License

This project is available for educational and personal use.
