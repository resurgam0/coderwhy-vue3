import hyRequest from "@/service";

export function getEntireRole(){
  return hyRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments(){
  return hyRequest.post({
    url:'/department/list'
  })
}

export function getEntireMenus(){
  return hyRequest.post({
    url:'/menu/list'
  })
}
