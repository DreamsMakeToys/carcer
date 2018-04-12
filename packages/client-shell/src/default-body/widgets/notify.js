import React from 'react'
import { Snackbar } from 'rmwc'

const Notify = ({ alerts, dismiss }) => {
  const alertItems = alerts.map((alert, index) => {
    const dismissAlert = dismiss.bind(null, alert)
    return <Notice key={index} alert={alert} onHide={dismissAlert} />
  })
  return <div>{alertItems}</div>
}

const Notice = ({ alert, onHide }) => (
  <Snackbar show={alert} onHide={onHide} message={alert.note} alignStart />
)

export default Notify
