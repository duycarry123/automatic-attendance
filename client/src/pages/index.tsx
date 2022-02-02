import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/interface'
import { Link } from 'react-router-dom'
import "./index.scss"
import DashBroadUser from '../components/dashbroad/DashBroadUser'
const Home = () => {

    const { auth } = useSelector((state: RootStore) => state)

    return (
        <div className="dashbroad">
            <DashBroadUser auth={auth} />
            <div className="dashbroad__body">
                <div className="dashbroad__body-box">
                    {
                        auth.user?.role === 'admin' && <Link className="box-item" to="/teacher">
                            <i className='bx bxs-graduation'></i>
                            <h3>Giáo viên</h3>
                        </Link>
                    }
                    <Link className="box-item" to="/student">
                        <i className='bx bx-id-card'></i>
                        <h3>Sinh viên</h3>
                    </Link>
                    <Link className="box-item" to="/identified">
                        <i className='bx bx-user-circle'></i>
                        <h3>Nhận diện</h3>
                    </Link>
                    <Link className="box-item" to="/attendance">
                        <i className='bx bx-edit'></i>
                        <h3>Điểm danh</h3>
                    </Link>
                    <Link className="box-item" to="/subjects">
                        <i className='bx bx-book-open'></i>
                        <h3>Môn học</h3>
                    </Link>
                    {/* <Link className="box-item" to="/student">
                        <i className='bx bx-id-card'></i>
                        <h3>Môn học</h3>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Home