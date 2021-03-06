import axios from "axios";
import {GET_PROFILE,PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_ALL_PROFILES} from "./types";

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
         .then(res => {
             dispatch({
                 type:GET_PROFILE,
                 payload: res.data
             })
         })
         .catch(err => {
             dispatch({
                 type:GET_PROFILE,
                 payload:{}
             })
         })
}

export const createCurrentProfile = (profile, history) => dispatch => {
    axios
         .post('/api/profile',profile)
         .then(res => history.push("/dashboard"))
         .catch(err=> {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
         });
};

//Add Experience
export const addExperience = (expData, history) => dispatch => {
    axios
        .post('/api/profile/experience',expData)
        .then(res => history.push('dashboard'))
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        });
};

//Delete Experience
export const deleteExperience = (id) => dispatch => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => dispatch({
            type:GET_PROFILE,
            payload:res.data
        }))
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        });
};

//Add Education
export const addEducation= (eduData, history) => dispatch => {
    axios
        .post('/api/profile/education',eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        });
};

//Delete Education
export const deleteEducation = (id) => dispatch => {
    axios
        .delete(`/api/profile/education/${id}`)
        .then(res => dispatch({
            type:GET_PROFILE,
            payload:res.data
        }))
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        });
};

//Get Profiles
export const getProfiles = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile/all')
        .then(res => dispatch({
            type:GET_ALL_PROFILES,
            payload:res.data
        }))
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        });
};

//Get Profile By Username
export const getProfileByUsername = (username) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/profile/username/${username}`)
        .then(res => dispatch({
            type:GET_PROFILE,
            payload:res.data
        }))
        .catch(err => {
            dispatch({
                type:GET_PROFILE,
                payload:null
            })
        });
};

//Delete your account
export const deleteAccount = () => dispatch => {
  if(window.confirm("Are you sure you want to delete your account?")) {
    axios
         .delete('/api/profile')
         .then(res => dispatch ({
                type: SET_CURRENT_USER,
                payload: {}
            }))
         .catch(err=> {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
         });
    }
};


const setProfileLoading = () => ({
    type:PROFILE_LOADING
})

export const clearCurrentProfile = () => ({
    type:CLEAR_CURRENT_PROFILE,

})