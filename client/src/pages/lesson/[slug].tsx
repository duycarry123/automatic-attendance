import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore, Params, LessonDetail as ILessonDetail, Attendance } from '../../utils/interface'
import { useParams, Link } from 'react-router-dom'
import { getDetailLesson } from '../../store/actions/lessonActions'
import Logo from '../../images/logo.png';
import dayjs from 'dayjs'
import "./LessonDetail.scss"

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import PrimaryTooltip from '../../components/globals/tool-tip/Tooltip'
import Button from "@mui/material/Button"

const useStyles = makeStyles({
  TableContainer: {
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important"
  },
  TableCellHead: {
    fontSize: "1.4rem !important",
    fontFamily: "-apple-system, BlinkMacSystemFont, Inter,' Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
    fontWeight: "600 !important"
  },
  TableCellBody: {
    fontSize: "1.4rem !important",
    fontFamily: "-apple-system, BlinkMacSystemFont, Inter,' Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
    fontWeight: "500 !important",
  },

  TableCellBodyId: {
    fontSize: "1.4rem !important",
    fontFamily: "-apple-system, BlinkMacSystemFont, Inter,' Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
    fontWeight: "500 !important",
    "maxWidth": "70px",
    "width": "15%",
    "WebkitLineClamp": "1",
    "WebkitBoxOrient": "vertical",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
  },

  TableCellBodyDecs: {
    minWidth: "50% !important"
  },
  Button: {
    minWidth: "100px !important"
  }
});

const LessonDetail = () => {

  const classes = useStyles();
  const { slug } = useParams<Params>();
  const dispatch = useDispatch();
  const [lessonDetailState, setLessonDetailState] = useState<ILessonDetail>();
  const { auth, lessonDetail: lessonDetailStore } = useSelector((state: RootStore) => state);

  useEffect(() => {
    if (slug) {
      const getDetailLessonFunction = async () => {
        await dispatch(getDetailLesson(slug, lessonDetailStore, auth))
      }
      getDetailLessonFunction();

      lessonDetailStore.lessons?.forEach((detailLesson) => {
        if (detailLesson.lesson?._id === slug) {
          setLessonDetailState(detailLesson)
        }
      })

    }
  }, [auth, slug, lessonDetailStore.lessons])

  console.log(lessonDetailState)

  const countAbsent = (attdentdances: Attendance[], isAbsent: true | false) => {
    let count = 0;
    attdentdances.forEach((attdentdance) => {
      if (attdentdance.absent === isAbsent) {
        count++;
      }
    })
    return count;
  }

  return (
    <div className="lesson__detail dashbroad__body dashbroad__body--xl">
      <div className="lesson__detail-card">
        <Link to='/lesson' className="card__back"><i className='bx bxs-chevron-left'></i></Link>
        <div className="card__header">
          <div className="card__header-left">
            <img className="left__logo" alt='logo' src={Logo}>
            </img>
            <div className="left__lesson-infor">
              <div className="infor__row">
                <i className='bx bxs-graduation'></i>
                <span>
                  Giáo viên: {lessonDetailState?.lesson?.teacher?.name}
                </span>
              </div>
              <div className="infor__row">
                <i className='bx bx-calendar-week'></i>
                <span>{lessonDetailState?.lesson?.weekday}</span>
              </div>
              <div className="infor__row">
                <i className='bx bxs-calendar-minus'></i>
                <span>
                  Ngày tạo: {dayjs(lessonDetailState?.lesson?.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className="infor__row">
                <i className='bx bxs-time'></i>
                <span>Thời gian bắt đầu: {dayjs(lessonDetailState?.lesson?.timeStart).format("hh:mm a")}</span>
              </div>
              <div className="infor__row">
                <i className='bx bxs-time-five'></i>
                <span>Thời gian kết thúc: {dayjs(lessonDetailState?.lesson?.timeEnd).format("hh:mm a")}</span>
              </div>
            </div>
          </div>
          <div className="card__header-right">
            <div className="right__course-infor">
              {/* <div className="infor__row">

              </div> */}

              <div className="infor__row">
                <h2 className="infor__row-left infor__row-name">
                  {lessonDetailState?.lesson?.course?.name}

                </h2>
                <p className="infor__row-right infor__row-code">
                  #<span>{lessonDetailState?.lesson?.course?.courseCode}</span>
                </p>
              </div>
              <div className="infor__row">
                <span className="infor__row-left">
                  Ngày tạo
                </span>
                <span className="infor__row-right">
                  {dayjs(lessonDetailState?.lesson?.course?.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className="infor__row">
                <span className="infor__row-left">
                  Số tín chỉ
                </span>
                <span className="infor__row-right">
                  {lessonDetailState?.lesson?.course?.credit}
                </span>
              </div>
              <div className="infor__row">
                <span className="infor__row-left">
                  Học kì
                </span>
                <span className="infor__row-right">
                  {lessonDetailState?.lesson?.course?.semester}

                </span>
              </div>
              <div className="infor__row">
                <span className="infor__row-left">
                  Năm bắt đầu
                </span>
                <span className="infor__row-right">
                  {dayjs(lessonDetailState?.lesson?.course?.yearStart).format('DD-MM-YYYY')}
                </span>
              </div>
              <div className="infor__row">
                <span className="infor__row-left">
                  Năm kết thúc
                </span>
                <span className="infor__row-right">
                  {dayjs(lessonDetailState?.lesson?.course?.yearEnd).format('DD-MM-YYYY')}

                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="card__desc">
          <h3>
            Mô tả buổi học
          </h3>
          <p>
            {
              lessonDetailState?.lesson?.desc ? `${lessonDetailState?.lesson?.desc}.` : <span className="loading-text">{lessonDetailStore.loading === false ? "Chưa có mô tả buổi học" : ""}</span>
            }
          </p>
        </div>
        <div className="card__rollcallsesson">
          <h3>
            Buổi điểm danh
          </h3>
          <TableContainer>
            <Table className="card__rollcallsesson-table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.TableCellHead}>ID</TableCell>
                  <TableCell className={classes.TableCellHead} align="left">Mô tả</TableCell>
                  <TableCell className={classes.TableCellHead} align="center">Có mặt</TableCell>
                  <TableCell className={classes.TableCellHead} align="center">Vắng</TableCell>
                  <TableCell className={classes.TableCellHead} align="center">Đã kết thúc</TableCell>
                  <TableCell className={classes.TableCellHead} align="center">Chi tiết</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  lessonDetailStore.loading === true ? <div className='loading-text' style={{ marginTop: "10px" }}>Đang tải...</div> :
                    lessonDetailState?.rollCallSessions && lessonDetailState?.rollCallSessions?.length === 0
                      ? <div className='loading-text' style={{ marginTop: "10px" }}>Môn học này chưa có buổi điểm danh nào</div> :
                      lessonDetailState?.rollCallSessions?.map((rollCallsessDetail) => {
                        return <TableRow
                          key={rollCallsessDetail._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell className={classes.TableCellBodyId} component="th" scope="row">{rollCallsessDetail._id}</TableCell>
                          <TableCell className={`${classes.TableCellBodyDecs}`} align="left">
                            <div className="table__desc">
                              <span>
                                Ngày: {dayjs(rollCallsessDetail.createdAt).format("DD-MM-YYYY")}
                              </span>
                              <p>
                                {rollCallsessDetail.comment ? rollCallsessDetail.comment : "chưa có nhận xét"}
                              </p>
                            </div>

                          </TableCell>
                          <TableCell align="center">
                            <span className='table__absent'>
                              {
                                countAbsent(rollCallsessDetail?.attendanceDetails as Attendance[], false)
                              }
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <span className="table__absent">
                              {
                                countAbsent(rollCallsessDetail?.attendanceDetails as Attendance[], true)
                              }
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <span className={rollCallsessDetail.end ? "table__end table__end--yes" : "table__end  table__end--no"}>
                              {
                                rollCallsessDetail.end ? "Đã kết thúc" : <PrimaryTooltip title="Tiếp tục điểm danh" placement="left-start">
                                  <Link style={{ textDecoration: "none", height: "fit-content" }} to={`/roll-call-session/${rollCallsessDetail._id}`}>
                                    <Button className={classes.Button} color="primary" variant='contained'>
                                      <p style={{ fontSize: "1.3rem", textTransform: "initial" }}>Tiếp tục điểm danh</p>
                                    </Button>
                                  </Link>
                                </PrimaryTooltip>
                              }
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <PrimaryTooltip title="Xem chi tiết" placement="right-start">
                              <Link style={{ textDecoration: "none" }} to={`/roll-call-session/${rollCallsessDetail._id}`}>
                                <Button className={classes.Button} color="primary" variant='contained'>
                                  <p style={{ fontSize: "1.3rem", textTransform: "initial" }}>Chi tiết</p>
                                </Button>
                              </Link>
                            </PrimaryTooltip>
                          </TableCell>
                        </TableRow>
                      })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default LessonDetail