<template>
  <div>
    <!--  三级联动!!-->
   <TypeIndex/>
    <listIndex/>
    <recomIndex/>
    <RankIndex/>
    <LikeIndex/>
    <FloorIndex v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <BrandIndex/>
  </div>
</template>

<script>
import ListIndex from "@/pages/Home/ListContainer/ListIndex";
import RecomIndex from "@/pages/Home/Recommend/RecomIndex";
import RankIndex from "@/pages/Home/Rank/RankIndex";
import LikeIndex from "@/pages/Home/Like/LikeIndex";
import FloorIndex from "@/pages/Home/Floor/FloorIndex";
import BrandIndex from "@/pages/Home/Brand/BrandIndex";

import {mapState} from "vuex";

export default {
  name: "HomeIndex",
  components: {
    ListIndex, RecomIndex, RankIndex, LikeIndex, FloorIndex, BrandIndex,
  },
  mounted() {
    //参数是action
    this.$store.dispatch('getFloorList')
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  }
}
</script>

<style scoped>

</style>