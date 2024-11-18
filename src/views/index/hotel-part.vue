<template>
  <div class="main-container">
    <!-- Slider Container -->
    <div class="slider-container">
      <el-slider
        v-model="currentYear"
        :min="2013"
        :max="2024"
        :step="1"
        :marks="marks"
        show-tooltip
        @change="updateChart"
        style="height: 250px; width: 15px; font-size: 8px; color: grey;"
        vertical
        class="vertical-slider"
      ></el-slider>
    </div>

    <!-- Chart Container -->
    <div class="chart-container" id="chartBox">
      <div id="chart" style="width:600px; height:250px;"></div>
      
<!-- Overlay toggle checkboxes -->
<div class="toggle-buttons">

  <el-checkbox size="small" v-model="isMainlandChinaVisible" @change="updateChart">
    Mainland CN
  </el-checkbox>
  <el-checkbox size="small" v-model="isHongKongVisible" @change="updateChart" style="margin-top: 10px">
    HK
  </el-checkbox>
  <el-checkbox size="small" v-model="isMacauVisible" @change="updateChart" style="margin-top: 10px">
    MO
  </el-checkbox>

</div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { ElSlider, ElButton } from 'element-plus';
const originFullNames = {
  CN: "Mainland China",
  HK: "Hong Kong",
  MO: "Macau",
  TW: "Taiwan",
  JP: "Japan",
  IN: "India",
  ID: "Indonesia",
  MY: "Malaysia",
  KR: "Korea",
  SG: "Singapore",
  TH: "Thailand",
  OAS: "Other countries/regions in Asia",
  US: "The United States",
  OAM: "Other countries/regions in Americas",
  UK: "The United Kingdom",
  OE: "Other countries/regions in Europe",
  AU: "Australia",
  OO: "Other countries/regions in Oceania",
  OT: "Others",
};
const dataByYear = {
  "2013": [
    {
      "Origin": "CN",
      "5 Star": 3267361,
      "4 Star": 1854364,
      "3 Star": 785769,
      "2 Star": 276104,
      "Econ Accomm": 135890
    },
    {
      "Origin": "HK",
      "5 Star": 1284148,
      "4 Star": 346987,
      "3 Star": 78088,
      "2 Star": 20367,
      "Econ Accomm": 13517
    },
    {
      "Origin": "MO",
      "5 Star": 479891,
      "4 Star": 92331,
      "3 Star": 61698,
      "2 Star": 14463,
      "Econ Accomm": 6196
    },
    {
      "Origin": "TW",
      "5 Star": 285081,
      "4 Star": 74344,
      "3 Star": 21343,
      "2 Star": 3276,
      "Econ Accomm": 1783
    },
    {
      "Origin": "JP",
      "5 Star": 124310,
      "4 Star": 36575,
      "3 Star": 17982,
      "2 Star": 2157,
      "Econ Accomm": 640
    },
    {
      "Origin": "IN",
      "5 Star": 108462,
      "4 Star": 18433,
      "3 Star": 8906,
      "2 Star": 1500,
      "Econ Accomm": 156
    },
    {
      "Origin": "ID",
      "5 Star": 59842,
      "4 Star": 23298,
      "3 Star": 6750,
      "2 Star": 1705,
      "Econ Accomm": 758
    },
    {
      "Origin": "MY",
      "5 Star": 61937,
      "4 Star": 37411,
      "3 Star": 16640,
      "2 Star": 5989,
      "Econ Accomm": 1982
    },
    {
      "Origin": "KR",
      "5 Star": 136344,
      "4 Star": 63087,
      "3 Star": 12285,
      "2 Star": 1295,
      "Econ Accomm": 317
    },
    {
      "Origin": "SG",
      "5 Star": 66662,
      "4 Star": 24034,
      "3 Star": 7499,
      "2 Star": 1156,
      "Econ Accomm": 374
    },
    {
      "Origin": "TH",
      "5 Star": 63544,
      "4 Star": 32554,
      "3 Star": 9992,
      "2 Star": 5419,
      "Econ Accomm": 1934
    },
    {
      "Origin": "OAS",
      "5 Star": 60350,
      "4 Star": 27187,
      "3 Star": 20022,
      "2 Star": 8700,
      "Econ Accomm": 1573
    },
    {
      "Origin": "US",
      "5 Star": 73410,
      "4 Star": 19608,
      "3 Star": 6204,
      "2 Star": 1466,
      "Econ Accomm": 514
    },
    {
      "Origin": "OAM",
      "5 Star": 6577,
      "4 Star": 2506,
      "3 Star": 2748,
      "2 Star": 293,
      "Econ Accomm": 62
    },
    {
      "Origin": "UK",
      "5 Star": 16666,
      "4 Star": 5069,
      "3 Star": 1046,
      "2 Star": 461,
      "Econ Accomm": 268
    },
    {
      "Origin": "OE",
      "5 Star": 54007,
      "4 Star": 19821,
      "3 Star": 6381,
      "2 Star": 2779,
      "Econ Accomm": 748
    },
    {
      "Origin": "AU",
      "5 Star": 39177,
      "4 Star": 8322,
      "3 Star": 3758,
      "2 Star": 508,
      "Econ Accomm": 222
    },
    {
      "Origin": "OO",
      "5 Star": 6546,
      "4 Star": 3421,
      "3 Star": 975,
      "2 Star": 356,
      "Econ Accomm": 52
    },
    {
      "Origin": "OT",
      "5 Star": 187236,
      "4 Star": 13723,
      "3 Star": 890,
      "2 Star": 1993,
      "Econ Accomm": 24
    }
  ],
  "2014": [
    {
      "Origin": "CN",
      "5 Star": 3686500,
      "4 Star": 1954500,
      "3 Star": 877900,
      "2 Star": 286400,
      "Econ Accomm": 133200
    },
    {
      "Origin": "HK",
      "5 Star": 916000,
      "4 Star": 292800,
      "3 Star": 60300,
      "2 Star": 18600,
      "Econ Accomm": 14400
    },
    {
      "Origin": "MO",
      "5 Star": 514100,
      "4 Star": 97400,
      "3 Star": 64200,
      "2 Star": 12900,
      "Econ Accomm": 6200
    },
    {
      "Origin": "TW",
      "5 Star": 257100,
      "4 Star": 76400,
      "3 Star": 18600,
      "2 Star": 3900,
      "Econ Accomm": 2600
    },
    {
      "Origin": "JP",
      "5 Star": 114400,
      "4 Star": 42600,
      "3 Star": 11300,
      "2 Star": 2300,
      "Econ Accomm": 900
    },
    {
      "Origin": "IN",
      "5 Star": 95800,
      "4 Star": 25100,
      "3 Star": 3300,
      "2 Star": 2000,
      "Econ Accomm": 500
    },
    {
      "Origin": "ID",
      "5 Star": 45900,
      "4 Star": 26500,
      "3 Star": 3000,
      "2 Star": 1900,
      "Econ Accomm": 1000
    },
    {
      "Origin": "MY",
      "5 Star": 52100,
      "4 Star": 34500,
      "3 Star": 8900,
      "2 Star": 7200,
      "Econ Accomm": 3800
    },
    {
      "Origin": "TH",
      "5 Star": 129500,
      "4 Star": 76000,
      "3 Star": 8200,
      "2 Star": 2100,
      "Econ Accomm": 900
    },
    {
      "Origin": "SG",
      "5 Star": 56200,
      "4 Star": 26300,
      "3 Star": 6100,
      "2 Star": 1200,
      "Econ Accomm": 700
    },
    {
      "Origin": "KR",
      "5 Star": 37000,
      "4 Star": 22100,
      "3 Star": 5200,
      "2 Star": 6400,
      "Econ Accomm": 3200
    },
    {
      "Origin": "OAS",
      "5 Star": 45500,
      "4 Star": 32400,
      "3 Star": 13400,
      "2 Star": 11500,
      "Econ Accomm": 2900
    },
    {
      "Origin": "US",
      "5 Star": 49800,
      "4 Star": 14500,
      "3 Star": 3500,
      "2 Star": 1000,
      "Econ Accomm": 500
    },
    {
      "Origin": "OAM",
      "5 Star": 23900,
      "4 Star": 9400,
      "3 Star": 4800,
      "2 Star": 900,
      "Econ Accomm": 400
    },
    {
      "Origin": "UK",
      "5 Star": 16300,
      "4 Star": 5100,
      "3 Star": 900,
      "2 Star": 400,
      "Econ Accomm": 300
    },
    {
      "Origin": "OE",
      "5 Star": 51200,
      "4 Star": 32200,
      "3 Star": 4600,
      "2 Star": 3100,
      "Econ Accomm": 1500
    },
    {
      "Origin": "AU",
      "5 Star": 35100,
      "4 Star": 9700,
      "3 Star": 3200,
      "2 Star": 500,
      "Econ Accomm": 400
    },
    {
      "Origin": "OO",
      "5 Star": 6200,
      "4 Star": 4500,
      "3 Star": 900,
      "2 Star": 500,
      "Econ Accomm": 100
    },
    {
      "Origin": "OT",
      "5 Star": 145600,
      "4 Star": 14600,
      "3 Star": 1200,
      "2 Star": 2100,
      "Econ Accomm": 100
    }
  ],
  "2015": [
    {
      "Origin": "CN",
      "5 Star": 3617100,
      "4 Star": 1853700,
      "3 Star": 839300,
      "2 Star": 240200,
      "Econ Accomm": 132800
    },
    {
      "Origin": "HK",
      "5 Star": 1005800,
      "4 Star": 394800,
      "3 Star": 60900,
      "2 Star": 16400,
      "Econ Accomm": 10700
    },
    {
      "Origin": "MO",
      "5 Star": 466600,
      "4 Star": 98300,
      "3 Star": 59500,
      "2 Star": 6600,
      "Econ Accomm": 5200
    },
    {
      "Origin": "TW",
      "5 Star": 252900,
      "4 Star": 101400,
      "3 Star": 14600,
      "2 Star": 6700,
      "Econ Accomm": 3200
    },
    {
      "Origin": "JP",
      "5 Star": 108000,
      "4 Star": 41200,
      "3 Star": 9000,
      "2 Star": 2400,
      "Econ Accomm": 900
    },
    {
      "Origin": "IN",
      "5 Star": 36000,
      "4 Star": 19600,
      "3 Star": 2500,
      "2 Star": 1600,
      "Econ Accomm": 800
    },
    {
      "Origin": "ID",
      "5 Star": 112600,
      "4 Star": 24400,
      "3 Star": 2100,
      "2 Star": 1700,
      "Econ Accomm": 400
    },
    {
      "Origin": "MY",
      "5 Star": 47300,
      "4 Star": 31900,
      "3 Star": 7600,
      "2 Star": 7300,
      "Econ Accomm": 3000
    },
    {
      "Origin": "TH",
      "5 Star": 39100,
      "4 Star": 20900,
      "3 Star": 4300,
      "2 Star": 5500,
      "Econ Accomm": 2800
    },
    {
      "Origin": "SG",
      "5 Star": 46600,
      "4 Star": 23300,
      "3 Star": 3900,
      "2 Star": 1200,
      "Econ Accomm": 300
    },
    {
      "Origin": "KR",
      "5 Star": 147300,
      "4 Star": 67400,
      "3 Star": 6800,
      "2 Star": 3300,
      "Econ Accomm": 900
    },
    {
      "Origin": "OAS",
      "5 Star": 39200,
      "4 Star": 53900,
      "3 Star": 12200,
      "2 Star": 9900,
      "Econ Accomm": 2700
    },
    {
      "Origin": "US",
      "5 Star": 49400,
      "4 Star": 15400,
      "3 Star": 3200,
      "2 Star": 900,
      "Econ Accomm": 400
    },
    {
      "Origin": "OAM",
      "5 Star": 21100,
      "4 Star": 8900,
      "3 Star": 8500,
      "2 Star": 700,
      "Econ Accomm": 300
    },
    {
      "Origin": "UK",
      "5 Star": 18700,
      "4 Star": 5100,
      "3 Star": 1000,
      "2 Star": 300,
      "Econ Accomm": 300
    },
    {
      "Origin": "OE",
      "5 Star": 45000,
      "4 Star": 25600,
      "3 Star": 5500,
      "2 Star": 2200,
      "Econ Accomm": 1000
    },
    {
      "Origin": "AU",
      "5 Star": 29400,
      "4 Star": 9200,
      "3 Star": 2400,
      "2 Star": 400,
      "Econ Accomm": 200
    },
    {
      "Origin": "OO",
      "5 Star": 4800,
      "4 Star": 3500,
      "3 Star": 1000,
      "2 Star": 200,
      "Econ Accomm": 100
    },
    {
      "Origin": "OT",
      "5 Star": 70500,
      "4 Star": 13500,
      "3 Star": 900,
      "2 Star": 800,
      "Econ Accomm": 0
    }
  ],
  "2016": [
    {
      "Origin": "CN",
      "5 Star": 3889000,
      "4 Star": 2324400,
      "3 Star": 1036600,
      "2 Star": 223600,
      "Econ Accomm": 133800
    },
    {
      "Origin": "HK",
      "5 Star": 1064300,
      "4 Star": 527300,
      "3 Star": 164100,
      "2 Star": 15300,
      "Econ Accomm": 10500
    },
    {
      "Origin": "MO",
      "5 Star": 515800,
      "4 Star": 106900,
      "3 Star": 66700,
      "2 Star": 6400,
      "Econ Accomm": 4000
    },
    {
      "Origin": "TW",
      "5 Star": 267100,
      "4 Star": 162900,
      "3 Star": 36000,
      "2 Star": 8100,
      "Econ Accomm": 3000
    },
    {
      "Origin": "IN",
      "5 Star": 106300,
      "4 Star": 20900,
      "3 Star": 2900,
      "2 Star": 2000,
      "Econ Accomm": 200
    },
    {
      "Origin": "ID",
      "5 Star": 40800,
      "4 Star": 24000,
      "3 Star": 4400,
      "2 Star": 1600,
      "Econ Accomm": 500
    },
    {
      "Origin": "JP",
      "5 Star": 126400,
      "4 Star": 44300,
      "3 Star": 10300,
      "2 Star": 3100,
      "Econ Accomm": 700
    },
    {
      "Origin": "MY",
      "5 Star": 52100,
      "4 Star": 36100,
      "3 Star": 10300,
      "2 Star": 7000,
      "Econ Accomm": 1800
    },
    {
      "Origin": "KR",
      "5 Star": 199800,
      "4 Star": 87800,
      "3 Star": 11300,
      "2 Star": 4400,
      "Econ Accomm": 800
    },
    {
      "Origin": "SG",
      "5 Star": 49100,
      "4 Star": 24600,
      "3 Star": 5500,
      "2 Star": 1300,
      "Econ Accomm": 200
    },
    {
      "Origin": "TH",
      "5 Star": 37600,
      "4 Star": 20200,
      "3 Star": 6900,
      "2 Star": 5500,
      "Econ Accomm": 1600
    },
    {
      "Origin": "OAS",
      "5 Star": 45800,
      "4 Star": 28000,
      "3 Star": 12000,
      "2 Star": 6800,
      "Econ Accomm": 1800
    },
    {
      "Origin": "US",
      "5 Star": 53300,
      "4 Star": 16600,
      "3 Star": 4000,
      "2 Star": 1100,
      "Econ Accomm": 200
    },
    {
      "Origin": "OAM",
      "5 Star": 23700,
      "4 Star": 10200,
      "3 Star": 9200,
      "2 Star": 800,
      "Econ Accomm": 200
    },
    {
      "Origin": "UK",
      "5 Star": 18800,
      "4 Star": 6700,
      "3 Star": 1000,
      "2 Star": 300,
      "Econ Accomm": 200
    },
    {
      "Origin": "OE",
      "5 Star": 52900,
      "4 Star": 28000,
      "3 Star": 5600,
      "2 Star": 2400,
      "Econ Accomm": 700
    },
    {
      "Origin": "AU",
      "5 Star": 32300,
      "4 Star": 10200,
      "3 Star": 2700,
      "2 Star": 400,
      "Econ Accomm": 100
    },
    {
      "Origin": "OO",
      "5 Star": 5300,
      "4 Star": 3200,
      "3 Star": 800,
      "2 Star": 200,
      "Econ Accomm": 0
    },
    {
      "Origin": "OT",
      "5 Star": 73400,
      "4 Star": 17800,
      "3 Star": 6000,
      "2 Star": 400,
      "Econ Accomm": 0
    }
  ],
  "2017": [
    {
      "Origin": "CN",
      "5 Star": 4253300,
      "4 Star": 2558100,
      "3 Star": 1448300,
      "2 Star": 226500,
      "Econ Accomm": 150300
    },
    {
      "Origin": "HK",
      "5 Star": 967100,
      "4 Star": 381700,
      "3 Star": 232900,
      "2 Star": 17900,
      "Econ Accomm": 9500
    },
    {
      "Origin": "MO",
      "5 Star": 577600,
      "4 Star": 96500,
      "3 Star": 81200,
      "2 Star": 6400,
      "Econ Accomm": 4000
    },
    {
      "Origin": "TW",
      "5 Star": 255700,
      "4 Star": 149300,
      "3 Star": 74500,
      "2 Star": 10600,
      "Econ Accomm": 3200
    },
    {
      "Origin": "IN",
      "5 Star": 99100,
      "4 Star": 19600,
      "3 Star": 5800,
      "2 Star": 1300,
      "Econ Accomm": 200
    },
    {
      "Origin": "ID",
      "5 Star": 40600,
      "4 Star": 26700,
      "3 Star": 6900,
      "2 Star": 2300,
      "Econ Accomm": 500
    },
    {
      "Origin": "JP",
      "5 Star": 123400,
      "4 Star": 41700,
      "3 Star": 20700,
      "2 Star": 3500,
      "Econ Accomm": 1100
    },
    {
      "Origin": "MY",
      "5 Star": 54500,
      "4 Star": 34800,
      "3 Star": 13900,
      "2 Star": 6900,
      "Econ Accomm": 1500
    },
    {
      "Origin": "KR",
      "5 Star": 320200,
      "4 Star": 144700,
      "3 Star": 27000,
      "2 Star": 7300,
      "Econ Accomm": 1900
    },
    {
      "Origin": "SG",
      "5 Star": 47300,
      "4 Star": 21500,
      "3 Star": 8900,
      "2 Star": 1300,
      "Econ Accomm": 200
    },
    {
      "Origin": "TH",
      "5 Star": 35000,
      "4 Star": 19100,
      "3 Star": 8800,
      "2 Star": 5400,
      "Econ Accomm": 1300
    },
    {
      "Origin": "OAS",
      "5 Star": 40500,
      "4 Star": 22100,
      "3 Star": 13600,
      "2 Star": 5200,
      "Econ Accomm": 2100
    },
    {
      "Origin": "US",
      "5 Star": 50000,
      "4 Star": 15000,
      "3 Star": 5000,
      "2 Star": 1200,
      "Econ Accomm": 200
    },
    {
      "Origin": "OAM",
      "5 Star": 24900,
      "4 Star": 10000,
      "3 Star": 9700,
      "2 Star": 800,
      "Econ Accomm": 200
    },
    {
      "Origin": "UK",
      "5 Star": 18200,
      "4 Star": 6100,
      "3 Star": 1500,
      "2 Star": 300,
      "Econ Accomm": 100
    },
    {
      "Origin": "OE",
      "5 Star": 58300,
      "4 Star": 21800,
      "3 Star": 7900,
      "2 Star": 2600,
      "Econ Accomm": 600
    },
    {
      "Origin": "AU",
      "5 Star": 29700,
      "4 Star": 8800,
      "3 Star": 3900,
      "2 Star": 400,
      "Econ Accomm": 100
    },
    {
      "Origin": "OO",
      "5 Star": 5300,
      "4 Star": 3200,
      "3 Star": 600,
      "2 Star": 100,
      "Econ Accomm": 0
    },
    {
      "Origin": "OT",
      "5 Star": 64300,
      "4 Star": 49900,
      "3 Star": 10700,
      "2 Star": 400,
      "Econ Accomm": 0
    }
  ],
  "2018": [
    {
      "Origin": "CN",
      "5 Star": 4988700,
      "4 Star": 2716400,
      "3 Star": 1562600,
      "2 Star": 273500,
      "Econ Accomm": 175600
    },
    {
      "Origin": "HK",
      "5 Star": 981200,
      "4 Star": 327400,
      "3 Star": 167800,
      "2 Star": 27900,
      "Econ Accomm": 10300
    },
    {
      "Origin": "MO",
      "5 Star": 572100,
      "4 Star": 92000,
      "3 Star": 87500,
      "2 Star": 8400,
      "Econ Accomm": 4100
    },
    {
      "Origin": "TW",
      "5 Star": 262000,
      "4 Star": 130000,
      "3 Star": 64600,
      "2 Star": 15900,
      "Econ Accomm": 4800
    },
    {
      "Origin": "IN",
      "5 Star": 96500,
      "4 Star": 13000,
      "3 Star": 5000,
      "2 Star": 1600,
      "Econ Accomm": 400
    },
    {
      "Origin": "ID",
      "5 Star": 37400,
      "4 Star": 15300,
      "3 Star": 4900,
      "2 Star": 2100,
      "Econ Accomm": 1000
    },
    {
      "Origin": "JP",
      "5 Star": 133900,
      "4 Star": 35300,
      "3 Star": 14200,
      "2 Star": 4200,
      "Econ Accomm": 1700
    },
    {
      "Origin": "MY",
      "5 Star": 56200,
      "4 Star": 30100,
      "3 Star": 13800,
      "2 Star": 8100,
      "Econ Accomm": 2800
    },
    {
      "Origin": "KR",
      "5 Star": 320300,
      "4 Star": 125400,
      "3 Star": 28900,
      "2 Star": 6900,
      "Econ Accomm": 2700
    },
    {
      "Origin": "SG",
      "5 Star": 44300,
      "4 Star": 18600,
      "3 Star": 7200,
      "2 Star": 1300,
      "Econ Accomm": 300
    },
    {
      "Origin": "TH",
      "5 Star": 38800,
      "4 Star": 14200,
      "3 Star": 7700,
      "2 Star": 5200,
      "Econ Accomm": 2100
    },
    {
      "Origin": "OAS",
      "5 Star": 48200,
      "4 Star": 22200,
      "3 Star": 14400,
      "2 Star": 6100,
      "Econ Accomm": 3300
    },
    {
      "Origin": "US",
      "5 Star": 56600,
      "4 Star": 14400,
      "3 Star": 5200,
      "2 Star": 1800,
      "Econ Accomm": 400
    },
    {
      "Origin": "OAM",
      "5 Star": 25800,
      "4 Star": 8500,
      "3 Star": 6300,
      "2 Star": 1100,
      "Econ Accomm": 300
    },
    {
      "Origin": "UK",
      "5 Star": 19300,
      "4 Star": 4600,
      "3 Star": 1200,
      "2 Star": 700,
      "Econ Accomm": 200
    },
    {
      "Origin": "OE",
      "5 Star": 61000,
      "4 Star": 21200,
      "3 Star": 7100,
      "2 Star": 4000,
      "Econ Accomm": 1100
    },
    {
      "Origin": "AU",
      "5 Star": 31400,
      "4 Star": 7900,
      "3 Star": 3500,
      "2 Star": 700,
      "Econ Accomm": 100
    },
    {
      "Origin": "OO",
      "5 Star": 5100,
      "4 Star": 3200,
      "3 Star": 700,
      "2 Star": 200,
      "Econ Accomm": 0
    },
    {
      "Origin": "OT",
      "5 Star": 105100,
      "4 Star": 32500,
      "3 Star": 6200,
      "2 Star": 700,
      "Econ Accomm": 100
    }
  ],
  "2019": [
    {
      "Origin": "CN",
      "5 Star": 5216300,
      "4 Star": 2529400,
      "3 Star": 1641500,
      "2 Star": 239600,
      "Econ Accomm": 197700
    },
    {
      "Origin": "HK",
      "5 Star": 1003800,
      "4 Star": 340000,
      "3 Star": 211700,
      "2 Star": 34100,
      "Econ Accomm": 12500
    },
    {
      "Origin": "MO",
      "5 Star": 437800,
      "4 Star": 85000,
      "3 Star": 75400,
      "2 Star": 7600,
      "Econ Accomm": 4700
    },
    {
      "Origin": "TW",
      "5 Star": 258400,
      "4 Star": 112100,
      "3 Star": 65400,
      "2 Star": 15300,
      "Econ Accomm": 4200
    },
    {
      "Origin": "IN",
      "5 Star": 72100,
      "4 Star": 10800,
      "3 Star": 4900,
      "2 Star": 1700,
      "Econ Accomm": 600
    },
    {
      "Origin": "ID",
      "5 Star": 30800,
      "4 Star": 13900,
      "3 Star": 5400,
      "2 Star": 2100,
      "Econ Accomm": 1100
    },
    {
      "Origin": "JP",
      "5 Star": 132500,
      "4 Star": 36000,
      "3 Star": 17000,
      "2 Star": 5200,
      "Econ Accomm": 1500
    },
    {
      "Origin": "MY",
      "5 Star": 53400,
      "4 Star": 27600,
      "3 Star": 15400,
      "2 Star": 8200,
      "Econ Accomm": 2400
    },
    {
      "Origin": "KR",
      "5 Star": 365800,
      "4 Star": 134200,
      "3 Star": 41500,
      "2 Star": 8600,
      "Econ Accomm": 2800
    },
    {
      "Origin": "SG",
      "5 Star": 40100,
      "4 Star": 15900,
      "3 Star": 8400,
      "2 Star": 1600,
      "Econ Accomm": 300
    },
    {
      "Origin": "TH",
      "5 Star": 37700,
      "4 Star": 14500,
      "3 Star": 8000,
      "2 Star": 5200,
      "Econ Accomm": 1900
    },
    {
      "Origin": "OAS",
      "5 Star": 47700,
      "4 Star": 26600,
      "3 Star": 20600,
      "2 Star": 8500,
      "Econ Accomm": 3900
    },
    {
      "Origin": "US",
      "5 Star": 56600,
      "4 Star": 13400,
      "3 Star": 7000,
      "2 Star": 1700,
      "Econ Accomm": 300
    },
    {
      "Origin": "OAM",
      "5 Star": 24600,
      "4 Star": 8400,
      "3 Star": 4300,
      "2 Star": 1400,
      "Econ Accomm": 200
    },
    {
      "Origin": "UK",
      "5 Star": 15900,
      "4 Star": 4100,
      "3 Star": 1500,
      "2 Star": 600,
      "Econ Accomm": 100
    },
    {
      "Origin": "OE",
      "5 Star": 53900,
      "4 Star": 27100,
      "3 Star": 10400,
      "2 Star": 4600,
      "Econ Accomm": 1000
    },
    {
      "Origin": "AU",
      "5 Star": 27000,
      "4 Star": 6800,
      "3 Star": 4200,
      "2 Star": 800,
      "Econ Accomm": 100
    },
    {
      "Origin": "OO",
      "5 Star": 4700,
      "4 Star": 2400,
      "3 Star": 900,
      "2 Star": 200,
      "Econ Accomm": 0
    },
    {
      "Origin": "OT",
      "5 Star": 63000,
      "4 Star": 23400,
      "3 Star": 3200,
      "2 Star": 800,
      "Econ Accomm": 100
    }
  ],
  "2020": [
    {
      "Origin": "CN",
      "5 Star": 1275300,
      "4 Star": 750100,
      "3 Star": 600900,
      "2 Star": 61700,
      "Econ Accomm": 71700
    },
    {
      "Origin": "HK",
      "5 Star": 132800,
      "4 Star": 67000,
      "3 Star": 63700,
      "2 Star": 8100,
      "Econ Accomm": 3900
    },
    {
      "Origin": "MO",
      "5 Star": 335100,
      "4 Star": 127700,
      "3 Star": 141500,
      "2 Star": 12500,
      "Econ Accomm": 12700
    },
    {
      "Origin": "TW",
      "5 Star": 25800,
      "4 Star": 9700,
      "3 Star": 8500,
      "2 Star": 1500,
      "Econ Accomm": 300
    },
    {
      "Origin": "IN",
      "5 Star": 1900,
      "4 Star": 1300,
      "3 Star": 400,
      "2 Star": 200,
      "Econ Accomm": 0
    },
    {
      "Origin": "ID",
      "5 Star": 2200,
      "4 Star": 700,
      "3 Star": 500,
      "2 Star": 200,
      "Econ Accomm": 100
    },
    {
      "Origin": "JP",
      "5 Star": 8700,
      "4 Star": 4100,
      "3 Star": 1700,
      "2 Star": 500,
      "Econ Accomm": 100
    },
    {
      "Origin": "MY",
      "5 Star": 4100,
      "4 Star": 2300,
      "3 Star": 1300,
      "2 Star": 500,
      "Econ Accomm": 100
    },
    {
      "Origin": "KR",
      "5 Star": 28400,
      "4 Star": 11900,
      "3 Star": 4500,
      "2 Star": 1000,
      "Econ Accomm": 200
    },
    {
      "Origin": "SG",
      "5 Star": 2900,
      "4 Star": 1200,
      "3 Star": 700,
      "2 Star": 100,
      "Econ Accomm": 0
    },
    {
      "Origin": "TH",
      "5 Star": 2900,
      "4 Star": 1000,
      "3 Star": 800,
      "2 Star": 500,
      "Econ Accomm": 100
    },
    {
      "Origin": "OAS",
      "5 Star": 9600,
      "4 Star": 9100,
      "3 Star": 6400,
      "2 Star": 2100,
      "Econ Accomm": 1600
    },
    {
      "Origin": "US",
      "5 Star": 4800,
      "4 Star": 1400,
      "3 Star": 800,
      "2 Star": 200,
      "Econ Accomm": 0
    },
    {
      "Origin": "OAM",
      "5 Star": 2800,
      "4 Star": 1300,
      "3 Star": 600,
      "2 Star": 100,
      "Econ Accomm": 0
    },
    {
      "Origin": "UK",
      "5 Star": 1200,
      "4 Star": 300,
      "3 Star": 600,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OE",
      "5 Star": 4800,
      "4 Star": 3400,
      "3 Star": 1100,
      "2 Star": 400,
      "Econ Accomm": 100
    },
    {
      "Origin": "AU",
      "5 Star": 2900,
      "4 Star": 700,
      "3 Star": 500,
      "2 Star": 100,
      "Econ Accomm": 0
    },
    {
      "Origin": "OO",
      "5 Star": 600,
      "4 Star": 500,
      "3 Star": 100,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OT",
      "5 Star": 13800,
      "4 Star": 4000,
      "3 Star": 500,
      "2 Star": 100,
      "Econ Accomm": 0
    }
  ],
  "2021": [
    {
      "Origin": "CN",
      "5 Star": 2712300,
      "4 Star": 1269300,
      "3 Star": 1191700,
      "2 Star": 112500,
      "Econ Accomm": 93800
    },
    {
      "Origin": "HK",
      "5 Star": 102200,
      "4 Star": 73300,
      "3 Star": 45900,
      "2 Star": 11500,
      "Econ Accomm": 4700
    },
    {
      "Origin": "MO",
      "5 Star": 456000,
      "4 Star": 222200,
      "3 Star": 140000,
      "2 Star": 42200,
      "Econ Accomm": 31900
    },
    {
      "Origin": "TW",
      "5 Star": 19500,
      "4 Star": 9100,
      "3 Star": 6200,
      "2 Star": 600,
      "Econ Accomm": 400
    },
    {
      "Origin": "IN",
      "5 Star": 200,
      "4 Star": 600,
      "3 Star": 200,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "ID",
      "5 Star": 600,
      "4 Star": 700,
      "3 Star": 800,
      "2 Star": 100,
      "Econ Accomm": 300
    },
    {
      "Origin": "JP",
      "5 Star": 200,
      "4 Star": 200,
      "3 Star": 0,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "MY",
      "5 Star": 1200,
      "4 Star": 800,
      "3 Star": 500,
      "2 Star": 100,
      "Econ Accomm": 100
    },
    {
      "Origin": "KR",
      "5 Star": 500,
      "4 Star": 300,
      "3 Star": 100,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "SG",
      "5 Star": 500,
      "4 Star": 400,
      "3 Star": 100,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "TH",
      "5 Star": 200,
      "4 Star": 100,
      "3 Star": 200,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OAS",
      "5 Star": 9600,
      "4 Star": 14100,
      "3 Star": 9100,
      "2 Star": 2200,
      "Econ Accomm": 3800
    },
    {
      "Origin": "US",
      "5 Star": 1600,
      "4 Star": 200,
      "3 Star": 100,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OAM",
      "5 Star": 900,
      "4 Star": 600,
      "3 Star": 200,
      "2 Star": 0,
      "Econ Accomm": 200
    },
    {
      "Origin": "UK",
      "5 Star": 200,
      "4 Star": 100,
      "3 Star": 300,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OE",
      "5 Star": 1100,
      "4 Star": 400,
      "3 Star": 200,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "AU",
      "5 Star": 600,
      "4 Star": 200,
      "3 Star": 300,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OO",
      "5 Star": 100,
      "4 Star": 200,
      "3 Star": 0,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OT",
      "5 Star": 14400,
      "4 Star": 4600,
      "3 Star": 3300,
      "2 Star": 0,
      "Econ Accomm": 0
    }
  ],
  "2022": [
    {
      "Origin": "CN",
      "5 Star": 1829100,
      "4 Star": 1004800,
      "3 Star": 804700,
      "2 Star": 169800,
      "Econ Accomm": 58400
    },
    {
      "Origin": "HK",
      "5 Star": 97000,
      "4 Star": 75200,
      "3 Star": 34600,
      "2 Star": 15700,
      "Econ Accomm": 4200
    },
    {
      "Origin": "MO",
      "5 Star": 432400,
      "4 Star": 247000,
      "3 Star": 121900,
      "2 Star": 63700,
      "Econ Accomm": 41600
    },
    {
      "Origin": "TW",
      "5 Star": 21300,
      "4 Star": 10000,
      "3 Star": 5900,
      "2 Star": 1100,
      "Econ Accomm": 500
    },
    {
      "Origin": "IN",
      "5 Star": 200,
      "4 Star": 400,
      "3 Star": 200,
      "2 Star": 100,
      "Econ Accomm": 100
    },
    {
      "Origin": "ID",
      "5 Star": 700,
      "4 Star": 700,
      "3 Star": 500,
      "2 Star": 100,
      "Econ Accomm": 300
    },
    {
      "Origin": "JP",
      "5 Star": 1100,
      "4 Star": 400,
      "3 Star": 200,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "MY",
      "5 Star": 1300,
      "4 Star": 800,
      "3 Star": 400,
      "2 Star": 100,
      "Econ Accomm": 300
    },
    {
      "Origin": "KR",
      "5 Star": 1100,
      "4 Star": 400,
      "3 Star": 400,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "SG",
      "5 Star": 600,
      "4 Star": 400,
      "3 Star": 200,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "TH",
      "5 Star": 400,
      "4 Star": 200,
      "3 Star": 100,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OAS",
      "5 Star": 8000,
      "4 Star": 14400,
      "3 Star": 5600,
      "2 Star": 1800,
      "Econ Accomm": 3800
    },
    {
      "Origin": "US",
      "5 Star": 2200,
      "4 Star": 500,
      "3 Star": 300,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OAM",
      "5 Star": 1400,
      "4 Star": 600,
      "3 Star": 200,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "UK",
      "5 Star": 600,
      "4 Star": 200,
      "3 Star": 100,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OE",
      "5 Star": 1800,
      "4 Star": 700,
      "3 Star": 400,
      "2 Star": 100,
      "Econ Accomm": 0
    },
    {
      "Origin": "AU",
      "5 Star": 1000,
      "4 Star": 600,
      "3 Star": 200,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OO",
      "5 Star": 100,
      "4 Star": 100,
      "3 Star": 100,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OT",
      "5 Star": 11100,
      "4 Star": 4400,
      "3 Star": 2500,
      "2 Star": 0,
      "Econ Accomm": 0
    }
  ],
  "2023": [
    {
      "Origin": "CN",
      "5 Star": 5088800,
      "4 Star": 2384400,
      "3 Star": 1583900,
      "2 Star": 537100,
      "Econ Accomm": 249300
    },
    {
      "Origin": "HK",
      "5 Star": 1340000,
      "4 Star": 491300,
      "3 Star": 319500,
      "2 Star": 53900,
      "Econ Accomm": 14300
    },
    {
      "Origin": "MO",
      "5 Star": 273400,
      "4 Star": 144500,
      "3 Star": 75900,
      "2 Star": 45100,
      "Econ Accomm": 11300
    },
    {
      "Origin": "TW",
      "5 Star": 145600,
      "4 Star": 59400,
      "3 Star": 37800,
      "2 Star": 9100,
      "Econ Accomm": 4500
    },
    {
      "Origin": "IN",
      "5 Star": 26500,
      "4 Star": 5800,
      "3 Star": 2600,
      "2 Star": 1500,
      "Econ Accomm": 400
    },
    {
      "Origin": "ID",
      "5 Star": 20800,
      "4 Star": 8300,
      "3 Star": 4400,
      "2 Star": 2000,
      "Econ Accomm": 800
    },
    {
      "Origin": "JP",
      "5 Star": 29100,
      "4 Star": 14600,
      "3 Star": 6600,
      "2 Star": 3200,
      "Econ Accomm": 1100
    },
    {
      "Origin": "MY",
      "5 Star": 27500,
      "4 Star": 14800,
      "3 Star": 7900,
      "2 Star": 4700,
      "Econ Accomm": 2300
    },
    {
      "Origin": "KR",
      "5 Star": 96800,
      "4 Star": 37600,
      "3 Star": 21000,
      "2 Star": 2400,
      "Econ Accomm": 1900
    },
    {
      "Origin": "SG",
      "5 Star": 31500,
      "4 Star": 12700,
      "3 Star": 7000,
      "2 Star": 2400,
      "Econ Accomm": 1000
    },
    {
      "Origin": "TH",
      "5 Star": 28000,
      "4 Star": 10500,
      "3 Star": 5700,
      "2 Star": 4000,
      "Econ Accomm": 2500
    },
    {
      "Origin": "OAS",
      "5 Star": 25400,
      "4 Star": 12800,
      "3 Star": 11600,
      "2 Star": 7100,
      "Econ Accomm": 4400
    },
    {
      "Origin": "US",
      "5 Star": 25700,
      "4 Star": 8000,
      "3 Star": 4700,
      "2 Star": 1500,
      "Econ Accomm": 500
    },
    {
      "Origin": "OAM",
      "5 Star": 13900,
      "4 Star": 5800,
      "3 Star": 2900,
      "2 Star": 1500,
      "Econ Accomm": 400
    },
    {
      "Origin": "UK",
      "5 Star": 8400,
      "4 Star": 1900,
      "3 Star": 1100,
      "2 Star": 500,
      "Econ Accomm": 100
    },
    {
      "Origin": "OE",
      "5 Star": 22300,
      "4 Star": 13400,
      "3 Star": 4800,
      "2 Star": 3400,
      "Econ Accomm": 1200
    },
    {
      "Origin": "AU",
      "5 Star": 12800,
      "4 Star": 4000,
      "3 Star": 2600,
      "2 Star": 600,
      "Econ Accomm": 200
    },
    {
      "Origin": "OO",
      "5 Star": 2500,
      "4 Star": 900,
      "3 Star": 500,
      "2 Star": 400,
      "Econ Accomm": 100
    },
    {
      "Origin": "OT",
      "5 Star": 23200,
      "4 Star": 11900,
      "3 Star": 10900,
      "2 Star": 400,
      "Econ Accomm": 300
    }
  ],
  "2024": [
    {
      "Origin": "CN",
      "5 Star": 460000,
      "4 Star": 228800,
      "3 Star": 173100,
      "2 Star": 67000,
      "Econ Accomm": 35200
    },
    {
      "Origin": "HK",
      "5 Star": 82100,
      "4 Star": 31400,
      "3 Star": 33800,
      "2 Star": 4000,
      "Econ Accomm": 1400
    },
    {
      "Origin": "MO",
      "5 Star": 20000,
      "4 Star": 12300,
      "3 Star": 5500,
      "2 Star": 3800,
      "Econ Accomm": 1300
    },
    {
      "Origin": "TW",
      "5 Star": 14000,
      "4 Star": 7700,
      "3 Star": 3800,
      "2 Star": 2000,
      "Econ Accomm": 1200
    },
    {
      "Origin": "IN",
      "5 Star": 3900,
      "4 Star": 700,
      "3 Star": 700,
      "2 Star": 300,
      "Econ Accomm": 0
    },
    {
      "Origin": "ID",
      "5 Star": 1000,
      "4 Star": 600,
      "3 Star": 200,
      "2 Star": 200,
      "Econ Accomm": 100
    },
    {
      "Origin": "JP",
      "5 Star": 3300,
      "4 Star": 1600,
      "3 Star": 600,
      "2 Star": 400,
      "Econ Accomm": 200
    },
    {
      "Origin": "MY",
      "5 Star": 1600,
      "4 Star": 900,
      "3 Star": 300,
      "2 Star": 600,
      "Econ Accomm": 200
    },
    {
      "Origin": "KR",
      "5 Star": 17700,
      "4 Star": 5200,
      "3 Star": 2300,
      "2 Star": 600,
      "Econ Accomm": 400
    },
    {
      "Origin": "SG",
      "5 Star": 2200,
      "4 Star": 800,
      "3 Star": 300,
      "2 Star": 200,
      "Econ Accomm": 100
    },
    {
      "Origin": "TH",
      "5 Star": 1700,
      "4 Star": 900,
      "3 Star": 200,
      "2 Star": 300,
      "Econ Accomm": 100
    },
    {
      "Origin": "OAS",
      "5 Star": 3300,
      "4 Star": 1300,
      "3 Star": 700,
      "2 Star": 1500,
      "Econ Accomm": 700
    },
    {
      "Origin": "US",
      "5 Star": 1700,
      "4 Star": 700,
      "3 Star": 300,
      "2 Star": 200,
      "Econ Accomm": 100
    },
    {
      "Origin": "OAM",
      "5 Star": 800,
      "4 Star": 500,
      "3 Star": 200,
      "2 Star": 200,
      "Econ Accomm": 100
    },
    {
      "Origin": "UK",
      "5 Star": 700,
      "4 Star": 200,
      "3 Star": 100,
      "2 Star": 100,
      "Econ Accomm": 0
    },
    {
      "Origin": "OE",
      "5 Star": 1900,
      "4 Star": 1500,
      "3 Star": 600,
      "2 Star": 500,
      "Econ Accomm": 200
    },
    {
      "Origin": "AU",
      "5 Star": 800,
      "4 Star": 300,
      "3 Star": 200,
      "2 Star": 100,
      "Econ Accomm": 0
    },
    {
      "Origin": "OO",
      "5 Star": 100,
      "4 Star": 0,
      "3 Star": 100,
      "2 Star": 0,
      "Econ Accomm": 0
    },
    {
      "Origin": "OT",
      "5 Star": 1600,
      "4 Star": 300,
      "3 Star": 900,
      "2 Star": 0,
      "Econ Accomm": 0
    }
  

  ]
};
const hotelCategories = ['5 Star', '4 Star', '3 Star', '2 Star', 'Econ Accomm'];
const colors = ['#5470c6', '#92cc75', '#ebbd55', '#ee6666', '#73c0de'];

const currentYear = ref(2013);
const isMainlandChinaVisible = ref(false);
const isHongKongVisible = ref(false);
const isMacauVisible = ref(false);

const chart = ref<echarts.EChartsType | null>(null);

const marks = {
2013: '2013',
2014: '2014',
2015: '2015',
2016: '2016',
2017: '2017',
2018: '2018',
2019: '2019',
2020: '2020',
2021: '2021',
2022: '2022',
2023: '2023',
2024: '2024'
};

const updateChart = () => {
  if (!chart.value) return;
  const yearData = dataByYear[currentYear.value];
  const filteredData = yearData.filter(item => 
    (isMainlandChinaVisible.value || item.Origin !== 'CN') &&
    (isHongKongVisible.value || item.Origin !== 'HK') &&
	(isMacauVisible.value || item.Origin !== 'MO')
  );
  const origins = filteredData.map(item => item.Origin);
  const seriesData = hotelCategories.map((category, index) => ({
    name: category,
    type: 'bar',
    stack: 'total',
    label: { show: false },
    emphasis: { focus: 'series' },
    data: filteredData.map(item => item[category] || 0),
    itemStyle: { color: colors[index] },
  }));
  
  const option = {
    textStyle: {
	    fontSize: 8, // 可以根据需要调整字体大小
		color: '#6b7280',
    },
	toolbox:{
		feature:{
			saveAsImage:{}
		},
	bottom:'40%',
	},
  tooltip: {
      trigger: 'item',
          formatter: function (params) {
            const originShort = params.name; // Get the short form (e.g., "CN")
            const originFull = originFullNames[originShort] || originShort; // Map to full name or fallback to short
            const originData = filteredData.find(item => item.Origin === originShort);
            if (originData) {
              const totalValue = hotelCategories.reduce((sum, category) => sum + (originData[category] || 0), 0);
              const value = originData[params.seriesName];
              const percentage = ((value / totalValue) * 100).toFixed(2);
              return `
                <strong>${originFull}</strong><br/>
                ${params.seriesName} <br/>
                Value: ${value}<br/>
                Percentage: ${percentage}%
              `;
            }
        return '';
          },
      },
    legend: {
      data: hotelCategories,
      itemWidth: 8, // 设置图例标记的宽度
      itemHeight: 4, // 设置图例标记的高度
	  textStyle: {
        fontSize: 8, // 设置图例文字的大小
        color: 'grey', // 设置图例文字的颜色
      },
      top: '0%',  // Adjust this value to move the legend up or down
    },
    grid: { left: '3%', right: '4%', bottom: '5%', top: '4%', containLabel: true },
    xAxis: { 
      type: 'value',
      name: 'Person-Time',
      nameLocation: 'middle',
      nameGap: 15,
	  nameTextStyle: {  color: "#6b7280" },
      axisLabel:{
		fontSize: 8,
      	color: "#6b7280"
      }
    },
    yAxis: { type: 'category', data: origins, name: 'Origins of the visitors', 
		axisLabel:{
			fontSize: 8,
			color: "#6b7280"
		},
		nameLocation: 'middle', nameGap: 30 },
    series: seriesData,
  };
  
  chart.value.setOption(option);
};

const toggleMainlandChina = () => {
  isMainlandChinaVisible.value = !isMainlandChinaVisible.value;
  updateChart();
};

const toggleHongKong = () => {
  isHongKongVisible.value = !isHongKongVisible.value;
  updateChart();
};

const toggleMacau = () => {
  isMacauVisible.value = !isMacauVisible.value;
  updateChart();
};

onMounted(() => {
  const chartEl = document.getElementById('chart');
  if (chartEl) {
    chart.value = echarts.init(chartEl);
    updateChart();
  }
});
</script>

<style scoped>
/* Main container to hold both slider and chart containers side by side */
.main-container {
  display: flex;
}

/* Slider container styling */
.slider-container {
  margin-right: 20px;
}

/* Chart container styling */
.chart-container {
  position: relative;
  width: 600px; /* Adjust width as needed */
}

/* Chart styling */
#chart {
  width: 100%;
  height: 250px;
}

/* Toggle buttons positioned in the top-right corner of the chart */
.toggle-buttons {
  position: absolute;
  top: 10px;   /* Adjust as needed */
  right: 10px; /* Adjust as needed */
  display: flex;
  flex-direction: column;
  --_clr-primary: #666;
  --_clr-hover: #f33195;
  --_clr-checked: #127acf;
}
.vertical-slider {
  width: 15px;
  height: 250px; /* 根据需要调整高度 */
  margin-right: 30px; /* 右侧边距 */
}

::v-deep .el-slider__marks-text {
  font-size: 8px; /* 设置字体大小 */
  color: grey; /* 设置字体颜色 */
  }
</style>
