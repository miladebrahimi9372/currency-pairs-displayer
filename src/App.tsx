import { ReactNode, useState } from 'react'
import { Table } from './components'
import Modal from './components/modal/Modal'
import { RowDataType } from './components/table/Table'
import useGetCurrencyPairsList from './hooks/api/useGetCurrencyPairsList'
import { camelToTitleCase } from './utilities'

const columns = [
 {
  key: 'symbol',
  label: 'Symbol'
 },
 {
  key: 'buy',
  label: 'Buy'
 },
 {
  key: 'sell',
  label: 'Sell'
 },
 {
  key: 'changeRate',
  label: 'Change Rate'
 },
 {
  key: 'low',
  label: 'Low'
 },
 {
  key: 'high',
  label: 'High'
 }
]

const symbols = [
 'BTC-USDT',
 'ETH-USDT',
 'XRP-USDT',
 'ADA-USDT',
 'BNB-USDT',
 'TRX-USDT',
 'LTC-USDT',
 'DOT-USDT',
 'AVAX-USDT',
 'TON-USDT'
]

function App() {
 const [isModalOpen, setIsModalOpen] = useState(false)
 const [selectedRow, setSelectedRow] = useState({})
 const { data, isLoading, error } = useGetCurrencyPairsList(symbols)

 return (
  <div className="w-screen h-screen flex justify-center items-center bg-gray-300 relative">
   {error ? (
    <p className="text-red-500">Something went wrong, please try again</p>
   ) : isLoading ? (
    <p className="test-gray-800">Loading data, please wait</p>
   ) : (
    <Table
     data={data as RowDataType[]}
     columns={columns}
     keyProperty="symbol"
     dataProperty="data"
     onClickCell={({ cellKey, rowValue }) => {
      console.log('##################', { cellKey, rowValue })
      if (cellKey === 'symbol') {
       setSelectedRow(rowValue || {})
       setIsModalOpen(true)
      }
     }}
    />
   )}
   <Modal
    onClose={() => {
     setIsModalOpen(false)
    }}
    open={isModalOpen}
   >
    <div className="bg-gray-200 p-4 rounded-md w-96">
     <ul>
      {Object.entries(selectedRow).map(([key, value], index, array) => (
       <li
        key={key}
        className={`p-1 border-b  flex justify-between ${
         index === array.length - 1 ? '' : 'border-gray-900'
        }`}
       >
        <span>{camelToTitleCase(key)}</span>
        <span>{value as ReactNode}</span>
       </li>
      ))}
     </ul>
    </div>
   </Modal>
  </div>
 )
}

export default App
