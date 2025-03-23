import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

// Add the desired icons to the library
library.add(faCoffee);

// Create the Vue app and register the FontAwesome component globally
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
