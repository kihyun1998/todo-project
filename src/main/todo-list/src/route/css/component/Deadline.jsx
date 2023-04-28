import styled from "styled-components";

const Deadline = () => {
  const Input = styled.input`
    height: 100px;
    border-radius: 20px;
    margin-top: 20px;
    font-family: 'Sunflower', sans-serif;
    font-size: 15px;
    font-weight: 1000;
  `

  return (
    <div>
      <Input type="date" />
    </div>
  );
}

export default Deadline