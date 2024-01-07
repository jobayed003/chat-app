'use client';
import { Box, Divider, Flex } from '@chakra-ui/react';
import { default as Layout } from '@components/Layout/HomeLayout';
import DynamicButton from '@components/UI/Util/DynamicButton';
import DynamicText from '@components/UI/Util/DynamicText';
import { variants } from '@config/data';
import { useIsVisible } from '@hooks/useIsVisible';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { AiFillLinkedin, AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';

const Footer = () => {
   const ref = useRef(null);
   const isVisibile = useIsVisible(ref);
   return (
      <Flex flexDir={'column'} gap='1.5rem' py='2rem'>
         <Box ref={ref}>
            {isVisibile && (
               <motion.div variants={variants} initial='hidden' animate={'visible'}>
                  <Layout sx={{ mb: '2rem' }}>
                     <DynamicText fontSize={'2rem'} fontWeight={'700'} textAlign={'center'} px={{ md: '32%' }}>
                        Ready to grow your connection? Start with chatIT, become faster every second
                     </DynamicText>
                  </Layout>
                  <Flex justifyContent={'center'}>
                     <Link href='/signup'>
                        <DynamicButton>
                           Start chatting now
                           <DynamicText as='span' ml='.3rem'>
                              <FaArrowRight color='#fff' />
                           </DynamicText>
                        </DynamicButton>
                     </Link>
                  </Flex>
               </motion.div>
            )}
         </Box>
         <FooterBar />

         <Flex justify={'center'}>
            <Divider width={{ base: '80%', '2xl': '75%' }} />
         </Flex>

         <Layout flexOptions={{ alignItems: 'center' }} sx={{ px: 0, fontWeight: '400', fontFamily: 'DM Sans' }}>
            <DynamicText color='#797B89'>
               &copy; Copyright {new Date(Date.now()).getFullYear()}, All Rights Reserved
            </DynamicText>
            <Box />
            <Flex gap='1rem'>
               <DynamicText color='#797B89'>Privacy Policy</DynamicText>
               <DynamicText color='#797B89'>Terms & Conditions</DynamicText>
            </Flex>
         </Layout>
      </Flex>
   );
};

export default Footer;

const Icons = [
   { link: 'https://github.com/jobayed003', icon: <AiOutlineGithub /> },
   { link: 'https://www.linkedin.com/in/jobayed003', icon: <AiFillLinkedin /> },
   { link: 'https://twitter.com/jobayed803', icon: <AiOutlineTwitter /> },
];

const FooterBar = () => {
   return (
      <Flex
         align={'center'}
         justifyContent='space-around'
         mt='2rem'
         fontFamily={'DM Sans'}
         flexDir={{ base: 'column', md: 'row' }}
         gap='1rem'
         mx='-4rem'
      >
         <DynamicText color={'colors.secondary'} fontSize={'2.5rem'} fontWeight={'700'}>
            <DynamicText as={'span'} color={'colors.primary'}>
               chat
            </DynamicText>
            IT
         </DynamicText>
         <Flex>
            {[1, 2, 3].map((link) => (
               <div key={link} />
            ))}
         </Flex>
         <Flex gap='1rem' cursor={'pointer'} color={'gray'}>
            {Icons.map((el) => (
               <Link href={el.link} key={el.link}>
                  {el.icon}
               </Link>
            ))}
         </Flex>
      </Flex>
   );
};
