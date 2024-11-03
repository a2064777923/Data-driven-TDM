<template>
  <div>
    <el-select size="small" v-model="selectedYear" @change="onYearChange">
      <el-option
        v-for="year in years"
        :key="year"
        :label="year"
        :value="year"
      />
    </el-select>
    <div ref="chartContainer" style="width: 500px; height: 240px"></div>
	<el-button size="small" @click="toggleCarousel">
	  {{ isRunning ? 'Stop Play' : 'Auto Play' }}
	</el-button>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      years: [],
      selectedYear: null,
      isRunning: false,
      intervalId: null,
      currentYearIndex: 0,
      jsonData: {"years":[2015,2016,2017,2018,2019,2020,2021,2022,2023],"data":[{"year":2015,"origin":"China_Continental","garment":177,"jewelry":130,"food":267,"cosmetic":212,"footwear":121,"other":144},{"year":2015,"origin":"Hong_Kong","garment":13,"jewelry":1,"food":119,"cosmetic":2,"footwear":5,"other":2},{"year":2015,"origin":"Taiwan","garment":78,"jewelry":9,"food":212,"cosmetic":16,"footwear":28,"other":23},{"year":2015,"origin":"Japan","garment":10,"jewelry":6,"food":128,"cosmetic":2,"footwear":11,"other":11},{"year":2015,"origin":"Southeast_Asia","garment":69,"jewelry":5,"food":227,"cosmetic":16,"footwear":19,"other":8},{"year":2015,"origin":"Malaysia","garment":67,"jewelry":5,"food":306,"cosmetic":15,"footwear":17,"other":6},{"year":2015,"origin":"Singapore","garment":69,"jewelry":1,"food":318,"cosmetic":12,"footwear":22,"other":9},{"year":2015,"origin":"Thailand","garment":57,"jewelry":7,"food":189,"cosmetic":32,"footwear":28,"other":11},{"year":2015,"origin":"Other_Southeast_Asia","garment":74,"jewelry":5,"food":172,"cosmetic":11,"footwear":15,"other":7},{"year":2015,"origin":"America","garment":36,"jewelry":0,"food":143,"cosmetic":7,"footwear":5,"other":14},{"year":2015,"origin":"the_United_states","garment":35,"jewelry":0,"food":131,"cosmetic":5,"footwear":5,"other":8},{"year":2015,"origin":"Other_Americas","garment":37,"jewelry":1,"food":162,"cosmetic":10,"footwear":7,"other":25},{"year":2015,"origin":"Europe","garment":29,"jewelry":3,"food":72,"cosmetic":8,"footwear":12,"other":8},{"year":2015,"origin":"England","garment":43,"jewelry":5,"food":102,"cosmetic":8,"footwear":6,"other":13},{"year":2015,"origin":"Other_Europe","garment":25,"jewelry":2,"food":62,"cosmetic":8,"footwear":14,"other":6},{"year":2015,"origin":"Oceania","garment":45,"jewelry":1,"food":124,"cosmetic":6,"footwear":14,"other":9},{"year":2015,"origin":"Australia","garment":51,"jewelry":0,"food":131,"cosmetic":7,"footwear":13,"other":10},{"year":2015,"origin":"Other_Oceania","garment":14,"jewelry":10,"food":79,"cosmetic":1,"footwear":21,"other":1},{"year":2015,"origin":"Others","garment":42,"jewelry":1,"food":107,"cosmetic":3,"footwear":14,"other":5},{"year":2016,"origin":"China_Continental","garment":155,"jewelry":136,"food":259,"cosmetic":234,"footwear":110,"other":128},{"year":2016,"origin":"Hong_Kong","garment":16,"jewelry":2,"food":129,"cosmetic":4,"footwear":6,"other":4},{"year":2016,"origin":"Taiwan","garment":77,"jewelry":8,"food":228,"cosmetic":19,"footwear":41,"other":19},{"year":2016,"origin":"Japan","garment":23,"jewelry":1,"food":123,"cosmetic":6,"footwear":24,"other":5},{"year":2016,"origin":"Southeast_Asia","garment":64,"jewelry":6,"food":197,"cosmetic":9,"footwear":23,"other":14},{"year":2016,"origin":"Malaysia","garment":68,"jewelry":9,"food":309,"cosmetic":7,"footwear":16,"other":7},{"year":2016,"origin":"Singapore","garment":58,"jewelry":1,"food":303,"cosmetic":10,"footwear":16,"other":7},{"year":2016,"origin":"Thailand","garment":62,"jewelry":4,"food":147,"cosmetic":17,"footwear":32,"other":23},{"year":2016,"origin":"Other_Southeast_Asia","garment":66,"jewelry":7,"food":137,"cosmetic":5,"footwear":23,"other":16},{"year":2016,"origin":"America","garment":27,"jewelry":2,"food":113,"cosmetic":13,"footwear":12,"other":8},{"year":2016,"origin":"the_United_states","garment":26,"jewelry":3,"food":112,"cosmetic":5,"footwear":8,"other":5},{"year":2016,"origin":"Other_Americas","garment":30,"jewelry":1,"food":115,"cosmetic":28,"footwear":19,"other":14},{"year":2016,"origin":"Europe","garment":30,"jewelry":1,"food":58,"cosmetic":3,"footwear":7,"other":6},{"year":2016,"origin":"England","garment":29,"jewelry":0,"food":88,"cosmetic":6,"footwear":6,"other":6},{"year":2016,"origin":"Other_Europe","garment":30,"jewelry":1,"food":49,"cosmetic":2,"footwear":8,"other":6},{"year":2016,"origin":"Oceania","garment":40,"jewelry":1,"food":89,"cosmetic":5,"footwear":20,"other":5},{"year":2016,"origin":"Australia","garment":43,"jewelry":2,"food":98,"cosmetic":3,"footwear":24,"other":6},{"year":2016,"origin":"Other_Oceania","garment":22,"jewelry":0,"food":32,"cosmetic":13,"footwear":0,"other":1},{"year":2016,"origin":"Others","garment":40,"jewelry":5,"food":104,"cosmetic":9,"footwear":13,"other":4},{"year":2017,"origin":"China_Continental","garment":143,"jewelry":130,"food":298,"cosmetic":334,"footwear":127,"other":119},{"year":2017,"origin":"Hong_Kong","garment":17,"jewelry":2,"food":138,"cosmetic":4,"footwear":7,"other":6},{"year":2017,"origin":"Taiwan","garment":62,"jewelry":11,"food":247,"cosmetic":19,"footwear":39,"other":19},{"year":2017,"origin":"Japan","garment":35,"jewelry":2,"food":160,"cosmetic":4,"footwear":9,"other":3},{"year":2017,"origin":"Southeast_Asia","garment":76,"jewelry":6,"food":222,"cosmetic":12,"footwear":28,"other":9},{"year":2017,"origin":"Malaysia","garment":61,"jewelry":15,"food":323,"cosmetic":16,"footwear":17,"other":6},{"year":2017,"origin":"Singapore","garment":54,"jewelry":5,"food":303,"cosmetic":10,"footwear":25,"other":9},{"year":2017,"origin":"Thailand","garment":60,"jewelry":4,"food":181,"cosmetic":20,"footwear":41,"other":8},{"year":2017,"origin":"Other_Southeast_Asia","garment":94,"jewelry":4,"food":175,"cosmetic":8,"footwear":28,"other":11},{"year":2017,"origin":"America","garment":29,"jewelry":6,"food":120,"cosmetic":6,"footwear":5,"other":8},{"year":2017,"origin":"the_United_states","garment":22,"jewelry":2,"food":123,"cosmetic":9,"footwear":5,"other":8},{"year":2017,"origin":"Other_Americas","garment":41,"jewelry":13,"food":114,"cosmetic":2,"footwear":4,"other":8},{"year":2017,"origin":"Europe","garment":40,"jewelry":3,"food":60,"cosmetic":5,"footwear":7,"other":5},{"year":2017,"origin":"England","garment":35,"jewelry":1,"food":91,"cosmetic":4,"footwear":6,"other":5},{"year":2017,"origin":"Other_Europe","garment":41,"jewelry":3,"food":52,"cosmetic":6,"footwear":7,"other":5},{"year":2017,"origin":"Oceania","garment":44,"jewelry":2,"food":89,"cosmetic":5,"footwear":11,"other":6},{"year":2017,"origin":"Australia","garment":48,"jewelry":2,"food":94,"cosmetic":5,"footwear":10,"other":5},{"year":2017,"origin":"Other_Oceania","garment":24,"jewelry":0,"food":60,"cosmetic":1,"footwear":18,"other":10},{"year":2017,"origin":"Others","garment":54,"jewelry":12,"food":142,"cosmetic":19,"footwear":21,"other":8},{"year":2018,"origin":"China_Continental","garment":161,"jewelry":145,"food":283,"cosmetic":393,"footwear":113,"other":107},{"year":2018,"origin":"Hong_Kong","garment":17,"jewelry":2,"food":159,"cosmetic":5,"footwear":9,"other":5},{"year":2018,"origin":"Taiwan","garment":58,"jewelry":13,"food":250,"cosmetic":15,"footwear":38,"other":22},{"year":2018,"origin":"Japan","garment":28,"jewelry":4,"food":169,"cosmetic":7,"footwear":8,"other":5},{"year":2018,"origin":"Southeast_Asia","garment":59,"jewelry":7,"food":221,"cosmetic":15,"footwear":30,"other":11},{"year":2018,"origin":"Malaysia","garment":51,"jewelry":18,"food":302,"cosmetic":22,"footwear":15,"other":3},{"year":2018,"origin":"Singapore","garment":63,"jewelry":3,"food":339,"cosmetic":8,"footwear":41,"other":9},{"year":2018,"origin":"Thailand","garment":39,"jewelry":5,"food":164,"cosmetic":32,"footwear":41,"other":23},{"year":2018,"origin":"Other_Southeast_Asia","garment":68,"jewelry":3,"food":177,"cosmetic":8,"footwear":29,"other":11},{"year":2018,"origin":"America","garment":39,"jewelry":3,"food":117,"cosmetic":9,"footwear":2,"other":15},{"year":2018,"origin":"the_United_states","garment":28,"jewelry":1,"food":133,"cosmetic":9,"footwear":1,"other":19},{"year":2018,"origin":"Other_Americas","garment":57,"jewelry":7,"food":89,"cosmetic":9,"footwear":4,"other":7},{"year":2018,"origin":"Europe","garment":49,"jewelry":4,"food":48,"cosmetic":2,"footwear":10,"other":9},{"year":2018,"origin":"England","garment":23,"jewelry":3,"food":77,"cosmetic":1,"footwear":12,"other":3},{"year":2018,"origin":"Other_Europe","garment":55,"jewelry":4,"food":41,"cosmetic":3,"footwear":9,"other":10},{"year":2018,"origin":"Oceania","garment":38,"jewelry":3,"food":96,"cosmetic":8,"footwear":14,"other":15},{"year":2018,"origin":"Australia","garment":42,"jewelry":4,"food":97,"cosmetic":8,"footwear":16,"other":17},{"year":2018,"origin":"Other_Oceania","garment":13,"jewelry":0,"food":93,"cosmetic":3,"footwear":3,"other":2},{"year":2018,"origin":"Others","garment":48,"jewelry":10,"food":126,"cosmetic":21,"footwear":12,"other":8},{"year":2019,"origin":"China_Continental","garment":92.3875562002334,"jewelry":89.4257546408435,"food":242.557417697233,"cosmetic":357.878074140292,"footwear":87.4783545356536,"other":90.5208332597657},{"year":2019,"origin":"Hong_Kong","garment":12.9706275320604,"jewelry":1.80642885944277,"food":163.087421293171,"cosmetic":3.89822371477909,"footwear":7.26423801976356,"other":5.73031717161587},{"year":2019,"origin":"Taiwan","garment":45.1528775258325,"jewelry":9.15421147384011,"food":197.153518829638,"cosmetic":14.7330898414471,"footwear":30.0249414229863,"other":13.9652057915152},{"year":2019,"origin":"Japan","garment":16.2034274603341,"jewelry":1.96081462237528,"food":140.60148471213,"cosmetic":5.60663034777308,"footwear":2.08390581997477,"other":3.80995074341663},{"year":2019,"origin":"Korea","garment":21.478101835569,"jewelry":0,"food":172.646736709607,"cosmetic":12.654150572138,"footwear":17.8545876225109,"other":6.17332198428658},{"year":2019,"origin":"Southeast_Asia","garment":49.0328167496044,"jewelry":3.33382083812148,"food":195.801608110929,"cosmetic":7.8274483785115,"footwear":27.1348232203697,"other":8.16407799400283},{"year":2019,"origin":"Malaysia","garment":35.1915962033405,"jewelry":6.4362082498882,"food":290.037660466159,"cosmetic":19.1191170042079,"footwear":21.5025209805604,"other":6.83349383819146},{"year":2019,"origin":"Singapore","garment":52.4438301148885,"jewelry":19.107199019057,"food":308.752211628375,"cosmetic":2.90109192173724,"footwear":18.4483892356839,"other":6.98481209754857},{"year":2019,"origin":"Thailand","garment":46.1286714898287,"jewelry":0,"food":127.406874166131,"cosmetic":11.7462937489245,"footwear":43.4525309838904,"other":12.303620886927},{"year":2019,"origin":"Other_Southeast_Asia","garment":53.4837717969709,"jewelry":0,"food":161.81193847963,"cosmetic":4.21678009929988,"footwear":26.6663415918816,"other":7.8321889754622},{"year":2019,"origin":"America","garment":26.2905515038462,"jewelry":0,"food":104.043766301363,"cosmetic":5.60819555164249,"footwear":13.7814534373206,"other":15.8651896512145},{"year":2019,"origin":"the_United_states","garment":23.7121737306118,"jewelry":0,"food":115.470192832599,"cosmetic":5.25886529952364,"footwear":14.8403387843993,"other":6.77791922870849},{"year":2019,"origin":"Other_Americas","garment":30.7462580468769,"jewelry":0.608325116775612,"food":84.2977058182154,"cosmetic":6.21187477437018,"footwear":11.9515887765733,"other":31.568943655057},{"year":2019,"origin":"Europe","garment":27.4262776917257,"jewelry":2.5822837266017,"food":39.0203460144734,"cosmetic":8.26260948111453,"footwear":5.0330629771792,"other":13.1984697315323},{"year":2019,"origin":"England","garment":15.219568471552,"jewelry":0,"food":57.6829843843374,"cosmetic":15.0304227206265,"footwear":0,"other":8.09165403092528},{"year":2019,"origin":"Other_Europe","garment":30.7374767282476,"jewelry":3.28275551087413,"food":33.9579078851927,"cosmetic":6.42676852891127,"footwear":6.39833456513899,"other":14.5837475261076},{"year":2019,"origin":"Oceania","garment":31.764031159563,"jewelry":1.8251646770353,"food":70.7140193280913,"cosmetic":3.76432262314186,"footwear":8.58112439604385,"other":20.5763979868702},{"year":2019,"origin":"Australia","garment":31.5750916281935,"jewelry":2.18044515569941,"food":73.7537462963676,"cosmetic":3.31667053040412,"footwear":7.81422921047125,"other":24.1238498715691},{"year":2019,"origin":"Other_Oceania","garment":32.7346607873104,"jewelry":0,"food":55.0981816350371,"cosmetic":6.06402338446146,"footwear":12.5208567701913,"other":2.35225041259242},{"year":2019,"origin":"Others","garment":122.841022501144,"jewelry":3.03423419658796,"food":51.5280379995947,"cosmetic":7.3696770171829,"footwear":9.76642260852883,"other":15.1408715467174},{"year":2020,"origin":"China_Continental","garment":202,"jewelry":72,"food":238,"cosmetic":518,"footwear":178,"other":131},{"year":2020,"origin":"Hong_Kong","garment":21,"jewelry":1,"food":182,"cosmetic":11,"footwear":3,"other":12},{"year":2020,"origin":"Taiwan","garment":34,"jewelry":0,"food":133,"cosmetic":17,"footwear":35,"other":9},{"year":2020,"origin":"Others","garment":22,"jewelry":0,"food":113,"cosmetic":14,"footwear":8,"other":6},{"year":2021,"origin":"China_Continental","garment":310,"jewelry":191,"food":281,"cosmetic":721,"footwear":433,"other":275},{"year":2022,"origin":"China_Continental","garment":292,"jewelry":212,"food":347,"cosmetic":664,"footwear":395,"other":340},{"year":2023,"origin":"China_Continental","garment":171,"jewelry":360,"food":323,"cosmetic":375,"footwear":263,"other":142},{"year":2023,"origin":"Hong_Kong","garment":13,"jewelry":3,"food":200,"cosmetic":26,"footwear":26,"other":9},{"year":2023,"origin":"Taiwan","garment":56,"jewelry":44,"food":238,"cosmetic":72,"footwear":161,"other":58},{"year":2023,"origin":"Japan","garment":11,"jewelry":0,"food":122,"cosmetic":5,"footwear":3,"other":16},{"year":2023,"origin":"Korea","garment":120,"jewelry":0,"food":404,"cosmetic":90,"footwear":25,"other":57},{"year":2023,"origin":"Malaysia","garment":91,"jewelry":0,"food":406,"cosmetic":35,"footwear":143,"other":7},{"year":2023,"origin":"Singapore","garment":77,"jewelry":1,"food":400,"cosmetic":48,"footwear":50,"other":29},{"year":2023,"origin":"Thailand","garment":114,"jewelry":18,"food":293,"cosmetic":254,"footwear":55,"other":52}]},
	};
  },
  mounted() {
    this.initializeYears();
    this.showDataForYear(this.years[0]);
  },
  methods: {
    initializeYears() {
      this.years = Array.from(new Set(this.jsonData.data.map(item => item.year)));
      this.selectedYear = this.years[0];
    },
    onYearChange() {
      this.currentYearIndex = this.years.indexOf(this.selectedYear);
      this.showDataForYear(this.selectedYear);
    },
    toggleCarousel() {
      if (this.isRunning) {
        this.stopCarousel();
      } else {
        this.startCarousel();
      }
    },
    startCarousel() {
      this.stopCarousel(); // 确保没有其他的间隔
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        this.currentYearIndex = (this.currentYearIndex + 1) % this.years.length;
        this.selectedYear = this.years[this.currentYearIndex];
        this.showDataForYear(this.selectedYear);
      }, 2000);
    },
    stopCarousel() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.isRunning = false;
    },
    showDataForYear(year) {
      const filteredData = this.jsonData.data.filter(item => item.year === year);
      const originsForYear = Array.from(new Set(filteredData.map(item => item.origin)));

      const treeData = originsForYear.map(origin => {
        const itemData = filteredData.find(item => item.origin === origin);
        return {
          name: origin,
          children: [
            { name: "garment", value: parseFloat(itemData.garment) || 0 },
            { name: "jewelry", value: parseFloat(itemData.jewelry) || 0 },
            { name: "food", value: parseFloat(itemData.food) || 0 },
            { name: "cosmetic", value: parseFloat(itemData.cosmetic) || 0 },
            { name: "footwear", value: parseFloat(itemData.footwear) || 0 },
            { name: "other", value: parseFloat(itemData.other) || 0 },
          ],
        };
      });

      const totalValue = treeData.reduce((sum, origin) => {
        return sum + origin.children.reduce((originSum, category) => {
          return originSum + category.value;
        }, 0);
      }, 0);

      const option = {
        tooltip: {
          formatter: info => {
            const value = info.value;
            const percentage = ((value / totalValue) * 100).toFixed(2);
            const treePathInfo = info.treePathInfo;
            const treePath = [];

            for (let i = 1; i < treePathInfo.length; i++) {
              treePath.push(treePathInfo[i].name);
            }

            return [
              '<div class="tooltip-title">' +
              echarts.format.encodeHTML(treePath.join("/")) +
              "</div>",
              "accounts for: " + echarts.format.addCommas(value) + " (" + percentage + "%)"
            ].join("");
          },
        },
        series: [
          {
            name: "spending breakdown",
            type: "treemap",
            visibleMin: 300,
            label: {
              show: true,
              formatter: "{b}",
			  fontSize: '10',
            },
            itemStyle: {
              borderColor: "#fff",
            },
            levels: this.getLevelOption(),
            data: treeData,
          },
        ],
      };
	  const myChart = echarts.init(this.$refs.chartContainer);
      myChart.setOption(option);
    },
    getLevelOption() {
      return [
        {
          itemStyle: {
            borderWidth: 0,
            gapWidth: 5,
          },
        },
        {
          itemStyle: {
            gapWidth: 1,
          },
        },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: {
            gapWidth: 1,
            borderColorSaturation: 0.6,
          },
        },
      ];
    },
  },
};
</script>

<style>
.tooltip-title {
  font-weight: bold;
}
</style>
