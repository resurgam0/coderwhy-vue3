import type { RouteRecordRaw } from 'vue-router'
function loadLocalRoutes(){
  const localRoutes: RouteRecordRaw[] = []
  // 1.1读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })
  for(const key in files){
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]){
  const localRoutes = loadLocalRoutes()
  const routes: RouteRecordRaw[] = []
  for(const menu of userMenus){
    for(const submenu of menu.children){
      const route = localRoutes.find(item=>item.path===submenu.url)
      if(route){
        // 给route的顶层菜单增加重定向功能，但是只需要添加一次即可
        if(!routes.find((item)=>item.path === menu.url)){
          routes.push({path: menu.url, redirect: route.path})
        }
        routes.push(route)
      }
      // 记录第一个被匹配的菜单
      if(!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}
/**
 *  根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]){
  for(const menu of userMenus){
    for(const submenu  of menu.children){
      if(submenu.url === path){
        return submenu
      }
    }
  }
}

interface IBreadcrumbs{
  name: string,
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]){
  const breadcrumbs: IBreadcrumbs[] = []
  for(const menu of userMenus){
    for(const submenu of menu.children){
      if(submenu.url===path){
        breadcrumbs.push({name: menu.name, path: menu.url})
        breadcrumbs.push({name: submenu.name, path: submenu.url})
      }
    }
  }
  return breadcrumbs
}
/**
 *菜单映射到id的列表
 * @param menulist
 */
export function mapMenuListToIds(menulist: any[]){
  const ids: number[] = []
  function recurseGetId(menus: any[]){
    for(const item of menus){
      if(item.children){
        recurseGetId(item.children)
      }else{
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menulist)
  return ids
}
export function mapMenuListToPermissions(menulist:any[]){
  const permissions: string[] = []
  function recurseGetPermission(menus:any[]){
    for(const item of menus){
      if(item.type===3){
        permissions.push(item.permission)
      }else{
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menulist)
  return permissions
}
