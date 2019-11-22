import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './progressReportView.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { getCourseInfo } from '../../../../../../actions/adminDashboardActions/students/studentsActions';
import { Spin } from 'antd';

const Label = styled.label`
color: #89878a;
font-size: 12px;
`

const Data = styled.div`
color: black;
font-weight: 450;
`

const Input = styled.input`
outline: none;
border-radius: 3px;
background: white;
width: 100%;
height: 31px;
font-size: 14px;
font-weight: 400;
margin-left: -2px;
`

function ProgressReportView(props) {
  const [progressReport, setProgressReport] = useState();

  //toggle disable on/off of the form on click of the edit button
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [arrowVisibility, setArrowVisibility] = useState('Hidden')
  const [cancel, setCancel] = useState(false);

  const [reportDate, setReportDate] = useState();

  const [display, setDisplay] = useState('none');

  //toggle visibility of cancel button
  const [displayCancelButton, setDisplayCancelButton] = useState('none');

  const [teacher, setTeacher] = useState('');
  const [level, setLevel] = useState('');
  
  useEffect(() => {
    console.log('VIEW REPORT: ', props)

  props.getCourseInfo(props.report.course_id);

  let options = { year: 'numeric', month: 'numeric', day: 'numeric' }; 
  let date = new Date(props.report.report_date).toLocaleDateString('en-US', options);
  setReportDate(date);

  //display dropdown value based on the incoming data
  for (let key in props.teacherIdLookup) {
    if (props.teacherIdLookup[key] === props.report.teacher_id) {
      setTeacher(key);
    }
  }

  //display dropdown value based on the incoming data
  for (let key in props.courseLevelLookup) {
    if (props.courseLevelLookup[key] === props.report.course_id) {
      setLevel(key);
    }
  }

  }, [])

  function handleCancel(event) {
    event.preventDefault();
    setDisabled(true);
    setEdit(false);
    setDisplayCancelButton('none');
    setCancel(!cancel);
    setArrowVisibility('Hidden')
  }

  function handleLevelDropdown(e) {
    //reassign the dropdown value to the one selected
    // let index;
    // for (let i = 0; i < props.levelList.length; i++) {
    //   if (props.levelList[i] === e.value) {
    //     index = i;
    //   }
    // }
    // setCourse({...course, level_id: props.levelListIdLookup[e.value]});
    // setLevel(props.levelList[index]);
  }

  function handleTeacherDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.teacherList.length; i++) {
      if (props.teacherList[i] === e.value) {
        index = i;
      }
    }
    setProgressReport(
      // {...progressReport, teacher_id: props.teacherIdLookup[e.value]}
    );
    setTeacher(props.teacherList[index]);
  }

  const handleEdit = () => {
    // if (edit) {
    //   const birthdate = moment(student.birthdate).toDate();
    //   const birthdateISO = birthdate.toISOString();

    //   const schoolGradeUpdated = moment(student.birthdate).toDate();
    //   const schoolGradeUpdatedISO = schoolGradeUpdated.toISOString();

    //   const editStudent  = {
    //     id: props.studentById.id,
    //     cpr: student.cpr, 
    //     registration_date: props.studentById.registration_date, 
    //     first_name: student.firstName, 
    //     additional_names: student.additionalNames, 
    //     gender: student.gender, 
    //     birthdate: birthdateISO, 
    //     school_grade_id: student.schoolGradeId, 
    //     grade_updated: schoolGradeUpdatedISO,
    //     school_name: student.schoolName, 
    //     home_telephone: student.homeTelephone, 
    //     mobile_telephone: student.mobileTelephone, 
    //     block_code: student.block, 
    //     road: student.road, 
    //     building: student.building, 
    //     flat: student.flat, 
    //     email: student.email, 
    //     notes: student.notes, 
    //     preferred_contact_type_id: student.contactTypeId, 
    //     location_id: student.locationId
    //   }
    //   props.editStudentById(props.studentById.id, editStudent);
    //   setDisabled(true);
    //   setEdit(false);
    //   setDisplayCancelButton('none');
    //   setArrowVisibility('Hidden')
    // } else {
      setDisabled(false);
      setEdit(true);
      setDisplayCancelButton('flex');
      setArrowVisibility('Visible')
      // props.resetEdited();
    // }
  }

  function handleChange(event) {
  }  

  function handleDisplay(event) {
    if (display === 'none') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  }

 
  return (
    <div className="progress-report-view" style={{marginBottom: '10px'}}>
     <div onClick={handleDisplay} style={{display: 'flex', alignItems: 'center', ontSize: '16px', fontWeight: '500', backgroundColor: '#FAFAFA', 
                  borderBottom: '1px solid #E8E8E8', borderLeft: '1px solid #f9f7f7', borderRight: '1px solid #f9f7f7', borderTop: '1px solid #f9f7f7',
                  padding: '10px 10px 10px 2px', cursor: 'pointer'}}>
      <div>
        <div style={{width: '35px', margin: '0px 10px 0px 2px'}}>
          <CircularProgressbar
            value={props.report.overall * 10}
            text={`${props.report.overall * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '28px',
              textWeight: '700',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#1f7e8c',
              textColor: '#89878a',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>
      <div style={{marginRight: '10px'}}>
        <Dropdown 
              onChange={handleLevelDropdown} 
              controlClassName={`myControlClassName editForm${arrowVisibility}`} 
              className='dropdownRoot' 
              menuClassName='myMenuClassName dropdown-menu'
              options={props.courseLevelList}   
              value={level}
              disabled={disabled} 
            />
      </div>
      <div style={{marginRight: '10px'}}>{reportDate}</div>
      {/* <div>Victoria Labdon</div> */}
      <Dropdown 
            onChange={handleTeacherDropdown} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`} 
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={props.teacherList}   
            value={teacher}
            disabled={disabled} 
          />
     </div>

     <div style={{display: `${edit ? 'block' : display}`}}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div onClick={handleCancel} 
             style={{marginTop: '5px', 
             marginRight: '5px', cursor: 'pointer', 
             color: '#C73642', display: 'flex', 
             display: `${displayCancelButton}`}}>
          <FontAwesomeIcon icon={faTimesCircle} size='lg' color='#C73642' style={{marginRight: '8px'}}/> {''}
        </div>
        <div onClick={handleEdit} style={{alignSelf: 'flex-end', marginTop: '5px', cursor: 'pointer', color: '#89878A', display: 'flex'}}>
          <FontAwesomeIcon icon={edit ? faSave : faEdit} size='lg' color='#bfbfbf' style={{marginRight: '8px'}}/> {''}
          <div>
            {edit ? 'Save' : 'Edit'}
          </div>
        </div>
      </div>

     <div style={{display: 'grid', textAlign: 'left', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                 gridGap: '10px', marginTop: '15px'}}>
      <div>
        <Label>Speaking Fluency</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
          <CircularProgressbar
            value={props.report.speaking_fluency * 10}
            text={`${props.report.speaking_fluency * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>

      <div>
        <Label>Speaking Accuracy</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
         <CircularProgressbar
            value={props.report.speaking_accuracy * 10}
            text={`${props.report.speaking_accuracy * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',})}/>
        </div>
      </div>

      <div>
        <Label>Vocabulary</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
          <CircularProgressbar
            value={props.report.vocabulary * 10}
            text={`${props.report.vocabulary * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>

      <div>
        <Label>Pronunciation</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
          <CircularProgressbar
            value={props.report.pronunciation * 10}
            text={`${props.report.pronunciation * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>

      <div>
        <Label>Grammar</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
          <CircularProgressbar
            value={props.report.grammar * 10}
            text={`${props.report.grammar * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>

      <div>
        <Label>Listening</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
          <CircularProgressbar
            value={props.report.listening * 10}
            text={`${props.report.listening * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>

      <div>
        <Label>Writing</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
          <CircularProgressbar
            value={props.report.writing * 10}
            text={`${props.report.writing * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>

      <div>
        <Label>Reading</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
          <CircularProgressbar
            value={props.report.reading * 10}
            text={`${props.report.reading * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>

      <div>
        <Label>Interest</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
          <CircularProgressbar
            value={props.report.interest * 10}
            text={`${props.report.interest * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>

      <div>
        <Label>Participation</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
          <CircularProgressbar
            value={props.report.participation * 10}
            text={`${props.report.participation * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>

      <div>
        <Label>Submitting Homework</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
          <CircularProgressbar
            value={props.report.submitting_homework * 10}
            text={`${props.report.submitting_homework * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>

      <div>
        <Label>Homework Effort</Label>
        <div style={{width: '60px', marginTop: '10px'}}>
          <CircularProgressbar
            value={props.report.homework_effort * 10}
            text={`${props.report.homework_effort * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div>

      {/* <div>
        <Label>Overall</Label>
        <div style={{width: '90px', marginTop: '10px'}}>
          <CircularProgressbar
            value={report.overall * 10}
            text={`${report.overall * 10}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',
          
              // Text size
              textSize: '20px',
          
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
          
              // Colors
              pathColor: '#2094a5',
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
          })}/>
        </div>
      </div> */}

      <div style={{gridColumn: 'span 6'}}>
        <Label>Notes</Label>
          <Data>
           <textarea 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`, width: '100%', height: '80px', outline: 'none', 
            borderRadius: '3px'}}
            type="text"
            name="cpr"
            value={props.report.notes}
            onChange={handleChange}
            disabled={disabled} />
          </Data>
      </div>

      </div>
    </div>
  </div>
  )
}

const mapStateToProps = state => {
  return {
    state: state,
    courseLevelList: state.studentsReducer.courseLevelList,
    courseLevelLookup: state.studentsReducer.courseLevelLookup,
    teacherList: state.studentsReducer.teacherList,
    teacherIdLookup: state.studentsReducer.teacherIdLookup,
    courseInfo: state.studentsReducer.courseInfo,
    courseInfoIsLoading: state.studentsReducer.courseInfoIsLoading
  };
};

export default withRouter(
  connect(
      mapStateToProps,
      { getCourseInfo }
  )(ProgressReportView)
)
