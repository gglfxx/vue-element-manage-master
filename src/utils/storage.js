const storage = {
  save(key, value) {
    sessionStorage.setItem(key, window.JSON.stringify(value));
  },
  fetch(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
}

export default storage;
