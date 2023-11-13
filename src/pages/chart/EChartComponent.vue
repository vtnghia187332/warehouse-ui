<template>
  <div>
    <div ref="chart" style="height: 400px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Your chart instance
      chart: null,
    };
  },
  mounted() {
    // Initialize the chart when the component is mounted
    this.initChart();
  },
  methods: {
    initChart() {
      // Get the DOM element to render the chart
      const chartContainer = this.$refs.chart;

      // Initialize ECharts
      this.chart = window.echarts.init(chartContainer);

      // Define your chart options
      const options = {
        title: {
          text: "My EChart Example",
        },
        // Add other chart configurations as needed
        // For example:
        // xAxis: {
        //   data: ['Category 1', 'Category 2', 'Category 3'],
        // },
        // yAxis: {
        //   type: 'value',
        // },
        // series: [
        //   {
        //     name: 'Series 1',
        //     type: 'bar',
        //     data: [10, 20, 15],
        //   },
        // ],
      };

      // Set the options to the chart
      this.chart.setOption(options);
    },
  },
  beforeDestroy() {
    // Dispose of the chart when the component is destroyed to prevent memory leaks
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style scoped>
/* Add any custom styles for your component */
</style>
