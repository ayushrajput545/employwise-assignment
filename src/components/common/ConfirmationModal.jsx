import React from 'react'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-slate-300 p-6 rounded shadow-md w-80">
            <h3 className="text-lg font-bold mb-4">{modalData.text1}</h3>
            <p>{modalData.text2}</p>
            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={modalData?.btn1Handler}>{modalData?.btn1text} </button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={modalData?.btn2Handler}>{modalData?.btn2text} </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal