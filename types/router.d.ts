import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

/**
* redirect: noredirect        When noredirect is set, this route cannot be clicked in breadcrumb navigation
* name:'router-name'          Set the router name, must be filled otherwise various problems will occur when using <keep-alive>
* meta : {
    hidden: true              When set to true, this route will not appear in sidebar like 404, login etc. (default false)

    alwaysShow: true          When there is more than one route declared under a router's children,
                              it will automatically become nested mode,
                              When there is only one, that child route will be shown as the root route in sidebar,
                              If you want to show the root route regardless of the number of children routes declared,
                              you can set alwaysShow: true, so it will ignore the previously defined rules,
                              always show root route (default false)

    title: 'title'            Set the name displayed in sidebar and breadcrumb

    icon: 'svg-name'          Set the icon for this route

    noCache: true             If set to true, it will not be cached by <keep-alive> (default false)

    breadcrumb: false         If set to false, it will not be shown in breadcrumb (default true)

    affix: true               If set to true, it will be always fixed in tag items (default false)

    noTagsView: true          If set to true, it will not appear in tags (default false)

    activeMenu: '/dashboard'  Show highlighted router path

    canTo: true               If set to true, router navigation can be performed even if hidden is true (default false)

    permission: ['edit','add', 'delete']    Set permissions for this route
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
