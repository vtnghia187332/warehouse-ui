<template>
  <div>
    <!--Stats cards-->
    <div style="height: 300px">
      <v-chart :option="chartOptionsBar"></v-chart>
    </div>
    <div style="height: 300px">
      <v-chart :option="option" autoresize></v-chart>
    </div>
  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
export default {
  components: {
    StatsCard,
    ChartCard,
  },
  data() {
    return {
      chartOptionsBar: {
        xAxis: {
          data: ["Latte", "Espresso", "Mocha", "Cappucino"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            data: [100, 50, 25, 10],
          },
        ],
      },

      option: {
        textStyle: {
          fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
        },
        title: {
          text: "Traffic Sources",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "Direct",
            "Email",
            "Ad Networks",
            "Video Ads",
            "Search Engines",
          ],
        },
        series: [
          {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 234, name: "Ad Networks" },
              { value: 135, name: "Video Ads" },
              { value: 1548, name: "Search Engines" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
};
</script>
<style></style>
