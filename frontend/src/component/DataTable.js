import DataTableRow from "./DataTableRow"
import { useEffect, useState } from "react"

const LEADERSBOARD_URL = process.env.REACT_APP_LEADERSBOARD_URL

function DataTable(props) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('process.env: ', process.env)
    console.log('LEADERSBOARD_URL: ', LEADERSBOARD_URL)
    let link = `${LEADERSBOARD_URL}/leadersboard/`
    if (props.boardType === 'daily') {
      const appDate = getDate(props.appDate)
      link += `daily/${appDate}`
    }

    if (props.boardType === 'weekly') {
      const previousStartOfWeek = getDate(getPreviousStartOfWeek(getDate2(props.appDate)))
      const nextEndOfWeek = getDate(getNextEndOfWeek(getDate2(props.appDate)))
      link += `weekly/${previousStartOfWeek}-${nextEndOfWeek}`
    }

    fetch(link)
    .then(res => res.json())
    .then(data => {
      setUsers(data)
    }).catch(e => console.log)
  }, [props.appDate, props.boardType])

  return (
    <div>
      <h1>Kemal Data Table</h1>
      <div className="data-table-header">
        <div className="data-table-header-container">
          <div className="data-table-column">Rank</div>
          <div className="data-table-column">Country</div>
          <div className="data-table-column">UserName</div>
          <div className="data-table-column">Money</div>
          <div className="data-table-column">Daily Diff</div>
        </div>
      </div>
      {users.map(row => (
        <DataTableRow key={row.username} row={row} />
      ))}
    </div>
  )
}

function getNextEndOfWeek(date) {
  // https://stackoverflow.com/a/33078673/3122912
  const targetDay = 7
  const tempDate = new Date(date)
  tempDate.setDate(tempDate.getDate() + (((targetDay + 7 - tempDate.getDay()) % 7) || 7))
  return tempDate
}

function getPreviousStartOfWeek(date) {
  // https://stackoverflow.com/a/33078673/3122912
  const targetDay = 1
  const tempDate = new Date(date)
  tempDate.setDate(tempDate.getDate() - ((tempDate.getDay() + 6) % 7))
  return tempDate
}

function getDate(date) {
  const offset = date.getTimezoneOffset()
  const temp = new Date(date.getTime() - (offset*60*1000))
  return temp.toISOString().split('T')[0].replaceAll('-', '')
}

function getDate2(date) {
  const offset = date.getTimezoneOffset()
  const temp = new Date(date.getTime() - (offset*60*1000))
  return temp.toISOString().split('T')[0]
}

export default DataTable