import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fit4Life</title>
        <meta name="description" content="Fit4Life" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bg="linear-gradient(to right, #ff9966, #ff5e62)"
        minH="100dvh"
        w="100dvw"
      > 
        <Text color="white" fontSize={{base: 40, xl: 96}} fontFamily='montserrat'>COMING SOON</Text>
        <Text color="white" opacity={0.8} fontSize={{base: 14, xl: 20}} fontFamily="montserrat">Our website is under construction, stay tuned!</Text>
      </Box>
    </>
  );
}
