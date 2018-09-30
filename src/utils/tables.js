import {
  OpenDialogToggle
} from '@/vuex/table/click'

export const list = [{
    name: '基本信息',
    reg: ['基本信息', '/center/baseInfo'],
    list: [{
        label: '实验名称',
        type: 'default',
        prop: 'title',

      },
      {
        label: '教师',
        type: 'default',
        prop: 'teacher',

      },
      {
        label: '实验时间',
        type: 'default',
        prop: 'exp_date',

      },
      {
        label: '实验学分',
        type: 'default',
        prop: 'credit',
      }
    ]
  },
  {
    name: '预约实验',
    reg: ['预约实验', '/center/test'],
    list: [{
        label: '实验名称',
        type: 'default',
        prop: '',
      },
      {
        label: '预约剩余时间',
        type: 'default',
        prop: '',
      },
      {
        label: '教师',
        type: 'default',
        prop: '',
      },
      {
        label: '人数',
        type: 'default',
        prop: '',
      },
      {
        label: '实验室',
        type: 'default',
        prop: '',
      },
      {
        label: '实验时间',
        type: 'default',
        prop: '',
      },
    ]
  },
  {
    name: '考试测试',
    reg: ['考试测试', '/center/exam'],
    list: [{
        label: '实验名称',
        type: 'default',
        prop: 'title',
      },
      {
        label: '考试次数',
        type: 'default',
        prop: 'num',
      },
      {
        label: '最高得分',
        type: 'default',
        prop: 'max',
      },
      {
        label: '操作',
        type: 'button',
        list: [{
          text: '开始考试',
          type: 'text',
          click: OpenDialogToggle
        }]
      }
    ]
  },
  {
    name: '查看实验预约',
    reg: ['查看实验预约', '/center/prevtest'],
    list: [{
        label: '实验名称',
        type: 'default',
        prop: 'title',
      },
      {
        label: '教师',
        type: 'default',
        prop: 'teacher',
      },
      {
        label: '实验时间',
        type: 'default',
        prop: 'time',
      },
      {
        label: '操作',
        type: 'button',
        list: [{
          text: '评教',
          type: 'text',
          click:OpenDialogToggle
        }]
      }
    ]
  },
  {
    name: '查看设备预约',
    reg: ['查看设备预约', '/center/prevdev'],
    list: [{
        label: '实验名称',
        type: 'default',
        prop: 'title',
      },
      {
        label: '试验时间',
        type: 'default',
        prop: 'time',
      },
      {
        label: '操作',
        type: 'button',
        list: [{
          text: '评教',
          type: 'text',
          click:OpenDialogToggle
        }]
      }
    ]
  },
  {
    name: '预约设备',
    reg: ['预约设备', '/center/ware'],
    list: [{
        label: '实验名称1',
        type: 'default',
        prop: '',
      },
      {
        label: '试验时间',
        type: 'default',
        prop: '',
      },
      {
        label: '操作',
        type: 'button',
        list: [{
          text: '开始考试',
          type: 'text'
        }]
      }
    ]
  },
]