import axios from 'axios'
import _ from 'lodash'
import dayjs from 'dayjs'
import QuickChart from 'quickchart-js'
import { CHART_COLORS, transparentize } from './utils'

import path from 'path'
import TableRenderer, { saveImage } from 'table-renderer'

const renderTable = TableRenderer().render

const myChart = new QuickChart()

//utils

const SCW = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get('http://192.168.192.7:5000/ProductionSCW')
        .then((x) => {
          console.log('fetch ProductionSCW')
          resolve(x.data)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    } catch (err) {
      {
        console.log(err)
        reject(err)
      }
    }
  })
}

const sendMsgUser = async (params) => {
  await axios
    .post('http://192.168.192.7:5010/send-message', {
      number: params.number,
      message: params.msg,
    })
    .then((res) => console.log(res.status))
    .catch((e) => console.log(e.message))
}

const getCountDeptChart = (params) => {
  const data = {
    labels: [],
    datasets: [
      {
        label: 'Open',
        data: [],
        borderColor: CHART_COLORS.red,
        backgroundColor: transparentize(CHART_COLORS.red, 0.5),
        borderWidth: 2,
      },
      {
        label: 'On Progress',
        data: [],
        borderColor: CHART_COLORS.yellow,
        backgroundColor: transparentize(CHART_COLORS.yellow, 0.5),
        borderWidth: 2,
      },
      {
        label: 'Close',
        data: [],
        borderColor: CHART_COLORS.green,
        backgroundColor: transparentize(CHART_COLORS.green, 0.5),
        borderWidth: 2,
      },
    ],
  }
  const x = _(params)
    .groupBy((val) => val.req_to)
    .mapValues((val) => {
      return {
        Open: _.countBy(val, (r) => r.status == 'Open'),
        Close: _.countBy(val, (r) => r.status == 'Close'),
        OnProgress: _.countBy(val, (r) => r.status == 'On Progress'),
      }
    })
    .map((val, key) => {
      data.labels.push(key)
      data.datasets[0].data.push(val.Open.true || 0)
      data.datasets[1].data.push(val.OnProgress.true || 0)
      data.datasets[2].data.push(val.Close.true || 0)

      return val
    })
    .value()

  return data
}

export const getDeptChartText = (params) => {
  const x = _(params)
    .groupBy((val) => val.req_to)
    .mapValues((val) => {
      return {
        Open: _.countBy(val, (r) => r.status == 'Open'),
        Close: _.countBy(val, (r) => r.status == 'Close'),
        OnProgress: _.countBy(val, (r) => r.status == 'On Progress'),
      }
    })
    .map((val, key) => {
      return {
        name: key,
        data: [
          { name: 'Open', value: val.Open.true || 0 },
          { name: 'Close', value: val.Close.true || 0 },
          { name: 'OnProgress', value: val.OnProgress.true || 0 },
        ],
      }
    })
    .value()

  return x
}

// Production SCW API

const statusScw = (pros) => {
  switch (pros) {
    case 'Open':
      return '❌Open'

    case 'OnProgress':
      return '⌛️On Progress'

    case 'Close':
      return '✅Close'

    default:
      return '-'
  }
}

export default {
  async RemainderScw() {
    SCW().then((x) => {
      const chartData = getCountDeptChart(x)
      myChart.setConfig({
        type: 'bar',
        data: chartData,
        options: {
          plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
              color: CHART_COLORS.blue,
              display: function (context) {
                return context.dataset.data[context.dataIndex] > 0
              },
              font: {
                weight: 'bold',
              },
            },
          },
        },
      })
      myChart.getShortUrl().then((y) => {
        let msg = 'REMAINDER SCW'
        msg += `\nDate: ${dayjs().format('DD/MM/YYYY')}`

        const data = getDeptChartText(x)
        _.forEach(data, (val) => {
          msg += `\n\nDepartement:  ${val.name}`
          msg += `\n \`Status:\``
          _.forEach(val.data, (item) => {
            msg += `\n- ${statusScw(item.name)}: ${item.value}`
          })
        })

        msg += `\n\n> Chart: ${y} `

        sendMsgUser({ number: '082124610363', msg: msg })
      })
    })
  },

  async RenderTable() {
    const canvas = renderTable({
      title: 'Marketing Summary',
      columns: [
        { width: 200, title: 'Campaign', dataIndex: 'campaign' },
        {
          width: 100,
          title: 'Install',
          dataIndex: 'install',
          align: 'right',
        },
        { width: 100, title: 'Cost', dataIndex: 'cost', align: 'right' },
      ],
      dataSource: [
        '-',
        { campaign: 'Google CPC', install: '12', cost: '$ 400' },
        { campaign: 'Facebook CPC', install: '3', cost: '$ 60' },
        { campaign: 'Youtube Video', install: '131', cost: '$ 1,230' },
        '-',
        { campaign: 'Total', install: '146', cost: '$ 1,690' },
      ],
    })

    const dataURL = canvas.toDataURL()
    console.log(dataURL)

    // saveImage(canvas, path.join(__dirname, 'table.png'))
  },
}
