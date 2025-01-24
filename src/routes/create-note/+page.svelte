<script lang="ts">
  import { 
    notes,
    checkedMode 
  } from '$lib/stores/_store';


  let rawNotes: HTMLDivElement | null = null;
  let savedSelection: Range | null = null;

  function checkIfEmpty(event: Event, lineNum: number) {
    const target = event.target as HTMLInputElement;
    if (target) {
      const lineText = target.value;
      if (lineText === '' && lineNum) {

      }
    }
  }

  function recalculateLines(event: Event) {
    const target = event.target as HTMLDivElement;
    if (target && target.parentElement) {
      const newNotes = target.parentElement.innerText.split("\n").map((text, i) => ({
        text,
        checkbox: {
          isCheckbox: $notes[i]?.checkbox.isCheckbox,
          isChecked: $notes[i]?.checkbox.isChecked
        }
      }));
      notes.set(newNotes);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'Enter') {
      event.preventDefault();
      const line = getCurrentCursorPosition();
      console.log(line);
    }
  }

  function saveSelection() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelection = selection.getRangeAt(0).cloneRange();
    }
  }

  function getCurrentCursorPosition() {
    if (rawNotes) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0).cloneRange();

        // Create a temporary span element to mark the caret's position
        const tempSpan = document.createElement("span");
        tempSpan.textContent = "\u200b"; // Zero-width space
        range.insertNode(tempSpan);

        const caretRect = tempSpan.getBoundingClientRect();
        const containerRect = rawNotes.getBoundingClientRect();

        // Remove the temporary span
        tempSpan.parentNode?.removeChild(tempSpan);

        // Calculate line height (fallback to a default if not computable)
        const lineHeight = parseFloat(getComputedStyle(rawNotes).lineHeight) || 16;

        // Calculate the line number based on the marker's position
        const relativeCaretTop = caretRect.top - containerRect.top;
        const lineNumber = Math.floor(relativeCaretTop / lineHeight) + 1;
        console.log("Line Number:", lineNumber);
        return lineNumber;
      }
    }
    return 0;
  }

  function toggleCheckedMode() {
    const lineNumber = getCurrentCursorPosition();
    notes.update(currentNotes => {
      currentNotes[lineNumber - 1].checkbox.isCheckbox = !currentNotes[lineNumber - 1].checkbox.isCheckbox;
      return currentNotes;
    })
  }

</script>

<div class='header'>
  <div class='title-input'>
    <input class='title' type='text' placeholder='Title...'>
  </div>
  <div class='return-button'>
    <a href='/' aria-label='return home'><i class="fa-solid fa-house fa-2x"></i></a>
  </div>
</div>
<div class='note-taking-area'>
  <div class='note-header'>
    <div class='subtitle-input'>
      <input type='text' class='subtitle' placeholder='Subtitle...'>
    </div>
    <button on:click={getCurrentCursorPosition}>C</button>
    <button on:click={toggleCheckedMode}>L</button>
  </div>
  <div
    bind:this={rawNotes}
    class='user-notes'
    contenteditable="false"
  >
    {#each $notes as note}
      <div class="line-wrapper">
        {#if note.checkbox.isCheckbox}
          <button class="line-button" contenteditable="false">o</button>
        {/if}
        <span class="line-content" contenteditable="true" on:input={recalculateLines} on:keydown={handleKeyDown}></span>
      </div>
    {/each}
  </div>
</div>

<style>
  .header {
    height: 7vh;
    background-color: gray;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 25px;
  }

  .title-input {
    height: 100%;
  }

  .subtitle-input {
    border: 1px solid gray;
    width: 50%;
    margin: 5px;
    padding: 10px;
    padding-right: 50px;
    border-radius: 5px;
  }

  .title, .subtitle {
    height: 90%;
    padding: 0;
    margin: 0;
    border: none;
    font-size: 1.2rem;
  }

  .user-notes {
    width: 96%;
    height: 65vh;
    font-size: 1.1rem;
    padding: 5px;
    display: block;
  }

  .user-notes:focus {
    outline: none;
  }

  .line-wrapper {
    align-items: center;
  }

  .line-button {
    display: inline;
    margin-right: 8px; /* Space between the button and the text */
    cursor: pointer;
  }

  .line-content {
    width: 100%;
    outline: none;
    flex-grow: 1;
    white-space: pre-wrap; /* Ensures text wraps correctly for multi-line entries */
  }
    
</style>