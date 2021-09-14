<template>
 <div style="width:100%;heigt:100%;" id="chart2"></div>
</template>

<script>
import echarts from "echarts";
export default {
 mounted() {
  this.render();
 },
 methods: {
  render() {
   var myChart = echarts.init(document.getElementById("chart2"));

   // 指定图表的配置项和数据
   var option = {
    tooltip: {
     trigger: "axis",
     axisPointer: {
      // Use axis to trigger tooltip
      type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
     }
    },
    legend: {
     data: ["Direct", "Mail Ad", "Affiliate Ad", "Video Ad", "Search Engine"]
    },
    grid: {
     left: "3%",
     right: "4%",
     bottom: "3%",
     containLabel: true
    },
    xAxis: {
     type: "value"
    },
    yAxis: {
     type: "category",
     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    series: [
     {
      name: "Direct",
      type: "bar",
      stack: "total",
      label: {
       show: true
      },
      emphasis: {
       focus: "series"
      },
      data: [320, 302, 301, 334, 390, 330, 320]
     },
     {
      name: "Mail Ad",
      type: "bar",
      stack: "total",
      label: {
       show: true
      },
      emphasis: {
       focus: "series"
      },
      data: [120, 132, 101, 134, 90, 230, 210]
     },
     {
      name: "Affiliate Ad",
      type: "bar",
      stack: "total",
      label: {
       show: true
      },
      emphasis: {
       focus: "series"
      },
      data: [220, 182, 191, 234, 290, 330, 310]
     },
     {
      name: "Video Ad",
      type: "bar",
      stack: "total",
      label: {
       show: true
      },
      emphasis: {
       focus: "series"
      },
      data: [150, 212, 201, 154, 190, 330, 410]
     },
     {
      name: "Search Engine",
      type: "bar",
      stack: "total",
      label: {
       show: true
      },
      emphasis: {
       focus: "series"
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
     }
    ]
   };

   // 使用刚指定的配置项和数据显示图表。
   myChart.setOption(option);
  }
 }
};
</script>

<style>
</style>