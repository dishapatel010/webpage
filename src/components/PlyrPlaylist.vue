<template>
  <div class="container" v-if="playlistLoaded">
    <vue-plyr ref="player" :options="options">
      <div
        class="js-player"
        :data-plyr-provider="nowPlaying.source.type"
        :data-plyr-embed-id="nowPlaying.source.src"
      ></div>
    </vue-plyr>

    <div class="plyr-playlist-wrapper">
      <ul class="plyr-playlist">
        <li
          @click="playVideo(index);"
          :class="
            nowPlaying.source.src === video.source.src ? 'pls-playing' : ''
          "
          v-for="(video, index) in playlist"
          :key="video.source.src"
        >
          <a
            href="#"
            :data-plyr-provider="video.source.type"
            :data-plyr-embed-id="video.source.src"
          >
            <img class="plyr-miniposter" :src="video.poster" />
            {{ video.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import VueScrollTo from "vue-scrollto";

export default {
  data() {
    return {
      options: {
        controls: `
        <div class="plyr__controls">
            <button type="button" class="plyr__control" data-plyr="prev">
                <i class="fa fa-step-backward fa-lg"></i>
                <span class="plyr__tooltip" role="tooltip">Next Playlist Item</span>
            </button>
            <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
                <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
                <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
                <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
                <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
            </button>
            <button type="button" class="plyr__control" data-plyr="next">
                <i class="fa fa-step-forward fa-lg"></i>
                <span class="plyr__tooltip" role="tooltip">Previous Playlist Item</span>
            </button>
            <div class="plyr__progress">
                <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
                <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
                <span role="tooltip" class="plyr__tooltip">00:00</span>
            </div>
            <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
            <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
            <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
                <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
                <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
                <span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
                <span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
            </button>
            <div class="plyr__volume">
                <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
            </div>
            <button type="button" class="plyr__control" data-plyr="captions">
                <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-captions-on"></use></svg>
                <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-captions-off"></use></svg>
                <span class="label--pressed plyr__tooltip" role="tooltip">Disable captions</span>
                <span class="label--not-pressed plyr__tooltip" role="tooltip">Enable captions</span>
            </button>
            <button type="button" class="plyr__control" data-plyr="fullscreen">
                <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
                <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
                <span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
                <span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
            </button>
        </div>        
        `
      },

      /* PLAYLIST  */
      playlistLoaded: false,
      nowPlaying: null,

      apikey: "", // <-- needed to retrieve real youtube playlists
      playlistLimit: 30,
      playlistId: "RDQMyFModNyxXx8",
      playlist: [
        {
          title: "Maroon 5 - Girls Like You ft. Cardi B",
          source: { src: "aJOTlE1K90k", type: "youtube" },
          poster: "https://i.ytimg.com/vi/aJOTlE1K90k/mqdefault.jpg"
        },
        {
          title: "Ed Sheeran - Perfect (Official Music Video)",
          source: { src: "2Vv-BfVoq4g", type: "youtube" },
          poster: "https://i.ytimg.com/vi/2Vv-BfVoq4g/mqdefault.jpg"
        },
        {
          title:
            "Bebe Rexha - Meant to Be (feat. Florida Georgia Line) [Official Music Video]",
          source: { src: "zDo0H8Fm7d0", type: "youtube" },
          poster: "https://i.ytimg.com/vi/zDo0H8Fm7d0/mqdefault.jpg"
        },
        {
          title: "Bazzi feat. Camila Cabello - Beautiful (Official Video)",
          source: { src: "Uk1hv6h7O1Y", type: "youtube" },
          poster: "https://i.ytimg.com/vi/Uk1hv6h7O1Y/mqdefault.jpg"
        },
        {
          title:
            "Silk City, Dua Lipa - Electricity (Official Video) ft. Diplo, Mark Ronson",
          source: { src: "Q4-jOuHO-z4", type: "youtube" },
          poster: "https://i.ytimg.com/vi/Q4-jOuHO-z4/mqdefault.jpg"
        },
        {
          title: "Dua Lipa - New Rules (Official Music Video)",
          source: { src: "k2qgadSvNyU", type: "youtube" },
          poster: "https://i.ytimg.com/vi/k2qgadSvNyU/mqdefault.jpg"
        },
        {
          title: "Calum Scott - You Are The Reason (Official)",
          source: { src: "ShZ978fBl6Y", type: "youtube" },
          poster: "https://i.ytimg.com/vi/ShZ978fBl6Y/mqdefault.jpg"
        },
        {
          title: 'Charlie Puth - "How Long" [Official Video]',
          source: { src: "CwfoyVa980U", type: "youtube" },
          poster: "https://i.ytimg.com/vi/CwfoyVa980U/mqdefault.jpg"
        },
        {
          title: "Selena Gomez, Marshmello - Wolves (Official Music Video)",
          source: { src: "cH4E_t3m3xM", type: "youtube" },
          poster: "https://i.ytimg.com/vi/cH4E_t3m3xM/mqdefault.jpg"
        },
        {
          title: "Imagine Dragons - Whatever It Takes (Official Music Video)",
          source: { src: "gOsM-DYAEhY", type: "youtube" },
          poster: "https://i.ytimg.com/vi/gOsM-DYAEhY/mqdefault.jpg"
        },
        {
          title: "Imagine Dragons - Thunder",
          source: { src: "fKopy74weus", type: "youtube" },
          poster: "https://i.ytimg.com/vi/fKopy74weus/mqdefault.jpg"
        },
        {
          title: "ZAYN - Dusk Till Dawn (Official Video) ft. Sia",
          source: { src: "tt2k8PGm-TI", type: "youtube" },
          poster: "https://i.ytimg.com/vi/tt2k8PGm-TI/mqdefault.jpg"
        },
        {
          title: "Clean Bandit - Symphony feat. Zara Larsson [Official Video]",
          source: { src: "aatr_2MstrI", type: "youtube" },
          poster: "https://i.ytimg.com/vi/aatr_2MstrI/mqdefault.jpg"
        },
        {
          title: "Luis Fonsi, Demi Lovato - Échame La Culpa (Video Oficial)",
          source: { src: "TyHvyGVs42U", type: "youtube" },
          poster: "https://i.ytimg.com/vi/TyHvyGVs42U/mqdefault.jpg"
        },
        {
          title: "Juice WRLD - Lucid Dreams (Dir. by @_ColeBennett_)",
          source: { src: "mzB1VGEGcSU", type: "youtube" },
          poster: "https://i.ytimg.com/vi/mzB1VGEGcSU/mqdefault.jpg"
        },
        {
          title: "Taylor Swift - Look What You Made Me Do",
          source: { src: "3tmd-ClpJxA", type: "youtube" },
          poster: "https://i.ytimg.com/vi/3tmd-ClpJxA/mqdefault.jpg"
        },
        {
          title: "Rita Ora - Anywhere (Official Video)",
          source: { src: "ksdAs4LBRq8", type: "youtube" },
          poster: "https://i.ytimg.com/vi/ksdAs4LBRq8/mqdefault.jpg"
        },
        {
          title: "Shawn Mendes - There's Nothing Holdin' Me Back",
          source: { src: "dT2owtxkU8k", type: "youtube" },
          poster: "https://i.ytimg.com/vi/dT2owtxkU8k/mqdefault.jpg"
        },
        {
          title: "Camila Cabello - Havana (Vertical Video) ft. Young Thug",
          source: { src: "pz95u3UVpaM", type: "youtube" },
          poster: "https://i.ytimg.com/vi/pz95u3UVpaM/mqdefault.jpg"
        },
        {
          title: "Bryce Vine - Drew Barrymore [Official Music Video]",
          source: { src: "kudi8OtMu9s", type: "youtube" },
          poster: "https://i.ytimg.com/vi/kudi8OtMu9s/mqdefault.jpg"
        },
        {
          title: "Dynoro, Gigi D'Agostino - In My Mind (Official Audio)",
          source: { src: "q0pdLCQy8l8", type: "youtube" },
          poster: "https://i.ytimg.com/vi/q0pdLCQy8l8/mqdefault.jpg"
        },
        {
          title:
            "Luis Fonsi - Despacito ft. Daddy Yankee (Official Music Video)",
          source: { src: "kJQP7kiw5Fk", type: "youtube" },
          poster: "https://i.ytimg.com/vi/kJQP7kiw5Fk/mqdefault.jpg"
        },
        {
          title:
            "Katy Perry - Chained To The Rhythm (Official) ft. Skip Marley",
          source: { src: "Um7pMggPnug", type: "youtube" },
          poster: "https://i.ytimg.com/vi/Um7pMggPnug/mqdefault.jpg"
        },
        {
          title: "Kygo, Selena Gomez - It Ain't Me",
          source: { src: "u3VTKvdAuIY", type: "youtube" },
          poster: "https://i.ytimg.com/vi/u3VTKvdAuIY/mqdefault.jpg"
        },
        {
          title: "Charlie Puth - Attention [Official Video]",
          source: { src: "nfs8NYg7yQM", type: "youtube" },
          poster: "https://i.ytimg.com/vi/nfs8NYg7yQM/mqdefault.jpg"
        },
        {
          title: "Kygo, Miguel - Remind Me to Forget",
          source: { src: "FRjOSmc01-M", type: "youtube" },
          poster: "https://i.ytimg.com/vi/FRjOSmc01-M/mqdefault.jpg"
        }
      ]
    };
  },

  computed: {
    player() {
      return this.$refs.player.player;
    }
  },

  methods: {
    initPlaylist() {
      // you must add your youtube api key to the data above before setting this to true
      const useYoutubeApi = false;

      if (useYoutubeApi) {
        this.getTYPlaylist(this.playlistId, this.apikey, this.playlistLimit);
      } else {
        this.playlistLoaded = true;
      }
    },

    getTYPlaylist(playlistId, apikey, limit) {
      const self = this;
      const url = `https://content.googleapis.com/youtube/v3/playlistItems?key=${apikey}&maxResults=${limit}&part=id,snippet&playlistId=${playlistId}&type=video`;
      $.ajax({
        url,
        dataType: "jsonp",
        success(data) {
          self.playlist = self.youtubeParser(data);
          self.playlistLoaded = true;
        },
        error(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, +" | " + errorThrown);
        }
      });
    },

    youtubeParser(data) {
      const newData = data.items.map(item => {
        let thumb;

        if (item.snippet.thumbnails) {
          // console.log('thumbnails', item.snippet.thumbnails);
          // if (item.snippet.thumbnails.maxres) {
          //   thumb = item.snippet.thumbnails.maxres.url;
          // } else if (item.snippet.thumbnails.standard) {
          //   thumb = item.snippet.thumbnails.standard.url;
          // } else if (item.snippet.thumbnails.high) {
          //   thumb = item.snippet.thumbnails.high.url;
          // } else

          if (item.snippet.thumbnails.medium) {
            thumb = item.snippet.thumbnails.medium.url;
          } else if (item.snippet.thumbnails.default) {
            thumb = item.snippet.thumbnails.default.url;
          }
        }

        return {
          title: item.snippet.title,
          description: item.snippet.description,
          author: item.snippet.channelTitle,
          source: {
            src: item.snippet.resourceId.videoId,
            type: item.kind.split("#")[0]
          },
          poster: thumb
        };
      });

      return newData;
    },

    setupPlaylistListeners() {
      $("body").off("click", '.plyr__controls [data-plyr="prev"]');
      $("body").off("click", '.plyr__controls [data-plyr="next"]');

      $("body")
        .on("click", '.plyr__controls [data-plyr="prev"]', () => {
          if (this.playlistIndex > 0) {
            this.playlistIndex -= 1;
            this.playVideo(this.playlistIndex);
          }
        })
        .on("click", '.plyr__controls [data-plyr="next"]', () => {
          if (this.playlistIndex < this.playlist.length - 1) {
            this.playlistIndex += 1;
            this.playVideo(this.playlistIndex);
          }
        });
    },

    playVideo(index) {
      this.playlistIndex = index;
      this.nowPlaying = this.playlist[index];

      const newSource = {
        type: "video",
        sources: [
          {
            src: this.nowPlaying.source.src,
            provider: this.nowPlaying.source.type
          }
        ]
      };

      this.player.source = newSource;

      setTimeout(() => {
        VueScrollTo.scrollTo(".pls-playing", {
          duration: 300,
          container: ".plyr-playlist"
        });
      }, 500);
    }
  },

  watch: {
    playlistLoaded() {
      if (this.playlistLoaded) {
        // load first video from playlist
        this.playlistIndex = 0;
        this.nowPlaying = this.playlist[this.playlistIndex];

        this.$nextTick(() => {
          this.player.on("ready", () => {
            this.setupPlaylistListeners();
          });
        });
      }
    }
  },

  mounted() {
    this.initPlaylist();
  }
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 2rem auto;
}

/* Playlist  */
/* scrollbar rules have to be separate, browsers not supporting this syntax will skip them when combined. */
.plyr-playlist-wrapper ul::-webkit-scrollbar {
  width: 6px;
}

.plyr-playlist-wrapper ul::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
}

.plyr-playlist-wrapper ul::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  /*  background: #fff; */
  background: #3498db;
}
.plyr-playlist-wrapper {
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  padding: 0.5em 0.5em 0.5em 0.25em;
}
.plyr-playlist-wrapper .plyr-playlist {
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
  margin-top: 0;
  padding: 6px 4px;
  width: 100%;
  box-sizing: border-box;
  -moz-box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 8px 0px inset;
  -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 8px 0px inset;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 8px 0px inset;
}

.plyr-playlist-wrapper ul {
  padding: 0;
  margin: 0;
  max-height: 12em;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.plyr-playlist-wrapper ul li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.plyr-playlist-wrapper .plyr-playlist li {
  list-style: none;
  background-color: rgba(255, 255, 255, 0.03);
  padding: 0px;
  margin-bottom: 3px;
  font-size: 90%;
}

.plyr-playlist-wrapper .plyr-playlist li.pls-playing,
.plyr-playlist-wrapper .plyr-playlist li:hover {
  color: #3498db;
  background-color: rgba(255, 255, 255, 0.09);
}
.plyr-playlist-wrapper .plyr-playlist li.pls-playing a {
  color: #3498db;
}

.plyr-playlist-wrapper .plyr-playlist li a {
  text-decoration: none;
  font-family: arial;
  color: #c9c9c9;
  display: block;
  padding: 10px 0;
  outline: none;
  padding: 0.5em 0.25em 0.5em 0.75em;
  font-size: 90%;
  vertical-align: middle;
  padding-bottom: 10px;
}

.plyr-playlist-wrapper .plyr-playlist li:last-child a {
  border-bottom: 0;
}

.plyr-playlist li a:hover,
.plyr-playlist li a:focus,
.plyr-playlist li a:active {
  color: #04a9f3;
}

.plyr-miniposter {
  width: auto;
  height: 22px;
  -webkit-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  float: left;
  margin-right: 10px;
  border-radius: 0;
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
}

/* YOUTUBE HIDE BLACK BARS https://stackoverflow.com/a/33604743/211324 */
/* https://jsfiddle.net/onigetoc/nomzb6hf/ */
</style>
