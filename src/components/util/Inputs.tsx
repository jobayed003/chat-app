import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { inputStyles } from '@config/data';
import { ChangeEventHandler, useState } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock } from 'react-icons/ai';

type Props = {
   value: string;
   placeholder: string;
   type?: string;
   id: string;
   onChange: ChangeEventHandler<HTMLInputElement>;
};

const Inputs = ({ value, placeholder, type, id, onChange }: Props) => {
   const [isClicked, setIsClicked] = useState(false);

   return (
      <InputGroup>
         <InputRightElement>
            {!isClicked ? (
               <AiOutlineEye color='grayText' cursor={'pointer'} onClick={(e) => setIsClicked(!isClicked)} />
            ) : (
               <AiOutlineEyeInvisible color='grayText' cursor={'pointer'} onClick={(e) => setIsClicked(!isClicked)} />
            )}
         </InputRightElement>
         <Input
            sx={inputStyles}
            placeholder={placeholder}
            type={`${isClicked ? 'text' : 'password'}`}
            value={value}
            id={id}
            onChange={onChange}
         />
         <InputLeftElement fontSize='1rem'>
            <AiOutlineLock color='grayText' cursor={'pointer'} />
         </InputLeftElement>
      </InputGroup>
   );
};

export default Inputs;
