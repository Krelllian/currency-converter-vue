<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import { mapState, mapGetters } from 'vuex'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)
export default {
  name: 'LineChart',
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      //default: () => {}
    },
    plugins: {
      type: Array,
      //default: () => []
    },
    label: {}
  },
  computed: {
    ...mapState({
      ...mapGetters(['historicalData']),
    }),
      chartData() { return {
          labels:[
            ...this.historicalData.map((coin) => {
             let date = new Date(coin[0])
             let time = date.getHours() > 12
                 ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                 : `${date.getHours()}:${date.getMinutes()} AM`;
             return date.toLocaleDateString();
           })
        ],
        datasets: [
          {
            label: this.label,
            pointRadius: 0,
            backgroundColor: '#f87979',
            data: [...this.historicalData.map((coin) => {
             return coin[1];
           })]
          }
        ]
      }
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
  },
  data() {
    return {
    }
  }
}
</script>