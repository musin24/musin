// Song data array: name, file path, and language
const songs = {
  english: [
      { name: "Believer", path: "songs/english/song1.mp3" },
      { name: "Cheri Cheri Lady", path: "songs/english/song2.mp3" },
      { name: "Shape Of You", path: "songs/english/song3.mp3" },
      { name: "Cheap Thrills", path: "songs/english/song4.mp3" },
      { name: "Unstoppable", path: "songs/english/song5.mp3" },
      { name: "Bones", path: "songs/english/song6.mp3" },
      { name: "Dandelions", path: "songs/english/song7.mp3" },
      { name: "Love Nwantiti", path: "songs/english/song8.mp3" },
      { name: "Jalebi Baby", path: "songs/english/song9.mp3" },
      { name: "Fairytale", path: "songs/english/song10.mp3" },
      { name: "Alan Walker - Faded", path: "songs/english/song11.mp3" },
      { name: "Hey ladies drop it down", path: "songs/english/song12.mp3" },
      { name: "Die With A Smile", path: "songs/english/song13.mp3" },
  ],
 
  hindi: [
      { name: "Maahi", path: "songs/hindi/song1.mp3" },
      { name: "Kusu Kusu", path: "songs/hindi/song2.mp3" },
      { name: "Gulabi ", path: "songs/hindi/song3.mp3"},
      { name: "Jamal Kudu ", path: "songs/hindi/song4.mp3" },
      { name: "Aaj Ki Raat", path: "songs/hindi/song5.mp3" },
      { name: "Ami Je Tomar 3.0", path: "songs/hindi/song6.mp3" },
      { name: "Saami Saam", path: "songs/hindi/song7.mp3" },
      { name: "Chuttamalle", path: "songs/hindi/song8.mp3" },
      { name: "Dil Diyan Gallan", path: "songs/hindi/song9.mp3" },
      { name: "Dheere Dheere Se Meri Zindagi", path: "songs/hindi/song10.mp3" },
      { name: "Saari Duniya Jalaa Denge", path: "songs/hindi/song11.mp3" },
      { name: "Not Ramaiya Vastavaiya", path: "songs/hindi/song12.mp3" },
      { name: "SATRANGA", path: "songs/hindi/song13.mp3" },
      { name: "Gali Gali", path: "songs/hindi/song14.mp3" },
      { name: "JO TUM MERE HO ", path: "songs/hindi/song15.mp3" },
      { name: "ISHQ", path: "songs/hindi/song16.mp3" },
      { name: "Kesariya", path: "songs/hindi/song17.mp3" },
      { name: "Bulleya", path: "songs/hindi/song18.mp3" },
      { name: "Kya Mujhe Pyar", path: "songs/hindi/song19.mp3" },
      
  ]
};

let currentSong = null;
let isPlaying = false;
let audio = new Audio();
let songDuration = 0;
let seekBar = document.getElementById('seek-bar');
let currentLanguage = 'english'; // Default language
let currentIndex = 0; // Track the current song index

// Function to generate songs based on selected language
function generateSongs(language, searchQuery = '') {
  const songContainer = document.getElementById('song-container');
  songContainer.innerHTML = ''; // Clear the existing songs

  const filteredSongs = songs[language].filter(song => 
      song.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  filteredSongs.forEach((song, index) => {
      const songDiv = document.createElement('div');
      songDiv.classList.add('song-item');
      
      const songTitle = document.createElement('p');
      songTitle.textContent = song.name;

      const playButton = document.createElement('button');
      playButton.textContent = 'Play';
      playButton.setAttribute('onclick', `playSong(${index}, '${language}')`);

      songDiv.appendChild(songTitle);
      songDiv.appendChild(playButton);
      songContainer.appendChild(songDiv);
  });
}

// Function to close the music player
function closePlayer() {
  document.getElementById("music-player").style.display = "none";
  audio.pause();
  isPlaying = false;
  document.getElementById("play-pause-button").innerHTML = "&#9658;";
}

// Function to play the selected song
function playSong(index, language) {
    const song = songs[language][index];

    if (currentSong !== song.path) {
        currentSong = song.path;
        currentIndex = index; // Update the current index
        currentLanguage = language; // Update the current language
        audio.src = song.path;
        audio.play();
        isPlaying = true;

        // Show the music player and update song details
        document.getElementById("music-player").style.display = "block";
        document.getElementById("song-title").textContent = song.name;

        // Set the total duration
        audio.onloadedmetadata = function() {
            songDuration = audio.duration;
            updateDuration();
        };

        // Update the seek bar as the song plays
        audio.ontimeupdate = function() {
            seekBar.value = (audio.currentTime / songDuration) * 100;
            updateDuration();
        };

        // Automatically play the next song when the current song ends
        audio.onended = function() {
            playNextSong();
        };
    } else {
        togglePlay();
    }
}

// Function to play the next song in the playlist
function playNextSong() {
    currentIndex++;
    if (currentIndex >= songs[currentLanguage].length) {
        currentIndex = 0; // Loop back to the first song
    }
    playSong(currentIndex, currentLanguage);
}

// Toggle play/pause
function togglePlay() {
  if (isPlaying) {
      audio.pause();
      isPlaying = false;
      document.getElementById("play-pause-button").innerHTML = "&#9658;";
  } else {
      audio.play();
      isPlaying = true;
      document.getElementById("play-pause-button").innerHTML = "&#10074;&#10074;";
  }
}

// Seek the song based on the seek bar
function seekSong() {
  let seekTo = (seekBar.value / 100) * songDuration;
  audio.currentTime = seekTo;
}

// Update the song duration and current time
function updateDuration() {
  let currentTime = formatTime(audio.currentTime);
  let totalTime = formatTime(songDuration);
  document.getElementById('song-duration').textContent = `${currentTime} / ${totalTime}`;
}

// Format time (convert seconds to mm:ss format)
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}

// Function to change audio source (beginning or current position)
function changeSource() {
  let sourceOption = document.getElementById("audio-source").value;
  if (sourceOption === "default") {
      audio.currentTime = 0;
  }
}

// Show songs based on selected language tab
function showSongs(language) {
    currentLanguage = language; // Update the current language
    currentIndex = 0; // Reset the song index when switching languages
    generateSongs(language);

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Add active class to the selected tab
    document.querySelector(`.tab-button[onclick="showSongs('${language}')"]`).classList.add('active');
}

// Search songs as the user types
function searchSongs() {
  const searchInput = document.getElementById('search-input').value;
  const activeTab = document.querySelector('.tab-button.active');
  const activeLanguage = activeTab ? activeTab.innerText.toLowerCase() : 'english'; // Default to English

  generateSongs(activeLanguage, searchInput);
}



// Initialize with English songs
showSongs('english');  

// Logout function
function logout() {
  // Here you can clear any session or token related to login
  alert("Logged out successfully!");
  
  // Remove the user session from sessionStorage
  sessionStorage.removeItem('userLoggedIn');
  
  // Redirect to the login page (or home page)
  window.location.href = "signin.html"; 
}

// Check if the user is logged in before allowing access to the main page
window.onload = function() {
  // Check sessionStorage for the user's login state
  if (!sessionStorage.getItem('userLoggedIn')) {
    // If no user is logged in, redirect to the login page
    window.location.href = 'signin.html';
  } else {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        try {
          // Check if the user still exists in Firebase
          const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();
          
          if (userDoc.exists) {
            // User exists, allow access
            sessionStorage.setItem('userLoggedIn', true);
          } else {
            // User does not exist in Firebase, log them out
            firebase.auth().signOut();
            sessionStorage.removeItem('userLoggedIn');
            alert("Your account has been removed. Please sign up again.");
            window.location.href = 'signin.html';
          }
        } catch (error) {
          console.error("Error checking user existence:", error);
          alert("An error occurred. Please try again later.");
        }
      } else {
        // No user is signed in, redirect to login
        sessionStorage.removeItem('userLoggedIn');
        window.location.href = 'signin.html';
      }
    });
  }
};
