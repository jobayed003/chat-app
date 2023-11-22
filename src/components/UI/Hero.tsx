/* eslint-disable @next/next/no-img-element */
import { Box, Flex } from '@chakra-ui/react';
import DynamicButton from '@components/util/DynamicButton';
import DynamicText from '@components/util/DynamicText';

import Card from '@components/util/Card';
import DynamicImage from '@components/util/DynamicImage';
import Link from 'next/link';
import { AiFillStar, AiOutlineArrowRight, AiTwotoneStar } from 'react-icons/ai';
import Layout from '../Layout/Layout';

type Props = {};

const Hero = (props: Props) => {
   return (
      <Layout sx={{ mt: '1rem' }}>
         <Box justifySelf={'start'} alignSelf={'center'} width={'25%'} ml='2.5rem'>
            <Flex direction={'column'} justify='center' gap='1.9rem'>
               <DynamicText fontSize='50px' fontWeight={'700'} lineHeight={'60px'}>
                  Start chatting with friends, anytime, anywhere with chatIT
               </DynamicText>
               <DynamicText fontWeight='400'>
                  Great software that allows you to chat from any place at any time without any interruption
               </DynamicText>
               <Link href='/signup'>
                  <DynamicButton alignSelf={'center'} mr='auto'>
                     Start chatting now <AiOutlineArrowRight />
                  </DynamicButton>
               </Link>
               <Flex align={'center'} px='.4rem'>
                  <DynamicImage imgsrc='/assets/ellipse1.png' width={50} sx={{ zIndex: '2' }} />
                  <DynamicImage imgsrc='/assets/ellipse2.png' width={50} sx={{ ml: '-1rem', zIndex: '1' }} />
                  <DynamicImage imgsrc='/assets/ellipse3.png' width={50} sx={{ ml: '-1rem' }} />
                  <Box ml='1rem'>
                     <DynamicText fontSize={'30px'} fontWeight={'700'}>
                        {new Intl.NumberFormat().format(2291)}
                     </DynamicText>
                     <DynamicText color='#aaa'>Happy Customers</DynamicText>
                  </Box>

                  <Box ml={'1rem'}>
                     <DynamicText fontSize={'30px'} fontWeight={'700'}>
                        4.8/5
                     </DynamicText>
                     <DynamicText display={'flex'} alignItems={'center'}>
                        {Array.from([1, 2, 3, 4]).map((item) => (
                           <AiFillStar color='#FFC947' key={item} />
                        ))}
                        <AiTwotoneStar color='#aaa' />
                        <DynamicText as='span' color='#aaa' ml={'.3rem'}>
                           Rating
                        </DynamicText>
                     </DynamicText>
                  </Box>
               </Flex>
            </Flex>
         </Box>

         <Box justifySelf={'center'} position={'relative'}>
            <Card
               imgsrc='/assets/card1.png'
               bottom='12%'
               left='5%'
               text='One of the best chatting app.'
               title='Jenny wilson'
            />
            <Card
               title='Ronald Richards'
               imgsrc='/assets/card2.png'
               right='5%'
               bottom='35%'
               text='This is the best chatting app by far.'
            />
            <Box borderRadius={'5px'} overflow={'hidden'}>
               <img src={'/assets/hero.png'} alt='hero img' width={'600px'} />
            </Box>
         </Box>
      </Layout>
   );
};

export default Hero;
