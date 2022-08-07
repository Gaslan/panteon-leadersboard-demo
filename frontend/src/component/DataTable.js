import DataTableRow from "./DataTableRow"
import { useEffect, useState } from "react"

function DataTable(props) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let link = 'http://localhost:3004/leadersboard/'
    if (props.boardType === 'daily') {
      const appDate = props.appDate.toISOString().slice(0, 10).replaceAll('-', '')
      link += `daily/${appDate}`
    }

    if (props.boardType === 'weekly') {
      const appDate = props.appDate.toISOString().slice(0, 10)
      const previousStartOfWeek = getPreviousStartOfWeek(appDate).toISOString().slice(0, 10).replaceAll('-', '')
      const nextEndOfWeek = getNextEndOfWeek(appDate).toISOString().slice(0, 10).replaceAll('-', '')
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

export default DataTable