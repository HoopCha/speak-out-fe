import axios from 'axios';

export const FETCH_STUDENT_DATA_START = 'FETCH_STUDENT_DATA_START';
export const FETCH_STUDENT_DATA_SUCCESS = 'FETCH_STUDENT_DATA_SUCCESS';
export const FETCH_STUDENT_DATA_FAILURE = 'FETCH_STUDENT_DATA_FAILURE';

export const getStudent = () => dispatch => {
    dispatch({type: FETCH_STUDENT_DATA_START})
    axios.get('https://speak-out-be-staging.herokuapp.com/api?table=student')
        .then(res => {
           dispatch({type: FETCH_STUDENT_DATA_SUCCESS, payload:res.data.tableData})
        }).catch(err=> {
            console.log('err',err)
        })

};

export const FETCH_STUDENTBYID_DATA_START = 'FETCH_STUDENTBYID_DATA_START';
export const FETCH_STUDENTBYID_DATA_SUCCESS = 'FETCH_STUDENTBYID_DATA_SUCCESS';
export const FETCH_STUDENTBYID_DATA_FAILURE = 'FETCH_STUDENTBYID_DATA_FAILURE';

export const getStudentById = id => dispatch => {
    dispatch({ type: FETCH_STUDENTBYID_DATA_START })
    axios.get(`https://speak-out-be-staging.herokuapp.com/api/?table=student&where=student_id=${id}`)
    .then(res => {
        console.log('getById', res.data.tableData[0])
        dispatch({
            type: FETCH_STUDENTBYID_DATA_SUCCESS,
            payload: res.data.tableData[0]
        })
    })
    .catch(err => {
       dispatch({
        type: FETCH_STUDENTBYID_DATA_FAILURE,
        payload: err.data
       }) 
    })
}