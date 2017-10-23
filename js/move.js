/**
 * Created by 墨梅 on 2017/6/30.
 */
function startMove(obj,json,endFn){
    if(obj.timer){
        clearInterval(obj.timer);
    }
    obj.timer = setInterval(function () {
        var bool = true;
        for(var attr in json){

                var iCur = 0;
                var iSpeed = 0;
                if (attr == 'opacity') {
                    iCur = Math.round(parseFloat(getStyle(obj, 'opacity')) * 100);
                } else {
                    iCur = parseInt(getStyle(obj, attr));
                }
                iSpeed = (json[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);//用于处理当速度小于1和大于-1的情况下，由于JS会自动将值进行四舍五入，所以当值小于一定范围时，永远到不了目标点

                if (iCur != json[attr]) {
                    bool = false;

                    if (attr == 'opacity') {
                        obj.style.filter = 'alpha(opacity' + (iCur + iSpeed) + ')';
                        obj.style.opacity = (iCur + iSpeed) / 100;
                    } else {
                        obj.style[attr] = iCur + iSpeed + 'px';
                    }
                }
        }
        if(bool){
            clearInterval(obj.timer);
            if(endFn){
                endFn.call(obj);
            }
        }
    },30);
}

function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}