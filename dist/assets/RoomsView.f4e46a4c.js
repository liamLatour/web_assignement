import{_ as h,a as c,o as d,c as m,b as s,w as l,v as u,t as p,r as _,F as g,d as x,e as R,f as w,n as v,h as T,p as y,i as I}from"./index.d306d694.js";const k={name:"RoomsListItem",props:["room"],data:function(){return{name:""}},created:async function(){this.name=this.room.name},methods:{async renameRoom(){let e=(await c.post("/api/rooms/",{buildingId:this.room.buildingId,buildingName:this.room.buildingName,currentTemperature:this.room.currentTemperature,targetTemperature:this.room.targetTemperature,floor:this.room.floor,id:this.room.id,name:this.name},{auth:{username:"admin",password:"pass"}})).data;this.$emit("room-updated",e)},async deleteWindow(){await c.delete("/api/rooms/"+this.room.id,{auth:{username:"admin",password:"pass"}}),this.$emit("room-deleted",this.room)}}},V={class:"border rounded p-3 m-4 w-40"},L={class:"flex flex-col justify-center items-center"},B={class:"text-lg"},C={class:"text-lg"},D={key:0,class:"text-lg"},U={key:1,class:"text-lg"};function z(t,e,n,b,r,a){return d(),m("div",V,[s("span",{class:"absolute cursor-pointer -left-2 -top-2 bg-red-600 rounded-3xl w-6 h-6 text-white text-center z-10",onClick:e[0]||(e[0]=(...i)=>a.deleteWindow&&a.deleteWindow(...i))}," \u2716 "),s("div",L,[l(s("input",{"onUpdate:modelValue":e[1]||(e[1]=i=>t.name=i),id:"name",class:"bg-transparent text-center font-bold text-xl px-2 m-1 w-full",size:"1",onBlur:e[2]||(e[2]=(...i)=>a.renameRoom&&a.renameRoom(...i))},null,544),[[u,t.name]]),s("div",B,p(n.room.buildingName),1),s("div",C,"Floor: "+p(n.room.floor),1),n.room.currentTemperature&&n.room.targetTemperature?(d(),m("div",D,p(n.room.currentTemperature)+" / "+p(n.room.targetTemperature),1)):(d(),m("div",U,"-"))])])}const A=h(k,[["render",z]]);const N={components:{RoomsListItem:A},name:"RoomsList",data:function(){return{fetched:!1,rooms:[]}},created:async function(){let e=(await c.get("/api/rooms",{auth:{username:"admin",password:"pass"}})).data;this.rooms=e,this.fetched=!0},methods:{updateRoom(t){let e=this.rooms.findIndex(n=>n.id===t.id);this.rooms.splice(e,1,t)},addRoom(t){this.rooms.push(t)},deleteRoom(t){let e=this.rooms.findIndex(n=>n.id===t.id);this.rooms.splice(e,1)}}},S={class:"flex flex-wrap items-center justify-around pt-3"},F={key:0,class:"lds-dual-ring"};function j(t,e,n,b,r,a){const i=_("rooms-list-item");return d(),m("div",S,[t.fetched?(d(!0),m(g,{key:1},x(t.rooms,o=>(d(),R(i,{room:o,key:o.id,onRoomUpdated:a.updateRoom,onRoomDeleted:a.deleteRoom},null,8,["room","onRoomUpdated","onRoomDeleted"]))),128)):(d(),m("div",F))])}const M=h(N,[["render",j],["__scopeId","data-v-7755eaeb"]]);const W={components:{RoomsList:M},name:"RoomsView",data(){return{name:"",building:"",floor:"",currentTemperature:"",targetTemperature:"",buildings:["A","BB","CCC"]}},computed:{cantAddRoom:function(){return this.name==""||this.building==""||this.floor==""}},created:async function(){let e=(await c.get("/api/buildings",{auth:{username:"admin",password:"pass"}})).data;this.buildings=e},methods:{async addRoom(){let e=(await c.post("/api/rooms/",{name:this.name,buildingId:this.building,currentTemperature:this.currentTemperature,targetTemperature:this.targetTemperature,floor:this.floor},{auth:{username:"admin",password:"pass"}})).data;this.$refs.roomsList.addRoom(e)}}},f=t=>(y("data-v-8eab30ae"),t=t(),I(),t),O={class:"flex h-full"},E={class:"flex flex-col bg-zinc-900 px-7 py-3 shadow-lg shrink min-w-fit grow-0"},$=f(()=>s("label",{class:"text-center font-semibold text-xl mb-2"}," ADD A ROOM ",-1)),q=f(()=>s("option",{class:"bg-zinc-900",value:"",disabled:"",selected:""}," Select a Building ",-1)),G=["value"],H={class:"flex justify-between"},J={class:"m-auto mt-1 max-w-5xl"},K=f(()=>s("h1",{class:"text-center text-5xl m-7"},"Rooms",-1));function P(t,e,n,b,r,a){const i=_("RoomsList");return d(),m("div",O,[s("form",E,[$,l(s("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>r.name=o),id:"name",placeholder:"Room Name",class:"p-3 rounded m-2 bg-transparent border font-bold text-base h-12"},null,512),[[u,r.name]]),l(s("select",{"onUpdate:modelValue":e[1]||(e[1]=o=>r.building=o),id:"building",class:"p-3 rounded m-2 bg-transparent border font-bold text-base h-12"},[q,(d(!0),m(g,null,x(r.buildings,o=>(d(),m("option",{class:"bg-zinc-900",key:o.id,value:o.id},p(o.name),9,G))),128))],512),[[w,r.building]]),l(s("input",{"onUpdate:modelValue":e[2]||(e[2]=o=>r.floor=o),id:"floor",type:"number",placeholder:"Room Floor",class:"p-3 rounded m-2 bg-transparent border font-bold text-base h-12"},null,512),[[u,r.floor]]),s("div",H,[l(s("input",{"onUpdate:modelValue":e[3]||(e[3]=o=>r.currentTemperature=o),id:"currentTemperature",type:"number",placeholder:"Current Temp",min:"-999",max:"999",class:"p-3 rounded m-2 bg-transparent border font-bold text-base h-12 grow"},null,512),[[u,r.currentTemperature]]),l(s("input",{"onUpdate:modelValue":e[4]||(e[4]=o=>r.targetTemperature=o),id:"targetTemperature",type:"number",placeholder:"Target Temp",min:"-999",max:"999",class:"p-3 rounded m-2 bg-transparent border font-bold text-base h-12 grow"},null,512),[[u,r.targetTemperature]])]),s("a",{href:"#",onClick:e[5]||(e[5]=(...o)=>a.addRoom&&a.addRoom(...o)),class:v(["bg-green-500 rounded p-3 m-2 text-center text-white font-bold",{disabled:a.cantAddRoom}])}," ADD IT ",2)]),s("div",J,[K,T(i,{ref:"roomsList"},null,512)])])}const X=h(W,[["render",P],["__scopeId","data-v-8eab30ae"]]);export{X as default};
