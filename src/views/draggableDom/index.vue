<template>
    <div>
        <div class="cellBox" id="cellBox"
        @dragstart="boxDragstart($event)"
        @drop="boxDrop($event)"
        @dragover="dragover($event)">
            <transition-group tag="div" name="drog">
                <div class="cell" v-for="(item, index) in list" :key="item" draggable data-name="cellBox"
                @dragstart="cellDragstart($event, index)"
                @drop="cellDrop($event, index)"
                @dragover.stop="dragover($event, index)">
                {{item}}</div>
            </transition-group>
        </div>
        <div class="cellBox marTop" id="cellBox2"
        @dragstart="boxDragstart($event)"
        @drop="boxDrop($event)"
        @dragover="dragover($event)">
            <transition-group tag="div" name="drog">
                <div class="cell" v-for="(item, index) in list2" :key="item" draggable data-name="cellBox2"
                @dragstart="cellDragstart($event, index)"
                @drop="cellDrop2($event, index)"
                @dragover.stop="dragover($event, index)">
                {{item}}</div>
            </transition-group>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [1,2,3,4,5,6],
            list2: [],
            dropTar: null,
            currentBox: ''
        }
    },
    methods: {
        cellDragstart(e, index) {
            // console.log(e.target, 'start')
            e.dataTransfer.setData('cell', index);  
        },
        dragover(e, index) {
            e.preventDefault();
        },
        cellDrop(e, index) {
            e.preventDefault();
            let currentName = e.target.dataset.name
            if (currentName == this.currentBox) {
                let selectIndex = e.dataTransfer.getData('cell')
                let arr = this.list.concat()
                let item = arr.splice(selectIndex, 1)
                arr.splice(index, 0, ...item)
                this.list = arr
            } else {
                let selectIndex = e.dataTransfer.getData('cell')
                let arr = this.list2.concat()
                let item = arr.splice(selectIndex, 1)
                this.list.splice(index + 1, 0, ...item)
                this.list2 = arr
            }
        },
        cellDrop2(e, index) {
            e.preventDefault();
            let currentName = e.target.dataset.name
            if (currentName == this.currentBox) {
                let selectIndex = e.dataTransfer.getData('cell')
                let arr = this.list2.concat()
                let item = arr.splice(selectIndex, 1)
                arr.splice(index, 0, ...item)
                this.list2 = arr
            } else {
                let selectIndex = e.dataTransfer.getData('cell')
                let arr = this.list.concat()
                let item = arr.splice(selectIndex, 1)
                this.list2.splice(index + 1, 0, ...item)
                this.list = arr
            }
        },
        boxDragstart(e) {
            this.currentBox = e.target.dataset.name
        },
        boxDrop(e) {
            e.preventDefault();
            let currentId = e.target.id    // 
            let currentName = e.target.dataset.name
            // 当name有值的时候就是放在了cell上 当id有值时放在了box里面
            console.log(currentId, this.currentName, 999)
            if (currentName && currentName == this.currentBox) {
                // 放在当前box的cell中
                return
            } else if (currentId && currentId == this.currentBox) {
                // 放在当前box中(没放在cell上)
                return
            } else if(currentId && currentId != this.currentBox) {
                // 放在另外的box中(没放在cell上)
                let selectIndex = e.dataTransfer.getData('cell')
                let listArr = []
                if (this.currentBox == 'cellBox') {
                    listArr = this.list
                } else {
                    listArr = this.list2
                }
                let arr = listArr.concat()
                let item = arr.splice(selectIndex, 1)
                if (currentId == 'cellBox') {
                    this.list.push(...item)
                    this.list2 = arr
                } else {
                    this.list2.push(...item)
                    this.list = arr
                }
            } else if(currentName && currentName != this.currentBox) {
                // 放在另外box中的cell中
                return
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .cellBox {
        width: 400rpx;
        min-height: 500rpx;
        background: #eeeeee;
        .cell {
            width: 300rpx;
            height: 50rpx;
            background: #abcded;
            line-height: 50rpx;
            margin-bottom: 20rpx;
        }
    }
    .marTop {
        margin-top: 20rpx;
    }
    .drog-move {
        transition: transform 0.5s;
    }
</style>