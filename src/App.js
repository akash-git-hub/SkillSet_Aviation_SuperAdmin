import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Login } from './commonpages/Login';
import { createContext, useState } from 'react';
import { RoleAdminstrator } from './Pages/Role_Module/RoleAdminstrator';
import { RoleList } from './Pages/Role_Module/RoleList';
import { AdminstratorProfileList } from './Pages/User_Profile_Adminstrator/AdminstratorProfileList';
import { ProfileAdminstrator } from './Pages/User_Profile_Adminstrator/User_Profile/ProfileAdminstrator';
import { CreateCourse } from './Pages/Courses/CreateCourse';
import { CreateSubscription } from './Pages/Subscriptions/CreateSubscription';
import { MyProfile } from './Pages/My_Profile/MyProfile';
import ClientAuth from './api_services/ClientAuth';
import { EditProfileAdminstrator } from './Pages/User_Profile_Adminstrator/Edit_Profile/EditProfileAdminstrator';
import { RoleListDetail } from './Pages/Role_Module/RoleListDetail';
import QualificationListDetail from './Pages/Subscriptions/QualificationListDetail';
import { VendorTableList } from './Pages/VendorProfile/VendorTableList';
import { VendorProfileList } from './Pages/VendorProfile/VendorProfileList';
import { VendorProfile } from './Pages/VendorProfile/VendorUser_Profile/VendorProfile';
import { CourseList } from './Pages/Courses/CourseList';
import { SubscriptionList } from './Pages/Subscriptions/SubscriptionList';
import { ForgotPassword } from './commonpages/ForgotPassword';


const Mycontext = createContext();

function App() {

  const [pdata, setPdata] = useState(localStorage.getItem("mydata"));

  const contaxtHandler = (data) => {
    if (data) {
      localStorage.setItem("mydata", JSON.stringify(data));
    }
    setPdata(JSON.stringify(data))
  }


  return (
    <>

      <HashRouter>
        <Mycontext.Provider value={{ pdata: pdata, contaxtHandler: contaxtHandler }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            {/* Clinet Code */}
            <Route element={<ClientAuth />} >
              <Route path="/createrole" element={<RoleAdminstrator />} />
              <Route path="/roleadminstratorlist" element={<RoleList />} />
              <Route path="/rolelistdetail" element={<RoleListDetail />} />
              <Route path="/adminstratorprofilelist" element={<AdminstratorProfileList />} />
              <Route path="/vendortablelist" element={<VendorTableList />} />
              <Route path="/profileadminstrator" element={<ProfileAdminstrator />} />
              <Route path="/editprofileadminstrator" element={<EditProfileAdminstrator />} />
              <Route path="/vendorprofilelist" element={<VendorProfileList />} />
              <Route path="/vendorprofile" element={<VendorProfile />} />
              <Route path="/course" element={<CreateCourse />} />
              <Route path="/courselist" element={<CourseList />} />
              <Route path="/subcription" element={<CreateSubscription/>} />
              <Route path="/subcriptionlist" element={<SubscriptionList />} />
              <Route path="/subcriptiondetail" element={<QualificationListDetail />} />
              <Route path="/myprofile" element={<MyProfile />} />
            </Route>

          </Routes>
        </Mycontext.Provider>
      </HashRouter>

    </>
  );
}
export default App;
export { Mycontext };
