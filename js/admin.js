// Graph
/*var ctx = document.getElementById("myChart");

var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
        lineTension: 0,
        backgroundColor: "transparent",
        borderColor: "#007bff",
        borderWidth: 4,
        pointBackgroundColor: "#007bff",
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  },
});*/

let plot = (data) => {
  const ctx = document.getElementById("myChart");

  const dataset = {
    labels: data.hourly.time /* ETIQUETA DE DATOS */,
    datasets: [
      {
        label: "Temperatura semanal" /* ETIQUETA DEL GRÁFICO */,
        data: data.hourly.temperature_2m /* ARREGLO DE DATOS */,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const config = {
    type: "line",
    data: dataset,
  };

  const chart = new Chart(ctx, config);
};

let bar = (data) => {
  const ctx = document.getElementById("myChart2");

  const dataset2 = {
    labels: data.daily.time /* ETIQUETA DE DATOS */,
    datasets: [
      {
        label: "Temperatura diaria" /* ETIQUETA DEL GRÁFICO */,
        data: data.daily.uv_index_max /* ARREGLO DE DATOS */,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: dataset2,
  };

  const chart = new Chart(ctx, config);
};

let loadInocar = () => {
  let URL =
    "https://cors-anywhere.herokuapp.com/https://www.inocar.mil.ec/mareas/consultan.php";

  fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      document.getElementById("mareas").innerHTML = data;
    })
    .catch((error) => console.log(error));
};

const loadOpenMeteoData = async () => {
  let URL =
    "https://api.open-meteo.com/v1/forecast?latitude=-2.15&longitude=-79.97&hourly=temperature_2m&daily=uv_index_max&timezone=auto";

  let response = await fetch(URL).catch((error) => console.log(error));
  return await response.json();   
}

(async function () {
  let meteo = localStorage.getItem("meteo");

  if(meteo == null) {
    let data = await loadOpenMeteoData();
    document.getElementById("lat").textContent = data["latitude"];
    document.getElementById("long").textContent = data.longitude;
    localStorage.setItem("meteo", data)
    plot(data);
    bar(data);
  } else {
    document.getElementById("lat").textContent = meteo["latitude"];
    document.getElementById("long").textContent = meteo.longitude;
    plot(meteo);
    bar(meteo);
  }

  loadInocar();
})();
