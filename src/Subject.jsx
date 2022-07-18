import React from 'react'

const Subject = ({
  setCurrentSlot,
  setShowModal,
  slot,
  selectedSubject,
  branch,
}) => {
  return (
    <td
      onClick={() => {
        setCurrentSlot(slot)
        setShowModal(true)
      }}
      className={`subject ${
        selectedSubject === undefined
          ? ''
          : selectedSubject?.code.startsWith(branch)
          ? 'dept-elective'
          : 'general-elective'
      }`}
    >
      {selectedSubject?.code || slot}
    </td>
  )
}

export default Subject
