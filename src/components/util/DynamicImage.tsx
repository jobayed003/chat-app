import { Box, SystemStyleObject } from '@chakra-ui/react';
import Image from 'next/image';

type Props = {
   imgsrc: string;
   width?: number;
   height?: number;
   sx?: SystemStyleObject;
};

const DynamicImage = (props: Props) => {
   return (
      <Box sx={props.sx}>
         <Image src={props.imgsrc} alt='stack img' width={props.width || 100} height={props.height || 70} />
      </Box>
   );
};

export default DynamicImage;
