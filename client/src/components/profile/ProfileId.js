import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileTop } from './ProfileTop';
import { ProfileAbout } from './ProfileAbout';
import { ProfileExperience } from './ProfileExperience';
import { ProfileEducation } from './ProfileEducation';
import { ProfileGithub } from './ProfileGithub';
import { useParams, Link } from 'react-router-dom';

export const ProfileId = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data
        await dispatch(getProfileById(id));
        // Set loadingProfile to false after fetching
        setLoadingProfile(false);
      } catch (error) {
        // Handle error if needed
        setLoadingProfile(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  // Use useSelector to get the profile and loading state from the Redux store
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const auth = useSelector((state) => state.auth);

  // If the user is authenticated and profile is still loading, show Spinner
  if (auth.isAuthenticated && loading) {
    return <Spinner />;
  }

  // If profile is still loading, show Spinner
  if (loadingProfile) {
    return <Spinner />;
  }

  // If profile is null, show a message
  if (!profile) {
    return <div>No profile found.</div>;
  }

  // Render the profile details
  return (
    <>
      <div className='profile-grid my-1'>
        <ProfileTop />
        <br />
        <ProfileAbout />
        <br />
        <div className='profile-exp p-2'>
          <h2 className='text-primary'>Experience</h2>
          {profile.experience.length > 0 ? (
            <>
              {profile.experience.map((experience) => (
                <ProfileExperience key={experience._id} experience={experience} />
              ))}
            </>
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>
        <br />
        <div className='profile-edu p-2'>
          <h2 className='text-primary'>Education</h2>
          {profile.education.length > 0 ? (
            <>
              {profile.education.map((education) => (
                <ProfileEducation key={education._id} education={education} />
              ))}
            </>
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>
        <br />
        {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
      </div>
      <Link to='/profiles' style={{ margin: '1rem' }} className='btn btn-primary my-1'>
        Back to profile
      </Link>
      {/* ... rest of your code */}
    </>
  );
};

ProfileId.propTypes = {
  loading: PropTypes.bool,
  profile: PropTypes.object,
  getProfileById: PropTypes.func,
  auth: PropTypes.object,
};

export default ProfileId;
