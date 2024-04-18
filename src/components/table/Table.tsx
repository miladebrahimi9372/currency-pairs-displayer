import { FC, Key, ReactNode } from 'react'
export type RowDataType = { [key: string]: string | number | object }
type TableProps = {
 columns: { key: string; label: string }[]
 data: RowDataType[]
 dataProperty?: string
 keyProperty: string
 onClickCell?: (arg: {
  cellKey: string
  rowValue: RowDataType
  rowIndex: number
 }) => void
}

const Table: FC<TableProps> = ({
 columns,
 data,
 dataProperty,
 keyProperty,
 onClickCell
}) => {
 return (
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
   <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
     <tr>
      {columns.map(({ label }) => (
       <th scope="col" className="px-6 py-3" key={label}>
        {label}
       </th>
      ))}
     </tr>
    </thead>
    <tbody>
     {dataProperty
      ? data.map((rowData, index) => (
         <tr
          key={(rowData[dataProperty] as RowDataType)[keyProperty] as Key}
          className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
         >
          {columns.map(({ key }) => (
           <td
            className="px-6 py-4"
            onClick={() => {
             onClickCell?.({
              cellKey: key,
              rowValue: rowData[dataProperty] as RowDataType,
              rowIndex: index
             })
            }}
           >
            {((rowData[dataProperty] as RowDataType)[key] as ReactNode) || '-'}
           </td>
          ))}
         </tr>
        ))
      : data.map((rowData) => (
         <tr
          key={rowData[keyProperty] as Key}
          className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
         >
          {columns.map(({ key }) => (
           <td className="px-6 py-4">{(rowData[key] as ReactNode) || '-'}</td>
          ))}
         </tr>
        ))}
    </tbody>
   </table>
  </div>
 )
}

export default Table
