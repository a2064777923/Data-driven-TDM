<template>
  <div class="bg-gray-100 min-w-max flex flex-col items-center justify-center">
      <div id="myChart" ref="visitorsChart" class="h-96 bg-white min-w-max shadow-md"></div>
      <div class="button-container mt-2 ">
        <el-button type="primary" @click="toggle">{{ isPaused ? 'Resume' : 'Pause' }}</el-button>
      </div>
   </div>
</template>

<script>
import { onMounted,onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'element-plus/dist/index.css';

export default {
  setup() {
	const visitorsChart = ref(null);
	let myChart = null;
    const isPaused = ref(false);
    let chart;
    let interval;
    const data = [
      {
    "year": "2013",
    "values": {
      "Philippines": 159907,
      "India": 208378,
      "Indonesia": 290462,
      "Japan": 290941,
      "Malaysia": 273924,
      "Korea": 473965,
      "Singapore": 189617,
      "Thailand": 238497,
      "Vietnam": 17117,
      "Other Asia": 66131,
      "Brazi": 9782,
      "Canada": 74159,
      "USA": 179399,
      "Other America": 26604,
      "Germany": 43467,
      "Spain": 29696,
      "Russia": 11709,
      "France": 13479,
      "Netherlands": 16033,
      "Italy": 30533,
      "Portugal": 8788,
      "UK": 7653,
      "Switzerland": 61332,
      "Other Europe": 50216,
      "Australia": 109541,
      "New Zealand": 14396,
      "Other Oceania": 1387,
      "South Africa": 4976,
      "Other": 26341
    }
  },
   {
    "year": "2014",
    "values": {
      "Philippines": 167136,
      "India": 189108,
      "Indonesia": 299741,
      "Japan": 249940,
      "Malaysia": 262749,
      "Korea": 554290,
      "Singapore": 196407,
      "Thailand": 175811,
      "Vietnam": 14221,
      "Other Asia": 70401,
      "Brazi": 9671,
      "Canada": 70569,
      "USA": 181360,
      "Other America": 24736,
      "Germany": 40032,
      "Spain": 28170,
      "Russia": 12181,
      "France": 13751,
      "Netherlands": 15869,
      "Italy": 31901,
      "Portugal": 9251,
      "UK": 7228,
      "Switzerland": 60774,
      "Other Europe": 50754,
      "Australia": 105889,
      "New Zealand": 14558,
      "Other Oceania": 1430,
      "South Africa": 5672,
      "Other": 30169
    }
  },
   {
    "year": "2015",
    "values": {
      "Philippines": 276719,
      "India": 167542,
      "Indonesia": 163311,
      "Japan": 282138,
      "Malaysia": 229032,
      "Korea": 553991,
      "Singapore": 158753,
      "Thailand": 180764,
      "Vietnam": 16122,
      "Other Asia": 70503,
      "Brazi": 9470,
      "Canada": 70928,
      "USA": 182429,
      "Other America": 24151,
      "Germany": 27590,
      "Spain": 9022,
      "Russia": 22839,
      "France": 40994,
      "Netherlands": 10964,
      "Italy": 13683,
      "Portugal": 15158,
      "UK": 59995,
      "Switzerland": 7377,
      "Other Europe": 50102,
      "Australia": 92397,
      "New Zealand": 13567,
      "Other Oceania": 1374,
      "South Africa": 5529,
      "Other": 26003
    }
  },
    {
    "year": "2016",
    "values": {
      "Philippines": 287016,
      "India": 165265,
      "Indonesia": 182416,
      "Japan": 300536,
      "Malaysia": 222745,
      "Korea": 662114,
      "Singapore": 155732,
      "Thailand": 236081,
      "Vietnam": 11108,
      "Other Asia": 70754,
      "Brazi": 9968,
      "Canada": 75130,
      "USA": 190818,
      "Other America": 24502,
      "Germany": 29963,
      "Spain": 9682,
      "Russia": 25143,
      "France": 42701,
      "Netherlands": 11411,
      "Italy": 13793,
      "Portugal": 15620,
      "UK": 61312,
      "Switzerland": 7695,
      "Other Europe": 55202,
      "Australia": 93278,
      "New Zealand": 13727,
      "Other Oceania": 1401,
      "South Africa": 5219,
      "Other": 22375
    }
  },
    {
  "year": "2017",
  "values": {
    "Philippines": 307016,
    "India": 148038,
    "Indonesia": 197052,
    "Japan": 328805,
    "Malaysia": 218178,
    "Korea": 873763,
    "Singapore": 142990,
    "Thailand": 198119,
    "Vietnam": 6889,
    "Other Asia": 73803,
    "Brazi": 11010,
    "Canada": 74206,
    "USA": 186313,
    "Other America": 26019,
    "Germany": 28700,
    "Spain": 9339,
    "Russia": 27028,
    "France": 40395,
    "Netherlands": 10873,
    "Italy": 13850,
    "Portugal": 16258,
    "UK": 57122,
    "Switzerland": 7447,
    "Other Europe": 57104,
    "Australia": 88973,
    "New Zealand": 13701,
    "Other Oceania": 1423,
    "South Africa": 5414,
    "Other": 20379
  }
},

  {
    "year": "2018",
    "values": {

      "Philippines": 311899,
      "India": 147804,
      "Indonesia": 173735,
      "Japan": 325636,
      "Malaysia": 227731,
      "Korea": 812423,
      "Singapore": 134766,
      "Thailand": 181271,
      "Vietnam": 6852,
      "Other Asia": 106379,
      "Brazi": 11621,
      "Canada": 74220,
      "USA": 201737,
      "Other America": 28843,
      "Germany": 29459,
      "Spain": 10621,
      "Russia": 30779,
      "France": 38887,
      "Netherlands": 11690,
      "Italy": 14617,
      "Portugal": 15598,
      "UK": 58326,
      "Switzerland": 6816,
      "Other Europe": 60696,
      "Australia": 90903,
      "New Zealand": 14377,
      "Other Oceania": 1583,
      "South Africa": 6357,
      "Other": 19791
    }
  },
{
    "year": "2019",
    "values": {
      "Philippines": 422923,
      "India": 127310,
      "Indonesia": 169891,
      "Japan": 295664,
      "Malaysia": 206186,
      "Korea": 742756,
      "Singapore": 115695,
      "Thailand": 151439,
      "Vietnam": 6257,
      "Other Asia": 107143,
      "Brazi": 12767,
      "Canada": 75020,
      "USA": 199733,
      "Other America": 29171,
      "Germany": 29813,
      "Spain": 10324,
      "Russia": 31311,
      "France": 36583,
      "Netherlands": 12163,
      "Italy": 15450,
      "Portugal": 15945,
      "UK": 59286,
      "Switzerland": 6460,
      "Other Europe": 60465,
      "Australia": 84034,
      "New Zealand": 14902,
      "Other Oceania": 1463,
      "South Africa": 6568,
      "Other": 19882
    }
  },
{
    "year": "2020",
    "values": {
      "Philippines": 31998,
      "India": 5046,
      "Indonesia": 12877,
      "Japan": 15191,
      "Malaysia": 9447,
      "Korea": 44433,
      "Singapore": 5997,
      "Thailand": 7419,
      "Vietnam": 494,
      "Other Asia": 7464,
      "Brazi": 1111,
      "Canada": 6175,
      "USA": 13490,
      "Other America": 2424,
      "Germany": 1880,
      "Spain": 710,
      "Russia": 4108,
      "France": 2337,
      "Netherlands": 648,
      "Italy": 932,
      "Portugal": 1141,
      "UK": 3681,
      "Switzerland": 430,
      "Other Europe": 4477,
      "Australia": 7916,
      "New Zealand": 1444,
      "Other Oceania": 142,
      "South Africa": 646,
      "Other": 1388
    }
  },
{
    "year": "2021",
    "values": {
      "Philippines": 26,
      "India": 2,
      "Indonesia": 9,
      "Japan": 64,
      "Malaysia": 40,
      "Korea": 22,
      "Singapore": 38,
      "Thailand": 7,
      "Vietnam": 4,
      "Other Asia": 29,
      "Brazi": 26,
      "Canada": 125,
      "USA": 171,
      "Other America": 95,
      "Germany": 21,
      "Spain": 2,
      "Russia": 12,
      "France": 38,
      "Netherlands": 4,
      "Italy": 14,
      "Portugal": 9,
      "UK": 27,
      "Switzerland": 3,
      "Other Europe": 26,
      "Australia": 72,
      "New Zealand": 8,
      "Other Oceania": 10,
      "South Africa": 4,
      "Other": 9
    }
  },
  {
    "year": "2022",
    "values": {
      "Philippines": 162,
      "India": 114,
      "Indonesia": 64,
      "Japan": 1681,
      "Malaysia": 857,
      "Korea": 1749,
      "Singapore": 643,
      "Thailand": 120,
      "Vietnam": 31,
      "Other Asia": 244,
      "Brazi": 226,
      "Canada": 1201,
      "USA": 1780,
      "Other America": 375,
      "Germany": 422,
      "Spain": 102,
      "Russia": 339,
      "France": 330,
      "Netherlands": 108,
      "Italy": 141,
      "Portugal": 203,
      "UK": 662,
      "Switzerland": 27,
      "Other Europe": 625,
      "Australia": 946,
      "New Zealand": 165,
      "Other Oceania": 10,
      "South Africa": 162,
      "Other": 164
    }
  },
   {
    "year": "2023",
    "values": {
      "Philippines": 314173,
      "India": 58827,
      "Indonesia": 142949,
      "Japan": 75157,
      "Malaysia": 99850,
      "Korea": 204607,
      "Singapore": 91866,
      "Thailand": 102161,
      "Vietnam": 1817,
      "Other Asia": 37781,
      "Brazi": 5625,
      "Canada": 40768,
      "USA": 93819,
      "Other America": 12210,
      "Germany": 11401,
      "Spain": 4517,
      "Russia": 13948,
      "France": 17006,
      "Netherlands": 7158,
      "Italy": 5997,
      "Portugal": 6014,
      "UK": 28988,
      "Switzerland": 2560,
      "Other Europe": 20687,
      "Australia": 39635,
      "New Zealand": 6990,
      "Other Oceania": 762,
      "South Africa": 2903,
      "Other": 9424
    }
  }];
    let currentIndex = 0;

    const regionColors = {
      "Philippines": '#36A2EB',
      "India": '#FFCE56',
      "Indonesia": '#4BC0C0',
      "Japan": '#9966FF',
      "Malaysia": '#FF9F40',
      "Korea": '#FF6384',
      "Singapore": '#36A2EB',
      "Thailand": '#FFCE56',
      "Vietnam": '#4BC0C0',
      "Other Asia": '#9966FF',
      "Brazil": '#FF9F40',
      "Canada": '#FF6384',
      "USA": '#36A2EB',
      "Other America": '#FFCE56',
      "Germany": '#4BC0C0',
      "Spain": '#9966FF',
      "Russia": '#FF9F40',
      "France": '#FF6384',
      "Netherlands": '#36A2EB',
      "Italy": '#FFCE56',
      "Portugal": '#4BC0C0',
      "UK": '#9966FF',
      "Switzerland": '#FF9F40',
      "Other Europe": '#FF6384',
      "Australia": '#36A2EB',
      "New Zealand": '#FFCE56',
      "Other Oceania": '#4BC0C0',
      "South Africa": '#9966FF',
      "Other": '#FF9F40'
    };

    const updateChart = () => {
      // Ensure the data is sorted and sliced
      const currentData = data[currentIndex];
      const sortedData = Object.entries(currentData.values).sort((a, b) => b[1] - a[1]).slice(0, 15);

      const option = {
        title: {
          text: 'Non-native visitors to Macau - ' + currentData.year,
          left: 'center',
          textStyle: {
            fontSize: 24,
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            color: '#666'
          }
        },
        yAxis: {
          type: 'category',
          data: sortedData.map(item => item[0]),
          axisLabel: {
            interval: 0,
            rotate: 30,
            color: '#666'
          },
          inverse: true
        },
        series: [{
          type: 'bar',
          data: sortedData.map(item => ({
            value: item[1],
            label: {
              show: true,
              position: 'right',
              formatter: '{c}',
              color: '#333'
            },
            itemStyle: {
              color: regionColors[item[0]]
            }
          })),
          itemStyle: {
            borderRadius: [5, 5, 0, 0]
          }
        }],
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'quinticInOut'
      };

      myChart.setOption(option);
      currentIndex = (currentIndex + 1) % data.length;
    };

    const startInterval = () => {
      interval = setInterval(updateChart, 2000);
    };

    const toggle = () => {
      if (isPaused.value) {
        startInterval();
      } else {
        clearInterval(interval);
      }
      isPaused.value = !isPaused.value;
    };

    onMounted(() => {
      myChart = echarts.init(visitorsChart.value);
      startInterval();
    });
	
	onUnmounted(()=>{
		if(myChart){
			myChart.dispose();
			clearInterval(interval);
		}
	});

    return {
      toggle,
      isPaused,
	  visitorsChart
    };
  }
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
}
#myChart{
	width: 600px;
}
</style>
