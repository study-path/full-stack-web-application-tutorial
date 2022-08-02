<template>
  <div class="fetchData">Forecast</div>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Temp.(C)</th>
        <th>Temp.(F)</th>
        <th>Summary</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="forecast in forecasts" :key="forecast.id">
        <td>{{ forecast.Date }}</td>
        <td>{{ forecast.TemperatureC }}</td>
        <td>{{ forecast.TemperatureF }}</td>
        <td>{{ forecast.Summary }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      counter: 0,
      forecasts: [],
    };
  },
  mounted() {
    this.getWeatherForecasts();
  },
  methods: {
    getWeatherForecasts() {
      const instance = axios.create({
        baseURL: "https://localhost:44319",
      });

      instance
        .get("/weatherforecast")
        .then((response) => {
          this.forecasts = response.data;
        })
        .catch((err) => {
          err;
        });
    },
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 99%;
  margin: 5px;
}

td,
th {
  border: 1px solid #dddddd;
  padding: 15px;
}

tr:nth-child(even) {
  background-color: #dddddd;
  margin: 5px;
}
</style>
