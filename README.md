# Timed Typing Test App

This project is a timed typing test built with HTML, CSS, and JavaScript.

## What I implemented

- Standard timer in `mm:ss:hh` format
- Real-time border feedback
  - Grey = not started / reset
  - Blue = matching correctly so far
  - Orange = mismatch
  - Green = completed
- Live WPM calculation
- Live error counter
- Top 3 score persistence in `localStorage` (using WPM as score, tracked per difficulty)

### Extra Features
- Input lock after completion until **Start over** is pressed
- Anti-cheat behavior:
  - Pasting into the typing area is blocked
  - If paste is attempted, the app shows **"Cheater! Pasting is disabled for this test."**
  - Disqualified runs are not saved to the top scores list
- Dark Theme Toggle
- Difficulty selector with separate random text pools:
  - Easy
  - Medium
  - Hard
