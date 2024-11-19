<template>
	<el-dialog
	v-model="dialogVisible"
	class="dialog"
	destroy-on-close
	:title="selectedHotelName">
	<HotelMapDetail :hotelName="selectedHotelName"></HotelMapDetail>
	</el-dialog>
	
	<div class="map-tags-container">
		<el-tag class="map-tags" 
				v-for="type in types" :key='type' 
				@click="toggleMarkers(type)" 
				:style="{backgroundColor: getTagColor(type) }"
				:closable="false">
			{{ type }}
		</el-tag>
	</div>
	

	<div id="container">
		
	</div>
</template>

<script setup>
	import {ref,computed,onMounted,onUnmounted} from 'vue';
	import {ElTag,ElCard} from 'element-plus';
	import 'element-plus/theme-chalk/index.css';
	import AMapLoader from '@amap/amap-jsapi-loader';
	import HotelMapDetail from './hotel-map-detail.vue';
	const types = ['Drinking', 'Toilet', 'Rest','Hotel'];
	const selectedTypes = ref(['Drinking', 'Toilet', 'Rest','Hotel']);
	const dialogVisible = ref(false)
	const selectedHotelName = ref('');
	
	function getTagColor (type){
	    const colors = {
	      'Drinking': '#00aaff',
	      'Toilet': '#aaff7f',
	      'Rest': '#ffaa00',
	      'Hotel': '#aa55ff'
	    };
	    return selectedTypes.value.includes(type) ? colors[type] : 'grey';
	  }
	  
	  function getTagColorByEn (type){
		  if (type == 'water'){
			  return '#00aaff'
		  }else if(type == 'restroom'){
			  return '#aaff7f'
		  }else if(type == 'restarea'){
			  return '#ffaa00'
		  }else if(type == 'Hotel'){
			  return '#aa55ff'
		  }
	    }

	const waterFountains = [{
			'name': 'drinking fountain1',
			'type':'water','value': [113.550822, 22.19942]
		},
		{
			'name': 'drinking fountain2',
			'type':'water','value': [113.545935, 22.202738]
		},
		{
			'name': 'drinking fountain3',
			'type':'water','value': [113.534641, 22.191004]
		},
		{
			'name': 'drinking fountain4',
			'type':'water','value': [113.534641, 22.191004]
		},
		{
			'name': 'drinking fountain5',
			'type':'water','value': [113.572357, 22.158341]
		},
		{
			'name': 'drinking fountain6',
			'type':'water','value': [113.561562, 22.154853]
		},
		{
			'name': 'drinking fountain7',
			'type':'water','value': [113.545968, 22.202562]
		},
		{
			'name': 'drinking fountain8',
			'type':'water','value': [113.560271, 22.204543]
		},
		{
			'name': 'drinking fountain9',
			'type':'water','value': [113.554997, 22.198405]
		},
		{
			'name': 'drinking fountain10',
			'type':'water','value': [113.555036, 22.199203]
		},
		{
			'name': 'drinking fountain11',
			'type':'water','value': [113.538918, 22.204133]
		},
		{
			'name': 'drinking fountain12',
			'type':'water','value': [113.554176, 22.15967]
		},
		{
			'name': 'drinking fountain13',
			'type':'water','value': [113.554176, 22.15967]
		},
		{
			'name': 'drinking fountain14',
			'type':'water','value': [113.541126, 22.162572]
		},
		{
			'name': 'drinking fountain15',
			'type':'water','value': [113.541075, 22.162817]
		},
		{
			'name': 'drinking fountain16',
			'type':'water','value': [113.539662, 22.164207]
		},
		{
			'name': 'drinking fountain17',
			'type':'water','value': [113.539288, 22.201367]
		},
		{
			'name': 'drinking fountain18',
			'type':'water','value': [113.539288, 22.201367]
		},
		{
			'name': 'drinking fountain19',
			'type':'water','value': [113.567115, 22.135079]
		},
		{
			'name': 'drinking fountain20',
			'type':'water','value': [113.566541, 22.132275]
		},
		{
			'name': 'drinking fountain21',
			'type':'water','value': [113.561759, 22.128493]
		},
		{
			'name': 'drinking fountain22',
			'type':'water','value': [113.561759, 22.128493]
		},
		{
			'name': 'drinking fountain23',
			'type':'water','value': [113.55823, 22.126879]
		},
		{
			'name': 'drinking fountain24',
			'type':'water','value': [113.556803, 22.125672]
		},
		{
			'name': 'drinking fountain25',
			'type':'water','value': [113.562511, 22.128737]
		},
		{
			'name': 'drinking fountain26',
			'type':'water','value': [113.535784, 22.187248]
		},
		{
			'name': 'drinking fountain27',
			'type':'water','value': [113.562867, 22.114229]
		},
		{
			'name': 'drinking fountain28',
			'type':'water','value': [113.533115, 22.18472]
		},
		{
			'name': 'drinking fountain29',
			'type':'water','value': [113.536571, 22.181014]
		},
		{
			'name': 'drinking fountain30',
			'type':'water','value': [113.532081, 22.179716]
		},
		{
			'name': 'drinking fountain31',
			'type':'water','value': [113.551076, 22.188445]
		},
		{
			'name': 'drinking fountain32',
			'type':'water','value': [113.5372, 22.2025]
		},
		{
			'name': 'drinking fountain33',
			'type':'water','value': [113.548842, 22.196952]
		},
		{
			'name': 'drinking fountain34',
			'type':'water','value': [113.552001, 22.198757]
		},
		{
			'name': 'drinking fountain35',
			'type':'water','value': [113.552243, 22.199313]
		},
		{
			'name': 'drinking fountain36',
			'type':'water','value': [113.552509, 22.199478]
		},
		{
			'name': 'drinking fountain37',
			'type':'water','value': [113.552751, 22.197096]
		},
		{
			'name': 'drinking fountain38',
			'type':'water','value': [113.538919, 22.204134]
		},
		{
			'name': 'drinking fountain39',
			'type':'water','value': [113.538919, 22.204134]
		},
		{
			'name': 'drinking fountain40',
			'type':'water','value': [113.538919, 22.204134]
		},
		{
			'name': 'drinking fountain41',
			'type':'water','value': [113.538919, 22.204134]
		},
		{
			'name': 'drinking fountain42',
			'type':'water','value': [113.557031, 22.156437]
		},
		{
			'name': 'drinking fountain43',
			'type':'water','value': [113.556855, 22.115998]
		},
		{
			'name': 'drinking fountain44',
			'type':'water','value': [113.543088, 22.211881]
		},
		{
			'name': 'drinking fountain45',
			'type':'water','value': [113.553135, 22.208796]
		},
		{
			'name': 'drinking fountain46',
			'type':'water','value': [113.553135, 22.208796]
		},
		{
			'name': 'drinking fountain47',
			'type':'water','value': [113.544377, 22.21579]
		},
		{
			'name': 'drinking fountain48',
			'type':'water','value': [113.547268, 22.216278]
		},
		{
			'name': 'drinking fountain49',
			'type':'water','value': [113.55137, 22.211395]
		},
		{
			'name': 'drinking fountain50',
			'type':'water','value': [113.55137, 22.211395]
		},
		{
			'name': 'drinking fountain51',
			'type':'water','value': [113.552207, 22.211261]
		},
		{
			'name': 'drinking fountain52',
			'type':'water','value': [113.550653, 22.212328]
		},
		{
			'name': 'drinking fountain53',
			'type':'water','value': [113.548176, 22.207351]
		},
		{
			'name': 'drinking fountain54',
			'type':'water','value': [113.548996, 22.207049]
		},
		{
			'name': 'drinking fountain55',
			'type':'water','value': [113.568191, 22.117344]
		},
		{
			'name': 'drinking fountain56',
			'type':'water','value': [113.569015, 22.117949]
		},
		{
			'name': 'drinking fountain57',
			'type':'water','value': [113.570411, 22.125399]
		},
		{
			'name': 'drinking fountain58',
			'type':'water','value': [113.571162, 22.124515]
		},
		{
			'name': 'drinking fountain59',
			'type':'water','value': [113.57065, 22.122229]
		},
		{
			'name': 'drinking fountain60',
			'type':'water','value': [113.554038, 22.210973]
		},
		{
			'name': 'drinking fountain61',
			'type':'water','value': [113.556078, 22.209298]
		},
		{
			'name': 'drinking fountain62',
			'type':'water','value': [113.538959, 22.206488]
		},
		{
			'name': 'drinking fountain63',
			'type':'water','value': [113.556479, 22.203225]
		},
		{
			'name': 'drinking fountain64',
			'type':'water','value': [113.552615, 22.142102]
		},
		{
			'name': 'drinking fountain65',
			'type':'water','value': [113.537075, 22.186673]
		},
		{
			'name': 'drinking fountain66',
			'type':'water','value': [113.539651, 22.194602]
		},
		{
			'name': 'drinking fountain67',
			'type':'water','value': [113.556253, 22.158155]
		},
		{
			'name': 'drinking fountain68',
			'type':'water','value': [113.553658, 22.186998]
		},
		{
			'name': 'drinking fountain69',
			'type':'water','value': [113.553658, 22.186998]
		},
		{
			'name': 'drinking fountain70',
			'type':'water','value': [113.553658, 22.186998]
		},
		{
			'name': 'drinking fountain71',
			'type':'water','value': [113.553658, 22.186998]
		}
	];
	const publicToilets = [{
			'name': 'public toilets139',
			'type':'restroom','value': [113.551493, 22.211268]
		},
		{
			'name': 'public toilets140',
			'type':'restroom','value': [113.575172, 22.129205]
		},
		{
			'name': 'public toilets141',
			'type':'restroom','value': [113.571355, 22.123969]
		},
		{
			'name': 'public toilets142',
			'type':'restroom','value': [113.555959, 22.119668]
		},
		{
			'name': 'public toilets143',
			'type':'restroom','value': [113.552219, 22.117925]
		},
		{
			'name': 'public toilets144',
			'type':'restroom','value': [113.550973, 22.118712]
		},
		{
			'name': 'public toilets145',
			'type':'restroom','value': [113.551689, 22.11618]
		},
		{
			'name': 'public toilets146',
			'type':'restroom','value': [113.552845, 22.115849]
		},
		{
			'name': 'public toilets147',
			'type':'restroom','value': [113.549733, 22.114254]
		},
		{
			'name': 'public toilets148',
			'type':'restroom','value': [113.569971, 22.120198]
		},
		{
			'name': 'public toilets149',
			'type':'restroom','value': [113.569786, 22.11893]
		},
		{
			'name': 'public toilets150',
			'type':'restroom','value': [113.573364, 22.115869]
		},
		{
			'name': 'public toilets151',
			'type':'restroom','value': [113.570899, 22.122151]
		},
		{
			'name': 'public toilets152',
			'type':'restroom','value': [113.561205, 22.128883]
		},
		{
			'name': 'public toilets153',
			'type':'restroom','value': [113.566837, 22.135042]
		},
		{
			'name': 'public toilets154',
			'type':'restroom','value': [113.56586, 22.132277]
		},
		{
			'name': 'public toilets155',
			'type':'restroom','value': [113.542945, 22.192505]
		},
		{
			'name': 'public toilets156',
			'type':'restroom','value': [113.545968, 22.202562]
		},
		{
			'name': 'public toilets157',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': 'public toilets158',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': 'public toilets159',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': 'public toilets160',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': 'public toilets161',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': 'public toilets162',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': 'public toilets163',
			'type':'restroom','value': [113.556253, 22.158155]
		},
		{
			'name': 'public toilets164',
			'type':'restroom','value': [113.556253, 22.158155]
		},
		{
			'name': 'public toilets165',
			'type':'restroom','value': [113.561759, 22.128493]
		},
		{
			'name': 'public toilets166',
			'type':'restroom','value': [113.581699, 22.131556]
		},
		{
			'name': 'public toilets167',
			'type':'restroom','value': [113.539651, 22.194602]
		},
		{
			'name': 'public toilets168',
			'type':'restroom','value': [113.534641, 22.191004]
		},
		{
			'name': 'public toilets169',
			'type':'restroom','value': [113.545935, 22.202738]
		},
		{
			'name': 'public toilets170',
			'type':'restroom','value': [113.545935, 22.202738]
		},
		{
			'name': 'public toilets171',
			'type':'restroom','value': [113.545935, 22.202738]
		},
		{
			'name': 'public toilets172',
			'type':'restroom','value': [113.538959, 22.206488]
		},
		{
			'name': 'public toilets173',
			'type':'restroom','value': [113.55137, 22.211395]
		},
		{
			'name': 'public toilets174',
			'type':'restroom','value': [113.55137, 22.211395]
		},
		{
			'name': 'public toilets175',
			'type':'restroom','value': [113.55137, 22.211395]
		},
		{
			'name': 'public toilets176',
			'type':'restroom','value': [113.551493, 22.211268]
		},
		{
			'name': 'public toilets177',
			'type':'restroom','value': [113.5372, 22.2025]
		},
		{
			'name': 'public toilets178',
			'type':'restroom','value': [113.543088, 22.211881]
		},
		{
			'name': 'public toilets179',
			'type':'restroom','value': [113.543088, 22.211881]
		},
		{
			'name': 'public toilets180',
			'type':'restroom','value': [113.555605, 22.155014]
		},
		{
			'name': 'public toilets181',
			'type':'restroom','value': [113.546394, 22.207635]
		},
		{
			'name': 'public toilets182',
			'type':'restroom','value': [113.55823, 22.126879]
		},
		{
			'name': 'public toilets183',
			'type':'restroom','value': [113.556936, 22.125657]
		},
		{
			'name': 'public toilets184',
			'type':'restroom','value': [113.563834, 22.115476]
		},
		{
			'name': 'public toilets185',
			'type':'restroom','value': [113.577885, 22.133913]
		},
		{
			'name': 'public toilets186',
			'type':'restroom','value': [113.563056, 22.121485]
		},
		{
			'name': 'public toilets187',
			'type':'restroom','value': [113.564386, 22.123055]
		},
		{
			'name': 'public toilets188',
			'type':'restroom','value': [113.558872, 22.126673]
		},
		{
			'name': 'public toilets189',
			'type':'restroom','value': [113.569015, 22.117949]
		},
		{
			'name': 'public toilets190',
			'type':'restroom','value': [113.557162, 22.127294]
		},
		{
			'name': 'public toilets191',
			'type':'restroom','value': [113.57035, 22.125433]
		},
		{
			'name': 'public toilets192',
			'type':'restroom','value': [113.556855, 22.115998]
		},
		{
			'name': 'public toilets193',
			'type':'restroom','value': [113.552625, 22.117007]
		},
		{
			'name': 'public toilets194',
			'type':'restroom','value': [113.545215, 22.215646]
		},
		{
			'name': 'public toilets195',
			'type':'restroom','value': [113.544377, 22.21579]
		},
		{
			'name': 'public toilets196',
			'type':'restroom','value': [113.545325, 22.216476]
		},
		{
			'name': 'public toilets197',
			'type':'restroom','value': [113.54715, 22.216591]
		},
		{
			'name': 'public toilets198',
			'type':'restroom','value': [113.554038, 22.210973]
		},
		{
			'name': 'public toilets199',
			'type':'restroom','value': [113.555894, 22.209358]
		},
		{
			'name': 'public toilets200',
			'type':'restroom','value': [113.552696, 22.203865]
		},
		{
			'name': 'public toilets201',
			'type':'restroom','value': [113.55285, 22.204181]
		},
		{
			'name': 'public toilets202',
			'type':'restroom','value': [113.539088, 22.200572]
		},
		{
			'name': 'public toilets203',
			'type':'restroom','value': [113.539502, 22.200344]
		},
		{
			'name': 'public toilets204',
			'type':'restroom','value': [113.539288, 22.201367]
		},
		{
			'name': 'public toilets205',
			'type':'restroom','value': [113.54756, 22.20009]
		},
		{
			'name': 'public toilets206',
			'type':'restroom','value': [113.550661, 22.200539]
		},
		{
			'name': 'public toilets207',
			'type':'restroom','value': [113.548862, 22.196492]
		},
		{
			'name': 'public toilets208',
			'type':'restroom','value': [113.550854, 22.197615]
		},
		{
			'name': 'public toilets209',
			'type':'restroom','value': [113.552001, 22.198757]
		},
		{
			'name': 'public toilets210',
			'type':'restroom','value': [113.552509, 22.199478]
		},
		{
			'name': 'public toilets211',
			'type':'restroom','value': [113.549813, 22.195657]
		},
		{
			'name': 'public toilets212',
			'type':'restroom','value': [113.546933, 22.196209]
		},
		{
			'name': 'public toilets213',
			'type':'restroom','value': [113.544474, 22.192665]
		},
		{
			'name': 'public toilets214',
			'type':'restroom','value': [113.545854, 22.189439]
		},
		{
			'name': 'public toilets215',
			'type':'restroom','value': [113.533115, 22.18472]
		},
		{
			'name': 'public toilets216',
			'type':'restroom','value': [113.549894, 22.19147]
		},
		{
			'name': 'public toilets217',
			'type':'restroom','value': [113.537075, 22.186673]
		},
		{
			'name': 'public toilets218',
			'type':'restroom','value': [113.550176, 22.19585]
		},
		{
			'name': 'public toilets219',
			'type':'restroom','value': [113.542386, 22.196822]
		},
		{
			'name': 'public toilets220',
			'type':'restroom','value': [113.551371, 22.206953]
		},
		{
			'name': 'public toilets221',
			'type':'restroom','value': [113.554592, 22.158827]
		},
		{
			'name': 'public toilets222',
			'type':'restroom','value': [113.560546, 22.158888]
		},
		{
			'name': 'public toilets223',
			'type':'restroom','value': [113.561069, 22.159229]
		},
		{
			'name': 'public toilets224',
			'type':'restroom','value': [113.551772, 22.112385]
		},
		{
			'name': 'public toilets225',
			'type':'restroom','value': [113.545466, 22.198457]
		},
		{
			'name': 'public toilets226',
			'type':'restroom','value': [113.561597, 22.16123]
		},
		{
			'name': 'public toilets227',
			'type':'restroom','value': [113.561597, 22.16123]
		},
		{
			'name': 'public toilets228',
			'type':'restroom','value': [113.561597, 22.16123]
		},
		{
			'name': 'public toilets229',
			'type':'restroom','value': [113.550318, 22.215534]
		},
		{
			'name': 'public toilets230',
			'type':'restroom','value': [113.552948, 22.213763]
		},
		{
			'name': 'public toilets231',
			'type':'restroom','value': [113.545917, 22.213585]
		},
		{
			'name': 'public toilets232',
			'type':'restroom','value': [113.5412, 22.21029]
		},
		{
			'name': 'public toilets233',
			'type':'restroom','value': [113.537607, 22.209587]
		},
		{
			'name': 'public toilets234',
			'type':'restroom','value': [113.545772, 22.210555]
		},
		{
			'name': 'public toilets235',
			'type':'restroom','value': [113.548446, 22.210545]
		},
		{
			'name': 'public toilets236',
			'type':'restroom','value': [113.552059, 22.211161]
		},
		{
			'name': 'public toilets237',
			'type':'restroom','value': [113.559352, 22.21204]
		},
		{
			'name': 'public toilets238',
			'type':'restroom','value': [113.550265, 22.209525]
		},
		{
			'name': 'public toilets239',
			'type':'restroom','value': [113.54517, 22.208439]
		},
		{
			'name': 'public toilets240',
			'type':'restroom','value': [113.542899, 22.208465]
		},
		{
			'name': 'public toilets241',
			'type':'restroom','value': [113.547467, 22.207918]
		},
		{
			'name': 'public toilets242',
			'type':'restroom','value': [113.544637, 22.204134]
		},
		{
			'name': 'public toilets243',
			'type':'restroom','value': [113.545504, 22.201899]
		},
		{
			'name': 'public toilets244',
			'type':'restroom','value': [113.538462, 22.200529]
		},
		{
			'name': 'public toilets245',
			'type':'restroom','value': [113.542381, 22.19987]
		},
		{
			'name': 'public toilets246',
			'type':'restroom','value': [113.537759, 22.198849]
		},
		{
			'name': 'public toilets247',
			'type':'restroom','value': [113.556728, 22.203364]
		},
		{
			'name': 'public toilets248',
			'type':'restroom','value': [113.547252, 22.198601]
		},
		{
			'name': 'public toilets249',
			'type':'restroom','value': [113.541122, 22.197047]
		},
		{
			'name': 'public toilets250',
			'type':'restroom','value': [113.539377, 22.196589]
		},
		{
			'name': 'public toilets251',
			'type':'restroom','value': [113.538796, 22.195912]
		},
		{
			'name': 'public toilets252',
			'type':'restroom','value': [113.554865, 22.19903]
		},
		{
			'name': 'public toilets253',
			'type':'restroom','value': [113.559781, 22.198394]
		},
		{
			'name': 'public toilets254',
			'type':'restroom','value': [113.558507, 22.198842]
		},
		{
			'name': 'public toilets255',
			'type':'restroom','value': [113.536218, 22.193478]
		},
		{
			'name': 'public toilets256',
			'type':'restroom','value': [113.540287, 22.193003]
		},
		{
			'name': 'public toilets257',
			'type':'restroom','value': [113.534641, 22.190701]
		},
		{
			'name': 'public toilets258',
			'type':'restroom','value': [113.55399, 22.19464]
		},
		{
			'name': 'public toilets259',
			'type':'restroom','value': [113.532597, 22.188947]
		},
		{
			'name': 'public toilets260',
			'type':'restroom','value': [113.534521, 22.186988]
		},
		{
			'name': 'public toilets261',
			'type':'restroom','value': [113.530666, 22.186267]
		},
		{
			'name': 'public toilets262',
			'type':'restroom','value': [113.531063, 22.185448]
		},
		{
			'name': 'public toilets263',
			'type':'restroom','value': [113.554421, 22.190785]
		},
		{
			'name': 'public toilets264',
			'type':'restroom','value': [113.550761, 22.188284]
		},
		{
			'name': 'public toilets265',
			'type':'restroom','value': [113.532081, 22.179716]
		},
		{
			'name': 'public toilets266',
			'type':'restroom','value': [113.537027, 22.18104]
		},
		{
			'name': 'public toilets267',
			'type':'restroom','value': [113.540676, 22.205037]
		},
		{
			'name': 'public toilets268',
			'type':'restroom','value': [113.560229, 22.204595]
		},
		{
			'name': 'public toilets269',
			'type':'restroom','value': [113.539922, 22.19464]
		},
		{
			'name': 'public toilets270',
			'type':'restroom','value': [113.538798, 22.189491]
		},
		{
			'name': 'public toilets271',
			'type':'restroom','value': [113.557198, 22.187653]
		},
		{
			'name': 'public toilets272',
			'type':'restroom','value': [113.553556, 22.206875]
		},
		{
			'name': 'public toilets273',
			'type':'restroom','value': [113.550616, 22.212338]
		},
		{
			'name': 'public toilets274',
			'type':'restroom','value': [113.550777, 22.203602]
		},
		{
			'name': 'public toilets275',
			'type':'restroom','value': [113.553647, 22.195938]
		},
		{
			'name': 'public toilets276',
			'type':'restroom','value': [113.549114, 22.195134]
		},
		{
			'name': 'public toilets277',
			'type':'restroom','value': [113.539622, 22.191131]
		},
		{
			'name': 'public toilets278',
			'type':'restroom','value': [113.572555, 22.199468]
		},
		{
			'name': 'public toilets279',
			'type':'restroom','value': [113.573051, 22.198093]
		},
		{
			'name': 'public toilets280',
			'type':'restroom','value': [113.574483, 22.199441]
		},
		{
			'name': 'public toilets281',
			'type':'restroom','value': [113.554321, 22.187463]
		},
		{
			'name': 'public toilets282',
			'type':'restroom','value': [113.550755, 22.19938]
		},
		{
			'name': 'public toilets283',
			'type':'restroom','value': [113.539888, 22.203596]
		},
		{
			'name': 'public toilets284',
			'type':'restroom','value': [113.552139, 22.118115]
		},
		{
			'name': 'public toilets285',
			'type':'restroom','value': [113.5372, 22.2025]
		},
		{
			'name': 'public toilets286',
			'type':'restroom','value': [113.5372, 22.2025]
		},
		{
			'name': 'public toilets287',
			'type':'restroom','value': [113.5372, 22.2025]
		},
		{
			'name': 'public toilets288',
			'type':'restroom','value': [113.544919, 22.195154]
		},
		{
			'name': 'public toilets289',
			'type':'restroom','value': [113.544785, 22.205415]
		},
		{
			'name': 'public toilets290',
			'type':'restroom','value': [113.544785, 22.205415]
		},
		{
			'name': 'public toilets291',
			'type':'restroom','value': [113.534625, 22.190832]
		},
		{
			'name': 'public toilets292',
			'type':'restroom','value': [113.534777, 22.19088]
		},
		{
			'name': 'public toilets293',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': 'public toilets294',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': 'public toilets295',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': 'public toilets296',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': 'public toilets297',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': 'public toilets298',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': 'public toilets299',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': 'public toilets300',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': 'public toilets301',
			'type':'restroom','value': [113.545721, 22.211156]
		},
		{
			'name': 'public toilets302',
			'type':'restroom','value': [113.551378, 22.21134]
		},
		{
			'name': 'public toilets303',
			'type':'restroom','value': [113.551378, 22.21134]
		},
		{
			'name': 'public toilets304',
			'type':'restroom','value': [113.551378, 22.21134]
		},
		{
			'name': 'public toilets305',
			'type':'restroom','value': [113.551378, 22.21134]
		},
		{
			'name': 'public toilets306',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': 'public toilets307',
			'type':'restroom','value': [113.556281, 22.153912]
		},
		{
			'name': 'public toilets308',
			'type':'restroom','value': [113.549095, 22.163387]
		},
		{
			'name': 'public toilets309',
			'type':'restroom','value': [113.550788, 22.157196]
		},
		{
			'name': 'public toilets310',
			'type':'restroom','value': [113.552694, 22.156033]
		},
		{
			'name': 'public toilets311',
			'type':'restroom','value': [113.571371, 22.159129]
		},
		{
			'name': 'public toilets312',
			'type':'restroom','value': [113.556442, 22.154111]
		},
		{
			'name': 'public toilets313',
			'type':'restroom','value': [113.557509, 22.153415]
		},
		{
			'name': 'public toilets314',
			'type':'restroom','value': [113.559011, 22.154149]
		},
		{
			'name': 'public toilets315',
			'type':'restroom','value': [113.553679, 22.151505]
		},
		{
			'name': 'public toilets316',
			'type':'restroom','value': [113.561785, 22.155798]
		},
		{
			'name': 'public toilets317',
			'type':'restroom','value': [113.539986, 22.161787]
		},
		{
			'name': 'public toilets318',
			'type':'restroom','value': [113.551941, 22.136055]
		},
		{
			'name': 'public toilets319',
			'type':'restroom','value': [113.546155, 22.125336]
		},
		{
			'name': 'public toilets320',
			'type':'restroom','value': [113.547067, 22.136189]
		},
		{
			'name': 'public toilets321',
			'type':'restroom','value': [113.557695, 22.156438]
		},
		{
			'name': 'public toilets322',
			'type':'restroom','value': [113.548804, 22.163996]
		},
		{
			'name': 'public toilets323',
			'type':'restroom','value': [113.541126, 22.162572]
		},
		{
			'name': 'public toilets324',
			'type':'restroom','value': [113.574273, 22.164094]
		},
		{
			'name': 'public toilets325',
			'type':'restroom','value': [113.575524, 22.163571]
		},
		{
			'name': 'public toilets326',
			'type':'restroom','value': [113.559351, 22.153863]
		},
		{
			'name': 'public toilets327',
			'type':'restroom','value': [113.55861, 22.150203]
		},
		{
			'name': 'public toilets328',
			'type':'restroom','value': [113.539557, 22.19338]
		},
		{
			'name': 'public toilets329',
			'type':'restroom','value': [113.551866, 22.211246]
		},
		{
			'name': 'public toilets330',
			'type':'restroom','value': [113.551866, 22.211246]
		},
		{
			'name': 'public toilets331',
			'type':'restroom','value': [113.551866, 22.211246]
		},
		{
			'name': 'public toilets332',
			'type':'restroom','value': [113.551866, 22.211246]
		}
	];
	const restAreas = [{
			'name': 'rest area72',
			'type':'restarea','value': [113.545975, 22.202873]
		},
		{
			'name': 'rest area73',
			'type':'restarea','value': [113.541749, 22.19565]
		},
		{
			'name': 'rest area74',
			'type':'restarea','value': [113.556657, 22.153803]
		},
		{
			'name': 'rest area75',
			'type':'restarea','value': [113.544202, 22.214225]
		},
		{
			'name': 'rest area76',
			'type':'restarea','value': [113.538757, 22.196334]
		},
		{
			'name': 'rest area77',
			'type':'restarea','value': [113.547292, 22.211132]
		},
		{
			'name': 'rest area78',
			'type':'restarea','value': [113.548006, 22.21198]
		},
		{
			'name': 'rest area79',
			'type':'restarea','value': [113.535865, 22.193671]
		},
		{
			'name': 'rest area80',
			'type':'restarea','value': [113.552302, 22.213334]
		},
		{
			'name': 'rest area81',
			'type':'restarea','value': [113.540331, 22.160078]
		},
		{
			'name': 'rest area82',
			'type':'restarea','value': [113.538522, 22.200789]
		},
		{
			'name': 'rest area83',
			'type':'restarea','value': [113.539456, 22.1994]
		},
		{
			'name': 'rest area84',
			'type':'restarea','value': [113.552345, 22.214496]
		},
		{
			'name': 'rest area85',
			'type':'restarea','value': [113.535777, 22.187302]
		},
		{
			'name': 'rest area86',
			'type':'restarea','value': [113.537976, 22.19616]
		},
		{
			'name': 'rest area87',
			'type':'restarea','value': [113.539176, 22.196813]
		},
		{
			'name': 'rest area88',
			'type':'restarea','value': [113.533091, 22.179516]
		},
		{
			'name': 'rest area89',
			'type':'restarea','value': [113.54221, 22.212526]
		},
		{
			'name': 'rest area90',
			'type':'restarea','value': [113.542795, 22.208548]
		},
		{
			'name': 'rest area91',
			'type':'restarea','value': [113.544132, 22.212496]
		},
		{
			'name': 'rest area92',
			'type':'restarea','value': [113.541566, 22.209676]
		},
		{
			'name': 'rest area93',
			'type':'restarea','value': [113.543842, 22.206928]
		},
		{
			'name': 'rest area94',
			'type':'restarea','value': [113.536783, 22.192494]
		},
		{
			'name': 'rest area95',
			'type':'restarea','value': [113.536906, 22.193117]
		},
		{
			'name': 'rest area96',
			'type':'restarea','value': [113.557974, 22.211641]
		},
		{
			'name': 'rest area97',
			'type':'restarea','value': [113.539451, 22.20467]
		},
		{
			'name': 'rest area98',
			'type':'restarea','value': [113.539807, 22.204049]
		},
		{
			'name': 'rest area99',
			'type':'restarea','value': [113.546727, 22.210459]
		},
		{
			'name': 'rest area100',
			'type':'restarea','value': [113.538568, 22.213323]
		},
		{
			'name': 'rest area101',
			'type':'restarea','value': [113.55885, 22.15444]
		},
		{
			'name': 'rest area102',
			'type':'restarea','value': [113.550154, 22.1572]
		},
		{
			'name': 'rest area103',
			'type':'restarea','value': [113.543684, 22.197093]
		},
		{
			'name': 'rest area104',
			'type':'restarea','value': [113.543168, 22.207405]
		},
		{
			'name': 'rest area105',
			'type':'restarea','value': [113.541448, 22.161523]
		},
		{
			'name': 'rest area106',
			'type':'restarea','value': [113.552123, 22.192381]
		},
		{
			'name': 'rest area107',
			'type':'restarea','value': [113.538834, 22.212219]
		},
		{
			'name': 'rest area108',
			'type':'restarea','value': [113.559967, 22.162199]
		},
		{
			'name': 'rest area109',
			'type':'restarea','value': [113.537717, 22.203099]
		},
		{
			'name': 'rest area110',
			'type':'restarea','value': [113.550106, 22.211246]
		},
		{
			'name': 'rest area111',
			'type':'restarea','value': [113.550471, 22.21246]
		},
		{
			'name': 'rest area112',
			'type':'restarea','value': [113.553347, 22.120708]
		},
		{
			'name': 'rest area113',
			'type':'restarea','value': [113.542325, 22.201581]
		},
		{
			'name': 'rest area114',
			'type':'restarea','value': [113.536993, 22.188906]
		},
		{
			'name': 'rest area115',
			'type':'restarea','value': [113.540119, 22.191499]
		},
		{
			'name': 'rest area116',
			'type':'restarea','value': [113.537583, 22.196966]
		},
		{
			'name': 'rest area117',
			'type':'restarea','value': [113.53793, 22.20148]
		},
		{
			'name': 'rest area118',
			'type':'restarea','value': [113.544647, 22.205879]
		},
		{
			'name': 'rest area119',
			'type':'restarea','value': [113.558711, 22.205328]
		},
		{
			'name': 'rest area120',
			'type':'restarea','value': [113.545592, 22.201797]
		},
		{
			'name': 'rest area121',
			'type':'restarea','value': [113.545496, 22.213395]
		},
		{
			'name': 'rest area122',
			'type':'restarea','value': [113.554169, 22.213036]
		},
		{
			'name': 'rest area123',
			'type':'restarea','value': [113.556297, 22.211881]
		},
		{
			'name': 'rest area124',
			'type':'restarea','value': [113.550279, 22.209446]
		},
		{
			'name': 'rest area125',
			'type':'restarea','value': [113.549943, 22.208884]
		},
		{
			'name': 'rest area126',
			'type':'restarea','value': [113.555295, 22.155117]
		},
		{
			'name': 'rest area127',
			'type':'restarea','value': [113.551587, 22.152606]
		},
		{
			'name': 'rest area128',
			'type':'restarea','value': [113.540948, 22.198622]
		},
		{
			'name': 'rest area129',
			'type':'restarea','value': [113.564375, 22.130104]
		},
		{
			'name': 'rest area130',
			'type':'restarea','value': [113.541414, 22.209458]
		},
		{
			'name': 'rest area131',
			'type':'restarea','value': [113.555498, 22.204558]
		},
		{
			'name': 'rest area132',
			'type':'restarea','value': [113.541335, 22.206941]
		},
		{
			'name': 'rest area133',
			'type':'restarea','value': [113.553717, 22.206994]
		},
		{
			'name': 'rest area134',
			'type':'restarea','value': [113.536002, 22.191333]
		},
		{
			'name': 'rest area135',
			'type':'restarea','value': [113.538392, 22.197226]
		},
		{
			'name': 'rest area136',
			'type':'restarea','value': [113.538851, 22.197104]
		},
		{
			'name': 'rest area137',
			'type':'restarea','value': [113.541855, 22.205827]
		},
		{
			'name': 'rest area138',
			'type':'restarea','value': [113.553822, 22.187107]
		}
	];
	
const hotelData = [
  {
    "name": "LONDON",
    "classname_en": "2-star Hotel",
    "tel": "28937761",
    "room_no": 46,
    "type": "hotel",
    "address_en": "Pra\u00e7a de Ponte e Horta n.\u00ba 4-6, Macau",
    "value": [
      113.536302,
      22.193724
    ]
  },
  {
    "name": "HOU KONG",
    "classname_en": "2-star Hotel",
    "tel": "28937555 / 28950289",
    "room_no": 50,
    "type": "hotel",
    "address_en": "Travessa das Virtudes n\u00ba 1, Macau",
    "value": [
      113.536326,
      22.195011
    ]
  },
  {
    "name": "MAN VA",
    "classname_en": "2-star Hotel",
    "tel": "28388655",
    "room_no": 40,
    "type": "hotel",
    "address_en": "Rua da Caldeira, n\u00bas. 30-32-34, Macau",
    "value": [
      113.537102,
      22.195215
    ]
  },
  {
    "name": "KOU VA",
    "classname_en": "2-star Hotel",
    "tel": "28930755",
    "room_no": 48,
    "type": "hotel",
    "address_en": "Rua da Felicidade, n.\u00ba 71, r/c, 3\u00ba e 4\u00ba andares, Macau",
    "value": [
      113.537383,
      22.194837
    ]
  },
  {
    "name": "PENS\u00c3O CARMEN",
    "classname_en": "Economical accommodation establishments",
    "tel": "28308984",
    "room_no": 15,
    "type": "hotel",
    "address_en": "Moradias A1, B1 do 1.\u00ba andar e A2, B2 do 2.\u00ba andar com entrada pelo n.\u00ba 7 do pr\u00e9dio n.\u00bas 7 e 7D da Rua da Madeira, com porta n.\u00ba 22 da Travessa do Pagode, Macau",
    "value": [
      113.537743,
      22.196179
    ]
  },
  {
    "name": "CHENG CHENG",
    "classname_en": "Economical accommodation establishments",
    "tel": "62129662",
    "room_no": 9,
    "type": "hotel",
    "address_en": "Avenida da Praia Grande, n.\u00ba 998, 2\u00ba e 4\u00ba andares, Macau",
    "value": [
      113.543707,
      22.191354
    ]
  },
  {
    "name": "COSTA",
    "classname_en": "Economical accommodation establishments",
    "tel": "28526176",
    "room_no": 6,
    "type": "hotel",
    "address_en": "Avenida de Horta e Costa, n.\u00ba 11, C e D, 1\u00ba andar, Macau",
    "value": [
      113.547636,
      22.202226
    ]
  },
  {
    "name": "FONG LOI",
    "classname_en": "Economical accommodation establishments",
    "tel": "28574292",
    "room_no": 7,
    "type": "hotel",
    "address_en": "Rua do Bocage, n.\u00ba 28, G-3, 2.\u00ba andar, Macau",
    "value": [
      113.536436,
      22.194629
    ]
  },
  {
    "name": "HOI VAN",
    "classname_en": "Economical accommodation establishments",
    "tel": "28514992",
    "room_no": 14,
    "type": "hotel",
    "address_en": "Rua de Francisco Ant\u00f3nio, n.\u00ba 9, 1.\u00ba-J, Macau",
    "value": [
      113.535334,
      22.193479
    ]
  },
  {
    "name": "HOU VA",
    "classname_en": "Economical accommodation establishments",
    "tel": "28256577",
    "room_no": 12,
    "type": "hotel",
    "address_en": "Rua da Ribeira do Patane, n.\u00ba 86, D, 1\u00ba andar, Macau",
    "value": [
      113.539713,
      22.202815
    ]
  },
  {
    "name": "MAN-KOK",
    "classname_en": "Economical accommodation establishments",
    "tel": "28937889",
    "room_no": 13,
    "type": "hotel",
    "address_en": "Rua das Lorchas, n.\u00bas 231 a 237, 2\u00ba andar, Macau",
    "value": [
      113.535752,
      22.194369
    ]
  },
  {
    "name": "IOK CHU",
    "classname_en": "Economical accommodation establishments",
    "tel": "28525006 / 66262967",
    "room_no": 6,
    "type": "hotel",
    "address_en": "Rua de Silva Mendes n.\u00ba 45, r/c, Macau",
    "value": [
      113.551391,
      22.202706
    ]
  },
  {
    "name": "KA VA",
    "classname_en": "Economical accommodation establishments",
    "tel": "28323063",
    "room_no": 28,
    "type": "hotel",
    "address_en": "Cal\u00e7ada de S. Jo\u00e3o, n\u00ba 5, Macau",
    "value": [
      113.541427,
      22.193174
    ]
  },
  {
    "name": "NEW GOLDEN GATE",
    "classname_en": "Economical accommodation establishments",
    "tel": "28550430",
    "room_no": 15,
    "type": "hotel",
    "address_en": "Avenida do Ouvidor Arriaga, n.\u00ba 76, 1\u00ba andar \"C1\", 2\u00ba andar \"E2\" e \"F2\", Edif\u00edcio \"Kam Mun\", Macau",
    "value": [
      113.54698,
      22.204785
    ]
  },
  {
    "name": "PENS\u00c3O CASA DE MACAU",
    "classname_en": "Economical accommodation establishments",
    "tel": "28573629",
    "room_no": 16,
    "type": "hotel",
    "address_en": "Rua de Ponte e Horta, n.\u00ba 4, 2.\u00ba andar, A, B e C, Macau",
    "value": [
      113.536416,
      22.193462
    ]
  },
  {
    "name": "NAM LONG",
    "classname_en": "Economical accommodation establishments",
    "tel": "28712573",
    "room_no": 8,
    "type": "hotel",
    "address_en": "Rua do Dr. Pedro Jos\u00e9 Lobo n.\u00ba 30, Kam Loi I 1\u00ba e 2\u00ba andares C, Macau",
    "value": [
      113.541873,
      22.192284
    ]
  },
  {
    "name": "PENS\u00c3O LOTUS",
    "classname_en": "2-star Hotel",
    "tel": "28482842",
    "room_no": 8,
    "type": "hotel",
    "address_en": "Avenida de D. Jo\u00e3o IV, n.\u00ba 8, 2\u00ba andar, Macau",
    "value": [
      113.542824,
      22.192153
    ]
  },
  {
    "name": "PENS\u00c3O WA FAT",
    "classname_en": "Economical accommodation establishments",
    "tel": "28880828",
    "room_no": 13,
    "type": "hotel",
    "address_en": "Avenida da Praia Grande, n.\u00ba 622, 2.\u00ba andar, Macau",
    "value": [
      113.541517,
      22.192483
    ]
  },
  {
    "name": "HOSPEDARIA SAN VA",
    "classname_en": "Economical accommodation establishments",
    "tel": "28573701",
    "room_no": 39,
    "type": "hotel",
    "address_en": "Rua da Felicidade, n.\u00ba 67, 1.\u00ba a 3.\u00ba andares, Macau",
    "value": [
      113.537465,
      22.194667
    ]
  },
  {
    "name": "PENS\u00c3O YUE ZI",
    "classname_en": "Economical accommodation establishments",
    "tel": "66727747",
    "room_no": 10,
    "type": "hotel",
    "address_en": "Avenida do Coronel Mesquita, n.\u00ba 7-A, Macau",
    "value": [
      113.551208,
      22.202849
    ]
  },
  {
    "name": "TAI LOI",
    "classname_en": "Economical accommodation establishments",
    "tel": "28939315",
    "room_no": 7,
    "type": "hotel",
    "address_en": "Travessa das Virtudes, n\u00ba. 20, 1\u00ba andar, Macau",
    "value": [
      113.536561,
      22.194561
    ]
  },
  {
    "name": "TIN LAI",
    "classname_en": "Economical accommodation establishments",
    "tel": "28522015",
    "room_no": 12,
    "type": "hotel",
    "address_en": "Rua do Almirante Costa Cabral, n.\u00ba 77-A, 1\u00ba a 4\u00ba andares, Macau",
    "value": [
      113.545716,
      22.199842
    ]
  },
  {
    "name": "VILA TONG KENG",
    "classname_en": "Economical accommodation establishments",
    "tel": "28937722",
    "room_no": 12,
    "type": "hotel",
    "address_en": "Travessa da Felicidade, n.\u00ba 10, 2\u00ba andar, Ed\u00edficio Cheng Peng, Macau",
    "value": [
      113.537217,
      22.194696
    ]
  },
  {
    "name": "TUNG FONG",
    "classname_en": "Economical accommodation establishments",
    "tel": "28572710",
    "room_no": 38,
    "type": "hotel",
    "address_en": "Travessa da Felicidade, n.\u00ba 11, Macau",
    "value": [
      113.537077,
      22.194546
    ]
  },
  {
    "name": "VILA UNIVERSAL",
    "classname_en": "2-star Hotel",
    "tel": "28573247",
    "room_no": 32,
    "type": "hotel",
    "address_en": "Rua da Felicidade, n.\u00ba 73, r/c e Kuoc-chai, Macau",
    "value": [
      113.537364,
      22.194886
    ]
  },
  {
    "name": "VENG VA",
    "classname_en": "Economical accommodation establishments",
    "tel": "28933381",
    "room_no": 10,
    "type": "hotel",
    "address_en": "Travessa das Virtudes, n\u00bas 20 e 26, 2\u00ba andar, Macau",
    "value": [
      113.536623,
      22.19449
    ]
  },
  {
    "name": "VO PENG",
    "classname_en": "Economical accommodation establishments",
    "tel": "28573598",
    "room_no": 51,
    "type": "hotel",
    "address_en": "Rua da Caldeira, n.\u00ba 39, 1\u00ba e 2\u00ba andares, Macau",
    "value": [
      113.537344,
      22.195306
    ]
  },
  {
    "name": "HOTEL CENTRAL",
    "classname_en": "2-star Hotel",
    "tel": "28373737",
    "room_no": 114,
    "type": "hotel",
    "address_en": "Avenida de Almeida Ribeiro, n.\u00bas 264 e 270, 4\u00ba a 10\u00ba andares, Macau",
    "value": [
      113.539136,
      22.194303
    ]
  },
  {
    "name": "POUSADA DE COLOANE",
    "classname_en": "4-star Hotel",
    "tel": "28882143 / 28882144",
    "room_no": 22,
    "type": "hotel",
    "address_en": "Junto \u00e0 praia de Cheoc Van, Coloane",
    "value": [
      113.561696,
      22.11404
    ]
  },
  {
    "name": "EAST ASIA",
    "classname_en": "2-star Hotel",
    "tel": "28775555",
    "room_no": 98,
    "type": "hotel",
    "address_en": "Rua da Madeira, n.\u00ba 1-A, Macau",
    "value": [
      113.537358,
      22.196543
    ]
  },
  {
    "name": "HOLIDAY",
    "classname_en": "2-star Hotel",
    "tel": "28350161",
    "room_no": 44,
    "type": "hotel",
    "address_en": "Estrada do Repouso n.\u00bas 36 e 38, 1.\u00ba a 5.\u00ba andares, Macau",
    "value": [
      113.543668,
      22.19763
    ]
  },
  {
    "name": "LISBOA",
    "classname_en": "5-star Hotel",
    "tel": "28883888",
    "room_no": 1071,
    "type": "hotel",
    "address_en": "N.\u00bas 1, 3 e 5 da Pra\u00e7a de Ferreira do Amaral, n.\u00bas 2 e 4 da Avenida de Lisboa e n.\u00bas 1 e 3 da Avenida de Lopo Sarmento de Carvalho, Macau",
    "value": [
      113.544364,
      22.189912
    ]
  },
  {
    "name": "SINTRA",
    "classname_en": "3-star Hotel",
    "tel": "28710111",
    "room_no": 240,
    "type": "hotel",
    "address_en": "Avenida de D. Jo\u00e3o IV, n.\u00bas 58, 60 e 62 e Avenida Doutor M\u00e1rio Soares, n.\u00bas 115, 117 e 119, Macau",
    "value": [
      113.541451,
      22.19107
    ]
  },
  {
    "name": "MENG MENG",
    "classname_en": "Economical accommodation establishments",
    "tel": "66523891",
    "room_no": 5,
    "type": "hotel",
    "address_en": "Rua do Dr. Pedro Jos\u00e9 Lobo n\u00ba 24, 2\u00ba andar, bloco \"I\", Macau",
    "value": [
      113.541703,
      22.192119
    ]
  },
  {
    "name": "METR\u00d3POLE",
    "classname_en": "3-star Hotel",
    "tel": "28388166",
    "room_no": 112,
    "type": "hotel",
    "address_en": "Avenida da Praia Grande, n.\u00bas 493 e 501, Macau",
    "value": [
      113.540284,
      22.192218
    ]
  },
  {
    "name": "TIN TIN",
    "classname_en": "Economical accommodation establishments",
    "tel": "66523891",
    "room_no": 4,
    "type": "hotel",
    "address_en": "P\u00e1tio do Comandante Mata e Oliveira, n.\u00ba 100, bloco \"L\", 1\u00ba andar, Macau",
    "value": [
      113.542063,
      22.192049
    ]
  },
  {
    "name": "S\u00c3O TIAGO DA BARRA",
    "classname_en": "5-star Hotel",
    "tel": "28551524",
    "room_no": 13,
    "type": "hotel",
    "address_en": "Avenida da Rep\u00fablica, na Fortaleza de S. Tiago da Barra, Macau",
    "value": [
      113.530665,
      22.182427
    ]
  },
  {
    "name": "PRESIDENT HOTEL",
    "classname_en": "4-star Hotel",
    "tel": "28553888",
    "room_no": 278,
    "type": "hotel",
    "address_en": "Avenida da Amizade, n.\u00ba 355, Macau",
    "value": [
      113.546932,
      22.190378
    ]
  },
  {
    "name": "ROYAL",
    "classname_en": "5-star Hotel",
    "tel": "28552222",
    "room_no": 381,
    "type": "hotel",
    "address_en": "Estrada da Vit\u00f3ria, n.\u00bas 2-4, Macau",
    "value": [
      113.547224,
      22.196126
    ]
  },
  {
    "name": "ARTYZEN GRAND LAPA MACAU",
    "classname_en": "5-star Hotel",
    "tel": "28567888",
    "room_no": 426,
    "type": "hotel",
    "address_en": "Avenida da Amizade, n.\u00bas 956-1110, Macau",
    "value": [
      113.553601,
      22.192502
    ]
  },
  {
    "name": "REGENCY ART HOTEL",
    "classname_en": "5-star Hotel",
    "tel": "28831234",
    "room_no": 326,
    "type": "hotel",
    "address_en": "Estrada Almirante Marques Esparteiro, n\u00ba 2, Taipa",
    "value": [
      113.553585,
      22.162233
    ]
  },
  {
    "name": "GUIA",
    "classname_en": "3-star Hotel",
    "tel": "28513888",
    "room_no": 90,
    "type": "hotel",
    "address_en": "Estrada do Engenheiro Trigo n\u00bas 1-5, com porta lateral na Cal\u00e7ada do Paiol n\u00ba 25, Macau",
    "value": [
      113.548548,
      22.195913
    ]
  },
  {
    "name": "HOTEL BEVERLY PLAZA",
    "classname_en": "4-star Hotel",
    "tel": "28782288",
    "room_no": 300,
    "type": "hotel",
    "address_en": "Avenida do Dr. Rodrigo Rodrigues, n.\u00bas 70, 86, 94, 98 e 106, r/c, s/l e andares superiores, Macau",
    "value": [
      113.545748,
      22.191057
    ]
  },
  {
    "name": "RIVIERA HOTEL MACAU",
    "classname_en": "5-star Hotel",
    "tel": "28339955",
    "room_no": 161,
    "type": "hotel",
    "address_en": "Rua da Boa Vista, n\u00ba 2 e Rua do Comendador Kou H\u00f3 Neng, n\u00ba 7 a 13, Macau",
    "value": [
      113.535261,
      22.186213
    ]
  },
  {
    "name": "MACAU MASTERS HOTEL",
    "classname_en": "2-star Hotel",
    "tel": "28937572",
    "room_no": 75,
    "type": "hotel",
    "address_en": "Rua das Lorchas, n.\u00bas 162 e 178, 1\u00ba, 5\u00ba e 6\u00ba andar",
    "value": [
      113.535708,
      22.194906
    ]
  },
  {
    "name": "EMPEROR HOTEL",
    "classname_en": "3-star Hotel",
    "tel": "28781888",
    "room_no": 398,
    "type": "hotel",
    "address_en": "Rua de Xangai, n.\u00ba 51 e Rua de Pequim, n.\u00ba 106-I, Macau",
    "value": [
      113.548002,
      22.191087
    ]
  },
  {
    "name": "CITY VIVA HOTEL",
    "classname_en": "3-star Hotel",
    "tel": "28800888",
    "room_no": 281,
    "type": "hotel",
    "address_en": "Rua de Xiamen, n.\u00ba 59, tendo tamb\u00e9m acesso pela porta n.\u00ba 37-A dessa Rua e n.\u00ba 230 da Rua de Lu\u00eds Gonzaga Gomes, Macau",
    "value": [
      113.552006,
      22.193065
    ]
  },
  {
    "name": "FORTUNA",
    "classname_en": "3-star Hotel",
    "tel": "28786333",
    "room_no": 386,
    "type": "hotel",
    "address_en": "Rua de Cant\u00e3o, n.\u00bas 49, 57 e 63, Pra\u00e7a de D. Afonso Henriques, n.\u00bas 76, 80, 90 e Rua de Foshan, n.\u00bas 48-A a 48-G, 56, 60, 62, 64 e 78, Macau",
    "value": [
      113.546044,
      22.190465
    ]
  },
  {
    "name": "JAI ALAI",
    "classname_en": "2-star Hotel",
    "tel": "88012788",
    "room_no": 132,
    "type": "hotel",
    "address_en": "Avenida do Dr. Rodrigo Rodrigues, Hotel \"Jai Alai\", Macau",
    "value": [
      113.554752,
      22.19757
    ]
  },
  {
    "name": "HOLIDAY INN MACAU",
    "classname_en": "4-star Hotel",
    "tel": "28783333",
    "room_no": 424,
    "type": "hotel",
    "address_en": "Rua de Pequim, n.\u00bas 68, 82, 86, 102-A, 102-B, 102-C e 102-D, com acesso pelas portas n.\u00bas 93-F e 93-G da Rua de Xangai, Macau",
    "value": [
      113.547389,
      22.191397
    ]
  },
  {
    "name": "GRAND COLOANE RESORT",
    "classname_en": "5-star Hotel",
    "tel": "28871111",
    "room_no": 208,
    "type": "hotel",
    "address_en": "Estrada de H\u00e1c-S\u00e1, n\u00ba. 1918, Coloane",
    "value": [
      113.576734,
      22.12537
    ]
  },
  {
    "name": "METROPARK HOTEL",
    "classname_en": "4-star Hotel",
    "tel": "28781233",
    "room_no": 347,
    "type": "hotel",
    "address_en": "Rua de Pequim, n\u00ba. 199, Macau",
    "value": [
      113.548285,
      22.192248
    ]
  },
  {
    "name": "HONG THAI HOTEL",
    "classname_en": "2-star Hotel",
    "tel": "28923923",
    "room_no": 20,
    "type": "hotel",
    "address_en": "Rua de Cinco de Outubro, n.\u00bas 177, 177-A, 179 e 179-A e Rua da Caldeira, n.\u00bas 18, 18-A, 18-B, 18-C e 18-D, r/c, 1.\u00ba a 4.\u00ba andares, Macau",
    "value": [
      113.536875,
      22.195609
    ]
  },
  {
    "name": "HAPPY FAMILY HOTEL",
    "classname_en": "2-star Hotel",
    "tel": "28711212",
    "room_no": 25,
    "type": "hotel",
    "address_en": "Travessa da Praia Grande, n.\u00ba 4, Macau",
    "value": [
      113.542675,
      22.19222
    ]
  },
  {
    "name": "PENS\u00c3O RESIDENCIAL FLORIDA",
    "classname_en": "2-star Hotel",
    "tel": "28923198",
    "room_no": 52,
    "type": "hotel",
    "address_en": "Travessa do Paralelo, n.\u00ba 6 e 8 Beco do Paralelo, n.\u00bas 3 e 5, Macau",
    "value": [
      113.53882,
      22.194758
    ]
  },
  {
    "name": "HOTEL CASA REAL",
    "classname_en": "4-star Hotel",
    "tel": "28726288",
    "room_no": 374,
    "type": "hotel",
    "address_en": "Rua da Malaca, n.\u00ba 206 e Avenida do Dr. Rodrigo Rodrigues, n.\u00ba 1118, Macau",
    "value": [
      113.553624,
      22.196683
    ]
  },
  {
    "name": "S HOTEL",
    "classname_en": "2-star Hotel",
    "tel": "28939393",
    "room_no": 178,
    "type": "hotel",
    "address_en": "Pra\u00e7a de Ponte e Horta, n.\u00bas 14 e 16, Travessa dos Trens, n.\u00ba 2 e Rua do Bocage, n.\u00bas 2-2B, Macau",
    "value": [
      113.535992,
      22.193861
    ]
  },
  {
    "name": "FU HUA HOTEL",
    "classname_en": "3-star Hotel",
    "tel": "28553838",
    "room_no": 141,
    "type": "hotel",
    "address_en": "Rua de Francisco Xavier Pereira, n.\u00bas 98 a 102, Macau",
    "value": [
      113.546947,
      22.202423
    ]
  },
  {
    "name": "GRANDVIEW HOTEL",
    "classname_en": "4-star Hotel",
    "tel": "28837788",
    "room_no": 487,
    "type": "hotel",
    "address_en": "Estrada Governador Albano de Oliveira, n.\u00ba 142 e Rua de Fat San, n.\u00ba 16, Taipa",
    "value": [
      113.551945,
      22.157209
    ]
  },
  {
    "name": "FORSON RESIDENTIAL PENSION",
    "classname_en": "2-star Hotel",
    "tel": "28933199",
    "room_no": 28,
    "type": "hotel",
    "address_en": "Avenida de Almeida Ribeiro, n\u00bas 579, 583 e 587, Macau",
    "value": [
      113.536793,
      22.196112
    ]
  },
  {
    "name": "GOLDEN CROWN CHINA HOTEL",
    "classname_en": "4-star Hotel",
    "tel": "28851166",
    "room_no": 300,
    "type": "hotel",
    "address_en": "Estrada da Ponta da Cabrita, n.\u00bas 1166B, 1166C e 1166D, Taipa",
    "value": [
      113.574041,
      22.158491
    ]
  },
  {
    "name": "HOSTEL JIN WAN",
    "classname_en": "Economical accommodation establishments",
    "tel": "28780537",
    "room_no": 39,
    "type": "hotel",
    "address_en": "Pra\u00e7a de D. Afonso Henriques, n.\u00bas 57, 61 e 65, Avenida Dr. Rodrigo Rodrigues, n.\u00bas 10, 12 e 16 e Avenida Lopo Sarmento de Carvalho, n.\u00bas 126, 128 e 132, Macau",
    "value": [
      113.545099,
      22.19076
    ]
  },
  {
    "name": "ROYAL INFANTE HARBOUR VIEW HOTEL",
    "classname_en": "4-star Hotel",
    "tel": "28838333",
    "room_no": 298,
    "type": "hotel",
    "address_en": "Noroeste do espa\u00e7o entre as ilhas de Taipa e Coloane, a Sul do Hip\u00f3dromo da Taipa, Taipa",
    "value": [
      113.550676,
      22.149622
    ]
  },
  {
    "name": "NEW ORIENT LANDMARK HOTEL",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "83998888",
    "room_no": 439,
    "type": "hotel",
    "address_en": "Avenida da Amizade, n.\u00ba 555, Edif\u00edcio Macau Landmark, Macau",
    "value": [
      113.548753,
      22.191243
    ]
  },
  {
    "name": "WALDO HOTEL",
    "classname_en": "3-star Hotel",
    "tel": "28886688",
    "room_no": 161,
    "type": "hotel",
    "address_en": "Avenida da Amizade, n.\u00ba 1071, Macau",
    "value": [
      113.55305,
      22.193232
    ]
  },
  {
    "name": "SANDS",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "28883388",
    "room_no": 289,
    "type": "hotel",
    "address_en": "Avenida da Amizade, Edif\u00edcio do Casino \"Sands\", Macau",
    "value": [
      113.554849,
      22.191544
    ]
  },
  {
    "name": "INN HOTEL",
    "classname_en": "3-star Hotel",
    "tel": "28821666",
    "room_no": 285,
    "type": "hotel",
    "address_en": "Estrada Governador Nobre de Carvalho, n.\u00bas 812 e 848, Taipa",
    "value": [
      113.560369,
      22.156554
    ]
  },
  {
    "name": "GOLDEN DRAGON",
    "classname_en": "4-star Hotel",
    "tel": "28361999",
    "room_no": 483,
    "type": "hotel",
    "address_en": "Rua de Malaca, n.\u00bas 17, 35, 43, 83, 89 e 103, Macau (Porta principal est\u00e1 situada em Rua de Malaca, n.\u00bas 35 e 43)",
    "value": [
      113.55418,
      22.195595
    ]
  },
  {
    "name": "GRAND DRAGON HOTEL",
    "classname_en": "4-star Hotel",
    "tel": "28839933",
    "room_no": 385,
    "type": "hotel",
    "address_en": "Rua de Chaves, n.\u00ba 36, Taipa, em Macau",
    "value": [
      113.550882,
      22.157569
    ]
  },
  {
    "name": "VICTORIA HOTEL",
    "classname_en": "3-star Hotel",
    "tel": "28556688",
    "room_no": 126,
    "type": "hotel",
    "address_en": "Estrada do Arco, n\u00ba. 118, Macau",
    "value": [
      113.548559,
      22.210046
    ]
  },
  {
    "name": "GRAND EMPEROR HOTEL",
    "classname_en": "3-star Hotel",
    "tel": "28889988",
    "room_no": 311,
    "type": "hotel",
    "address_en": "Avenida Comercial de Macau, n.\u00bas 251-292D, Macau",
    "value": [
      113.540841,
      22.190559
    ]
  },
  {
    "name": "RIO HOTEL",
    "classname_en": "4-star Hotel",
    "tel": "28718718",
    "room_no": 449,
    "type": "hotel",
    "address_en": "Rua de Lu\u00eds Gonzaga Gomes, n.\u00ba 33 e Alameda Dr. Carlos D' Assump\u00e7\u00e3o, n.\u00ba 682, Macau",
    "value": [
      113.549901,
      22.192835
    ]
  },
  {
    "name": "BROADWAY HOTEL",
    "classname_en": "5-star Hotel",
    "tel": "88833338",
    "room_no": 314,
    "type": "hotel",
    "address_en": "Sul da Marina Taipa-Sul, junto \u00e0 Rotunda do Dique Oeste, Taipa",
    "value": [
      113.551876,
      22.146673
    ]
  },
  {
    "name": "WYNN",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "28889966",
    "room_no": 1014,
    "type": "hotel",
    "address_en": "Avenida de Sagres, Avenida 24 de Junho e Rua Cidade de Sintra, nos Novos Aterros do Porto Exterior, na zona B do empreendimento designado por \"Fecho da Ba\u00eda da Praia Grande\", Macau",
    "value": [
      113.546017,
      22.188303
    ]
  },
  {
    "name": "STARWORLD HOTEL",
    "classname_en": "5-star Hotel",
    "tel": "28383838",
    "room_no": 502,
    "type": "hotel",
    "address_en": "Rua Cidade de Sintra, n.\u00ba 338, Macau",
    "value": [
      113.548085,
      22.189655
    ]
  },
  {
    "name": "HOTEL ROCKS",
    "classname_en": "3-star Hotel",
    "tel": "28782782",
    "room_no": 72,
    "type": "hotel",
    "address_en": "Macau Fisherman's Wharf, junto \u00e0 Avenida da Amizade, Macau",
    "value": [
      113.557996,
      22.189885
    ]
  },
  {
    "name": "ALTIRA",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "28868888",
    "room_no": 216,
    "type": "hotel",
    "address_en": "Avenida de Kwong Tung, n.\u00bas 786, 798, 816 e 840, Taipa",
    "value": [
      113.555088,
      22.161831
    ]
  },
  {
    "name": "GRAND LISBOA HOTEL",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "28283838",
    "room_no": 431,
    "type": "hotel",
    "address_en": "Avenida de Lisboa, Macau",
    "value": [
      113.543261,
      22.190986
    ]
  },
  {
    "name": "THE VENETIAN MACAO",
    "classname_en": "5-star Hotel",
    "tel": "28828888",
    "room_no": 2874,
    "type": "hotel",
    "address_en": "COTAI, a Poente do Istmo Taipa-Coloane e a Sul da Ba\u00eda da Nossa Senhora de Esperan\u00e7a",
    "value": [
      113.560471,
      22.1482
    ]
  },
  {
    "name": "MGM MACAU",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "88028888",
    "room_no": 585,
    "type": "hotel",
    "address_en": "Avenida Dr. Sun Yat-Sen, n.\u00ba 1101, Macau",
    "value": [
      113.548117,
      22.185973
    ]
  },
  {
    "name": "SOFITEL MACAU AT PONTE 16",
    "classname_en": "5-star Hotel",
    "tel": "88610016",
    "room_no": 408,
    "type": "hotel",
    "address_en": "Rua das Lorchas e Rua do Visconde Pa\u00e7o de Arcos, entre Pontes 12A a 20, Macau",
    "value": [
      113.535901,
      22.197185
    ]
  },
  {
    "name": "FOUR SEASONS HOTEL MACAO",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "28818888",
    "room_no": 408,
    "type": "hotel",
    "address_en": "COTAI, a Poente do Istmo Taipa-Coloane e a Sul da Ba\u00eda da Nossa Senhora de Esperan\u00e7a, sito na parcela 1, zona 6 e zona 7",
    "value": [
      113.561637,
      22.145502
    ]
  },
  {
    "name": "N\u00dcWA",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "88686868",
    "room_no": 286,
    "type": "hotel",
    "address_en": "Estrada do Istmo e da Universidade de Ci\u00eancia e Tecnologia de Macau (\"City of Dreams\"), COTAI",
    "value": [
      113.56531,
      22.149822
    ]
  },
  {
    "name": "THE COUNTDOWN HOTEL",
    "classname_en": "4-star Hotel",
    "tel": "88686868",
    "room_no": 322,
    "type": "hotel",
    "address_en": "Estrada do Istmo e da Universidade de Ci\u00eancia e Tecnologia de Macau (\"City of Dreams\"), COTAI",
    "value": [
      113.566005,
      22.148427
    ]
  },
  {
    "name": "L'ARC HOTEL MACAU",
    "classname_en": "5-star Hotel",
    "tel": "28223388",
    "room_no": 283,
    "type": "hotel",
    "address_en": "Avenida 24 de Junho, n.\u00ba 278, Cave 2 a 22.\u00ba andar, Macau (\u00c0rea do Hotel)",
    "value": [
      113.548669,
      22.188585
    ]
  },
  {
    "name": "GRAND HYATT MACAU",
    "classname_en": "5-star Hotel",
    "tel": "88681234",
    "room_no": 763,
    "type": "hotel",
    "address_en": "Estrada do Istmo e da Universidade de Ci\u00eancia e Tecnologia de Macau (\"City of Dreams\"), COTAI",
    "value": [
      113.567633,
      22.148684
    ]
  },
  {
    "name": "HOTEL OKURA MACAU",
    "classname_en": "5-star Hotel",
    "tel": "88835060",
    "room_no": 488,
    "type": "hotel",
    "address_en": "COTAI, Nascente da Avenida Marginal Flor de L\u00f3tus e a Sul da Estrada da Ba\u00eda de Nossa Senhora de Esperan\u00e7a",
    "value": [
      113.552413,
      22.149223
    ]
  },
  {
    "name": "BANYAN TREE MACAU",
    "classname_en": "5-star Hotel",
    "tel": "88838833",
    "room_no": 256,
    "type": "hotel",
    "address_en": "COTAI, Nascente da Avenida Marginal Flor de L\u00f3tus e a Sul da Estrada da Ba\u00eda de Nossa Senhora de Esperan\u00e7a",
    "value": [
      113.55277,
      22.148821
    ]
  },
  {
    "name": "MANDARIN ORIENTAL MACAU",
    "classname_en": "5-star Hotel",
    "tel": "88058888",
    "room_no": 214,
    "type": "hotel",
    "address_en": "Avenida Dr. Sun Yat-Sen, n.\u00ba 945, Macau",
    "value": [
      113.546992,
      22.184254
    ]
  },
  {
    "name": "PENS\u00c3O KENG IUT",
    "classname_en": "Economical accommodation establishments",
    "tel": "28937761",
    "room_no": 23,
    "type": "hotel",
    "address_en": "Pra\u00e7a de Ponte e Horta e Travessa dos Trens, Macau",
    "value": [
      113.536343,
      22.193695
    ]
  },
  {
    "name": "GALAXY",
    "classname_en": "5-star Hotel",
    "tel": "28880888",
    "room_no": 1997,
    "type": "hotel",
    "address_en": "COTAI, Nascente da Avenida Marginal Flor de L\u00f3tus e a Sul da Estrada da Ba\u00eda de Nossa Senhora da Esperan\u00e7a",
    "value": [
      113.553466,
      22.150253
    ]
  },
  {
    "name": "OLE TAI SAM UN HOTEL",
    "classname_en": "2-star Hotel",
    "tel": "28938818",
    "room_no": 40,
    "type": "hotel",
    "address_en": "Rua da Caldeira, n\u00bas. 43-45, Macau",
    "value": [
      113.537465,
      22.195167
    ]
  },
  {
    "name": "TOWNSWELL MOTEL",
    "classname_en": "Economical accommodation establishments",
    "tel": "28356868",
    "room_no": 56,
    "type": "hotel",
    "address_en": "Cal\u00e7ada das Verdades, n.\u00bas 6 a 6A, Macau",
    "value": [
      113.542187,
      22.195015
    ]
  },
  {
    "name": "CONRAD MACAO",
    "classname_en": "5-star Hotel",
    "tel": "28829000",
    "room_no": 659,
    "type": "hotel",
    "address_en": "COTAI, a Poente do Istmo Taipa-Coloane, parcelas 5 e 6",
    "value": [
      113.56542,
      22.145382
    ]
  },
  {
    "name": "THE LONDONER MACAO HOTEL",
    "classname_en": "4-star Hotel",
    "tel": "28822878",
    "room_no": 594,
    "type": "hotel",
    "address_en": "COTAI, a Poente do Istmo Taipa-Coloane, parcelas 5 e 6",
    "value": [
      113.565364,
      22.146347
    ]
  },
  {
    "name": "LONDONER GRAND",
    "classname_en": "5-star Hotel",
    "tel": "28802000",
    "room_no": 3777,
    "type": "hotel",
    "address_en": "COTAI, a Poente do Istmo Taipa-Coloane, parcelas 5 e 6",
    "value": [
      113.56559,
      22.14418
    ]
  },
  {
    "name": "G HARBOUR",
    "classname_en": "3-star Hotel",
    "tel": "28221381",
    "room_no": 90,
    "type": "hotel",
    "address_en": "Travessa Lam Mau, n.\u00ba 8, Macau",
    "value": [
      113.537606,
      22.202641
    ]
  },
  {
    "name": "LOVE LANE SEVEN INN",
    "classname_en": "Economical accommodation establishments",
    "tel": "63168821",
    "room_no": 7,
    "type": "hotel",
    "address_en": "Travessa da Paix\u00e3o, n\u00ba. 7, Macau",
    "value": [
      113.540421,
      22.197216
    ]
  },
  {
    "name": "ASIA BOUTIQUE INN",
    "classname_en": "Economical accommodation establishments",
    "tel": "28223899",
    "room_no": 30,
    "type": "hotel",
    "address_en": "Rua Correia da Silva n.\u00ba 146, Taipa",
    "value": [
      113.556943,
      22.1528
    ]
  },
  {
    "name": "ASCOTT MACAU",
    "classname_en": "4-star Hotel",
    "tel": "28220688",
    "room_no": 110,
    "type": "hotel",
    "address_en": "Rua Cidade de Braga, n.\u00ba 339, Macau",
    "value": [
      113.549266,
      22.187001
    ]
  },
  {
    "name": "JW MARRIOTT HOTEL MACAU",
    "classname_en": "5-star Hotel",
    "tel": "88866003",
    "room_no": 1015,
    "type": "hotel",
    "address_en": "COTAI, Nascente da Avenida Marginal Flor de L\u00f3tus e a Sul da Estrada da Ba\u00eda de Nossa Senhora da Esperan\u00e7a",
    "value": [
      113.555589,
      22.146754
    ]
  },
  {
    "name": "THE RITZ-CARLTON MACAU",
    "classname_en": "5-star Hotel",
    "tel": "88866868",
    "room_no": 261,
    "type": "hotel",
    "address_en": "COTAI, Nascente da Avenida Marginal Flor de L\u00f3tus e a Sul da Estrada da Ba\u00eda de Nossa Senhora da Esperan\u00e7a",
    "value": [
      113.554401,
      22.146406
    ]
  },
  {
    "name": "CROWNE PLAZA MACAU",
    "classname_en": "5-star Hotel",
    "tel": "28886888",
    "room_no": 208,
    "type": "hotel",
    "address_en": "Rua da P\u00e9rola Oriental, edf. \"The Residencia Macau\", bloco 7, (cave 3 a 17.\u00ba andar), Macau",
    "value": [
      113.558221,
      22.212217
    ]
  },
  {
    "name": "HARBOURVIEW HOTEL",
    "classname_en": "4-star Hotel",
    "tel": "87996688",
    "room_no": 444,
    "type": "hotel",
    "address_en": "Avenida Amizade, s/n. no interior do Conjunto Tur\u00edstico \"Macau Fisherman\u2019s Wharf\", Macau",
    "value": [
      113.556158,
      22.190596
    ]
  },
  {
    "name": "PENS\u00c3O FAMILIA BILION\u00c1RIA",
    "classname_en": "Economical accommodation establishments",
    "tel": "28828273",
    "room_no": 17,
    "type": "hotel",
    "address_en": "P\u00e1tio das Flores, n.\u00bas 5-7, Macau",
    "value": [
      113.541365,
      22.193074
    ]
  },
  {
    "name": "PENS\u00c3O FAM\u00cdLIA PERFEITA",
    "classname_en": "Economical accommodation establishments",
    "tel": "28823629",
    "room_no": 36,
    "type": "hotel",
    "address_en": "Rua da Ribeira do Patane, n.\u00ba 32 e Travessa da Escama, n.\u00ba 12-12A, Macau",
    "value": [
      113.53784,
      22.201597
    ]
  },
  {
    "name": "PENS\u00c3O ELEGANTE",
    "classname_en": "Economical accommodation establishments",
    "tel": "28882858",
    "room_no": 35,
    "type": "hotel",
    "address_en": "Terreno junto \u00e0 Cal\u00e7ada de Eug\u00e9nio Gon\u00e7alves",
    "value": [
      113.535419,
      22.190535
    ]
  },
  {
    "name": "THE 13 HOTEL",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "28280098",
    "room_no": 199,
    "type": "hotel",
    "address_en": "Lote 1 do aterro da Conc\u00f3rdia, junto \u00e0 Estrada de Seac Pai Van, Coloane",
    "value": [
      113.558259,
      22.129253
    ]
  },
  {
    "name": "THE ST. REGIS MACAO",
    "classname_en": "5-star Hotel",
    "tel": "28828898",
    "room_no": 400,
    "type": "hotel",
    "address_en": "COTAI, a Poente do Istmo Taipa-Coloane, parcelas 5 e 6",
    "value": [
      113.565637,
      22.147528
    ]
  },
  {
    "name": "STUDIO CITY HOTEL",
    "classname_en": "4-star Hotel",
    "tel": "88658888",
    "room_no": 2493,
    "type": "hotel",
    "address_en": "COTAI, Zona G300, G310 e G400",
    "value": [
      113.561838,
      22.141037
    ]
  },
  {
    "name": "WYNN PALACE",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "88893888",
    "room_no": 1706,
    "type": "hotel",
    "address_en": "COTAI, junto \u00e0 Avenida da Nave Desportiva",
    "value": [
      113.571206,
      22.147696
    ]
  },
  {
    "name": "CARAVEL HOTEL",
    "classname_en": "2-star Hotel",
    "tel": "28250108",
    "room_no": 46,
    "type": "hotel",
    "address_en": "Rua de Guimar\u00e3es, n.\u00b0s 96-126, Macau",
    "value": [
      113.537269,
      22.198023
    ]
  },
  {
    "name": "PENS\u00c3O FAM\u00cdLIA ALEGRE",
    "classname_en": "Economical accommodation establishments",
    "tel": "28835807",
    "room_no": 62,
    "type": "hotel",
    "address_en": "Rua Central, n.\u00b0 4A, Macau",
    "value": [
      113.539758,
      22.192523
    ]
  },
  {
    "name": "LEGEND PALACE HOTEL",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "88018801",
    "room_no": 224,
    "type": "hotel",
    "address_en": "Avenida da Amizade e Avenida Dr. Sun Yat-Sen, Macau Fisherman\u2019s Wharf, Macau",
    "value": [
      113.556294,
      22.195369
    ]
  },
  {
    "name": "THE PARISIAN MACAO",
    "classname_en": "3-star Hotel",
    "tel": "28828833",
    "room_no": 2333,
    "type": "hotel",
    "address_en": "COTAI, Estrada do Istmo, Lote 3 da Parcela 1",
    "value": [
      113.560846,
      22.143694
    ]
  },
  {
    "name": "THE MACAU ROOSEVELT",
    "classname_en": "5-star Hotel",
    "tel": "82913223",
    "room_no": 368,
    "type": "hotel",
    "address_en": "Avenida dos Jogos da \u00c1sia Oriental, n.\u00bas 924 e 998, Taipa, em Macau",
    "value": [
      113.543494,
      22.155176
    ]
  },
  {
    "name": "PAIZA LOFTS",
    "classname_en": "3-star Apartment Hotel",
    "tel": "28828833",
    "room_no": 208,
    "type": "hotel",
    "address_en": "COTAI, Estrada do Istmo, Lote 3 da Parcela 1",
    "value": [
      113.560426,
      22.143022
    ]
  },
  {
    "name": "ROYAL DRAGON HOTEL",
    "classname_en": "3-star Hotel",
    "tel": "28261999",
    "room_no": 144,
    "type": "hotel",
    "address_en": "Quarteir\u00e3o 9, Lote B2 do ZAPE, Macau",
    "value": [
      113.550187,
      22.193434
    ]
  },
  {
    "name": "SAN TUNG FONG COMMERCIAL INN, SOUTH WING",
    "classname_en": "Economical accommodation establishments",
    "tel": "28999888",
    "room_no": 89,
    "type": "hotel",
    "address_en": "Terreno junto \u00e0 Avenida de Almeida Ribeiro e Travessa da Cordoaria, Macau",
    "value": [
      113.537584,
      22.195678
    ]
  },
  {
    "name": "PENS\u00c3O \"COLOANE N.\u00ba 1\"",
    "classname_en": "Economical accommodation establishments",
    "tel": "28473971",
    "room_no": 11,
    "type": "hotel",
    "address_en": "Rua do Caetano n.\u00b0s 45-47, Coloane",
    "value": [
      113.55122,
      22.116354
    ]
  },
  {
    "name": "MGM COTAI",
    "classname_en": "5-star Hotel",
    "tel": "88068888",
    "room_no": 1418,
    "type": "hotel",
    "address_en": "COTAI, junto \u00e0 Avenida da Nave Desportiva",
    "value": [
      113.568297,
      22.145071
    ]
  },
  {
    "name": "I FU HOTEL",
    "classname_en": "2-star Hotel",
    "tel": "28920332",
    "room_no": 41,
    "type": "hotel",
    "address_en": "Rua Nova do Com\u00e9rcio, n.\u00bas 32-34 e Rua do Bispo Enes, n.\u00bas 8-14, Macau",
    "value": [
      113.537179,
      22.197426
    ]
  },
  {
    "name": "JIN JIANG INN",
    "classname_en": "2-star Hotel",
    "tel": "28261740",
    "room_no": 144,
    "type": "hotel",
    "address_en": "Rua Norte do Canal das Hortas n.\u00bas 128 e 136, Macau",
    "value": [
      113.545239,
      22.213998
    ]
  },
  {
    "name": "PENS\u00c3O CASA DE L\u00d3TUS",
    "classname_en": "Economical accommodation establishments",
    "tel": "28351358",
    "room_no": 23,
    "type": "hotel",
    "address_en": "Rua dos Ervan\u00e1rios, n.\u00bas. 32 e 36, Macau",
    "value": [
      113.539913,
      22.196227
    ]
  },
  {
    "name": "TREASURE HOTEL",
    "classname_en": "3-star Hotel",
    "tel": "28850188",
    "room_no": 654,
    "type": "hotel",
    "address_en": "Estrada da Ponta da Cabrita, n.\u00b0s 1048 a 1106 e Avenida Wai Long, n.\u00b0s 1145 a 1235-A, Taipa",
    "value": [
      113.57364,
      22.158018
    ]
  },
  {
    "name": "DORMY BOUTIQUE HOTEL",
    "classname_en": "2-star Hotel",
    "tel": "28788662",
    "room_no": 51,
    "type": "hotel",
    "address_en": "Travessa do Tudum, n.\u00bas 2\u20136 e Cal\u00e7ada da Rocha, n.\u00ba 12, Macau",
    "value": [
      113.541667,
      22.195825
    ]
  },
  {
    "name": "HOLIDAY INN EXPRESS MACAO CITY CENTRE",
    "classname_en": "2-star Hotel",
    "tel": "85908888",
    "room_no": 259,
    "type": "hotel",
    "address_en": "Avenida do Dr. Rodrigo Rodrigues, n.\u00bas 338 \u2013 362B, Rua de Xangai, 196A \u2013 200, Macau",
    "value": [
      113.547687,
      22.192417
    ]
  },
  {
    "name": "PENS\u00c3O FAM\u00cdLIA (RUA DE MIGUEL AIRES)",
    "classname_en": "Economical accommodation establishments",
    "tel": "28280012",
    "room_no": 13,
    "type": "hotel",
    "address_en": "Rua de Miguel Aires, n\u00ba 15A, em Macau",
    "value": [
      113.537221,
      22.197164
    ]
  },
  {
    "name": "MORPHEUS",
    "classname_en": "5-star Hotel",
    "tel": "88688888",
    "room_no": 783,
    "type": "hotel",
    "address_en": "Avenida Doutor Henry Fok (\"City of Dreams\"), COTAI",
    "value": [
      113.566588,
      22.149834
    ]
  },
  {
    "name": "HOTEL CINCO OCEANOS",
    "classname_en": "2-star Hotel",
    "tel": "28882736",
    "room_no": 97,
    "type": "hotel",
    "address_en": "Rua do Bocage, n.\u00bas 21-35 e Rua das Lorchas, n.\u00ba 179, Macau",
    "value": [
      113.536141,
      22.194561
    ]
  },
  {
    "name": "BELIVE ANDMORE",
    "classname_en": "Economical accommodation establishments",
    "tel": "28509110",
    "room_no": 55,
    "type": "hotel",
    "address_en": "Rua do Almirante S\u00e9rgio n.\u00b0s 44 \u2013 48, Macau",
    "value": [
      113.534157,
      22.191764
    ]
  },
  {
    "name": "LISBOA CITIZEN",
    "classname_en": "4-star Hotel",
    "tel": "88826888",
    "room_no": 820,
    "type": "hotel",
    "address_en": "Rotunda da Central T\u00e9rmica de Coloane, COTAI",
    "value": [
      113.57582,
      22.142602
    ]
  },
  {
    "name": "CITY INN",
    "classname_en": "Economical accommodation establishments",
    "tel": "28717668",
    "room_no": 58,
    "type": "hotel",
    "address_en": "Rua de Cinco de Outubro, n.\u00bas 126 \u2013 130, Rua do Guimar\u00e3es, n.\u00ba 247 e Rua do Pagode, n.\u00bas 2 \u2013 2A, Macau",
    "value": [
      113.537585,
      22.196648
    ]
  },
  {
    "name": "PENS\u00c3O ELEGANTE (RUA DA FELICIDADE)",
    "classname_en": "Economical accommodation establishments",
    "tel": "28886812",
    "room_no": 8,
    "type": "hotel",
    "address_en": "Beco das Galinhas, n\u00ba 3, Macau",
    "value": [
      113.537662,
      22.193546
    ]
  },
  {
    "name": "MARINA PHANTOM APARTMENT HOTEL",
    "classname_en": "3-star Apartment Hotel",
    "tel": "28226222",
    "room_no": 430,
    "type": "hotel",
    "address_en": "Terreno junto \u00e0 Avenida Marginal Flor de L\u00f3tus e \u00e0 Avenida dos Jogos da \u00c1sia Oriental (a parte de amplia\u00e7\u00e3o), Taipa",
    "value": [
      113.550839,
      22.149011
    ]
  },
  {
    "name": "ENGLAND MARINA CLUB HOTEL",
    "classname_en": "3-star Hotel",
    "tel": "28828383",
    "room_no": 399,
    "type": "hotel",
    "address_en": "Terreno junto \u00e0 Avenida Marginal Flor de L\u00f3tus e \u00e0 Avenida dos Jogos da \u00c1sia Oriental (a parte de amplia\u00e7\u00e3o), Taipa",
    "value": [
      113.550308,
      22.148957
    ]
  },
  {
    "name": "ANDAZ MACAU",
    "classname_en": "5-star Hotel",
    "tel": "88861234",
    "room_no": 715,
    "type": "hotel",
    "address_en": "COTAI, Nascente da Avenida Marginal Flor de L\u00f3tus e a Sul da Estrada da Ba\u00eda de Nossa Senhora da Esperan\u00e7a",
    "value": [
      113.556755,
      22.144216
    ]
  },
  {
    "name": "THE GRAND SUITES AT FOUR SEASONS",
    "classname_en": "4-star Apartment Hotel",
    "tel": "28818888",
    "room_no": 289,
    "type": "hotel",
    "address_en": "COTAI, a Poente do Istmo Taipa-Coloane e a Sul da Estrada da Ba\u00eda de Nossa Senhora da Esperan\u00e7a, Zona 6 e Zona 8, pisos B1 a L40 e LMR",
    "value": [
      113.561855,
      22.146288
    ]
  },
  {
    "name": "GRAND LISBOA PALACE",
    "classname_en": "5-star Deluxe Hotel",
    "tel": "88818888",
    "room_no": 1892,
    "type": "hotel",
    "address_en": "COTAI, Rua do Tiro, Rua da Patinagem, Rua de T\u00e9nis e Avenida do Aeroporto",
    "value": [
      113.574216,
      22.144018
    ]
  },
  {
    "name": "PENS\u00c3O ELEGANTE (RU\u00cdNAS DA ANTIGA CATEDRAL DE S\u00c3O PAULO)",
    "classname_en": "Economical accommodation establishments",
    "tel": "28992839",
    "room_no": 17,
    "type": "hotel",
    "address_en": "Rua de Santa Filomena, n.\u00ba 20 (P\u00e1tio do Manto, n.\u00ba 19 e junto a esta rua e ao referido p\u00e1tio), Macau",
    "value": [
      113.541681,
      22.195354
    ]
  },
  {
    "name": "LONDONER COURT",
    "classname_en": "4-star Apartment Hotel",
    "tel": "28886388",
    "room_no": 368,
    "type": "hotel",
    "address_en": "COTAI, a Poente do Istmo Taipa-Coloane, parcelas 5 e 6",
    "value": [
      113.565364,
      22.146347
    ]
  },
  {
    "name": "CHINA DRAGON HOTEL",
    "classname_en": "2-star Hotel",
    "tel": "28301999",
    "room_no": 185,
    "type": "hotel",
    "address_en": "Avenida da Praia Grande n.\u00ba 944, Macau",
    "value": [
      113.543707,
      22.191849
    ]
  },
  {
    "name": "YOHO TREASURE ISLAND RESORTS WORLD HOTEL",
    "classname_en": "5-star Hotel",
    "tel": "28993300",
    "room_no": 600,
    "type": "hotel",
    "address_en": "Rua do Leste do Lago n.\u00bas 229, 239 e 249, Macau",
    "value": [
      113.542858,
      22.187291
    ]
  },
  {
    "name": "PENS\u00c3O FAM\u00cdLIA (RUA DE CAMILO PESSANHA)",
    "classname_en": "Economical accommodation establishments",
    "tel": "28329222",
    "room_no": 32,
    "type": "hotel",
    "address_en": "Rua de Camilo Pessanha n\u00bas 11-13 e Beco do Ch\u00e1 n\u00ba 2, Macau",
    "value": [
      113.539124,
      22.196017
    ]
  },
  {
    "name": "PENS\u00c3O FAM\u00cdLIA (RUA DAS ESTALAGENS)",
    "classname_en": "Economical accommodation establishments",
    "tel": "28238222",
    "room_no": 18,
    "type": "hotel",
    "address_en": "Rua das Estalagens N.\u00ba 46-50, Beco dos Cotovelos N.\u00ba 1, Macau",
    "value": [
      113.538861,
      22.196394
    ]
  },
  {
    "name": "GRANDE HOTEL MACAU",
    "classname_en": "2-star Hotel",
    "tel": "28232888",
    "room_no": 124,
    "type": "hotel",
    "address_en": "Avenida de Almeida Ribeiro, n.\u00ba 612 e Rua Nova do Com\u00e9rcio, n.\u00ba 5, Macau",
    "value": [
      113.536728,
      22.196373
    ]
  },
  {
    "name": "GREENERY INN",
    "classname_en": "Economical accommodation establishments",
    "tel": "28339993",
    "room_no": 113,
    "type": "hotel",
    "address_en": "Junto \u00e0 Estrada do Arco, n.\u00ba 21, A R/C, Macau",
    "value": [
      113.547932,
      22.210337
    ]
  },
  {
    "name": "PENS\u00c3O FAM\u00cdLIA (TEMPLO DE HONG KUNG)",
    "classname_en": "Economical accommodation establishments",
    "tel": "28811222",
    "room_no": 45,
    "type": "hotel",
    "address_en": "Rua de Guimar\u00e3es, n.\u00b0s 233-237, e Rua de Cinco de Outubro, n.\u00b0s 120 \u2013 122, Macau",
    "value": [
      113.537455,
      22.196873
    ]
  },
  {
    "name": "SAN TUNG FONG COMMERCIAL INN NORTH WING",
    "classname_en": "Economical accommodation establishments",
    "tel": "28777333",
    "room_no": 62,
    "type": "hotel",
    "address_en": "Avenida de Almeida Ribeiro, n.\u00ba 514 - 546, Rua de Cinco de Outubro, n.\u00bas 159 -161 e Travessa da Cordoaria, n.\u00ba 10, Macau",
    "value": [
      113.537297,
      22.195813
    ]
  }
];

	let map = null;
	const center = ref([113.543028, 22.186835]);
	const zoom = ref(13);
	let labelsLayer = null;
	let labelMarkers = [];

	onMounted(() => {
	  AMapLoader.load({
		key: "b13953f0423806b6565ff927a6cd84a5", // 申请好的Web端开发者Key，首次调用 load 时必填
		version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: ["AMap.Scale","AMap.LabelsLayer"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
	  })
		.then((AMap) => {
		  map = new AMap.Map("container", {
			// 设置地图容器id
			pitch: 50,
			viewMode: "2D", // 是否为3D地图模式
			zoom: zoom.value, // 初始化地图级别
			center: center.value, // 初始化地图中心点位置
			lang: "en", // 设置地图为英文
			clickable: false // 设置地图不可点击
		  });
		  
		  labelsLayer = new AMap.LabelsLayer({
		    zooms: [2, 20],
		    zIndex: 999,
		    collision: false, //该层内标注是否避让
		    allowCollision: true, //不同标注层之间是否避让  
		  });
		  
		  map.add(labelsLayer);
		  setTimeout(updateMarkers,500);
		})
		.catch((e) => {
		  console.log(e);
		});
	});
	
	onUnmounted(()=>{
		map?.destroy();
	});
	

	const markers = {
		Hotel: hotelData,
		Drinking: waterFountains,
		Toilet: publicToilets,
		Rest: restAreas,
		
	};
	const markerImages = {
		water: "https://img.macautourism.top/tourism/tourism/assert/2024/11/09/water.png",
		restroom: "https://img.macautourism.top/tourism/tourism/assert/2024/11/09/restroom.png",
		restarea: "https://img.macautourism.top/tourism/tourism/assert/2024/11/09/restarea.png",
		hotel: "https://img.macautourism.top/tourism/tourism/assert/2024/11/09/Hotel.png",
	}
	
	//图标对象
	const waterIcon = {
	  type: "image", //图标类型，现阶段只支持 image 类型
	  image: markerImages.water, //可访问的图片 URL
	  size: [25, 25], //图片尺寸
	  anchor: "top-left", //图片相对 position 的锚点，默认为 bottom-center
	};
	const restroomIcon = {
	  type: "image", //图标类型，现阶段只支持 image 类型
	  image: markerImages.restroom, //可访问的图片 URL
	  size: [25, 25], //图片尺寸
	  anchor: "top-left", //图片相对 position 的锚点，默认为 bottom-center
	};
	const restareaIcon = {
	  type: "image", //图标类型，现阶段只支持 image 类型
	  image: markerImages.restarea, //可访问的图片 URL
	  size: [25, 25], //图片尺寸
	  anchor: "top-left", //图片相对 position 的锚点，默认为 bottom-center
	};
	const hotelIcon = {
	  type: "image", //图标类型，现阶段只支持 image 类型
	  image: markerImages.hotel, //可访问的图片 URL
	  size: [25, 25], //图片尺寸
	  anchor: "bottom-center", //图片相对 position 的锚点，默认为 bottom-center
	};
	
	function handleHotelClick(hotelName) {
	  selectedHotelName.value = hotelName;
	  dialogVisible.value = true;
	  console.log(hotelName)
	}
	

	function updateMarkers(){
		//清除之前的标記
		labelsLayer.remove(labelMarkers);
		labelMarkers = [];
		
		filteredMarkers.value.forEach((item)=>{
			let icon;
			let rankValue;
			
			// 计算偏移后的坐标
			const offset = 0.004;
			const offsetPosition = [
				item.value[0] + offset + 0.001, // x 坐标偏移
				item.value[1] - offset         // y 坐标偏移
			];
			
			switch(item.type){
				case 'water':
					icon = waterIcon;
					rankValue = 4
					break;
				case 'restroom':
					icon = restroomIcon;
					rankValue = 4
					break;
				case 'restarea':
					icon = restareaIcon;
					rankValue = 4
					break;
				case 'hotel':
					icon = hotelIcon;
					rankValue = 5;
					break;
			}
			const labelMarker = new AMap.LabelMarker({
				name: item.type,
				position: offsetPosition,
				zIndex: 1999,
				rank: rankValue,
				icon: icon,
				clickable: true,
				text:{
					content: item.name,
					style:{
						strokeColor: getTagColorByEn(item.type)
					}
				},
			});
			
			
			if (item.type === 'hotel') {
			  labelMarker.on('click', function() {
				handleHotelClick(item.name);
			  });
			  //labelMarker.events = {click(){handleHotelClick(item.type)}}
			  //AMap.Event.addListener(labelMarker,"click",()=>handleHotelClick(item.name))
			}
			labelMarkers.push(labelMarker)
		});
		//console.log(labelMarkers);
		labelsLayer.add(labelMarkers);
	}

/*
	const offset = 0.004;
	Object.values(markers).forEach(typeMarkers =>
		typeMarkers.forEach(item => {
			item.value[0] += offset + 0.001;
			item.value[1] -= offset;
		})
	);
	*/

	const filteredMarkers = computed(() =>
		selectedTypes.value.flatMap(type => markers[type])
	);

	function toggleMarkers(type) {
		const index = selectedTypes.value.indexOf(type);
		if (index === -1) {
			selectedTypes.value.push(type);
		} else {
			selectedTypes.value.splice(index, 1);
		}
		updateMarkers();
		
	}


</script>

<style scoped>
	#container{
		width:100%;
		height:500px;
	}
	.map-tags-container {
	    position: absolute;
	    top: -10px;
	    left: 35px;
	    z-index: 1000; /* 确保它在地图上层 */
	}
	.map-tags{
		color: black !important;
		margin-right: 8px; /* 控制标签间距 */
	}
	.dialog{
		width: 1500px;
	}
</style>