import { Dispatch } from 'react'
import * as types from '../types/rollCallSessionTypes'
import { RollCallSessionType } from '../types/rollCallSessionTypes'
import { GET_ROLL_CALL_SESSION_DETAIL, RollCallSessionDetailType, RollCallSessionDetailPayload, LOADING_ROLL_CALL_SESSION_DETAIL } from '../types/rollCallSessionDetailTypes'
import { LessonDetailPayload, LessonDetailTypes, UPDATE_LESSON_DETAIL } from '../types/lessonDetailTypes'
import { AuthPayload } from '../../store/types/authTypes'
import { ALERT, AlertType } from '../../store/types/alertTypes'
import { RollCallSession, Lesson } from '../../utils/interface'
import { getAPI, postAPI } from '../../utils/fetchApi'

export const createRollCallSession = (data: any, auth: AuthPayload, history: any, lessonDetail: LessonDetailPayload, lesson: Lesson) =>
    async (dispatch: Dispatch<RollCallSessionType | AlertType | LessonDetailTypes>) => {
        if (!auth.access_token && !auth.user) return;
        try {


            const res = await postAPI('roll_call_session', data, auth.access_token);
            dispatch({ type: ALERT, payload: { success: res.data.msg } })
            dispatch({ type: types.CREATE_ROLL_CALL_SESSION, payload: { rollCallSession: res.data.newRollCallSession } })


            const attendanceDetails = lesson.course && lesson.course?.students?.map((student) => {
                return {
                    student: student._id,
                    note: "",
                    isAttendance: false,
                    absent: true
                }
            })

            lessonDetail.lessons?.forEach((_lesson) => {
                if (_lesson.lesson?._id === lesson._id) {
                    dispatch({
                        type: UPDATE_LESSON_DETAIL, payload: {
                            lessonDetail: {
                                ..._lesson,
                                rollCallSessions: _lesson.rollCallSessions && [..._lesson.rollCallSessions, { ...res.data.newRollCallSession, attendanceDetails }]
                            }
                        }
                    })
                }
            })

            history.push(`/roll-call-session/${res.data.newRollCallSession._id}`)
        } catch (error: any) {
            dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
        }
    }

export const getDetailRollCallSession =
    (rollCallSessionDetail: RollCallSessionDetailPayload, rollCallSession_ID: string, auth: AuthPayload) =>
        async (dispatch: Dispatch<RollCallSessionDetailType | AlertType>) => {
            if (!auth.access_token) return;
            if (rollCallSessionDetail.rollCallSessions?.every((item: RollCallSession) =>
                item._id !== rollCallSession_ID
            )) {
                try {
                    dispatch({ type: LOADING_ROLL_CALL_SESSION_DETAIL, payload: { loading: true } })
                    const res = await getAPI(`roll_call_session/${rollCallSession_ID}`, auth.access_token)
                    dispatch({
                        type: GET_ROLL_CALL_SESSION_DETAIL, payload: {
                            rollCallSession: { ...res.data.rollCallSession }
                        }
                    })
                    dispatch({ type: LOADING_ROLL_CALL_SESSION_DETAIL, payload: { loading: false } })
                } catch (error: any) {
                    dispatch({ type: LOADING_ROLL_CALL_SESSION_DETAIL, payload: { loading: false } })
                    dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
                }
            }
        }

export const updateDetailRollCallSession =
    (rollCallSessionDetail: RollCallSessionDetailPayload, auth: AuthPayload) =>
        async (dispatch: Dispatch<RollCallSessionDetailType | AlertType>) => {
            if (!auth.access_token) return;
            try {

            } catch (error: any) {
                dispatch({ type: LOADING_ROLL_CALL_SESSION_DETAIL, payload: { loading: false } })
                dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
            }
        }

export const getRollCallSessionUser = (auth: AuthPayload) =>
    async (dispatch: Dispatch<RollCallSessionType | AlertType>) => {
        if (!auth.access_token && !auth.user) return;
        try {
            const res = await getAPI(`roll_call_session_user/${auth.user?._id}`, auth.access_token);
        } catch (error: any) {
            dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
        }
    }