import { Box, Divider, Flex } from '@chakra-ui/react';
import Layout from '@components/Layout/Layout';
import DynamicButton from '@components/util/DynamicButton';
import DynamicText from '@components/util/DynamicText';
import { NavLink } from '@components/util/NavLink';
import { variants } from '@config/data';
import { useIsVisible } from '@hooks/useIsVisible';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { AiFillFacebook, AiOutlineGithub, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';

type Props = {};

const Footer = (props: Props) => {
   const ref = useRef(null);
   const isVisibile = useIsVisible(ref);
   return (
      <Flex flexDir={'column'} gap='1.5rem' py='2rem'>
         <Box ref={ref}>
            {isVisibile && (
               <motion.div variants={variants} initial='hidden' animate={'visible'}>
                  <Layout sx={{ mb: '2rem' }}>
                     <DynamicText fontSize={'2rem'} fontWeight={'700'} width={'30%'} textAlign={'center'}>
                        Ready to grow your connection? Start with chatIT, become faster every second
                     </DynamicText>
                  </Layout>
                  <Layout>
                     <Link href='/signup'>
                        <DynamicButton>
                           Start chatting now
                           <DynamicText as='span' ml='.3rem'>
                              <FaArrowRight color='#fff' />
                           </DynamicText>
                        </DynamicButton>
                     </Link>
                  </Layout>
               </motion.div>
            )}
         </Box>

         <FooterBar />
         <Box px={'15.5rem'}>
            <Divider />
         </Box>
         <Layout sx={{ px: 0, fontWeight: '400', fontFamily: 'DM Sans' }}>
            <DynamicText color='#797B89'>&copy; Copyright {new Date(Date.now()).getFullYear()}</DynamicText>
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

const Links = ['About', 'Works', 'Support'];
const Icons = [
   <AiOutlineTwitter key={'twitter'} color='rgba(253, 96, 3, 1)' />,
   <AiFillFacebook key={'fb'} color='rgba(253, 96, 3, 1)' />,
   <AiOutlineInstagram key={'insta'} color='rgba(253, 96, 3, 1)' />,
   <AiOutlineGithub key={'github'} color='rgba(253, 96, 3, 1)' />,
];

const FooterBar = () => {
   return (
      <Flex align={'center'} justifyContent='space-around' mt='2rem' fontFamily={'DM Sans'}>
         <DynamicText color={'colors.secondary'} fontSize={'2.5rem'} fontWeight={'700'}>
            <DynamicText as={'span'} color={'colors.primary'}>
               chat
            </DynamicText>
            IT
         </DynamicText>
         <Flex>
            {Links.map((link) => (
               <NavLink key={link}>{link}</NavLink>
            ))}
         </Flex>
         <Flex gap='1rem'>{Icons.map((icon) => icon)}</Flex>
      </Flex>
   );
};
