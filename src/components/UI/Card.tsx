import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import DynamicText from './Util/DynamicText';

type Props = {
   title: string;
   text: string;
   imgsrc: string;
   top?: string;
   left?: { md: string; base: string } | string;
   right?: { md: string; base: string } | string;
   bottom?: { md: string; base: string } | string;
   w?: { md: string; base: string } | string;
   position?: any;
   boxShadow?: boolean;
};

const Card = (props: Props) => {
   return (
      <Box
         bg={useColorModeValue('rgba(255, 255, 255, 0.90)', 'rgba(0, 0, 0, 0.20)')}
         w={props.w || '260px'}
         borderRadius={'8px'}
         {...props}
         boxShadow={!props.boxShadow ? '' : '0px 84px 110px 0px rgba(0, 0, 0, 0.20)'}
         backdropFilter={'blur(5px)'}
         p={'1rem'}
         position={props.position || 'absolute'}
      >
         <Flex gap={'1rem'} align='center'>
            <Box borderRadius={'50%'} overflow={'hidden'}>
               <Image priority={true} src={props.imgsrc} alt='card img' width={50} height={70} />
            </Box>
            <Box width={'260px'}>
               <DynamicText>{props.title}</DynamicText>
               <DynamicText fontSize={'12px'}>{props.text}</DynamicText>
            </Box>
         </Flex>
      </Box>
   );
};

export default Card;
