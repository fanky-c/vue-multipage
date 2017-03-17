// 1~24轮 第一天
// 25~48轮 第二天
// 49轮 静态展示
// 50轮 周中间隙，非活动
// 51~74轮 第三天
// 75~98轮 第四天
// 99轮 静态展示
// 100轮 周中间隙，非活动
// 101~124轮 第五天
// 125~148轮 第六天
// 149轮 静态展示
// 150轮 周中间隙，非活动
// 151~174轮 第七天
// 175~198轮 第八天
// 199轮 静态展示
// 200轮 结束轮次


/**
 * [getDayAndRound description]
 * @param  {[type]} totleRound [description]
 * @return {[type]}            [description]
 */
export let getDayAndRound = function (totleRound){
    var totleRound = totleRound*1;
    var curday = 1;
    var curround = 1;

    switch(true){
         case (totleRound >= 1 && totleRound <= 24):
              curday = 1;
              curround = totleRound;
              break; 
          case (totleRound >= 25 && totleRound <= 48) || totleRound == 49 || totleRound == 50:
              curday = 2;
              curround = totleRound-24;
              break; 
          case (totleRound >= 51 && totleRound <= 74):
              curday = 3;
              curround = totleRound-50;
              break;               
          case (totleRound >= 75 && totleRound <= 98) || totleRound == 99 || totleRound == 100:
              curday = 4;
              curround = totleRound-74;
              break; 
          case (totleRound >= 101 && totleRound <= 124):
              curday = 5;
              curround = totleRound-100;
              break; 
          case (totleRound >= 125 && totleRound <= 148)|| totleRound == 149 || totleRound == 150:
              curday = 6;
              curround = totleRound-124;
              break; 
          case (totleRound >= 151 && totleRound <= 174):
              curday = 7;
              curround = totleRound-150;
              break;
          case (totleRound >= 175 && totleRound <= 198) || totleRound == 199 || totleRound == 200:
              curday = 8;
              curround = totleRound-174;
              break;                                                                    
    }

      
    return {
        curday: curday,
        curround: curround 
    }
 };


/**
 * [getCurRound 获取当前的轮次]
 * @param  {[type]} curday   [天数]
 * @param  {[type]} index    [1-24]
 * @return {[type]}          [总共轮次]
 */
export let getCurRound = function (curday,index){
   var curday = curday*1 || 1;
   var index = index*1 || 1;
   var totleRound = 1;


   switch(true){
   	  case curday == 1:
   	    totleRound = index;
   	    break;	    
   	  case curday == 2:
   	    totleRound = index + 24;
   	    break;
   	  case curday == 3:
   	    totleRound = index + 50;
   	    break;
   	  case curday == 4:
   	    totleRound = index + 74;
   	    break;
   	  case curday == 5:
   	    totleRound = index + 100;
   	    break;
   	  case curday == 6:
   	    totleRound = index + 124;
   	    break;
   	  case curday == 7:
   	    totleRound = index + 150;
   	    break;
   	  case curday == 8:
   	    totleRound = index + 174;
   	    break;   	       	       	       	       	       	    
   }
     return totleRound;
}

