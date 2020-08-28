import React, { Component } from 'react'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  HomeOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
//https://ant.design/components/icon-cn/
const menuList = [
    {
      title: '首页', // 菜单标题名称
      key: '/home', // 对应的path
      icon: <HomeOutlined />, // 图标名称
      isPublic: true, // 公开的
    },
    {
      title: '血液检测', // 菜单标题名称
      key: '/blood', // 对应的path
      icon: <FileAddOutlined />, // 图标名称
    }
  ]
  
  export default menuList


  // const menuList = [
  //   {
  //     title: '首页', // 菜单标题名称
  //     key: '/home', // 对应的path
  //     icon: <HomeOutlined />, // 图标名称
  //     isPublic: true, // 公开的
  //   },
  //   {
  //     title: '血液检测', // 菜单标题名称
  //     key: '/blood', // 对应的path
  //     icon: <FileAddOutlined />, // 图标名称
  //   },
  //   {
  //     title: '待命名',// '商品',
  //     key: '/products',
  //     icon: '',
  //     children: [ // 子菜单列表
  //       {
  //         title: '待命名',//'品类管理',
  //         key: '/category',
  //         icon: ''
  //       },
  //       {
  //         title: '待命名',//'商品管理',
  //         key: '/product',
  //         icon: ''
  //       },
  //     ]
  //   },
  
  //   {
  //     title: '用户管理',
  //     key: '/user',
  //     icon: ''
  //   },
  //   {
  //     title: '角色管理',
  //     key: '/role',
  //     icon: ''
  //   },
  
  //   {
  //     title: '图形图表',
  //     key: '/charts',
  //     icon: 'area-chart',
  //     children: [
  //       {
  //         title: '柱形图',
  //         key: '/charts/bar',
  //         icon: ''
  //       },
  //       {
  //         title: '折线图',
  //         key: '/charts/line',
  //         icon: ''
  //       },
  //       {
  //         title: '饼图',
  //         key: '/charts/pie',
  //         icon: ''
  //       },
  //     ]
  //   },
  // ]
  