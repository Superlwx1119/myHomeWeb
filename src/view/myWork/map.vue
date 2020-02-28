<template>
  <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true" v-loading="loading">
    <!-- <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale> -->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
  </baidu-map>
</template>

<script>
export default {
    name:'Map',
    data(){
      return{
        center: {lng: 0, lat: 0},
        zoom: 3,
        loading:false
      }
    },
    methods:{
      handler ({BMap, map}) {
        this.loading=true
        let that=this
        let lng
        let lat
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            lat=r.point.lat;
            lng=r.point.lng;
            that.loading=false
            // alert('您的位置：'+r.point.lng+','+r.point.lat);
          }
          else {
            alert('failed'+this.getStatus());
          }        
        },{enableHighAccuracy: true})
        console.log(BMap, map)
        this.center.lng = lng
        this.center.lat = lat
        this.zoom = 15
      }
    }
}
</script>

<style scpoed lang="scss">
    .bm-view {
    width: 100%;
    height: 5rem !important;
    }
</style>