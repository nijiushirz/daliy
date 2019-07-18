// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import './assets/bootstrap-3.3.0-dist/dist/css/bootstrap.min.css'
import './assets/bootstrap-3.3.0-dist/dist/js/bootstrap'
import './assets/fontawesome/css/font-awesome.min.css'
import './assets/css/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'


Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http=Axios
Vue.prototype.BasePath = '/admin_service'
Vue.prototype.imageIP = 'http://172.24.0.49:8080'

Date.prototype.Format = function(formatStr)
{
  var str = formatStr;
  var Week = ['日','一','二','三','四','五','六'];

  str=str.replace(/yyyy|YYYY/,this.getFullYear());
  str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

  str=str.replace(/MM/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1).toString());
  str=str.replace(/M/g,this.getMonth());

  // str=str.replace(/w|W/g,Week[this.getDay()]);
  str=str.replace(/ww|WW/g,this.getYearWeek(this.getFullYear(),this.getMonth()+1,this.getDate()));

  str=str.replace(/ws|WS/g,this.getWeekRange(this.getFullYear(),this.getMonth()+1,this.getDate()).start);
  str=str.replace(/we|WE/g,this.getWeekRange(this.getFullYear(),this.getMonth()+1,this.getDate()).end);


  str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
  str=str.replace(/d|D/g,this.getDate());

  str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
  str=str.replace(/h|H/g,this.getHours());
  str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
  str=str.replace(/m/g,this.getMinutes());

  str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
  str=str.replace(/s|S/g,this.getSeconds());

  return str;
}
Date.prototype.getYearWeek = function(a, b, c)
{
  /*
  date1是当前日期
  date2是当年第一天
  d是当前日期是今年第多少天
  用d + 当前年的第一天的周差距的和在除以7就是本年第几周
  */
  var date1 = new Date(a, parseInt(b) - 1, c),
    date2 = new Date(a, 0, 1),
    d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
  var week = Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
  week = week>9?week.toString():'0'+ week.toString()
  var year = date1.getFullYear();
  var day = date1.getDay();
  var start =  new Date(a, parseInt(b) - 1, c-day);
  var end =  new Date(a, parseInt(b) - 1, c-day+6);

  if(end.getMonth() == 0){//到第二年了。。
    week = '01';
    year = date1.getFullYear() + 1
  }

  return year + ' 年 ' + week + ' 周';
};

Date.prototype.getWeekRange = function(a,b,c){
  var date1 = new Date(a, parseInt(b) - 1, c)
  var day = date1.getDay();
  var start =  new Date(a, parseInt(b) - 1, c-day);
  var end =  new Date(a, parseInt(b) - 1, c-day+6);
  return {
    start:(start.getMonth()+1>9?(start.getMonth()+1).toString():'0' + (start.getMonth()+1).toString()) + '.' + (start.getDate()>9?start.getDate().toString():'0' + start.getDate().toString() ),
    end:(end.getMonth()+1>9?(end.getMonth()+1).toString():'0' + (end.getMonth()+1).toString()) + '.' + (end.getDate()>9?end.getDate().toString():'0' + end.getDate().toString())
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

