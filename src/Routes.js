import React from 'react';
import {  Route, BrowserRouter } from 'react-router-dom';


import Home from './Components/Home';
import SingleDevice from './Components/SIngleDevice';
import SingleDeviceUser from './Components/UserComponents/SingleDeviceUser';
import AllTeamMembers from './Components/LeadComponents/AllTeamMembers';
import AssignDevice from './Components/LeadComponents/AssignDevice';
import TeamDamagedDevices from './Components/LeadComponents/TeamDamagedDevices';
import AllTeamDevices from './Components/LeadComponents/AllTeamDevices';
import LeadDashboard from './Components/LeadComponents/LeadDashboard';
import MyDevices from './Components/LeadComponents/MyDevices';
import TeamReport from './Components/LeadComponents/TeamReport';
import SpecialRoleForm from './Components/LeadComponents/SpecialRoleForm';
import SingleTeamMember from './Components/LeadComponents/SingleTeamMember';
import UploadAllocationFile from './Components/LeadComponents/UploadAllocationFile';
// import AddSharedDevice from './Components/LeadComponents/AddSharedDevice';
import ReadcsvFxn from './Components/LeadComponents/Readcsv';
import TeamAllocation from './Components/LeadComponents/TeamAllocation';
import ReturnDeviceToOffice from './Components/LeadComponents/ReturnDeviceToOffice';


import Login from './Components/AuthComponents/Login';
import Register from './Components/AuthComponents/Register';
import ForgotPassword from './Components/AuthComponents/ForgotPassword';
import ResetPassword from './Components/AuthComponents/ResetPassword';


import AdminDashboard from './Components/AdminComponents/AdminDashboard';
import AddNewMember from './Components/AdminComponents/AddNewMember';
import MakeNewTeam from './Components/AdminComponents/MakeNewTeam';
import MakeTeamLead from './Components/AdminComponents/MakeTeamLead';
import AddNewDevice from './Components/AdminComponents/AddNewDevice';
import AdminAddDeviceType from './Components/AdminComponents/AdminAddDeviceType';
import AllUsers from './Components/AdminComponents/AllUsers';
import AdminSingleUserDevices from './Components/AdminComponents/AdminSingleUserDevices';
import AllDevices from './Components/AdminComponents/AllDevices';
import AllTeams from './Components/AdminComponents/AllTeams';
import SingleTeam from './Components/AdminComponents/SingleTeam';
import DeviceQR from './Components/AdminComponents/DeviceQR';
import DeviceAssignment from './Components/AdminComponents/DeviceAssignment';


import UserDashboard from './Components/UserComponents/UserDashboard';
import ScheduleCalender from './Components/UserComponents/ScheduleCalender';
import ReportForm from './Components/UserComponents/ReportForm';
import RecordBugForm from './Components/UserComponents/RecordBugForm';
import SingleDamagedDevice from './Components/UserComponents/SingleDamagedDevice';
import UserProfile from './Components/AuthComponents/UserProfile';
import Notifications from './Components/UserComponents/Notifications';



// import Auth from './components/AuthComponents/Auth';
// import Error404 from './components/404/Error404';
// import Dashboard from './containers/Dashboard/Dashboard';
// import { history } from './history';

const Routes = () => {
	return (
		<BrowserRouter>
				{/* Route Definitions */}

				{/* guest routes */}
				<Route exact path="/home" component={Home}/>
			
				{/* general routes */}
				<Route exact path="/single/device/:uniqid" component={SingleDevice}/>
				<Route exact path="/my/devices" component={MyDevices}/>

				{/* auth routes */}
				<Route exact path="/" component={Login}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/register/staff" component={Register}/>
				<Route exact path="/forgot/password" component={ForgotPassword}/>
				<Route exact path="/reset/password/:uniqid" component={ResetPassword}/>

				{/* admin routes */}
				<Route exact path='/admin/dashboard' component={AdminDashboard} />
				<Route exact path='/user/profile' component={UserProfile} />
				<Route exact path='/confirm/staff/member' component={AddNewMember} />
				<Route exact path='/add/new/team' component={MakeNewTeam} />
				<Route exact path='/make/team/lead' component={MakeTeamLead} />
				<Route exact path='/add/new/device' component={AddNewDevice} />
				<Route exact path='/admin/add/device/type' component={AdminAddDeviceType} />
				<Route exact path='/admin/all/users' component={AllUsers} />
				<Route exact path='/admin/all/teams' component={AllTeams} />
				<Route exact path='/admin/single/team/:uniqid' component={SingleTeam} />
				<Route exact path='/admin/single/user/devices' component={AdminSingleUserDevices} />
				<Route exact path='/admin/all/devices' component={AllDevices} />
				<Route exact path='/admin/team/allocation' component={TeamAllocation} />
				<Route exact path='/admin/device/QR' component={DeviceQR} />
				<Route exact path='/view/device/assignment/:deviceuniqid' component={DeviceAssignment} />
				<Route exact path='/all/damaged/devices' component={TeamDamagedDevices} />

				{/* user routes */}
				<Route exact path='/user/dashboard' component={UserDashboard} />
				<Route exact path='/plan/work/schedule' component={ScheduleCalender} />
				<Route exact path='/report/damage' component={ReportForm} />
				<Route exact path='/record/new/bug' component={RecordBugForm} />
				<Route exact path='/single/device/user/:uniqid' component={SingleDeviceUser} />
				<Route exact path='/single/damaged/device/:uniqid' component={SingleDamagedDevice} />
				<Route exact path='/user/notifications' component={Notifications} />

				{/* lead routes */}
				<Route exact path='/lead/dashboard' component={LeadDashboard} />
				<Route exact path='/all/team/members' component={AllTeamMembers} />
				<Route exact path='/assign/device/:deviceUniqid' component={AssignDevice} />
				<Route exact path='/team/damaged/devices' component={TeamDamagedDevices} />
				<Route exact path='/all/team/devices/:teamUniqid?' component={AllTeamDevices} />
				{/* <Route exact path='/add/team/shared/devices' component={TeamAllocation} /> */}
				<Route exact path='/assign/special/role' component={SpecialRoleForm} />
				<Route exact path='/single/member/:uniqid' component={SingleTeamMember} />
				<Route exact path='/view/team/report' component={TeamReport} />
				<Route exact path='/upload/allocation/file' component={UploadAllocationFile} />
				<Route exact path='/return/device/office' component={ReturnDeviceToOffice} />
				<Route exact path='/input/excel/sheet' component={ReadcsvFxn} />


				
				{/* <Route exact path='/login' component={Auth} /> */}
				{/* <Route exact path='/register' component={Auth} /> */}
				{/* <Route exact path='/404' component={Error404} /> */}
				{/* <Redirect from='*' to='/404' /> */}
				</BrowserRouter>
	);
};

export default Routes;
