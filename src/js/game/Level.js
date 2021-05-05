function importMap(number) {
  fetch(`http://localhost/assets/maps/map${number}.json`)
    .then((r) => {
      return r.json();
    })
    .then((d) => {
      return d;
    })
    .catch((error) => console.log(error));
}

const map = importMap('1');
console.log(map);
