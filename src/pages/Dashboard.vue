<template>
  <div>
    <div class="bg-white rounded-lg shadow-md p-4 m-3 grid grid-cols-5 gap-x-2">
      <div class="grid grid-cols-5 gap-x-2">
        <div class="col-span-1 m-auto">
          <i class="el-icon-money"></i>
        </div>
        <div class="col-span-4">
          <div class="font-bold text-blue-600/100">Tiền hàng</div>
          <div>$1000</div>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-x-2">
        <div class="col-span-1 m-auto">
          <i class="el-icon-money"></i>
        </div>
        <div class="col-span-4">
          <div class="font-bold text-blue-600/100">Hoàn / Hủy</div>
          <div>$1000</div>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-x-2">
        <div class="col-span-1 m-auto">
          <i class="el-icon-money"></i>
        </div>
        <div class="col-span-4">
          <div class="font-bold text-blue-600/100">Giảm giá</div>
          <div>$1000</div>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-x-2">
        <div class="col-span-1 m-auto">
          <i class="el-icon-money"></i>
        </div>
        <div class="col-span-4">
          <div class="font-bold text-blue-600/100">Thuế phí</div>
          <div>$1000</div>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-x-2">
        <div class="col-span-1 m-auto">
          <i class="el-icon-money"></i>
        </div>
        <div class="col-span-4">
          <div class="font-bold text-blue-600/100">Doanh thu gồm thuế</div>
          <div>$1000</div>
        </div>
      </div>
    </div>

    <div class="m-3 grid grid-cols-4 gap-x-4">
      <div class="">
        <el-col :span="8" class="w-full">
          <el-card shadow="always">
            <div class="font-semibold">Số khách hàng</div>
            <div>100</div>
          </el-card>
        </el-col>
      </div>
      <div class="">
        <el-col :span="8" class="w-full">
          <el-card shadow="always">
            <div class="font-semibold">Số hóa đơn</div>
            <div>100</div>
          </el-card>
        </el-col>
      </div>

      <div class="">
        <el-col :span="8" class="w-full">
          <el-card shadow="always">
            <div class="font-semibold">Số mặt hàng</div>
            <div>100</div>
          </el-card>
        </el-col>
      </div>

      <div class="">
        <el-col :span="8" class="w-full">
          <el-card shadow="always">
            <div class="font-semibold">Số hóa đơn hủy</div>
            <div>100</div>
          </el-card>
        </el-col>
      </div>
    </div>
    <div style="height: 300px">
      <v-chart :option="chartOptionsBar"></v-chart>
    </div>
    <div style="height: 300px">
      <v-chart :option="option" autoresize></v-chart>
    </div>
    <div style="height: 300px">
      <v-chart :option="option1" autoresize></v-chart>
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

      option1: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            z: -1, // optional, makes the yAxis' splitLines appear on top
            data: [170, 182, 161, 184, 160, 180, 165],
            smooth: true,
            type: "line",
            areaStyle: {},
          },
        ],
      },
    };
  },
};
</script>
<style>
.el-icon-money:before {
  font-size: xx-large;
}
</style>
