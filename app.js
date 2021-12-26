
// async await methods
// const searchSongs =async () => {
//     const searchText = document.getElementById("search-input").value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//      const res = await fetch(url)
//      const data = await res.json();
//     displaySongs(data.data);
// }
const searchSongs = () => {
    const searchText = document.getElementById("search-input").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySongs(data.data))
    .catch(error => displayError('Cant find the item,please try later again'));
}

const displaySongs = songs => {
    const container = document.getElementById("container");
    container.innerHTML = ``;
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
        </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
        <button onclick ="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>

        `;
        container.appendChild(songDiv);
    });
}

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayLyric(data.lyrics);
    } catch (error) {
        displayError('Something Wrong please try later again')
    }
}

const displayLyric = lyrics => {
    const lyricDiv = document.getElementById("lyrics");
    lyricDiv.innerText = lyrics;
}

const displayError = error =>{
    const errorDiv = document.getElementById("error-text");
    errorDiv.innerText = error;
}