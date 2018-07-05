## 调试/编译/发布

1. 安装依赖

	```bash
	npm i
	```
2. 开发模式运行PC版本

	```bash
	npm run dev-pc
	```
3. 开发模式运行Mobile版本

	```bash
	npm run dev-m
	```
4. 生产环境启动SSR

	``` bash
	npm run start
	# localhost:88
	```
	因为生产环境中同时运行PC和Mobile版本，版本间的切换依赖`userAgent`由后端判断，切换之后请刷新页面
	
5. 打包文件

	PC版本产生文件夹为`dist-pc`，Mobile版本产生文件夹为`dist-m`，其中的资源文件均为`xxx.[hash]-m.xx`或者`xxx.[hash]-pc.xx`格式来区别
	
6. 端口设置

	开发模式下项目地址为为`0.0.0.0:8080`，生产环境下占用`443`和`80`端口
	
## 在分支上开发
为了避免很多不必要的代码冲突，也为避免未完成的代码被发布，项目所有特性、新需求、bug修复都在分支上开发。开发测试完毕后，发布之前才合并到master，主分支必须和线上版本一致。拿到新需求，bug或优化，请严格按以下步骤开发
#### 1.创建新分支
```bash
git checkout -b new-branch
# 注意：加-b是创建并转到新分支，如果之前已经创建过，直接
git checkout new-branch
```
#### 2.在自己的分支里进行开发
开发中，为了尽量和主分支保持一致，减少合并时的冲突，要不时的把主分支合并到自己的分支
```bash
git checkout master
git pull
git checkout my-branch
git merge master
# 解决冲突
```
#### 3.提交/推送到远程仓库
```bash
# 提交到自己的本地库
# 产生新文件的情况下：
git add . 
git commit -m 'new feature'
# 没有新文件的情况下：
git commit -am 'new feature' 

# 最后推送（如果不需要协作开发，可以不推送到远程库）
git push origin new-branch
```
#### 4.合并到主分支
```bash
# 切换到master
git checkout master
# 合并
git merge new-branch
```
#### 5.删除分支
合并到主分支之后就删除分支，以免分支过多了混乱
```bash
# 删除本地分支
git branch -D new-branch
# 删除远程分支
git push origin :new-branch
```


## 代码检查
- 为了开发统一，也为了代码简洁易懂，更为了防止低级错误，项目使用了最严格代码检查`eslint standard`，详情：https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
- 建议使用带有eslint提示的编辑器，例如webstorm，如果写了不合规范的代码，编辑器会报错，并提供修复错误代码的功能。
- 每次build前先运行风格检查`npm run lint`，没有报错则表示没问题，`npm run fix`会修复部分错误，但不能保证全部修复

## 组件库
项目已集成了[element-ui](https://github.com/ElemeFE/mint-ui)，提供了较丰富的基础组件，使用时请 **按需引入**
```javascript
import {MessageBox} from 'element-ui'
MessageBox({
  ...
});
```
更多的组件参考[element-ui文档](http://element.eleme.io/#/zh-CN/component/installation)

如果需要其他的组件，请自行安装依赖或者写在components目录下，注意，组件需要能在任意地方引用，请编写可复用组件。

## 自定义组件
所有自定义组件都在components目录下，注重性能与复用性。

## 样式/静态资源
- 所有的静态资源都放入assets文件夹
- 移动端必用`flex`布局
- 公共样式库为`common.scss`，内部样式必须为常用的样式块，采用`%占位符`构建，`extend`引入
- 图片等比缩放，文字/元素流式布局
- 移动端rem总宽度是10，全屏则10rem，如果设计稿为750宽，则宽=`width/75+'rem'`
- 项目集成了[font-awesome](http://fontawesome.io/icons/)，能用字体图标的尽量用字体图标
- `views`文件夹下的`.vue`文件使用`<style lang="scss">`，`components`文件夹下的`.vue`文件使用`<style lang="scss" scoped>`

## 状态管理
状态管理一般用来做全局的变量管理，如从订单列表页点到订单详情页，删除了此订单，再返回订单列表，此时订单列表需要变化。做法是把订单列表的数据存在store中，改变订单状态时提交一个mutation来改变这个state，一改变则引用到这个state的地方都会自动更新。

注意：
1. 不要把所有的数据都存入store，这样反而更难维护，仅仅存入多处引用的数据，比如说用户的token，购物车的数量，热搜词，用户的基本信息等。
2. 相似的store数据如果需要重复处理请用getter来取
3. state映射到Vue组件请使用mapState，相似的也用其它的map
3. 如果项目较大，请使用module，方便管理

可以安装vue-devtool来调试store，详情请参考[vuex文档](https://vuex.vuejs.org/zh-cn/)

## 路由
- 除了首页，所有组件都用异步组件，router/routes.js已定义好load方法。
- 需要登录的，给组件加`meta: {requireAuth: true}`
- 页面标题：`meta: {title: '首页'}`
- 不销毁页面：`meta: {keepAlive: true}`
- 把路由归类，方在children里

## 数据交互
为了统一管理使用axios，因为可以在前后端同时使用。要注意在SSR中created钩子分别会在服务端和浏览器端同时触发两次，所有数据的预取要写在asyncData中，有关配置参看`unitils/fetch.js`。

## 登录及用户校验
- 每个请求都会在header里带`Authorization`，Authorization的值由登录接口返回，状态管理中对应的是token，如需更改，提交mutations中的setToken方法，为了XX天免登陆功能，以及防止刷新页面丢失，token还存cookie中，可根据需要改为存sessionStorage或localStorage，注意`api/fetch.js`也需要更改。
- 登录判断只要判断store里的token有没有值就行了。`if(!this.$store.token){do someThing}`
- Authorization由程序做对称加密或者由OAuth服务提供，如果加密算法需要其他字段请直接与token拼接，比如用户id为86232，则Authorization为token_86232。
- 除了非必要登录的接口程序需获取header里的`Authorization`对用户进行校验。

## cookie
cookie使用了[js-cookie](https://github.com/js-cookie/js-cookie)库，示例（更多请查看文档）：
```javascript
cookie.set('key',value,{expires:1});//时间单位为天
cookie.get('key')
cookie.remove('key')
```
cookie仅仅用来存储临时的并需要过期的内容，其他情况尽量用sessionStorage或localStorage
