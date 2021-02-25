import Vue from 'vue'
import { Button, Card, Form, FormItem, Input, Row, Col, Checkbox, Menu, MenuItem, Submenu, Divider, Breadcrumb, BreadcrumbItem, Radio, Tabs, TabPane, Table, TableColumn, DatePicker, Select, Option, RadioGroup, Pagination, MenuItemGroup, Upload, Message, MessageBox, Header, Aside, Container, Dialog } from 'element-ui'

Vue.use(Button)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Divider)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Radio)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioGroup)
Vue.use(Pagination)
Vue.use(MenuItemGroup)
Vue.use(Upload)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Dialog)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
