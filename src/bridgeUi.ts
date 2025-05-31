import { isVue2 } from "vue-demi";
import elementUi from 'element-ui'
import { ElButton } from 'element-plus'

const { Button: UiButton } = elementUi || {};

export const Button = isVue2 ? UiButton : ElButton
