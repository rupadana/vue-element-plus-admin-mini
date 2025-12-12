import { defineStore } from 'pinia'
import { store } from '../index'
import { setCssVar, humpToUnderline } from '@/utils'
import { ElMessage, ComponentSize } from 'element-plus'
import { colorIsDark, hexToRGB, lighten, mix } from '@/utils/color'
import { unref } from 'vue'
import { useCssVar } from '@vueuse/core'
import { useDark } from '@vueuse/core'

interface AppState {
  breadcrumb: boolean
  breadcrumbIcon: boolean
  collapse: boolean
  uniqueOpened: boolean
  hamburger: boolean
  screenfull: boolean
  size: boolean
  locale: boolean
  tagsView: boolean
  tagsViewIcon: boolean
  logo: boolean
  fixedHeader: boolean
  greyMode: boolean
  dynamicRouter: boolean
  serverDynamicRouter: boolean
  pageLoading: boolean
  layout: LayoutType
  title: string
  isDark: boolean
  currentSize: ComponentSize
  sizeMap: ComponentSize[]
  mobile: boolean
  footer: boolean
  theme: ThemeTypes
  fixedMenu: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      sizeMap: ['default', 'large', 'small'],
      mobile: false, // 是否是移动端
      title: import.meta.env.VITE_APP_TITLE, // title
      pageLoading: false, // Router跳转loading
      breadcrumb: true, // breadcrumb
      breadcrumbIcon: true, // breadcrumbicons
      collapse: false, // 折叠menu
      uniqueOpened: false, // 是否只保持一个子menu的展开
      hamburger: true, // 折叠icons
      screenfull: true, // 全屏icons
      size: true, // 尺寸icons
      locale: true, // Multi-languageicons
      tagsView: true, // tabs
      tagsViewIcon: true, // 是否Showtagicons
      logo: true, // logo
      fixedHeader: true, // 固定toolheader
      footer: true, // Show页脚
      greyMode: false, // 是否Start灰色模式，用于特殊悼念Day
      dynamicRouter: true, // 是否动态Router
      serverDynamicRouter: true, // 是否服务端渲染动态Router
      fixedMenu: false, // 是否固定menu

      layout: 'classic', // layoutlayout
      isDark: false, // 是否是暗黑模式
      currentSize: 'default', // 组件尺寸
      theme: {
        // 主题色
        elColorPrimary: '#409eff',
        // 左侧menu边框颜色
        leftMenuBorderColor: 'inherit',
        // 左侧menu背景颜色
        leftMenuBgColor: '#001529',
        // 左侧menu浅色背景颜色
        leftMenuBgLightColor: '#0f2438',
        // 左侧menu选中背景颜色
        leftMenuBgActiveColor: 'var(--el-color-primary)',
        // 左侧menu收起选中背景颜色
        leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
        // 左侧menu字体颜色
        leftMenuTextColor: '#bfcbd9',
        // 左侧menu选中字体颜色
        leftMenuTextActiveColor: '#fff',
        // logo字体颜色
        logoTitleTextColor: '#fff',
        // logo边框颜色
        logoBorderColor: 'inherit',
        // header背景颜色
        topHeaderBgColor: '#fff',
        // header字体颜色
        topHeaderTextColor: 'inherit',
        // header悬停颜色
        topHeaderHoverColor: '#f6f6f6',
        // header边框颜色
        topToolBorderColor: '#eee'
      }
    }
  },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb
    },
    getBreadcrumbIcon(): boolean {
      return this.breadcrumbIcon
    },
    getCollapse(): boolean {
      return this.collapse
    },
    getUniqueOpened(): boolean {
      return this.uniqueOpened
    },
    getHamburger(): boolean {
      return this.hamburger
    },
    getScreenfull(): boolean {
      return this.screenfull
    },
    getSize(): boolean {
      return this.size
    },
    getLocale(): boolean {
      return this.locale
    },
    getTagsView(): boolean {
      return this.tagsView
    },
    getTagsViewIcon(): boolean {
      return this.tagsViewIcon
    },
    getLogo(): boolean {
      return this.logo
    },
    getFixedHeader(): boolean {
      return this.fixedHeader
    },
    getGreyMode(): boolean {
      return this.greyMode
    },
    getDynamicRouter(): boolean {
      return this.dynamicRouter
    },
    getServerDynamicRouter(): boolean {
      return this.serverDynamicRouter
    },
    getFixedMenu(): boolean {
      return this.fixedMenu
    },
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getLayout(): LayoutType {
      return this.layout
    },
    getTitle(): string {
      return this.title
    },
    getIsDark(): boolean {
      return this.isDark
    },
    getCurrentSize(): ComponentSize {
      return this.currentSize
    },
    getSizeMap(): ComponentSize[] {
      return this.sizeMap
    },
    getMobile(): boolean {
      return this.mobile
    },
    getTheme(): ThemeTypes {
      return this.theme
    },
    getFooter(): boolean {
      return this.footer
    }
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
    },
    setBreadcrumbIcon(breadcrumbIcon: boolean) {
      this.breadcrumbIcon = breadcrumbIcon
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setUniqueOpened(uniqueOpened: boolean) {
      this.uniqueOpened = uniqueOpened
    },
    setHamburger(hamburger: boolean) {
      this.hamburger = hamburger
    },
    setScreenfull(screenfull: boolean) {
      this.screenfull = screenfull
    },
    setSize(size: boolean) {
      this.size = size
    },
    setLocale(locale: boolean) {
      this.locale = locale
    },
    setTagsView(tagsView: boolean) {
      this.tagsView = tagsView
    },
    setTagsViewIcon(tagsViewIcon: boolean) {
      this.tagsViewIcon = tagsViewIcon
    },
    setLogo(logo: boolean) {
      this.logo = logo
    },
    setFixedHeader(fixedHeader: boolean) {
      this.fixedHeader = fixedHeader
    },
    setGreyMode(greyMode: boolean) {
      this.greyMode = greyMode
    },
    setDynamicRouter(dynamicRouter: boolean) {
      this.dynamicRouter = dynamicRouter
    },
    setServerDynamicRouter(serverDynamicRouter: boolean) {
      this.serverDynamicRouter = serverDynamicRouter
    },
    setFixedMenu(fixedMenu: boolean) {
      this.fixedMenu = fixedMenu
    },
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading
    },
    setLayout(layout: LayoutType) {
      if (this.mobile && layout !== 'classic') {
        ElMessage.warning('移动端模式下不支持切换其它布局')
        return
      }
      this.layout = layout
    },
    setTitle(title: string) {
      this.title = title
    },
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      this.setPrimaryLight()
    },
    setCurrentSize(currentSize: ComponentSize) {
      this.currentSize = currentSize
    },
    setMobile(mobile: boolean) {
      this.mobile = mobile
    },
    setTheme(theme: ThemeTypes) {
      this.theme = Object.assign(this.theme, theme)
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, this.theme[key])
      }
      this.setPrimaryLight()
    },
    setFooter(footer: boolean) {
      this.footer = footer
    },
    setPrimaryLight() {
      if (this.theme.elColorPrimary) {
        const elColorPrimary = this.theme.elColorPrimary
        const color = this.isDark ? '#000000' : '#ffffff'
        const lightList = [3, 5, 7, 8, 9]
        lightList.forEach((v) => {
          setCssVar(`--el-color-primary-light-${v}`, mix(color, elColorPrimary, v / 10))
        })
        setCssVar(`--el-color-primary-dark-2`, mix(color, elColorPrimary, 0.2))
      }
    },
    setMenuTheme(color: string) {
      const primaryColor = useCssVar('--el-color-primary', document.documentElement)
      const isDarkColor = colorIsDark(color)
      const theme: Recordable = {
        // 左侧menu边框颜色
        leftMenuBorderColor: isDarkColor ? 'inherit' : '#eee',
        // 左侧menu背景颜色
        leftMenuBgColor: color,
        // 左侧menu浅色背景颜色
        leftMenuBgLightColor: isDarkColor ? lighten(color!, 6) : color,
        // 左侧menu选中背景颜色
        leftMenuBgActiveColor: isDarkColor
          ? 'var(--el-color-primary)'
          : hexToRGB(unref(primaryColor), 0.1),
        // 左侧menu收起选中背景颜色
        leftMenuCollapseBgActiveColor: isDarkColor
          ? 'var(--el-color-primary)'
          : hexToRGB(unref(primaryColor), 0.1),
        // 左侧menu字体颜色
        leftMenuTextColor: isDarkColor ? '#bfcbd9' : '#333',
        // 左侧menu选中字体颜色
        leftMenuTextActiveColor: isDarkColor ? '#fff' : 'var(--el-color-primary)',
        // logo字体颜色
        logoTitleTextColor: isDarkColor ? '#fff' : 'inherit',
        // logo边框颜色
        logoBorderColor: isDarkColor ? color : '#eee'
      }
      this.setTheme(theme)
      this.setCssVarTheme()
    },
    setHeaderTheme(color: string) {
      const isDarkColor = colorIsDark(color)
      const textColor = isDarkColor ? '#fff' : 'inherit'
      const textHoverColor = isDarkColor ? lighten(color!, 6) : '#f6f6f6'
      const topToolBorderColor = isDarkColor ? color : '#eee'
      setCssVar('--top-header-bg-color', color)
      setCssVar('--top-header-text-color', textColor)
      setCssVar('--top-header-hover-color', textHoverColor)
      this.setTheme({
        topHeaderBgColor: color,
        topHeaderTextColor: textColor,
        topHeaderHoverColor: textHoverColor,
        topToolBorderColor
      })
      if (this.getLayout === 'top') {
        this.setMenuTheme(color)
      }
    },
    initTheme() {
      const isDark = useDark({
        valueDark: 'dark',
        valueLight: 'light'
      })
      isDark.value = this.getIsDark
    }
  },
  persist: true
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
