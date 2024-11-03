<template>
	<div class="map-tags-container">
		<el-tag class="map-tags" 
				v-for="type in types" :key="type" 
				@click="toggleMarkers(type)" 
				:style="{ backgroundColor: getTagColor(type) }"
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

	const types = ['饮水机', '公共厕所', '休息区','酒店'];
	const selectedTypes = ref(['饮水机', '公共厕所', '休息区','酒店']);
	
	function getTagColor (type){
	    const colors = {
	      '饮水机': '#00aaff',
	      '公共厕所': '#aaff7f',
	      '休息区': '#ffaa00',
	      '酒店': '#aa55ff'
	    };
	    return this.selectedTypes.includes(type) ? colors[type] : 'grey';
	  }

	const waterFountains = [{
			'name': '饮水机1',
			'type':'water','value': [113.550822, 22.19942]
		},
		{
			'name': '饮水机2',
			'type':'water','value': [113.545935, 22.202738]
		},
		{
			'name': '饮水机3',
			'type':'water','value': [113.534641, 22.191004]
		},
		{
			'name': '饮水机4',
			'type':'water','value': [113.534641, 22.191004]
		},
		{
			'name': '饮水机5',
			'type':'water','value': [113.572357, 22.158341]
		},
		{
			'name': '饮水机6',
			'type':'water','value': [113.561562, 22.154853]
		},
		{
			'name': '饮水机7',
			'type':'water','value': [113.545968, 22.202562]
		},
		{
			'name': '饮水机8',
			'type':'water','value': [113.560271, 22.204543]
		},
		{
			'name': '饮水机9',
			'type':'water','value': [113.554997, 22.198405]
		},
		{
			'name': '饮水机10',
			'type':'water','value': [113.555036, 22.199203]
		},
		{
			'name': '饮水机11',
			'type':'water','value': [113.538918, 22.204133]
		},
		{
			'name': '饮水机12',
			'type':'water','value': [113.554176, 22.15967]
		},
		{
			'name': '饮水机13',
			'type':'water','value': [113.554176, 22.15967]
		},
		{
			'name': '饮水机14',
			'type':'water','value': [113.541126, 22.162572]
		},
		{
			'name': '饮水机15',
			'type':'water','value': [113.541075, 22.162817]
		},
		{
			'name': '饮水机16',
			'type':'water','value': [113.539662, 22.164207]
		},
		{
			'name': '饮水机17',
			'type':'water','value': [113.539288, 22.201367]
		},
		{
			'name': '饮水机18',
			'type':'water','value': [113.539288, 22.201367]
		},
		{
			'name': '饮水机19',
			'type':'water','value': [113.567115, 22.135079]
		},
		{
			'name': '饮水机20',
			'type':'water','value': [113.566541, 22.132275]
		},
		{
			'name': '饮水机21',
			'type':'water','value': [113.561759, 22.128493]
		},
		{
			'name': '饮水机22',
			'type':'water','value': [113.561759, 22.128493]
		},
		{
			'name': '饮水机23',
			'type':'water','value': [113.55823, 22.126879]
		},
		{
			'name': '饮水机24',
			'type':'water','value': [113.556803, 22.125672]
		},
		{
			'name': '饮水机25',
			'type':'water','value': [113.562511, 22.128737]
		},
		{
			'name': '饮水机26',
			'type':'water','value': [113.535784, 22.187248]
		},
		{
			'name': '饮水机27',
			'type':'water','value': [113.562867, 22.114229]
		},
		{
			'name': '饮水机28',
			'type':'water','value': [113.533115, 22.18472]
		},
		{
			'name': '饮水机29',
			'type':'water','value': [113.536571, 22.181014]
		},
		{
			'name': '饮水机30',
			'type':'water','value': [113.532081, 22.179716]
		},
		{
			'name': '饮水机31',
			'type':'water','value': [113.551076, 22.188445]
		},
		{
			'name': '饮水机32',
			'type':'water','value': [113.5372, 22.2025]
		},
		{
			'name': '饮水机33',
			'type':'water','value': [113.548842, 22.196952]
		},
		{
			'name': '饮水机34',
			'type':'water','value': [113.552001, 22.198757]
		},
		{
			'name': '饮水机35',
			'type':'water','value': [113.552243, 22.199313]
		},
		{
			'name': '饮水机36',
			'type':'water','value': [113.552509, 22.199478]
		},
		{
			'name': '饮水机37',
			'type':'water','value': [113.552751, 22.197096]
		},
		{
			'name': '饮水机38',
			'type':'water','value': [113.538919, 22.204134]
		},
		{
			'name': '饮水机39',
			'type':'water','value': [113.538919, 22.204134]
		},
		{
			'name': '饮水机40',
			'type':'water','value': [113.538919, 22.204134]
		},
		{
			'name': '饮水机41',
			'type':'water','value': [113.538919, 22.204134]
		},
		{
			'name': '饮水机42',
			'type':'water','value': [113.557031, 22.156437]
		},
		{
			'name': '饮水机43',
			'type':'water','value': [113.556855, 22.115998]
		},
		{
			'name': '饮水机44',
			'type':'water','value': [113.543088, 22.211881]
		},
		{
			'name': '饮水机45',
			'type':'water','value': [113.553135, 22.208796]
		},
		{
			'name': '饮水机46',
			'type':'water','value': [113.553135, 22.208796]
		},
		{
			'name': '饮水机47',
			'type':'water','value': [113.544377, 22.21579]
		},
		{
			'name': '饮水机48',
			'type':'water','value': [113.547268, 22.216278]
		},
		{
			'name': '饮水机49',
			'type':'water','value': [113.55137, 22.211395]
		},
		{
			'name': '饮水机50',
			'type':'water','value': [113.55137, 22.211395]
		},
		{
			'name': '饮水机51',
			'type':'water','value': [113.552207, 22.211261]
		},
		{
			'name': '饮水机52',
			'type':'water','value': [113.550653, 22.212328]
		},
		{
			'name': '饮水机53',
			'type':'water','value': [113.548176, 22.207351]
		},
		{
			'name': '饮水机54',
			'type':'water','value': [113.548996, 22.207049]
		},
		{
			'name': '饮水机55',
			'type':'water','value': [113.568191, 22.117344]
		},
		{
			'name': '饮水机56',
			'type':'water','value': [113.569015, 22.117949]
		},
		{
			'name': '饮水机57',
			'type':'water','value': [113.570411, 22.125399]
		},
		{
			'name': '饮水机58',
			'type':'water','value': [113.571162, 22.124515]
		},
		{
			'name': '饮水机59',
			'type':'water','value': [113.57065, 22.122229]
		},
		{
			'name': '饮水机60',
			'type':'water','value': [113.554038, 22.210973]
		},
		{
			'name': '饮水机61',
			'type':'water','value': [113.556078, 22.209298]
		},
		{
			'name': '饮水机62',
			'type':'water','value': [113.538959, 22.206488]
		},
		{
			'name': '饮水机63',
			'type':'water','value': [113.556479, 22.203225]
		},
		{
			'name': '饮水机64',
			'type':'water','value': [113.552615, 22.142102]
		},
		{
			'name': '饮水机65',
			'type':'water','value': [113.537075, 22.186673]
		},
		{
			'name': '饮水机66',
			'type':'water','value': [113.539651, 22.194602]
		},
		{
			'name': '饮水机67',
			'type':'water','value': [113.556253, 22.158155]
		},
		{
			'name': '饮水机68',
			'type':'water','value': [113.553658, 22.186998]
		},
		{
			'name': '饮水机69',
			'type':'water','value': [113.553658, 22.186998]
		},
		{
			'name': '饮水机70',
			'type':'water','value': [113.553658, 22.186998]
		},
		{
			'name': '饮水机71',
			'type':'water','value': [113.553658, 22.186998]
		}
	];
	const publicToilets = [{
			'name': '公共厕所139',
			'type':'restroom','value': [113.551493, 22.211268]
		},
		{
			'name': '公共厕所140',
			'type':'restroom','value': [113.575172, 22.129205]
		},
		{
			'name': '公共厕所141',
			'type':'restroom','value': [113.571355, 22.123969]
		},
		{
			'name': '公共厕所142',
			'type':'restroom','value': [113.555959, 22.119668]
		},
		{
			'name': '公共厕所143',
			'type':'restroom','value': [113.552219, 22.117925]
		},
		{
			'name': '公共厕所144',
			'type':'restroom','value': [113.550973, 22.118712]
		},
		{
			'name': '公共厕所145',
			'type':'restroom','value': [113.551689, 22.11618]
		},
		{
			'name': '公共厕所146',
			'type':'restroom','value': [113.552845, 22.115849]
		},
		{
			'name': '公共厕所147',
			'type':'restroom','value': [113.549733, 22.114254]
		},
		{
			'name': '公共厕所148',
			'type':'restroom','value': [113.569971, 22.120198]
		},
		{
			'name': '公共厕所149',
			'type':'restroom','value': [113.569786, 22.11893]
		},
		{
			'name': '公共厕所150',
			'type':'restroom','value': [113.573364, 22.115869]
		},
		{
			'name': '公共厕所151',
			'type':'restroom','value': [113.570899, 22.122151]
		},
		{
			'name': '公共厕所152',
			'type':'restroom','value': [113.561205, 22.128883]
		},
		{
			'name': '公共厕所153',
			'type':'restroom','value': [113.566837, 22.135042]
		},
		{
			'name': '公共厕所154',
			'type':'restroom','value': [113.56586, 22.132277]
		},
		{
			'name': '公共厕所155',
			'type':'restroom','value': [113.542945, 22.192505]
		},
		{
			'name': '公共厕所156',
			'type':'restroom','value': [113.545968, 22.202562]
		},
		{
			'name': '公共厕所157',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': '公共厕所158',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': '公共厕所159',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': '公共厕所160',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': '公共厕所161',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': '公共厕所162',
			'type':'restroom','value': [113.553135, 22.208796]
		},
		{
			'name': '公共厕所163',
			'type':'restroom','value': [113.556253, 22.158155]
		},
		{
			'name': '公共厕所164',
			'type':'restroom','value': [113.556253, 22.158155]
		},
		{
			'name': '公共厕所165',
			'type':'restroom','value': [113.561759, 22.128493]
		},
		{
			'name': '公共厕所166',
			'type':'restroom','value': [113.581699, 22.131556]
		},
		{
			'name': '公共厕所167',
			'type':'restroom','value': [113.539651, 22.194602]
		},
		{
			'name': '公共厕所168',
			'type':'restroom','value': [113.534641, 22.191004]
		},
		{
			'name': '公共厕所169',
			'type':'restroom','value': [113.545935, 22.202738]
		},
		{
			'name': '公共厕所170',
			'type':'restroom','value': [113.545935, 22.202738]
		},
		{
			'name': '公共厕所171',
			'type':'restroom','value': [113.545935, 22.202738]
		},
		{
			'name': '公共厕所172',
			'type':'restroom','value': [113.538959, 22.206488]
		},
		{
			'name': '公共厕所173',
			'type':'restroom','value': [113.55137, 22.211395]
		},
		{
			'name': '公共厕所174',
			'type':'restroom','value': [113.55137, 22.211395]
		},
		{
			'name': '公共厕所175',
			'type':'restroom','value': [113.55137, 22.211395]
		},
		{
			'name': '公共厕所176',
			'type':'restroom','value': [113.551493, 22.211268]
		},
		{
			'name': '公共厕所177',
			'type':'restroom','value': [113.5372, 22.2025]
		},
		{
			'name': '公共厕所178',
			'type':'restroom','value': [113.543088, 22.211881]
		},
		{
			'name': '公共厕所179',
			'type':'restroom','value': [113.543088, 22.211881]
		},
		{
			'name': '公共厕所180',
			'type':'restroom','value': [113.555605, 22.155014]
		},
		{
			'name': '公共厕所181',
			'type':'restroom','value': [113.546394, 22.207635]
		},
		{
			'name': '公共厕所182',
			'type':'restroom','value': [113.55823, 22.126879]
		},
		{
			'name': '公共厕所183',
			'type':'restroom','value': [113.556936, 22.125657]
		},
		{
			'name': '公共厕所184',
			'type':'restroom','value': [113.563834, 22.115476]
		},
		{
			'name': '公共厕所185',
			'type':'restroom','value': [113.577885, 22.133913]
		},
		{
			'name': '公共厕所186',
			'type':'restroom','value': [113.563056, 22.121485]
		},
		{
			'name': '公共厕所187',
			'type':'restroom','value': [113.564386, 22.123055]
		},
		{
			'name': '公共厕所188',
			'type':'restroom','value': [113.558872, 22.126673]
		},
		{
			'name': '公共厕所189',
			'type':'restroom','value': [113.569015, 22.117949]
		},
		{
			'name': '公共厕所190',
			'type':'restroom','value': [113.557162, 22.127294]
		},
		{
			'name': '公共厕所191',
			'type':'restroom','value': [113.57035, 22.125433]
		},
		{
			'name': '公共厕所192',
			'type':'restroom','value': [113.556855, 22.115998]
		},
		{
			'name': '公共厕所193',
			'type':'restroom','value': [113.552625, 22.117007]
		},
		{
			'name': '公共厕所194',
			'type':'restroom','value': [113.545215, 22.215646]
		},
		{
			'name': '公共厕所195',
			'type':'restroom','value': [113.544377, 22.21579]
		},
		{
			'name': '公共厕所196',
			'type':'restroom','value': [113.545325, 22.216476]
		},
		{
			'name': '公共厕所197',
			'type':'restroom','value': [113.54715, 22.216591]
		},
		{
			'name': '公共厕所198',
			'type':'restroom','value': [113.554038, 22.210973]
		},
		{
			'name': '公共厕所199',
			'type':'restroom','value': [113.555894, 22.209358]
		},
		{
			'name': '公共厕所200',
			'type':'restroom','value': [113.552696, 22.203865]
		},
		{
			'name': '公共厕所201',
			'type':'restroom','value': [113.55285, 22.204181]
		},
		{
			'name': '公共厕所202',
			'type':'restroom','value': [113.539088, 22.200572]
		},
		{
			'name': '公共厕所203',
			'type':'restroom','value': [113.539502, 22.200344]
		},
		{
			'name': '公共厕所204',
			'type':'restroom','value': [113.539288, 22.201367]
		},
		{
			'name': '公共厕所205',
			'type':'restroom','value': [113.54756, 22.20009]
		},
		{
			'name': '公共厕所206',
			'type':'restroom','value': [113.550661, 22.200539]
		},
		{
			'name': '公共厕所207',
			'type':'restroom','value': [113.548862, 22.196492]
		},
		{
			'name': '公共厕所208',
			'type':'restroom','value': [113.550854, 22.197615]
		},
		{
			'name': '公共厕所209',
			'type':'restroom','value': [113.552001, 22.198757]
		},
		{
			'name': '公共厕所210',
			'type':'restroom','value': [113.552509, 22.199478]
		},
		{
			'name': '公共厕所211',
			'type':'restroom','value': [113.549813, 22.195657]
		},
		{
			'name': '公共厕所212',
			'type':'restroom','value': [113.546933, 22.196209]
		},
		{
			'name': '公共厕所213',
			'type':'restroom','value': [113.544474, 22.192665]
		},
		{
			'name': '公共厕所214',
			'type':'restroom','value': [113.545854, 22.189439]
		},
		{
			'name': '公共厕所215',
			'type':'restroom','value': [113.533115, 22.18472]
		},
		{
			'name': '公共厕所216',
			'type':'restroom','value': [113.549894, 22.19147]
		},
		{
			'name': '公共厕所217',
			'type':'restroom','value': [113.537075, 22.186673]
		},
		{
			'name': '公共厕所218',
			'type':'restroom','value': [113.550176, 22.19585]
		},
		{
			'name': '公共厕所219',
			'type':'restroom','value': [113.542386, 22.196822]
		},
		{
			'name': '公共厕所220',
			'type':'restroom','value': [113.551371, 22.206953]
		},
		{
			'name': '公共厕所221',
			'type':'restroom','value': [113.554592, 22.158827]
		},
		{
			'name': '公共厕所222',
			'type':'restroom','value': [113.560546, 22.158888]
		},
		{
			'name': '公共厕所223',
			'type':'restroom','value': [113.561069, 22.159229]
		},
		{
			'name': '公共厕所224',
			'type':'restroom','value': [113.551772, 22.112385]
		},
		{
			'name': '公共厕所225',
			'type':'restroom','value': [113.545466, 22.198457]
		},
		{
			'name': '公共厕所226',
			'type':'restroom','value': [113.561597, 22.16123]
		},
		{
			'name': '公共厕所227',
			'type':'restroom','value': [113.561597, 22.16123]
		},
		{
			'name': '公共厕所228',
			'type':'restroom','value': [113.561597, 22.16123]
		},
		{
			'name': '公共厕所229',
			'type':'restroom','value': [113.550318, 22.215534]
		},
		{
			'name': '公共厕所230',
			'type':'restroom','value': [113.552948, 22.213763]
		},
		{
			'name': '公共厕所231',
			'type':'restroom','value': [113.545917, 22.213585]
		},
		{
			'name': '公共厕所232',
			'type':'restroom','value': [113.5412, 22.21029]
		},
		{
			'name': '公共厕所233',
			'type':'restroom','value': [113.537607, 22.209587]
		},
		{
			'name': '公共厕所234',
			'type':'restroom','value': [113.545772, 22.210555]
		},
		{
			'name': '公共厕所235',
			'type':'restroom','value': [113.548446, 22.210545]
		},
		{
			'name': '公共厕所236',
			'type':'restroom','value': [113.552059, 22.211161]
		},
		{
			'name': '公共厕所237',
			'type':'restroom','value': [113.559352, 22.21204]
		},
		{
			'name': '公共厕所238',
			'type':'restroom','value': [113.550265, 22.209525]
		},
		{
			'name': '公共厕所239',
			'type':'restroom','value': [113.54517, 22.208439]
		},
		{
			'name': '公共厕所240',
			'type':'restroom','value': [113.542899, 22.208465]
		},
		{
			'name': '公共厕所241',
			'type':'restroom','value': [113.547467, 22.207918]
		},
		{
			'name': '公共厕所242',
			'type':'restroom','value': [113.544637, 22.204134]
		},
		{
			'name': '公共厕所243',
			'type':'restroom','value': [113.545504, 22.201899]
		},
		{
			'name': '公共厕所244',
			'type':'restroom','value': [113.538462, 22.200529]
		},
		{
			'name': '公共厕所245',
			'type':'restroom','value': [113.542381, 22.19987]
		},
		{
			'name': '公共厕所246',
			'type':'restroom','value': [113.537759, 22.198849]
		},
		{
			'name': '公共厕所247',
			'type':'restroom','value': [113.556728, 22.203364]
		},
		{
			'name': '公共厕所248',
			'type':'restroom','value': [113.547252, 22.198601]
		},
		{
			'name': '公共厕所249',
			'type':'restroom','value': [113.541122, 22.197047]
		},
		{
			'name': '公共厕所250',
			'type':'restroom','value': [113.539377, 22.196589]
		},
		{
			'name': '公共厕所251',
			'type':'restroom','value': [113.538796, 22.195912]
		},
		{
			'name': '公共厕所252',
			'type':'restroom','value': [113.554865, 22.19903]
		},
		{
			'name': '公共厕所253',
			'type':'restroom','value': [113.559781, 22.198394]
		},
		{
			'name': '公共厕所254',
			'type':'restroom','value': [113.558507, 22.198842]
		},
		{
			'name': '公共厕所255',
			'type':'restroom','value': [113.536218, 22.193478]
		},
		{
			'name': '公共厕所256',
			'type':'restroom','value': [113.540287, 22.193003]
		},
		{
			'name': '公共厕所257',
			'type':'restroom','value': [113.534641, 22.190701]
		},
		{
			'name': '公共厕所258',
			'type':'restroom','value': [113.55399, 22.19464]
		},
		{
			'name': '公共厕所259',
			'type':'restroom','value': [113.532597, 22.188947]
		},
		{
			'name': '公共厕所260',
			'type':'restroom','value': [113.534521, 22.186988]
		},
		{
			'name': '公共厕所261',
			'type':'restroom','value': [113.530666, 22.186267]
		},
		{
			'name': '公共厕所262',
			'type':'restroom','value': [113.531063, 22.185448]
		},
		{
			'name': '公共厕所263',
			'type':'restroom','value': [113.554421, 22.190785]
		},
		{
			'name': '公共厕所264',
			'type':'restroom','value': [113.550761, 22.188284]
		},
		{
			'name': '公共厕所265',
			'type':'restroom','value': [113.532081, 22.179716]
		},
		{
			'name': '公共厕所266',
			'type':'restroom','value': [113.537027, 22.18104]
		},
		{
			'name': '公共厕所267',
			'type':'restroom','value': [113.540676, 22.205037]
		},
		{
			'name': '公共厕所268',
			'type':'restroom','value': [113.560229, 22.204595]
		},
		{
			'name': '公共厕所269',
			'type':'restroom','value': [113.539922, 22.19464]
		},
		{
			'name': '公共厕所270',
			'type':'restroom','value': [113.538798, 22.189491]
		},
		{
			'name': '公共厕所271',
			'type':'restroom','value': [113.557198, 22.187653]
		},
		{
			'name': '公共厕所272',
			'type':'restroom','value': [113.553556, 22.206875]
		},
		{
			'name': '公共厕所273',
			'type':'restroom','value': [113.550616, 22.212338]
		},
		{
			'name': '公共厕所274',
			'type':'restroom','value': [113.550777, 22.203602]
		},
		{
			'name': '公共厕所275',
			'type':'restroom','value': [113.553647, 22.195938]
		},
		{
			'name': '公共厕所276',
			'type':'restroom','value': [113.549114, 22.195134]
		},
		{
			'name': '公共厕所277',
			'type':'restroom','value': [113.539622, 22.191131]
		},
		{
			'name': '公共厕所278',
			'type':'restroom','value': [113.572555, 22.199468]
		},
		{
			'name': '公共厕所279',
			'type':'restroom','value': [113.573051, 22.198093]
		},
		{
			'name': '公共厕所280',
			'type':'restroom','value': [113.574483, 22.199441]
		},
		{
			'name': '公共厕所281',
			'type':'restroom','value': [113.554321, 22.187463]
		},
		{
			'name': '公共厕所282',
			'type':'restroom','value': [113.550755, 22.19938]
		},
		{
			'name': '公共厕所283',
			'type':'restroom','value': [113.539888, 22.203596]
		},
		{
			'name': '公共厕所284',
			'type':'restroom','value': [113.552139, 22.118115]
		},
		{
			'name': '公共厕所285',
			'type':'restroom','value': [113.5372, 22.2025]
		},
		{
			'name': '公共厕所286',
			'type':'restroom','value': [113.5372, 22.2025]
		},
		{
			'name': '公共厕所287',
			'type':'restroom','value': [113.5372, 22.2025]
		},
		{
			'name': '公共厕所288',
			'type':'restroom','value': [113.544919, 22.195154]
		},
		{
			'name': '公共厕所289',
			'type':'restroom','value': [113.544785, 22.205415]
		},
		{
			'name': '公共厕所290',
			'type':'restroom','value': [113.544785, 22.205415]
		},
		{
			'name': '公共厕所291',
			'type':'restroom','value': [113.534625, 22.190832]
		},
		{
			'name': '公共厕所292',
			'type':'restroom','value': [113.534777, 22.19088]
		},
		{
			'name': '公共厕所293',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': '公共厕所294',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': '公共厕所295',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': '公共厕所296',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': '公共厕所297',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': '公共厕所298',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': '公共厕所299',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': '公共厕所300',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': '公共厕所301',
			'type':'restroom','value': [113.545721, 22.211156]
		},
		{
			'name': '公共厕所302',
			'type':'restroom','value': [113.551378, 22.21134]
		},
		{
			'name': '公共厕所303',
			'type':'restroom','value': [113.551378, 22.21134]
		},
		{
			'name': '公共厕所304',
			'type':'restroom','value': [113.551378, 22.21134]
		},
		{
			'name': '公共厕所305',
			'type':'restroom','value': [113.551378, 22.21134]
		},
		{
			'name': '公共厕所306',
			'type':'restroom','value': [113.539608, 22.194374]
		},
		{
			'name': '公共厕所307',
			'type':'restroom','value': [113.556281, 22.153912]
		},
		{
			'name': '公共厕所308',
			'type':'restroom','value': [113.549095, 22.163387]
		},
		{
			'name': '公共厕所309',
			'type':'restroom','value': [113.550788, 22.157196]
		},
		{
			'name': '公共厕所310',
			'type':'restroom','value': [113.552694, 22.156033]
		},
		{
			'name': '公共厕所311',
			'type':'restroom','value': [113.571371, 22.159129]
		},
		{
			'name': '公共厕所312',
			'type':'restroom','value': [113.556442, 22.154111]
		},
		{
			'name': '公共厕所313',
			'type':'restroom','value': [113.557509, 22.153415]
		},
		{
			'name': '公共厕所314',
			'type':'restroom','value': [113.559011, 22.154149]
		},
		{
			'name': '公共厕所315',
			'type':'restroom','value': [113.553679, 22.151505]
		},
		{
			'name': '公共厕所316',
			'type':'restroom','value': [113.561785, 22.155798]
		},
		{
			'name': '公共厕所317',
			'type':'restroom','value': [113.539986, 22.161787]
		},
		{
			'name': '公共厕所318',
			'type':'restroom','value': [113.551941, 22.136055]
		},
		{
			'name': '公共厕所319',
			'type':'restroom','value': [113.546155, 22.125336]
		},
		{
			'name': '公共厕所320',
			'type':'restroom','value': [113.547067, 22.136189]
		},
		{
			'name': '公共厕所321',
			'type':'restroom','value': [113.557695, 22.156438]
		},
		{
			'name': '公共厕所322',
			'type':'restroom','value': [113.548804, 22.163996]
		},
		{
			'name': '公共厕所323',
			'type':'restroom','value': [113.541126, 22.162572]
		},
		{
			'name': '公共厕所324',
			'type':'restroom','value': [113.574273, 22.164094]
		},
		{
			'name': '公共厕所325',
			'type':'restroom','value': [113.575524, 22.163571]
		},
		{
			'name': '公共厕所326',
			'type':'restroom','value': [113.559351, 22.153863]
		},
		{
			'name': '公共厕所327',
			'type':'restroom','value': [113.55861, 22.150203]
		},
		{
			'name': '公共厕所328',
			'type':'restroom','value': [113.539557, 22.19338]
		},
		{
			'name': '公共厕所329',
			'type':'restroom','value': [113.551866, 22.211246]
		},
		{
			'name': '公共厕所330',
			'type':'restroom','value': [113.551866, 22.211246]
		},
		{
			'name': '公共厕所331',
			'type':'restroom','value': [113.551866, 22.211246]
		},
		{
			'name': '公共厕所332',
			'type':'restroom','value': [113.551866, 22.211246]
		}
	];
	const restAreas = [{
			'name': '休息区72',
			'type':'restarea','value': [113.545975, 22.202873]
		},
		{
			'name': '休息区73',
			'type':'restarea','value': [113.541749, 22.19565]
		},
		{
			'name': '休息区74',
			'type':'restarea','value': [113.556657, 22.153803]
		},
		{
			'name': '休息区75',
			'type':'restarea','value': [113.544202, 22.214225]
		},
		{
			'name': '休息区76',
			'type':'restarea','value': [113.538757, 22.196334]
		},
		{
			'name': '休息区77',
			'type':'restarea','value': [113.547292, 22.211132]
		},
		{
			'name': '休息区78',
			'type':'restarea','value': [113.548006, 22.21198]
		},
		{
			'name': '休息区79',
			'type':'restarea','value': [113.535865, 22.193671]
		},
		{
			'name': '休息区80',
			'type':'restarea','value': [113.552302, 22.213334]
		},
		{
			'name': '休息区81',
			'type':'restarea','value': [113.540331, 22.160078]
		},
		{
			'name': '休息区82',
			'type':'restarea','value': [113.538522, 22.200789]
		},
		{
			'name': '休息区83',
			'type':'restarea','value': [113.539456, 22.1994]
		},
		{
			'name': '休息区84',
			'type':'restarea','value': [113.552345, 22.214496]
		},
		{
			'name': '休息区85',
			'type':'restarea','value': [113.535777, 22.187302]
		},
		{
			'name': '休息区86',
			'type':'restarea','value': [113.537976, 22.19616]
		},
		{
			'name': '休息区87',
			'type':'restarea','value': [113.539176, 22.196813]
		},
		{
			'name': '休息区88',
			'type':'restarea','value': [113.533091, 22.179516]
		},
		{
			'name': '休息区89',
			'type':'restarea','value': [113.54221, 22.212526]
		},
		{
			'name': '休息区90',
			'type':'restarea','value': [113.542795, 22.208548]
		},
		{
			'name': '休息区91',
			'type':'restarea','value': [113.544132, 22.212496]
		},
		{
			'name': '休息区92',
			'type':'restarea','value': [113.541566, 22.209676]
		},
		{
			'name': '休息区93',
			'type':'restarea','value': [113.543842, 22.206928]
		},
		{
			'name': '休息区94',
			'type':'restarea','value': [113.536783, 22.192494]
		},
		{
			'name': '休息区95',
			'type':'restarea','value': [113.536906, 22.193117]
		},
		{
			'name': '休息区96',
			'type':'restarea','value': [113.557974, 22.211641]
		},
		{
			'name': '休息区97',
			'type':'restarea','value': [113.539451, 22.20467]
		},
		{
			'name': '休息区98',
			'type':'restarea','value': [113.539807, 22.204049]
		},
		{
			'name': '休息区99',
			'type':'restarea','value': [113.546727, 22.210459]
		},
		{
			'name': '休息区100',
			'type':'restarea','value': [113.538568, 22.213323]
		},
		{
			'name': '休息区101',
			'type':'restarea','value': [113.55885, 22.15444]
		},
		{
			'name': '休息区102',
			'type':'restarea','value': [113.550154, 22.1572]
		},
		{
			'name': '休息区103',
			'type':'restarea','value': [113.543684, 22.197093]
		},
		{
			'name': '休息区104',
			'type':'restarea','value': [113.543168, 22.207405]
		},
		{
			'name': '休息区105',
			'type':'restarea','value': [113.541448, 22.161523]
		},
		{
			'name': '休息区106',
			'type':'restarea','value': [113.552123, 22.192381]
		},
		{
			'name': '休息区107',
			'type':'restarea','value': [113.538834, 22.212219]
		},
		{
			'name': '休息区108',
			'type':'restarea','value': [113.559967, 22.162199]
		},
		{
			'name': '休息区109',
			'type':'restarea','value': [113.537717, 22.203099]
		},
		{
			'name': '休息区110',
			'type':'restarea','value': [113.550106, 22.211246]
		},
		{
			'name': '休息区111',
			'type':'restarea','value': [113.550471, 22.21246]
		},
		{
			'name': '休息区112',
			'type':'restarea','value': [113.553347, 22.120708]
		},
		{
			'name': '休息区113',
			'type':'restarea','value': [113.542325, 22.201581]
		},
		{
			'name': '休息区114',
			'type':'restarea','value': [113.536993, 22.188906]
		},
		{
			'name': '休息区115',
			'type':'restarea','value': [113.540119, 22.191499]
		},
		{
			'name': '休息区116',
			'type':'restarea','value': [113.537583, 22.196966]
		},
		{
			'name': '休息区117',
			'type':'restarea','value': [113.53793, 22.20148]
		},
		{
			'name': '休息区118',
			'type':'restarea','value': [113.544647, 22.205879]
		},
		{
			'name': '休息区119',
			'type':'restarea','value': [113.558711, 22.205328]
		},
		{
			'name': '休息区120',
			'type':'restarea','value': [113.545592, 22.201797]
		},
		{
			'name': '休息区121',
			'type':'restarea','value': [113.545496, 22.213395]
		},
		{
			'name': '休息区122',
			'type':'restarea','value': [113.554169, 22.213036]
		},
		{
			'name': '休息区123',
			'type':'restarea','value': [113.556297, 22.211881]
		},
		{
			'name': '休息区124',
			'type':'restarea','value': [113.550279, 22.209446]
		},
		{
			'name': '休息区125',
			'type':'restarea','value': [113.549943, 22.208884]
		},
		{
			'name': '休息区126',
			'type':'restarea','value': [113.555295, 22.155117]
		},
		{
			'name': '休息区127',
			'type':'restarea','value': [113.551587, 22.152606]
		},
		{
			'name': '休息区128',
			'type':'restarea','value': [113.540948, 22.198622]
		},
		{
			'name': '休息区129',
			'type':'restarea','value': [113.564375, 22.130104]
		},
		{
			'name': '休息区130',
			'type':'restarea','value': [113.541414, 22.209458]
		},
		{
			'name': '休息区131',
			'type':'restarea','value': [113.555498, 22.204558]
		},
		{
			'name': '休息区132',
			'type':'restarea','value': [113.541335, 22.206941]
		},
		{
			'name': '休息区133',
			'type':'restarea','value': [113.553717, 22.206994]
		},
		{
			'name': '休息区134',
			'type':'restarea','value': [113.536002, 22.191333]
		},
		{
			'name': '休息区135',
			'type':'restarea','value': [113.538392, 22.197226]
		},
		{
			'name': '休息区136',
			'type':'restarea','value': [113.538851, 22.197104]
		},
		{
			'name': '休息区137',
			'type':'restarea','value': [113.541855, 22.205827]
		},
		{
			'name': '休息区138',
			'type':'restarea','value': [113.553822, 22.187107]
		}
	];
	
	const hotelData = [
{'name': '英京酒店', 'type':'hotel','value': [113.536302, 22.193724]} ,
{'name': '濠江', 'type':'hotel','value': [113.536326, 22.195011]} ,
{'name': '文华', 'type':'hotel','value': [113.537102, 22.195215]} ,
{'name': '高华', 'type':'hotel','value': [113.537383, 22.194837]} ,
{'name': '嘉明', 'type':'hotel','value': [113.537743, 22.196179]} ,
{'name': '晶晶', 'type':'hotel','value': [113.543707, 22.191354]} ,
{'name': '高士德', 'type':'hotel','value': [113.547636, 22.202226]} ,
{'name': '蓬莱宾馆', 'type':'hotel','value': [113.536436, 22.194629]} ,
{'name': '海运', 'type':'hotel','value': [113.535334, 22.193479]} ,
{'name': '豪华', 'type':'hotel','value': [113.539713, 22.202815]} ,
{'name': '曼谷', 'type':'hotel','value': [113.535752, 22.194369]} ,
{'name': '玉珠', 'type':'hotel','value': [113.551391, 22.202706]} ,
{'name': '嘉华', 'type':'hotel','value': [113.541427, 22.193174]} ,
{'name': '新金门', 'type':'hotel','value': [113.54698, 22.204785]} ,
{'name': '澳门之家', 'type':'hotel','value': [113.536416, 22.193462]} ,
{'name': '南龙', 'type':'hotel','value': [113.541873, 22.192284]} ,
{'name': '遇莲客栈', 'type':'hotel','value': [113.542824, 22.192153]} ,
{'name': '华发宾馆', 'type':'hotel','value': [113.541517, 22.192483]} ,
{'name': '新华大旅店', 'type':'hotel','value': [113.537465, 22.194667]} ,
{'name': '悦子公寓', 'type':'hotel','value': [113.551208, 22.202849]} ,
{'name': '大来', 'type':'hotel','value': [113.536561, 22.194561]} ,
{'name': '天丽', 'type':'hotel','value': [113.545716, 22.199842]} ,
{'name': '东京', 'type':'hotel','value': [113.537217, 22.194696]} ,
{'name': '东方', 'type':'hotel','value': [113.537077, 22.194546]} ,
{'name': '大利迎宾馆', 'type':'hotel','value': [113.537364, 22.194886]} ,
{'name': '荣华', 'type':'hotel','value': [113.536623, 22.19449]} ,
{'name': '和平', 'type':'hotel','value': [113.537344, 22.195306]} ,
{'name': '新中央', 'type':'hotel','value': [113.539136, 22.194303]} ,
{'name': '竹湾酒店', 'type':'hotel','value': [113.561696, 22.11404]} ,
{'name': '东亚酒店', 'type':'hotel','value': [113.537358, 22.196543]} ,
{'name': '假期酒店', 'type':'hotel','value': [113.543668, 22.19763]} ,
{'name': '葡京酒店', 'type':'hotel','value': [113.544364, 22.189912]} ,
{'name': '新丽华酒店', 'type':'hotel','value': [113.541451, 22.19107]} ,
{'name': '明明', 'type':'hotel','value': [113.541703, 22.192119]} ,
{'name': '京都酒店', 'type':'hotel','value': [113.540284, 22.192218]} ,
{'name': '天天', 'type':'hotel','value': [113.542063, 22.192049]} ,
{'name': '澳门圣地牙哥古堡', 'type':'hotel','value': [113.530665, 22.182427]} ,
{'name': '总统酒店', 'type':'hotel','value': [113.546932, 22.190378]} ,
{'name': '皇都酒店', 'type':'hotel','value': [113.547224, 22.196126]} ,
{'name': '澳门雅辰酒店', 'type':'hotel','value': [113.553601, 22.192502]} ,
{'name': '丽景湾艺术酒店', 'type':'hotel','value': [113.553585, 22.162233]} ,
{'name': '东望洋酒店', 'type':'hotel','value': [113.548548, 22.195913]} ,
{'name': '澳门富豪酒店', 'type':'hotel','value': [113.545748, 22.191057]} ,
{'name': '濠璟酒店', 'type':'hotel','value': [113.535261, 22.186213]} ,
{'name': '万事发酒店', 'type':'hotel','value': [113.535708, 22.194906]} ,
{'name': '帝濠酒店', 'type':'hotel','value': [113.548002, 22.191087]} ,
{'name': '城悦酒店', 'type':'hotel','value': [113.552006, 22.193065]} ,
{'name': '财神酒店', 'type':'hotel','value': [113.546044, 22.190465]} ,
{'name': '回力酒店', 'type':'hotel','value': [113.554752, 22.19757]} ,
{'name': '澳门假日酒店', 'type':'hotel','value': [113.547389, 22.191397]} ,
{'name': '鷺环海天度假酒店', 'type':'hotel','value': [113.576734, 22.12537]} ,
{'name': '维景酒店', 'type':'hotel','value': [113.548285, 22.192248]} ,
{'name': '康泰酒店', 'type':'hotel','value': [113.536875, 22.195609]} ,
{'name': '家逸酒店', 'type':'hotel','value': [113.542675, 22.19222]} ,
{'name': '富都宾馆', 'type':'hotel','value': [113.53882, 22.194758]} ,
{'name': '皇家金堡酒店', 'type':'hotel','value': [113.553624, 22.196683]} ,
{'name': '艺舍', 'type':'hotel','value': [113.535992, 22.193861]} ,
{'name': '富华酒店', 'type':'hotel','value': [113.546947, 22.202423]} ,
{'name': '君怡酒店', 'type':'hotel','value': [113.551945, 22.157209]} ,
{'name': '富城宾馆', 'type':'hotel','value': [113.536793, 22.196112]} ,
{'name': '金皇冠中国大酒店', 'type':'hotel','value': [113.574041, 22.158491]} ,
{'name': '金湾宾馆', 'type':'hotel','value': [113.545099, 22.19076]} ,
{'name': '皇庭海景酒店', 'type':'hotel','value': [113.550676, 22.149622]} ,
{'name': '新东方置地酒店', 'type':'hotel','value': [113.548753, 22.191243]} ,
{'name': '华都酒店', 'type':'hotel','value': [113.55305, 22.193232]} ,
{'name': '金沙', 'type':'hotel','value': [113.554849, 22.191544]} ,
{'name': '盛世酒店', 'type':'hotel','value': [113.560369, 22.156554]} ,
{'name': '金龙酒店', 'type':'hotel','value': [113.55418, 22.195595]} ,
{'name': '骏龙酒店', 'type':'hotel','value': [113.550882, 22.157569]} ,
{'name': '维多利亚酒店', 'type':'hotel','value': [113.548559, 22.210046]} ,
{'name': '英皇娱乐酒店', 'type':'hotel','value': [113.540841, 22.190559]} ,
{'name': '利澳酒店', 'type':'hotel','value': [113.549901, 22.192835]} ,
{'name': '百老匯酒店', 'type':'hotel','value': [113.551876, 22.146673]} ,
{'name': '永利', 'type':'hotel','value': [113.546017, 22.188303]} ,
{'name': '星际酒店', 'type':'hotel','value': [113.548085, 22.189655]} ,
{'name': '莱斯酒店', 'type':'hotel','value': [113.557996, 22.189885]} ,
{'name': '新濠锋', 'type':'hotel','value': [113.555088, 22.161831]} ,
{'name': '新葡京酒店', 'type':'hotel','value': [113.543261, 22.190986]} ,
{'name': '澳门威尼斯人酒店', 'type':'hotel','value': [113.560471, 22.1482]} ,
{'name': '澳门美高梅', 'type':'hotel','value': [113.548117, 22.185973]} ,
{'name': '澳门十六浦索菲特大酒店', 'type':'hotel','value': [113.535901, 22.197185]} ,
{'name': '澳门四季酒店', 'type':'hotel','value': [113.561637, 22.145502]} ,
{'name': '颐居', 'type':'hotel','value': [113.56531, 22.149822]} ,
{'name': '迎尚酒店', 'type':'hotel','value': [113.566005, 22.148427]} ,
{'name': '澳门凯旋门酒店', 'type':'hotel','value': [113.548669, 22.188585]} ,
{'name': '澳门君悦酒店', 'type':'hotel','value': [113.567633, 22.148684]} ,
{'name': '澳门大仓酒店', 'type':'hotel','value': [113.552413, 22.149223]} ,
{'name': '澳门悦榕庄', 'type':'hotel','value': [113.55277, 22.148821]} ,
{'name': '澳门文华东方酒店', 'type':'hotel','value': [113.546992, 22.184254]} ,
{'name': '京悦宾馆', 'type':'hotel','value': [113.536343, 22.193695]} ,
{'name': '银河', 'type':'hotel','value': [113.553466, 22.150253]} ,
{'name': '澳莱大三元酒店', 'type':'hotel','value': [113.537465, 22.195167]} ,
{'name': '镇兴宾馆', 'type':'hotel','value': [113.542187, 22.195015]} ,
{'name': '澳门康莱德酒店', 'type':'hotel','value': [113.56542, 22.145382]} ,
{'name': '澳门伦敦人酒店', 'type':'hotel','value': [113.565364, 22.146347]} ,
{'name': '伦敦人名匯', 'type':'hotel','value': [113.56559, 22.14418]} ,
{'name': '港湾大酒店', 'type':'hotel','value': [113.537606, 22.202641]} ,
{'name': '恋爱七号旅馆', 'type':'hotel','value': [113.540421, 22.197216]} ,
{'name': '亚洲精品旅馆', 'type':'hotel','value': [113.556943, 22.1528]} ,
{'name': '澳门雅诗阁', 'type':'hotel','value': [113.549266, 22.187001]} ,
{'name': '澳门JW万豪酒店', 'type':'hotel','value': [113.555589, 22.146754]} ,
{'name': '澳门丽思卡尔顿酒店', 'type':'hotel','value': [113.554401, 22.146406]} ,
{'name': '澳门皇冠假日酒店', 'type':'hotel','value': [113.558221, 22.212217]} ,
{'name': '励庭海景酒店', 'type':'hotel','value': [113.556158, 22.190596]} ,
{'name': '家亿宾馆', 'type':'hotel','value': [113.541365, 22.193074]} ,
{'name': '家圆宾馆', 'type':'hotel','value': [113.53784, 22.201597]} ,
{'name': '噢別致', 'type':'hotel','value': [113.535419, 22.190535]} ,
{'name': '十三酒店', 'type':'hotel','value': [113.558259, 22.129253]} ,
{'name': '澳门瑞吉酒店', 'type':'hotel','value': [113.565637, 22.147528]} ,
{'name': '新濠影滙酒店', 'type':'hotel','value': [113.561838, 22.141037]} ,
{'name': '永利皇宫', 'type':'hotel','value': [113.571206, 22.147696]} ,
{'name': '卡尔酒店', 'type':'hotel','value': [113.537269, 22.198023]} ,
{'name': '家颖宾馆', 'type':'hotel','value': [113.539758, 22.192523]} ,
{'name': '励宫酒店', 'type':'hotel','value': [113.556294, 22.195369]} ,
{'name': '澳门巴黎人', 'type':'hotel','value': [113.560846, 22.143694]} ,
{'name': '澳门罗斯福酒店', 'type':'hotel','value': [113.543494, 22.155176]} ,
{'name': '御匾峰', 'type':'hotel','value': [113.560426, 22.143022]} ,
{'name': '御龙酒店', 'type':'hotel','value': [113.550187, 22.193434]} ,
{'name': '新东方商务宾馆南座', 'type':'hotel','value': [113.537584, 22.195678]} ,
{'name': '路环壹号公寓', 'type':'hotel','value': [113.55122, 22.116354]} ,
{'name': '美狮美高梅', 'type':'hotel','value': [113.568297, 22.145071]} ,
{'name': '怡富酒店', 'type':'hotel','value': [113.537179, 22.197426]} ,
{'name': '锦江之星', 'type':'hotel','value': [113.545239, 22.213998]} ,
{'name': '莲居宾馆', 'type':'hotel','value': [113.539913, 22.196227]} ,
{'name': '金宝来酒店', 'type':'hotel','value': [113.57364, 22.158018]} ,
{'name': '多米精品酒店', 'type':'hotel','value': [113.541667, 22.195825]} ,
{'name': '澳门新口岸智选假日酒店', 'type':'hotel','value': [113.547687, 22.192417]} ,
{'name': '家欣宾馆（美基街）', 'type':'hotel','value': [113.537221, 22.197164]} ,
{'name': '摩珀斯', 'type':'hotel','value': [113.566588, 22.149834]} ,
{'name': '五洋酒店', 'type':'hotel','value': [113.536141, 22.194561]} ,
{'name': '彼寓旅居', 'type':'hotel','value': [113.534157, 22.191764]} ,
{'name': '葡京人', 'type':'hotel','value': [113.57582, 22.142602]} ,
{'name': '城市客栈', 'type':'hotel','value': [113.537585, 22.196648]} ,
{'name': '噢別致(福隆新街店)', 'type':'hotel','value': [113.537662, 22.193546]} ,
{'name': '君乐皇府公寓式酒店', 'type':'hotel','value': [113.550839, 22.149011]} ,
{'name': '英伦游艇会酒店', 'type':'hotel','value': [113.550308, 22.148957]} ,
{'name': '澳门安达仕酒店', 'type':'hotel','value': [113.556755, 22.144216]} ,
{'name': '四季名薈', 'type':'hotel','value': [113.561855, 22.146288]} ,
{'name': '上葡京', 'type':'hotel','value': [113.574216, 22.144018]} ,
{'name': '噢別致(大三巴店)', 'type':'hotel','value': [113.541681, 22.195354]} ,
{'name': '伦敦人御园', 'type':'hotel','value': [113.565364, 22.146347]} ,
{'name': '鏵龙酒店', 'type':'hotel','value': [113.543707, 22.191849]} ,
{'name': 'YOHO金银岛名胜世界酒店', 'type':'hotel','value': [113.542858, 22.187291]} ,
{'name': '家欣宾馆(庇山耶街)', 'type':'hotel','value': [113.539124, 22.196017]} ,
{'name': '家欣宾馆（草堆街）', 'type':'hotel','value': [113.538861, 22.196394]} ,
{'name': '国际酒店', 'type':'hotel','value': [113.536728, 22.196373]} ,
{'name': '绿悠旅舍', 'type':'hotel','value': [113.547932, 22.210337]} ,
{'name': '家欣宾馆(康公庙)', 'type':'hotel','value': [113.537455, 22.196873]} ,
{'name': '新东方商务宾馆北座', 'type':'hotel','value': [113.537297, 22.195813]}
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
		plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
	  })
		.then((AMap) => {
		  map = new AMap.Map("container", {
			// 设置地图容器id
			viewMode: "2D", // 是否为3D地图模式
			zoom: zoom.value, // 初始化地图级别
			center: center.value, // 初始化地图中心点位置
		  });
		  
		  labelsLayer = new AMap.LabelsLayer({
		    zooms: [3, 20],
		    zIndex: 999,
		    collision: true, //该层内标注是否避让
		    allowCollision: true, //不同标注层之间是否避让  
		  });
		  
		  map.add(labelsLayer);
		  setTimeout(updateMarkers(),1);
		})
		.catch((e) => {
		  console.log(e);
		});
	});
	
	onUnmounted(()=>{
		map?.destroy();
	});
	

	const markers = {
		饮水机: waterFountains,
		公共厕所: publicToilets,
		休息区: restAreas,
		酒店: hotelData
	};
	const markerImages = {
		water: "https://s21.ax1x.com/2024/11/04/pAr6Uns.png",
		restroom: "https://s21.ax1x.com/2024/11/04/pAr6tXj.png",
		restarea: "https://s21.ax1x.com/2024/11/04/pAr6d7q.png",
		hotel: "https://s21.ax1x.com/2024/11/04/pAr6aBn.png",
	}
	
	//图标对象
	const waterIcon = {
	  type: "image", //图标类型，现阶段只支持 image 类型
	  image: markerImages.water, //可访问的图片 URL
	  size: [25, 25], //图片尺寸
	  anchor: "center", //图片相对 position 的锚点，默认为 bottom-center
	};
	const restroomIcon = {
	  type: "image", //图标类型，现阶段只支持 image 类型
	  image: markerImages.restroom, //可访问的图片 URL
	  size: [25, 25], //图片尺寸
	  anchor: "center", //图片相对 position 的锚点，默认为 bottom-center
	};
	const restareaIcon = {
	  type: "image", //图标类型，现阶段只支持 image 类型
	  image: markerImages.restarea, //可访问的图片 URL
	  size: [25, 25], //图片尺寸
	  anchor: "center", //图片相对 position 的锚点，默认为 bottom-center
	};
	const hotelIcon = {
	  type: "image", //图标类型，现阶段只支持 image 类型
	  image: markerImages.hotel, //可访问的图片 URL
	  size: [25, 25], //图片尺寸
	  anchor: "center", //图片相对 position 的锚点，默认为 bottom-center
	};
	
	function updateMarkers(){
		//清除之前的标記
		labelsLayer.remove(labelMarkers);
		labelMarkers = [];
		
		filteredMarkers.value.forEach((item)=>{
			let icon;
			switch(item.type){
				case 'water':
					icon = waterIcon;
					break;
				case 'restroom':
					icon = restroomIcon;
					break;
				case 'restarea':
					icon = restareaIcon;
					break;
				case 'hotel':
					icon = hotelIcon;
					break;
			}
			const labelMarker = new AMap.LabelMarker({
				name: item.type,
				position: item.value,
				zIndex: 50,
				rank: 1,
				icon: icon,
				text:{
					content: item.name,
				}
			});
			labelMarkers.push(labelMarker)
		});
		//console.log(labelMarkers);
		labelsLayer.add(labelMarkers);
	}

	const offset = 0.005;
	Object.values(markers).forEach(typeMarkers =>
		typeMarkers.forEach(item => {
			item.value[0] += offset;
			item.value[1] -= offset;
		})
	);

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
		height:510px;
	}
	.map-tags-container {
	    position: absolute;
	    top: 10px;
	    left: 10px;
	    z-index: 1000; /* 确保它在地图上层 */
	}
	.map-tags{
		margin-right: 8px; /* 控制标签间距 */
	}
</style>