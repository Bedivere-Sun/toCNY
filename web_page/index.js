//保存一个历史值，如果历史值和输入进来的数值一致，就直接跳过，不计算
let recent_number = null;
//本来是想加一个记录序号的，但是又觉得没意义……
//let history_counter = 0;

//匹配字串内容是否为整数或小数
const isNumber = function(str){
	if(str.length < 1){
		return false;
	}
	//先检查是不是整数或小数
	pattern = /^([0]|[0-9]*)(\.\d+)?$/;
	if(!str.match(pattern)){
		WrittingForm.innerHTML = '';
		tips.innerHTML = '这不是一个数字，请重新输入!';
		number.select();
		return false;
	}
	//再检查是不是超过16位
	if(str.length > 16){
		WrittingForm.innerHTML = '';
		tips.innerHTML = '这个数字大的突破天际了……';
		number.select();
		return false;
	}
	tips.innerHTML = '';
	return true;
}

//数字位和单位替换内容
const digits = {
		'0':'零',
		'1':'壹',
		'2':'贰',
		'3':'叁',
		'4':'肆',
		'5':'伍',
		'6':'陆',
		'7':'柒',
		'8':'捌',
		'9':'玖',
		'.':'点'
};

const units = "仟佰拾万仟佰拾亿仟佰拾万仟佰拾元·角分";



const translate = function(str){
	//补齐位数，对齐输出
	if(str.indexOf('.') < 0){
		str += '.00';
	}else if(!str[str.indexOf('.') + 2]){
		str += '0';
	}
	str = str.substring(0,str.indexOf('.') + 3);
	result = "";
	startPos = units.length - str.length;
	for(let i = 0; i < str.length; i++){
		result += digits[str[i]] + units[startPos + i];
	}
	//替换小数部分，去掉小数点
	result = result.replace('点·','').replace('零角','零').replace('零零分','整').replace('零分','');
	/*整数去零的思路：
	 * 先把零仟零佰零拾的部分换成零
	 * 然后把各种零亿替换成亿，各种零万替换成万，各种零元替换成元
	 * 之后应该就只剩下亿万元这种错误了
	 * 都整理好之后再把多出来的零抹掉
	 * 
	 * 原型：
	 * result = result.replace(/零仟|零佰|零拾/g,'零');
	 * result = result.replace(/零*亿/g,'亿');
	 * result = result.replace(/零*万/g,'万');
	 * result = result.replace(/零*元/,'元');
	 * result = result.replace(/亿万元/,'亿元');
	 * result = result.replace(/零零/g,'零');
	 */
	result = result.replace(
				/零仟|零佰|零拾/g,'零'
			).replace(
					/零*亿/g,'亿'
			).replace(
					/零*万/g,'万'
			).replace(
					/零*元/,'元'
			).replace(
					/亿万元/,'亿元'
			).replace(/零零/g,'零');
	
	return result;
}

const trans = function(str){
	if(!isNumber(str)){
		return;
	}
	
	if(recent_number === str){
		return;
	}
	
	//history_counter += 1;
	let result = translate(str);
	WrittingForm.innerHTML = '<p>转换结果：</p><h2>' + result + '</h2>';
  //去掉了一列：<td>${history_counter}</td>
	records.innerHTML += `<tr><td>${str}</td><td>${result}</td></tr>`;
	recent_number = str;
}

const Clear_History = function(){
	recent_number = null;
	records.innerHTML = '';
	history_counter = 0;
}


