(function () {
  let URL =
    "https://api.open-meteo.com/v1/forecast?latitude=-2.15&longitude=-79.97&hourly=temperature_2m&daily=uv_index_max&timezone=auto";
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("lat").innerText(data.latitude);
      document.getElementById("long").innerText(data.longitude);
    })
    .catch((error) => console.log(error));
});
