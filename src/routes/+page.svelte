<script lang="ts">

</script>

<div>
  <div class='home-layout'>
    <h1>Note Taking</h1>
      <a href='/create-note' class='new-note'>
        <div class='inside-link'>
          <i class="fa-regular fa-clipboard fa-3x" aria-hidden="true"></i>
          <h2>Create Note</h2>
        </div>
      </a>
    <div class='search-notes-input'>
      <input type='text' placeholder='Search notes...'>
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  </div>
</div>

<style>
  .home-layout {
    width: 100vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  h2 {
    font-size: 2rem;
  }

  .new-note {
    background-color: rgb(146, 146, 146);
    color: white;
    width: 80%;
    height: 20vh;
    border-radius: 10px;
  }

  .search-notes-input {
    height: 7vh;
    width: 80%;
    margin: 10px;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 1px;
    box-shadow: 2px 2px 8px rgb(146, 129, 143);
  }

  input {
    width: 80%;
    height: 100%;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
  }

  a {
    box-shadow: 2px 2px 8px rgb(146, 129, 143);
    border: none;
    color: white;
  }

  .inside-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
  }
</style>
