import { writable } from "svelte/store";
import type { Note } from "$lib/types/_types";

export let notes = writable<Note[]>([
  {
    text: '',
    checkbox: {
      isCheckbox: false,
      isChecked: false
    }
  }
]);

export let checkedMode = writable<boolean>(false);