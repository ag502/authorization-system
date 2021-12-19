import styled from "styled-components";

import UserImage from "../../asset/image/user.png";

function UserProfile({ size, userName }) {
  return (
    <ProfileContainer>
      <ProfileImageContainer>
        <img src={UserImage} alt='' />
      </ProfileImageContainer>
      <ProfileName>{userName}</ProfileName>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div``;

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  background-color: gray;
  font-size: 100px;
`;

const ProfileName = styled.div`
  text-align: center;
  font-size: 2rem;
  margin-top: 20px;
`;

export default UserProfile;
