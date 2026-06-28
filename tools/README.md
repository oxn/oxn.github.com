# cytools-html
下载即用，所有工具布置在本地，不外挂js、css，不上传到任何云端，没有任何恶意代码、广告代码、统计代码！
# cytools-html 静态工具站 使用 & 二次开发说明文档
## 一、站点整体概述
**cytools-html** 是一套纯静态无后端 HTML 工具集合页面，无需服务器，直接双击 HTML 文件即可本地打开运行；所有数据、用户偏好（明暗主题、收藏工具）均存储在浏览器 `localStorage`，清除浏览器缓存会重置自定义设置。
站点内置自动化渲染、自适应布局、主题记忆、收藏计数、分类自动折叠、实时搜索过滤、时间排序等逻辑，仅需修改固定区块即可新增导航按钮、新增工具卡片，无需改动自动化底层逻辑。
## 二、顶部导航按钮 新增 / 修改操作指南
### 1. 存放位置
HTML 中 `<header>` 内部` class="nav-link-group"` 容器，所有导航功能按钮全部写在此容器内：

```html
<div class="nav-link-group">
   <!-- 原有导航按钮示例 -->
   <a href="#" target="_blank" class="header-btn">
   <span>💬</span> 问题反馈
   </a>
</div>
```


### 2. 新增导航按钮标准模板（直接复制粘贴）
```html
<a href="跳转链接地址" target="_blank" class="header-btn">
  <span>图标符号</span> 按钮文字
</a>
```
- `href`：填写跳转地址，站内跳转填 #，外部网站填写完整 URL；
- `target="_blank"`：保留代表新标签页打开，删除则当前页面跳转；
`class="header-btn"` 不可删除：控制按钮样式、hover 变色、圆角，删除会样式错乱；
`<span>图标</span>`：放置 `emoji 图标`，可自行更换。
### 3. 修改现有导航按钮操作
- 修改跳转地址：修改 `a` 标签内 `href` 属性；
- 修改按钮文字：修改标签内文本；
- 修改图标：修改 `<span>` 内 emoji 符号；
- 删除按钮：直接删除整段 `<a>...</a>` 代码即可。
### 4. 注意事项
导航栏支持自动换行，按钮过多会自动向下换行，无需手动调整布局；
最右侧固定存在「明暗主题切换按钮」，不要放入 `nav-link-group` 容器，页面预留了独立定位空间；
不要修改 `.header-inner、.theme-switch-wrap` 结构，会导致主题按钮遮挡导航文字。
## 三、工具大卡片 新增 / 修改操作指南
### 1. 数据源存放位置
所有卡片不手写 HTML，由 JS 自动化循环渲染；数据源固定在脚本 `toolList` 数组，仅修改此处即可新增 / 删除 / 编辑卡片，无需改动页面卡片渲染代码。
```javascript
const toolList = [
  // 单条工具标准对象模板
  {
    id: "唯一英文id，不可重复",
    icon: "卡片左上角图标emoji",
    title: "工具大标题",
    desc: "工具简介描述（两行自动截断）",
    cat: "分类英文标识（如DEV、TIME、TEXT）",
    catName: "分类中文名称",
    catIcon: "分类标签图标emoji",
    date: "创建日期 格式YYYY-MM-DD，用于时间排序",
    featured: true/false, // true=卡片显示「精选」角标
    top: true/false,      // true=卡片显示「置顶」角标，featured优先于top
    url: "工具跳转地址",
    tags: ["标签1","标签2","标签3"] // 底部多标签数组
  }
]
```

### 2. 新增工具卡片完整步骤
在 `toolList` 数组末尾，复制一份完整对象模板；
修改全部字段，保证 `id` 全站唯一，日期格式统一；
分类 `cat` 自定义规则：
全新分类：自定义英文标识，填写对应 `catName` 、`catIcon` ，页面自动化识别生成新分类标签；
已有分类：复用现有 `cat` 值，工具会自动归入已有分类；
角标控制：`featured:true` 显示精选橙标，`top:true` 显示蓝标，二者只开一个；
保存文件刷新页面，自动化脚本自动生成卡片、自动新增对应分类标签。
### 3. 修改 / 删除现有卡片
修改卡片内容：直接编辑对应工具对象内字段；
永久删除卡片：删除整条工具对象；
临时隐藏卡片：无需删除，可新增开关字段过滤（底层过滤逻辑无需改动）。
### 4. 卡片样式固定规则（无需调整 CSS）
角标：自动定位图标右上角，向外偏移 8px，透明度 70%，无需手动调整；
描述文字固定 13px，两行自动省略；
鼠标悬浮卡片自动上浮、显示右下角箭头、显示收藏星星按钮；
自适应网格：大屏 3 列、平板 2 列、手机 1 列，自动化适配屏幕宽度。
## 四、全站自动化功能完整说明
### （一）主题明暗模式自动化
首次打开网站（无本地记录）：自动读取电脑 / 手机系统明暗时间，同步页面亮色 / 暗色；
手动点击右上角主题按钮切换：自动将用户选择存入浏览器 localStorage；
刷新页面、关闭重开页面：优先读取本地存储的手动主题，不再跟随系统；
系统明暗自动监听：仅用户从未手动切换过时，系统切换深色 / 浅色，页面同步变化；手动切换后，系统不再干预页面主题。
### （二）分类标签自动化系统
自动提取分类：遍历 `toolList` 工具数组，自动收集所有不重复分类，无需手动写分类标签；
单行宽度自适应计算：页面加载、窗口缩放时，自动计算一行能放下多少分类；
溢出自动折叠：单行放不下的分类自动收纳至「更多」折叠面板；
更多 / 收起切换：点击按钮展开 / 折叠隐藏分类，按钮文字自动切换「更多 / 收起」；
分类数量实时计数：每个分类标签右侧自动显示该分类下工具总数；
收藏计数联动：收藏 / 取消收藏时，「收藏」分类右侧数字实时刷新，无需刷新页面。
### （三）收藏功能自动化
收藏持久化：点击卡片星星，工具 `ID` 存入 `localStorage`，刷新、关闭页面收藏不丢失；
实时联动更新：收藏状态变更后，自动刷新分类计数、自动重渲染卡片星星图标；
分类过滤：点击`「收藏」`分类，页面自动只展示已收藏工具。
### （四）搜索过滤自动化
实时输入过滤：搜索框输入文字，页面实时匹配、过滤工具卡片；
多字段模糊匹配：同时匹配工具标题、描述、分类名称、底部标签；
无匹配自动提示：无符合条件工具时，自动展示空白提示文案；
快捷键支持：`Ctrl+K` / `Cmd+K` 一键聚焦搜索框，回车刷新过滤结果。
### （五）排序自动化
时间升降序切换：点击顶部`「时间排序」`按钮，切换新旧排序；
自动重渲染：切换排序后，卡片按日期重新排列，无需刷新页面；
日期标准：以工具对象 `date` 字段为准，支持年月日标准格式解析。
### （六）页面布局自适应自动化
头部高度自动适配：导航按钮换行、窗口缩放时，自动计算顶部固定导航高度，同步占位块高度，避免内容被导航遮挡；
网格卡片自适应：根据屏幕宽度自动切换 `3/2/1` 列布局；
移动端适配：手机屏幕下搜索栏、排序按钮自动换行，卡片单列展示；
窗口 resize 全局重算：缩放浏览器窗口时，自动重新计算分类溢出、头部高度、布局，实时适配。
### （七）卡片自动化渲染
循环批量生成：读取 `toolList` 数组，自动循环生成全部卡片 HTML；
角标自动判断：根据 `featured / top` 字段自动生成`「精选 / 置顶」`半透明角标；
标签自动生成：读取工具 `tags` 数组，自动生成底部多标签；
收藏状态自动渲染：根据本地存储收藏列表，自动填充实心 / 空心星星。

## 五、通用修改注意事项
所有自动化逻辑全部封装在 `JS` 脚本中，仅允许修改指定数据源（导航` HTML`、`toolList` 数组），禁止删除 / 注释自动化函数，会导致分类、收藏、渲染功能失效；
样式统一使用 `CSS` 变量，不要单独给单个按钮、卡片新增固定宽高，破坏自适应自动化；
本地存储依赖浏览器，无痕模式下存储临时生效，关闭无痕窗口会清空；
纯静态页面，无数据库、无后端，所有新增 / 修改仅需修改单 `HTML` 文件，保存后直接打开生效。
## 六、颜色主题
### 1、原版-头顶绿
```html
:root {
      --primary: #10b981;                 /* 主色-青绿色 */
      --primary-light: #dcfce7;           /* 主色浅背景 */
      --header-bg: #f0fdf4;               /* 头部亮色背景 */
      --warn: #f97316;                    /* 警告橙色 */
      --nav-btn-bg: #ffffff;              /* 导航按钮亮色底色 */
      --nav-btn-border: #e5e7eb;          /* 导航按钮边框 */
      --nav-btn-text: #222222;            /* 导航文字亮色 */
      --text-main: #222222;               /* 正文主要文字 */
      --text-secondary: #555555;          /* 次要说明文字 */
      --text-weak: #888888;               /* 弱化提示文字 */
      --border-base: #e5e7eb;             /* 通用边框亮色 */
      --border-light: #f3f4f6;            /* 浅分割底色 */
      --bg-page: #ffffff;                 /* 页面亮色背景 */
      --bg-card: #ffffff;                 /* 卡片亮色背景 */
      --bg-btn: #ffffff;                  /* 按钮亮色背景 */
      --bg-footer: #f0fdf4;               /* 页脚亮色背景 */
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);    /* 轻微阴影 */
      --shadow-lg: 0 6px 16px rgba(0,0,0.1);      /* 卡片悬浮大阴影 */
      --radius-xs: 4px;    /* 极小圆角 */
      --radius-sm: 6px;    /* 小圆角 */
      --radius-md: 8px;    /* 中等圆角 */
      --radius-lg: 12px;   /* 大圆角 */
      --radius-full: 999px;/* 全圆角胶囊按钮 */
      --space-xs: 6px;
      --space-sm: 10px;
      --space-md: 14px;
      --space-lg: 16px;
      --space-xl: 28px;
      --transition: all 0.22s ease; /* 全局统一过渡动画时长 */
      --key-bg: #e5e7eb;    /* 快捷键提示底色 */
      --key-text: #222;
      --key-radius: 6px;
      --key-shadow: 0 1px 2px rgba(0,0,0.15);
      --body-font-size: 16px;
      --body-line-height: 1.6;
      --title-line-height: 1.2;
      --sub-title-line-height: 1.25;
      --content-max-width: 1200px; /* 页面最大宽度限制 */
      --card-gap: 16px;            /* 卡片网格间距 */
      --card-min-width: 300px;     /* 卡片最小宽度，自适应网格 */
      --header-safe-gap: 16px;
      --card-label-offset: 36px;
      --nav-line-height: 38px;     /* 导航按钮高度 */
      --theme-btn-width: 36px;     /* 主题切换按钮宽度 */
    }
```
### 2、 闷骚粉
```html
:root {
  --primary: #ec4899;
  --primary-light: #fdf2f8;
  --header-bg: #fdf2f8;
  --warn: #f97316;
  --nav-btn-bg: #ffffff;
  --nav-btn-border: #fce7f3;
  --nav-btn-text: #222222;
  --text-main: #222222;
  --text-secondary: #555555;
  --text-weak: #888888;
  --border-base: #fce7f3;
  --border-light: #fdf2f8;
  --bg-page: #fff9fb;
  --bg-card: #ffffff;
  --bg-btn: #ffffff;
  --bg-footer: #fdf2f8;
  --shadow-sm: 0 1px 3px rgba(236,72,153,0.08);
  --shadow-lg: 0 6px 16px rgba(236,72,153,0.12);
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 999px;
  --space-xs: 6px;
  --space-sm: 10px;
  --space-md: 14px;
  --space-lg: 16px;
  --space-xl: 28px;
  --transition: all 0.22s ease;
  --key-bg: #fce7f3;
  --key-text: #222;
  --key-radius: 6px;
  --key-shadow: 0 1px 2px rgba(0,0,0.15);
  --body-font-size: 16px;
  --body-line-height: 1.6;
  --title-line-height: 1.2;
  --sub-title-line-height: 1.25;
  --content-max-width: 1200px;
  --card-gap: 16px;
  --card-min-width: 300px;
  --header-safe-gap: 16px;
  --card-label-offset: 36px;
  --nav-line-height: 38px;
  --theme-btn-width: 36px;
}
```
### 3、朴实灰
```html
:root {
  --primary: #52525b;
  --primary-light: #f4f4f5;
  --header-bg: #f4f4f5;
  --warn: #f97316;
  --nav-btn-bg: #ffffff;
  --nav-btn-border: #e4e4e7;
  --nav-btn-text: #222222;
  --text-main: #222222;
  --text-secondary: #555555;
  --text-weak: #71717a;
  --border-base: #e4e4e7;
  --border-light: #f4f4f5;
  --bg-page: #fafafa;
  --bg-card: #ffffff;
  --bg-btn: #ffffff;
  --bg-footer: #f4f4f5;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-lg: 0 6px 16px rgba(0,0,0,0.09);
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 999px;
  --space-xs: 6px;
  --space-sm: 10px;
  --space-md: 14px;
  --space-lg: 16px;
  --space-xl: 28px;
  --transition: all 0.22s ease;
  --key-bg: #e4e4e7;
  --key-text: #222;
  --key-radius: 6px;
  --key-shadow: 0 1px 2px rgba(0,0,0.15);
  --body-font-size: 16px;
  --body-line-height: 1.6;
  --title-line-height: 1.2;
  --sub-title-line-height: 1.25;
  --content-max-width: 1200px;
  --card-gap: 16px;
  --card-min-width: 300px;
  --header-safe-gap: 16px;
  --card-label-offset: 36px;
  --nav-line-height: 38px;
  --theme-btn-width: 36px;
}
```
### 4、眼瓦蓝
```html
:root {
  --primary: #3b82f6;
  --primary-light: #eff6ff;
  --header-bg: #eff6ff;
  --warn: #f97316;
  --nav-btn-bg: #ffffff;
  --nav-btn-border: #dbeafe;
  --nav-btn-text: #222222;
  --text-main: #222222;
  --text-secondary: #555555;
  --text-weak: #888888;
  --border-base: #dbeafe;
  --border-light: #eff6ff;
  --bg-page: #f8faff;
  --bg-card: #ffffff;
  --bg-btn: #ffffff;
  --bg-footer: #eff6ff;
  --shadow-sm: 0 1px 3px rgba(59,130,246,0.08);
  --shadow-lg: 0 6px 16px rgba(59,130,246,0.12);
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 999px;
  --space-xs: 6px;
  --space-sm: 10px;
  --space-md: 14px;
  --space-lg: 16px;
  --space-xl: 28px;
  --transition: all 0.22s ease;
  --key-bg: #dbeafe;
  --key-text: #222;
  --key-radius: 6px;
  --key-shadow: 0 1px 2px rgba(0,0,0.15);
  --body-font-size: 16px;
  --body-line-height: 1.6;
  --title-line-height: 1.2;
  --sub-title-line-height: 1.25;
  --content-max-width: 1200px;
  --card-gap: 16px;
  --card-min-width: 300px;
  --header-safe-gap: 16px;
  --card-label-offset: 36px;
  --nav-line-height: 38px;
  --theme-btn-width: 36px;
}```
### 5、淡橙色暖杏主题
```html
:root {
  --primary: #f97316;
  --primary-light: #fff7ed;
  --header-bg: #fff7ed;
  --warn: #ea580c;
  --nav-btn-bg: #ffffff;
  --nav-btn-border: #ffedd5;
  --nav-btn-text: #222222;
  --text-main: #222222;
  --text-secondary: #555555;
  --text-weak: #888888;
  --border-base: #ffedd5;
  --border-light: #fff7ed;
  --bg-page: #fffaf5;
  --bg-card: #ffffff;
  --bg-btn: #ffffff;
  --bg-footer: #fff7ed;
  --shadow-sm: 0 1px 3px rgba(249,115,22,0.08);
  --shadow-lg: 0 6px 16px rgba(249,115,22,0.12);
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 999px;
  --space-xs: 6px;
  --space-sm: 10px;
  --space-md: 14px;
  --space-lg: 16px;
  --space-xl: 28px;
  --transition: all 0.22s ease;
  --key-bg: #ffedd5;
  --key-text: #222;
  --key-radius: 6px;
  --key-shadow: 0 1px 2px rgba(0,0,0.15);
  --body-font-size: 16px;
  --body-line-height: 1.6;
  --title-line-height: 1.2;
  --sub-title-line-height: 1.25;
  --content-max-width: 1200px;
  --card-gap: 16px;
  --card-min-width: 300px;
  --header-safe-gap: 16px;
  --card-label-offset: 36px;
  --nav-line-height: 38px;
  --theme-btn-width: 36px;
}
```
