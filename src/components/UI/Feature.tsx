import { Flex, useColorModeValue } from '@chakra-ui/react';
import Card from '@components/util/Card';
import DynamicText from '@components/util/DynamicText';
import Layout from '../Layout/Layout';

type Props = {};

const Feature = (props: Props) => {
   return (
      <Flex
         bg={useColorModeValue('#F8F8FA', 'color.dark')}
         my='2rem'
         flexDir={'column'}
         gap={'4rem'}
         px='8rem'
         py='3rem'
      >
         <Layout>
            <DynamicText fontSize={'36px'} fontWeight={'700'}>
               Features for a better experience
            </DynamicText>
         </Layout>

         <Layout sx={{}} flexOptions={{ flexWrap: 'wrap' }}>
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
         </Layout>
      </Flex>
   );
};

export default Feature;
