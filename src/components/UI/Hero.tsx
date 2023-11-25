/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarGroup, Box, Flex } from '@chakra-ui/react';
import DynamicButton from '@components/util/DynamicButton';
import DynamicText from '@components/util/DynamicText';

import Card from '@components/util/Card';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar, AiTwotoneStar } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import Layout from '../Layout/Layout';

type Props = {};

const leftVariants = {
   hidden: {
      opacity: 0,
      x: 0,
      transition: {
         duration: 0.5,
      },
   },
   visible: {
      opacity: 1,
      x: 180,
      transition: {
         duration: 0.5,
      },
   },
};
const rightVariants = {
   hidden: {
      opacity: 0,
      x: 0,
      transition: {
         duration: 0.5,
      },
   },
   visible: {
      opacity: 1,
      x: -180,
      transition: {
         duration: 0.5,
      },
   },
};

const Hero = (props: Props) => {
   return (
      <Layout sx={{ mt: '1rem' }}>
         <motion.div variants={leftVariants} initial='hidden' animate={'visible'} style={{ marginTop: '4rem' }}>
            <Box justifySelf={'start'} alignSelf={'center'} w='40%' ml='2.5rem'>
               <Flex direction={'column'} justify='center' gap='1.9rem'>
                  <DynamicText fontSize='50px' fontWeight={'700'} lineHeight={'60px'}>
                     Start chatting with friends, anytime, anywhere with chatIT
                  </DynamicText>
                  <DynamicText fontWeight='400'>
                     Great software that allows you to chat from any place at any time without any interruption
                  </DynamicText>
                  <Link href='/signup'>
                     <DynamicButton alignSelf={'center'} mr='auto'>
                        Start chatting now
                        <DynamicText as='span' ml='.3rem'>
                           <FaArrowRight color='#fff' />
                        </DynamicText>
                     </DynamicButton>
                  </Link>
                  <Flex align={'center'} px='.4rem'>
                     <AvatarGroup size='md' max={3}>
                        <Avatar name='Ryan Florence' src='/assets/ellipse1.png' />
                        <Avatar name='Segun Adebayo' src='/assets/ellipse2.png' />
                        <Avatar name='Kent Dodds' src='/assets/ellipse3.png' />
                     </AvatarGroup>
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
         </motion.div>
         <motion.div variants={rightVariants} initial='hidden' animate={'visible'}>
            <Box justifySelf={'center'} position={'relative'} mt={'4rem'}>
               <Box width='100%' height={'100%'}>
                  <Image
                     src={'/assets/hero.png'}
                     alt='hero img'
                     sizes='(max-width: 768px) 100vw,
                     (max-width: 1200px) 60vw,
                     33vw'
                     width={400}
                     height={200}
                     style={{ height: '100%', width: '100%' }}

                     // sizes='600px'
                     // // sizes='40vw'
                     // style={{ width: '100%', height: 'auto', marginLeft: '8rem' }}
                     // style={{ marginLeft: '10rem' }}
                  />
               </Box>

               <Card
                  imgsrc='/assets/card1.png'
                  bottom='12%'
                  left='5%'
                  text='One of the best chatting app.'
                  title='Jenny wilson'
                  boxShadow
               />
               <Card
                  title='Ronald Richards'
                  imgsrc='/assets/card2.png'
                  right='5%'
                  bottom='35%'
                  text='This is the best chatting app by far.'
                  boxShadow
               />
            </Box>
         </motion.div>
      </Layout>
   );
};

export default Hero;
