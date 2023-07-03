const axios = require('axios')

const sendMsg = async (params) => {
  await axios
    .post('http://localhost:5010/send-message', {
      number: params.number,
      message: params.message,
    })
    .then((res) => console.log(res.status))
    .catch((e) => console.log(e.message))
}

const sendMsg2 = async (params) => {
  await axios({
    method: 'post',
    url: 'http://localhost:5010/send-message',
    data: {
      number: params.number,
      message: params.msg,
    },
  })
}

const sendMsgGroup = async (params) => {
  await axios
    .post('http://localhost:5010/send-message-group', {
      name: params.name,
      message: params.message,
    })
    .then((res) => console.log(res.status))
    .catch((e) => console.log(e.message))
}

const sendMsgGroup2 = async (params) => {
  await axios({
    method: 'post',
    url: 'http://localhost:5010/send-message-group',
    data: {
      name: params.name,
      message: params.msg,
    },
  })
}

const obj = { number: '082124610363', message: 'tes msg with axios' }
const groupObj = { name: 'GALINDO TEST', message: 'test msg group with axios' }

// sendMsg(obj)
// sendMsg2(obj)

sendMsgGroup(groupObj)
