import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

/**
* redirect: noredirect        当Set noredirect 的时候该Router在breadcrumbnavigation中不可被点击
* name:'router-name'          设定Router的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    hidden: true              当Set true 的时候该Router不会再sidebar出现 如404，login等页面(默认 false)

    alwaysShow: true          当你一个Router下面的 children 声明的Router大于1个时，自动会变成嵌套的模式，
                              只有一个时，会将那个子Router当做根RouterShow在sidebar，
                              若你想不管Router下面的 children 声明的个数都Show你的根Router，
                              你CanSet alwaysShow: true，这样它就会忽略之前定义的规则，
                              一直Show根Router(默认 false)

    title: 'title'            Set该Router在sidebar和breadcrumb中展示的名字

    icon: 'svg-name'          Set该Router的icons

    noCache: true             如果Set为true，则不会被 <keep-alive> 缓存(默认 false)

    breadcrumb: false         如果Set为false，则不会在breadcrumbbreadcrumb中Show(默认 true)

    affix: true               如果Set为true，则会一直固定在tag项中(默认 false)

    noTagsView: true          如果Set为true，则不会出现在tag中(默认 false)

    activeMenu: '/dashboard'  Show高亮的Routerpath

    canTo: true               Set为true即使hidden为true，也依然Can进行Router跳转(默认 false)

    permission: ['edit','add', 'delete']    Set该Router的permission
  }
**/
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    hidden?: boolean
    alwaysShow?: boolean
    title?: string
    icon?: string
    noCache?: boolean
    breadcrumb?: boolean
    affix?: boolean
    activeMenu?: string
    noTagsView?: boolean
    followAuth?: string
    canTo?: boolean
    permission?: string[]
  }
}

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

declare global {
  declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    component?: Component | string
    children?: AppRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
  }

  declare interface AppCustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    component: string
    path: string
    redirect: string
    children?: AppCustomRouteRecordRaw[]
  }
}
