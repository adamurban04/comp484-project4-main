## Presentation

### 1) Completion Trigger

The timer stops only when:

`typedText === originText`

I made this strict on purpose so the test measures exact accuracy, not just speed.

- If the user only matches the first part of the sentence, the timer keeps running.
- If the user has the same number of characters but even one wrong character, the timer keeps running.
- The clock only stops when every character is correct and in the correct order.

Before completion, I use substring matching (`originText.substring(0, typedText.length)`) to decide blue vs orange border in real time. That gives immediate feedback while typing, but completion still requires the full exact match above.

### 2) Event Listener Strategy

I used the `input` event as the primary listener because this app depends on the **actual value inside the textarea**, not just which key was pressed.

`input` is the most reliable choice here because it fires when the text value changes, including:

- normal typing
- backspace/delete edits
- other direct text edits

Why not only `keydown`/`keyup`:

- `keydown` happens before the textarea value is updated.
- Key-based listeners focus on keyboard actions, while this project logic is value-based (timer start, spell check, border state, WPM updates).

Using `input` keeps all these features synced to the real text state on every edit.
