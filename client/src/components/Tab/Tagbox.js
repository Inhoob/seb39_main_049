import { Button } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import CategoryTabs from './CategoryTabs';
const FEStacks = ['JavaScript', 'React', 'TypeScript', 'Vue', 'NodeJS'];
const BEStacks = [
  'Java',
  'Spring',
  'Express',
  'MySQL',
  'Python',
  'JPA',
  'Database',
];
const CS = ['운영체제', '자료구조', '알고리즘', '네트워크', '디자인패턴'];
const 기타 = ['트러블 슈팅', 'DEVOPS', '테스트', '컨테이너'];
const Tagbox = ({
  setData,
  setOnSearch,
  tab,
  setTab,
  setSubCategory,
  setPage,
}) => {
  const [activeTagbox, setActiveTagbox] = useState(null);
  const handleClick = (stack, idx) => {
    setActiveTagbox(idx);
    setSubCategory(stack);
    setPage(1);
  };

  const Boxes = (tab) => {
    let array = [];
    if (tab === 0) {
      array = [...FEStacks, ...BEStacks, ...CS, ...기타];
    }
    if (tab === 1) {
      array = FEStacks;
    }
    if (tab === 2) {
      array = BEStacks;
    }
    if (tab === 3) {
      array = CS;
    }
    if (tab === 4) {
      array = 기타;
    }
    return { tab: tab, array: array };
  };

  return (
    <TagboxWrapper>
      <CategoryTabs
        setData={setData}
        setOnSearch={setOnSearch}
        setTab={setTab}
        setPage={setPage}
        setActiveTagbox={setActiveTagbox}
      ></CategoryTabs>
      <TagButtons>
        {Boxes(tab).array.map((stack, idx) => {
          return (
            <TagButton
              onClick={() => handleClick(stack, idx)}
              active={activeTagbox === idx ? 1 : 0}
              key={stack}
            >
              {stack}
            </TagButton>
          );
        })}
      </TagButtons>
    </TagboxWrapper>
  );
};

const TagboxWrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  min-height: 130px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
`;
const TagButtons = styled.section`
  width: 1200px;
  margin-top: 20px;
`;
const TagButton = styled(Button)`
  border-radius: 50px;
  text-transform: none;
  color: black;
  border: 1px solid #d0d0d0;
  margin: 5px;
  height: 60px;
  font-size: 16px;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 6px;
  background-color: ${(props) => (props.active ? '#B8E8FC' : 'white')};
  transition: 0.2s;
`;

export default Tagbox;
