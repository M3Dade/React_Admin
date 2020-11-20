import React, { Component } from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {


    state = {
        sales:[5,20, 36, 10, 10, 20],
        stores:[6, 10, 25, 20, 15, 10],
    }

    update = () => {
        this.setState(state => ({
            sales:state.sales.map(sale=>sale+1),
            stores:state.stores.reduce((pre, store) => {
                pre.push(store-1)
                return pre
            },[]),
        }))
    }

    /**
     * 返回图标配置对象
     */
    getOption = () => {
        return {
            title: {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    render() {
        const {sales,stores} = this.state;
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>更新</Button>
                </Card>

                <Card title = '饼图1'>
                    <ReactEcharts option={this.getOption()} />
                </Card>
            </div>
        )
    }
}
