import {
  OpenDialogToggle,
  jump2other
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
        prop: 'title',
      },
      {
        label: '预约剩余时间',
        type: 'default',
        prop: 'left',
      },
      {
        label: '教师',
        type: 'default',
        prop: 'teacher',
      },
      {
        label: '人数',
        type: 'default',
        prop: 'all',
      },
      {
        label:'实验室',
        type:'default',
        prop:'location_str'
      },
      {
        label:'实验日期',
        type:'default',
        prop:'exp_date'
      },
      {
        label: '实验时间',
        type: 'default',
        prop: 'exp_dotime',
      },
      {
        label:'操作',
        type:'button',
        list:[
          {
            text:'预约',
            click:jump2other
          }
        ]
      }
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
        label: '实验日期',
        type: 'default',
        prop: 'exp_date',
      },
      {
        label:'实验时间',
        type:'default',
        prop:'exp_dotime'
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
        label:'预约日期',
        type:'default',
        prop:'exp_date',
      },
      {
        label: '预约时间',
        type: 'default',
        prop: 'exp_dotime',
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
        label: '实验名称',
        type: 'default',
        prop: 'title',
      },
      {
        label: '剩余预约时间',
        type: 'default',
        prop: 'left',
      },
      {
        label:'预约日期',
        type:'default',
        prop:'exp_date'
      },
      {
        label:'预约时间',
        type:'default',
        prop:'exp_dotime',
      },
      {
        label: '操作',
        type: 'button',
        list: [{
          text: '预约',
          type: 'text',
          click:jump2other
        }]
      }
    ]
  },
]