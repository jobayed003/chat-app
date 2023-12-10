'use client';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import DynamicText from '@components/UI/Util/DynamicText';

import Card from '@components/UI/Card';
import { variants } from '@config/data';
import { useIsVisible } from '@hooks/useIsVisible';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import Layout from '../Layout/Layout';
type Props = {};

const Feature = (props: Props) => {
   const ref = useRef(null);
   const isVisible = useIsVisible(ref);
   return (
      <Flex
         bg={useColorModeValue('#F8F8FA', 'color.dark')}
         my='2rem'
         flexDir={'column'}
         gap={'4rem'}
         px={{ md: '8rem', base: '1rem' }}
         py='3rem'
      >
         <motion.div variants={variants} initial='hidden' animate={'visible'}>
            <Layout>
               <DynamicText fontSize={'36px'} fontWeight={'700'} textAlign={'center'}>
                  Features for a better experience
               </DynamicText>
            </Layout>
         </motion.div>

         <Box ref={ref}>
            {isVisible && (
               <motion.div variants={variants} initial='hidden' animate={'visible'}>
                  <Flex
                     gap={'1rem'}
                     justify={'space-around'}
                     px={{ md: '1rem' }}
                     flexDir={{ lg: 'row', base: 'column' }}
                  >
                     <Card
                        imgsrc='/assets/icon1.png'
                        title={'Video Messsaging'}
                        text='chatIT lets you connect with your friends with video messaging.'
                        w='auto'
                        position='relative'
                     />
                     <Card
                        imgsrc='/assets/icon2.png'
                        title={'Save your time'}
                        text='With chatIT managing your time will be much easy.'
                        w='auto'
                        position='relative'
                     />
                     <Card
                        imgsrc='/assets/icon3.png'
                        title={'Keep safe & private'}
                        text='We ensure you about your security by using our app.'
                        w='auto'
                        position='relative'
                     />
                  </Flex>
               </motion.div>
            )}
         </Box>
      </Flex>
   );
};

export default Feature;
