import React from 'react'
import Row from '../row/index'
import NewRow from '../row/new'
import '../income/income.css'

export default function Table(props) {
  console.log(props)
    return(
      <div id={`${props.tableId}Table`}>
        <button id={`add_${props.tableId}_button`} className="addRowButton" onClick={() => props.addNewRow()}>
          ADD {props.tableId.toUpperCase()}
        </button>
        <table>
          <tbody>
            <tr>
             {props.headers.map((header, i) => {
               return(
                <th key={i + header}>{header}</th>
               )
             })} 
            </tr>
            {props.tableRows.map((row, i) =>(
              <Row 
                key={i + row.name}
                row={row}
                action={props.createdOrEditedRow}
                deleteRow={props.deleteRow}
                table={props.tableId}
                columns={props.columns}
              />
            ))}
            { props.newRow ?
              <NewRow
                action={props.createdOrEditedRow}
                headers={props.headers}
                columns={props.columns}
                table={props.tableId}
              />
              : null}
            <tr>
              <td>
                <strong>Totals: </strong>
              </td>
              {Object.keys(props.totals).map((tot, i) => {
                {if(i == 2){
                  return(
                    <td className='totalDiv' key={tot + i }>
                      <div><strong>Remaining: </strong></div> 
                      <div>{props.totals[tot]}</div>
                    </td>
                  )
                } else {
                  return(
                    <td key={tot + i}>
                      {props.totals[tot]}
                    </td>
                  )
                }}
              })}
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}