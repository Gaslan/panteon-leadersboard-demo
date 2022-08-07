import React from "react"
import ReactCountryFlag from "react-country-flag"
import { countries } from "country-data"

function DataTableRow(props) {

  return (
    <div className="data-table-row">
      <div className="data-table-row-container">
        <div className="data-table-column">#{props.row.rank}</div>
        <div className="data-table-column" title={countries[props.row.countryCode].name}>
          {/* {props.row.countryCode} */}
          <ReactCountryFlag countryCode={props.row.countryCode} svg style={{ width: '2em', height: '2em' }} />
        </div>
        <div className="data-table-column">{props.row.username}</div>
        <div className="data-table-column">{props.row.score}</div>
        <div className="data-table-column d-flex align-items-center">{dailyDiff(props.row.dailyDiff)}</div>
      </div>
    </div>
  )
}

function dailyDiff(val) {
  return (
    <>
      {dailyDiffIcon(val)}
      <span className="ms-2">({val < 0 ? -1 * val : val})</span>
    </>
    
  )
}

function dailyDiffIcon(val) {
  if (val > 0) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-up" width="24" height="24" viewBox="0 0 24 24" strokeWidth="3" stroke="#269b2b" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="18" y1="11" x2="12" y2="5"></line>
        <line x1="6" y1="11" x2="12" y2="5"></line>
      </svg>
    )
  }

  if (val < 0) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-down" width="24" height="24" viewBox="0 0 24 24" strokeWidth="3" stroke="#cf1919" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="18" y1="13" x2="12" y2="19"></line>
        <line x1="6" y1="13" x2="12" y2="19"></line>
      </svg>
    )
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="5" stroke="#5a5a5a" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}

export default DataTableRow