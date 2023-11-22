import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import DynamicText from './DynamicText';

type Props = {
   title: string;
   text: string;
   imgsrc: string;
   top?: string;
   left?: string;
   right?: string;
   bottom?: string;
   w?: string;
   position?: any;
};

const Card = (props: Props) => {
   return (
      <Box
         bg={useColorModeValue('rgba(255, 255, 255, 0.90)', 'rgba(0, 0, 0, 0.20)')}
         w={props.w || '280px'}
         borderRadius={'8px'}
         boxShadow={'0px 84px 110px 0px rgba(0, 0, 0, 0.20)'}
         backdropFilter={'blur(5px)'}
         p={'1rem'}
         position={props.position || 'absolute'}
         top={props.top}
         bottom={props.bottom}
         left={props.left}
         right={props.right}
      >
         <Flex gap={'1rem'} align='center'>
            <Box borderRadius={'50%'} overflow={'hidden'}>
               <Image src={props.imgsrc} alt='card img' width={50} height={70} />
            </Box>
            <Box w={'250px'}>
               <DynamicText>{props.title}</DynamicText>
               <DynamicText fontSize={'12px'}>{props.text}</DynamicText>
            </Box>
         </Flex>
      </Box>
   );
};

export default Card;
