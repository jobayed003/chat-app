// @ts-nocheck
import { Box, Flex, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineFileImage } from 'react-icons/ai';
import DynamicText from '../Util/DynamicText';

const thumbsContainer = {
   display: 'flex',
   flexDirection: 'row',
   flexWrap: 'wrap',
};

const thumb = {
   display: 'inline-flex',
   borderRadius: '20px',
   width: 80,
   height: 80,
   padding: 4,
   boxSizing: 'border-box',
};

const thumbInner = {
   display: 'flex',
   borderRadius: 2,
   minWidth: 0,
   overflow: 'hidden',
};

const img = {
   display: 'block',
   width: 'auto',
   height: '100%',
};

export const FileInput = ({ getFileName }) => {
   const [files, setFiles] = useState([]);
   const { getRootProps, getInputProps } = useDropzone({
      accept: {
         'image/*': ['.jpeg', '.png', '.jpg'],
      },
      onDrop: (acceptedFiles) => {
         setFiles(
            acceptedFiles.map((file) =>
               Object.assign(file, {
                  preview: URL.createObjectURL(file),
               })
            )
         );
         getFileName(
            acceptedFiles.map((file) =>
               Object.assign(file, {
                  preview: URL.createObjectURL(file),
               })
            )
         );
      },
   });

   const thumbs = files.map((file) => (
      <div style={thumb} key={file.name}>
         <div style={thumbInner}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
               src={file.preview}
               style={img}
               alt='Profile Image'
               // Revoke data uri after image is loaded
               onLoad={() => {
                  URL.revokeObjectURL(file.preview);
               }}
            />
         </div>
      </div>
   ));

   useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
   }, []);

   return (
      <Box className='container'>
         <Box {...getRootProps({ className: 'dropzone' })}>
            <Input {...getInputProps()} />
            <DynamicText color={'graytext'} ml='.5rem' mb={'.5rem'}>
               Choose a profile picture
            </DynamicText>
            <Flex gap='.8rem' align={'center'} justify={'center'} cursor={'pointer'}>
               <Flex
                  boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}
                  height={'40px'}
                  borderRadius={'20px'}
                  px='.8rem'
                  align={'center'}
               >
                  <AiOutlineFileImage color='#aaa' cursor={'pointer'} />
                  <DynamicText color={'#000'}>{files[0]?.name}</DynamicText>
               </Flex>
               <aside style={thumbsContainer}>{thumbs}</aside>
            </Flex>
         </Box>
      </Box>
   );
};
