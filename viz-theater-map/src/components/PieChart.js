import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  props: ['chartdata', 'options', 'title'],
  mounted () {
    this.renderPieChart(this.chartdata, this.options)
  },
  computed: {
    chartData: function() {
      return this.chartdata;
    }
  },
  methods:{
    renderPieChart: function() {
      this.renderChart(
        {
          labels: ['거리1', '거리2', '거리3', '거리4'],
          datasets: [
            {
              backgroundColor: ['#26678F', '#6FC7A4', '#FDC771', '#D53E47'],
              data: this.chartData
            }
          ],
        },
        this.options
      );      
    }
  },
  watch: {
    chartdata: function() {
      // this._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderPieChart();
    }
  }
}
