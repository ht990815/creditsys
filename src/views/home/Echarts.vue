<template>
  <div>
    <span style="display:block;margin:10px;font-size:20px;font-weight:bold;">各行业大致借款人数</span>
    <div class="chart-display">
      <div id="small-chart">
        <div> <S1 /> </div>
        <div> <S2 /> </div>
      </div>
      <div id="big-chart" style=""></div>
    </div>
    
  </div>
</template>

<script>
import S1 from "./S1";
import S2 from "./S2";
import echarts from "echarts";

export default {
  name: "Plate",
  components: {
    S1,
    S2
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      var myChart = echarts.init(document.getElementById("big-chart"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["餐饮", "IT", "农工", "创业者", "其他"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "餐饮",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series"
            },
            data: [120, 132, 101, 134, 90, 230, 210, 230, 232, 300, 235, 302]
          },
          {
            name: "IT",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series"
            },
            data: [220, 182, 191, 234, 290, 330, 310, 225, 330, 236, 226, 320]
          },
          {
            name: "农工",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series"
            },
            data: [150, 232, 201, 154, 190, 330, 410, 250, 102, 342, 236, 352]
          },
          {
            name: "创业者",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series"
            },
            data: [320, 332, 301, 334, 390, 330, 320, 154, 190, 330, 410, 250]
          },
          {
            name: "其他",
            type: "line",
            stack: "总量",
            label: {
              show: true,
              position: "top"
            },
            areaStyle: {},
            emphasis: {
              focus: "series"
            },
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              320,
              332,
              301,
              334,
              390
            ]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
</style>
