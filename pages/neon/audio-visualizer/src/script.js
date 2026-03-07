const { cos, sin, PI, min, max, floor, random } = Math;
const { clamp } = THREE.Math;
const simplex = new SimplexNoise();

/**
 * Audio Vis
 */
function AudioVis(conf) {
  conf = {
    el: 'canvas',
    fov: 75,
    cameraZ: 130,
    background: 0x000000,
    fftSize: 32,
    fftIgnore: 3,
    torusRadius: 6,
    ...conf,
  };
  const fftDSize = conf.fftSize / 2;
  const numTorus = fftDSize - conf.fftIgnore;

  let renderer, scene, camera, cameraCtrl;
  let width, height, cx, cy;

  let cscale;
  let trings;
  let composer;

  let analyser;
  let aFrequencies = [], aFAvg = 0, aFMax = 0;
  let frequencies, fAvg = 0;

  init();

  function init() {
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(conf.el) });
    camera = new THREE.PerspectiveCamera(conf.fov);
    camera.position.z = conf.cameraZ;

    updateSize();
    window.addEventListener('resize', updateSize, false);

    initScene();
    initPostProcessing();
    animate();
  }

  function initScene() {
    scene = new THREE.Scene();
    if (conf.background) scene.background = new THREE.Color(conf.background);
    scene.add(new THREE.AmbientLight(0xcccccc));

    // cscale = chroma.scale([0x0, 0x4040ff, 0xff4040, 0xffffff]);
    cscale = chroma.scale([0x0, 0x00b9e0, 0xff880a, 0x5f1b90, 0x7ec08d]);
    trings = createTRings();
    trings.o3d.lookAt(new THREE.Vector3(0, 100, 60));
    scene.add(trings.o3d);

    const mouse = new THREE.Vector2();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -20);
    const mousePosition = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();

    renderer.domElement.addEventListener('mousemove', e => {
      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(mousePlane, mousePosition);
      trings.o3d.lookAt(mousePosition);
    });

    renderer.domElement.addEventListener('click', e => {
      cscale = chroma.scale([0x0, chroma.random(), chroma.random(), chroma.random()]);
    });
  }

  function initPostProcessing() {
    const { EffectComposer, RenderPass, BloomEffect, EffectPass } = POSTPROCESSING;

    composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    renderPass.renderToScreen = false;
    composer.addPass(renderPass);

    const bloomEffect = new BloomEffect();
    bloomEffect.blendMode.opacity.value = 4;
    bloomEffect.distinction = 1;

    const effectPass = new EffectPass(camera, bloomEffect);
    effectPass.renderToScreen = true;
    composer.addPass(effectPass);
  }

  this.setAudio = (audio) => {
    const tAudio = new THREE.Audio(new THREE.AudioListener());
    tAudio.setMediaElementSource(audio);
    analyser = new THREE.AudioAnalyser(tAudio, conf.fftSize);
  }

  function analyseFrequencyData() {
    if (analyser) {
      frequencies = analyser.getFrequencyData();
      fAvg = analyser.getAverageFrequency();
    } else {
      // fake frequencies
      frequencies = [];
      const time = Date.now() * 0.0005;
      for (let i = 0; i < fftDSize; i++)
        frequencies[i] = (simplex.noise2D(i * 0.05, time) + 1) * (fftDSize - i) * (128 / fftDSize);
      fAvg = frequencies.reduce((a, b) => a + b) / frequencies.length;
    }
    aFrequencies.push(fAvg);
    if (aFrequencies.length > 120) aFrequencies.shift();
    aFAvg = aFrequencies.reduce((a, b) => a + b) / aFrequencies.length;
    aFMax = aFrequencies.reduce((prev, current) => (prev > current) ? prev : current);
  }

  function animate() {
    requestAnimationFrame(animate);

    analyseFrequencyData();
    animateTrings();

    composer.render();
  }

  function animateTrings() {
    for (let i = 0; i < numTorus; i++) {
      animateTorus(trings.objects[numTorus - i - 1], { aFAvg, aFMax, fAvg, f: frequencies[i] });
    }
  }

  function animateTorus(torus, { aFAvg, aFMax, fAvg, f }) {
    const aFMaxCoef = aFMax > 0 ? 1 / aFMax : 1 / 0xff;
    const fCoef = aFMaxCoef * f;
    const fCoef1 = aFMaxCoef * (f - fAvg);
    // const fCoef2 = aFMaxCoef * (f - aFAvg);
    // const fCoef3 = aFMaxCoef * (fAvg - aFAvg);

    const z = torus.position.z + ((fCoef * (5 + aFAvg * 0.3)) - torus.position.z) / 2;
    torus.position.z = z;

    const s = torus.scale.x + ((1 + fCoef1 * 0.05) - torus.scale.x) / 2;
    torus.scale.set(s, s, s);

    torus.material.color = new THREE.Color(cscale(clamp(0.01 + f / 300, 0, 1)).hex());
  }

  function createTRings() {
    const trings = new THREE.Object3D();
    const objects = [];

    let r, tr, geo, mat, mesh;
    for (let i = 0; i < numTorus; i++) {
      r = conf.torusRadius / 2 + i * conf.torusRadius;
      tr = conf.torusRadius / 2;
      mat = new THREE.MeshStandardMaterial({ color: cscale(0.01).hex(), roughness: 0.5, metalness: 0.9 });
      geo = new THREE.TorusBufferGeometry(r, tr, 8, (i + 1) * 16);
      mesh = new THREE.Mesh(geo, mat);
      objects.push(mesh);
      trings.add(mesh);
    }

    const o3d = new THREE.Object3D();
    trings.position.z = -50;
    o3d.add(trings);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.z = 200;
    o3d.add(pointLight);

    return { o3d, objects };
  }

  function updateSize() {
    width = window.innerWidth; cx = width / 2;
    height = window.innerHeight; cy = height / 2;
    renderer.setSize(width, height);
    if (composer) composer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

/**
 * SoundCloud helper
 */
class SoundCloud {
  constructor(client_id) {
    this.client_id = client_id;
    this.api = axios.create({
      baseURL: 'https://api.soundcloud.com/',
      timeout: 5000,
    });
    this.api.defaults.params = { 'client_id': this.client_id };
  }
  search(q) {
    return new Promise((resolve, reject) => {
      this.api.get('tracks', { params: { q } })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  searchUserTracks(user_id) {
    return new Promise((resolve, reject) => {
      this.api.get(`users/${user_id}/tracks`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  getTrack(trackId) {
    return new Promise((resolve, reject) => {
      this.api.get(`tracks/${trackId}`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  getStreamUrl(track) {
    return `${track.stream_url}?client_id=${this.client_id}`;
  }
}

/**
 * Progress input component
 */
Vue.component('progress-input', {
  template: '#progress-input-template',
  props: {
    'value': Number,
    'total': { type: Number, default: 0 },
  },
  computed: {
    progressPct() {
      return 100 * this.value / this.total;
    },
  },
  methods: {
    onClick(e) {
      const r = this.$el.getBoundingClientRect();
      const pct = min(max(0, 100 * (e.clientX - r.x) / r.width), 100);
      this.$emit('input', pct);
    },
  },
});

/**
 * Vue App
 */
new Vue({
  el: '#app',
  data: {
    duration: 0,
    currentTime: 0,
    volume: 50,
    track: {},
    tracks: [],
    q: '',
    playing: false,
    searching: false,
    showStart: true,
    showSearchModal: false,
  },
  computed: {
    currentTimeInput: {
      get() {
        return this.currentTime;
      },
      set(v) {
        this.getAudio().currentTime = v * this.duration / 100;
      }
    },
  },
  watch: {
    volume() {
      this.getAudio().volume = this.volume / 100;
    },
  },
  mounted() {
    const cliendIds = ['xIa292zocJP1G1huxplgJKVnK0V3Ni9D', 'o6wsvSiFtQ4JE7mUaWl2qX71BHUy5Zgv', 'b8RLIe5KjFHhkmmbPLN0znpdHKEwLdFF', 'zcIaffYH3Kmirg4eYPYL3jtdqbIIuctK', 'FQ9LDhAVSqOIHJ3QvP6QSvclL0MFDVyx', 'xHUOEQdFkG0xugRO3lIHWfbVds0wnC3J'];
    const clientId = cliendIds[floor(random() * cliendIds.length)];
    console.log(clientId);
    this.sc = new SoundCloud(clientId);
    this.audioVis = new AudioVis();
  },
  methods: {
    onStart() {
      this.showStart = false;
      this.onEmptySearch();
    },
    onEmptySearch() {
      this.tracks = [
        {
          'id': 314116820,
          'title': 'KOZALA',
          'artwork_url': 'https://i1.sndcdn.com/artworks-000214296127-htahtc-large.jpg',
          'permalink_url': 'https://soundcloud.com/kolinga/kozala',
          'stream_url': 'https://api.soundcloud.com/tracks/314116820/stream',
          'user': { 'id': 121602784, 'username': 'KOLINGA', 'permalink_url': 'http://soundcloud.com/kolinga' },
        },
        {
          'id': 312752664,
          'title': 'EARTHQUAKE',
          'artwork_url': 'https://i1.sndcdn.com/artworks-000212908863-3ge55c-large.jpg',
          'permalink_url': 'https://soundcloud.com/kolinga/01-kolinga-earthquake',
          'stream_url': 'https://api.soundcloud.com/tracks/312752664/stream',
          'user': { 'id': 121602784, 'username': 'KOLINGA', 'permalink_url': 'http://soundcloud.com/kolinga' },
        },
        {
          'id': 167675625,
          'title': 'Daft Punk - Get Lucky (feat. Pharrell Williams)',
          'artwork_url': 'https://i1.sndcdn.com/artworks-000090983113-4e15cm-large.jpg',
          'permalink_url': 'https://soundcloud.com/daftpunk-music/daft-punk-get-lucky',
          'stream_url': 'https://api.soundcloud.com/tracks/167675625/stream',
          'user': { 'id': 28593673, 'username': 'Daft Punk', 'permalink_url': 'http://soundcloud.com/daftpunk-music' },
        },
        {
          'id': 45710769,
          'title': 'Skrillex & Damian \'Jr Gong\' Marley - Make It Bun Dem',
          'artwork_url': 'https://i1.sndcdn.com/artworks-000022989552-dr662l-large.jpg',
          'permalink_url': 'https://soundcloud.com/skrillex/skrillex-damian-jr-gong-marley',
          'stream_url': 'https://api.soundcloud.com/tracks/45710769/stream',
          'user': { 'id': 856062, 'username': 'Skrillex', 'permalink_url': 'http://soundcloud.com/skrillex' },
        },
      ];
      this.showSearchModal = true;
    },
    getAudio() {
      // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
      if (!this.audio) {
        this.audio = new Audio();
        this.audio.crossOrigin = 'anonymous';
        this.audio.addEventListener('loadeddata', e => { this.duration = this.audio.duration; });
        this.audio.addEventListener('timeupdate', e => { this.currentTime = this.audio.currentTime; });
        this.audio.addEventListener('ended', e => { this.playing = false; this.audio.currentTime = 0; });
        this.volume = 20;
        this.audioVis.setAudio(this.audio);
      }
      return this.audio;
    },
    reset() {
      this.track = {};
      this.getAudio().pause();
    },
    onSearch() {
      if (this.q) {
        this.search(this.q);
        this.showSearchModal = true;
      } else {
        this.onEmptySearch();
      }
    },
    search(q) {
      this.tracks = [];
      this.searching = true;
      this.sc.search(q)
        .then(response => {
          this.tracks = response.data;
        })
        .then(() => {
          this.searching = false;
        });
    },
    onSearchUserTracks(user) {
      this.searchUserTracks(user);
      this.showSearchModal = true;
    },
    searchUserTracks(user) {
      this.tracks = [];
      this.searching = true;
      this.sc.searchUserTracks(user.id)
        .then(response => {
          this.tracks = response.data;
        })
        .then(() => {
          this.searching = false;
        });
    },
    setTrack(track) {
      this.track = track;
      this.getAudio().src = this.sc.getStreamUrl(this.track);
    },
    onToggleTrack(track) {
      if (this.track.id == track.id) {
        this.onTogglePlay();
        return;
      }
      this.showSearchModal = false;
      this.reset();
      this.setTrack(track);
      this.play();
    },
    onToggleVolume() {
      if (this.volume > 0) {
        this.oldVolume = this.volume;
        this.volume = 0;
      } else {
        this.volume = this.oldVolume || 0;
      }
    },
    isPlaying(id) {
      return (this.track.id == id && this.playing);
    },
    play() {
      this.getAudio().play();
      this.playing = true;
    },
    pause() {
      this.getAudio().pause();
      this.playing = false;
    },
    onTogglePlay() {
      if (!this.getAudio().src) return;
      if (this.playing) this.pause();
      else this.play();
    },
    truncate(s, limit) {
      if (!s) return;
      const words = s.split(' ');
      let ts = words.slice(0, limit);
      return ts.join(' ') + (words.length > limit ? '...' : '');
    },
  }
});
