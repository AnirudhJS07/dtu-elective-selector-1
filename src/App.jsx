import React, { useState } from 'react'
import { subjectsByDept, subjects, subjectsBySlot } from './data'

import './app.css'
import Subject from './Subject'
import Modal from './Modal'

const App = () => {
  const [branch, setBranch] = useState('CO')
  const [showModal, setShowModal] = useState(false)
  const [currentSlot, setCurrentSlot] = useState('')
  const [selectedElectives, setSelectedElectives] = useState([])
  const [numDeptElective, setNumDeptElective] = useState(0)
  const [numGenElective, setNumGenElective] = useState(0)

  return (
    <div className='app'>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        allowClose={true}
      >
        <ul className='select-modal'>
          {subjectsBySlot[currentSlot]?.map((subject) => {
            return (
              <li
                key={subject.code}
                onClick={(e) => {
                  const idx = selectedElectives.findIndex(
                    (e) => e.slot === currentSlot
                  )
                  if (idx === -1) {
                    setSelectedElectives([...selectedElectives, subject])
                    if (subject.code.startsWith(branch)) {
                      setNumDeptElective(numDeptElective + 1)
                    } else {
                      setNumGenElective(numGenElective + 1)
                    }
                  } else {
                    if (subject.code.startsWith(branch)) {
                      if (!selectedElectives[idx].code.startsWith(branch)) {
                        setNumDeptElective(numDeptElective + 1)
                        setNumGenElective(numGenElective - 1)
                      }
                    } else {
                      if (selectedElectives[idx].code.startsWith(branch)) {
                        setNumDeptElective(numDeptElective - 1)
                        setNumGenElective(numGenElective + 1)
                      }
                    }
                    setSelectedElectives([
                      ...selectedElectives.filter(
                        (e) => e.slot !== currentSlot
                      ),
                      subject,
                    ])
                  }
                  setShowModal(false)
                }}
              >
                {subject.code}: {subject.name}
              </li>
            )
          })}
        </ul>
      </Modal>
      <select
        name='branch-select'
        id='branch-select'
        className='branch-select'
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      >
        <option value='CO'>CO</option>
        <option value='IT'>IT</option>
        <option value='SE'>SE</option>
        <option value='MC'>MC</option>
        <option value='EE'>EE</option>
        <option value='EC'>EC</option>
        <option value='ME'>ME</option>
        <option value='CH'>CH</option>
        <option value='CE'>CE</option>
        <option value='PE'>PE</option>
        <option value='EN'>EN</option>
        <option value='EP'>EP</option>
        <option value='BT'>BT</option>
        <option value='HU'>HU</option>
      </select>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>8-9</th>
            <th>9-10</th>
            <th>10-11</th>
            <th>11-12</th>
            <th>12-1</th>
            <th>1-2</th>
            <th>2-3</th>
            <th>3-4</th>
            <th>4-5</th>
            <th>5-6</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Monday</th>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E5'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E5')}
              branch={branch}
            />
            <td>E5</td>
            <td>E1</td>
            <td>E1</td>
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <td>E3</td>
            <td>E3</td>
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
          </tr>
          <tr>
            <th>Tuesday</th>
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <td>E2</td>
            <td>E2</td>
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <td>E4</td>
            <td>E4</td>
            <td>E6</td>
            <td>E6</td>
          </tr>
          <tr>
            <th>Wednesday</th>
            <td>E5</td>
            <td className='core'>CORE</td>
            <td>E1</td>
            <td>E2</td>
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <td>E3</td>
            <td>E4</td>
            <td className='core'>CORE</td>
            <td>E6</td>
          </tr>
          <tr>
            <th>Thursday</th>
            <td>E5</td>
            <td>E5</td>
            <td>E1</td>
            <td>E1</td>
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <td>E4</td>
            <td>E4</td>
            <td>E6</td>
            <td>E6</td>
          </tr>
          <tr>
            <th>Friday</th>
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <td>E2</td>
            <td>E3</td>
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <td>E4</td>
            <td>E4</td>
            <td>E6</td>
            <td>E6</td>
          </tr>
        </tbody>
      </table>
      <div className='selected-subjects'>
        <div className='selected-subjects-data'>
          <div className='selected-subjects-data-department'>
            Department Electives:{numDeptElective}
          </div>
          <div className='selected-subjects-data-general'>
            General Electives:{numGenElective}
          </div>
        </div>
        <ul className='selected-subjects-list'>
          {selectedElectives.map((s) => {
            return (
              <li>
                {s.code}: {s.name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
