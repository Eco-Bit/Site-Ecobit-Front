import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import UserSidebar from '../../components/UserProfile/UserSidebar';
import AccountSettings from '../../components/UserProfile/AccountSettings';
import './UserProfile.css';
import ChangePassword from '../../components/UserProfile/ChangePassword';
import YourOrders from '../../components/UserProfile/UserDonations';
import UserAddress from '../../components/UserProfile/UserAddress';
import LegalNotice from '../../components/UserProfile/LegalNotice';
import Footer from '../../components/Footer/Footer.jsx';

const UserProfile = () => {
  const { activepage } = useParams();

  return (
    <div>
      <div className='userprofile'>
        <Navbar />
        <div className='userprofilein'>
          <div className='left'>
            <UserSidebar activepage={activepage} />
          </div>
          <div className='right'>
            {activepage === 'accountsettings' && <AccountSettings />}
            {activepage === 'changepassword' && <ChangePassword />}
            {activepage === 'yourorders' && <YourOrders />}
            {activepage === 'address' && <UserAddress />}
            {activepage === 'legalnotice' && <LegalNotice />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
