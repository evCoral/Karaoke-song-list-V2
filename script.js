
    //get all songs from localStorage
    window.onload = loadSongs;

    // add song
    document.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      addSong();
    });

    function loadSongs() {

      if (localStorage.getItem("songs") == null) return;

      let songs = Array.from(JSON.parse(localStorage.getItem("songs")));

      songs.forEach(song => {
        const list = document.querySelector("ul");
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" onclick="songComplete(this)" class="check" ${song.completed ? 'checked' : ''}>
          <input type="text" value="${song.song}" class="song ${song.completed ? 'completed' : ''}" onfocus="getCurrentSong(this)" onblur="editSong(this)">
          <i class="fa fa-trash" onclick="removeSong(this)"></i>`;
        list.insertBefore(li, list.children[0]);
      });
    }

    function addSong() {
      const song = document.querySelector("form input");
      const list = document.querySelector("ul");
      // return if song is empty
      if (song.value === "") {
        alert("Please add some song!");
        return false;
      }
      // check is song already exist
      if (document.querySelector(`input[value="${song.value}"]`)) {
        alert("Song already exist!");
        return false;
      }

      // add song to local storage
      localStorage.setItem("songs", JSON.stringify([...JSON.parse(localStorage.getItem("songs") || "[]"), { song: song.value, completed: false }]));

      // create list item, add innerHTML and append to ul
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" onclick="songComplete(this)" class="check">
      <input type="text" value="${song.value}" class="song" onfocus="getCurrentSong(this)" onblur="editSong(this)">
      <i class="fa fa-trash" onclick="removeSong(this)"></i>`;
      list.insertBefore(li, list.children[0]);
      song.value = "";
    }

    function songComplete(event) {
      let songs = Array.from(JSON.parse(localStorage.getItem("songs")));
      songs.forEach(song => {
        if (song.song === event.nextElementSibling.value) {
          song.completed = !song.completed;
        }
      });
      localStorage.setItem("songs", JSON.stringify(songs));
      event.nextElementSibling.classList.toggle("completed");
    }

    function removeSong(event) {
      let songs = Array.from(JSON.parse(localStorage.getItem("songs")));
      songs.forEach(song => {
        if (song.song === event.parentNode.children[1].value) {
          // delete song
          songs.splice(songs.indexOf(song), 1);
        }
      });
      localStorage.setItem("songs", JSON.stringify(songs));
      event.parentElement.remove();
    }

    var currentSong = null;

    function getCurrentSong(event) {
      currentSong = event.value;
    }

    function editSong(event) {
      let songs = Array.from(JSON.parse(localStorage.getItem("songs")));
      // check if song is empty
      if (event.value === "") {
        alert("Song is empty!");
        event.value = currentSong;
        return;
      }
      // song already exist
      songs.forEach(song => {
        if (song.song === event.value) {
          alert("Song already exist!");
          event.value = currentSong;
          return;
        }
      });
      // update song
      songs.forEach(song => {
        if (song.song === currentSong) {
          song.song = event.value;
        }
      });
      // update local storage
      localStorage.setItem("songs", JSON.stringify(songs));
    }