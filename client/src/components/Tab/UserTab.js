import Box from '@mui/material/Box';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deleteUser, postLogout } from '../../api/User';
import { loginStore } from '../../store/store';
import { getUserId } from '../../utils/cookies';
import AlertDialog from '../AlertDialog';
export default function UserTab({ menu, setMenu }) {
  const { loginHandler } = loginStore();
  const navigate = useNavigate();
  const params = useParams();
  const [active, setActive] = useState('회원정보');
  const [open, setOpen] = useState(false);
  const handleClose = async (e) => {
    if (e.target.value === '삭제') {
      await deleteUser();
    }
    setOpen(false);
    await postLogout();
    navigate('/');
    await loginHandler();
  };
  const handleClick = (e) => {
    if (e.target.id !== active) {
      setActive(e.target.id);
    }
    setMenu(e.target.id);
    if (e.target.id === '회원정보') {
      navigate(`/users/${params.id}`);
    }
    if (e.target.id === '내 계정') {
      navigate(`/users/${getUserId()}/modify`);
    }
    if (e.target.id === '회원탈퇴') {
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{ width: '100%', height: '800px', borderRight: '1px solid #e5e7eb' }}
    >
      <Box>
        <Tabs>
          <Tab onClick={handleClick} active={menu === '회원정보'} id="회원정보">
            회원정보
          </Tab>
          {params.id === getUserId() ? (
            <>
              <Tab
                component={Link}
                onClick={handleClick}
                active={menu === '내 계정'}
                id="내 계정"
              >
                내 계정
              </Tab>
              <Tab
                onClick={(e) => handleClick(e)}
                active={menu === '회원탈퇴'}
                id="회원탈퇴"
              >
                회원탈퇴
              </Tab>
            </>
          ) : null}
          <AlertDialog
            open={open}
            onClose={(e) => handleClose(e)}
          ></AlertDialog>
        </Tabs>
      </Box>
    </Box>
  );
}
const Tabs = styled.div`
  display: flex;
  flex-direction: column;
`;
const Tab = styled.span`
  margin-right: 20px;
  margin-top: 20px;
  cursor: pointer;
  color: ${(props) => (props.active ? 'skyblue' : 'gray')};
  &:hover {
    color: black;
  }
  width: 150px;
`;
