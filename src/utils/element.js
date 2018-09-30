import Vue from 'vue'
import '../assets/elem-base/index.css'
import VueSwiper from  'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import {
  Button,
  Input,
  Select,
  Option,
  Form,
  FormItem,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Menu,
  MenuItem,
  Submenu,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Loading , 
  Message , 
  MessageBox ,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tabs,
  TabPane,
  Rate,
  DatePicker
} from 'element-ui'
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Loading)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Rate)
Vue.use(DatePicker)
Vue.prototype.$ELEMENT = {size:'small',zIndex:90000}
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
window.$confirm = MessageBox.confirm
window.$message = Message


Vue.use(VueSwiper)