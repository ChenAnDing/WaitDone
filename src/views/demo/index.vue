<template>
  <div class="page">
    <div class="swiper" ref="swiper">
      <div class="bottombtn" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove"></div>
      <div class="cal">
        <div>{{year}}-{{month}}-{{day}}</div>
        <div class="dateTar">
          <div class="switchBtn" @click="lastMonth"><</div>
          <div class="yearandmonth">
            <div class="yearandmonthCell">{{year}}</div>
            <div class="yearandmonthCell">{{month}}</div>
          </div>
          <div class="switchBtn" @click="nextMonth">></div>
        </div>
        <div class="weeks">
          <div class="week" v-for="(item, index) in weeks" :key="index + 'adsfj'">{{item}}</div>
        </div>
        <div class="dateCells">
          <div 
          class="dateCell" 
          @click="selectDay(item, index)"
          v-for="(item, index) in dateArray" 
          :key="index + 'qwer'" 
          :style="{color: item.isMonthDay ? '#080808' : '#999', background: item.isSelect ? '#eee' : '#fff'}">{{item.dateNum}}</div>
        </div>
        
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      weeks: [
        '日',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
      ],
      dateArray: [],
      year: '',
      month: '',
      day: '',
      startPointY: '',
      movePointY: 0
    }
  },
  computed: {
  },
  methods: {
    touchStart(e) {
      // console.log(e.touches)
      this.startPointY = e.touches[0].clientY
      // console.log(this.startPointY)
      e.preventDefault()
    },
    touchEnd(e) {
      // console.log(e.touches)
      e.preventDefault()
    },
    touchMove(e) {
      let nowMovePointY = e.touches[0].clientY
      // console.log(e.touches[0])
      // if (parseInt(this.$refs.swiper.style.top) > 0) {
      //   return
      // }
      this.movePointY = this.startPointY - nowMovePointY
      if(this.movePointY == 0) {
        return
      }
      this.$refs.swiper.style.top = - this.movePointY + 'px'
      // console.log(this.movePointY)

    },
    selectDay(item, index) {
      let days = this.getMonthDays(this.year, this.month)
      let monthFirstDayWeek = this.getWeekday(this.year, this.month, 1)
      let monthLastDayWeek = this.getWeekday(this.year, this.month, days)
      console.log(index)
      console.log(monthLastDayWeek)
      console.log(this.dateArray.length - (6 - monthLastDayWeek))
      if(index < monthFirstDayWeek || index >= (this.dateArray.length - (6 - monthLastDayWeek))) {
        return
      }
      this.dateArray[monthFirstDayWeek + this.day - 1].isSelect = false
      this.dateArray[index].isSelect = true
      this.day = this.dateArray[index].dateNum
    },
    lastMonth() {
      if (this.month == 1) {
        this.year = this.year - 1
        this.month = 12
      } else {
        this.month  = this.month - 1
      }
      this.day = 1
      this.getMonthDayArray(this.year, this.month, this.day)
    },
    nextMonth() {
      console.log(this.month)
      if (this.month == 12) {
        this.year = this.year + 1
        this.month = 1
      } else {
        this.month = this.month + 1
      }
      this.day = 1
      this.getMonthDayArray(this.year, this.month, this.day)
    },
    currentMonth() {
      let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.day = date.getDate()
      this.getMonthDayArray(this.year, this.month, this.day)
    },
    getMonthDays(year, month) {
      return new Date(year, month, 0).getDate()
    },
    getWeekday(year, month, day) {
      return new Date(year, month - 1, day).getDay()
    },
    getMonthDayArray(year, month, day) {

      let dateArray = []

      let days = this.getMonthDays(year, month)
      let preDays = this.getMonthDays(year, month - 1)
      let monthFirstDayWeek = this.getWeekday(year, month, 1)
      let monthLastDayWeek = this.getWeekday(year, month, days)

      // 添加上个月的日期
      for(let i = 0; i < monthFirstDayWeek; i++) {
        dateArray.push({
          dateNum: preDays - monthFirstDayWeek + i + 1,
          isMonthDay: false
        })
      }
      // 添加本月的日期
      for(let i= 0; i < days; i++) {
        dateArray.push({
          dateNum: i + 1,
          isMonthDay: true,
          isSelect: i + 1 == this.day
        })
      }
      // 添加下个月的日期
      for(let i = 0; i < (6 - monthLastDayWeek); i++) {
        dateArray.push({
          dateNum: i + 1,
          isMonthDay: false
        })
      }

      console.log(dateArray)
      this.dateArray = dateArray
    }
  },
  async mounted() {
    this.currentMonth()
  }
}
</script>
<style lang="scss" scoped>
    .page {
        width: 100%;
        min-height: 100vh;
        .cal {
          margin: auto;
          width: 570rpx;
          .dateTar {
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 80rpx;
              width: 100%;
              .switchBtn {
                width: 50rpx;
                height: 50rpx;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .yearandmonth {
                display: flex;
                align-items: center;
                justify-content: center;
                .yearandmonthCell {
                  width: 200rpx;
                  text-align: center;
                }
              }
          }
        }
      .weeks {
        display: flex;
        border: 1px solid #eeeeee;
        .week {
          width: 80rpx;
          height: 80rpx;
          //  line-height: 30rpx;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .dateCells {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #eeeeee;
        .dateCell {
          width: 80rpx;
          height: 80rpx;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .swiper {
      width: 100%;
      padding: 0 0 100rpx 0;
      background: #eeeeee;
      position: relative;
      .bottombtn {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 150rpx;
        height: 50rpx;
        background: lightcoral;
      }
    }
</style>