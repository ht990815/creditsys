<template>
  <div>
    <div class="Plate">
      <div v-for="(v, i) in lists" :key="i" :style="{'background':v.bgcolor}">
        <h2>
          <label>{{v.title}}</label>
          <span style="display:block;color:white;text-align:center;margin-top:20px;">
            <countTo :startVal="v.startNum" :endVal="v.endNum" :duration="3000" />
          </span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";

export default {
  name: "Plate",
  data() {
    return {
      lists: [
        {
          id: 0,
          title: "最高可借金额",
          startNum: 0,
          endNum: 13555,
          bgcolor: "#27ae60"
        },
        {
          id: 1,
          title: "回报率",
          startNum: 0,
          endNum: 9985,
          bgcolor: "#fbc531"
        },
        {
          id: 2,
          title: "业绩赛跑",
          startNum: 0,
          endNum: 5658,
          bgcolor: "#e84118"
        },
        {
          id: 3,
          title: "积极贷款者",
          startNum: 0,
          endNum: 6555,
          bgcolor: "#341f97"
        }
      ]
    };
  },
  components: {
    countTo
  }
};
</script>

<style scoped>
</style>
