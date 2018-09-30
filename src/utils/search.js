export const list = [{
    name: '预约实验',
    params: ['预约实验', '/center/test'],
    list: [{
        key: '实验体系',
        type: 'select',
        prop: 'sys',
        list: [{
          label: 'aaa',
          value: '20'
        }],
      },
      {
        key: '年级',
        type: 'select',
        prop: 'class',
        list: [],
      },
      {
        key: '专业',
        type: 'select',
        prop: 'major',
        list: []
      }
    ]
  },
  {
    name: '预约设备',
    params: ['预约设备', '/center/ware'],
    list: [{              

        key: '实验位置',
        type: 'select',
        prop: 'location',
        list: [],
      },
      {
        key: '排序',
        type: 'select',
        prop: 'order',
        list: [
          {
            label:'综合排序',
            value:0
          },
          {
            label:'最早发布',
            value:1
          },
          {
            label:'最新发布',
            value:2
          },
          {
            label:'实验时间从长到短',
            value:3
          },
          {
            label:'实验时间从短到长',
            value:4
          },
        ],
      }
    ]
  },
]