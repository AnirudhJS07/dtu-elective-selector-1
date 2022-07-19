import React, { useEffect, useRef, useState } from 'react'
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
  const [branchSubjects, setBranchSubjects] = useState(subjectsByDept[branch])
  const [nonBranchSubjects, setNonBranchSubjects] = useState([
    ...subjects.filter((s) => !s.code.startsWith(branch)),
  ])

  console.log(branchSubjects, nonBranchSubjects)

  useEffect(() => {
    setBranchSubjects(subjectsByDept[branch])
    setNonBranchSubjects([
      ...subjects.filter((s) => !s.code.startsWith(branch)),
    ])
  }, [branch])

  const genDetails = useRef()
  const deptDetails = useRef()

  return (
    <div className='app'>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        allowClose={true}
      >
        <ul className='select-modal'>
          {selectedElectives.findIndex((e) => e.slot === currentSlot) !==
            -1 && (
            <li
              onClick={(e) => {
                const idx = selectedElectives.findIndex(
                  (e) => e.slot === currentSlot
                )
                if (selectedElectives[idx].code.startsWith(branch)) {
                  setNumDeptElective(numDeptElective - 1)
                } else {
                  setNumGenElective(numGenElective - 1)
                }
                setSelectedElectives(
                  selectedElectives.filter((e) => e.slot !== currentSlot)
                )

                setShowModal(false)
              }}
            >
              Remove
            </li>
          )}
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
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E5'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E5')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E1'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E1')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E1'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E1')}
              branch={branch}
            />
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E3'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E3')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E3'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E3')}
              branch={branch}
            />
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
          </tr>
          <tr>
            <th>Tuesday</th>
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E2'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E2')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E2'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E2')}
              branch={branch}
            />
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E4'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E4')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E4'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E4')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E6'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E6')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E6'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E6')}
              branch={branch}
            />
          </tr>
          <tr>
            <th>Wednesday</th>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E5'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E5')}
              branch={branch}
            />
            <td className='core'>CORE</td>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E1'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E1')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E2'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E2')}
              branch={branch}
            />
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E3'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E3')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E4'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E4')}
              branch={branch}
            />
            <td className='core'>CORE</td>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E6'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E6')}
              branch={branch}
            />
          </tr>
          <tr>
            <th>Thursday</th>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E5'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E5')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E5'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E5')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E1'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E1')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E1'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E1')}
              branch={branch}
            />
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E3'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E3')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E3'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E3')}
              branch={branch}
            />
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
          </tr>
          <tr>
            <th>Friday</th>
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E2'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E2')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E2'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E2')}
              branch={branch}
            />
            <td className='core'>CORE</td>
            <td className='core'>CORE</td>
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E4'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E4')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E4'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E4')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E6'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E6')}
              branch={branch}
            />
            <Subject
              setShowModal={setShowModal}
              setCurrentSlot={setCurrentSlot}
              slot={'E6'}
              selectedSubject={selectedElectives.find((e) => e.slot === 'E6')}
              branch={branch}
            />
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
                [{s.code.startsWith(branch) ? 'DEP' : 'GEN'}] {s.code}: {s.name}
              </li>
            )
          })}
        </ul>
      </div>
      <div className='all-subjects'>
        <details open={!showModal} ref={deptDetails}>
          <summary>Department Electives</summary>
          <ul className='options-list'>
            {branchSubjects.map((s) => {
              return (
                <li>
                  {s.slot} - {s.code}: {s.name}
                </li>
              )
            })}
          </ul>
        </details>
        <details open={!showModal} ref={genDetails}>
          <summary>General Electives</summary>
          <ul className='options-list'>
            {nonBranchSubjects.map((s) => {
              return (
                <li>
                  {s.slot} - {s.code}: {s.name}
                </li>
              )
            })}
          </ul>
        </details>
      </div>
    </div>
  )
}

export default App
