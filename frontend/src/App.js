import './App.css';
import logo from './panteon-logo.webp'
import DataTable from "./component/DataTable"
import { useState } from 'react'
import DatePicker from "react-datepicker";
import classNames from "classnames"
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [appDate, setAppDate] = useState(new Date())
  const [boardType, setBoardType] = useState('daily')

  function handleDatePickerChange(date) {
    setAppDate(date)
  }

  return (
    <div className="App">
      <div className="topbar">
        <div className="topbar-header">
          <div>
            <img src={logo} alt="" style={{width: "48px", marginRight: "16px"}}/> Panteon Leadersboard Demo Project</div>
          <div>
            <DatePicker selected={appDate} onChange={handleDatePickerChange} dateFormat="yyyyMMdd" />
          </div>
        </div>
        <div className="topbar-menu">
          <div className="d-flex align-items-center justify-content-end h-100 px-4">
            <button onClick={() => setBoardType('daily')} className={classNames({active: boardType === 'daily'})}>Daily Board</button>
            <button onClick={() => setBoardType('weekly')} className={classNames({active: boardType === 'weekly'})}>Weekly Board</button>
          </div>
        </div>
      </div>
      <div className="main">
        <DataTable appDate={appDate} boardType={boardType} />
      </div>

      
    </div>
  );
}


export default App;
