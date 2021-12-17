// 담당자 : 최민우 (Front-end)
// 2021-12-17 17:11:28

import styled from 'styled-components';

// const fetchResult = {
//   result: {
//     title: 'How do you use coronavirus API into action?',
//     content: 'blah blah blah',
//     likes: 10,
//     username: 'johndoe',
//     userprofile_img: 'https://avatars0.githubusercontent.com/u/1234?s=460&v=4',
//     created_date: '2020-04-01T00:00:00.000Z',
//     modify_date: '2020-04-01T00:00:00.000Z',
//     answers: [
//       {
//         answer_username: 'rihanna',
//         userprofile_img:
//           'https://avatars0.githubusercontent.com/u/1234?s=460&v=4',
//         answer_id: 1,
//         answer_content: 'blah blah blah',
//         created_date: '2020-04-01T00:00:00.000Z',
//         modified_date: '2020-04-01T00:00:00.000Z',
//         answer_likes: 12,
//       },
//     ],
//     answered: 0,
//   },
// };

const UserinfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ProfileImageWrapper = styled.div`
  flex: 1 1 auto;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  margin-right: 0.8rem;
  width: 3.5rem;
  src: ${props => props.src};
`;

const UserMetadataWrapper = styled.div`
  flex: 1 1 auto;
`;

const UserName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;

`;

const CreatedAt = styled.div`
  font-size: 0.9rem;
  color: rgb(32, 20, 20);
  margin-top: 0.3rem;
`;

const SelectedByUserWrapper = styled.div`
  flex: 80 80 auto;
`;

const SelectedByUser = styled.span`
  
  border-radius: 5px;
  background-color: lightgreen;
  font-weight: bold;
  color: darkgreen;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  margin-left: 3rem;
`;

//const 

const Userinfo = ({ user }) => {

  const userInfo = {};

  if( !user ) return <></>;

  if( user.hasOwnProperty('username') ) {
    userInfo.name = user.username;
    userInfo.image = user.userprofile_img;
    userInfo.createdAt = user.created_date;
    userInfo.selected = false;
  } else if( user.hasOwnProperty('answer_username') ) {
    userInfo.name = user.answer_username;
    userInfo.image = user.userprofile_img;
    userInfo.createdAt = user.created_date;
    userInfo.selected = user.selected;
  }

  return (
    <UserinfoContainer>
      <ProfileImageWrapper>
        <ProfileImage src={userInfo.image} />
      </ProfileImageWrapper>
      <UserMetadataWrapper>
        <UserName>{userInfo.name}</UserName>
        <CreatedAt>{new Date(userInfo.createdAt).toLocaleDateString()}</CreatedAt>
      </UserMetadataWrapper>
      <SelectedByUserWrapper>
        {userInfo.selected ? <SelectedByUser>답변으로 체크됨</SelectedByUser> : <></>}
      </SelectedByUserWrapper>
    </UserinfoContainer>
  );
};

export default Userinfo;