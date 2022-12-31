import Head from 'next/head'
import logoImg from '../../../public/images/logo.svg'
import Image from 'next/image'
import { Button, Center, Flex, Input, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { canSSRGuest } from '../../utils/canSSRGuest'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = useContext(AuthContext)

    async function handleLogin(){
        if(email === '' || password === ''){
            alert('Informe seu email e senha')

            return
        }

        await signIn({ email, password })
    }

    return (
        <>
            <Head>
                <title>BarberPRO - Faça login</title>
            </Head>

            <div>
                <Flex background='barber.900' height='100vh' alignItems='center' justifyContent='center'>
                    <Flex width={640} direction='column' rounded={8} p={14}>

                        <Center p={4}>
                            <Image
                            src={logoImg}
                            quality={100}
                            objectFit='fill'
                            alt='logo do sistema'
                            width={240}
                            />
                        </Center>

                        <Input
                        background='barber.400'
                        variant='filled'
                        size='lg'
                        placeholder='email@email.com'
                        type='email'
                        mb={5}
                        color='barber.100'
                        _hover={{}}

                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        />

                        <Input
                        background='barber.400'
                        variant='filled'
                        size='lg'
                        placeholder='******'
                        type='password'
                        mb={6}
                        color='barber.100'
                        _hover={{}}

                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                        />

                        <Button
                        background='button.cta'
                        mb={6}
                        color='gray.900'
                        size='lg'
                        _hover={{ bg: '#FFB13B' }}

                        onClick={handleLogin}
                        >
                            Acessar
                        </Button>

                        <Center mt={3}>
                            <Link href='/register'>
                                <Text cursor='pointer' color='#FFF'>Ainda não possui conta? <strong>Cadastre - se</strong></Text>
                            </Link>
                        </Center>

                    </Flex>
                </Flex>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRGuest( async (ctx) => {
    return {
        props: {
            
        }
    }
} )