/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarGroup, Box, Flex, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import Card from '@components/util/Card';
import DynamicButton from '@components/util/DynamicButton';
import DynamicText from '@components/util/DynamicText';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AiFillStar, AiTwotoneStar } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';

const leftVariants = {
   hidden: {
      opacity: 0,
      x: -100,
      transition: {
         duration: 0.5,
      },
   },
   visible: {
      opacity: 1,
      x: 0,
      transition: {
         duration: 0.5,
      },
   },
};
const rightVariants = {
   hidden: {
      opacity: 0,
      x: 100,
      transition: {
         duration: 0.5,
      },
   },
   visible: {
      opacity: 1,
      x: 0,
      transition: {
         duration: 0.5,
      },
   },
};
const Hero = () => {
   return (
      <Grid
         templateColumns={{ md: '1fr 1fr' }}
         mx={{ xl: '13%', md: '10%' }}
         templateRows={{ base: '1fr auto', sm: '1fr' }}
         gap={{ base: '2rem', md: '' }}
         px={{ base: '1rem', md: '0' }}
      >
         <GridItem display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <motion.div
               variants={leftVariants}
               initial='hidden'
               animate={'visible'}
               style={{
                  marginTop: '4rem',
                  width: useBreakpointValue({ '2xl': '100%' }),
               }}
            >
               <Flex direction={'column'} justify='center' gap='1.9rem' textAlign={'left'}>
                  <DynamicText fontSize={{ md: '50px', base: '34px' }} fontWeight={'700'} lineHeight={{ md: '60px' }}>
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
                  <Flex align={'center'} px='.4rem' flexWrap={'wrap'} gap={'1rem'}>
                     <Flex gap='1rem'>
                        <AvatarGroup size='md' max={3}>
                           <Avatar name='Ryan Florence' src='/assets/ellipse1.png' />
                           <Avatar name='Segun Adebayo' src='/assets/ellipse2.png' />
                           <Avatar name='Kent Dodds' src='/assets/ellipse3.png' />
                        </AvatarGroup>
                        <Box>
                           <DynamicText fontSize={'30px'} fontWeight={'700'}>
                              {new Intl.NumberFormat().format(2291)}
                           </DynamicText>
                           <DynamicText color='#aaa'>Happy Users</DynamicText>
                        </Box>
                     </Flex>

                     <Box>
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
            </motion.div>
         </GridItem>
         <GridItem
            px={{ base: '1rem', md: '0', sm: '2rem' }}
            height={{ base: 'min-content', sm: 'auto' }}
            ml={{ md: '0rem' }}
         >
            <motion.div variants={rightVariants} initial='hidden' animate={'visible'}>
               <Box justifySelf={'center'} position={'relative'} mt={'4rem'}>
                  <Box>
                     <img
                        src={'/assets/hero.png'}
                        width={'100%'}
                        height={'100%'}
                        alt='hero img'
                        style={{ objectFit: 'cover' }}
                     />
                  </Box>
                  <Card
                     imgsrc='/assets/card1.png'
                     bottom={{ md: '12%', base: '5%' }}
                     left={{ md: '5%', base: '5%' }}
                     text='One of the best chatting app.'
                     title='Jenny wilson'
                     boxShadow
                  />
                  <Card
                     title='Ronald Richards'
                     imgsrc='/assets/card2.png'
                     right={{ md: '5%', base: '5%' }}
                     bottom={{ md: '35%', base: '90%' }}
                     text='This is the best chatting app by far.'
                     boxShadow
                  />
               </Box>
            </motion.div>
         </GridItem>
      </Grid>
   );
};

export default Hero;
